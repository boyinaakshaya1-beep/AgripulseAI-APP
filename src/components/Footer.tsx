import React from 'react';
import { Sprout, ShieldAlert, Mic } from 'lucide-react';
import { TabType } from '../App';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#1B3B2B] text-emerald-100/80 border-t border-[#2D5A45] pt-12 pb-24 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-[#1B3B2B] font-bold shadow-sm">
                <Sprout className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold font-display text-white">
                {t.appName} <span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-emerald-200/70 max-w-sm leading-relaxed">
              {language === 'Telugu'
                ? 'రైతుల కోసం 7 భాషలలో సహజమైన వాయిస్ అసిస్టెంట్, పంట వ్యాధుల గుర్తింపు, ఖచ్చితమైన వాతావరణం, పంట సాగు విజ్ఞానం మరియు స్మార్ట్ వ్యవసాయ సలహాలు.'
                : 'Empowering farmers with multilingual voice conversation in 7 languages, instant AI vision leaf diagnostics, precision micro-climate spray windows, agronomic guides, and customized farm fertilizer planning.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">
              {language === 'Telugu' ? 'ముఖ్యమైన లింకులు' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/70">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  {t.navDashboard}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('voice');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 font-semibold text-emerald-300 cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{t.navVoice} (7 {language === 'Telugu' ? 'భాషలు' : 'Languages'})</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('disease');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  {t.navDisease}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('crops');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  {t.navCrops}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('weather');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  {t.navWeather}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('recommendations');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  {t.navRecommendations}
                </button>
              </li>
            </ul>
          </div>

          {/* Disclaimer Box */}
          <div className="md:col-span-4 p-5 bg-[#152E21] rounded-2xl border border-[#2D5A45] space-y-2 text-xs text-emerald-200/80 shadow-sm">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <ShieldAlert className="w-4 h-4" />
              {t.disclaimerTitle}
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-200/70">
              {t.disclaimerBody}
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-[#2D5A45] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-emerald-300/60">
          <p>© {new Date().getFullYear()} AgriPulse AI. {language === 'Telugu' ? 'రైతు సేవలో ఆధునిక సాంకేతికత.' : 'Built for modern precision farming.'}</p>
          <p className="flex items-center gap-1 text-emerald-300/80 font-medium">
            {language === 'Telugu' ? 'రైతుల శ్రేయస్సు - అధిక దిగుబడి మా లక్ష్యం' : 'Dedicated to healthy crops & sustainable harvests'}
          </p>
        </div>

      </div>
    </footer>
  );
};
