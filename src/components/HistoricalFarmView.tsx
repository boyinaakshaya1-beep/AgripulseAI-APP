import React, { useState, useEffect } from 'react';
import {
  History,
  Calendar,
  TrendingUp,
  PlusCircle,
  AlertTriangle,
  Droplets,
  Layers,
  FileText,
  Trash2,
  RefreshCw,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  Award,
} from 'lucide-react';
import { FarmHistoryRecord, FarmHistoryAnalysis } from '../types';
import { INITIAL_DEMO_FARM_HISTORY, analyzeFarmHistory } from '../data/farmHistoryData';
import { useLanguage } from '../context/LanguageContext';
import { TabType } from '../App';

interface HistoricalFarmViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const HistoricalFarmView: React.FC<HistoricalFarmViewProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();
  const isTelugu = language === 'Telugu';

  // Load records from localStorage or initial demo data
  const [records, setRecords] = useState<FarmHistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('agripulse_farm_history');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse farm history', e);
    }
    return INITIAL_DEMO_FARM_HISTORY;
  });

  // New Record Form State
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newYear, setNewYear] = useState<number>(2026);
  const [newSeason, setNewSeason] = useState<string>('Rabi');
  const [newCrop, setNewCrop] = useState<string>('Bengal Gram / శనగ');
  const [newYield, setNewYield] = useState<string>('12 Quintals / Acre');
  const [newYieldRating, setNewYieldRating] = useState<'Good' | 'Average' | 'Poor'>('Good');
  const [newPest, setNewPest] = useState<string>('Pod Borer (శనగ పచ్చ పురుగు - Low)');
  const [newIrrigation, setNewIrrigation] = useState<string>('Drip');
  const [newSoilObs, setNewSoilObs] = useState<string>('Soil friable and rich in root nodules.');
  const [newNotes, setNewNotes] = useState<string>('Successful relay cropping with low water usage.');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('agripulse_farm_history', JSON.stringify(records));
    } catch (e) {
      console.warn('Failed to save farm history', e);
    }
  }, [records]);

  // Analyze records
  const analysis: FarmHistoryAnalysis = analyzeFarmHistory(records, language);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const newRec: FarmHistoryRecord = {
      id: `record-${Date.now()}`,
      year: newYear,
      season: newSeason,
      crop: newCrop,
      yieldApprox: newYield,
      yieldRating: newYieldRating,
      majorPestOrDisease: newPest,
      irrigationMethod: newIrrigation,
      soilObservations: newSoilObs,
      farmNotes: newNotes,
      isDemoData: false,
    };

    setRecords([newRec, ...records]);
    setIsAddingNew(false);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  const handleResetToDemo = () => {
    setRecords(INITIAL_DEMO_FARM_HISTORY);
  };

  const hasUserRecords = records.some((r) => !r.isDemoData);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1A3326] via-[#214332] to-[#12241A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#2D5A45] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-400/30">
            <History className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'పంటల కాలక్రమం & క్షేత్ర నిఘా విశ్లేషణ' : 'Longitudinal Crop & Field Analytics'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-white">
            {isTelugu ? '📊 వ్యవసాయ చరిత్ర & క్షేత్ర విశ్లేషణ (Historical Farm Analysis)' : '📊 Historical Farm Analysis'}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            {isTelugu
              ? 'గత పంటల దిగుబడులు, పునరావృతమైన తెగుళ్లు, నీటి పారుదల మరియు నేల పరిశీలనలను నమోదు చేసి దీర్ఘకాలిక వ్యవసాయ పోకడలను తెలుసుకోండి.'
              : 'Log historical crops, yields, recurring pests, and soil conditions to discover seasonal patterns, soil trends, and smarter crop planning.'}
          </p>
        </div>

        {/* Status Notice Banner */}
        <div className="mt-5 p-3.5 bg-amber-500/15 border border-amber-400/40 rounded-2xl flex items-start justify-between gap-3 text-amber-200 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <Info className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-amber-100">
                {hasUserRecords
                  ? isTelugu
                    ? 'రైతు స్వంత రికార్డులు + నమూనా డేటా క్రియాశీలంగా ఉన్నాయి'
                    : 'Farmer Custom Records + Demo Baseline Active'
                  : isTelugu
                  ? 'ప్రారంభ నమూనా రికార్డులు (INITIAL SAMPLE DATA):'
                  : 'INITIAL DEMO DATA:'}
              </span>
              <p className="text-amber-200/90 text-xs">
                {isTelugu
                  ? 'మీరు స్వంత క్షేత్ర వివరాలను నమోదు చేసే వరకు ప్రారంభ నమూనా రికార్డులు (2024-2026) విశ్లేషణ కోసం ప్రదర్శించబడుతున్నాయి.'
                  : 'Displaying baseline sample farm records (2024-2026) demonstrating timeline trends until you log your farm seasons.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetToDemo}
            className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 px-3 py-1.5 rounded-xl border border-amber-400/30 transition-colors shrink-0 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{isTelugu ? 'నమూనా లోడ్' : 'Reset Demo'}</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
              {isTelugu ? 'నమోదైన సీజన్లు' : 'Recorded Seasons'}
            </span>
            <span className="text-2xl font-black text-gray-900 leading-tight">
              {analysis.totalSeasonsRecorded} {isTelugu ? 'సీజన్లు' : 'Seasons'}
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
              {isTelugu ? 'అధిక పనితీరు గల పంటలు' : 'Top Performing Crops'}
            </span>
            <span className="text-sm font-bold text-gray-900 line-clamp-1">
              {analysis.topPerformingCrops.join(', ') || (isTelugu ? 'టమాటా, శనగ' : 'Tomato, Gram')}
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
              {isTelugu ? 'పునరావృత సమస్యలు' : 'Recurring Issues'}
            </span>
            <span className="text-sm font-bold text-gray-900 line-clamp-1">
              {analysis.recurringPests.length > 0
                ? `${analysis.recurringPests.length} ${isTelugu ? 'సమస్యలు గుర్తించబడ్డాయి' : 'patterns tracked'}`
                : isTelugu
                ? 'ఏమీ లేవు'
                : 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Action Bar & Modal Toggle */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold text-[#1B3B2B] flex items-center gap-2">
          <History className="w-5 h-5 text-emerald-600" />
          {isTelugu ? 'పంట చరిత్ర కాలక్రమం (Crop History Timeline)' : 'Crop History Timeline'}
        </h2>

        <button
          id="add-history-record-toggle-btn"
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="px-4 py-2.5 bg-[#1B3B2B] hover:bg-[#254F3A] text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>{isAddingNew ? (isTelugu ? 'ఫారమ్ మూసివేయండి' : 'Close Form') : (isTelugu ? 'కొత్త పంట అనుభవాన్ని నమోదు చేయండి +' : 'Log New Season +')}</span>
        </button>
      </div>

      {/* New Record Inline Entry Form */}
      {isAddingNew && (
        <div className="bg-emerald-50/60 rounded-3xl p-5 sm:p-6 border border-emerald-200 shadow-md space-y-4 animate-in fade-in-50 duration-200">
          <div className="border-b border-emerald-200/80 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              {isTelugu ? 'కొత్త పంట సీజన్ రికార్డు నమోదు' : 'Record New Farm Season'}
            </h3>
            <span className="text-xs text-emerald-700 font-semibold">
              {isTelugu ? 'క్షేత్ర అనుభవం' : 'Field Log'}
            </span>
          </div>

          <form onSubmit={handleAddRecord} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Year */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isTelugu ? 'సంవత్సరం (Year)' : 'Year'}
                </label>
                <input
                  type="number"
                  value={newYear}
                  onChange={(e) => setNewYear(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-semibold"
                />
              </div>

              {/* Season */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isTelugu ? 'సీజన్ (Season)' : 'Season'}
                </label>
                <select
                  value={newSeason}
                  onChange={(e) => setNewSeason(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-semibold"
                >
                  <option value="Kharif">{isTelugu ? 'ఖరీఫ్ (Kharif / Monsoon)' : 'Kharif'}</option>
                  <option value="Rabi">{isTelugu ? 'రబీ (Rabi / Winter)' : 'Rabi'}</option>
                  <option value="Zaid">{isTelugu ? 'జాయెద్ / వేసవి (Zaid / Summer)' : 'Zaid / Summer'}</option>
                </select>
              </div>

              {/* Crop */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isTelugu ? 'పంట పేరు (Crop)' : 'Crop Name'}
                </label>
                <input
                  type="text"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  placeholder={isTelugu ? 'ఉదా. టమాటా, మిరప, శనగ...' : 'e.g. Tomato, Chilli, Gram...'}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-semibold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Yield */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isTelugu ? 'సుమారు దిగుబడి (Approx Yield)' : 'Approximate Yield'}
                </label>
                <input
                  type="text"
                  value={newYield}
                  onChange={(e) => setNewYield(e.target.value)}
                  placeholder="e.g. 20 Tonnes / Acre"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-semibold"
                />
              </div>

              {/* Yield Rating */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isTelugu ? 'దిగుబడి రేటింగ్ (Performance)' : 'Yield Rating'}
                </label>
                <select
                  value={newYieldRating}
                  onChange={(e) => setNewYieldRating(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-semibold"
                >
                  <option value="Good">{isTelugu ? 'మంచిది (Good)' : 'Good'}</option>
                  <option value="Average">{isTelugu ? 'మధ్యస్థం (Average)' : 'Average'}</option>
                  <option value="Poor">{isTelugu ? 'బలహీనం (Poor)' : 'Poor'}</option>
                </select>
              </div>

              {/* Irrigation */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isTelugu ? 'నీటి పారుదల విధానం' : 'Irrigation Method'}
                </label>
                <select
                  value={newIrrigation}
                  onChange={(e) => setNewIrrigation(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl font-semibold"
                >
                  <option value="Drip">{isTelugu ? 'బిందు సేద్యం (Drip)' : 'Drip'}</option>
                  <option value="Borewell / Flood">{isTelugu ? 'బోరు / కాల్వ పారుదల (Flood)' : 'Flood / Borewell'}</option>
                  <option value="Canal">{isTelugu ? 'కాలువ నీరు (Canal)' : 'Canal'}</option>
                  <option value="Rainfed">{isTelugu ? 'వర్షాధారం (Rainfed)' : 'Rainfed'}</option>
                  <option value="Sprinkler">{isTelugu ? 'స్ప్రింక్లర్ (Sprinkler)' : 'Sprinkler'}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Major Pest or Disease */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isTelugu ? 'ఎదురైన ప్రధాన తెగులు / పురుగు' : 'Major Pest / Disease'}
                </label>
                <input
                  type="text"
                  value={newPest}
                  onChange={(e) => setNewPest(e.target.value)}
                  placeholder={isTelugu ? 'ఉదా. తామర పురుగులు, ఆకుమచ్చ తెగులు...' : 'e.g. Thrips, Early Blight...'}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl"
                />
              </div>

              {/* Soil Observations */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isTelugu ? 'నేల పరిశీలనలు (Soil Observations)' : 'Soil Observations'}
                </label>
                <input
                  type="text"
                  value={newSoilObs}
                  onChange={(e) => setNewSoilObs(e.target.value)}
                  placeholder={isTelugu ? 'ఉదా. నేల తేమ నిలిచింది, లేదా గట్టిపడింది...' : 'e.g. Good organic layer, compaction noticed...'}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            {/* Farm Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isTelugu ? 'రైతు ముఖ్యమైన అనుభవాలు & గమనికలు' : 'Important Farm Notes'}
              </label>
              <textarea
                rows={2}
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder={isTelugu ? 'ఉదా. వేప పిండి వేయడం వల్ల పురుగులు తగ్గాయి...' : 'e.g. Applied neem cake, good market rate...'}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
              >
                {isTelugu ? 'రద్దు చేయండి' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                {isTelugu ? 'రికార్డును భద్రపరచండి' : 'Save Record'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline List */}
      <div className="space-y-4">
        {records.map((rec, idx) => (
          <div
            key={rec.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm hover:border-emerald-300 transition-colors relative space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold text-sm">
                  {rec.year}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-bold">
                      {rec.season}
                    </span>
                    <h3 className="text-base font-bold text-gray-900">{rec.crop}</h3>
                    {rec.isDemoData && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md uppercase">
                        Sample Data
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {isTelugu ? 'దిగుబడి:' : 'Yield:'} {rec.yieldApprox}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    rec.yieldRating === 'Good'
                      ? 'bg-emerald-100 text-emerald-900'
                      : rec.yieldRating === 'Average'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-red-100 text-red-900'
                  }`}
                >
                  {rec.yieldRating === 'Good'
                    ? isTelugu
                      ? 'మంచి దిగుబడి'
                      : 'Good Performance'
                    : rec.yieldRating === 'Average'
                    ? isTelugu
                      ? 'మధ్యస్థ దిగుబడి'
                      : 'Average Performance'
                    : isTelugu
                    ? 'తక్కువ దిగుబడి'
                    : 'Poor Performance'}
                </span>

                <button
                  onClick={() => handleDeleteRecord(rec.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                  title="Delete record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Record Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[11px] font-bold text-gray-600 block mb-0.5">
                  {isTelugu ? 'ప్రధాన తెగులు / పురుగు:' : 'Major Pest / Disease:'}
                </span>
                <span className="text-gray-900 font-semibold">{rec.majorPestOrDisease || (isTelugu ? 'ఏమీ లేదు' : 'None')}</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[11px] font-bold text-gray-600 block mb-0.5">
                  {isTelugu ? 'నీటి పారుదల:' : 'Irrigation:'}
                </span>
                <span className="text-gray-900 font-semibold">{rec.irrigationMethod}</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[11px] font-bold text-gray-600 block mb-0.5">
                  {isTelugu ? 'నేల పరిశీలన:' : 'Soil Observation:'}
                </span>
                <span className="text-gray-900 font-semibold">{rec.soilObservations}</span>
              </div>
            </div>

            {rec.farmNotes && (
              <p className="text-xs text-gray-700 bg-emerald-50/40 p-3 rounded-2xl border border-emerald-100/70 italic">
                "{rec.farmNotes}"
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Pattern Recognition & Analytics Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Important Patterns Detected */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-[#1B3B2B] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            {isTelugu ? 'గుర్తించిన ముఖ్యమైన పోకడలు & నమూనాలు (Key Patterns)' : 'Summary of Important Patterns & Observations'}
          </h3>
          <div className="space-y-2.5">
            {analysis.importantPatterns.map((pat, idx) => (
              <div key={idx} className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/80 flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{pat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Adjustments for Future Seasons */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-[#1B3B2B] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            {isTelugu ? 'భవిష్యత్ సీజన్లకు సిఫార్సు చేసిన మార్పులు' : 'Suggested Adjustments for Future Seasons'}
          </h3>
          <div className="space-y-2.5">
            {analysis.suggestedFutureAdjustments.map((adj, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{adj}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
