import React from 'react';
import { Sprout, Stethoscope, BookOpen, CloudSun, Sparkles, Mic } from 'lucide-react';
import { TabType } from '../App';
import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  interface NavItem {
    id: TabType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
    specialVoice?: boolean;
  }

  const navItems: NavItem[] = [
    { id: 'dashboard', label: t.navDashboard, icon: Sprout },
    { id: 'voice', label: t.navVoice, icon: Mic, specialVoice: true },
    { id: 'disease', label: t.navDisease, icon: Stethoscope, highlight: true },
    { id: 'crops', label: t.navCrops, icon: BookOpen },
    { id: 'weather', label: t.navWeather, icon: CloudSun },
    { id: 'recommendations', label: t.navRecommendations, icon: Sparkles },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1B3B2B]/95 backdrop-blur-lg border-t border-[#2D5A45] px-1.5 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-2xl transition-all min-w-[48px] ${
                isActive
                  ? 'text-emerald-300 font-bold'
                  : 'text-emerald-200/60 hover:text-emerald-100'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-transform ${
                  isActive
                    ? 'bg-[#152E21] text-emerald-400 scale-105 border border-[#2D5A45] shadow-xs'
                    : item.specialVoice
                    ? 'bg-emerald-500 text-[#1B3B2B] shadow-sm font-bold scale-105'
                    : item.highlight
                    ? 'bg-emerald-900/60 text-emerald-300'
                    : 'text-emerald-200/70'
                }`}
              >
                <Icon className={`w-5 h-5 ${item.specialVoice && !isActive ? 'text-[#1B3B2B]' : ''}`} />
              </div>
              <span className={`text-[9.5px] mt-0.5 tracking-tight font-medium line-clamp-1 max-w-[55px] text-center ${item.specialVoice && !isActive ? 'text-emerald-300 font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
