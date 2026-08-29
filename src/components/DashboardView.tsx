import React, { useState } from 'react';
import {
  Stethoscope,
  BookOpen,
  CloudSun,
  Sparkles,
  ArrowRight,
  Droplets,
  CheckCircle2,
  History,
  Leaf,
  Mic,
  Wind,
  Layers,
  Bug,
  RotateCcw,
} from 'lucide-react';
import { ScanHistoryRecord } from '../types';
import { getWeatherForDistrict } from '../data/weatherData';
import { TabType } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from '../context/LocationContext';
import { MapPin } from 'lucide-react';

interface DashboardViewProps {
  setActiveTab: (tab: TabType) => void;
  tempUnit: 'C' | 'F';
  scanHistory: ScanHistoryRecord[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setActiveTab,
  tempUnit,
  scanHistory,
}) => {
  const { t, language } = useLanguage();
  const { location, currentState, currentDistrict } = useLocation();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    task1: true,
    task2: false,
    task3: false,
    task4: false,
  });

  const weather = getWeatherForDistrict(
    location.stateId,
    location.districtId,
    location.mandal,
    location.village,
    language
  );
  const tempStr = tempUnit === 'C' ? `${weather.tempC}°C` : `${weather.tempF}°F`;

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getLocalizedDate = () => {
    try {
      const now = new Date();
      if (language === 'Telugu') {
        return `${now.toLocaleDateString('te-IN', { weekday: 'long', day: 'numeric', month: 'long' })}`;
      }
      if (language === 'Hindi') {
        return `${now.toLocaleDateString('hi-IN', { weekday: 'long', day: 'numeric', month: 'long' })}`;
      }
      if (language === 'Tamil') {
        return `${now.toLocaleDateString('ta-IN', { weekday: 'long', day: 'numeric', month: 'long' })}`;
      }
      if (language === 'Kannada') {
        return `${now.toLocaleDateString('kn-IN', { weekday: 'long', day: 'numeric', month: 'long' })}`;
      }
      if (language === 'Malayalam') {
        return `${now.toLocaleDateString('ml-IN', { weekday: 'long', day: 'numeric', month: 'long' })}`;
      }
      if (language === 'Marathi') {
        return `${now.toLocaleDateString('mr-IN', { weekday: 'long', day: 'numeric', month: 'long' })}`;
      }
      return now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    } catch {
      return new Date().toDateString();
    }
  };

  // Localized checklist items based on active language
  const localizedChecklist = [
    {
      id: 'task1',
      title: language === 'Telugu' ? 'ఉదయం ఆకుల పరిశీలన' : language === 'Hindi' ? 'सुबह पत्तियों का निरीक्षण' : language === 'Tamil' ? 'காலை இலை ஆய்வு' : language === 'Kannada' ? 'ಬೆಳಗಿನ ಎಲೆಗಳ ಪರಿಶೀಲನೆ' : language === 'Malayalam' ? 'രാവിലത്തെ ഇല പരിശോധന' : language === 'Marathi' ? 'सकाळची पान पाहणी' : 'Morning Leaf Scouting',
      desc: language === 'Telugu' ? 'టమాటా, మిరప ఆకులపై ముందస్తు తెగులు మచ్చలు ఉన్నాయేమో క్షేత్రంలో గమనించండి.' : language === 'Hindi' ? 'टमाटर और मिर्च की पत्तियों पर धब्बों या रोगों के लक्षणों की जांच करें।' : 'Inspect tomato & pepper foliage for signs of early blight or leaf spot lesions.',
      badge: t.taskHighPriority,
    },
    {
      id: 'task2',
      title: language === 'Telugu' ? 'బిందు సేద్యం ఫిల్టర్ల తనిఖీ' : language === 'Hindi' ? 'ड्रिप सिंचाई फिल्टर की जांच' : language === 'Tamil' ? 'சொட்டு நீர் பாசன வடிகட்டி' : language === 'Kannada' ? 'ಹನಿ ನೀರಾವರಿ ಫಿಲ್ಟರ್ ಪರಿಶೀಲನೆ' : language === 'Malayalam' ? 'തുള്ളിനന ഫിൽട്ടർ പരിശോധന' : language === 'Marathi' ? 'ठिबक सिंचन फिल्टर तपासणी' : 'Check Drip Irrigation Filters',
      desc: language === 'Telugu' ? 'నీరు సమానంగా అందేలా డ్రిప్ లైన్ స్క్రీన్ ఫిల్టర్లను శుభ్రం చేయండి.' : language === 'Hindi' ? 'ड्रिप पाइप में रुकावट से बचने के लिए स्क्रीन फिल्टर को साफ करें।' : 'Flush secondary drip line screen filters to prevent emitter blockage.',
      badge: language === 'Telugu' ? 'నీటి యాజమాన్యం' : language === 'Hindi' ? 'जल प्रबंधन' : 'Water Care',
    },
    {
      id: 'task3',
      title: language === 'Telugu' ? 'మందుల పిచికారీ సమయ పరిశీలన' : language === 'Hindi' ? 'छिड़काव के समय की जांच' : language === 'Tamil' ? 'மருந்து தெளிக்கும் நேரம்' : language === 'Kannada' ? 'ಸಿಂಪರಣೆ ಸಮಯದ ಪರಿಶೀಲನೆ' : language === 'Malayalam' ? 'മരുന്ന് തളിക്കൽ സമയം' : language === 'Marathi' ? 'फवारणी वेळ तपासणी' : 'Spray Window Timing Check',
      desc: language === 'Telugu' ? 'ఈ రోజు ఉదయం 10:30 లోపు జీవ శిలీంద్ర నాశిని పిచికారీకి వాతావరణం చాలా అనుకూలంగా ఉంది.' : language === 'Hindi' ? 'आज सुबह 10:30 बजे से पहले जैविक फफूंदनाशी के छिड़काव के लिए मौसम उत्तम है।' : 'Current weather condition is Optimal for foliar bio-fungicide application before 10:30 AM.',
      badge: language === 'Telugu' ? 'పిచికారీ వేళ' : language === 'Hindi' ? 'छिड़काव' : 'Spray Window',
    },
    {
      id: 'task4',
      title: language === 'Telugu' ? 'నేల తేమ స్థాయి అంచనా' : language === 'Hindi' ? 'मिट्टी की नमी का आकलन' : language === 'Tamil' ? 'மண் ஈரப்பதம் மதிப்பீடு' : language === 'Kannada' ? 'ಮಣ್ಣಿನ ತೇವಾಂಶ ಪರಿಶೀಲನೆ' : language === 'Malayalam' ? 'മണ്ണിലെ ഈർപ്പം അറിയൽ' : language === 'Marathi' ? 'मातीतील ओलावा अंदाज' : 'Soil Moisture Assessment',
      desc: language === 'Telugu' ? 'మధ్యాహ్న ఎండ తీవ్రతకు ముందు వేర్ల మండలంలో పై 15 సెం.మీ తేమను నిర్ధారించండి.' : language === 'Hindi' ? 'दोपहर की गर्मी से पहले जड़ों के पास 15 सेमी गहराई में नमी की जांच करें।' : 'Verify root zone moisture in top 15cm before afternoon heat spike.',
      badge: language === 'Telugu' ? 'నేల ఆరోగ్యం' : language === 'Hindi' ? 'मृदा स्वास्थ्य' : 'Soil Health',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 min-w-0">
      
      {/* Hero Welcome Banner */}
      <div className="bg-[#1B3B2B] text-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-[#2D5A45] relative overflow-hidden w-full max-w-full min-w-0">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 min-w-0">
          <div className="space-y-2.5 max-w-2xl min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#2D5A45] rounded-full text-xs font-semibold text-emerald-200">
                {getLocalizedDate()}
              </span>
              <span className="px-3 py-1 bg-emerald-400 text-[#1B3B2B] rounded-full text-xs font-bold uppercase tracking-wider">
                {t.aiActive}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-white">
              {t.greetingFarmer}.
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {t.heroSubtext}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                id="hero-voice-assistant-btn"
                onClick={() => setActiveTab('voice')}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-[#1B3B2B] rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2.5 cursor-pointer"
              >
                <Mic className="w-5 h-5 text-[#1B3B2B]" />
                {t.talkToVoiceAI}
              </button>
              <button
                id="hero-scan-leaf-btn"
                onClick={() => setActiveTab('disease')}
                className="px-5 py-3.5 bg-[#2D5A45] hover:bg-[#2D5A45]/80 text-white rounded-2xl font-semibold text-sm border border-emerald-600/40 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-emerald-300" />
                {t.scanLeafPhoto}
              </button>
            </div>
          </div>

          {/* Quick Weather Capsule */}
          <div
            onClick={() => setActiveTab('weather')}
            className="bg-[#152E21] hover:bg-[#12271c] p-5 sm:p-6 rounded-2xl border border-[#2D5A45] cursor-pointer transition-all hover:scale-[1.02] shrink-0"
          >
            <div className="flex items-center justify-between text-xs text-emerald-300/90 mb-1.5 font-bold uppercase tracking-wider gap-2">
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{weather.location}</span>
              </span>
              <span className="text-[10px] bg-[#2D5A45] px-2 py-0.5 rounded text-emerald-200 shrink-0">{t.currentConditions}</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold font-display text-white">{tempStr}</span>
              <span className="text-sm font-semibold text-emerald-300">{weather.condition}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[#2D5A45] text-xs text-emerald-200/80">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-emerald-400" />
                {weather.humidity}% {t.humidity}
              </span>
              <span className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-emerald-400" />
                {weather.windSpeedKmh} km/h {t.windSpeed}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Agriculture Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold font-display text-[#1A2E1A] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              {t.coreModulesTitle}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{t.coreModulesSubtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5">
          
          {/* Card 0: Voice Assistant */}
          <div
            id="dash-card-voice"
            onClick={() => setActiveTab('voice')}
            className="group bg-gradient-to-b from-emerald-950 to-[#1B3B2B] text-white rounded-[2rem] border border-[#2D5A45] hover:border-emerald-400 p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-[#1B3B2B] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <Mic className="w-6 h-6 text-[#1B3B2B]" />
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-400 text-[#1B3B2B] rounded-full uppercase tracking-wider">
                {t.cardVoiceBadge}
              </span>
              <h3 className="text-lg font-bold font-display text-white leading-tight">
                {t.cardVoiceTitle}
              </h3>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                {t.cardVoiceDesc}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-[#2D5A45] flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              <span>{t.cardVoiceAction}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 1: Crop Disease Detection */}
          <div
            id="dash-card-disease"
            onClick={() => setActiveTab('disease')}
            className="group bg-white rounded-[2rem] border border-emerald-100 hover:border-emerald-400 p-6 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-100">
                <Stethoscope className="w-6 h-6 text-emerald-700" />
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full uppercase tracking-wider">
                {t.cardDiseaseBadge}
              </span>
              <h3 className="text-lg font-bold font-display text-[#1A2E1A] leading-tight">
                {t.cardDiseaseTitle}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.cardDiseaseDesc}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-emerald-50 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{t.cardDiseaseAction}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card: Soil Health Analysis */}
          <div
            id="dash-card-soil"
            onClick={() => setActiveTab('soil')}
            className="group bg-white rounded-[2rem] border border-emerald-100 hover:border-emerald-400 p-6 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform border border-amber-100">
                <Layers className="w-6 h-6 text-amber-700" />
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-amber-100 text-amber-900 rounded-full uppercase tracking-wider">
                {t.cardSoilBadge || 'Soil Health'}
              </span>
              <h3 className="text-lg font-bold font-display text-[#1A2E1A] leading-tight">
                {t.cardSoilTitle || 'Soil Health Analysis'}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.cardSoilDesc || 'Analyze soil pH, NPK, moisture, and organic matter to determine status & suitable crops.'}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-emerald-50 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{t.cardSoilAction || 'Analyze Soil'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card: Pest & Disease Alerts */}
          <div
            id="dash-card-alerts"
            onClick={() => setActiveTab('alerts')}
            className="group bg-white rounded-[2rem] border border-emerald-100 hover:border-emerald-400 p-6 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-800 flex items-center justify-center group-hover:scale-110 transition-transform border border-red-100">
                <Bug className="w-6 h-6 text-red-700" />
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-red-100 text-red-900 rounded-full uppercase tracking-wider">
                {t.cardPestBadge || 'Early Warning'}
              </span>
              <h3 className="text-lg font-bold font-display text-[#1A2E1A] leading-tight">
                {t.cardPestTitle || 'Pest & Disease Alerts'}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.cardPestDesc || 'Match symptoms with potential risks and immediate containment steps.'}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-emerald-50 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{t.cardPestAction || 'Check Alerts'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card: Historical Farm Analysis */}
          <div
            id="dash-card-history"
            onClick={() => setActiveTab('history')}
            className="group bg-white rounded-[2rem] border border-emerald-100 hover:border-emerald-400 p-6 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform border border-blue-100">
                <History className="w-6 h-6 text-blue-700" />
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-blue-100 text-blue-900 rounded-full uppercase tracking-wider">
                {t.cardHistoryBadge || 'Farm History'}
              </span>
              <h3 className="text-lg font-bold font-display text-[#1A2E1A] leading-tight">
                {t.cardHistoryTitle || 'Historical Farm Analysis'}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.cardHistoryDesc || 'Track crop timelines, yields, recurring pests, and soil trends over seasons.'}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-emerald-50 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{t.cardHistoryAction || 'View Timeline'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card: Smart Crop Rotation Planner */}
          <div
            id="dash-card-rotation"
            onClick={() => setActiveTab('rotation')}
            className="group bg-white rounded-[2rem] border border-emerald-100 hover:border-emerald-400 p-6 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-100">
                <RotateCcw className="w-6 h-6 text-emerald-700" />
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-100 text-emerald-900 rounded-full uppercase tracking-wider">
                {t.cardRotationBadge || 'Rotation Planner'}
              </span>
              <h3 className="text-lg font-bold font-display text-[#1A2E1A] leading-tight">
                {t.cardRotationTitle || 'Smart Crop Rotation'}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.cardRotationDesc || 'Generate a 3-season rotation sequence to revitalize soil and break pest cycles.'}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-emerald-50 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{t.cardRotationAction || 'Plan Rotation'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Crop Guide */}
          <div
            id="dash-card-crops"
            onClick={() => setActiveTab('crops')}
            className="group bg-white rounded-[2rem] border border-emerald-100 hover:border-emerald-400 p-6 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-100">
                <BookOpen className="w-6 h-6 text-emerald-700" />
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full uppercase tracking-wider">
                {t.cardCropsBadge}
              </span>
              <h3 className="text-lg font-bold font-display text-[#1A2E1A] leading-tight">
                {t.cardCropsTitle}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.cardCropsDesc}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-emerald-50 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{t.cardCropsAction}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Weather & Spray */}
          <div
            id="dash-card-weather"
            onClick={() => setActiveTab('weather')}
            className="group bg-white rounded-[2rem] border border-emerald-100 hover:border-emerald-400 p-6 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-100">
                <CloudSun className="w-6 h-6 text-emerald-700" />
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full uppercase tracking-wider">
                {t.cardWeatherBadge}
              </span>
              <h3 className="text-lg font-bold font-display text-[#1A2E1A] leading-tight">
                {t.cardWeatherTitle}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.cardWeatherDesc}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-emerald-50 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{t.cardWeatherAction}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Smart Advisory */}
          <div
            id="dash-card-recommendations"
            onClick={() => setActiveTab('recommendations')}
            className="group bg-white rounded-[2rem] border border-emerald-100 hover:border-emerald-400 p-6 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-100">
                <Sparkles className="w-6 h-6 text-emerald-700" />
              </div>
              <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full uppercase tracking-wider">
                {t.cardAdvisoryBadge}
              </span>
              <h3 className="text-lg font-bold font-display text-[#1A2E1A] leading-tight">
                {t.cardAdvisoryTitle}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {t.cardAdvisoryDesc}
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-emerald-50 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
              <span>{t.cardAdvisoryAction}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Two-Column Middle Section: Action Checklist & Recent Scans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Daily Farm Action Checklist */}
        <div className="lg:col-span-7 bg-white rounded-[2rem] border border-emerald-100 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-emerald-50 pb-4">
            <div>
              <h2 className="text-lg font-bold font-display text-[#1A2E1A] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                {t.farmChecklistTitle}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">{t.farmChecklistSubtitle}</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              {Object.values(completedTasks).filter(Boolean).length}/4 {t.taskCompleted}
            </span>
          </div>

          <div className="space-y-3">
            {localizedChecklist.map((task) => {
              const isChecked = completedTasks[task.id];
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-emerald-50/40 border-emerald-200 text-gray-400'
                      : 'bg-[#F8FAF8] border-emerald-100 hover:bg-emerald-50/30 text-[#1A2E1A]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs sm:text-sm font-bold ${isChecked ? 'line-through text-gray-400' : 'text-[#1A2E1A]'}`}>
                        {task.title}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                        {task.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{task.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Recent Scans */}
        <div className="lg:col-span-5 bg-white rounded-[2rem] border border-emerald-100 p-6 sm:p-8 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-emerald-50 pb-4 mb-4">
              <h2 className="text-lg font-bold font-display text-[#1A2E1A] flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-600" />
                {t.recentScansTitle}
              </h2>
              <button
                onClick={() => setActiveTab('disease')}
                className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                {t.scanLeafPhoto}
              </button>
            </div>

            {scanHistory.length > 0 ? (
              <div className="space-y-3">
                {scanHistory.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveTab('disease')}
                    className="p-3 rounded-2xl border border-emerald-100 hover:bg-emerald-50/40 flex items-center gap-3 cursor-pointer transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-emerald-100">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.cropName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-[#1A2E1A]">{item.cropName}</h4>
                      <p className="text-[11px] text-gray-600">{item.diseaseName}</p>
                      <span className="text-[10px] text-gray-400">{item.date}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      {item.confidenceScore}% {t.confidence}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 space-y-2">
                <Leaf className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-stone-700">{t.noScansYet}</p>
                <p className="text-[11px] text-gray-500">
                  {t.diseaseSubtitle}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('disease')}
                  className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  {t.scanLeafPhoto}
                </button>
              </div>
            )}
          </div>

          {/* Warm Editorial Smart Advisory Card */}
          <div className="mt-4 p-5 bg-[#FDF9F3] text-[#1A2E1A] rounded-[1.5rem] border border-[#F0E4D0] space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">💡</span>
              <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block">
                {language === 'Telugu' ? 'నేటి వ్యవసాయ నిపుణుని సూచన' : language === 'Hindi' ? 'आज की कृषि विशेषज्ञ सलाह' : 'Agronomist Advisory of the Day'}
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed font-normal">
              {language === 'Telugu'
                ? 'గాలి వేగం గంటకు 8 కి.మీ కంటే తక్కువగా ఉన్నప్పుడు ఉదయాన్నే మందుల పిచికారీ చేయండి. దీనివల్ల మందు గాలికి కొట్టుకుపోకుండా ఆకులపై సమానంగా చేరుతుంది.'
                : language === 'Hindi'
                ? 'हवा की गति 8 किमी/घंटा से कम होने पर सुबह जल्दी छिड़काव करें। इससे दवा पत्तियों पर सही तरीके से पहुंचती है।'
                : 'Always calibrate foliar spray nozzles early in the morning when wind is under 8 km/h. This reduces chemical drift and improves droplet penetration into the lower canopy.'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
