import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  Sprout,
  Droplets,
  Layers,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  ChevronRight,
  TrendingUp,
  MapPin,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { CropRotationInput, CropRotationPlan } from '../types';
import { generateCropRotationPlan } from '../data/rotationData';
import { SOIL_TYPES } from '../data/soilData';
import { useLanguage } from '../context/LanguageContext';
import { TabType } from '../App';

interface CropRotationViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const CropRotationView: React.FC<CropRotationViewProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();
  const isTelugu = language === 'Telugu';

  // Form input state
  const [formData, setFormData] = useState<CropRotationInput>({
    currentCrop: 'Tomato',
    soilType: 'Red Sandy Loam / ఎర్ర నేల',
    season: 'Kharif',
    waterAvailability: 'Moderate / Borewell',
    farmLocation: 'Andhra Pradesh / Telangana',
    previousPestIssue: 'Early Blight & Thrips (ఆకుమచ్చ & తామర పురుగులు)',
  });

  const [plan, setPlan] = useState<CropRotationPlan>(() =>
    generateCropRotationPlan(
      {
        currentCrop: 'Tomato',
        soilType: 'Red Sandy Loam / ఎర్ర నేల',
        season: 'Kharif',
        waterAvailability: 'Moderate / Borewell',
        farmLocation: 'Andhra Pradesh / Telangana',
        previousPestIssue: 'Early Blight & Thrips (ఆకుమచ్చ & తామర పురుగులు)',
      },
      language
    )
  );

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateCropRotationPlan(formData, language);
      setPlan(generated);
      setIsGenerating(false);
    }, 250);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#183627] via-[#224A36] to-[#122A1E] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#2D5A45] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-400/30">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'శాస్త్రీయ నేల పునరుద్ధరణ & పంట మార్పిడి' : 'Scientific Botanical Succession & Tilth Restoration'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-white">
            {isTelugu ? '🔄 స్మార్ట్ పంట మార్పిడి ప్రణాళిక (Smart Crop Rotation Planner)' : '🔄 Smart Crop Rotation Planner'}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            {isTelugu
              ? 'మీ ప్రస్తుత పంట, నేల స్వభావం మరియు నీటి లభ్యతకు సరిపోయే 3-సీజన్ల పంట మార్పిడి ప్రణాళికను రూపొందించి నేల సారాన్ని పెంచండి, తెగుళ్ల చక్రాన్ని తెంచండి.'
              : 'Generate an intelligent 3-season crop rotation plan to replenish organic nitrogen, break persistent soil-borne fungal cycles, and stabilize long-term yield.'}
          </p>
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-5 p-3.5 bg-amber-500/15 border border-amber-400/40 rounded-2xl flex items-start gap-3 text-amber-200 text-xs sm:text-sm">
          <Info className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-100">
              {isTelugu ? '⚠️ వ్యవసాయ సలహా సూచన (Notice):' : '⚠️ AGRONOMIC NOTICE:'}
            </span>
            <p className="text-amber-200/90 text-xs">
              {plan.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Rotation Input (Left) & 3-Season Visual Sequence (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Parameters */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm space-y-5">
          <div className="border-b border-emerald-100 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1B3B2B] flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-emerald-600" />
              {isTelugu ? 'పంట మార్పిడి పారామితులు' : 'Rotation Parameters'}
            </h2>
            <span className="text-xs text-gray-500">{isTelugu ? '3-సీజన్ల లెక్క' : '3-Season Plan'}</span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 text-xs sm:text-sm">
            {/* Current / Baseline Crop */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isTelugu ? '1. ప్రస్తుత లేదా ముగిసిన పంట (Current / Previous Crop)' : '1. Current or Previous Crop:'}
              </label>
              <select
                value={formData.currentCrop}
                onChange={(e) => setFormData({ ...formData, currentCrop: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-gray-900 font-medium"
              >
                <option value="Tomato">{isTelugu ? 'టమాటా (Tomato - Solanaceae)' : 'Tomato (Solanaceae)'}</option>
                <option value="Chilli">{isTelugu ? 'మిరప (Chilli - Solanaceae)' : 'Chilli (Solanaceae)'}</option>
                <option value="Cotton">{isTelugu ? 'పత్తి (Cotton - Malvaceae)' : 'Cotton (Malvaceae)'}</option>
                <option value="Paddy / Rice">{isTelugu ? 'వరి (Paddy / Rice - Poaceae)' : 'Paddy / Rice (Poaceae)'}</option>
                <option value="Maize">{isTelugu ? 'మొక్కజొన్న (Maize - Poaceae)' : 'Maize (Poaceae)'}</option>
                <option value="Groundnut">{isTelugu ? 'వేరుశనగ (Groundnut - Fabaceae)' : 'Groundnut (Fabaceae)'}</option>
              </select>
            </div>

            {/* Soil Type */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isTelugu ? '2. నేల రకం (Soil Type)' : '2. Soil Type:'}
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium"
              >
                {SOIL_TYPES.map((st) => (
                  <option key={st.id} value={st.name}>
                    {isTelugu ? st.nameTelugu : st.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Season */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isTelugu ? '3. ప్రస్తుత సీజన్ (Current Season)' : '3. Season:'}
              </label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium"
              >
                <option value="Kharif">{isTelugu ? 'ఖరీఫ్ (Kharif / Monsoon)' : 'Kharif'}</option>
                <option value="Rabi">{isTelugu ? 'రబీ (Rabi / Winter)' : 'Rabi'}</option>
                <option value="Zaid">{isTelugu ? 'జాయెద్ / వేసవి (Zaid / Summer)' : 'Zaid / Summer'}</option>
              </select>
            </div>

            {/* Water Availability */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isTelugu ? '4. నీటి లభ్యత (Water Availability)' : '4. Water Availability:'}
              </label>
              <select
                value={formData.waterAvailability}
                onChange={(e) => setFormData({ ...formData, waterAvailability: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-medium"
              >
                <option value="Drip Protected">{isTelugu ? 'బిందు సేద్యం (Drip Protected)' : 'Drip Protected'}</option>
                <option value="Moderate / Borewell">{isTelugu ? 'బోరుబావి / మితమైన నీరు (Borewell)' : 'Moderate / Borewell'}</option>
                <option value="Abundant / Canal">{isTelugu ? 'కాలువ / సమృద్ధిగా నీరు (Canal)' : 'Abundant / Canal'}</option>
                <option value="Limited / Rainfed">{isTelugu ? 'వర్షాధారం / పరిమిత నీరు (Rainfed)' : 'Limited / Rainfed'}</option>
              </select>
            </div>

            {/* Farm Location (Optional) */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isTelugu ? '5. ప్రాంతం / క్షేత్ర స్థలం (Farm Location - Optional)' : '5. Location (Optional):'}
              </label>
              <input
                type="text"
                value={formData.farmLocation}
                onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
                placeholder={isTelugu ? 'ఉదా. గుంటూరు, వరంగల్, కర్నూలు...' : 'e.g. Guntur, Warangal, Kurnool...'}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            {/* Previous Pest Issue */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isTelugu ? '6. గతంలో ఎదురైన ప్రధాన తెగులు సమస్య' : '6. Previous Pest / Disease Problem:'}
              </label>
              <input
                type="text"
                value={formData.previousPestIssue}
                onChange={(e) => setFormData({ ...formData, previousPestIssue: e.target.value })}
                placeholder={isTelugu ? 'ఉదా. ఆకుమచ్చ, తామర పురుగులు, వేరు కుళ్లు...' : 'e.g. Early Blight, Thrips...'}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full mt-2 py-3 bg-[#1B3B2B] hover:bg-[#254F3A] text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{isGenerating ? (isTelugu ? 'రూపొందిస్తున్నాం...' : 'Generating Plan...') : (isTelugu ? '3-సీజన్ల పంట మార్పిడిని రూపొందించండి' : 'Generate 3-Season Plan')}</span>
            </button>
          </form>
        </div>

        {/* Right Column: 3-Season Progression & Educational Rationale */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* 3-Season Visual Progression Roadmap */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#1B3B2B] flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-emerald-600" />
              {isTelugu ? '3-సీజన్ల పంట మార్పిడి క్రమం (3-Season Succession Plan)' : '3-Season Succession Sequence'}
            </h3>

            <div className="space-y-4">
              {plan.seasons.map((season, idx) => (
                <div
                  key={season.seasonNumber}
                  className={`p-5 rounded-2xl border transition-all ${
                    season.seasonNumber === 1
                      ? 'bg-gray-50/70 border-gray-200'
                      : season.seasonNumber === 2
                      ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/20'
                      : 'bg-blue-50/80 border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center ${
                          season.seasonNumber === 1
                            ? 'bg-gray-200 text-gray-800'
                            : season.seasonNumber === 2
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-blue-600 text-white shadow-xs'
                        }`}
                      >
                        S{season.seasonNumber}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900">{season.seasonName}</h4>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-white/90 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {season.cropFamily}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-bold text-sm text-gray-900">{season.suggestedCrop}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed pl-6 font-medium">
                      {season.rationale}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 pl-6">
                      <span className="px-2 py-0.5 bg-white text-gray-700 rounded-md border border-gray-200 text-[11px]">
                        🌱 {season.purpose}
                      </span>
                      <span className="px-2 py-0.5 bg-white text-emerald-800 rounded-md border border-emerald-200 text-[11px] font-semibold">
                        ⚡ {season.nutrientContribution}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Suggested Section */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-[#1B3B2B] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {isTelugu ? 'ఈ తదుపరి పంట ఎందుకు సూచించబడింది? (Why This Succession?)' : 'Why This Succession Was Suggested'}
            </h3>
            <ul className="space-y-2">
              {plan.whySuggested.map((why, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{why}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Diversity & Soil Management Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Crop Diversity Benefits */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm space-y-2.5">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-600" />
                {isTelugu ? 'పంటల వైవిధ్య ప్రయోజనాలు' : 'Crop Diversity Benefits'}
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {plan.cropDiversityBenefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soil Nutrient Management */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm space-y-2.5">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                {isTelugu ? 'నేల పోషకాల యాజమాన్యం' : 'Soil Nutrient Management'}
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {plan.soilNutrientManagement.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Potential Benefits & Important Cautions */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-[#1B3B2B] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              {isTelugu ? 'పంట మార్పిడి వల్ల కలిగే ప్రయోజనాలు & ముఖ్యమైన జాగ్రత్తలు' : 'Potential Benefits & Cautions'}
            </h3>
            
            <div className="space-y-2">
              {plan.potentialBenefits.map((pb, idx) => (
                <div key={idx} className="p-3 bg-emerald-50/40 rounded-2xl border border-emerald-100 flex items-start gap-2 text-xs sm:text-sm text-emerald-950 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{pb}</span>
                </div>
              ))}
              {plan.cautions.map((c, idx) => (
                <div key={idx} className="p-3 bg-amber-50/50 rounded-2xl border border-amber-200/80 flex items-start gap-2 text-xs sm:text-sm text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
