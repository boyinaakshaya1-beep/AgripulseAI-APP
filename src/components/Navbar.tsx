import React, { useState, useRef, useEffect } from 'react';
import { 
  Sprout, 
  CloudSun, 
  Stethoscope, 
  BookOpen, 
  Sparkles, 
  Menu, 
  X, 
  Globe, 
  ShieldCheck, 
  Mic, 
  ChevronDown, 
  Check, 
  Layers, 
  Bug, 
  History, 
  RotateCcw, 
  MapPin, 
  MoreHorizontal 
} from 'lucide-react';
import { TabType } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from '../context/LocationContext';
import { SupportedLanguage } from '../types';
import { LocationSelectorModal } from './LocationSelectorModal';
import { formatShortLocation } from '../utils/locationFormatter';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  tempUnit: 'C' | 'F';
  setTempUnit: (unit: 'C' | 'F') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  tempUnit,
  setTempUnit,
}) => {
  const { language, setLanguage, t, allLanguages } = useLanguage();
  const { location, currentState, currentDistrict } = useLocation();
  const isTelugu = language === 'Telugu';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangDropdownOpen(false);
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  interface NavItem {
    id: TabType;
    label: string;
    description?: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  // All navigation items
  const allNavItems: NavItem[] = [
    { id: 'dashboard', label: t.navDashboard, icon: Sprout },
    { id: 'voice', label: t.navVoice, icon: Mic, badge: 'AI' },
    { id: 'disease', label: t.navDisease, icon: Stethoscope, badge: 'AI' },
    { id: 'soil', label: t.navSoil || 'Soil Health', icon: Layers },
    { id: 'alerts', label: t.navPestAlerts || 'Pest Alerts', icon: Bug },
    { id: 'weather', label: t.navWeather || 'Weather & Spray', icon: CloudSun, description: isTelugu ? 'వాతావరణం & పిచికారీ సూచనలు' : 'Forecast & Spray windows' },
    { id: 'rotation', label: t.navRotation || 'Crop Rotation', icon: RotateCcw, description: isTelugu ? 'శాస్త్రీయ పంట మార్పిడి ప్రణాళిక' : 'Smart Rotation Planner' },
    { id: 'history', label: t.navHistory || 'Farm History', icon: History, description: isTelugu ? 'పాత స్కాన్లు & రిపోర్టుల రికార్డు' : 'Scan Logs & Treatment history' },
    { id: 'crops', label: t.navCrops || 'Crop Guide', icon: BookOpen, description: isTelugu ? 'సమగ్ర సాగు మార్గదర్శిని' : 'Comprehensive cultivation guide' },
    { id: 'recommendations', label: t.navRecommendations || 'Smart Advisory', icon: Sparkles, badge: 'AI', description: isTelugu ? 'AI ఆధారిత సాగు సలహాలు' : 'Personalized agronomic advice' },
  ];

  // Core items shown directly on nav bar depending on screen width:
  // On >= 1536px (2XL): Dashboard, Voice, Disease, Soil, Alerts
  // On 1280px-1535px (XL / Laptops like 1366x768 & 1440x900): Dashboard, Voice, Disease
  // On 1024px-1279px (LG / Compact laptops): Dashboard, Voice
  const coreItemIds: TabType[] = ['dashboard', 'voice', 'disease', 'soil', 'alerts'];

  // All secondary module IDs that can appear in More menu & mobile secondary list
  const secondaryItemIds: TabType[] = ['weather', 'rotation', 'history', 'crops', 'recommendations'];

  // Check if current active tab is one of the secondary items
  const activeSecondaryItem = allNavItems.find(
    (item) => item.id === activeTab && ['soil', 'alerts', 'weather', 'rotation', 'history', 'crops', 'recommendations'].includes(item.id)
  );

  const handleNavClick = (id: TabType) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLanguage = (langId: SupportedLanguage) => {
    setLanguage(langId);
    setLangDropdownOpen(false);
  };

  // Formatted location string for navbar button (guarantees no duplicates)
  const displayLocationShort = formatShortLocation({
    village: location.village,
    mandal: location.mandal,
    districtName: isTelugu ? currentDistrict.nameTelugu : currentDistrict.name,
    stateName: isTelugu ? currentState.nameTelugu : currentState.name,
    language,
  });

  const displayStateCode = isTelugu 
    ? currentState.nameTelugu.slice(0, 3) 
    : currentState.name.slice(0, 2).toUpperCase();

  const moreLabel = isTelugu ? 'మరిన్ని' : language === 'Hindi' ? 'अधिक' : 'More Modules';

  return (
    <header className="sticky top-0 z-40 bg-[#173827] text-white border-b border-[#25523b] shadow-md backdrop-blur-md w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 lg:gap-4 xl:gap-6 min-w-0">
          
          {/* 1. Left: Logo & Brand (Shrink-0 to protect identity) */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-hidden shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-[#173827] stroke-[2.4]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold font-display tracking-tight text-white whitespace-nowrap">
                  {t.appName} <span className="text-emerald-400">AI</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-bold bg-[#234f37] text-emerald-300 rounded-md border border-[#2d6347] uppercase tracking-wider shrink-0">
                  {t.farmEdition}
                </span>
              </div>
              <p className="text-[10px] tracking-wide text-emerald-300/80 hidden 2xl:block truncate max-w-[200px]">
                {t.appSubtitle}
              </p>
            </div>
          </button>

          {/* 2. Center: Desktop Core Navigation + "More" Dropdown (Hidden on mobile/tablet < 1024px) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            
            {/* Dashboard - Always visible on desktop */}
            <button
              id="nav-link-dashboard"
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-xl font-medium text-xs transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === 'dashboard'
                  ? 'bg-[#24543b] text-white shadow-xs font-semibold ring-1 ring-emerald-400/40'
                  : 'text-emerald-100/85 hover:bg-[#204933] hover:text-white'
              }`}
            >
              <Sprout className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'dashboard' ? 'text-emerald-300' : 'text-emerald-400/90'}`} />
              <span>{t.navDashboard}</span>
            </button>

            {/* Voice Assistant - Always visible on desktop */}
            <button
              id="nav-link-voice"
              onClick={() => handleNavClick('voice')}
              className={`flex items-center gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-xl font-medium text-xs transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === 'voice'
                  ? 'bg-[#24543b] text-white shadow-xs font-semibold ring-1 ring-emerald-400/40'
                  : 'text-emerald-100/85 hover:bg-[#204933] hover:text-white'
              }`}
            >
              <Mic className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'voice' ? 'text-emerald-300' : 'text-emerald-400/90'}`} />
              <span>{t.navVoice}</span>
              <span className="px-1 py-0.2 text-[8px] font-bold bg-emerald-400 text-[#173827] rounded-full leading-none shrink-0">
                AI
              </span>
            </button>

            {/* Disease Doctor - Visible on XL (>=1280px) and 2XL */}
            <button
              id="nav-link-disease"
              onClick={() => handleNavClick('disease')}
              className={`hidden xl:flex items-center gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-xl font-medium text-xs transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === 'disease'
                  ? 'bg-[#24543b] text-white shadow-xs font-semibold ring-1 ring-emerald-400/40'
                  : 'text-emerald-100/85 hover:bg-[#204933] hover:text-white'
              }`}
            >
              <Stethoscope className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'disease' ? 'text-emerald-300' : 'text-emerald-400/90'}`} />
              <span>{t.navDisease}</span>
              <span className="px-1 py-0.2 text-[8px] font-bold bg-emerald-400 text-[#173827] rounded-full leading-none shrink-0">
                AI
              </span>
            </button>

            {/* Soil Health - Visible on 2XL (>=1536px) */}
            <button
              id="nav-link-soil"
              onClick={() => handleNavClick('soil')}
              className={`hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium text-xs transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === 'soil'
                  ? 'bg-[#24543b] text-white shadow-xs font-semibold ring-1 ring-emerald-400/40'
                  : 'text-emerald-100/85 hover:bg-[#204933] hover:text-white'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'soil' ? 'text-emerald-300' : 'text-emerald-400/90'}`} />
              <span>{t.navSoil || 'Soil Health'}</span>
            </button>

            {/* Pest Alerts - Visible on 2XL (>=1536px) */}
            <button
              id="nav-link-alerts"
              onClick={() => handleNavClick('alerts')}
              className={`hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium text-xs transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === 'alerts'
                  ? 'bg-[#24543b] text-white shadow-xs font-semibold ring-1 ring-emerald-400/40'
                  : 'text-emerald-100/85 hover:bg-[#204933] hover:text-white'
              }`}
            >
              <Bug className={`w-3.5 h-3.5 shrink-0 ${activeTab === 'alerts' ? 'text-emerald-300' : 'text-emerald-400/90'}`} />
              <span>{t.navPestAlerts || 'Pest Alerts'}</span>
            </button>

            {/* Clean "More Farm Modules" Dropdown for Secondary Modules */}
            <div className="relative shrink-0" ref={moreDropdownRef}>
              <button
                id="navbar-more-dropdown-btn"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium text-xs transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  activeSecondaryItem
                    ? 'bg-[#24543b] text-emerald-300 font-semibold ring-1 ring-emerald-400/50 shadow-xs'
                    : 'text-emerald-100/85 hover:bg-[#204933] hover:text-white'
                }`}
                title={isTelugu ? 'మరిన్ని వ్యవసాయ విభాగాలు' : 'More farm modules'}
              >
                {activeSecondaryItem ? (
                  <>
                    <activeSecondaryItem.icon className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    <span className="truncate max-w-[80px] xl:max-w-[105px] font-semibold text-white">
                      {activeSecondaryItem.label}
                    </span>
                  </>
                ) : (
                  <>
                    <MoreHorizontal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{moreLabel}</span>
                  </>
                )}
                <ChevronDown className={`w-3 h-3 text-emerald-400 transition-transform duration-200 shrink-0 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Elevated More Dropdown Menu */}
              {moreDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#122e20] border border-[#28573e] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="px-3.5 py-1.5 border-b border-[#234d36] text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
                    <span>{isTelugu ? 'అదనపు విభాగాలు' : 'Secondary Modules'}</span>
                    <span className="text-[9px] text-emerald-300/70 font-normal">AgriPulse</span>
                  </div>
                  
                  <div className="py-1 max-h-[70vh] overflow-y-auto">
                    {/* On LG screens (1024-1279px), Disease Doctor is also inside More */}
                    <div className="xl:hidden">
                      {allNavItems
                        .filter((item) => item.id === 'disease')
                        .map((item) => {
                          const Icon = item.icon;
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              id={`more-menu-item-lg-disease`}
                              onClick={() => handleNavClick(item.id)}
                              className={`w-full flex items-start gap-2.5 px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-[#225037] text-white font-bold'
                                  : 'text-emerald-100/90 hover:bg-[#1c432e]'
                              }`}
                            >
                              <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-semibold">{item.label}</span>
                                  {isActive && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                                  {!isActive && item.badge && (
                                    <span className="px-1.5 py-0.2 text-[8px] font-bold bg-emerald-400 text-[#173827] rounded-full shrink-0">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                    </div>

                    {/* On LG and XL screens (<1536px), Soil Health is inside More */}
                    <div className="2xl:hidden">
                      {allNavItems
                        .filter((item) => item.id === 'soil')
                        .map((item) => {
                          const Icon = item.icon;
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              id={`more-menu-item-xl-soil`}
                              onClick={() => handleNavClick(item.id)}
                              className={`w-full flex items-start gap-2.5 px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-[#225037] text-white font-bold'
                                  : 'text-emerald-100/90 hover:bg-[#1c432e]'
                              }`}
                            >
                              <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-semibold">{item.label}</span>
                                  {isActive && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                    </div>

                    {/* On LG and XL screens (<1536px), Pest Alerts is inside More */}
                    <div className="2xl:hidden">
                      {allNavItems
                        .filter((item) => item.id === 'alerts')
                        .map((item) => {
                          const Icon = item.icon;
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              id={`more-menu-item-xl-alerts`}
                              onClick={() => handleNavClick(item.id)}
                              className={`w-full flex items-start gap-2.5 px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-[#225037] text-white font-bold'
                                  : 'text-emerald-100/90 hover:bg-[#1c432e]'
                              }`}
                            >
                              <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-semibold">{item.label}</span>
                                  {isActive && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                    </div>

                    {/* Secondary modules: Weather, Rotation, History, Crops, Smart Advisory */}
                    {allNavItems
                      .filter((item) => ['weather', 'rotation', 'history', 'crops', 'recommendations'].includes(item.id))
                      .map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            id={`more-menu-item-${item.id}`}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full flex items-start gap-2.5 px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                              isActive
                                  ? 'bg-[#225037] text-white font-bold'
                                  : 'text-emerald-100/90 hover:bg-[#1c432e]'
                            }`}
                          >
                            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-semibold">{item.label}</span>
                                {isActive && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                                {!isActive && item.badge && (
                                  <span className="px-1.5 py-0.2 text-[8px] font-bold bg-emerald-400 text-[#173827] rounded-full shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-[10px] text-emerald-300/70 truncate mt-0.5">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* 3. Right: Header Controls Container (Location, Language, Temp, AI Status) - Strictly isolated shrink-0 */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-nowrap ml-auto lg:ml-0">
            
            {/* Quick Location Selector Button */}
            <button
              id="navbar-location-btn"
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 bg-[#122e20] hover:bg-[#1c432e] rounded-xl border border-[#28573e] text-xs text-emerald-200 transition-colors shadow-xs group cursor-pointer shrink-0"
              title="Change Farm Location / ప్రాంతం మార్చండి"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-xs text-white max-w-[70px] sm:max-w-[85px] md:max-w-[100px] lg:max-w-[110px] xl:max-w-[130px] truncate block">
                {displayLocationShort}
              </span>
              <span className="hidden md:inline-block text-[10px] font-bold text-emerald-400 bg-[#1c432e] px-1 py-0.2 rounded-md shrink-0">
                {displayStateCode}
              </span>
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative shrink-0" ref={langDropdownRef}>
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 bg-[#122e20] hover:bg-[#1c432e] rounded-xl border border-[#28573e] text-xs font-bold text-emerald-200 transition-colors shadow-xs cursor-pointer"
                title={t.languageSelect}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold text-xs text-white max-w-[55px] sm:max-w-none truncate block">
                  {allLanguages.find(l => l.id === language)?.nativeName || language}
                </span>
                <ChevronDown className="w-3 h-3 text-emerald-400 shrink-0" />
              </button>

              {/* Language Dropdown Menu */}
              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#122e20] border border-[#28573e] rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-[#234d36] text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    {t.languageSelect}
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {allLanguages.map((lang) => (
                      <button
                        key={lang.id}
                        id={`lang-opt-${lang.id.toLowerCase()}`}
                        onClick={() => handleSelectLanguage(lang.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                          language === lang.id
                            ? 'bg-[#225037] text-white font-bold'
                            : 'text-emerald-100/90 hover:bg-[#1c432e]'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-[13px]">{lang.nativeName}</span>
                          <span className="text-[10px] text-emerald-300/70">{lang.name}</span>
                        </div>
                        {language === lang.id && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Temperature Unit Toggle */}
            <div className="hidden sm:flex items-center bg-[#122e20] p-0.5 rounded-xl border border-[#28573e] text-xs font-semibold shrink-0">
              <button
                id="unit-toggle-c"
                onClick={() => setTempUnit('C')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  tempUnit === 'C'
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                °C
              </button>
              <button
                id="unit-toggle-f"
                onClick={() => setTempUnit('F')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  tempUnit === 'F'
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                °F
              </button>
            </div>

            {/* AI Active Badge (Desktop >= 1440px / 2XL) */}
            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#122e20] rounded-xl border border-[#28573e] text-xs text-emerald-200 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="font-semibold text-[11px] tracking-wide">{t.aiActive}</span>
            </div>

            {/* Mobile / Tablet Drawer Toggle (< 1024px) - Preserved exactly */}
            <div className="flex items-center lg:hidden shrink-0">
              <button
                id="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-[#234f37] text-emerald-100 hover:text-white focus:outline-hidden cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#122e20] border-b border-[#28573e] px-4 pt-3 pb-5 space-y-3 shadow-xl animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto">
          
          {/* Quick Language Switcher Bar inside Drawer */}
          <div className="pb-3 border-b border-[#234d36]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>{t.languageSelect}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allLanguages.map((lang) => (
                <button
                  key={lang.id}
                  id={`drawer-lang-${lang.id.toLowerCase()}`}
                  onClick={() => handleSelectLanguage(lang.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    language === lang.id
                      ? 'bg-emerald-500 text-[#173827] font-bold shadow-xs'
                      : 'bg-[#1c432e] text-emerald-200 hover:bg-[#25563b]'
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Navigation Section */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 px-2 pt-1 pb-0.5">
              {isTelugu ? 'ప్రధాన విభాగాలు' : 'Core Modules'}
            </div>
            {allNavItems
              .filter((item) => coreItemIds.includes(item.id))
              .map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#234f37] text-white font-semibold'
                        : 'text-emerald-200 hover:bg-[#173827] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-400 text-[#173827] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>

          {/* Secondary Navigation Section */}
          <div className="space-y-1 pt-2 border-t border-[#234d36]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 px-2 pt-1 pb-0.5">
              {isTelugu ? 'అదనపు ఉపకరణాలు' : 'Secondary Tools'}
            </div>
            {allNavItems
              .filter((item) => secondaryItemIds.includes(item.id))
              .map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-sec-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#234f37] text-white font-semibold'
                        : 'text-emerald-200 hover:bg-[#173827] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-400 text-[#173827] rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>

          {/* Temperature & AI Status footer inside Drawer */}
          <div className="pt-3 border-t border-[#234d36] flex items-center justify-between text-xs text-emerald-300 px-2">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400/90 text-xs font-semibold">{isTelugu ? 'ఉష్ణోగ్రత యూనిట్:' : 'Temp Unit:'}</span>
              <button
                onClick={() => setTempUnit('C')}
                className={`px-2 py-0.5 rounded-md text-xs font-bold ${tempUnit === 'C' ? 'bg-emerald-500 text-[#173827]' : 'bg-[#1c432e] text-emerald-200'}`}
              >
                °C
              </button>
              <button
                onClick={() => setTempUnit('F')}
                className={`px-2 py-0.5 rounded-md text-xs font-bold ${tempUnit === 'F' ? 'bg-emerald-500 text-[#173827]' : 'bg-[#1c432e] text-emerald-200'}`}
              >
                °F
              </button>
            </div>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {t.aiActive}
            </span>
          </div>
        </div>
      )}

      {/* Farm Location Modal */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </header>
  );
};


