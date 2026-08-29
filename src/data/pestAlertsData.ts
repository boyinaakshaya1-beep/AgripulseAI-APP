import { PestAlertItem, PestAlertInput, PestAlertResult, SupportedLanguage } from '../types';

export const REGIONAL_SAMPLE_ALERTS: PestAlertItem[] = [
  {
    id: 'alert-tomato-blight',
    crop: 'Tomato',
    pestOrDiseaseName: 'Early Blight & Leaf Spot (ఆల్టర్నేరియా ఆకుమచ్చ తెగులు)',
    scientificName: 'Alternaria solani',
    type: 'Fungal Disease',
    riskLevel: 'High',
    alertStatus: 'Active Alert',
    affectedParts: ['Lower Leaves', 'Stems', 'Fruit Calyx'],
    regionalArea: 'Andhra Pradesh & Telangana Semi-Arid Plains',
    reportedDate: 'Active This Week',
    isSampleAlert: true,
    symptoms: [
      'Concentric bullseye dark circular spots on lower leaves',
      'Yellowing around spots and premature leaf dropping',
      'Dark sunken stem cankers',
    ],
    suggestedNextSteps: [
      'Prune and destroy infected bottom leaves immediately',
      'Spray Mancozeb 75% WP @ 2.5g / Liter or Copper Oxychloride @ 3g / Liter in early morning',
      'Avoid overhead sprinkler irrigation; switch to drip watering',
    ],
    preventionPractices: [
      '3-year crop rotation with non-solanaceous crops (cereals/pulses)',
      'Apply organic mulch to stop soil-splash spore germination',
      'Spray 0.5% Neem oil preventively at 10-day intervals',
    ],
  },
  {
    id: 'alert-chilli-thrips',
    crop: 'Chilli',
    pestOrDiseaseName: 'Chilli Thrips & Leaf Curl (నల్ల తామర పురుగులు & ఆకు ముడత)',
    scientificName: 'Scirtothrips dorsalis / Thrips parvispinus',
    type: 'Pest',
    riskLevel: 'High',
    alertStatus: 'Active Alert',
    affectedParts: ['Young Shoot Tips', 'Foliage Underside', 'Flower Buds'],
    regionalArea: 'Southern Dry Zones & Central Plains',
    reportedDate: 'Active Surveillance Watch',
    isSampleAlert: true,
    symptoms: [
      'Upward curling and boat-shaped crinkling of leaves',
      'Silvery or bronzed sheen on lower leaf surfaces',
      'Flower drop and malformed undersized chillies',
    ],
    suggestedNextSteps: [
      'Install 20-25 Blue and Yellow sticky traps per acre at crop canopy height',
      'Spray Spinetoram 11.7% SC @ 1.0 ml / Liter or Fipronil 5% SC @ 2 ml / Liter',
      'Spray botanical Pongamia or Neem seed kernel extract (NSKE 5%)',
    ],
    preventionPractices: [
      'Border cropping with 2-3 rows of Maize or Sorghum as barrier',
      'Conserve natural predators like predatory mites and ladybird beetles',
      'Avoid excess nitrogen fertilizer which creates succulent growth attracting thrips',
    ],
  },
  {
    id: 'alert-cotton-bollworm',
    crop: 'Cotton',
    pestOrDiseaseName: 'Pink Bollworm (గులాబీ రంగు కాయ తొలిచే పురుగు)',
    scientificName: 'Pectinophora gossypiella',
    type: 'Pest',
    riskLevel: 'Medium',
    alertStatus: 'Seasonal Watch',
    affectedParts: ['Rosette Flowers', 'Green Bolls', 'Cotton Lint'],
    regionalArea: 'Black Soil Deccan Cotton Belt',
    reportedDate: 'Seasonal Advisory',
    isSampleAlert: true,
    symptoms: [
      'Rosette flowers that fail to open properly',
      'Small bore holes in developing green bolls plugged with excreta',
      'Premature boll opening with stained and damaged lint',
    ],
    suggestedNextSteps: [
      'Install 5-8 Pheromone traps per acre to monitor adult moth activity',
      'Release Trichogramma egg parasitoids @ 60,000 / acre at weekly intervals',
      'Spray Chlorantraniliprole 18.5% SC @ 0.3 ml / Liter if trap catch exceeds ETL',
    ],
    preventionPractices: [
      'Avoid extending the crop season beyond 160 days',
      'Destruction of crop stalks immediately after final harvest',
      'Grow refuge border non-Bt cotton rows',
    ],
  },
  {
    id: 'alert-rice-bph',
    crop: 'Paddy / Rice',
    pestOrDiseaseName: 'Brown Plant Hopper - BPH (సుడి దోమ / గోధుమ రంగు దోమ)',
    scientificName: 'Nilaparvata lugens',
    type: 'Pest',
    riskLevel: 'High',
    alertStatus: 'Active Alert',
    affectedParts: ['Stem Base', 'Tillers', 'Leaf Sheath'],
    regionalArea: 'Canal Irrigated Delta & Basin Lands',
    reportedDate: 'Active Surveillance',
    isSampleAlert: true,
    symptoms: [
      'Circular patches of dried, golden-yellow plants ("Hopper Burn")',
      'Clusters of small brown nymphs and adults crowding at stem base near water level',
      'Sooty mold growth on honeydew exudate at base of hills',
    ],
    suggestedNextSteps: [
      'Drain standing water completely from the field for 3-4 days ("Alternate Wetting and Drying")',
      'Form alleyways (30 cm paths every 2 meters) for aeration and sunlight penetration',
      'Spray Triflumezopyrim 10% SC @ 0.5 ml / Liter directing spray nozzle strictly at hill bases',
    ],
    preventionPractices: [
      'Adopt split application of Nitrogen and never apply urea during hopper build-up',
      'Avoid synthetic pyrethroids which kill natural spider predators and cause BPH resurgence',
      'Use BPH-resistant seed varieties like MTU 1061 or BPT 5204 tolerant crosses',
    ],
  },
  {
    id: 'alert-maize-faw',
    crop: 'Maize',
    pestOrDiseaseName: 'Fall Armyworm (కత్తెర పురుగు)',
    scientificName: 'Spodoptera frugiperda',
    type: 'Pest',
    riskLevel: 'Medium',
    alertStatus: 'Regional Advisory',
    affectedParts: ['Whorl Leaves', 'Tassel', 'Cob'],
    regionalArea: 'Kharif / Rabi Maize Tracts',
    reportedDate: 'Weekly Advisory',
    isSampleAlert: true,
    symptoms: [
      'Pin-holes, papery windows, and severe ragged defoliation in central whorl',
      'Abundant sawdust-like brownish fecal matter inside leaf whorl',
      'Caterpillars with inverted "Y" mark on head and 4 dark square spots on tail segment',
    ],
    suggestedNextSteps: [
      'Whirl application of Sand + Lime mixture (9:1 ratio) or dry soil to suffocate larvae',
      'Spray Bacillus thuringiensis (Bt) @ 2g / Liter or Emamectin Benzoate 5% SG @ 0.4g / Liter',
      'Hand-pick and crush egg masses visible on lower leaf surfaces',
    ],
    preventionPractices: [
      'Deep summer ploughing to expose pupae to predatory birds',
      'Intercropping with pulses like cowpea or pigeonpea',
      'Synchronized planting across the farming village block',
    ],
  },
];

export const TELUGU_REGIONAL_SAMPLE_ALERTS: PestAlertItem[] = [
  {
    id: 'alert-tomato-blight',
    crop: 'టమాటా (Tomato)',
    pestOrDiseaseName: 'ఆల్టర్నేరియా ఆకుమచ్చ & ముందస్తు మాడు తెగులు',
    scientificName: 'Alternaria solani',
    type: 'శిలీంధ్ర తెగులు',
    riskLevel: 'High',
    alertStatus: 'తీవ్ర హెచ్చరిక',
    affectedParts: ['దిగువ ఆకులు', 'కాండం', 'కాయల తొడిమ'],
    regionalArea: 'ఆంధ్రప్రదేశ్ & తెలంగాణ ప్రాంతాలు',
    reportedDate: 'ఈ వారం నిఘా నివేదిక',
    isSampleAlert: true,
    symptoms: [
      'కింది ఆకులపై వలయాకారపు నల్లటి గోధుమ మచ్చలు ఏర్పడటం',
      'మచ్చల చుట్టూ పసుపు రంగు వలయం ఏర్పడి ఆకులు రాలిపోవడం',
      'కాండం వద్ద లోపలికి కుంగిన నల్లటి మచ్చలు రావడం',
    ],
    suggestedNextSteps: [
      'తెగులు సోకిన దిగువ ఆకులను వెంటనే కత్తిరించి కాల్చివేయండి.',
      'మాంకోజెబ్ 75% WP @ 2.5 గ్రా/లీ లేదా కాపర్ ఆక్సీక్లోరైడ్ @ 3 గ్రా/లీ ఉదయాన్నే పిచికారీ చేయండి.',
      'స్ప్రింక్లర్లతో నీరు చిమ్మడం ఆపి, డ్రిప్ పద్ధతి ద్వారా మాత్రమే నీరు అందించండి.',
    ],
    preventionPractices: [
      'మిరప, వంగ కాకుండా తృణధాన్యాలు/పప్పుదినుసులతో 3 సంవత్సరాల పంట మార్పిడి చేయండి.',
      'మట్టిలోని శిలీంధ్ర బీజాలు పైకి ఎగరకుండా సేంద్రీయ మల్చింగ్ వేయండి.',
      '10 రోజుల వ్యవధిలో 0.5% వేపనూనెను ముందస్తుగా పిచికారీ చేయండి.',
    ],
  },
  {
    id: 'alert-chilli-thrips',
    crop: 'మిరప (Chilli)',
    pestOrDiseaseName: 'నల్ల తామర పురుగులు & పై ముడత తెగులు',
    scientificName: 'Scirtothrips dorsalis / Thrips parvispinus',
    type: 'పురుగు / కీటకం',
    riskLevel: 'High',
    alertStatus: 'తీవ్ర హెచ్చరిక',
    affectedParts: ['లేత చిగుళ్ళు', 'ఆకుల అడుగు భాగం', 'పూత మొగ్గలు'],
    regionalArea: 'దక్షిణ & మధ్య మెట్ట ప్రాంతాలు',
    reportedDate: 'చురుకైన నిఘా నివేదిక',
    isSampleAlert: true,
    symptoms: [
      'ఆకులు పైకి దోనె ఆకారంలో ముడుచుకుపోవడం',
      'ఆకు వెనుక భాగం కాంస్య లేదా వెండి రంగులోకి మారడం',
      'పూత రాలిపోవడం మరియు కాయలు వంకరతిరిగి చిన్నవిగా మారడం',
    ],
    suggestedNextSteps: [
      'ఎకరానికి 20-25 నీలి మరియు పసుపు రంగు జిగురు అట్టలను పైరు ఎత్తులో అమర్చండి.',
      'స్పైనెటోరం 11.7% SC @ 1.0 మి.లీ/లీ లేదా ఫిప్రోనిల్ 5% SC @ 2.0 మి.లీ/లీ పిచికారీ చేయండి.',
      '5% వేప గింజల కషాయం (NSKE) లేదా కానుగ నూనె పిచికారీ చేయండి.',
    ],
    preventionPractices: [
      'పొలం చుట్టూ 2-3 వరుసలలో జొన్న లేదా మొక్కజొన్నను సరిహద్దు పంటగా వేయండి.',
      'సహజ మిత్ర పురుగులైన లేడీబర్డ్ బీటిల్స్ మరియు ప్రిడేటరీ మైట్లను సంరక్షించండి.',
      'రసం పీల్చే పురుగులను ఆకర్షించే అధిక నత్రజని (యూరియా) ఎరువులను తగ్గించండి.',
    ],
  },
  {
    id: 'alert-cotton-bollworm',
    crop: 'పత్తి (Cotton)',
    pestOrDiseaseName: 'గులాబీ రంగు కాయ తొలిచే పురుగు',
    scientificName: 'Pectinophora gossypiella',
    type: 'పురుగు / కీటకం',
    riskLevel: 'Medium',
    alertStatus: 'ప్రాంతీయ నిఘా',
    affectedParts: ['రోజెట్ పూలు', 'పచ్చి కాయలు', 'దూది'],
    regionalArea: 'నల్లరేగడి పత్తి సాగు ప్రాంతాలు',
    reportedDate: 'వారంవారీ సమాచారం',
    isSampleAlert: true,
    symptoms: [
      'పూలు విచ్చుకోకుండా ముడుచుకుని రోజెట్ ఆకారంలో మారడం',
      'కాయలపై చిన్న రంధ్రాలు ఏర్పడి మలంతో మూసుకుపోవడం',
      'కాయలు అకాలంగా పగలడం మరియు దూది రంగు మారడం',
    ],
    suggestedNextSteps: [
      'లింగాకర్షక బుట్టలను (Pheromone Traps) ఎకరానికి 5-8 అమర్చి పురుగుల ఉధృతిని గమనించండి.',
      'ట్రైకోగ్రామా పరాన్నజీవులను ఎకరానికి 60,000 చొప్పున వారం వ్యవధిలో విడుదల చేయండి.',
      'తీవ్రత ఎక్కువగా ఉంటే క్లోరాంట్రానిలిప్రోల్ 18.5% SC @ 0.3 మి.లీ/లీ పిచికారీ చేయండి.',
    ],
    preventionPractices: [
      'పంట కాలాన్ని 160 రోజులకు మించి పొడిగించవద్దు.',
      'చివరి కోత తర్వాత పత్తి కట్టెలను వెంటనే తొలగించి నాశనం చేయండి.',
      'పొలం చుట్టూ నాన్-బిటి పత్తి వరుసలను ఆశ్రయ పంటగా వేయండి.',
    ],
  },
  {
    id: 'alert-rice-bph',
    crop: 'వరి (Rice / Paddy)',
    pestOrDiseaseName: 'సుడి దోమ / గోధుమ రంగు దోమ (BPH)',
    scientificName: 'Nilaparvata lugens',
    type: 'పురుగు / కీటకం',
    riskLevel: 'High',
    alertStatus: 'తీవ్ర హెచ్చరిక',
    affectedParts: ['మొక్క మొదళ్ళు', 'పిలకలు', 'ఆకు తొడుగులు'],
    regionalArea: 'డెల్టా మరియు ఆయకట్టు సాగు భూములు',
    reportedDate: 'తీవ్ర నిఘా నివేదిక',
    isSampleAlert: true,
    symptoms: [
      'చేనులో వలయాకారంలో పైరు ఎండిపోయి ఎండుగడ్డిలా మారడం (హాప్పర్ బర్న్)',
      'మొక్క మొదళ్ళ వద్ద నీటి మట్టం దగ్గర దోమల గుంపులు రసం పీల్చడం',
      'దోమల విసర్జితాలపై నల్లటి మసి బూజు ఏర్పడటం',
    ],
    suggestedNextSteps: [
      'పొలంలోని నీటిని 3-4 రోజుల పాటు పూర్తిగా తీసివేసి ఆరబెట్టండి (AWD పద్ధతి).',
      'గాలి, వెలుతురు ప్రసరించేలా ప్రతి 2 మీటర్లకు 30 సెం.మీ కాలిబాటలు తీయండి.',
      'ట్రైఫ్లూమెజోపైరిమ్ 10% SC @ 0.5 మి.లీ/లీ లేదా పైనోటెఫురాన్ 20% SG @ 0.4 గ్రా/లీ మొక్క మొదళ్ళపై పిచికారీ చేయండి.',
    ],
    preventionPractices: [
      'నత్రజని ఎరువులను ఒకేసారి కాకుండా విడతలవారీగా వేయండి; దోమ ఉన్నప్పుడు యూరియా వేయకండి.',
      'మిత్రపురుగులైన సాలీళ్ళను చంపే సింథటిక్ పైరెథ్రాయిడ్ మందులను వాడవద్దు.',
      'సుడిదోమను తట్టుకునే వరి రకాలను (MTU 1061 వంటివి) సాగు చేయండి.',
    ],
  },
  {
    id: 'alert-maize-faw',
    crop: 'మొక్కజొన్న (Maize)',
    pestOrDiseaseName: 'కత్తెర పురుగు (Fall Armyworm)',
    scientificName: 'Spodoptera frugiperda',
    type: 'పురుగు / కీటకం',
    riskLevel: 'Medium',
    alertStatus: 'ప్రాంతీయ నిఘా',
    affectedParts: ['సుడులు', 'ఆకులు', 'కండెలు'],
    regionalArea: 'ఖరీఫ్ మరియు రబీ మొక్కజొన్న ప్రాంతాలు',
    reportedDate: 'వారంవారీ సమాచారం',
    isSampleAlert: true,
    symptoms: [
      'మొక్కజొన్న సుడిలోని ఆకులకు రంధ్రాలు పడి ఆకులు చిరిగిపోవడం',
      'సుడి లోపల చెక్కపొట్టు లాంటి ముదురు గోధుమ రంగు విసర్జితాలు ఉండటం',
      'తల భాగంలో తిరగబడిన "Y" ఆకారం గల గొంగళి పురుగులు కనిపించడం',
    ],
    suggestedNextSteps: [
      'సుడి లోపల ఇసుక + సున్నం (9:1 నిష్పత్తిలో) లేదా పొడి మట్టి వేసి లార్వాలను అణచివేయండి.',
      'ఎమామెక్టిన్ బెంజోయేట్ 5% SG @ 0.4 గ్రా/లీ లేదా బయో-పెస్టిసైడ్ బిటి @ 2 గ్రా/లీ సుడి తడిసేలా పిచికారీ చేయండి.',
      'ఆకుల కింద కనిపించే గుడ్ల సముదాయాలను గుర్తించి నలిపివేయండి.',
    ],
    preventionPractices: [
      'వేసవిలో లోతు దుక్కులు చేసి కోశస్థ దశలను ఎండబెట్టండి.',
      'అలసందలు లేదా కందులను అంతర పంటగా సాగు చేయండి.',
      'గ్రామమంతా ఒకే సమయంలో విత్తుకునేలా సమన్వయం చేసుకోండి.',
    ],
  },
];

// Common Crop Symptoms Master Dictionary for Multi-Select
export const COMMON_SYMPTOMS_LIST = [
  { id: 'leaf-spots', name: 'Dark or Brown Leaf Spots', nameTelugu: 'ఆకులపై గోధుమ లేదా నల్లటి మచ్చలు' },
  { id: 'leaf-curling', name: 'Upward / Downward Leaf Curling', nameTelugu: 'ఆకు ముడత / పైకి లేదా కిందకి ముడుచుకోవడం' },
  { id: 'yellowing', name: 'Yellowing of Leaves / Vein Chlorosis', nameTelugu: 'ఆకులు పసుపు రంగులోకి మారడం / ఈనెల పసుపు' },
  { id: 'wilting', name: 'Sudden Drooping & Wilting of Plant', nameTelugu: 'మొక్క ఒక్కసారిగా వాడిపోవడం / వడలడం' },
  { id: 'powdery-growth', name: 'White / Grey Powdery Coating', nameTelugu: 'ఆకులపై తెల్లటి బూజు లేదా పౌడర్ లాంటి పొర' },
  { id: 'chewed-holes', name: 'Chewed Leaves & Ragged Holes', nameTelugu: 'పురుగులు ఆకులను కొరికి రంధ్రాలు చేయడం' },
  { id: 'fruit-borer', name: 'Holes & Frass in Fruit / Bolls', nameTelugu: 'కాయలు లేదా మొగ్గలలో రంధ్రాలు / పురుగు మలం' },
  { id: 'root-rot', name: 'Dark Decaying Roots / Stem Collar Rot', nameTelugu: 'వేరు కుళ్లు / మొక్క మొదలు కుళ్ళిపోవడం' },
  { id: 'stunted-growth', name: 'Stunted Growth & Bushy Appearance', nameTelugu: 'మొక్క గిడసబారి ఎదగకపోవడం' },
  { id: 'sticky-substance', name: 'Sticky Honeydew & Sooty Mold', nameTelugu: 'ఆకులపై తేనె లాంటి జిగురు / నల్లటి మసి' },
];

export function getLocalizedRegionalAlerts(language: SupportedLanguage): PestAlertItem[] {
  if (language === 'Telugu') {
    return TELUGU_REGIONAL_SAMPLE_ALERTS;
  }
  return REGIONAL_SAMPLE_ALERTS;
}

export function analyzePestAlert(
  input: PestAlertInput,
  language: SupportedLanguage = 'Telugu'
): PestAlertResult {
  const isTelugu = language === 'Telugu';
  const cropLower = (input.crop || '').toLowerCase();
  const selectedSymptoms = input.symptoms || [];
  const customDesc = (input.customDescription || '').trim();

  const alertsPool = isTelugu ? TELUGU_REGIONAL_SAMPLE_ALERTS : REGIONAL_SAMPLE_ALERTS;

  // Find best matching alert from database
  let matched = alertsPool.filter((item) => {
    const itemCrop = item.crop.toLowerCase();
    return (
      itemCrop.includes(cropLower) ||
      cropLower.includes(itemCrop) ||
      (cropLower.includes('mango') && item.id.includes('blight')) ||
      (cropLower.includes('wheat') && item.id.includes('maize')) ||
      (cropLower.includes('వరి') && item.id.includes('rice')) ||
      (cropLower.includes('మిరప') && item.id.includes('chilli')) ||
      (cropLower.includes('పత్తి') && item.id.includes('cotton')) ||
      (cropLower.includes('టమాటా') && item.id.includes('tomato')) ||
      (cropLower.includes('మొక్కజొన్న') && item.id.includes('maize'))
    );
  });

  if (matched.length === 0) {
    matched = alertsPool.slice(0, 2);
  }

  const primaryAlert = matched[0] || alertsPool[0];

  // Determine risk level based on symptom severity
  let riskLevel: 'Low' | 'Medium' | 'High' = primaryAlert.riskLevel;
  if (
    selectedSymptoms.includes('wilting') ||
    selectedSymptoms.includes('fruit-borer') ||
    selectedSymptoms.includes('root-rot') ||
    customDesc.toLowerCase().includes('severe') ||
    customDesc.includes('తీవ్ర')
  ) {
    riskLevel = 'High';
  } else if (selectedSymptoms.length <= 1 && riskLevel === 'High') {
    riskLevel = 'Medium';
  }

  // Pure Telugu / English Symptoms Summary
  const symptomsSummary = isTelugu
    ? [
        ...selectedSymptoms.map((sId) => {
          const item = COMMON_SYMPTOMS_LIST.find((s) => s.id === sId);
          return item ? item.nameTelugu : sId;
        }),
        ...(customDesc ? [`రైతు గమనిక: "${customDesc}"`] : []),
      ]
    : [
        ...selectedSymptoms.map((sId) => {
          const item = COMMON_SYMPTOMS_LIST.find((s) => s.id === sId);
          return item ? item.name : sId;
        }),
        ...(customDesc ? [`Farmer note: "${customDesc}"`] : []),
      ];

  // Crop-specific tailored pure Telugu & English steps
  let suggestedNextSteps: string[];
  let preventionPractices: string[];

  if (isTelugu) {
    if (cropLower.includes('వరి') || cropLower.includes('rice') || cropLower.includes('paddy')) {
      suggestedNextSteps = [
        'పొలంలో కనీసం 15-20 మొక్కలను నిశితంగా పరిశీలించి తెగులు తీవ్రతను అంచనా వేయండి.',
        'నీటి మట్టాన్ని 3-4 రోజుల పాటు తగ్గించి పొలానికి గాలి, వెలుతురు తగిలేలా చేయండి.',
        'సిఫార్సు చేసిన క్రిమిసంహారక లేదా శిలీంధ్రనాశిని మందును ఉదయం వేళ మాత్రమే పిచికారీ చేయండి.',
        'మొక్క మొదళ్ళు తడిసేలా స్ప్రే నాజిల్‌ను కిందకి ఉంచి పిచికారీ చేయండి.',
      ];
      preventionPractices = [
        'నత్రజని (యూరియా) ఎరువులను ఒకేసారి కాకుండా సిఫార్సు ప్రకారం 3-4 దఫాలుగా వేయండి.',
        'పొలం చుట్టూ గట్లపై కలుపు మొక్కలు లేకుండా శుభ్రంగా ఉంచండి.',
        'సుడిదోమ, అగ్గితెగులును తట్టుకునే నాణ్యమైన విత్తనాలను ఎంచుకోండి.',
        'సాలీళ్ళు మరియు ఇతర మిత్రపురుగులను సంరక్షించేలా సురక్షిత మందులను వాడండి.',
      ];
    } else if (cropLower.includes('మిరప') || cropLower.includes('chilli')) {
      suggestedNextSteps = [
        'ఎకరానికి 20-25 నీలి మరియు పసుపు రంగు జిగురు అట్టలను పైరు ఎత్తులో అమర్చండి.',
        'తామర పురుగులు మరియు ముడత నివారణకు సిఫార్సు చేసిన మందును నిర్ణీత మోతాదులో పిచికారీ చేయండి.',
        'ఆకుల అడుగు భాగం బాగా తడిసేలా ఉదయం 8:00 - 10:30 మధ్య స్ప్రే చేయండి.',
        'తీవ్రంగా ముడుచుకుపోయిన లేదా తెగులు సోకిన కొమ్మలను తీసి నాశనం చేయండి.',
      ];
      preventionPractices = [
        'పొలం చుట్టూ జొన్న లేదా మొక్కజొన్నను 2-3 వరుసలలో సరిహద్దు రక్షణ పంటగా వేయండి.',
        '5% వేప గింజల కషాయం (NSKE) లేదా వేపనూనెను 10 రోజుల వ్యవధిలో ముందుజాగ్రత్తగా పిచికారీ చేయండి.',
        'రసం పీల్చే పురుగులను ఆకర్షించే అధిక నత్రజని ఎరువులను తగ్గించండి.',
        'నేల తేమను కాపాడుతూ వేరు కుళ్లు రాకుండా జాగ్రత్త పడండి.',
      ];
    } else if (cropLower.includes('మామిడి') || cropLower.includes('mango')) {
      suggestedNextSteps = [
        'ఎండిపోయిన, తెగులు సోకిన కొమ్మలను 5 సెం.మీ పచ్చటి భాగం వరకు కత్తిరించి కాల్చివేయండి.',
        'కత్తిరించిన కొమ్మల చివర్లకు 1% బోర్డో పేస్ట్ లేదా కాపర్ ఆక్సీక్లోరైడ్ పేస్ట్ రాయండి.',
        'తోటలో గాలి, సూర్యరశ్మి బాగా తగిలేలా కొమ్మలను పలుచబరచండి.',
        'తేనెమంచు పురుగులు మరియు ఆంథ్రాక్నోస్ నివారణకు సిఫార్సు చేసిన మందును పిచికారీ చేయండి.',
      ];
      preventionPractices = [
        'పంట కోత తర్వాత ఏటా ఎండిన కొమ్మలను కత్తిరించి తోటను శుభ్రంగా ఉంచండి.',
        'పూత రాకముందే తాజా 1% బోర్డో మిశ్రమాన్ని ముందస్తుగా పిచికారీ చేయండి.',
        'తోటలో రాలిన ఎండుటాకులను ఎప్పటికప్పుడు తీసివేసి పరిశుభ్రత పాటించండి.',
        '5% వేప గింజల కషాయాన్ని మొగ్గ దశలో పిచికారీ చేయండి.',
      ];
    } else {
      suggestedNextSteps = [
        'పొలంలో కనీసం 15-20 మొక్కలను నిశితంగా పరిశీలించి తెగులు తీవ్రతను అంచనా వేయండి.',
        'మొక్కల మధ్య గాలి, వెలుతురు ప్రసరించేలా రద్దీగా ఉన్న ఆకులను లేదా బాధిత భాగాలను తొలగించండి.',
        'గాలి వేగం తక్కువగా ఉన్న ఉదయం 8:00 - 10:30 మధ్య మాత్రమే అనుకూలమైన పిచికారీ చేయండి.',
        'లక్షణాలు తీవ్రమైతే సిఫార్సు చేసిన బయో-పెస్టిసైడ్ లేదా సురక్షిత రసాయన మందును నిర్ణీత మోతాదులో వాడండి.',
      ];
      preventionPractices = [
        'ఎకరానికి 10-15 పసుపు/నీలి రంగు జిగురు అట్టలను పంట ఎత్తులో అమర్చండి.',
        '5% వేప గింజల కషాయం (NSKE) లేదా 10,000 ppm వేప నూనెను 10 రోజుల వ్యవధిలో ముందుజాగ్రత్తగా పిచికారీ చేయండి.',
        'పొలం చుట్టూ జొన్న లేదా మొక్కజొన్నను 2-3 వరుసలలో సరిహద్దు పంటగా వేయండి.',
        'అధిక నత్రజని (యూరియా) వాడకాన్ని తగ్గించి సమతుల్య ఎరువులను వాడండి.',
      ];
    }
  } else {
    suggestedNextSteps = [
      'Scout at least 15-20 plants across the field diagonally to evaluate Economic Threshold Level (ETL).',
      'Prune and safely destroy heavily infested shoots/leaves away from the plot.',
      'Time any foliar treatment early morning (8:00 - 10:30 AM) when wind is calm.',
      'Apply biological control or targeted agrochemical strictly at prescribed dosage.',
    ];
    preventionPractices = [
      'Install 10-15 Yellow/Blue sticky traps per acre to trap flying sucking pests.',
      'Apply 5% Neem Seed Kernel Extract (NSKE) or Neem Oil 10,000 ppm as an eco-friendly deterrent.',
      'Plant 2-3 barrier rows of Sorghum or Maize along the farm boundary to block insect drift.',
      'Avoid excessive Nitrogen fertilizer which promotes tender succulent tissue prone to pest surges.',
    ];
  }

  const disclaimer = isTelugu
    ? 'గమనిక: ఇది AI ఆధారిత ప్రాథమిక తెగులు అంచనా మాత్రమే. తీవ్రమైన తెగులు లేదా వ్యాధి వ్యాప్తి ఉన్నప్పుడు రసాయన మందులు పిచికారీ చేసే ముందు మీ మండల వ్యవసాయ విస్తరణ అధికారి (AEO) లేదా శాస్త్రవేత్తను సంప్రదించండి.'
    : 'Note: This is an AI-assisted preliminary assessment and not a guaranteed lab diagnosis. Consult your local agricultural extension officer or certified agronomist before applying large-scale chemical treatments.';

  return {
    matchedAlerts: matched,
    primaryDiagnosis: primaryAlert.pestOrDiseaseName,
    riskLevel,
    symptomsSummary: symptomsSummary.length > 0 ? symptomsSummary : [isTelugu ? 'సాధారణ ఆకు మచ్చలు మరియు పురుగుల లక్షణాలు' : 'General foliar spotting & pest symptoms'],
    suggestedNextSteps,
    preventionPractices,
    alertStatus: primaryAlert.alertStatus,
    disclaimer,
    isDemoData: true,
  };
}
