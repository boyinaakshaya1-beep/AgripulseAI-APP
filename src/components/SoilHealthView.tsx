import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Layers,
  Droplets,
  FlaskConical,
  Sprout,
  HelpCircle,
  RefreshCw,
  Info,
  ShieldAlert,
  ChevronRight,
  UserCheck,
  FileText,
  MapPin,
  Compass,
  ArrowRight,
  Check,
  Activity,
  TreePine,
  Thermometer,
} from 'lucide-react';
import {
  SoilAnalysisMode,
  SimpleSoilInput,
  SimpleSoilAssessmentResult,
  SimpleSoilType,
  SoilHealthInput,
  SoilHealthResult,
} from '../types';
import {
  SIMPLE_SOIL_TYPES,
  SIMPLE_SOIL_CONDITIONS,
  SIMPLE_IRRIGATION_OPTIONS,
  SIMPLE_VISIBLE_PROBLEMS,
  SIMPLE_FARMER_PRESETS,
  calculateSimpleSoilAssessment,
  SOIL_TYPES,
  SAMPLE_SOIL_PRESETS,
  calculateSoilHealth,
} from '../data/soilData';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from '../context/LocationContext';
import { TabType } from '../App';
import { LocationSelectorModal } from './LocationSelectorModal';

interface SoilHealthViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const SoilHealthView: React.FC<SoilHealthViewProps> = ({ setActiveTab }) => {
  const { language } = useLanguage();
  const { location, currentState, currentDistrict } = useLocation();
  const isTelugu = language === 'Telugu';
  const isHindi = language === 'Hindi';

  // Mode Selection: 'simple' is DEFAULT
  const [activeMode, setActiveMode] = useState<SoilAnalysisMode>('simple');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // ==========================================
  // 1. SIMPLE FARMER MODE STATE
  // ==========================================
  const [simpleInput, setSimpleInput] = useState<SimpleSoilInput>({
    soilType: (currentDistrict.defaultSoilType === 'black-cotton' ? 'black' : currentDistrict.defaultSoilType === 'alluvial' ? 'loamy' : 'red') as SimpleSoilType,
    currentCrop: currentDistrict.primaryCrops[0] || 'Tomato',
    soilCondition: 'normal',
    irrigation: 'medium',
    previousCrop: 'Pulses',
    visibleProblem: 'none',
  });

  const [simpleResult, setSimpleResult] = useState<SimpleSoilAssessmentResult>(() =>
    calculateSimpleSoilAssessment(
      {
        soilType: (currentDistrict.defaultSoilType === 'black-cotton' ? 'black' : currentDistrict.defaultSoilType === 'alluvial' ? 'loamy' : 'red') as SimpleSoilType,
        currentCrop: currentDistrict.primaryCrops[0] || 'Tomato',
        soilCondition: 'normal',
        irrigation: 'medium',
        previousCrop: 'Pulses',
        visibleProblem: 'none',
      },
      language
    )
  );

  const [isCalculatingSimple, setIsCalculatingSimple] = useState(false);

  const handleCalculateSimple = (data = simpleInput) => {
    setIsCalculatingSimple(true);
    setTimeout(() => {
      const res = calculateSimpleSoilAssessment(data, language);
      setSimpleResult(res);
      setIsCalculatingSimple(false);
    }, 200);
  };

  const handleSelectSimplePreset = (preset: typeof SIMPLE_FARMER_PRESETS[0]) => {
    setSimpleInput(preset.input);
    handleCalculateSimple(preset.input);
  };

  // ==========================================
  // 2. ADVANCED LAB REPORT MODE STATE
  // ==========================================
  const [advInput, setAdvInput] = useState<SoilHealthInput>({
    soilType: currentDistrict.defaultSoilType || 'red-loam',
    ph: 6.5,
    nitrogen: 'Medium',
    phosphorus: 'Medium',
    potassium: 'Medium',
    moisture: 45,
    organicMatter: 0.65,
    crop: currentDistrict.primaryCrops[0] || 'Tomato',
    isDemoData: true,
  });

  const [advResult, setAdvResult] = useState<SoilHealthResult>(() =>
    calculateSoilHealth(
      {
        soilType: currentDistrict.defaultSoilType || 'red-loam',
        ph: 6.5,
        nitrogen: 'Medium',
        phosphorus: 'Medium',
        potassium: 'Medium',
        moisture: 45,
        organicMatter: 0.65,
        crop: currentDistrict.primaryCrops[0] || 'Tomato',
        isDemoData: true,
      },
      language
    )
  );

  const [isCalculatingAdv, setIsCalculatingAdv] = useState(false);

  const handleCalculateAdv = (data = advInput) => {
    setIsCalculatingAdv(true);
    setTimeout(() => {
      const res = calculateSoilHealth(data, language);
      setAdvResult(res);
      setIsCalculatingAdv(false);
    }, 200);
  };

  const handleSelectAdvPreset = (preset: typeof SAMPLE_SOIL_PRESETS[0]) => {
    setAdvInput(preset.input);
    handleCalculateAdv(preset.input);
  };

  // Active simple soil metadata
  const activeSimpleSoil = SIMPLE_SOIL_TYPES.find((s) => s.id === simpleInput.soilType) || SIMPLE_SOIL_TYPES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#183627] via-[#204934] to-[#12271c] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#2c5b43] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-400/30">
              <Sprout className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'నేల ఆరోగ్య నిర్వహణ & క్షేత్ర విశ్లేషణ' : 'Soil Fertility & Field Health'}</span>
            </div>

            {/* Location quick badge */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-medium border border-white/20 backdrop-blur-xs transition"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {location.village ? `${location.village}, ` : ''}
                {location.mandal ? `${location.mandal}, ` : ''}
                {isTelugu ? currentDistrict.nameTelugu : currentDistrict.name}
              </span>
              <span className="text-emerald-300 text-[11px] underline ml-1">
                {isTelugu ? 'మార్చు' : 'Change'}
              </span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-white">
            {isTelugu ? '🌱 నేల ఆరోగ్య విశ్లేషణ (Soil Health Analysis)' : '🌱 Soil Health Analysis'}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
            {isTelugu
              ? 'రైతుల కోసం రూపొందించిన సులభమైన మోడ్ ద్వారా మీ నేల స్థితి, సమస్యలు మరియు తగిన పంటల సిఫార్సులను పొందండి. ల్యాబ్ నివేదిక ఉంటే అధునాతన మోడ్ ఉపయోగించండి.'
              : 'Evaluate your soil health through simple farmer-friendly questions or enter detailed laboratory soil report values for scientific nutrient recommendations.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="pt-2">
            <div className="inline-flex p-1.5 bg-black/30 backdrop-blur-md rounded-2xl border border-emerald-500/30">
              <button
                onClick={() => setActiveMode('simple')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeMode === 'simple'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'
                    : 'text-emerald-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>{isTelugu ? '👨‍🌾 సాధారణ రైతు మోడ్ (డిఫాల్ట్)' : '👨‍🌾 Simple Farmer Mode (Default)'}</span>
              </button>

              <button
                onClick={() => setActiveMode('advanced')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeMode === 'advanced'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'
                    : 'text-emerald-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <FlaskConical className="w-4 h-4" />
                <span>{isTelugu ? '🧪 ల్యాబ్ టెస్ట్ మోడ్ (అధునాతనం)' : '🧪 Soil Lab Report Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 👨‍🌾 1. SIMPLE FARMER MODE (DEFAULT) */}
      {/* ========================================================= */}
      {activeMode === 'simple' && (
        <div className="space-y-6">
          {/* Quick Presets for Farmers */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {isTelugu ? 'త్వరిత క్షేత్ర నమూనాలు (Quick Sample Presets):' : 'Try Quick Field Examples:'}
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {isTelugu ? 'ఒక క్లిక్‌తో పరిశీలించండి' : 'Load realistic farmer observations'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SIMPLE_FARMER_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectSimplePreset(preset)}
                  className="text-left px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{isTelugu ? preset.nameTelugu : preset.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Simple Questions Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-emerald-600" />
                      <span>{isTelugu ? 'పొలం పరిస్థితుల వివరాలు' : 'Farm & Soil Questions'}</span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isTelugu ? 'సాంకేతిక కొలతలు అవసరం లేదు - సాధారణ సమాధానాలు ఇవ్వండి' : 'No lab instruments needed - answer basic field observations'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCalculateSimple()}
                    className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition"
                    title="Refresh analysis"
                  >
                    <RefreshCw className={`w-4 h-4 ${isCalculatingSimple ? 'animate-spin' : ''}`} />
                  </button>
                </div>

                {/* 1. Soil Type */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                    1. {isTelugu ? 'మీ పొలం నేల రకం ఏమిటి?' : 'What is your soil type?'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SIMPLE_SOIL_TYPES.map((type) => {
                      const isSelected = simpleInput.soilType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            const updated = { ...simpleInput, soilType: type.id };
                            setSimpleInput(updated);
                            handleCalculateSimple(updated);
                          }}
                          className={`p-3 rounded-2xl border text-left transition-all relative ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 shadow-xs'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold truncate">
                              {isTelugu ? type.nameTelugu.split('(')[0] : type.name}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {isTelugu ? type.descriptionTelugu : type.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Current Crop */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                    2. {isTelugu ? 'ప్రస్తుతం సాగు చేస్తున్న పంట ఏది?' : 'Which crop are you currently growing?'}
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {['Tomato', 'Chilli', 'Cotton', 'Paddy / Rice', 'Maize', 'Groundnut', 'Sugarcane', 'Banana', 'Vegetables'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          const updated = { ...simpleInput, currentCrop: c };
                          setSimpleInput(updated);
                          handleCalculateSimple(updated);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                          simpleInput.currentCrop.toLowerCase() === c.toLowerCase()
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder={isTelugu ? 'లేదా ఇతర పంట పేరు నమోదు చేయండి...' : 'Or type your crop name...'}
                    value={simpleInput.currentCrop}
                    onChange={(e) => {
                      const updated = { ...simpleInput, currentCrop: e.target.value };
                      setSimpleInput(updated);
                    }}
                    onBlur={() => handleCalculateSimple()}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                {/* 3. Soil Condition */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                    3. {isTelugu ? 'నేల ప్రస్తుత తేమ / స్థితి ఎలా ఉంది?' : 'What is the current soil moisture condition?'}
                  </label>
                  <select
                    value={simpleInput.soilCondition}
                    onChange={(e) => {
                      const updated = { ...simpleInput, soilCondition: e.target.value as any };
                      setSimpleInput(updated);
                      handleCalculateSimple(updated);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    {SIMPLE_SOIL_CONDITIONS.map((cond) => (
                      <option key={cond.id} value={cond.id}>
                        {isTelugu ? cond.nameTelugu : cond.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Irrigation Availability */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                    4. {isTelugu ? 'నీటి పారుదల వసతి ఎలా ఉంది?' : 'Irrigation water availability?'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {SIMPLE_IRRIGATION_OPTIONS.map((irr) => {
                      const isSelected = simpleInput.irrigation === irr.id;
                      return (
                        <button
                          key={irr.id}
                          type="button"
                          onClick={() => {
                            const updated = { ...simpleInput, irrigation: irr.id };
                            setSimpleInput(updated);
                            handleCalculateSimple(updated);
                          }}
                          className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {isTelugu ? irr.nameTelugu.split('(')[0] : irr.name.split('(')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Previous Crop */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                    5. {isTelugu ? 'గత సీజన్లో వేసిన పంట ఏది?' : 'What crop was grown previously?'}
                  </label>
                  <input
                    type="text"
                    placeholder={isTelugu ? 'ఉదా: పప్పుధాన్యాలు, వరి, పత్తి లేదా ఏమీ లేదు...' : 'e.g. Pulses, Paddy, Cotton, Fallow...'}
                    value={simpleInput.previousCrop}
                    onChange={(e) => {
                      const updated = { ...simpleInput, previousCrop: e.target.value };
                      setSimpleInput(updated);
                    }}
                    onBlur={() => handleCalculateSimple()}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                {/* 6. Visible Soil Problems */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                    6. {isTelugu ? 'నేలపై కనిపిస్తున్న ప్రధాన సమస్య ఏమిటి?' : 'Any visible problem in field?'}
                  </label>
                  <select
                    value={simpleInput.visibleProblem}
                    onChange={(e) => {
                      const updated = { ...simpleInput, visibleProblem: e.target.value as any };
                      setSimpleInput(updated);
                      handleCalculateSimple(updated);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    {SIMPLE_VISIBLE_PROBLEMS.map((prob) => (
                      <option key={prob.id} value={prob.id}>
                        {isTelugu ? prob.nameTelugu : prob.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Re-assess button */}
                <button
                  type="button"
                  onClick={() => handleCalculateSimple()}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isTelugu ? 'ప్రాథమిక నేల విశ్లేషణ రూపొందించు' : 'Update Soil Assessment'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Assessment Result Card (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 sticky top-24">
                
                {/* Result Header & Status */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isTelugu ? 'ప్రాథమిక నేల స్థితి' : 'Preliminary Assessment'}
                  </span>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      simpleResult.status === 'healthy'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : simpleResult.status === 'attention'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                    }`}
                  >
                    {simpleResult.status === 'healthy' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {simpleResult.status === 'attention' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    {simpleResult.status === 'poor' && <AlertOctagon className="w-4 h-4 text-rose-600" />}
                    <span>{simpleResult.statusLabel}</span>
                  </div>
                </div>

                {/* Score bar */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-400">{isTelugu ? 'నేల ఆరోగ్య స్కోరు' : 'Health Score'}:</span>
                    <span className="text-slate-800 dark:text-slate-100 font-bold">{simpleResult.score} / 100</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        simpleResult.score >= 75
                          ? 'bg-emerald-500'
                          : simpleResult.score >= 50
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${simpleResult.score}%` }}
                    />
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-emerald-600" />
                    <span>{simpleResult.assessmentTitle}</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {simpleResult.conditionSummary}
                  </p>
                </div>

                {/* Possible Concerns */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span>{isTelugu ? 'గమనించవలసిన విషయాలు & లోపాలు' : 'Possible Concerns & Observations'}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {simpleResult.possibleConcerns.map((concern, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-xl border border-amber-200/50 dark:border-amber-900/30"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* General Suggestions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sprout className="w-4 h-4 text-emerald-600" />
                    <span>{isTelugu ? 'సాధారణ యాజమాన్య సూచనలు' : 'Soil Management Suggestions'}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {simpleResult.generalRecommendations.map((rec, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-200/50 dark:border-emerald-900/30"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suitable Crops */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <TreePine className="w-4 h-4 text-emerald-600" />
                    <span>{isTelugu ? 'ఈ నేలకు అనువైన పంటలు' : 'Suitable Crops for this Soil'}</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {simpleResult.suitableCrops.map((crop, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-medium rounded-lg border border-emerald-200 dark:border-emerald-800"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Disclaimer Banner */}
                <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{simpleResult.disclaimer}</span>
                </div>

                {/* Link to Voice or Crop Doctor */}
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setActiveTab('voice')}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition text-center flex items-center justify-center gap-1.5"
                  >
                    <span>{isTelugu ? 'వాయిస్ అసిస్టెంట్ అడగండి' : 'Ask Voice Assistant'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('crops')}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition text-center flex items-center justify-center gap-1.5"
                  >
                    <span>{isTelugu ? 'పంట వివరాలు చూడండి' : 'View Crop Guide'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 🧪 2. ADVANCED / LAB REPORT MODE */}
      {/* ========================================================= */}
      {activeMode === 'advanced' && (
        <div className="space-y-6">
          {/* Lab Presets */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {isTelugu ? 'నమూనా ల్యాబ్ నివేదికలు (Sample Lab Reports):' : 'Sample Soil Lab Reports:'}
                </h3>
              </div>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                {isTelugu ? '⚠️ డెమో / నమూనా ల్యాబ్ డేటా' : '⚠️ DEMO / SAMPLE LAB DATA'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SAMPLE_SOIL_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectAdvPreset(preset)}
                  className="text-left px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{isTelugu ? preset.nameTelugu : preset.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Lab Inputs */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <FlaskConical className="w-5 h-5 text-emerald-600" />
                      <span>{isTelugu ? 'ల్యాబ్ సాయిల్ కార్డ్ విలువలు' : 'Soil Lab Test Measurements'}</span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isTelugu ? 'మీ సాయిల్ హెల్త్ కార్డ్ నుండి రసాయన విశ్లేషణ విలువలను నమోదు చేయండి' : 'Enter pH, NPK, organic carbon & moisture from Soil Health Card'}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold rounded-lg uppercase">
                    Lab Report
                  </span>
                </div>

                {/* Soil Type Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {isTelugu ? 'నేల రకం (Soil Classification)' : 'Soil Classification'}
                  </label>
                  <select
                    value={advInput.soilType}
                    onChange={(e) => {
                      const updated = { ...advInput, soilType: e.target.value };
                      setAdvInput(updated);
                      handleCalculateAdv(updated);
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500"
                  >
                    {SOIL_TYPES.map((st) => (
                      <option key={st.id} value={st.id}>
                        {isTelugu ? st.nameTelugu : st.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* pH Slider */}
                <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isTelugu ? 'నేల pH విలువ (Soil pH Value)' : 'Soil pH Value'}
                    </label>
                    <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-bold rounded-lg">
                      {advInput.ph.toFixed(1)} (
                      {advInput.ph < 6.0
                        ? isTelugu ? 'ఆమ్లం' : 'Acidic'
                        : advInput.ph > 8.0
                        ? isTelugu ? 'క్షారం' : 'Alkaline'
                        : isTelugu ? 'తటస్థం' : 'Neutral'}
                      )
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4.5"
                    max="9.5"
                    step="0.1"
                    value={advInput.ph}
                    onChange={(e) => {
                      const updated = { ...advInput, ph: parseFloat(e.target.value) };
                      setAdvInput(updated);
                      handleCalculateAdv(updated);
                    }}
                    className="w-full accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>4.5 (Highly Acidic)</span>
                    <span>7.0 (Optimal Neutral)</span>
                    <span>9.5 (Highly Alkaline)</span>
                  </div>
                </div>

                {/* NPK Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Nitrogen */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {isTelugu ? 'నత్రజని (N)' : 'Nitrogen (N)'}
                    </label>
                    <select
                      value={advInput.nitrogen}
                      onChange={(e) => {
                        const updated = { ...advInput, nitrogen: e.target.value as any };
                        setAdvInput(updated);
                        handleCalculateAdv(updated);
                      }}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100"
                    >
                      <option value="Low">{isTelugu ? 'తక్కువ (Low)' : 'Low'}</option>
                      <option value="Medium">{isTelugu ? 'మధ్యస్థం (Medium)' : 'Medium'}</option>
                      <option value="High">{isTelugu ? 'ఎక్కువ (High)' : 'High'}</option>
                    </select>
                  </div>

                  {/* Phosphorus */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {isTelugu ? 'భాస్వరం (P)' : 'Phosphorus (P)'}
                    </label>
                    <select
                      value={advInput.phosphorus}
                      onChange={(e) => {
                        const updated = { ...advInput, phosphorus: e.target.value as any };
                        setAdvInput(updated);
                        handleCalculateAdv(updated);
                      }}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100"
                    >
                      <option value="Low">{isTelugu ? 'తక్కువ (Low)' : 'Low'}</option>
                      <option value="Medium">{isTelugu ? 'మధ్యస్థం (Medium)' : 'Medium'}</option>
                      <option value="High">{isTelugu ? 'ఎక్కువ (High)' : 'High'}</option>
                    </select>
                  </div>

                  {/* Potassium */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {isTelugu ? 'పొటాషియం (K)' : 'Potassium (K)'}
                    </label>
                    <select
                      value={advInput.potassium}
                      onChange={(e) => {
                        const updated = { ...advInput, potassium: e.target.value as any };
                        setAdvInput(updated);
                        handleCalculateAdv(updated);
                      }}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100"
                    >
                      <option value="Low">{isTelugu ? 'తక్కువ (Low)' : 'Low'}</option>
                      <option value="Medium">{isTelugu ? 'మధ్యస్థం (Medium)' : 'Medium'}</option>
                      <option value="High">{isTelugu ? 'ఎక్కువ (High)' : 'High'}</option>
                    </select>
                  </div>
                </div>

                {/* Moisture & Organic Carbon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Moisture */}
                  <div className="space-y-1 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isTelugu ? 'తేమ శాతం' : 'Moisture'}</span>
                      <span className="font-bold text-emerald-600">{advInput.moisture}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={advInput.moisture}
                      onChange={(e) => {
                        const updated = { ...advInput, moisture: parseInt(e.target.value) };
                        setAdvInput(updated);
                        handleCalculateAdv(updated);
                      }}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  {/* Organic Matter */}
                  <div className="space-y-1 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{isTelugu ? 'సేంద్రీయ కర్బనం (OC %)' : 'Organic Carbon (OC %)'}</span>
                      <span className="font-bold text-emerald-600">{(advInput.organicMatter || 0.5).toFixed(2)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="1.5"
                      step="0.05"
                      value={advInput.organicMatter || 0.5}
                      onChange={(e) => {
                        const updated = { ...advInput, organicMatter: parseFloat(e.target.value) };
                        setAdvInput(updated);
                        handleCalculateAdv(updated);
                      }}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>

                {/* Crop */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {isTelugu ? 'పంట పేరు (Target Crop)' : 'Target Crop'}
                  </label>
                  <input
                    type="text"
                    value={advInput.crop}
                    onChange={(e) => {
                      const updated = { ...advInput, crop: e.target.value };
                      setAdvInput(updated);
                    }}
                    onBlur={() => handleCalculateAdv()}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Lab Results */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 sticky top-24">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isTelugu ? 'ల్యాబ్ విశ్లేషణ ఫలితం' : 'Lab Evaluation'}
                  </span>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      advResult.status === 'healthy'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : advResult.status === 'attention'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    <span>{advResult.statusLabel}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {advResult.summary}
                </div>

                {/* Nutrient Status Grid */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isTelugu ? 'పోషక స్థాయిలు & సిఫార్సులు' : 'Nutrient Breakdown & Advice'}
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between font-bold mb-1">
                        <span>{isTelugu ? 'నత్రజని (N)' : 'Nitrogen (N)'}</span>
                        <span className={advResult.nutrientStatus.nitrogen.status === 'optimal' ? 'text-emerald-600' : 'text-amber-600'}>
                          {advResult.nutrientStatus.nitrogen.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{advResult.nutrientStatus.nitrogen.advice}</p>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between font-bold mb-1">
                        <span>{isTelugu ? 'భాస్వరం (P)' : 'Phosphorus (P)'}</span>
                        <span className={advResult.nutrientStatus.phosphorus.status === 'optimal' ? 'text-emerald-600' : 'text-amber-600'}>
                          {advResult.nutrientStatus.phosphorus.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{advResult.nutrientStatus.phosphorus.advice}</p>
                    </div>

                    <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between font-bold mb-1">
                        <span>{isTelugu ? 'పొటాషియం (K)' : 'Potassium (K)'}</span>
                        <span className={advResult.nutrientStatus.potassium.status === 'optimal' ? 'text-emerald-600' : 'text-amber-600'}>
                          {advResult.nutrientStatus.potassium.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{advResult.nutrientStatus.potassium.advice}</p>
                    </div>
                  </div>
                </div>

                {/* Soil Amendments */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isTelugu ? 'రసాయన & సేంద్రీయ దిద్దుబాటు చర్యలు' : 'Amendments & Soil Management'}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {advResult.managementSuggestions.map((sug, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 dark:bg-emerald-950/20 p-2 rounded-lg">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Selector Modal */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </div>
  );
};
