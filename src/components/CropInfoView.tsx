import React, { useState, useMemo } from 'react';
import {
  Search,
  Sprout,
  Droplets,
  Clock,
  Calculator,
  Sparkles,
  ChevronRight,
  BookOpen,
  Scale,
  TrendingUp,
} from 'lucide-react';
import { CROPS_CATALOG, getLocalizedCropsCatalog } from '../data/cropsData';
import { CropInfo } from '../types';
import { CropDetailModal } from './CropDetailModal';
import { useLanguage } from '../context/LanguageContext';

interface CropInfoViewProps {
  onSelectForDiagnosis?: (cropName: string) => void;
  setActiveTab: (tab: 'dashboard' | 'disease' | 'crops' | 'weather' | 'recommendations' | 'voice') => void;
}

export const CropInfoView: React.FC<CropInfoViewProps> = ({
  onSelectForDiagnosis,
  setActiveTab,
}) => {
  const { t, language } = useLanguage();
  const currentCatalog = getLocalizedCropsCatalog(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [modalCrop, setModalCrop] = useState<CropInfo | null>(null);

  // Calculator State
  const [calcCropId, setCalcCropId] = useState<string>('tomato');
  const [calcLandArea, setCalcLandArea] = useState<number>(2);
  const [calcAreaUnit, setCalcAreaUnit] = useState<'Acres' | 'Hectares'>('Acres');
  const [calcCustomPrice, setCalcCustomPrice] = useState<number>(800); // $/ton

  // Comparison State
  const [compareCropAId, setCompareCropAId] = useState<string>('tomato');
  const [compareCropBId, setCompareCropBId] = useState<string>('potato');

  const categories = language === 'Telugu'
    ? ['All', 'కూరగాయలు', 'ధాన్యాలు', 'పండ్లు', 'వాణిజ్య పంటలు', 'పప్పుధాన్యాలు', 'నూనెగింజలు']
    : ['All', 'Vegetables', 'Cereals', 'Fruits', 'Cash Crops', 'Pulses & Legumes', 'Oilseeds'];

  const seasons = ['All', 'Year-Round', 'Kharif / Monsoon', 'Rabi / Winter', 'Zaid / Summer'];

  // Filtered crops list
  const filteredCrops = useMemo(() => {
    return currentCatalog.filter((crop) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        crop.name.toLowerCase().includes(q) ||
        crop.botanicalName.toLowerCase().includes(q) ||
        crop.description.toLowerCase().includes(q) ||
        crop.category.toLowerCase().includes(q);

      const matchesCat =
        selectedCategory === 'All' ||
        crop.category === selectedCategory ||
        (selectedCategory === 'కూరగాయలు' && (crop.category === 'Vegetables' || crop.category === 'కూరగాయలు')) ||
        (selectedCategory === 'Vegetables' && (crop.category === 'Vegetables' || crop.category === 'కూరగాయలు')) ||
        (selectedCategory === 'ధాన్యాలు' && (crop.category === 'Cereals' || crop.category === 'ధాన్యాలు')) ||
        (selectedCategory === 'Cereals' && (crop.category === 'Cereals' || crop.category === 'ధాన్యాలు')) ||
        (selectedCategory === 'పండ్లు' && (crop.category === 'Fruits' || crop.category === 'పండ్లు')) ||
        (selectedCategory === 'Fruits' && (crop.category === 'Fruits' || crop.category === 'పండ్లు')) ||
        (selectedCategory === 'వాణిజ్య పంటలు' && (crop.category === 'Cash Crops' || crop.category === 'వాణిజ్య పంటలు')) ||
        (selectedCategory === 'Cash Crops' && (crop.category === 'Cash Crops' || crop.category === 'వాణిజ్య పంటలు')) ||
        (selectedCategory === 'పప్పుధాన్యాలు' && (crop.category === 'Pulses & Legumes' || crop.category === 'పప్పుధాన్యాలు')) ||
        (selectedCategory === 'Pulses & Legumes' && (crop.category === 'Pulses & Legumes' || crop.category === 'పప్పుధాన్యాలు')) ||
        (selectedCategory === 'నూనెగింజలు' && (crop.category === 'Oilseeds' || crop.category === 'నూనెగింజలు')) ||
        (selectedCategory === 'Oilseeds' && (crop.category === 'Oilseeds' || crop.category === 'నూనెగింజలు'));

      const matchesSeason =
        selectedSeason === 'All' ||
        crop.season.toLowerCase().includes(selectedSeason.toLowerCase()) ||
        (selectedSeason === 'Year-Round' && (crop.season.includes('Year-Round') || crop.season.includes('ఏడాదంతా'))) ||
        (selectedSeason === 'Kharif / Monsoon' && (crop.season.includes('Kharif') || crop.season.includes('ఖరీఫ్') || crop.season.includes('Monsoon') || crop.season.includes('వర్షాకాలం'))) ||
        (selectedSeason === 'Rabi / Winter' && (crop.season.includes('Rabi') || crop.season.includes('రబీ') || crop.season.includes('Winter') || crop.season.includes('శీతాకాలం'))) ||
        (selectedSeason === 'Zaid / Summer' && (crop.season.includes('Zaid') || crop.season.includes('Summer') || crop.season.includes('జాయెద్') || crop.season.includes('వేసవి')));

      return matchesSearch && matchesCat && matchesSeason;
    });
  }, [currentCatalog, searchQuery, selectedCategory, selectedSeason, language]);

  // Selected crop for calculator
  const selectedCalcCrop = useMemo(() => {
    return currentCatalog.find((c) => c.id === calcCropId) || currentCatalog[0];
  }, [currentCatalog, calcCropId]);

  // Calculate yield & profits
  const calcYieldTonsPerAcre = useMemo(() => {
    if (calcCropId === 'tomato') return 30;
    if (calcCropId === 'potato') return 15;
    if (calcCropId === 'corn') return 4.5;
    if (calcCropId === 'rice') return 3.2;
    if (calcCropId === 'wheat') return 2.4;
    if (calcCropId === 'cotton') return 1.5;
    if (calcCropId === 'bell-pepper') return 13;
    if (calcCropId === 'soybean') return 1.3;
    if (calcCropId === 'apple') return 14;
    if (calcCropId === 'banana') return 35;
    if (calcCropId === 'sugarcane') return 55;
    if (calcCropId === 'groundnut') return 1.5;
    if (calcCropId === 'cucumber') return 11;
    if (calcCropId === 'watermelon') return 23;
    if (calcCropId === 'muskmelon') return 15;
    if (calcCropId === 'pumpkin') return 16;
    return 10;
  }, [calcCropId]);

  const multiplier = calcAreaUnit === 'Hectares' ? 2.471 : 1;
  const totalHarvestTons = (calcYieldTonsPerAcre * calcLandArea * multiplier).toFixed(1);
  const grossRevenue = Math.round(Number(totalHarvestTons) * calcCustomPrice);
  const estimatedInputCosts = Math.round(grossRevenue * 0.38);
  const projectedNetProfit = grossRevenue - estimatedInputCosts;

  const compareCropA = currentCatalog.find((c) => c.id === compareCropAId) || currentCatalog[0];
  const compareCropB = currentCatalog.find((c) => c.id === compareCropBId) || currentCatalog[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      
      {/* Page Heading */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-full text-[11px] font-bold uppercase tracking-widest mb-2">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
          {t.cardCropsBadge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#1A2E1A] tracking-tight">
          {t.cropsTitle}
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1 max-w-3xl leading-relaxed">
          {t.cropsSubtitle}
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-[2rem] border border-emerald-100 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="crop-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchCropPlaceholder}
              className="w-full pl-10 pr-4 py-3 bg-[#F8FAF8] border border-emerald-100 rounded-xl text-sm text-[#1A2E1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-semibold cursor-pointer"
              >
                {t.clearSearch}
              </button>
            )}
          </div>

          {/* Season Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-[#1A2E1A] uppercase tracking-wider whitespace-nowrap">
              {t.growthSeason}:
            </span>
            <select
              id="season-select"
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-4 py-2.5 bg-[#F8FAF8] border border-emerald-100 rounded-xl text-xs font-bold text-[#1A2E1A] focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {seasons.map((s) => (
                <option key={s} value={s}>
                  {s === 'All'
                    ? (language === 'Telugu' ? 'అన్ని కాలాలు (All Seasons)' : 'All Seasons')
                    : s === 'Year-Round'
                    ? (language === 'Telugu' ? 'ఏడాదంతా (Year-Round)' : 'Year-Round')
                    : s === 'Kharif / Monsoon'
                    ? (language === 'Telugu' ? 'ఖరీఫ్ / వర్షాకాలం (Kharif / Monsoon)' : 'Kharif / Monsoon')
                    : s === 'Rabi / Winter'
                    ? (language === 'Telugu' ? 'రబీ / శీతాకాలం (Rabi / Winter)' : 'Rabi / Winter')
                    : s === 'Zaid / Summer'
                    ? (language === 'Telugu' ? 'జాయెద్ / వేసవి (Zaid / Summer)' : 'Zaid / Summer')
                    : s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-[#F8FAF8] text-gray-600 hover:bg-emerald-50 border border-emerald-100'
              }`}
            >
              {cat === 'All' ? (language === 'Telugu' ? 'అన్నీ' : 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Crops Catalog Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-[#1A2E1A]">
            {t.availableCrops} <span className="text-emerald-700 font-sans text-sm font-semibold">({filteredCrops.length})</span>
          </h2>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider hidden sm:inline">
            {language === 'Telugu' ? 'పూర్తి సమాచారం కోసం కార్డుపై నొక్కండి' : 'Tap any crop card for full agronomic guide'}
          </span>
        </div>

        {filteredCrops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCrops.map((crop) => (
              <div
                key={crop.id}
                id={`crop-card-${crop.id}`}
                onClick={() => setModalCrop(crop)}
                className="group bg-white rounded-[2rem] border border-emerald-100 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Image */}
                <div className="h-44 w-full bg-stone-100 overflow-hidden relative">
                  <img
                    src={crop.imageUrl}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#152E21]/80 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white rounded-full backdrop-blur-xs">
                    {crop.category}
                  </span>

                  {/* Season Tag */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold bg-[#152E21]/80 text-emerald-300 rounded-lg backdrop-blur-xs">
                    {crop.season.split('/')[0]}
                  </span>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold font-display leading-tight">{crop.name}</h3>
                    <p className="text-[11px] text-emerald-200 italic truncate font-serif">{crop.botanicalName}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{crop.growthDuration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{crop.soilPh} pH</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {crop.description}
                  </p>

                  <div className="pt-3 border-t border-emerald-50 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1A2E1A]">
                      {t.cropYield}: {crop.averageYield.split('(')[0]}
                    </span>
                    <span className="text-emerald-700 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      {t.viewDetails} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] border border-emerald-100 p-10 text-center space-y-2">
            <Sprout className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-sm font-bold text-[#1A2E1A]">{language === 'Telugu' ? 'ఫలితాలు ఏవీ కనుగొనబడలేదు' : 'No crops matched your filters.'}</p>
            <p className="text-xs text-gray-500">{t.searchCropPlaceholder}</p>
          </div>
        )}
      </div>

      {/* Interactive Yield & Profitability Calculator */}
      <div className="bg-[#1B3B2B] text-white rounded-[2rem] p-6 sm:p-10 shadow-xl border border-[#2D5A45]">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#152E21] text-emerald-300 rounded-full text-[11px] font-bold uppercase tracking-widest mb-2.5 border border-[#2D5A45]">
            <Calculator className="w-3.5 h-3.5" />
            {t.calculatorTitle}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display">
            {t.calculatorTitle}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/80 mt-1.5 leading-relaxed">
            {language === 'Telugu' ? 'భూమి విస్తీర్ణం ఆధారంగా ఆశించిన దిగుబడి, మొత్తం ఆదాయం, పెట్టుబడి ఖర్చులు మరియు నికర లాభాన్ని అంచనా వేయండి.' : 'Estimate expected harvest tonnage, gross marketplace revenue, input expenditure, and projected net farmer earnings based on land size.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Inputs */}
          <div className="lg:col-span-6 space-y-4 bg-[#152E21] p-6 rounded-2xl border border-[#2D5A45]">
            
            {/* Select Crop */}
            <div>
              <label htmlFor="calc-crop-select" className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1.5">
                1. {t.selectCrop}
              </label>
              <select
                id="calc-crop-select"
                value={calcCropId}
                onChange={(e) => {
                  setCalcCropId(e.target.value);
                  if (e.target.value === 'tomato') setCalcCustomPrice(900);
                  if (e.target.value === 'potato') setCalcCustomPrice(500);
                  if (e.target.value === 'corn') setCalcCustomPrice(280);
                  if (e.target.value === 'rice') setCalcCustomPrice(450);
                  if (e.target.value === 'wheat') setCalcCustomPrice(310);
                  if (e.target.value === 'cotton') setCalcCustomPrice(1100);
                  if (e.target.value === 'bell-pepper') setCalcCustomPrice(1500);
                  if (e.target.value === 'banana') setCalcCustomPrice(600);
                  if (e.target.value === 'sugarcane') setCalcCustomPrice(48);
                  if (e.target.value === 'apple') setCalcCustomPrice(1800);
                  if (e.target.value === 'cucumber') setCalcCustomPrice(350);
                  if (e.target.value === 'watermelon') setCalcCustomPrice(220);
                  if (e.target.value === 'muskmelon') setCalcCustomPrice(450);
                  if (e.target.value === 'pumpkin') setCalcCustomPrice(250);
                }}
                className="w-full px-4 py-3 bg-[#1B3B2B] border border-[#2D5A45] rounded-xl text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {currentCatalog.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#152E21] text-white">
                    {c.name} ({c.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Land Area Input */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="calc-area-input" className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1.5">
                  2. {t.landSize}
                </label>
                <input
                  id="calc-area-input"
                  type="number"
                  min="0.5"
                  max="500"
                  step="0.5"
                  value={calcLandArea}
                  onChange={(e) => setCalcLandArea(Math.max(0.1, parseFloat(e.target.value) || 1))}
                  className="w-full px-4 py-3 bg-[#1B3B2B] border border-[#2D5A45] rounded-xl text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label htmlFor="calc-unit-select" className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1.5">
                  {t.unit}
                </label>
                <select
                  id="calc-unit-select"
                  value={calcAreaUnit}
                  onChange={(e) => setCalcAreaUnit(e.target.value as 'Acres' | 'Hectares')}
                  className="w-full px-4 py-3 bg-[#1B3B2B] border border-[#2D5A45] rounded-xl text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option value="Acres">{language === 'Telugu' ? 'ఎకరాలు (Acres)' : 'Acres'}</option>
                  <option value="Hectares">{language === 'Telugu' ? 'హెక్టార్లు (Hectares)' : 'Hectares'}</option>
                </select>
              </div>
            </div>

            {/* Market Price per ton */}
            <div>
              <label htmlFor="calc-price-input" className="block text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1.5">
                3. {t.marketPrice} ($/టన లేదా క్వింటాళ్లకు)
              </label>
              <input
                id="calc-price-input"
                type="number"
                min="10"
                max="10000"
                step="10"
                value={calcCustomPrice}
                onChange={(e) => setCalcCustomPrice(Math.max(1, parseFloat(e.target.value) || 100))}
                className="w-full px-4 py-3 bg-[#1B3B2B] border border-[#2D5A45] rounded-xl text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">
                  {t.estHarvest}
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-display text-white mt-1 block">
                  {totalHarvestTons} <span className="text-sm font-normal text-emerald-300">{language === 'Telugu' ? 'టన్నులు' : 'Tons'}</span>
                </span>
                <span className="text-[11px] text-emerald-200/70">
                  {calcYieldTonsPerAcre} {language === 'Telugu' ? 'టన్నులు/ఎకరానికి' : 'tons/acre'}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">
                  {t.grossRevenue}
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-display text-emerald-300 mt-1 block">
                  ₹{(grossRevenue * 83).toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-emerald-200/70">
                  (${grossRevenue.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Projected Net Profit Highlight */}
            <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow-xl border border-emerald-500">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-emerald-100">
                  <TrendingUp className="w-4 h-4" />
                  {t.netProfit}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 bg-[#152E21] text-emerald-300 rounded-full">
                  ~62% Margin
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight mt-1">
                ₹{(projectedNetProfit * 83).toLocaleString('en-IN')}
              </div>
              <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-emerald-500/60 text-emerald-100 font-medium">
                <span>{language === 'Telugu' ? 'అంచనా ఖర్చులు:' : 'Est. Costs:'} ₹{(estimatedInputCosts * 83).toLocaleString('en-IN')}</span>
                <span>{t.cropDuration}: {selectedCalcCrop.growthDuration}</span>
              </div>
            </div>

            <button
              id="plan-with-crop-btn"
              onClick={() => setActiveTab('recommendations')}
              className="w-full py-4 bg-white hover:bg-emerald-50 text-[#1A2E1A] rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" />
              {language === 'Telugu' ? `${selectedCalcCrop.name} కోసం ఎరువులు & నీటి ప్రణాళికను సిద్ధం చేయండి` : `Generate Fertilizer & Irrigation Plan for ${selectedCalcCrop.name}`}
            </button>
          </div>

        </div>
      </div>

      {/* Side-by-Side Crop Comparison Section */}
      <div className="bg-white rounded-[2rem] border border-emerald-100 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Scale className="w-3.5 h-3.5 text-emerald-700" />
              {t.cropComparisonTitle}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#1A2E1A]">
              {t.cropComparisonTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {language === 'Telugu' ? 'రెండు పంటల మధ్య నీటి అవసరం, కాలవ్యవధి, నేల పీహెచ్ మరియు దిగుబడిని పోల్చి చూడండి.' : 'Compare water needs, duration, soil pH, and economic returns between two crops.'}
            </p>
          </div>

          {/* Crop Selectors */}
          <div className="flex items-center gap-3">
            <select
              id="compare-crop-a-select"
              value={compareCropAId}
              onChange={(e) => setCompareCropAId(e.target.value)}
              className="px-3.5 py-2 bg-[#F8FAF8] border border-emerald-100 rounded-xl text-xs font-bold text-[#1A2E1A]"
            >
              {currentCatalog.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === 'Telugu' ? 'పంట A:' : 'Crop A:'} {c.name}
                </option>
              ))}
            </select>

            <span className="text-xs font-bold text-gray-400">VS</span>

            <select
              id="compare-crop-b-select"
              value={compareCropBId}
              onChange={(e) => setCompareCropBId(e.target.value)}
              className="px-3.5 py-2 bg-[#F8FAF8] border border-emerald-100 rounded-xl text-xs font-bold text-[#1A2E1A]"
            >
              {currentCatalog.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === 'Telugu' ? 'పంట B:' : 'Crop B:'} {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-emerald-100 text-gray-400 font-bold uppercase text-[11px]">
                <th className="py-3.5 px-4 bg-[#F8FAF8] rounded-l-2xl">{language === 'Telugu' ? 'లక్షణాలు' : 'Attribute'}</th>
                <th className="py-3.5 px-4 text-emerald-800 font-bold bg-emerald-50/60">
                  {compareCropA.name} ({compareCropA.category})
                </th>
                <th className="py-3.5 px-4 text-[#1A2E1A] font-bold bg-gray-50 rounded-r-2xl">
                  {compareCropB.name} ({compareCropB.category})
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50 text-gray-600">
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#1A2E1A]">{t.growthDuration}</td>
                <td className="py-3.5 px-4 font-medium text-emerald-900">{compareCropA.growthDuration}</td>
                <td className="py-3.5 px-4 font-medium">{compareCropB.growthDuration}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#1A2E1A]">{language === 'Telugu' ? 'పంట కాలం' : 'Growing Season'}</td>
                <td className="py-3.5 px-4 font-medium text-emerald-900">{compareCropA.season}</td>
                <td className="py-3.5 px-4 font-medium">{compareCropB.season}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#1A2E1A]">{t.optimalTemp}</td>
                <td className="py-3.5 px-4 font-medium text-emerald-900">{compareCropA.optimalTemp}</td>
                <td className="py-3.5 px-4 font-medium">{compareCropB.optimalTemp}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#1A2E1A]">{t.waterRequirement}</td>
                <td className="py-3.5 px-4 font-medium text-emerald-900">{compareCropA.waterRequirement}</td>
                <td className="py-3.5 px-4 font-medium">{compareCropB.waterRequirement}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#1A2E1A]">{t.soilPh}</td>
                <td className="py-3.5 px-4 font-medium text-emerald-900">{compareCropA.soilPh}</td>
                <td className="py-3.5 px-4 font-medium">{compareCropB.soilPh}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#1A2E1A]">{t.npkRatio}</td>
                <td className="py-3.5 px-4 font-medium text-emerald-900">{compareCropA.fertilizerSchedule.npkRatio}</td>
                <td className="py-3.5 px-4 font-medium">{compareCropB.fertilizerSchedule.npkRatio}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#1A2E1A]">{t.averageYield}</td>
                <td className="py-3.5 px-4 font-bold text-emerald-900">{compareCropA.averageYield}</td>
                <td className="py-3.5 px-4 font-bold text-[#1A2E1A]">{compareCropB.averageYield}</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-[#1A2E1A]">{language === 'Telugu' ? 'మార్కెట్ ధర' : 'Market Price'}</td>
                <td className="py-3.5 px-4 font-bold text-emerald-900">{compareCropA.marketPriceRange}</td>
                <td className="py-3.5 px-4 font-bold text-[#1A2E1A]">{compareCropB.marketPriceRange}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Crop Detail Modal */}
      <CropDetailModal
        crop={modalCrop}
        onClose={() => setModalCrop(null)}
        onSelectForDiagnosis={(cropName) => {
          if (onSelectForDiagnosis) {
            onSelectForDiagnosis(cropName);
          }
          setActiveTab('disease');
        }}
      />

    </div>
  );
};
