import { CropRotationInput, CropRotationPlan, SupportedLanguage } from '../types';

export function generateCropRotationPlan(
  input: CropRotationInput,
  language: SupportedLanguage = 'Telugu'
): CropRotationPlan {
  const isTelugu = language === 'Telugu';
  const cropLower = (input.currentCrop || '').toLowerCase();
  const soilLower = (input.soilType || '').toLowerCase();
  const waterLower = (input.waterAvailability || '').toLowerCase();

  // Determine Botanical family and complementary 3-season succession
  let season1Name = isTelugu ? 'సీజన్ 1 (ప్రస్తుత / ముగిసిన పంట)' : 'Season 1 (Current / Baseline Crop)';
  let season2Name = isTelugu ? 'సీజన్ 2 (నత్రజని స్థిరీకరణ & నేల పునరుద్ధరణ)' : 'Season 2 (Nitrogen Fixation & Soil Restoration)';
  let season3Name = isTelugu ? 'సీజన్ 3 (లోతైన వేరు పంట / తృణధాన్యాలు)' : 'Season 3 (Deep-Rooted Cereal / Biomass Crop)';

  let season1Crop = input.currentCrop || (isTelugu ? 'టమాటా' : 'Tomato');
  let season2Crop = isTelugu ? 'పప్పుధాన్యాలు (మినుము / పెసర / శనగ)' : 'Pulses (Green Gram / Black Gram / Bengal Gram)';
  let season3Crop = isTelugu ? 'మొక్కజొన్న లేదా చిరుధాన్యాలు (జొన్న/సజ్జ)' : 'Maize or Millets (Sorghum / Pearl Millet)';

  let season2Rationale = isTelugu
    ? 'పప్పుజాతి పంటల వేర్లలోని రైజోబియం బ్యాక్టీరియా వాతావరణంలోని నత్రజనిని నేలలో స్థిరీకరిస్తుంది. టమాటా/మిరప పంటల వల్ల పెరిగిన నేల శిలీంధ్ర బీజాలను సమర్థవంతంగా విచ్ఛిన్నం చేస్తుంది.'
    : 'Legume pulses possess symbiotic Rhizobium nodules that naturally fix atmospheric nitrogen (30-50 kg N/ha), while breaking soil-borne fungal spore cycles left by previous solanaceous crops.';

  let season3Rationale = isTelugu
    ? 'మొక్కజొన్న లేదా తృణధాన్యాలు విస్తారమైన వేరు వ్యవస్థ ద్వారా లోతైన నేల పొరల్లోని పోషకాలను సంగ్రహిస్తాయి, సేంద్రీయ పదార్థాన్ని సమృద్ధిగా అందించి నేల గుల్లబారేలా చేస్తాయి.'
    : 'Cereal crops like Maize have dense fibrous root systems that tap deeper subsoil nutrient reserves, suppress root knot nematodes, and leave high organic biomass residue.';

  // If farmer selected Cotton
  if (cropLower.includes('cotton') || cropLower.includes('పత్తి') || cropLower.includes('कपास')) {
    season1Crop = isTelugu ? 'పత్తి (Cotton)' : 'Cotton';
    season2Crop = isTelugu ? 'శనగ లేదా సోయాబీన్ (Bengal Gram / Soybean)' : 'Bengal Gram / Soybean';
    season3Crop = isTelugu ? 'గోధుమ లేదా జొన్న (Wheat / Sorghum)' : 'Wheat / Sorghum';
    season2Rationale = isTelugu
      ? 'పత్తి నేల నుండి భారీగా పోషకాలను తీసుకుంటుంది. శనగ లేదా సోయాబీన్ వేయడం వల్ల నేల నత్రజని పునరుద్ధరించబడుతుంది మరియు గులాబీ రంగు కాయ తొలిచే పురుగుల నిద్రావస్థ చక్రం తెగిపోతుంది.'
      : 'Cotton is a heavy feeder. Sowing legumes (Chickpea/Soybean) replenishes soil nitrogen, improves porosity, and breaks the diapause cycle of Pink Bollworm.';
    season3Rationale = isTelugu
      ? 'జొన్న లేదా గోధుమ వంటి తృణధాన్యాలు నేల నిర్మాణాన్ని దృఢపరుస్తాయి మరియు కలుపు వ్యాప్తిని అరికడతాయి.'
      : 'Sorghum/Wheat restores soil aggregate stability and minimizes weed seed banking.';
  }

  // If farmer selected Paddy / Rice
  if (cropLower.includes('rice') || cropLower.includes('paddy') || cropLower.includes('వరి') || cropLower.includes('धान')) {
    season1Crop = isTelugu ? 'వరి (Paddy / Rice)' : 'Paddy / Rice';
    season2Crop = isTelugu ? 'మినుము లేదా పెసర (Black Gram / Green Gram - Zero Tillage)' : 'Black Gram / Green Gram (Zero Tillage / Residual Moisture)';
    season3Crop = isTelugu ? 'నువ్వులు, వేరుశనగ లేదా మొక్కజొన్న (Sesame / Groundnut / Maize)' : 'Sesame / Groundnut / Maize';
    season2Rationale = isTelugu
      ? 'వరి కోతకు ముందు లేదా కోసిన వెంటనే మినుము విత్తడం (జీరో టిల్లేజ్) వల్ల మిగిలిన తేమతోనే పంట పండుతుంది, నేల నత్రజని పెరుగుతుంది.'
      : 'Relay cropping of Black Gram in standing paddy stubbles utilizes residual moisture without tillage, adding vital organic nitrogen back to saturated paddy soils.';
    season3Rationale = isTelugu
      ? 'వేసవిలో నువ్వులు లేదా వేరుశనగ వంటి నూనెగింజలు లేదా మొక్కజొన్న వేయడం వల్ల నేలలో గాలి ప్రసరణ మెరుగుపడుతుంది, నీటి నిల్వ సమస్య తగ్గుతుంది.'
      : 'Sesame or Groundnut aerates the puddled soil layer, breaks anaerobic bacterial biofilms, and generates alternate income with low water.';
  }

  // If farmer selected Chilli
  if (cropLower.includes('chilli') || cropLower.includes('మిరప') || cropLower.includes('mirchi')) {
    season1Crop = isTelugu ? 'మిరప (Chilli)' : 'Chilli';
    season2Crop = isTelugu ? 'పచ్చిరొట్ట ఎరువు (జీలుగ / జనుము) లేదా వేరుశనగ' : 'Green Manure (Dhaincha) or Groundnut';
    season3Crop = isTelugu ? 'మొక్కజొన్న లేదా రాగి (Maize / Finger Millet)' : 'Maize / Finger Millet';
    season2Rationale = isTelugu
      ? 'మిరప తర్వాత జీలుగ లేదా వేరుశనగ వేయడం వల్ల నేలలోని నిమటోడ్లు, తామర పురుగుల నిద్రావస్థ దశలు నాశనమవుతాయి, సేంద్రీయ కర్బనం రెట్టింపు అవుతుంది.'
      : 'Green manuring with Dhaincha or Groundnut smothers root-knot nematodes, eliminates resting thrips pupae in soil, and enriches topsoil carbon.';
  }

  // 3-Season Plan
  const seasons = [
    {
      seasonNumber: 1,
      seasonName: season1Name,
      suggestedCrop: season1Crop,
      cropFamily: isTelugu ? 'ప్రధాన పంట' : 'Primary / Baseline Crop',
      purpose: isTelugu ? 'ప్రధాన ఆదాయం మరియు ఉత్పత్తి' : 'Primary Cash/Food Generation',
      rationale: isTelugu ? 'మీరు ఎంచుకున్న ప్రస్తుత పంట.' : 'Baseline crop selected by farmer.',
      nutrientContribution: isTelugu ? 'సాధారణ వినియోగం' : 'Standard extraction',
      waterRequirement: input.waterAvailability || 'Moderate',
    },
    {
      seasonNumber: 2,
      seasonName: season2Name,
      suggestedCrop: season2Crop,
      cropFamily: isTelugu ? 'లెగ్యూమినేసి (పప్పుజాతి కుటుంబం)' : 'Fabaceae / Legume Family',
      purpose: isTelugu ? 'నత్రజని స్థిరీకరణ & తెగుళ్ల విచ్ఛిన్నం' : 'Biological Nitrogen Fixation & Pathogen Disruption',
      rationale: season2Rationale,
      nutrientContribution: isTelugu ? 'ఎకరానికి 30-45 కిలోల సహజ నత్రజని చేరిక' : '+30-45 kg Natural Atmospheric N/Acre',
      waterRequirement: isTelugu ? 'తక్కువ నుండి మితమైన నీరు' : 'Low to Moderate',
    },
    {
      seasonNumber: 3,
      seasonName: season3Name,
      suggestedCrop: season3Crop,
      cropFamily: isTelugu ? 'పోయేసి (తృణధాన్యాల కుటుంబం)' : 'Poaceae / Grass & Cereal Family',
      purpose: isTelugu ? 'నేల నిర్మాణం మెరుగుపరచడం & సేంద్రీయ వ్యర్థాల చేరిక' : 'Soil Structure Strengthening & High Biomass Addition',
      rationale: season3Rationale,
      nutrientContribution: isTelugu ? 'లోతైన పోషకాల రీసైక్లింగ్ & కార్బన్ చేరిక' : 'Subsoil Nutrient Scavenging & Organic Humus Formation',
      waterRequirement: isTelugu ? 'మితమైన నీరు' : 'Moderate',
    },
  ];

  // Reasons Why Suggested
  const whySuggested = isTelugu
    ? [
        `ఒకే కుటుంబానికి చెందిన పంటలను పదేపదే వేయడం వల్ల వచ్చే నేల ద్వారా వ్యాపించే తెగుళ్లు (శిలీంధ్రాలు, బ్యాక్టీరియా) ఈ క్రమంలో నశిస్తాయి.`,
        `సీజన్ 2 లో పప్పుజాతి పంటలు సహజ నత్రజనిని అందించడం ద్వారా తదుపరి పంటకు రసాయన ఎరువుల ఖర్చు 25-30% తగ్గుతుంది.`,
        `వివిధ లోతుల్లోకి వెళ్లే వేరు వ్యవస్థలు (గాధ వేర్లు + పీచు వేర్లు) నేల పొరలన్నింటినీ సారవంతం చేస్తాయి.`,
      ]
    : [
        `Breaks recurring soil-borne fungal spores, viral vector lifecycles, and root-knot nematodes specific to single-family monoculture.`,
        `Season 2 pulses biologically fix 30-45 kg Nitrogen/acre, cutting down subsequent urea and basal fertilizer purchase expenses by 25-30%.`,
        `Alternating taproot and fibrous root systems maximizes nutrient scavenging across differing soil depth strata.`,
      ];

  // Diversity Benefits
  const cropDiversityBenefits = isTelugu
    ? [
        `కలుపు మొక్కల బెడదను సహజంగా నియంత్రిస్తుంది; ఒకే రకమైన కలుపు విత్తనాలు వృద్ధి చెందకుండా అడ్డుకుంటుంది.`,
        `నేలలోని ఉపయోగకరమైన సూక్ష్మజీవుల (Microbial Biodiversity) సమతుల్యత మరియు నేల వానపాముల సంఖ్య పెరుగుతుంది.`,
        `మార్కెట్ ధరల హెచ్చుతగ్గుల నుంచి రైతుకు బహుళ ఆదాయ భద్రత లభిస్తుంది.`,
      ]
    : [
        `Suppresses persistent weed seed banks through varying canopy architectures and planting densities.`,
        `Enhances beneficial soil microbial biodiversity and mycorrhizal fungi networks.`,
        `Diversifies economic risk against market price volatility and weather shocks.`,
      ];

  // Soil Nutrient Management
  const soilNutrientManagement = isTelugu
    ? [
        `ప్రతి పంట మార్పిడికి ముందు దుక్కిలో 2-3 టన్నుల పశువుల ఎరువు లేదా వర్మీకంపోస్ట్ వేసి సేంద్రీయ కర్బనాన్ని కాపాడండి.`,
        `పప్పుధాన్యాల పంట కోసిన తర్వాత మిగిలిన ఆకులు, కొయ్యలను నేలలోనే కలియదున్నండి.`,
        `నేల రకం (${input.soilType}) బట్టి అవసరమైతే సూక్ష్మ పోషకాలైన జింక్, బోరాన్లను పూత దశలో పిచికారీ చేయండి.`,
      ]
    : [
        `Apply 2-3 tonnes/acre FYM or compost between seasonal transitions to maintain organic carbon buffer.`,
        `Incorporate legume crop residues directly back into soil rather than burning.`,
        `Monitor micronutrient levels (Zinc, Boron) based on your specific soil profile (${input.soilType}).`,
      ];

  // Potential Benefits
  const potentialBenefits = isTelugu
    ? [
        `నేల భౌతిక నిర్మాణం గుల్లబారి నీటిని పీల్చుకునే సామర్థ్యం (Water Infiltration) 20-35% పెరుగుతుంది.`,
        `రసాయన పురుగుమందుల మరియు ఎరువుల ఖర్చులు తగ్గి పెట్టుబడి ఆదా అవుతుంది.`,
        `దీర్ఘకాలికంగా భూమి సారం క్షీణించకుండా సారవంతంగా ఉంటుంది.`,
      ]
    : [
        `Improves soil physical tilth and water infiltration capacity by 20-35%.`,
        `Reduces external expenditure on synthetic pesticides and mineral fertilizers.`,
        `Guards against long-term soil exhaustion and salinity buildup.`,
      ];

  // Cautions & Disclaimers
  const cautions = isTelugu
    ? [
        `మార్పిడి పంటను ఎంపిక చేసుకునే సమయంలో మీ ప్రాంతంలోని నీటి లభ్యత (${input.waterAvailability}) మరియు స్థానిక మార్కెట్ డిమాండ్‌ను పరిగణనలోకి తీసుకోండి.`,
        `తెగులు తట్టుకునే ధృవీకరించబడిన విత్తనాలను మాత్రమే వాడండి.`,
      ]
    : [
        `Factor in seasonal irrigation constraints (${input.waterAvailability}) and local mandi access before final seed procurement.`,
        `Always use certified disease-free seed stock treated with bio-inoculants.`,
      ];

  const disclaimer = isTelugu
    ? 'గమనిక: ఈ పంట మార్పిడి ప్రణాళిక శాస్త్రీయ సూత్రాల ఆధారంగా రూపొందించిన సాధారణ వ్యవసాయ సలహా మాత్రమే. ఇది ఖచ్చితమైన అధిక దిగుబడికి హామీ ఇవ్వదు. వాస్తవ దిగుబడి వాతావరణ పరిస్థితులు, నాణ్యమైన విత్తనాలు మరియు సకాలంలో చేసే క్షేత్ర పనులపై ఆధారపడి ఉంటుంది.'
    : 'Notice: Crop rotation recommendations are general agronomic guidance based on botanical family succession and do not guarantee higher yield. Actual harvest depends on local microclimate, seed quality, and timely farm management practices.';

  return {
    currentCrop: input.currentCrop,
    seasons,
    whySuggested,
    cropDiversityBenefits,
    soilNutrientManagement,
    potentialBenefits,
    cautions,
    disclaimer,
  };
}
