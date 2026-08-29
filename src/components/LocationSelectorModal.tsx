import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Check, X, AlertCircle, Sparkles, Building2, Landmark, Compass } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import { INDIAN_STATES } from '../data/locationData';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({ isOpen, onClose }) => {
  const { location, setLocation, currentState, currentDistrict, detectCurrentLocation, isDetecting, detectionError } = useLocation();
  const { language } = useLanguage();
  const isTelugu = language === 'Telugu';
  const isHindi = language === 'Hindi';

  const [selectedStateId, setSelectedStateId] = useState(location.stateId);
  const [selectedDistrictId, setSelectedDistrictId] = useState(location.districtId);
  const [selectedMandal, setSelectedMandal] = useState(location.mandal);
  const [selectedVillage, setSelectedVillage] = useState(location.village || '');
  const [customMandalInput, setCustomMandalInput] = useState('');
  const [showCustomMandal, setShowCustomMandal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Sync state whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setSelectedStateId(location.stateId);
      setSelectedDistrictId(location.districtId);
      setSelectedMandal(location.mandal);
      setSelectedVillage(location.village || '');
      setShowCustomMandal(false);
      setCustomMandalInput('');
      setFeedbackMsg(null);
    }
  }, [isOpen, location]);

  // Lock background scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Active state & district objects in modal
  const modalState = INDIAN_STATES.find((s) => s.id === selectedStateId) || INDIAN_STATES[0];
  const modalDistrict = modalState.districts.find((d) => d.id === selectedDistrictId) || modalState.districts[0];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStateId = e.target.value;
    setSelectedStateId(newStateId);
    const newState = INDIAN_STATES.find((s) => s.id === newStateId) || INDIAN_STATES[0];
    const newDistrict = newState.districts[0];
    setSelectedDistrictId(newDistrict?.id || '');
    setSelectedMandal(newDistrict?.mandals[0] || '');
    setShowCustomMandal(false);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDistId = e.target.value;
    setSelectedDistrictId(newDistId);
    const matchedDist = modalState.districts.find((d) => d.id === newDistId) || modalState.districts[0];
    setSelectedMandal(matchedDist?.mandals[0] || '');
    setShowCustomMandal(false);
  };

  const handleGpsDetect = async () => {
    setFeedbackMsg(null);
    const res = await detectCurrentLocation();
    if (res.success) {
      setFeedbackMsg(res.message || (isTelugu ? 'లొకేషన్ విజయవంతంగా గుర్తించబడింది!' : 'Location detected successfully!'));
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  const handleSave = () => {
    const finalMandal = showCustomMandal && customMandalInput.trim() ? customMandalInput.trim() : selectedMandal;
    setLocation({
      stateId: selectedStateId,
      districtId: selectedDistrictId,
      mandal: finalMandal,
      village: selectedVillage.trim(),
      isAutoDetected: false,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="location-selector-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-xs overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[92vh] sm:max-h-[88vh] md:max-h-[86vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto"
      >
        {/* Modal Header - Pinned at top */}
        <div className="shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-emerald-50/70 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white truncate">
                {isTelugu ? 'వ్యవసాయ ప్రాంతం & లొకేషన్ ఎంపిక' : isHindi ? 'खेत का स्थान चुनें' : 'Select Farm Location'}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                {isTelugu ? 'వాతావరణం, నేల రకం మరియు తెగుళ్ల హెచ్చరికల కోసం' : 'For localized weather, soil health & pest alerts'}
              </p>
            </div>
          </div>
          <button
            id="close-location-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 ml-2 cursor-pointer"
            aria-label="Close location modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Dedicated Vertically Scrollable Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* GPS Auto-detect Button Card */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-800/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Navigation className={`w-5 h-5 ${isDetecting ? 'animate-spin text-emerald-600' : ''}`} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs sm:text-sm font-semibold text-emerald-950 dark:text-emerald-200">
                  {isTelugu ? 'నా ప్రస్తుత లొకేషన్ ఉపయోగించు' : isHindi ? 'मेरा वर्तमान स्थान पहचानें' : 'Use My Current Location'}
                </h4>
                <p className="text-[11px] sm:text-xs text-emerald-700 dark:text-emerald-400">
                  {isTelugu ? 'జీపీఎస్ ద్వారా నేరుగా గ్రామం & మండలాన్ని గుర్తిస్తుంది' : 'Auto-detects district & state via GPS'}
                </p>
              </div>
            </div>
            <button
              id="modal-gps-detect-btn"
              onClick={handleGpsDetect}
              disabled={isDetecting}
              className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-60 cursor-pointer"
            >
              {isDetecting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>{isTelugu ? 'గుర్తిస్తోంది...' : 'Detecting...'}</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>{isTelugu ? 'లొకేషన్ గుర్తించు' : 'Auto Detect'}</span>
                </>
              )}
            </button>
          </div>

          {/* Feedback or Error messages */}
          {feedbackMsg && (
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 rounded-lg text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
          )}
          {detectionError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{detectionError}</span>
            </div>
          )}

          {/* Hierarchical Form */}
          <div className="space-y-4 pt-1">
            {/* 1. State Selector */}
            <div>
              <label htmlFor="modal-state-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>1. {isTelugu ? 'రాష్ట్రం (State)' : '1. State'}</span>
              </label>
              <select
                id="modal-state-select"
                value={selectedStateId}
                onChange={handleStateChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {INDIAN_STATES.map((state) => (
                  <option key={state.id} value={state.id}>
                    {isTelugu ? `${state.nameTelugu} (${state.name})` : state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. District Selector */}
            <div>
              <label htmlFor="modal-district-select" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. {isTelugu ? 'జిల్లా (District)' : '2. District'}</span>
              </label>
              <select
                id="modal-district-select"
                value={selectedDistrictId}
                onChange={handleDistrictChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {modalState.districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {isTelugu ? `${district.nameTelugu} (${district.name})` : district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Mandal / Taluk Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5 gap-2">
                <label htmlFor="modal-mandal-select" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">3. {isTelugu ? 'మండలం / తాలూకా (Mandal / Taluk)' : '3. Mandal / Taluk'}</span>
                </label>
                <button
                  type="button"
                  id="toggle-custom-mandal-btn"
                  onClick={() => setShowCustomMandal(!showCustomMandal)}
                  className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-medium shrink-0 cursor-pointer"
                >
                  {showCustomMandal
                    ? isTelugu ? 'జాబితా నుండి ఎంచుకోండి' : 'Choose from list'
                    : isTelugu ? '+ వేరే మండలం టైప్ చేయండి' : '+ Type other mandal'}
                </button>
              </div>

              {showCustomMandal ? (
                <input
                  id="modal-custom-mandal-input"
                  type="text"
                  placeholder={isTelugu ? 'ఉదా: తెనాలి, చేవెళ్ల, మదనపల్లె...' : 'Enter your mandal name...'}
                  value={customMandalInput}
                  onChange={(e) => setCustomMandalInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <select
                  id="modal-mandal-select"
                  value={selectedMandal}
                  onChange={(e) => setSelectedMandal(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {modalDistrict.mandals.map((mandalName, idx) => {
                    const teluguMandal = modalDistrict.mandalsTelugu[idx] || mandalName;
                    return (
                      <option key={mandalName} value={mandalName}>
                        {isTelugu ? `${teluguMandal} (${mandalName})` : mandalName}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>

            {/* 4. Village / Habitation (Optional) */}
            <div>
              <label htmlFor="modal-village-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                4. {isTelugu ? 'గ్రామం / పోలం పేరు (ఐచ్ఛికం)' : '4. Village / Farm Name (Optional)'}
              </label>
              <input
                id="modal-village-input"
                type="text"
                placeholder={isTelugu ? 'ఉదా: అంగలకుదురు, పెదకాకాని...' : 'e.g. Angalakuduru, Pedakakani...'}
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Regional Summary Preview */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{isTelugu ? 'ప్రాంతీయ వ్యవసాయ విశేషాలు:' : 'Regional Agro Profile:'}</span>
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                {isTelugu ? 'వ్యవసాయ జోన్: ' : 'Agro Zone: '}
              </span>
              {isTelugu ? modalDistrict.agroClimaticZoneTelugu : modalDistrict.agroClimaticZone}
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              <span className="font-medium text-slate-500 dark:text-slate-400">
                {isTelugu ? 'ప్రధాన పంటలు: ' : 'Major Crops: '}
              </span>
              {(isTelugu ? modalDistrict.primaryCropsTelugu : modalDistrict.primaryCrops).join(', ')}
            </div>
          </div>
        </div>

        {/* Modal Footer - Pinned at bottom */}
        <div className="shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-end gap-2.5 sm:gap-3">
          <button
            id="modal-cancel-btn"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
          >
            {isTelugu ? 'రద్దు చేయి' : 'Cancel'}
          </button>
          <button
            id="modal-save-btn"
            onClick={handleSave}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{isTelugu ? 'లొకేషన్ నిర్ధారించు' : 'Apply Location'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

