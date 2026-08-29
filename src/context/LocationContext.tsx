import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { FarmLocationState } from '../types';
import { INDIAN_STATES, StateInfo, DistrictInfo, DEFAULT_FARM_LOCATION } from '../data/locationData';

interface LocationContextType {
  location: FarmLocationState;
  setLocation: (loc: Partial<FarmLocationState>) => void;
  currentState: StateInfo;
  currentDistrict: DistrictInfo;
  availableStates: StateInfo[];
  availableDistricts: DistrictInfo[];
  availableMandals: string[];
  availableMandalsTelugu: string[];
  detectCurrentLocation: () => Promise<{ success: boolean; message?: string }>;
  isDetecting: boolean;
  detectionError: string | null;
  resetToDefault: () => void;
}

const STORAGE_KEY = 'agripulse_farm_location';

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocationState] = useState<FarmLocationState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.stateId && parsed.districtId) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_FARM_LOCATION;
  });

  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionError, setDetectionError] = useState<string | null>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
    } catch {
      // ignore
    }
  }, [location]);

  // Derived current state info
  const currentState = useMemo(() => {
    return INDIAN_STATES.find((s) => s.id === location.stateId) || INDIAN_STATES[0];
  }, [location.stateId]);

  // Derived current district info
  const currentDistrict = useMemo(() => {
    return currentState.districts.find((d) => d.id === location.districtId) || currentState.districts[0];
  }, [currentState, location.districtId]);

  const availableStates = INDIAN_STATES;
  const availableDistricts = currentState.districts;
  const availableMandals = currentDistrict.mandals;
  const availableMandalsTelugu = currentDistrict.mandalsTelugu;

  const setLocation = (newLoc: Partial<FarmLocationState>) => {
    setLocationState((prev) => {
      const updated = { ...prev, ...newLoc };
      
      // If state changed, ensure district belongs to state
      if (newLoc.stateId && newLoc.stateId !== prev.stateId) {
        const matchedState = INDIAN_STATES.find((s) => s.id === newLoc.stateId) || INDIAN_STATES[0];
        updated.districtId = matchedState.districts[0]?.id || '';
        updated.mandal = matchedState.districts[0]?.mandals[0] || '';
        updated.village = '';
      } 
      // If district changed, update mandal
      else if (newLoc.districtId && newLoc.districtId !== prev.districtId) {
        const matchedDist = currentState.districts.find((d) => d.id === newLoc.districtId) || currentState.districts[0];
        updated.mandal = matchedDist?.mandals[0] || '';
        updated.village = '';
      }

      return updated;
    });
  };

  const resetToDefault = () => {
    setLocationState(DEFAULT_FARM_LOCATION);
    setDetectionError(null);
  };

  // Detect current location via browser Geolocation API
  const detectCurrentLocation = async (): Promise<{ success: boolean; message?: string }> => {
    if (!navigator.geolocation) {
      setDetectionError('Geolocation is not supported by your browser / పరికరంలో జీపీఎస్ సపోర్ట్ లేదు.');
      return { success: false, message: 'Geolocation not supported' };
    }

    setIsDetecting(true);
    setDetectionError(null);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            // Attempt reverse geocoding via OpenStreetMap Nominatim with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`,
              {
                headers: { 'Accept-Language': 'en' },
                signal: controller.signal,
              }
            );
            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              const address = data.address || {};

              const stateName = (address.state || '').toLowerCase();
              const districtName = (address.state_district || address.county || address.city || '').toLowerCase();
              const subdistrictName = address.suburb || address.town || address.village || address.municipality || '';

              // Find matching state in dataset
              let matchedState = INDIAN_STATES.find(
                (s) => stateName.includes(s.name.toLowerCase()) || s.name.toLowerCase().includes(stateName)
              );

              if (!matchedState) {
                // Fallback to Andhra Pradesh if southern coordinate range
                if (lat >= 13.5 && lat <= 19.5 && lng >= 77.0 && lng <= 84.5) {
                  matchedState = INDIAN_STATES.find((s) => s.id === 'andhra-pradesh');
                } else if (lat >= 15.8 && lat <= 19.9 && lng >= 77.2 && lng <= 81.8) {
                  matchedState = INDIAN_STATES.find((s) => s.id === 'telangana');
                } else {
                  matchedState = INDIAN_STATES[0];
                }
              }

              // Find matching district in state
              let matchedDistrict = matchedState?.districts.find(
                (d) =>
                  districtName.includes(d.name.toLowerCase()) ||
                  d.name.toLowerCase().includes(districtName) ||
                  d.id.includes(districtName)
              );

              if (!matchedDistrict && matchedState) {
                matchedDistrict = matchedState.districts[0];
              }

              if (matchedState && matchedDistrict) {
                setLocationState({
                  stateId: matchedState.id,
                  districtId: matchedDistrict.id,
                  mandal: subdistrictName || matchedDistrict.mandals[0] || '',
                  village: address.village || address.hamlet || '',
                  isAutoDetected: true,
                  coordinates: { lat, lng },
                });

                setIsDetecting(false);
                resolve({
                  success: true,
                  message: `Detected: ${matchedDistrict.name}, ${matchedState.name}`,
                });
                return;
              }
            }
          } catch {
            // Reverse geocoding network failure or timeout - fallback to nearest coordinate matching
          }

          // Fallback based on lat/lng coordinate approximation in India
          let fallbackState = INDIAN_STATES[0]; // AP default
          let fallbackDist = fallbackState.districts[0];

          if (lat >= 17.0 && lat <= 19.0 && lng >= 78.0 && lng <= 80.0) {
            const tg = INDIAN_STATES.find((s) => s.id === 'telangana');
            if (tg) {
              fallbackState = tg;
              fallbackDist = tg.districts.find((d) => d.id === 'warangal') || tg.districts[0];
            }
          } else if (lat >= 12.0 && lat <= 15.0 && lng >= 75.0 && lng <= 78.5) {
            const ka = INDIAN_STATES.find((s) => s.id === 'karnataka');
            if (ka) {
              fallbackState = ka;
              fallbackDist = ka.districts[0];
            }
          }

          setLocationState({
            stateId: fallbackState.id,
            districtId: fallbackDist.id,
            mandal: fallbackDist.mandals[0],
            village: '',
            isAutoDetected: true,
            coordinates: { lat, lng },
          });

          setIsDetecting(false);
          resolve({
            success: true,
            message: `Detected Location (${lat.toFixed(2)}, ${lng.toFixed(2)})`,
          });
        },
        (error) => {
          setIsDetecting(false);
          let errorMsg = 'Could not retrieve GPS location / జీపీఎస్ లొకేషన్ అందుబాటులో లేదు.';
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = 'Location permission denied. Please allow location access in your browser. / లొకేషన్ అనుమతి నిరాకరించబడింది.';
          } else if (error.code === error.TIMEOUT) {
            errorMsg = 'Location request timed out. / లొకేషన్ అభ్యర్థన సమయం ముగిసింది.';
          }
          setDetectionError(errorMsg);
          resolve({ success: false, message: errorMsg });
        },
        { timeout: 8000, enableHighAccuracy: true, maximumAge: 60000 }
      );
    });
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        currentState,
        currentDistrict,
        availableStates,
        availableDistricts,
        availableMandals,
        availableMandalsTelugu,
        detectCurrentLocation,
        isDetecting,
        detectionError,
        resetToDefault,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
