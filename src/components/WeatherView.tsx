import React, { useState } from 'react';
import {
  CloudSun,
  Sun,
  CloudRain,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  AlertTriangle,
  Clock,
  Sparkles,
  MapPin,
  RefreshCw,
  Calendar,
  Compass,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import { getWeatherForDistrict } from '../data/weatherData';
import { WeatherCondition } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from '../context/LocationContext';
import { LocationSelectorModal } from './LocationSelectorModal';
import { TabType } from '../App';
import { formatLocationHierarchy, formatShortLocation } from '../utils/locationFormatter';

interface WeatherViewProps {
  tempUnit: 'C' | 'F';
  setActiveTab: (tab: TabType) => void;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ tempUnit, setActiveTab }) => {
  const { t, language } = useLanguage();
  const { location, currentState, currentDistrict, detectCurrentLocation, isDetecting } = useLocation();
  const isTelugu = language === 'Telugu';
  const isHindi = language === 'Hindi';

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic Weather Condition for currently selected location
  const currentWeather: WeatherCondition = getWeatherForDistrict(
    location.stateId,
    location.districtId,
    location.mandal,
    location.village,
    language
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  const getTempDisplay = (cVal: number, fVal: number) => {
    return tempUnit === 'C' ? `${cVal}°C` : `${fVal}°F`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 rounded-full text-[11px] font-bold uppercase tracking-widest mb-2">
            <CloudSun className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            {t.cardWeatherBadge}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#1A2E1A] dark:text-white tracking-tight">
            {t.weatherTitle}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            {t.weatherSubtitle}
          </p>
        </div>

        {/* Location Selector Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700/80 rounded-2xl border border-emerald-200 dark:border-slate-700 shadow-sm transition group"
          >
            <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1">
                <span>
                  {formatShortLocation({
                    village: location.village,
                    mandal: location.mandal,
                    districtName: isTelugu ? currentDistrict.nameTelugu : currentDistrict.name,
                    stateName: isTelugu ? currentState.nameTelugu : currentState.name,
                    language,
                  })}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-md font-semibold shrink-0">
                  {isTelugu ? currentState.nameTelugu : currentState.name}
                </span>
              </div>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                {isTelugu ? 'లొకేషన్ మార్చడానికి క్లిక్ చేయండి' : 'Click to change location'}
              </p>
            </div>
          </button>

          <button
            onClick={() => detectCurrentLocation()}
            disabled={isDetecting}
            className="p-3 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-[#1A2E1A] dark:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition"
            title={isTelugu ? 'జీపీఎస్ ద్వారా లొకేషన్ గుర్తించు' : 'Auto Detect GPS Location'}
          >
            <Navigation className={`w-4 h-4 text-emerald-600 ${isDetecting ? 'animate-spin' : ''}`} />
          </button>

          <button
            id="refresh-weather-btn"
            onClick={handleRefresh}
            className="p-3 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-[#1A2E1A] dark:text-slate-200 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Weather Alerts if present */}
      {currentWeather.alerts && currentWeather.alerts.length > 0 && (
        <div className="space-y-3">
          {currentWeather.alerts.map((alert, i) => (
            <div
              key={i}
              className={`p-5 rounded-[2rem] border flex items-start justify-between gap-3 shadow-sm ${
                alert.type === 'warning'
                  ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                  : 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${alert.type === 'warning' ? 'text-amber-600' : 'text-emerald-600'}`} />
                <div>
                  <h4 className="text-sm font-bold">{alert.title}</h4>
                  <p className="text-xs text-gray-700 dark:text-slate-300 mt-0.5 leading-relaxed">{alert.message}</p>
                </div>
              </div>
              {alert.action && (
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className="px-3.5 py-1.5 bg-white dark:bg-slate-800 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 shrink-0 transition"
                >
                  {alert.action}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Weather Hero Card */}
      <div className="bg-gradient-to-br from-[#183627] via-[#204934] to-[#12271c] text-white rounded-[2.5rem] p-6 sm:p-10 shadow-xl border border-[#2c5b43] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-center">
          {/* Main Temperature & Location Info */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>
                {formatLocationHierarchy({
                  village: location.village,
                  mandal: location.mandal,
                  districtName: isTelugu ? currentDistrict.nameTelugu : currentDistrict.name,
                  stateName: isTelugu ? currentState.nameTelugu : currentState.name,
                  language,
                })}
              </span>
            </div>

            <div className="flex items-baseline gap-4">
              <div className="text-5xl sm:text-7xl font-extrabold tracking-tight font-display">
                {getTempDisplay(currentWeather.tempC, currentWeather.tempF)}
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-emerald-100 flex items-center gap-2">
                  <Sun className="w-6 h-6 text-amber-400" />
                  <span>{currentWeather.condition}</span>
                </div>
                <div className="text-xs text-emerald-200/80">
                  {isTelugu ? 'ప్రాంతీయ వ్యవసాయ వాతావరణం' : isTelugu ? 'Agro-climatic profile' : currentDistrict.agroClimaticZone}
                </div>
              </div>
            </div>

            {/* Microclimate Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-500/20">
              <div className="bg-white/5 rounded-2xl p-3 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-medium">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>{isTelugu ? 'గాలిలో తేమ' : 'Humidity'}</span>
                </div>
                <div className="text-lg font-bold mt-0.5">{currentWeather.humidity}%</div>
              </div>

              <div className="bg-white/5 rounded-2xl p-3 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-medium">
                  <Wind className="w-3.5 h-3.5" />
                  <span>{isTelugu ? 'గాలి వేగం' : 'Wind Speed'}</span>
                </div>
                <div className="text-lg font-bold mt-0.5">{currentWeather.windSpeedKmh} km/h</div>
              </div>

              <div className="bg-white/5 rounded-2xl p-3 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-medium">
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>{isTelugu ? 'వర్ష సూచన' : 'Precipitation'}</span>
                </div>
                <div className="text-lg font-bold mt-0.5">{currentWeather.precipitationChance}%</div>
              </div>

              <div className="bg-white/5 rounded-2xl p-3 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-medium">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>{isTelugu ? 'నేల ఉష్ణోగ్రత' : 'Soil Temp'}</span>
                </div>
                <div className="text-lg font-bold mt-0.5">{currentWeather.soilTempC}°C</div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Agricultural Advisories */}
          <div className="lg:col-span-5 bg-black/20 backdrop-blur-md rounded-3xl p-5 border border-emerald-500/30 space-y-4">
            <h3 className="text-sm font-bold text-emerald-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{isTelugu ? 'ఈ రోజు వ్యవసాయ సూచనలు' : 'Field Advisories Today'}</span>
            </h3>

            {/* Spraying */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-emerald-300 font-semibold">{isTelugu ? 'పిచికారీ స్థితి' : 'Spraying Condition'}:</span>
                <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-200 rounded-md font-bold text-[11px]">
                  {currentWeather.advisories.sprayingCondition}
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {currentWeather.advisories.sprayingReason}
              </p>
            </div>

            {/* Irrigation */}
            <div className="space-y-1 pt-2 border-t border-emerald-500/20">
              <div className="flex justify-between items-center text-xs">
                <span className="text-emerald-300 font-semibold">{isTelugu ? 'నీటి పారుదల సలహా' : 'Irrigation Advice'}:</span>
                <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-200 rounded-md font-bold text-[11px]">
                  {currentWeather.advisories.irrigationAdvice}
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {currentWeather.advisories.irrigationReason}
              </p>
            </div>

            {/* Disease Risk */}
            <div className="space-y-1 pt-2 border-t border-emerald-500/20">
              <div className="flex justify-between items-center text-xs">
                <span className="text-emerald-300 font-semibold">{isTelugu ? 'తెగుళ్ళ ముప్పు' : 'Disease Risk'}:</span>
                <span className="px-2 py-0.5 bg-amber-500/30 text-amber-200 rounded-md font-bold text-[11px]">
                  {currentWeather.advisories.diseaseRisk}
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {currentWeather.advisories.diseaseReason}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>{isTelugu ? '7 రోజుల వ్యవసాయ వాతావరణ అంచనా' : '7-Day Agronomic Forecast'}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isTelugu ? 'పిచికారీ మరియు నీటి తడుల ప్రణాళిక కోసం' : 'Plan spraying, irrigation, and harvesting operations'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {currentWeather.forecast.map((f, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center transition-all ${
                idx === 0
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-slate-800 dark:text-slate-100 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{f.day}</div>
              <div className="text-[10px] text-slate-400 mb-2">{f.date}</div>

              <div className="my-2 flex justify-center text-emerald-600 dark:text-emerald-400">
                {f.icon === 'Sun' ? <Sun className="w-7 h-7 text-amber-500" /> : <CloudRain className="w-7 h-7 text-blue-500" />}
              </div>

              <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                {getTempDisplay(f.tempMaxC, f.tempMaxF)}
              </div>
              <div className="text-[11px] text-slate-400">
                {getTempDisplay(f.tempMinC, f.tempMinF)}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1 text-[10px]">
                <div className="text-blue-600 dark:text-blue-400 font-semibold">{f.rainChance}% rain</div>
                <div className="text-emerald-700 dark:text-emerald-300 font-medium truncate">{f.spraySuitability}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Timeline */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>{isTelugu ? 'ఈ రోజు గంటల వారి వాతావరణం' : 'Hourly Spray & Temperature Window'}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {currentWeather.hourly.map((h, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-center"
            >
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{h.time}</div>
              <div className="text-base font-bold text-slate-800 dark:text-slate-100 my-1">
                {getTempDisplay(h.tempC, h.tempF)}
              </div>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                {h.rainChance}% rain • {h.humidity}% RH
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Modal */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </div>
  );
};
