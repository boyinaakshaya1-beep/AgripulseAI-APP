import React from 'react';
import { X, Sprout, Droplets, Thermometer, Clock, ShieldCheck, Bug, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';
import { CropInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CropDetailModalProps {
  crop: CropInfo | null;
  onClose: () => void;
  onSelectForDiagnosis?: (cropName: string) => void;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({
  crop,
  onClose,
  onSelectForDiagnosis,
}) => {
  const { t, language } = useLanguage();
  if (!crop) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#152E21]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-[2rem] border border-emerald-100 shadow-2xl overflow-hidden my-6">
        
        {/* Modal Header Banner */}
        <div className="relative h-48 sm:h-64 bg-[#1B3B2B] overflow-hidden">
          <img
            src={crop.imageUrl}
            alt={crop.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#152E21] via-[#152E21]/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-[#152E21]/80 hover:bg-[#152E21] text-white backdrop-blur-xs transition-colors border border-white/10 cursor-pointer"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Crop Title */}
          <div className="absolute bottom-4 left-5 sm:left-8 right-5">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-500 text-[#152E21] rounded-full">
                {crop.category}
              </span>
              <span className="px-3 py-1 text-[11px] font-semibold bg-white/20 text-white rounded-full backdrop-blur-xs">
                {crop.season}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">{crop.name}</h2>
            <p className="text-xs sm:text-sm text-emerald-200 italic font-serif">
              {crop.botanicalName} • {crop.family}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {crop.description}
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 bg-[#F8FAF8] rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                {language === 'Telugu' ? 'అనుకూల ఉష్ణోగ్రత' : 'Ideal Temp'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#1A2E1A] mt-1">{crop.optimalTemp}</p>
            </div>
            <div className="p-4 bg-[#F8FAF8] rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {t.cropDuration}
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#1A2E1A] mt-1">{crop.growthDuration}</p>
            </div>
            <div className="p-4 bg-[#F8FAF8] rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                {t.soilPh}
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#1A2E1A] mt-1">{crop.soilPh}</p>
            </div>
            <div className="p-4 bg-[#F8FAF8] rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                {t.cropYield}
              </span>
              <p className="text-xs sm:text-sm font-bold text-[#1A2E1A] mt-1">{crop.averageYield}</p>
            </div>
          </div>

          {/* Cultivation & Soil Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2">
              <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-700" />
                {language === 'Telugu' ? 'నేల & సాగు పద్ధతులు' : 'Soil & Spacing Guidelines'}
              </h3>
              <div className="text-xs text-emerald-950 space-y-1.5 leading-relaxed">
                <p><strong>{language === 'Telugu' ? 'నేల రకం:' : 'Soil Type:'}</strong> {crop.soilType}</p>
                <p><strong>{language === 'Telugu' ? 'విత్తన మోతాదు:' : 'Seed Rate:'}</strong> {crop.seedRate}</p>
                <p><strong>{language === 'Telugu' ? 'మొక్కల మధ్య దూరం:' : 'Spacing:'}</strong> {crop.spacing}</p>
              </div>
            </div>

            <div className="p-5 bg-blue-50/40 rounded-2xl border border-blue-100 space-y-2">
              <h3 className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-600" />
                {language === 'Telugu' ? 'నీటి యాజమాన్యం & వర్షపాతం' : 'Water & Irrigation Plan'}
              </h3>
              <div className="text-xs text-blue-950 space-y-1.5 leading-relaxed">
                <p><strong>{language === 'Telugu' ? 'వార్షిక వర్షపాతం:' : 'Annual Rainfall:'}</strong> {crop.rainfall}</p>
                <p><strong>{language === 'Telugu' ? 'నీటి అవసరం:' : 'Irrigation Need:'}</strong> {crop.waterRequirement}</p>
              </div>
            </div>
          </div>

          {/* Fertilizer Schedule */}
          <div className="bg-[#F8FAF8] rounded-2xl border border-emerald-100 p-5 sm:p-6 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              {language === 'Telugu' ? 'సిఫార్సు చేసిన ఎరువుల మోతాదు' : 'Recommended Fertilizer Schedule'} (NPK: {crop.fertilizerSchedule.npkRatio})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-xs">
                <strong className="text-[#1A2E1A] block mb-1">{language === 'Telugu' ? '1. ఆఖరి దుక్కి / విత్తే సమయం:' : '1. Basal / Sowing:'}</strong>
                <p className="text-gray-600 leading-relaxed">{crop.fertilizerSchedule.basal}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-xs">
                <strong className="text-[#1A2E1A] block mb-1">{language === 'Telugu' ? '2. శాఖీయ వృద్ధి దశ:' : '2. Vegetative Phase:'}</strong>
                <p className="text-gray-600 leading-relaxed">{crop.fertilizerSchedule.vegetative}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-xs">
                <strong className="text-[#1A2E1A] block mb-1">{language === 'Telugu' ? '3. పూత & కాయ దశ:' : '3. Flowering / Bulking:'}</strong>
                <p className="text-gray-600 leading-relaxed">{crop.fertilizerSchedule.flowering}</p>
              </div>
            </div>
          </div>

          {/* Pests & Diseases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#F8FAF8] rounded-2xl border border-emerald-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <Bug className="w-4 h-4 text-rose-600" />
                {language === 'Telugu' ? 'ప్రధాన కీటకాలు & పురుగులు' : 'Key Pest Threats'}
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {crop.commonPests.map((pest, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{pest}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-[#F8FAF8] rounded-2xl border border-emerald-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                {language === 'Telugu' ? 'ప్రధాన తెగుళ్ళు' : 'Common Diseases'}
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {crop.commonDiseases.map((dis, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Harvesting Indicators & Expert Agronomy Tips */}
          <div className="bg-[#1B3B2B] text-emerald-100 rounded-2xl p-5 sm:p-6 space-y-4 border border-[#2D5A45]">
            <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {language === 'Telugu' ? 'కోత సంకేతాలు & పరిపక్వత గుర్తులు' : 'Maturity Signs & Harvesting Indicators'}
            </h3>
            <ul className="space-y-2 text-xs text-emerald-100">
              {crop.harvestIndicators.map((ind, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-[#2D5A45] text-xs">
              <strong className="text-emerald-300 block mb-1.5">{language === 'Telugu' ? 'వ్యవసాయ నిపుణుని మెళకువలు:' : 'Agronomist Best Practice Tips:'}</strong>
              <ul className="space-y-1.5 text-emerald-200/90">
                {crop.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">★</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#F8FAF8] border-t border-emerald-100 flex items-center justify-between">
          <div className="text-xs text-gray-500 font-medium">
            {language === 'Telugu' ? 'సరాసరి మార్కెట్ ధర:' : 'Market Price Range:'} <strong className="text-[#1A2E1A]">{crop.marketPriceRange}</strong>
          </div>
          <div className="flex items-center gap-3">
            {onSelectForDiagnosis && (
              <button
                type="button"
                onClick={() => {
                  onSelectForDiagnosis(crop.name);
                  onClose();
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
              >
                {language === 'Telugu' ? `${crop.name} పై తెగుళ్ళను తనిఖీ చేయండి` : `Scan Disease on ${crop.name}`}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white hover:bg-gray-100 text-[#1A2E1A] rounded-xl text-xs font-bold border border-emerald-100 transition-colors cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
