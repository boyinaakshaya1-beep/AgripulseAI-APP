import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  Bug,
  CheckCircle2,
  Camera,
  Upload,
  Sparkles,
  Info,
  ChevronRight,
  Stethoscope,
  Filter,
  MapPin,
  Calendar,
  Layers,
} from 'lucide-react';
import { PestAlertInput, PestAlertResult, PestAlertItem } from '../types';
import {
  REGIONAL_SAMPLE_ALERTS,
  TELUGU_REGIONAL_SAMPLE_ALERTS,
  getLocalizedRegionalAlerts,
  COMMON_SYMPTOMS_LIST,
  analyzePestAlert,
} from '../data/pestAlertsData';
import { useLanguage } from '../context/LanguageContext';
import { TabType } from '../App';

interface PestDiseaseAlertsViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const PestDiseaseAlertsView: React.FC<PestDiseaseAlertsViewProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();
  const isTelugu = language === 'Telugu';

  // Form input state
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['leaf-spots', 'leaf-curling']);
  const [customDescription, setCustomDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Result state
  const [result, setResult] = useState<PestAlertResult>(() =>
    analyzePestAlert(
      {
        crop: 'Tomato',
        symptoms: ['leaf-spots', 'leaf-curling'],
        customDescription: '',
      },
      language
    )
  );

  // Re-run analysis immediately whenever language or any input changes
  useEffect(() => {
    const res = analyzePestAlert(
      {
        crop: selectedCrop,
        symptoms: selectedSymptoms,
        customDescription,
        imageUrl: uploadedImage || undefined,
      },
      language
    );
    setResult(res);
  }, [language, selectedCrop, selectedSymptoms, customDescription, uploadedImage]);

  const [activeRegionalFilter, setActiveRegionalFilter] = useState<'All' | 'High' | 'Medium'>('All');

  const handleToggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId]
    );
  };

  const handleRunAlertCheck = () => {
    const res = analyzePestAlert(
      {
        crop: selectedCrop,
        symptoms: selectedSymptoms,
        customDescription,
        imageUrl: uploadedImage || undefined,
      },
      language
    );
    setResult(res);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentRegionalAlerts = getLocalizedRegionalAlerts(language);
  const filteredRegionalAlerts = currentRegionalAlerts.filter((item) => {
    if (activeRegionalFilter === 'All') return true;
    return item.riskLevel === activeRegionalFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1E2E1F] via-[#2A462F] to-[#152E21] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#2D5A45] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-semibold border border-red-400/30">
            <Bug className="w-3.5 h-3.5" />
            <span>{isTelugu ? 'ముందస్తు తెగుళ్ల నిఘా & హెచ్చరికలు' : 'Pest Surveillance & Early Warning Radar'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-white">
            {isTelugu ? '🐛 తెగులు & వ్యాధి హెచ్చరికలు (Pest & Disease Alerts)' : '🐛 Pest & Disease Alerts'}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            {isTelugu
              ? 'మీ పంట లక్షణాలు, కీటకాల సంకేతాలు లేదా ప్రాంతీయ నిఘా సమాచారాన్ని బట్టి ముందస్తు ప్రమాద స్థాయిని అంచనా వేసి తగిన నివారణ చర్యలను చేపట్టండి.'
              : 'Evaluate preliminary crop risk based on observed symptoms, insect signs, and regional advisories to implement immediate containment.'}
          </p>
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-5 p-3.5 bg-amber-500/15 border border-amber-400/40 rounded-2xl flex items-start gap-3 text-amber-200 text-xs sm:text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-100">
              {isTelugu ? '⚠️ AI ప్రాథమిక అంచనా మాత్రమే (Preliminary Assessment Notice):' : '⚠️ PRELIMINARY ASSESSMENT NOTICE:'}
            </span>
            <p className="text-amber-200/90 text-xs">
              {result.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Alert Checker Form (Left) & Risk Report / Regional Watch (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Crop & Symptom Checker Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm space-y-5">
          <div className="border-b border-emerald-100 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1B3B2B] flex items-center gap-2">
              <Bug className="w-5 h-5 text-emerald-600" />
              {isTelugu ? 'పంట & లక్షణాల ఎంపిక' : 'Crop & Symptoms Input'}
            </h2>
            <span className="text-xs text-gray-500">{isTelugu ? 'లక్షణాల తనిఖీ' : 'Symptom Match'}</span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* 1. Crop Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isTelugu ? '1. పంటను ఎంచుకోండి (Select Crop):' : '1. Select Crop:'}
              </label>
              <select
                id="alert-crop-select"
                value={selectedCrop}
                onChange={(e) => {
                  setSelectedCrop(e.target.value);
                }}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-gray-900 font-medium"
              >
                <option value="Tomato">{isTelugu ? 'టమాటా (Tomato)' : 'Tomato'}</option>
                <option value="Chilli">{isTelugu ? 'మిరప (Chilli)' : 'Chilli'}</option>
                <option value="Cotton">{isTelugu ? 'పత్తి (Cotton)' : 'Cotton'}</option>
                <option value="Paddy / Rice">{isTelugu ? 'వరి (Paddy / Rice)' : 'Paddy / Rice'}</option>
                <option value="Maize">{isTelugu ? 'మొక్కజొన్న (Maize)' : 'Maize'}</option>
                <option value="Groundnut">{isTelugu ? 'వేరుశనగ (Groundnut)' : 'Groundnut'}</option>
                <option value="Sugarcane">{isTelugu ? 'చెరకు (Sugarcane)' : 'Sugarcane'}</option>
              </select>
            </div>

            {/* 2. Observed Symptoms Multi-Select */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                {isTelugu ? '2. ఆకులపై కనిపిస్తున్న లక్షణాలు (Select Observed Symptoms):' : '2. Observed Symptoms (Select multiple):'}
              </label>
              <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto pr-1">
                {COMMON_SYMPTOMS_LIST.map((sym) => {
                  const isChecked = selectedSymptoms.includes(sym.id);
                  return (
                    <button
                      key={sym.id}
                      type="button"
                      onClick={() => handleToggleSymptom(sym.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between border ${
                        isChecked
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold shadow-2xs'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <span>{isTelugu ? sym.nameTelugu : sym.name}</span>
                      <span
                        className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] shrink-0 ${
                          isChecked ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-300 bg-white'
                        }`}
                      >
                        {isChecked && '✓'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Custom Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isTelugu ? '3. ఇతర గమనికలు లేదా లక్షణాలు (Optional Details):' : '3. Additional Notes / Observations:'}
              </label>
              <textarea
                id="alert-custom-description"
                rows={2}
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder={isTelugu ? 'ఉదా. ఆకులు ముడుచుకుని పైన నల్లటి పొడి కనిపిస్తోంది...' : 'e.g. Lower leaves yellowing, powdery dust noticed...'}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white text-gray-900 text-xs"
              />
            </div>

            {/* 4. Optional Photo Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isTelugu ? '4. బాధిత ఆకు / పంట ఫోటో (Image Upload):' : '4. Crop / Leaf Photo (Optional):'}
              </label>
              <div className="flex items-center gap-3">
                <label className="flex-1 px-3 py-2.5 bg-gray-50 hover:bg-emerald-50/60 border border-dashed border-gray-300 hover:border-emerald-400 rounded-xl cursor-pointer text-center text-xs font-semibold text-gray-700 transition-colors flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>{uploadedImage ? (isTelugu ? 'ఫోటో జోడించబడింది' : 'Photo Attached') : (isTelugu ? 'ఫోటో ఎంచుకోండి' : 'Choose Photo')}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {uploadedImage && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-emerald-300 relative shrink-0">
                    <img src={uploadedImage} alt="Crop sample" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              id="check-pest-alert-btn"
              type="button"
              onClick={handleRunAlertCheck}
              className="w-full mt-2 py-3 bg-[#1B3B2B] hover:bg-[#254F3A] text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{isTelugu ? 'తెగులు హెచ్చరికను తనిఖీ చేయండి' : 'Check Pest Alert & Risks'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Matched Diagnostic Alerts & Action Steps */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Active Assessment Card */}
          <div
            className={`rounded-3xl p-6 border shadow-sm ${
              result.riskLevel === 'High'
                ? 'bg-red-50/80 border-red-200'
                : result.riskLevel === 'Medium'
                ? 'bg-amber-50/80 border-amber-200'
                : 'bg-emerald-50/80 border-emerald-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200/60">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 ${
                    result.riskLevel === 'High'
                      ? 'bg-red-600'
                      : result.riskLevel === 'Medium'
                      ? 'bg-amber-500'
                      : 'bg-emerald-600'
                  }`}
                >
                  <Bug className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        result.riskLevel === 'High'
                          ? 'bg-red-200/80 text-red-900'
                          : result.riskLevel === 'Medium'
                          ? 'bg-amber-200/80 text-amber-900'
                          : 'bg-emerald-200/80 text-emerald-900'
                      }`}
                    >
                      {result.riskLevel === 'High'
                        ? '🚨 ' + (isTelugu ? 'అధిక ప్రమాదం / తీవ్ర హెచ్చరిక' : 'High Risk Alert')
                        : result.riskLevel === 'Medium'
                        ? '⚠️ ' + (isTelugu ? 'మధ్యస్థ ప్రమాదం' : 'Medium Risk')
                        : '🟢 ' + (isTelugu ? 'తక్కువ ప్రమాదం' : 'Low Risk')}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-200 text-gray-800 text-[10px] font-bold rounded-md uppercase">
                      {isTelugu ? 'నమూనా డేటా' : 'Sample Data'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-1 font-display">
                    {result.primaryDiagnosis}
                  </h3>
                </div>
              </div>

              {/* Direct Deep Scan Link */}
              <button
                onClick={() => setActiveTab('disease')}
                className="px-3.5 py-2 bg-white hover:bg-gray-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-300 shadow-2xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isTelugu ? 'AI కెమెరా స్కాన్ చేయండి →' : 'Deep AI Scan →'}</span>
              </button>
            </div>

            {/* Selected Symptoms Tag List */}
            <div className="mt-3.5 pt-1">
              <span className="text-[11px] font-bold text-gray-600 block mb-1.5">
                {isTelugu ? 'నమోదైన లక్షణాలు:' : 'Observed Symptoms:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {result.symptomsSummary.map((sym, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white/80 text-gray-800 rounded-lg text-xs font-medium border border-gray-200/80"
                  >
                    • {sym}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Next Steps */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-[#1B3B2B] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {isTelugu ? 'తక్షణమే చేపట్టవలసిన చర్యలు' : 'Suggested Next Steps'}
            </h3>
            <div className="space-y-2">
              {result.suggestedNextSteps.map((step, idx) => (
                <div key={idx} className="p-3 bg-emerald-50/40 rounded-2xl border border-emerald-100/70 flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention Practices */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-[#1B3B2B] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              {isTelugu ? 'ముందస్తు నివారణ పద్ధతులు' : 'Long-Term Prevention Practices'}
            </h3>
            <ul className="space-y-2">
              {result.preventionPractices.map((prev, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{prev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional Radar Alerts List */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold text-[#1B3B2B] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  {isTelugu ? 'ప్రాంతీయ నిఘా హెచ్చరికలు' : 'Regional Surveillance Radar'}
                </h3>
                <span className="text-[11px] text-gray-500">
                  {isTelugu ? 'నమూనా పర్యవేక్షణ సమాచారం' : 'Sample Surveillance Data'}
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setActiveRegionalFilter('All')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    activeRegionalFilter === 'All' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-gray-600'
                  }`}
                >
                  {isTelugu ? 'అన్నీ' : 'All'}
                </button>
                <button
                  onClick={() => setActiveRegionalFilter('High')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    activeRegionalFilter === 'High' ? 'bg-red-600 text-white shadow-2xs' : 'text-gray-600'
                  }`}
                >
                  {isTelugu ? 'తీవ్ర హెచ్చరికలు' : 'High Risk'}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredRegionalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 rounded-2xl border border-gray-200 hover:border-emerald-300 transition-colors bg-gray-50/50 space-y-2"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 font-bold rounded-lg text-xs">
                        {alert.crop}
                      </span>
                      <span className="text-xs font-bold text-gray-900 font-display">
                        {alert.pestOrDiseaseName}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        alert.riskLevel === 'High'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {alert.riskLevel === 'High' ? (isTelugu ? 'తీవ్ర ప్రమాదం' : 'High Risk') : (isTelugu ? 'మధ్యస్థ ప్రమాదం' : 'Medium Risk')} • {alert.alertStatus}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{alert.regionalArea}</span>
                  </p>

                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {alert.symptoms.map((sym, sIdx) => (
                      <span key={sIdx} className="text-[11px] bg-white px-2 py-0.5 rounded-md border border-gray-200 text-gray-700">
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
