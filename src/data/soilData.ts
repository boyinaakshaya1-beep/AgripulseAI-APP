import {
  SimpleSoilInput,
  SimpleSoilAssessmentResult,
  SimpleSoilType,
  SimpleSoilCondition,
  SimpleIrrigation,
  SimpleVisibleProblem,
  SoilHealthInput,
  SoilHealthResult,
  SoilHealthStatus,
  SupportedLanguage,
} from '../types';

// ==========================================================
// 1. SIMPLE FARMER MODE DATA STRUCTURES & DEFINITIONS
// ==========================================================

export interface SimpleSoilTypeOption {
  id: SimpleSoilType;
  name: string;
  nameTelugu: string;
  nameHindi: string;
  description: string;
  descriptionTelugu: string;
  suitableCrops: string[];
  suitableCropsTelugu: string[];
}

export const SIMPLE_SOIL_TYPES: SimpleSoilTypeOption[] = [
  {
    id: 'red',
    name: 'Red Soil',
    nameTelugu: 'ఎర్ర నేల (Red Soil)',
    nameHindi: 'लाल मिट्टी',
    description: 'Porous, well-draining, responds very well to organic compost and bio-fertilizers.',
    descriptionTelugu: 'నీరు త్వరగా ఇంకే స్వభావం, పశువుల ఎరువులు, సేంద్రీయ ఎరువులకు చాలా బాగా స్పందిస్తుంది.',
    suitableCrops: ['Groundnut', 'Tomato', 'Chilli', 'Cotton', 'Pulses', 'Millets', 'Maize'],
    suitableCropsTelugu: ['వేరుశనగ', 'టమాటా', 'మిరప', 'పత్తి', 'పప్పుధాన్యాలు', 'చిరుధాన్యాలు', 'మొక్కజొన్న'],
  },
  {
    id: 'black',
    name: 'Black Soil (Regur)',
    nameTelugu: 'నల్ల రేగడి నేల (Black Cotton Soil)',
    nameHindi: 'काली मिट्टी (रेगुर)',
    description: 'High moisture-holding capacity, rich in minerals, forms cracks when dry.',
    descriptionTelugu: 'తేమను ఎక్కువ కాలం నిలిపి ఉంచే అద్భుతమైన శక్తి. ఎండినప్పుడు బీటలు వారుతుంది. పత్తి, మిరప, శనగలకు శ్రేష్టం.',
    suitableCrops: ['Cotton', 'Chilli', 'Bengal Gram', 'Soybean', 'Sugarcane', 'Sunflower'],
    suitableCropsTelugu: ['పత్తి', 'మిరప', 'శనగ', 'సోయాబీన్', 'చెరకు', 'పొద్దుతిరుగుడు'],
  },
  {
    id: 'sandy',
    name: 'Sandy Soil',
    nameTelugu: 'ఇసుక నేల (Sandy Soil)',
    nameHindi: 'रेतीली मिट्टी',
    description: 'Light, drains rapidly, needs frequent light irrigations and organic mulching.',
    descriptionTelugu: 'తేలికపాటి నేల, నీరు త్వరగా ఇంకిపోతుంది. తరచూ తేలికపాటి తడులు మరియు మల్చింగ్ అవసరం.',
    suitableCrops: ['Watermelon', 'Groundnut', 'Carrot', 'Radish', 'Cashew', 'Cucumber'],
    suitableCropsTelugu: ['పుచ్చకాయ', 'వేరుశనగ', 'క్యారెట్', 'ముల్లంగి', 'జీడిమామిడి', 'దోస'],
  },
  {
    id: 'sandy-loam',
    name: 'Sandy Loam Soil',
    nameTelugu: 'ఇసుకతో కూడిన ఎర్ర నేల / గోరపటి నేల (Sandy Loam)',
    nameHindi: 'बलुई दोमट मिट्टी',
    description: 'Balanced texture with good aeration and drainage. Ideal for horticulture and vegetables.',
    descriptionTelugu: 'గాలి మరియు నీరు సమతుల్యంగా ప్రసరించే మంచి నేల. కూరగాయలు మరియు ఉద్యాన పంటలకు అనుకూలం.',
    suitableCrops: ['Tomato', 'Brinjal', 'Bhendi (Okra)', 'Onion', 'Chilli', 'Groundnut', 'Maize'],
    suitableCropsTelugu: ['టమాటా', 'వంకాయ', 'బెండ', 'ఉల్లి', 'మిరప', 'వేరుశనగ', 'మొక్కజొన్న'],
  },
  {
    id: 'loamy',
    name: 'Loamy Soil / Alluvial',
    nameTelugu: 'ఒండ్రు / సారవంతమైన నేల (Loamy / Alluvial)',
    nameHindi: 'दोमट / जलोढ़ मिट्टी',
    description: 'Highly fertile river basin soil, excellent nutrient retention, great for almost all crops.',
    descriptionTelugu: 'నదీ పరివాహకాల్లో ఉండే అత్యంత సారవంతమైన నేల. పోషకాలను బాగా నిలుపుకుంటుంది. దాదాపు అన్ని పంటలకు అనుకూలం.',
    suitableCrops: ['Paddy / Rice', 'Wheat', 'Sugarcane', 'Maize', 'Banana', 'Vegetables', 'Turmeric'],
    suitableCropsTelugu: ['వరి', 'గోధుమ', 'చెరకు', 'మొక్కజొన్న', 'అరటి', 'కూరగాయలు', 'పసుపు'],
  },
  {
    id: 'clay',
    name: 'Clay Soil',
    nameTelugu: 'బంక మట్టి నేల (Clay Soil)',
    nameHindi: 'चिकनी मिट्टी',
    description: 'Heavy, holds high water and nutrients, slow drainage. Requires careful water management.',
    descriptionTelugu: 'బరువైన నేల, నీటిని మరియు పోషకాలను గట్టిగా పట్టి ఉంచుతుంది. నీరు నిలవకుండా డ్రైనేజీ ముఖ్యం.',
    suitableCrops: ['Paddy / Rice', 'Sugarcane', 'Colocasia', 'Turmeric', 'Cabbage'],
    suitableCropsTelugu: ['వరి', 'చెరకు', 'చామగడ్డ', 'పసుపు', 'క్యాబేజీ'],
  },
  {
    id: 'unknown',
    name: "I Don't Know / Mixed Soil",
    nameTelugu: 'నాకు ఖచ్చితంగా తెలియదు / మిశ్రమ నేల',
    nameHindi: 'मुझे निश्चित पता नहीं है',
    description: 'General soil assessment based on field observations, crop behavior, and moisture status.',
    descriptionTelugu: 'మీ పొలం లక్షణాలు, తేమ స్థితి మరియు పంట పెరుగుదల ఆధారంగా సాధారణ విశ్లేషణ.',
    suitableCrops: ['Millets', 'Pulses', 'Vegetables', 'Groundnut', 'Paddy'],
    suitableCropsTelugu: ['చిరుధాన్యాలు', 'పప్పుధాన్యాలు', 'కూరగాయలు', 'వేరుశనగ', 'వరి'],
  },
];

export const SIMPLE_SOIL_CONDITIONS: { id: SimpleSoilCondition; name: string; nameTelugu: string; nameHindi: string }[] = [
  { id: 'very-dry', name: 'Very Dry (Cracked / Water Stress)', nameTelugu: 'చాలా పొడిగా ఉంది (బీటలు వారింది / నీటి ఎద్దడి)', nameHindi: 'बहुत सूखी (दरारें / सूखा)' },
  { id: 'slightly-dry', name: 'Slightly Dry', nameTelugu: 'కాస్త పొడిగా ఉంది (తేమ తక్కువ)', nameHindi: 'हल्की सूखी' },
  { id: 'normal', name: 'Normal Moisture (Optimal)', nameTelugu: 'సాధారణ తేమ ఉంది (అనుకూల స్థితి)', nameHindi: 'सामान्य नमी (अनुकूल)' },
  { id: 'wet', name: 'Wet Soil', nameTelugu: 'బాగా తడిగా ఉంది', nameHindi: 'गीली मिट्टी' },
  { id: 'waterlogged', name: 'Waterlogged (Stagnant Water)', nameTelugu: 'నీరు నిలిచిపోయింది (మురుగు నీరు / ఊట)', nameHindi: 'जलभराव (पानी जमा हुआ)' },
];

export const SIMPLE_IRRIGATION_OPTIONS: { id: SimpleIrrigation; name: string; nameTelugu: string; nameHindi: string }[] = [
  { id: 'low', name: 'Low (Rainfed / Limited Borewell)', nameTelugu: 'తక్కువ (వర్షాధారం / పరిమిత బోరు)', nameHindi: 'कम (वर्षा आधारित / सीमित बोरवेल)' },
  { id: 'medium', name: 'Medium (Borewell / Managed Irrigation)', nameTelugu: 'మధ్యస్థం (బోరుబావి / డ్రిప్)', nameHindi: 'मध्यम (बोरवेल / ड्रिप)' },
  { id: 'high', name: 'High (Canal / Perennial River / Full Water)', nameTelugu: 'ఎక్కువ (కాలువ / పుష్కలమైన నీరు)', nameHindi: 'अधिक (नहर / प्रचुर जल)' },
];

export const SIMPLE_VISIBLE_PROBLEMS: { id: SimpleVisibleProblem; name: string; nameTelugu: string; nameHindi: string }[] = [
  { id: 'none', name: 'No Visible Problem', nameTelugu: 'ఎలాంటి సమస్య కనిపించడం లేదు (ఆరోగ్యకరం)', nameHindi: 'कोई समस्या नहीं' },
  { id: 'very-dry', name: 'Very dry soil & cracking', nameTelugu: 'నేల బాగా ఎండిపోయి బీటలు వారింది', nameHindi: 'मिट्टी बहुत सूखी और फटी हुई है' },
  { id: 'waterlogging', name: 'Waterlogging & root rotting signs', nameTelugu: 'నీరు నిలిచి మురుగు నీరు / వేరుకుళ్ళు లక్షణాలు', nameHindi: 'जलभराव और जड़ गलन' },
  { id: 'poor-growth', name: 'Poor plant growth / stunted crops', nameTelugu: 'మొక్కల పెరుగుదల మందగించింది / గిడసబారింది', nameHindi: 'पौधों की धीमी वृद्धि / बौनापन' },
  { id: 'nutrient-deficiency', name: 'Yellow leaves / possible nutrient deficiency', nameTelugu: 'ఆకులు పసుపు రంగులోకి మారి పోషక లోపం కనిపిస్తోంది', nameHindi: 'पत्ते पीले पड़ना / पोषक तत्वों की कमी' },
  { id: 'other', name: 'Other visible issues (Hard crust / Salinity / White powder on top)', nameTelugu: 'ఇతర సమస్యలు (నేల గట్టిపడటం / చౌడు / తెల్లటి పొర)', nameHindi: 'अन्य समस्याएं (सफेद परत / कठोर परत)' },
];

// Presets for Simple Farmer Mode
export const SIMPLE_FARMER_PRESETS: { id: string; name: string; nameTelugu: string; input: SimpleSoilInput }[] = [
  {
    id: 'preset-red-groundnut',
    name: 'Sample 1: Red Soil with Groundnut (Normal)',
    nameTelugu: 'నమూనా 1: ఎర్ర నేలలో వేరుశనగ (సాధారణ స్థితి)',
    input: {
      soilType: 'red',
      currentCrop: 'Groundnut',
      soilCondition: 'normal',
      irrigation: 'medium',
      previousCrop: 'Millets',
      visibleProblem: 'none',
    },
  },
  {
    id: 'preset-black-cotton-stunted',
    name: 'Sample 2: Black Soil with Cotton (Yellowing / Stunted)',
    nameTelugu: 'నమూనా 2: నల్ల రేగడిలో పత్తి (ఆకులు పసుపుబారడం / గిడసబారడం)',
    input: {
      soilType: 'black',
      currentCrop: 'Cotton',
      soilCondition: 'wet',
      irrigation: 'medium',
      previousCrop: 'Chilli',
      visibleProblem: 'nutrient-deficiency',
    },
  },
  {
    id: 'preset-sandy-dry-vegetables',
    name: 'Sample 3: Sandy Soil (Dry & Moisture Stress)',
    nameTelugu: 'నమూనా 3: ఇసుక నేలలో టమాటా (నీటి ఎద్దడి / పొడి నేల)',
    input: {
      soilType: 'sandy',
      currentCrop: 'Tomato',
      soilCondition: 'very-dry',
      irrigation: 'low',
      previousCrop: 'None / Fallow',
      visibleProblem: 'very-dry',
    },
  },
];

// ==========================================================
// 2. SIMPLE FARMER MODE LOGIC (PRELIMINARY AI ASSESSMENT)
// ==========================================================

export function calculateSimpleSoilAssessment(
  input: SimpleSoilInput,
  language: SupportedLanguage = 'Telugu'
): SimpleSoilAssessmentResult {
  const isTelugu = language === 'Telugu';
  const isHindi = language === 'Hindi';

  const matchedSoil = SIMPLE_SOIL_TYPES.find((s) => s.id === input.soilType) || SIMPLE_SOIL_TYPES[0];

  // Base score
  let score = 70;

  // Evaluate condition
  if (input.soilCondition === 'normal') {
    score += 15;
  } else if (input.soilCondition === 'slightly-dry' || input.soilCondition === 'wet') {
    score -= 5;
  } else if (input.soilCondition === 'very-dry' || input.soilCondition === 'waterlogged') {
    score -= 20;
  }

  // Evaluate visible problem
  if (input.visibleProblem === 'none') {
    score += 10;
  } else if (input.visibleProblem === 'poor-growth' || input.visibleProblem === 'nutrient-deficiency') {
    score -= 15;
  } else if (input.visibleProblem === 'waterlogging' || input.visibleProblem === 'very-dry' || input.visibleProblem === 'other') {
    score -= 15;
  }

  // Evaluate irrigation vs soil
  if (input.soilType === 'sandy' && input.irrigation === 'low') {
    score -= 10;
  }
  if (input.soilType === 'clay' && input.irrigation === 'high' && input.soilCondition === 'waterlogged') {
    score -= 15;
  }

  score = Math.max(25, Math.min(95, score));

  // Determine status
  let status: SoilHealthStatus = 'healthy';
  let statusLabel = isTelugu ? '🟢 ఆరోగ్యకరమైన నేల' : isHindi ? '🟢 स्वस्थ मिट्टी' : '🟢 Healthy Soil';

  if (score >= 75) {
    status = 'healthy';
    statusLabel = isTelugu ? '🟢 ప్రాథమికంగా ఆరోగ్యకరమైన నేల' : isHindi ? '🟢 प्राथमिक रूप से स्वस्थ' : '🟢 Preliminary Healthy';
  } else if (score >= 50) {
    status = 'attention';
    statusLabel = isTelugu ? '🟡 శ్రద్ధ అవసరమైన నేల' : isHindi ? '🟡 ध्यान देने योग्य' : '🟡 Needs Attention';
  } else {
    status = 'poor';
    statusLabel = isTelugu ? '🔴 బలహీనమైన / తీవ్ర సమస్య ఉన్న నేల' : isHindi ? '🔴 कमजोर मिट्टी' : '🔴 Poor Condition';
  }

  // Assessment Title
  const assessmentTitle = isTelugu
    ? `${matchedSoil.nameTelugu.split('(')[0]} - ప్రాథమిక క్షేత్ర విశ్లేషణ`
    : isHindi
    ? `${matchedSoil.nameHindi} - प्राथमिक मूल्यांकन`
    : `${matchedSoil.name} - Preliminary Field Assessment`;

  // Condition Summary
  let conditionSummary = '';
  if (status === 'healthy') {
    conditionSummary = isTelugu
      ? `మీరు అందించిన సమాచారం ప్రకారం ${matchedSoil.nameTelugu.split('(')[0]}లో తేమ మరియు క్షేత్ర పరిస్థితులు సంతృప్తికరంగా ఉన్నాయి. ${input.currentCrop ? `${input.currentCrop} పంట పెరుగుదలకు ప్రస్తుత నేల వాతావరణం అనుకూలంగా ఉంది.` : 'ప్రస్తుత పంటల పెరుగుదలకు అనుకూలంగా ఉంది.'}`
      : isHindi
      ? `आपके द्वारा दी गई जानकारी के अनुसार ${matchedSoil.nameHindi} में नमी और स्थिति संतोषजनक है। यह ${input.currentCrop || 'फसलों'} के लिए अनुकूल है।`
      : `Based on your inputs, the field conditions and moisture balance in ${matchedSoil.name} appear favorable. Good physical environment for ${input.currentCrop || 'growing crops'}.`;
  } else if (status === 'attention') {
    conditionSummary = isTelugu
      ? `నేలలో తేమ అసమతుల్యత లేదా పోషక లోపాల లక్షణాలు కనిపిస్తున్నాయి. సకాలంలో సేంద్రీయ ఎరువులు, జీవామృతం లేదా తేమ యాజమాన్యం చేపడితే పంట పెరుగుదల బాగుంటుంది.`
      : isHindi
      ? `मिट्टी में नमी का असंतुलन या पोषक तत्वों की कमी के संकेत हैं। समय पर जैविक खाद और नमी प्रबंधन से फसल में सुधार होगा।`
      : `The soil exhibits physical or moisture stress symptoms (such as dry patches or mild leaf yellowing). Timely organic amendments and irrigation tuning will improve crop vigor.`;
  } else {
    conditionSummary = isTelugu
      ? `నేలలో తీవ్రమైన నీటి ఎద్దడి, మురుగు నీరు లేదా తీవ్ర పెరుగుదల లోపం ఉంది. ఇది పంట దిగుబడిపై గణనీయమైన ప్రభావం చూపుతుంది. తక్షణ ఉపశమన చర్యలు అవసరం.`
      : isHindi
      ? `मिट्टी में गंभीर सूखापन, जलभराव या पोषक तत्वों की भारी कमी देखी गई है। तुरंत सुधार के उपाय आवश्यक हैं।`
      : `Acute soil stress detected (severe moisture imbalance, waterlogging, or severe stunting). Immediate corrective field management is advised.`;
  }

  // Concerns
  const possibleConcerns: string[] = [];

  if (input.soilCondition === 'very-dry') {
    possibleConcerns.push(
      isTelugu
        ? 'తీవ్రమైన నీటి ఎద్దడి: నేల ఎండిపోవడం వల్ల మొక్కలు పోషకాలను గ్రహించలేవు, పూత రాలిపోయే ప్రమాదం ఉంది.'
        : 'Severe moisture deficit: Roots cannot absorb nutrients from dry soil; risk of flower drop.'
    );
  } else if (input.soilCondition === 'waterlogged') {
    possibleConcerns.push(
      isTelugu
        ? 'మురుగు నీటి సమస్య: నేలలో గాలి లేక వేరు కుళ్ళు తెగులు మరియు ఆకులు పసుపుబారే ప్రమాదం ఉంది.'
        : 'Waterlogging & aeration loss: Risk of root asphyxiation, collar rot, and wilting.'
    );
  }

  if (input.visibleProblem === 'nutrient-deficiency') {
    possibleConcerns.push(
      isTelugu
        ? 'ఆకులు పసుపుబారడం: నత్రజని లేదా సూక్ష్మ పోషకాల (జింక్ / ఇనుము) లోపం వల్ల ఆకులు పసుపు రంగులోకి మారవచ్చు.'
        : 'Yellowing foliage: Likely nitrogen or micronutrient (zinc/iron) deficiency under current soil conditions.'
    );
  } else if (input.visibleProblem === 'poor-growth') {
    possibleConcerns.push(
      isTelugu
        ? 'గిడసబారిన పెరుగుదల: నేల గట్టిపడటం లేదా సేంద్రీయ కర్బనం తక్కువగా ఉండటం వల్ల వేర్ల వ్యవస్థ సరిగా విస్తరించకపోవచ్చు.'
        : 'Stunted plant vigor: Compacted soil structure or low organic matter limiting root development.'
    );
  } else if (input.visibleProblem === 'other') {
    possibleConcerns.push(
      isTelugu
        ? 'నేలపై తెల్లటి పొర లేదా చౌడు సమస్య: ఉప్పు లేదా క్షారత్వం వల్ల మొక్కల వేర్లు దెబ్బతినే అవకాశం ఉంది.'
        : 'Possible soil crusting or salinity/alkalinity stress inhibiting root uptake.'
    );
  }

  if (input.soilType === 'sandy' && (input.irrigation === 'low' || input.soilCondition === 'very-dry')) {
    possibleConcerns.push(
      isTelugu
        ? 'ఇసుక నేలలో నీరు నిలిచే శక్తి తక్కువ: తక్కువ నీటితో ఎరువులు క్రిందికి ఇంకిపోయే (లీచింగ్) ప్రమాదం ఉంది.'
        : 'Sandy texture has poor water holding; rapid nutrient leaching occurs without organic matter.'
    );
  }

  if (input.soilType === 'clay' && (input.soilCondition === 'wet' || input.soilCondition === 'waterlogged')) {
    possibleConcerns.push(
      isTelugu
        ? 'బంకమట్టిలో నీరు బయటకు పోవడం నెమ్మది: వర్షాలు పడినప్పుడు మురుగు నీటి కాలువలు తీయడం తప్పనిసరి.'
        : 'Heavy clay drains slowly; creates anaerobic conditions during wet spells without proper drainage.'
    );
  }

  if (possibleConcerns.length === 0) {
    possibleConcerns.push(
      isTelugu
        ? 'ప్రస్తుత సమాచారం ప్రకారం ప్రధాన ప్రమాదాలు ఏమీ లేవు. సాధారణ నేల సంరక్షణ సరిపోతుంది.'
        : 'No acute physical soil risks reported. Maintain regular organic replenishment.'
    );
  }

  // Recommendations
  const generalRecommendations: string[] = [];

  // Organic matter recommendation (universal)
  generalRecommendations.push(
    isTelugu
      ? 'ఎకరానికి 3-4 టన్నుల బాగా చివికిన పశువుల ఎరువు (FYM) లేదా వర్మీకంపోస్ట్ వేసి నేల జీవ చైతన్యాన్ని పెంచండి.'
      : 'Apply 3-4 tonnes/acre of well-decomposed farmyard manure or vermicompost to build soil microbial health.'
  );

  // Irrigation & mulching recommendation
  if (input.soilCondition === 'very-dry' || input.soilType === 'sandy' || input.irrigation === 'low') {
    generalRecommendations.push(
      isTelugu
        ? 'తేమను కాపాడటానికి పంట మొదళ్ల దగ్గర ఎండుగడ్డి లేదా ఆకులతో మల్చింగ్ వేయండి; డ్రిప్ ద్వారా నీరు అందించండి.'
        : 'Use organic straw mulching around the root zone to conserve moisture and switch to micro-drip irrigation.'
    );
  } else if (input.soilCondition === 'waterlogged' || input.visibleProblem === 'waterlogging') {
    generalRecommendations.push(
      isTelugu
        ? 'పొలంలో నిలిచిన మురుగు నీటిని బయటకు పంపడానికి ప్రతి 10-15 మీటర్లకు ఒక మురుగు కాలువ (డ్రైనేజీ ఛానల్) ఏర్పాటు చేయండి.'
        : 'Create field drainage trenches every 10-15 meters to drain standing water and restore root aeration.'
    );
  }

  // Bio-fertilizer & nutrient advice
  if (input.visibleProblem === 'nutrient-deficiency' || input.visibleProblem === 'poor-growth') {
    generalRecommendations.push(
      isTelugu
        ? 'జీవామృతం (ఎకరానికి 200 లీటర్లు) లేదా 19-19-19 ఎరువును లీటరు నీటికి 5 గ్రాములు కలిపి పిచికారీ చేయండి.'
        : 'Spray Jeevamrutham (200 L/acre) or foliar 19-19-19 soluble fertilizer @ 5g/L for quick vegetative recovery.'
    );
    generalRecommendations.push(
      isTelugu
        ? 'అజటోబాక్టర్ లేదా రైజోబియం మరియు PSB వంటి జీవ ఎరువులను ఎరువులతో కలిపి వాడండి.'
        : 'Inoculate with Azotobacter / Rhizobium and Phosphate Solubilizing Bacteria (PSB) bio-fertilizers.'
    );
  }

  // Green manure & rotation advice
  generalRecommendations.push(
    isTelugu
      ? 'తదుపరి పంటకు ముందు జీలుగ లేదా జనుము వంటి పచ్చిరొట్ట పైర్లను సాగు చేసి 45 రోజుల వయసులో దున్ని కలపండి.'
      : 'Incorporate green manure crops (Sunnhemp / Dhaincha) before the next season to naturally restore soil structure.'
  );

  const disclaimer = isTelugu
    ? '⚠️ ముఖ్య గమనిక: ఇది రైతు అందించిన క్షేత్ర పరిశీలనలు మరియు AI ఆధారిత ప్రాథమిక అంచనా మాత్రమే. ఇది ల్యాబ్ సాయిల్ టెస్ట్ రిపోర్టుకు ప్రత్యామ్నాయం కాదు. కచ్చితమైన పోషక మోతాదుల కోసం సమీప ప్రభుత్వ కృషి విజ్ఞాన కేంద్రం (KVK) లో నేల పరీక్ష చేయించుకోండి.'
    : '⚠️ Notice: This is a preliminary AI-assisted field assessment based on observed physical characteristics, not a substitute for an official laboratory soil test. Visit your local Krishi Vigyan Kendra (KVK) for exact chemical soil testing.';

  const suitableCrops = isTelugu ? matchedSoil.suitableCropsTelugu : matchedSoil.suitableCrops;

  return {
    status,
    statusLabel,
    score,
    assessmentTitle,
    conditionSummary,
    possibleConcerns,
    generalRecommendations,
    suitableCrops,
    disclaimer,
    isPreliminary: true,
  };
}

// ==========================================================
// 3. ADVANCED / SOIL LAB REPORT MODE LOGIC
// ==========================================================

export interface SoilTypeOption {
  id: string;
  name: string;
  nameTelugu: string;
  nameHindi: string;
  description: string;
  descriptionTelugu: string;
  idealPh: string;
  waterRetention: string;
  defaultPh: number;
  suitableCrops: string[];
  suitableCropsTelugu: string[];
}

export const SOIL_TYPES: SoilTypeOption[] = [
  {
    id: 'red-loam',
    name: 'Red Sandy Loam',
    nameTelugu: 'ఎర్ర ఇసుక నేల (Red Sandy Loam)',
    nameHindi: 'लाल बलुई दोमट मिट्टी',
    description: 'Porous, well-drained, slightly acidic to neutral, responsive to organic manures.',
    descriptionTelugu: 'నీరు త్వరగా ఇంకే స్వభావం, సేంద్రీయ ఎరువులకు బాగా స్పందిస్తుంది. నత్రజని, సేంద్రీయ కర్బనం తక్కువగా ఉండవచ్చు.',
    idealPh: '6.0 - 7.0',
    defaultPh: 6.5,
    waterRetention: 'Moderate',
    suitableCrops: ['Groundnut', 'Tomato', 'Chilli', 'Cotton', 'Pulses', 'Millets', 'Maize'],
    suitableCropsTelugu: ['వేరుశనగ', 'టమాటా', 'మిరప', 'పత్తి', 'పప్పుధాన్యాలు', 'చిరుధాన్యాలు', 'మొక్కజొన్న'],
  },
  {
    id: 'black-cotton',
    name: 'Black Cotton Soil (Regur)',
    nameTelugu: 'నల్ల రేగడి నేల (Black Cotton Soil)',
    nameHindi: 'काली कपास मिट्टी (रेगुर)',
    description: 'High clay content, rich in calcium & magnesium, high water holding capacity.',
    descriptionTelugu: 'తేమను ఎక్కువ కాలం నిలిపి ఉంచే శక్తి, కాల్షియం, మెగ్నీషియం సమృద్ధిగా ఉంటుంది. పత్తి, మిరప, శనగలకు అనుకూలం.',
    idealPh: '7.2 - 8.5',
    defaultPh: 7.8,
    waterRetention: 'High',
    suitableCrops: ['Cotton', 'Chilli', 'Bengal Gram', 'Soybean', 'Sugarcane', 'Sunflower'],
    suitableCropsTelugu: ['పత్తి', 'మిరప', 'శనగ', 'సోయాబీన్', 'చెరకు', 'పొద్దుతిరుగుడు'],
  },
  {
    id: 'alluvial',
    name: 'Alluvial Loam',
    nameTelugu: 'ఒండ్రు నేల (Alluvial Soil)',
    nameHindi: 'जलोढ़ दोमट मिट्टी',
    description: 'Very fertile river basin soil, well balanced in nutrients, ideal for intense cropping.',
    descriptionTelugu: 'నదీ పరివాహక ప్రాంతాల్లో ఉండే అత్యంత సారవంతమైన నేల. దాదాపు అన్ని రకాల పంటలకు అనుకూలం.',
    idealPh: '6.5 - 7.5',
    defaultPh: 7.0,
    waterRetention: 'Optimal',
    suitableCrops: ['Paddy / Rice', 'Wheat', 'Sugarcane', 'Maize', 'Vegetables', 'Banana'],
    suitableCropsTelugu: ['వరి', 'గోధుమ', 'చెరకు', 'మొక్కజొన్న', 'కూరగాయలు', 'అరటి'],
  },
  {
    id: 'clay-loam',
    name: 'Clay Loam',
    nameTelugu: 'బంకమట్టి నేల (Clay Loam)',
    nameHindi: 'चिकनी दोमट मिट्टी',
    description: 'Dense soil structure, excellent nutrient holding, needs proper drainage.',
    descriptionTelugu: 'పోషకాలను బాగా పట్టి ఉంచుతుంది, నీరు నిలవకుండా డ్రైనేజీ వసతి ముఖ్యం.',
    idealPh: '6.5 - 7.8',
    defaultPh: 7.2,
    waterRetention: 'High',
    suitableCrops: ['Paddy', 'Sugarcane', 'Chilli', 'Turmeric', 'Cabbage'],
    suitableCropsTelugu: ['వరి', 'చెరకు', 'మిరప', 'పసుపు', 'క్యాబేజీ'],
  },
  {
    id: 'sandy',
    name: 'Sandy Soil',
    nameTelugu: 'ఇసుక నేల (Sandy Soil)',
    nameHindi: 'रेतीली मिट्टी',
    description: 'Fast draining, low nutrient holding, requires frequent irrigation and organic matter.',
    descriptionTelugu: 'తేలికపాటి నేల, తరచూ నీరు మరియు సేంద్రీయ ఎరువులు అందించాలి.',
    idealPh: '5.5 - 6.8',
    defaultPh: 6.2,
    waterRetention: 'Low',
    suitableCrops: ['Watermelon', 'Groundnut', 'Carrot', 'Radish', 'Cashew'],
    suitableCropsTelugu: ['పుచ్చకాయ', 'వేరుశనగ', 'క్యారెట్', 'ముల్లంగి', 'జీడిమామిడి'],
  },
  {
    id: 'laterite',
    name: 'Laterite Soil',
    nameTelugu: 'ఎరుపు గులక నేల (Laterite Soil)',
    nameHindi: 'लेटराइट मिट्टी',
    description: 'Acidic, rich in iron and aluminium, low in phosphorus and organic matter.',
    descriptionTelugu: 'ఆమ్ల స్వభావం కలది, ఇనుము అధికంగా ఉంటుంది. సున్నం మరియు భాస్వరం అందించడం అవసరం.',
    idealPh: '5.0 - 6.2',
    defaultPh: 5.6,
    waterRetention: 'Low to Moderate',
    suitableCrops: ['Cashew', 'Coffee', 'Tea', 'Rubber', 'Tapioca', 'Coconut'],
    suitableCropsTelugu: ['జీడిమామిడి', 'కాఫీ', 'కొబ్బరి', 'కర్రపెండలం', 'మిరియాలు'],
  },
];

// Preset Soil Test Profiles (Demo Reports for Lab Mode)
export const SAMPLE_SOIL_PRESETS: { id: string; name: string; nameTelugu: string; input: SoilHealthInput }[] = [
  {
    id: 'sample-healthy-alluvial',
    name: 'Lab Report 1: Fertile Loam / Godavari Delta (Balanced NPK)',
    nameTelugu: 'ల్యాబ్ నివేదిక 1: సారవంతమైన ఒండ్రు నేల (సమతుల్య NPK)',
    input: {
      soilType: 'alluvial',
      ph: 7.0,
      nitrogen: 'Medium',
      phosphorus: 'Medium',
      potassium: 'High',
      moisture: 55,
      organicMatter: 0.85,
      crop: 'Paddy / Rice',
      isDemoData: true,
    },
  },
  {
    id: 'sample-low-n-red',
    name: 'Lab Report 2: Red Sandy Soil (Acidic pH 5.8 & Low N)',
    nameTelugu: 'ల్యాబ్ నివేదిక 2: ఎర్ర నేల (ఆమ్ల pH 5.8 & తక్కువ నత్రజని)',
    input: {
      soilType: 'red-loam',
      ph: 5.8,
      nitrogen: 'Low',
      phosphorus: 'Medium',
      potassium: 'Medium',
      moisture: 35,
      organicMatter: 0.42,
      crop: 'Chilli',
      isDemoData: true,
    },
  },
  {
    id: 'sample-alkaline-black',
    name: 'Lab Report 3: Black Soil (Alkaline pH 8.4 & Low Phosphorus)',
    nameTelugu: 'ల్యాబ్ నివేదిక 3: నల్ల రేగడి (క్షార pH 8.4 & తక్కువ భాస్వరం)',
    input: {
      soilType: 'black-cotton',
      ph: 8.4,
      nitrogen: 'Medium',
      phosphorus: 'Low',
      potassium: 'High',
      moisture: 68,
      organicMatter: 0.58,
      crop: 'Cotton',
      isDemoData: true,
    },
  },
];

// Calculate Advanced Soil Lab Health
export function calculateSoilHealth(
  input: SoilHealthInput,
  language: SupportedLanguage = 'Telugu'
): SoilHealthResult {
  const isTelugu = language === 'Telugu';
  const isHindi = language === 'Hindi';

  let score = 50; // base score

  // Score pH (6.2 - 7.5 is optimal)
  if (input.ph >= 6.2 && input.ph <= 7.5) {
    score += 20;
  } else if ((input.ph >= 5.5 && input.ph < 6.2) || (input.ph > 7.5 && input.ph <= 8.2)) {
    score += 10;
  } else {
    score -= 10;
  }

  // Score NPK
  if (input.nitrogen === 'Medium') score += 10;
  else if (input.nitrogen === 'High') score += 5;

  if (input.phosphorus === 'Medium' || input.phosphorus === 'High') score += 10;
  if (input.potassium === 'Medium' || input.potassium === 'High') score += 10;

  // Score Moisture
  if (input.moisture >= 40 && input.moisture <= 70) score += 5;
  else if (input.moisture < 25 || input.moisture > 85) score -= 10;

  // Score Organic Matter
  const om = input.organicMatter ?? 0.5;
  if (om >= 0.75) score += 10;
  else if (om >= 0.5) score += 5;

  score = Math.max(20, Math.min(98, score));

  // Determine Status
  let status: SoilHealthStatus = 'healthy';
  let statusLabel = 'Healthy Soil';

  if (score >= 75) {
    status = 'healthy';
    statusLabel = isTelugu ? 'ఆరోగ్యకరమైన ల్యాబ్ నేల' : isHindi ? 'स्वस्थ मिट्टी' : 'Healthy Soil';
  } else if (score >= 50) {
    status = 'attention';
    statusLabel = isTelugu ? 'శ్రద్ధ అవసరమైన నేల' : isHindi ? 'ध्यान देने योग्य मिट्टी' : 'Needs Attention';
  } else {
    status = 'poor';
    statusLabel = isTelugu ? 'బలహీనమైన నేల' : isHindi ? 'कमजोर / खराब मिट्टी' : 'Poor Health';
  }

  // Find soil metadata
  const soilMeta = SOIL_TYPES.find((s) => s.id === input.soilType) || SOIL_TYPES[0];

  // Summaries
  let summary = '';
  if (status === 'healthy') {
    summary = isTelugu
      ? `ల్యాబ్ నివేదిక ప్రకారం మీ పొలం నేల సమతుల్య pH (${input.ph}) మరియు సరైన పోషక నిష్పత్తితో ఆరోగ్యకరంగా ఉంది. ${input.crop ? `${input.crop} పంటకు ఇది ఎంతో అనుకూలం.` : 'చాలా రకాల పంటల సాగుకు అనుకూలం.'}`
      : isHindi
      ? `लैब रिपोर्ट के अनुसार मिट्टी संतुलित pH (${input.ph}) और सही पोषक तत्वों के साथ स्वस्थ स्थिति में है।`
      : `According to lab data, your field soil is in Healthy condition with balanced pH (${input.ph}) and adequate macro-nutrients. Suitable for growing ${input.crop || 'most field crops'}.`;
  } else if (status === 'attention') {
    summary = isTelugu
      ? `ల్యాబ్ నివేదికలో కొన్ని పోషక లోపాలు లేదా pH అసమతుల్యత ఉన్నాయి. సకాలంలో సేంద్రీయ ఎరువులు మరియు సూక్ష్మ పోషకాలు అందిస్తే దిగుబడి పెరుగుతుంది.`
      : isHindi
      ? `मिट्टी को थोड़ा सुधार की आवश्यकता है। कुछ पोषक तत्वों या pH में असंतुलन है।`
      : `Lab test exhibits moderate imbalances (e.g. low nitrogen or suboptimal pH). Timely organic amendments and micro-nutrient top dressing are recommended.`;
  } else {
    summary = isTelugu
      ? `నేల ఆరోగ్యం బలహీనంగా ఉంది. pH సమస్య (${input.ph < 6 ? 'అధిక ఆమ్లత్వం' : 'అధిక క్షారత్వం'}) లేదా తీవ్ర పోషక లోపం వల్ల పంట పెరుగుదల దెబ్బతినవచ్చు. తక్షణ నేల యాజమాన్యం అవసరం.`
      : isHindi
      ? `मिट्टी का स्वास्थ्य कमजोर है। pH समस्या या पोषक तत्वों की भारी कमी के कारण त्वरित सुधार आवश्यक है।`
      : `Soil health is poor due to acute nutrient deficiency or severe pH deviation. Intensive organic rehabilitation and gypsum/lime correction are advised.`;
  }

  // Nutrient status details
  const nutrientStatus = {
    nitrogen: {
      level: input.nitrogen,
      status: input.nitrogen === 'Low' ? ('low' as const) : input.nitrogen === 'High' ? ('high' as const) : ('optimal' as const),
      advice:
        input.nitrogen === 'Low'
          ? isTelugu
            ? 'నత్రజని లోపం వల్ల ఆకులు పసుపు రంగులోకి మారతాయి. ఎకరానికి 25 కిలోల వేప పిండి లేదా జీవామృతం, పచ్చిరొట్ట ఎరువులు వాడండి.'
            : 'Low Nitrogen causes stunting & yellowing. Apply compost, neem cake, or split dose of nitrogenous fertilizer.'
          : isTelugu
          ? 'నత్రజని సంతృప్తికరంగా ఉంది. అధిక మోతాదులో యూరియా వేయకుండా సమతుల్యత పాటించండి.'
          : 'Nitrogen level is optimal. Avoid excess urea to prevent vegetative succulent pest attractance.',
    },
    phosphorus: {
      level: input.phosphorus,
      status: input.phosphorus === 'Low' ? ('low' as const) : ('optimal' as const),
      advice:
        input.phosphorus === 'Low'
          ? isTelugu
            ? 'భాస్వరం లోపం వల్ల వేర్ల వ్యవస్థ బలహీనపడుతుంది. PSB (ఫాస్ఫేట్ సాల్యుబిలైజింగ్ బ్యాక్టీరియా) లేదా సింగిల్ సూపర్ ఫాస్ఫేట్ వాడండి.'
            : 'Low Phosphorus hampers root development. Inoculate with PSB biofertilizer or apply SSP with compost.'
          : isTelugu
          ? 'భాస్వరం సరిపడా ఉంది. వేరు వ్యవస్థ దృఢంగా ఎదగడానికి ఇది సహాయపడుతుంది.'
          : 'Phosphorus level is balanced for strong root establishment.',
    },
    potassium: {
      level: input.potassium,
      status: input.potassium === 'Low' ? ('low' as const) : ('optimal' as const),
      advice:
        input.potassium === 'Low'
          ? isTelugu
            ? 'పొటాష్ లోపం వల్ల తెగుళ్లను తట్టుకునే శక్తి తగ్గుతుంది. చెక్క బూడిద లేదా మ్యూరేట్ ఆఫ్ పొటాష్ (MOP) అందించండి.'
            : 'Low Potassium reduces disease tolerance. Supplement with wood ash or MOP/SOP during fruit setting.'
          : isTelugu
          ? 'పొటాషియం సమృద్ధిగా ఉంది. ఇది కాయ నాణ్యత మరియు తెగుళ్ల నిరోధకతను పెంచుతుంది.'
          : 'Potassium is sufficient, promoting crop stress resistance and grain filling.',
    },
    ph: {
      value: input.ph,
      classification:
        input.ph < 6.0
          ? isTelugu
            ? 'ఆమ్ల నేల (Acidic)'
            : 'Acidic'
          : input.ph > 8.0
          ? isTelugu
            ? 'క్షార నేల (Alkaline)'
            : 'Alkaline'
          : isTelugu
          ? 'సమతుల్య తటస్థ నేల (Optimal Neutral)'
          : 'Optimal Neutral',
      impact:
        input.ph < 6.0
          ? isTelugu
            ? 'ఆమ్లత్వం వల్ల భాస్వరం మరియు కాల్షియం మొక్కలకు సరిగా అందవు. ఎకరానికి వ్యవసాయ సున్నం (Lime) వేయడం మంచిది.'
            : 'Acidic pH locks phosphorus and calcium. Apply agricultural lime or dolomite.'
          : input.ph > 8.0
          ? isTelugu
            ? 'క్షారత్వం వల్ల జింక్, ఇనుము లోపాలు వస్తాయి. జిప్సం (Gypsum) మరియు పచ్చిరొట్ట ఎరువులు వేసి సరిచేయండి.'
            : 'Alkaline pH induces iron & zinc deficiency. Apply agricultural gypsum and green manures.'
          : isTelugu
          ? 'ఈ pH వద్ద అన్ని ప్రధాన పోషకాలు మొక్కల వేర్లకు సులభంగా అందుతాయి.'
          : 'Nutrient availability is at maximum efficiency in this pH range.',
    },
    organicMatter: {
      value: om,
      status: om < 0.5 ? (isTelugu ? 'తక్కువ (<0.5%)' : 'Low (<0.5%)') : isTelugu ? 'మంచిది (>0.75%)' : 'Good (>0.75%)',
      advice:
        om < 0.5
          ? isTelugu
            ? 'సేంద్రీయ కర్బనం తక్కువగా ఉంది. ఎకరానికి 4-5 టన్నుల పశువుల ఎరువు లేదా వర్మీకంపోస్ట్ వేయండి.'
            : 'Soil organic carbon is low. Incorporate 4-5 tonnes/acre of well-rotted FYM or vermicompost.'
          : isTelugu
          ? 'సేంద్రీయ పదార్థం సంతృప్తికరంగా ఉంది. నేల జీవ చైతన్యాన్ని కాపాడుతుంది.'
          : 'Adequate organic matter supports beneficial soil microbial biodiversity.',
    },
    moisture: {
      value: input.moisture,
      status: input.moisture < 30 ? (isTelugu ? 'తక్కువ తేమ' : 'Dry') : input.moisture > 75 ? (isTelugu ? 'అధిక తేమ' : 'Wet') : (isTelugu ? 'సరిపడా తేమ' : 'Adequate'),
      advice:
        input.moisture < 30
          ? isTelugu
            ? 'నేలలో తేమ తక్కువగా ఉంది. డ్రిప్ ద్వారా నీరు అందించండి లేదా మల్చింగ్ వేయండి.'
            : 'Soil moisture is low. Irrigate promptly and consider straw mulching to conserve moisture.'
          : input.moisture > 75
          ? isTelugu
            ? 'అధిక తేమ వల్ల వేరు కుళ్లు తెగులు వచ్చే ప్రమాదం ఉంది. మురుగు నీటి కాలువలు తీయండి.'
            : 'Excessive moisture may lead to root asphyxiation and collar rot. Ensure field drainage.'
          : isTelugu
          ? 'తేమ స్థాయి పంట పెరుగుదలకు అనుకూలంగా ఉంది.'
          : 'Moisture regime is optimal for current stage.',
    },
  };

  // List concerns
  const concerns: string[] = [];
  if (input.ph < 6.0) {
    concerns.push(
      isTelugu
        ? `నేలలో ఆమ్ల గుణం (pH ${input.ph}) వల్ల భాస్వరం మరియు సూక్ష్మ పోషకాల లభ్యత తగ్గుతుంది.`
        : `Acidic soil pH (${input.ph}) reduces phosphate and calcium availability.`
    );
  }
  if (input.ph > 8.0) {
    concerns.push(
      isTelugu
        ? `నేలలో క్షార గుణం (pH ${input.ph}) వల్ల జింక్ మరియు ఇనుము లోపం వచ్చే అవకాశం ఉంది.`
        : `Alkaline pH (${input.ph}) limits iron, manganese, and zinc uptake.`
    );
  }
  if (input.nitrogen === 'Low') {
    concerns.push(
      isTelugu
        ? 'నత్రజని తక్కువగా ఉండటం వల్ల మొక్కల శాఖీయ పెరుగుదల మందగిస్తుంది.'
        : 'Low nitrogen will lead to pale leaves and stunted vegetative growth.'
    );
  }
  if (input.phosphorus === 'Low') {
    concerns.push(
      isTelugu
        ? 'భాస్వరం తక్కువగా ఉన్నందున వేరు వ్యవస్థ లోతుగా విస్తరించకపోవచ్చు.'
        : 'Low phosphorus impairs early root vigor and delayed flowering.'
    );
  }
  if (input.potassium === 'Low') {
    concerns.push(
      isTelugu
        ? 'పొటాషియం లోపం వల్ల వర్షాభావ పరిస్థితులను, తెగుళ్లను తట్టుకునే శక్తి తగ్గుతుంది.'
        : 'Potassium deficiency reduces drought endurance and pest resistance.'
    );
  }
  if (input.moisture < 30) {
    concerns.push(
      isTelugu
        ? `నేల తేమ శాతం (${input.moisture}%) తక్కువగా ఉన్నందున నీటి ఎద్దడి ఏర్పడవచ్చు.`
        : `Low soil moisture (${input.moisture}%) may trigger moisture stress.`
    );
  }
  if (concerns.length === 0) {
    concerns.push(
      isTelugu
        ? 'ప్రస్తుత సమాచారం ప్రకారం ప్రధాన లోపాలు ఏమీ లేవు. సాధారణ యాజమాన్యం సరిపోతుంది.'
        : 'No acute deficiencies observed. Maintain standard soil health practices.'
    );
  }

  // Management suggestions
  const managementSuggestions: string[] = [
    isTelugu
      ? 'ఎకరానికి 3-5 టన్నుల బాగా చివికిన పశువుల ఎరువు (FYM) లేదా 1.5 టన్నుల వర్మీకంపోస్ట్ దుక్కిలో కలపండి.'
      : 'Incorporate 3-5 tonnes/acre of well-rotted FYM or 1.5 tonnes of vermicompost during field preparation.',
    isTelugu
      ? 'జీలుగ లేదా జనుము వంటి పచ్చిరొట్ట పంటలను 45 రోజుల వయసులో పూత దశకు ముందు నేలలో కలియదున్నండి.'
      : 'Grow and incorporate green manure crops (Dhaincha / Sunnhemp) at 45 days to enhance organic carbon.',
    isTelugu
      ? 'అజటోబాక్టర్, అజోస్పైరిల్లమ్ మరియు ఫాస్ఫో బ్యాక్టీరియా (PSB) వంటి జీవ ఎరువులను ఎకరానికి 2 కిలోలు వాడండి.'
      : 'Apply beneficial biofertilizers (Azotobacter / PSB / KMB) @ 2 kg/acre mixed with compost.',
    isTelugu
      ? 'నేల తేమను కాపాడటానికి మరియు కలుపు నివారణకు ఎండుగడ్డి లేదా ప్లాస్టిక్ మల్చింగ్ ఉపయోగించండి.'
      : 'Use organic crop residue or dry straw mulching to conserve moisture and suppress weed germination.',
  ];

  if (input.ph < 6.0) {
    managementSuggestions.unshift(
      isTelugu
        ? 'ఆమ్లత్వాన్ని తగ్గించడానికి ఎకరానికి 200-300 కిలోల వ్యవసాయ సున్నం (Lime) దుక్కిలో వేసి కలియదున్నండి.'
        : 'Apply 200-300 kg/acre Agricultural Lime to correct soil acidity and improve nutrient release.'
    );
  } else if (input.ph > 8.0) {
    managementSuggestions.unshift(
      isTelugu
        ? 'క్షారత్వాన్ని తగ్గించడానికి ఎకరానికి 250-400 కిలోల వ్యవసాయ జిప్సం (Gypsum) వేసి నీరు పెట్టండి.'
        : 'Apply 250-400 kg/acre Agricultural Gypsum to neutralize alkalinity and displace sodium.'
    );
  }

  const suitableCrops = isTelugu ? soilMeta.suitableCropsTelugu : soilMeta.suitableCrops;

  return {
    status,
    statusLabel,
    score,
    summary,
    nutrientStatus,
    concerns,
    managementSuggestions,
    suitableCrops,
    isDemoData: input.isDemoData ?? false,
  };
}
