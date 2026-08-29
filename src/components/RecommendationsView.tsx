import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Sprout,
  Layers,
  RefreshCw,
  FileCheck,
} from 'lucide-react';
import { CROPS_CATALOG, TELUGU_CROPS_CATALOG, getLocalizedCropsCatalog } from '../data/cropsData';
import { useLanguage } from '../context/LanguageContext';

interface RecommendationsViewProps {
  setActiveTab: (tab: 'dashboard' | 'disease' | 'crops' | 'weather' | 'recommendations' | 'voice') => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();
  const currentCatalog = getLocalizedCropsCatalog(language);

  // Wizard State
  const [selectedCrop, setSelectedCrop] = useState<string>(language === 'Telugu' ? 'టమాటా' : 'Tomato');
  const [selectedStage, setSelectedStage] = useState<string>(
    language === 'Telugu'
      ? 'శాఖీయ వృద్ధి దశ (Vegetative Growth)'
      : 'Vegetative Growth'
  );
  const [selectedSoil, setSelectedSoil] = useState<string>(
    language === 'Telugu'
      ? 'ఇసుక నేల (Sandy Loam)'
      : 'Sandy Loam (Fast Draining)'
  );
  const [landArea, setLandArea] = useState<number>(2);
  const [farmingMode, setFarmingMode] = useState<'Conventional' | 'Organic / Bio' | 'Integrated (IPM)'>('Integrated (IPM)');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [customPlan, setCustomPlan] = useState<string | null>(null);

  // AI Chat / Ask AgriPulse state
  const [farmerQuery, setFarmerQuery] = useState<string>('');
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<
    Array<{ sender: 'farmer' | 'ai'; text: string; time: string }>
  >([
    {
      sender: 'ai',
      text: language === 'Telugu'
        ? `నమస్కారం! నేను మీ అగ్రిపల్స్ AI వ్యవసాయ నిపుణుడిని. ఎరువుల మోతాదులు, నీటి యాజమాన్యం, సేంద్రీయ తెగుళ్ల నివారణ లేదా వాతావరణ ఆధారిత సలహాల గురించి నన్ను ఏదైనా అడగవచ్చు.`
        : `Hello! I am your AgriPulse AI Agronomist. Ask me anything about fertilizer application rates, irrigation intervals, organic pest control, or weather adjustments for your farm.`,
      time: 'Just now',
    },
  ]);

  const stages = language === 'Telugu'
    ? [
        'మొలకెత్తే దశ & నారుమడి (Germination & Seedling)',
        'శాఖీయ వృద్ధి దశ (Vegetative Growth)',
        'పూత & మొగ్గ దశ (Flowering & Bud Initiation)',
        'కాయ ఎదుగుదల / గింజ నిండే దశ (Fruit Set & Bulking)',
        'పరిపక్వత & కోతకు ముందు దశ (Maturation & Pre-Harvest)',
      ]
    : [
        'Germination & Seedling',
        'Vegetative Growth',
        'Flowering & Bud Initiation',
        'Fruit Set & Bulking / Grain Filling',
        'Maturation & Pre-Harvest',
      ];

  const soilTypes = language === 'Telugu'
    ? [
        'ఇసుక నేల (Sandy Loam)',
        'నల్ల రేగడి నేల (Black Cotton Soil)',
        'ఎర్ర నేల (Red Loam)',
        'వరి లేదా ఒండ్రు నేల (Alluvial Soil)',
        'బంక మట్టి నేల (Clay Loam)',
      ]
    : [
        'Sandy Loam (Fast Draining)',
        'Clay Loam (High Retention)',
        'Black Cotton Soil (Deep Vertisol)',
        'Red Loam (Rich in Iron)',
        'Alluvial Riverbed Soil',
      ];

  // Synchronize dropdown values & re-render plan when language toggles
  useEffect(() => {
    if (language === 'Telugu') {
      setSelectedCrop((prev) => {
        const matched = TELUGU_CROPS_CATALOG.find((tc) => {
          const eng = CROPS_CATALOG.find((ec) => ec.name.toLowerCase() === prev.toLowerCase() || ec.id === tc.id);
          return eng && eng.id === tc.id;
        });
        return matched ? matched.name : (TELUGU_CROPS_CATALOG[0]?.name || 'టమాటా');
      });

      setSelectedStage((prev) => {
        if (prev.includes('Germination') || prev.includes('మొలకెత్తే')) return stages[0];
        if (prev.includes('Vegetative') || prev.includes('శాఖీయ')) return stages[1];
        if (prev.includes('Flowering') || prev.includes('పూత')) return stages[2];
        if (prev.includes('Fruit') || prev.includes('కాయ')) return stages[3];
        return stages[4];
      });

      setSelectedSoil((prev) => {
        if (prev.includes('Sandy') || prev.includes('ఇసుక')) return soilTypes[0];
        if (prev.includes('Black') || prev.includes('నల్ల')) return soilTypes[1];
        if (prev.includes('Red') || prev.includes('ఎర్ర')) return soilTypes[2];
        if (prev.includes('Alluvial') || prev.includes('వరి') || prev.includes('ఒండ్రు')) return soilTypes[3];
        return soilTypes[4];
      });

      // Update initial greeting if pristine
      setChatHistory((prev) => {
        if (prev.length === 1 && prev[0].sender === 'ai') {
          return [{
            sender: 'ai',
            text: `నమస్కారం! నేను మీ అగ్రిపల్స్ AI వ్యవసాయ నిపుణుడిని. ఎరువుల మోతాదులు, నీటి యాజమాన్యం, సేంద్రీయ తెగుళ్ల నివారణ లేదా వాతావరణ ఆధారిత సలహాల గురించి నన్ను ఏదైనా అడగవచ్చు.`,
            time: 'Just now',
          }];
        }
        return prev;
      });
    } else {
      setSelectedCrop((prev) => {
        const matched = CROPS_CATALOG.find((ec) => {
          const tel = TELUGU_CROPS_CATALOG.find((tc) => tc.name === prev || tc.id === ec.id);
          return tel && tel.id === ec.id;
        });
        return matched ? matched.name : (CROPS_CATALOG[0]?.name || 'Tomato');
      });

      setSelectedStage((prev) => {
        if (prev.includes('Germination') || prev.includes('మొలకెత్తే')) return stages[0];
        if (prev.includes('Vegetative') || prev.includes('శాఖీయ')) return stages[1];
        if (prev.includes('Flowering') || prev.includes('పూత')) return stages[2];
        if (prev.includes('Fruit') || prev.includes('కాయ')) return stages[3];
        return stages[4];
      });

      setSelectedSoil((prev) => {
        if (prev.includes('Sandy') || prev.includes('ఇసుక')) return soilTypes[0];
        if (prev.includes('Black') || prev.includes('నల్ల')) return soilTypes[1];
        if (prev.includes('Red') || prev.includes('ఎర్ర')) return soilTypes[2];
        if (prev.includes('Alluvial') || prev.includes('వరి') || prev.includes('ఒండ్రు')) return soilTypes[3];
        return soilTypes[4];
      });

      // Update initial greeting if pristine
      setChatHistory((prev) => {
        if (prev.length === 1 && prev[0].sender === 'ai') {
          return [{
            sender: 'ai',
            text: `Hello! I am your AgriPulse AI Agronomist. Ask me anything about fertilizer application rates, irrigation intervals, organic pest control, or weather adjustments for your farm.`,
            time: 'Just now',
          }];
        }
        return prev;
      });
    }
  }, [language]);

  const quickQuestions = language === 'Telugu'
    ? [
        'టమాటాలో కాయ కుళ్ళు తెగులును ఎలా నివారించాలి?',
        'వరిలో ఆకు ఎండిపోవడానికి ఉత్తమ మందు ఏది?',
        'మిరపలో ముడత తెగులు నివారణకు సేంద్రీయ పరిష్కారం?',
        'మొక్కజొన్నలో కత్తెర పురుగు నివారణ పద్ధతులు?',
        'ఎరువుల వాడకం ఎప్పుడు తగ్గించాలి?',
      ]
    : [
        'How to prevent blossom end rot in tomatoes?',
        'What is the optimal NPK ratio for potato bulking?',
        'How to control Fall Armyworm organically in maize?',
        'Why are my rice leaf tips turning yellow and dry?',
        'Best companion plants to repel whiteflies and aphids?',
      ];

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-[#1A2E1A]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: selectedCrop,
          stage: selectedStage,
          soilType: selectedSoil,
          landSize: `${landArea} Acres`,
          farmingMode,
          language,
        }),
      });

      const data = await res.json();
      if (data.success && data.advice) {
        setCustomPlan(data.advice);
      } else {
        throw new Error('Fallback required');
      }
    } catch (e) {
      // Localized fallback calculation
      const fallbackTelugu = `### నిర్దిష్ట వ్యవసాయ కార్యాచరణ ప్రణాళిక (${landArea} ఎకరాలు - ${selectedCrop})
**వృద్ధి దశ:** ${selectedStage} | **నేల రకం:** ${selectedSoil} | **సాగు విధానం:** ${farmingMode === 'Integrated (IPM)' ? 'సమగ్ర పద్ధతి' : farmingMode === 'Organic / Bio' ? 'సేంద్రీయ పద్ధతి' : 'సాంప్రదాయ పద్ధతి'}

#### 1. ప్రస్తుత వృద్ధి దశలో ముఖ్య ప్రాధాన్యతలు
- **పంట సంరక్షణ:** మొక్క శాఖీయ ఎదుగుదల మరియు దృఢమైన కాండం నిర్మాణం కోసం వేరు భాగంలో తగినంత గాలి ప్రసరణ కల్పించండి.
- **నేల సంరక్షణ:** తేమను కాపాడుకోవడానికి మరియు నేల ఉష్ణోగ్రతను నియంత్రించడానికి అంతర సేద్యం నిర్వహించండి.

#### 2. పోషకాలు & ఎరువుల సమగ్ర యాజమాన్యం
- **నేల ద్వారా అందించే ఎరువులు:** ఎకరానికి ${(15 * landArea).toFixed(0)} కిలోల యూరియా + ${(25 * landArea).toFixed(0)} కిలోల DAP + ${(20 * landArea).toFixed(0)} కిలోల పొటాష్ + 5 కిలోల జింక్ సల్ఫేట్ వేయండి.
- **ఆకులపై పిచికారీ:** 19:19:19 నీటిలో కరిగే NPK ఎరువు లీటరు నీటికి 5 గ్రాములు + చిలేటెడ్ మైక్రోన్యూట్రియెంట్స్ (1 గ్రా/లీ) కలిపి ఉదయం వేళ పిచికారీ చేయండి.
- **సేంద్రీయ పోషకాలు:** జీవామృతం లేదా హ్యూమిక్ యాసిడ్ 12% (ఎకరానికి 1 లీటరును 200 లీటర్ల నీటిలో కలిపి) పాదుల దగ్గర అందించండి.

#### 3. కచ్చితమైన నీటి యాజమాన్య షెడ్యూల్
- **నీటి తడుల వ్యవధి:** ${selectedSoil} నేలలో ప్రతి 3-4 రోజులకు ఒకసారి తేలికపాటి తడి ఇవ్వండి. వేరు మండలంలో తేమ 60-70% ఉండేలా చూసుకోండి.
- **డ్రిప్ పద్ధతి:** ఉదయం 6:00 నుండి 8:30 గంటల మధ్య 40-50 నిమిషాలు బిందు సేద్యం నిర్వహించండి.
- **హెచ్చరిక:** వేరు కుళ్ళు తెగులు రాకుండా నీరు నిల్వ ఉండకుండా చూసుకోండి.

#### 4. చీడపీడలు & తెగుళ్ల నిఘా మరియు సస్యరక్షణ ప్రోటోకాల్
- **క్షేత్ర పరిశీలన:** ఆకుల వెనుక భాగంలో తెల్లదోమలు, పేనుబంక లేదా మచ్చలను వారానికి రెండుసార్లు తనిఖీ చేయండి.
- **సేంద్రీయ రక్షణ:** 10,000 ppm వేపనూనె లీటరు నీటికి 2-3 మి.లీ లేదా బ్యూవేరియా బాసియానా @ 5 గ్రా/లీ కలిపి ముందు జాగ్రత్తగా పిచికారీ చేయండి.
- **జిగురు అట్టలు:** ఎకరానికి 10 పసుపు, 5 నీలిరంగు జిగురు అట్టలను పైరు ఎత్తులో అమర్చండి.

#### 5. కలుపు మరియు అంతరకృషి యాజమాన్యం
- మొక్కల చుట్టూ ఉన్న కలుపును చేతితో తొలగించి, మట్టిని వదులు చేసి వేర్లకు గాలి ఆడేలా చేయండి.

#### 6. అధిక దిగుబడి మరియు నాణ్యత కోసం శాస్త్రీయ చిట్కా
- పూత మరియు పిందె నిలిచే సమయంలో ఎకరానికి 13-00-45 (పొటాషియం నైట్రేట్) 5 గ్రా/లీ మరియు బోరాన్ 1 గ్రా/లీ పిచికారీ చేయడం వల్ల కాయ నాణ్యత మరియు దిగుబడి 20-25% పెరుగుతుంది.`;

      const fallbackEnglish = `### Custom Precision Farm Action Plan (${landArea} Acres - ${selectedCrop})
**Growth Stage:** ${selectedStage} | **Soil Type:** ${selectedSoil} | **Method:** ${farmingMode}

#### 1. Immediate Stage Priorities
- Focus on vegetative canopy establishment and root architecture development.
- Inter-row hoeing to aerate the topsoil and suppress early weed competition.

#### 2. Nutrient & Fertilizer Management
- **Basal / Soil Application:** Apply ${(15 * landArea).toFixed(0)} kg Urea + ${(25 * landArea).toFixed(0)} kg DAP + ${(20 * landArea).toFixed(0)} kg MOP + 5 kg Zinc Sulfate per acre.
- **Foliar Nutrition:** Spray 19:19:19 water-soluble NPK @ 5g/liter mixed with chelated micronutrients (1g/L) during early morning hours.
- **Organic Bio-Booster:** Drench roots with fermented Jeevamrutha or Humic Acid 12% to enhance soil microbial activity.

#### 3. Precision Irrigation Schedule
- **Interval & Moisture:** Water every 3-4 days in ${selectedSoil}. Maintain root zone moisture around 60-70%.
- **Method & Duration:** Drip fertigation for 40-50 minutes early in the morning (6:00 AM - 8:30 AM).
- **Critical Check:** Avoid water stagnation to prevent soil-borne pathogens and root rot.

#### 4. Pest & Disease Scouting Protocol
- **Active Scouting:** Inspect leaf undersides twice weekly for insect pests like aphids and whiteflies.
- **Biological Defense:** Spray cold-pressed Neem Oil (3ml/L) or Beauveria bassiana (5g/L) as a preventive repellent.
- **Sticky Traps:** Install 10 yellow and 5 blue sticky traps per acre above crop canopy level.

#### 5. Intercultural & Weed Management
- Carry out hand weeding around plant bases and maintain soil mulch to conserve moisture.

#### 6. Yield Optimization Tip
- Spraying 13-00-45 @ 5g/L + Boron @ 1g/L during fruit set significantly enhances fruit firmness, size, and marketable yield.`;

      setCustomPlan(language === 'Telugu' ? fallbackTelugu : fallbackEnglish);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleAskQuestion = async (queryText?: string) => {
    const textToSend = queryText || farmerQuery;
    if (!textToSend.trim()) return;

    const newFarmerMsg = {
      sender: 'farmer' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, newFarmerMsg]);
    if (!queryText) setFarmerQuery('');
    setIsAnswering(true);

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: selectedCrop,
          stage: selectedStage,
          soilType: selectedSoil,
          landSize: `${landArea} Acres`,
          query: textToSend,
          language,
        }),
      });

      const data = await res.json();
      if (data.success && data.advice) {
        setChatHistory((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: data.advice,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error('Offline fallback');
      }
    } catch (e) {
      const replyTelugu = `**అగ్రిపల్స్ AI వ్యవసాయ సలహా:**

"${textToSend}" కు సంబంధించి **${selectedCrop}** కొరకు సూచనలు:
1. **ప్రధాన కారణం:** నేలలో పోషకాల అసమతుల్యత మరియు వాతావరణంలో అధిక తేమ కారణం కావచ్చు.
2. **వెంటనే చేపట్టాల్సిన చర్యలు:** లీటరు నీటికి 2 గ్రాముల చిలేటెడ్ మైక్రోన్యూట్రియెంట్స్ మరియు బోరాన్ కలిపి ఆకులపై పిచికారీ చేయండి.
3. **సేంద్రీయ నివారణ:** సాయంత్రం వేళల్లో వేపనూనె (10,000 ppm @ 2 మి.లీ/లీటరు) పిచికారీ చేయడం వల్ల రసం పీల్చే పురుగులు అదుపులో ఉంటాయి.
4. **నీటి నిర్వహణ:** వేరు కుళ్ళు రాకుండా తేలికపాటి తడులు ఇవ్వండి.`;

      const replyEnglish = `**AgriPulse Agronomist Response:**

For "${textToSend}" in **${selectedCrop}**:
1. **Root Cause:** Nutritional imbalance or environmental humidity fluctuations.
2. **Immediate Remedy:** Apply a foliar spray of Chelated Micronutrients + Boron (1.5g/L).
3. **Biological Control:** Spray Neem oil (3ml/L) in the late evening to protect against insect vectors.
4. **Water Strategy:** Maintain consistent root zone moisture.`;

      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: language === 'Telugu' ? replyTelugu : replyEnglish,
        },
      ]);
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-full text-[11px] font-bold uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          {t.cardAdvisoryBadge}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#1A2E1A] tracking-tight">
          {t.advisoryTitle}
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1 max-w-3xl leading-relaxed">
          {t.advisorySubtitle}
        </p>
      </div>

      {/* Main Grid: Plan Generator + AI Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Farm Action Plan Generator */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-[2rem] border border-emerald-100 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-emerald-50 pb-3">
              <h2 className="text-lg font-bold font-display text-[#1A2E1A] flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                {t.customPlanWizard}
              </h2>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                {language === 'Telugu' ? 'దశలవారీ ప్రణాళిక' : 'Step-by-step planner'}
              </span>
            </div>

            {/* Form Controls */}
            <div className="space-y-4">
              
              {/* Select Crop */}
              <div>
                <label htmlFor="advisory-crop-select" className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  1. {t.selectCrop}
                </label>
                <select
                  id="advisory-crop-select"
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8FAF8] border border-emerald-100 rounded-xl text-sm font-semibold text-[#1A2E1A] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                >
                  {currentCatalog.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Growth Stage */}
              <div>
                <label htmlFor="advisory-stage-select" className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  2. {t.growthStage}
                </label>
                <select
                  id="advisory-stage-select"
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8FAF8] border border-emerald-100 rounded-xl text-sm font-semibold text-[#1A2E1A] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                >
                  {stages.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Soil & Land Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="advisory-soil-select" className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    3. {t.soilType}
                  </label>
                  <select
                    id="advisory-soil-select"
                    value={selectedSoil}
                    onChange={(e) => setSelectedSoil(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8FAF8] border border-emerald-100 rounded-xl text-xs sm:text-sm font-semibold text-[#1A2E1A] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                  >
                    {soilTypes.map((sl) => (
                      <option key={sl} value={sl}>
                        {sl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="advisory-land-input" className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    4. {t.landSize} ({language === 'Telugu' ? 'ఎకరాలు' : 'Acres'})
                  </label>
                  <input
                    id="advisory-land-input"
                    type="number"
                    min="0.5"
                    max="500"
                    step="0.5"
                    value={landArea}
                    onChange={(e) => setLandArea(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    className="w-full px-4 py-3 bg-[#F8FAF8] border border-emerald-100 rounded-xl text-sm font-bold text-[#1A2E1A] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Farming Practice Mode */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  5. {t.farmingMode}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Integrated (IPM)', 'Organic / Bio', 'Conventional'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setFarmingMode(mode)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        farmingMode === mode
                          ? 'bg-emerald-700 text-white shadow-sm'
                          : 'bg-[#F8FAF8] text-gray-600 hover:bg-emerald-50 border border-emerald-100'
                      }`}
                    >
                      {mode === 'Integrated (IPM)'
                        ? (language === 'Telugu' ? 'సమగ్ర పద్ధతి' : 'Integrated (IPM)')
                        : mode === 'Organic / Bio'
                        ? (language === 'Telugu' ? 'సేంద్రీయ పద్ధతి' : 'Organic / Bio')
                        : (language === 'Telugu' ? 'సాంప్రదాయ పద్ధతి' : 'Conventional')}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Button */}
            <button
              id="generate-plan-btn"
              type="button"
              disabled={isGeneratingPlan}
              onClick={handleGeneratePlan}
              className="w-full py-4 px-5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGeneratingPlan ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{language === 'Telugu' ? 'ప్రణాళికను సిద్ధం చేస్తున్నాం...' : 'Synthesizing Agronomic Plan...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{language === 'Telugu' ? `${selectedCrop} కొరకు సమగ్ర ప్రణాళికను రూపొందించండి` : `Generate Custom Action Plan for ${selectedCrop}`}</span>
                </>
              )}
            </button>
          </div>

          {/* Rendered Custom Plan */}
          {customPlan && (
            <div className="bg-white rounded-[2rem] border border-emerald-100 p-6 sm:p-8 shadow-sm space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-emerald-50 pb-3">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  {language === 'Telugu' ? 'సిద్ధమైన వ్యవసాయ ప్రణాళిక' : 'Generated Farm Advisory Plan'}
                </span>
                <span className="text-xs text-gray-400 font-bold">{landArea} {language === 'Telugu' ? 'ఎకరాలు' : 'Acres'}</span>
              </div>

              <div className="prose prose-emerald max-w-none text-xs sm:text-sm leading-relaxed space-y-3">
                {customPlan.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h3 key={idx} className="text-base font-bold font-display text-emerald-950 pt-1">
                        {renderFormattedText(paragraph.replace(/^###\s*/, ''))}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('####')) {
                    return (
                      <h4 key={idx} className="text-sm font-bold text-[#1A2E1A] pt-2 text-emerald-800">
                        {renderFormattedText(paragraph.replace(/^####\s*/, ''))}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('-')) {
                    return (
                      <ul key={idx} className="space-y-1.5 my-1 pl-4 list-disc text-gray-700">
                        {paragraph.split('\n').map((line, liIdx) => (
                          <li key={liIdx}>{renderFormattedText(line.replace(/^-\s*/, ''))}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} className="text-gray-700">
                      {renderFormattedText(paragraph)}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Ask AgriPulse AI Agronomist Chat */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-[2rem] border border-emerald-100 p-6 sm:p-8 shadow-sm flex flex-col h-[640px]">
            
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-4 border-b border-emerald-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold font-display text-[#1A2E1A] leading-tight">
                    {t.askAiExpert}
                  </h2>
                  <p className="text-[11px] text-emerald-700 font-medium">
                    {language === 'Telugu' ? 'ఆన్‌లైన్ వ్యవసాయ విస్తరణ నిపుణుడు' : 'Online Farm Agronomist & Extension Specialist'}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full">
                AI Powered
              </span>
            </div>

            {/* Quick Question Chips */}
            <div className="py-3 border-b border-emerald-50">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                {language === 'Telugu' ? 'తరచుగా అడిగే ప్రశ్నలు:' : 'Suggested Farmer Questions:'}
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAskQuestion(q)}
                    className="px-3 py-1.5 bg-[#F8FAF8] hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 border border-emerald-100 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1 scrollbar-thin">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'farmer' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'farmer'
                        ? 'bg-emerald-700 text-white rounded-br-xs shadow-sm'
                        : 'bg-[#F8FAF8] text-[#1A2E1A] rounded-bl-xs border border-emerald-100 shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {isAnswering && (
                <div className="flex items-center gap-2 p-3.5 bg-[#F8FAF8] rounded-2xl border border-emerald-100 text-xs text-gray-600 animate-pulse w-fit">
                  <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span>{language === 'Telugu' ? 'వ్యవసాయ శాస్త్రవేత్త విశ్లేషిస్తున్నారు...' : 'AgriPulse Agronomist is analyzing farming protocols...'}</span>
                </div>
              )}
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuestion();
              }}
              className="pt-3 border-t border-emerald-50 flex items-center gap-2"
            >
              <input
                id="farmer-question-input"
                type="text"
                value={farmerQuery}
                onChange={(e) => setFarmerQuery(e.target.value)}
                placeholder={t.askQuestionPlaceholder}
                className="flex-1 px-4 py-3 bg-[#F8FAF8] border border-emerald-100 rounded-xl text-xs sm:text-sm text-[#1A2E1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              <button
                id="send-question-btn"
                type="submit"
                disabled={!farmerQuery.trim() || isAnswering}
                className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 text-white rounded-xl transition-colors shrink-0 shadow-sm cursor-pointer"
                aria-label={t.sendMessage}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};
