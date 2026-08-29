import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { VoiceAssistantView } from './components/VoiceAssistantView';
import { DiseaseDetectionView } from './components/DiseaseDetectionView';
import { CropInfoView } from './components/CropInfoView';
import { WeatherView } from './components/WeatherView';
import { RecommendationsView } from './components/RecommendationsView';
import { SoilHealthView } from './components/SoilHealthView';
import { PestDiseaseAlertsView } from './components/PestDiseaseAlertsView';
import { HistoricalFarmView } from './components/HistoricalFarmView';
import { CropRotationView } from './components/CropRotationView';
import { Footer } from './components/Footer';
import { ScanHistoryRecord } from './types';
import { SAMPLE_DETECTIONS_DB } from './data/sampleDiseases';
import { Mic } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LocationProvider } from './context/LocationContext';

export type TabType =
  | 'dashboard'
  | 'voice'
  | 'disease'
  | 'crops'
  | 'weather'
  | 'recommendations'
  | 'soil'
  | 'alerts'
  | 'history'
  | 'rotation';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const { t, language } = useLanguage();

  const [scanHistory, setScanHistory] = useState<ScanHistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('agripulse_scan_history');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load history from localStorage', e);
    }
    // Initial sample history items across diverse crops
    const riceSample = SAMPLE_DETECTIONS_DB['sample-rice-blast'];
    const cottonSample = SAMPLE_DETECTIONS_DB['sample-healthy-cotton'];
    return [
      {
        ...riceSample,
        id: 'scan-init-1',
        date: 'Today, 8:30 AM',
        thumbnailUrl: 'https://images.unsplash.com/photo-1536617621972-602b9e4a7d6c?auto=format&fit=crop&w=400&q=80',
      },
      {
        ...cottonSample,
        id: 'scan-init-2',
        date: 'Yesterday, 4:15 PM',
        thumbnailUrl: 'https://images.unsplash.com/photo-1594488506307-eefdf34b54e7?auto=format&fit=crop&w=400&q=80',
      },
    ];
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('agripulse_scan_history', JSON.stringify(scanHistory));
    } catch (e) {
      console.warn('Failed to persist history', e);
    }
  }, [scanHistory]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#F8FAF8] text-[#1A2E1A] font-sans selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tempUnit={tempUnit}
        setTempUnit={setTempUnit}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-full overflow-x-clip pb-20 md:pb-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            setActiveTab={setActiveTab}
            tempUnit={tempUnit}
            scanHistory={scanHistory}
          />
        )}

        {activeTab === 'voice' && (
          <VoiceAssistantView
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'disease' && (
          <DiseaseDetectionView
            scanHistory={scanHistory}
            setScanHistory={setScanHistory}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'soil' && (
          <SoilHealthView
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'alerts' && (
          <PestDiseaseAlertsView
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'history' && (
          <HistoricalFarmView
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'rotation' && (
          <CropRotationView
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'crops' && (
          <CropInfoView
            setActiveTab={setActiveTab}
            onSelectForDiagnosis={(cropName) => {
              setActiveTab('disease');
            }}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherView
            tempUnit={tempUnit}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'recommendations' && (
          <RecommendationsView
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Floating Quick Voice Assistant Trigger (Visible when not in voice tab) */}
      {activeTab !== 'voice' && (
        <button
          id="floating-voice-assistant-btn"
          onClick={() => {
            setActiveTab('voice');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-20 md:bottom-8 right-4 sm:right-8 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#1B3B2B] text-emerald-300 hover:bg-[#254F3A] hover:text-white rounded-full shadow-2xl border-2 border-emerald-400/80 transition-all transform hover:scale-105 group cursor-pointer"
          title={t.talkToVoiceAI}
        >
          <div className="relative flex items-center justify-center">
            <Mic className="w-5 h-5 text-emerald-400 group-hover:animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-xs font-bold leading-tight text-white">{t.navVoice}</span>
            <span className="block text-[10px] text-emerald-300 font-medium">{language} AI</span>
          </div>
        </button>
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Mobile Sticky Bottom Nav */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <LocationProvider>
        <AppContent />
      </LocationProvider>
    </LanguageProvider>
  );
}
