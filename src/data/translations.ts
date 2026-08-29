import { SupportedLanguage } from '../types';

export interface Translations {
  // Navigation & Brand
  appName: string;
  appSubtitle: string;
  farmEdition: string;
  navDashboard: string;
  navVoice: string;
  navDisease: string;
  navCrops: string;
  navWeather: string;
  navRecommendations: string;
  navSoil?: string;
  navPestAlerts?: string;
  navHistory?: string;
  navRotation?: string;
  aiActive: string;
  languageSelect: string;
  languageSelectPrompt: string;

  // Hero & Dashboard
  greetingFarmer: string;
  heroSubtext: string;
  talkToVoiceAI: string;
  scanLeafPhoto: string;
  quickMetrics: string;
  fieldReadiness: string;
  fieldReadinessOptimal: string;
  soilMoistureStatus: string;
  soilMoistureAdequate: string;
  activeCropSeason: string;
  seasonKharif: string;
  activeAlerts: string;
  noCriticalAlerts: string;
  coreModulesTitle: string;
  coreModulesSubtitle: string;

  // Core Module Cards
  cardVoiceTitle: string;
  cardVoiceBadge: string;
  cardVoiceDesc: string;
  cardVoiceAction: string;

  cardDiseaseTitle: string;
  cardDiseaseBadge: string;
  cardDiseaseDesc: string;
  cardDiseaseAction: string;

  cardCropsTitle: string;
  cardCropsBadge: string;
  cardCropsDesc: string;
  cardCropsAction: string;

  cardWeatherTitle: string;
  cardWeatherBadge: string;
  cardWeatherDesc: string;
  cardWeatherAction: string;

  cardAdvisoryTitle: string;
  cardAdvisoryBadge: string;
  cardAdvisoryDesc: string;
  cardAdvisoryAction: string;

  cardSoilTitle?: string;
  cardSoilBadge?: string;
  cardSoilDesc?: string;
  cardSoilAction?: string;

  cardPestTitle?: string;
  cardPestBadge?: string;
  cardPestDesc?: string;
  cardPestAction?: string;

  cardHistoryTitle?: string;
  cardHistoryBadge?: string;
  cardHistoryDesc?: string;
  cardHistoryAction?: string;

  cardRotationTitle?: string;
  cardRotationBadge?: string;
  cardRotationDesc?: string;
  cardRotationAction?: string;

  // Farm Tasks / Checklist
  farmChecklistTitle: string;
  farmChecklistSubtitle: string;
  completedTasks: string;
  taskPending: string;
  taskCompleted: string;
  addTask: string;
  taskHighPriority: string;
  taskMediumPriority: string;
  taskLowPriority: string;

  // Recent Scans
  recentScansTitle: string;
  recentScansSubtitle: string;
  noScansYet: string;
  viewAllScans: string;
  confidence: string;
  viewDetails: string;

  // Voice Assistant
  voiceAssistantTitle: string;
  voiceAssistantSubtitle: string;
  voiceBadge: string;
  audioOn: string;
  audioMuted: string;
  newChat: string;
  tryAsking: string;
  listeningStatus: string;
  pressAndSpeak: string;
  listeningNow: string;
  typePlaceholder: string;
  aiSpeaking: string;
  stopAudio: string;
  listenAgain: string;
  attachLeafPhoto: string;
  leafPhotoReady: string;
  farmerLabel: string;
  aiLabel: string;
  fullDiagnosisTool: string;
  disclaimerVoice: string;

  // Disease Detection
  diseaseTitle: string;
  diseaseSubtitle: string;
  uploadDropzoneTitle: string;
  uploadDropzoneSubtitle: string;
  useCamera: string;
  orSelectSample: string;
  sampleLeavesTitle: string;
  cropHintLabel: string;
  cropHintPlaceholder: string;
  analyzeButton: string;
  analyzingButton: string;
  stepPreprocessing: string;
  stepFeatureExtraction: string;
  stepPathogenMatching: string;
  stepRemedies: string;
  healthyLeaf: string;
  infectedLeaf: string;
  pathogenType: string;
  severityLabel: string;
  symptomsTitle: string;
  immediateActionsTitle: string;
  organicTreatmentsTitle: string;
  chemicalTreatmentsTitle: string;
  preventionTitle: string;
  preliminaryNotice: string;
  scanAnotherLeaf: string;
  selectImageFirstError: string;
  invalidImageError: string;

  // Crop Information
  cropCatalogTitle: string;
  cropCatalogSubtitle: string;
  searchCropPlaceholder: string;
  allCategories: string;
  catCereals: string;
  catVegetables: string;
  catFruits: string;
  catCashCrops: string;
  catPulses: string;
  catOilseeds: string;
  allSeasons: string;
  growthDuration: string;
  waterRequirement: string;
  soilPh: string;
  optimalTemp: string;
  npkRatio: string;
  harvestIndicators: string;
  viewCropGuide: string;
  diagnoseThisCrop: string;
  cropDetailsTitle: string;
  seedRate: string;
  spacing: string;
  fertilizerSchedule: string;
  commonPests: string;
  commonDiseases: string;
  averageYield: string;
  expertTips: string;
  close: string;

  // Weather & Spray Radar
  weatherTitle: string;
  weatherSubtitle: string;
  selectFarmLocation: string;
  currentConditions: string;
  sprayingFeasibility: string;
  sprayingOptimal: string;
  sprayingCaution: string;
  sprayingPoor: string;
  irrigationAdvisory: string;
  irrigationAdviseIrrigate: string;
  irrigationAdviseHold: string;
  irrigationAdviseNormal: string;
  diseaseRiskTitle: string;
  diseaseRiskLow: string;
  diseaseRiskModerate: string;
  diseaseRiskHigh: string;
  fieldWorkSuitability: string;
  soilTempMoisture: string;
  soilMoistureLabel: string;
  soilTempLabel: string;
  windSpeed: string;
  humidity: string;
  rainChance: string;
  uvIndex: string;
  dewPoint: string;
  hourlyForecast: string;
  sevenDaySprayRadar: string;

  // Smart Recommendations / Advisory
  advisoryTitle: string;
  advisorySubtitle: string;
  wizardTitle: string;
  wizardSubtitle: string;
  step1Crop: string;
  step2Land: string;
  step3Stage: string;
  step4Soil: string;
  selectCropLabel: string;
  landAcreageLabel: string;
  growthStageLabel: string;
  soilTypeLabel: string;
  generatePlanBtn: string;
  generatedPlanTitle: string;
  npkDosagePerAcre: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  applicationSchedule: string;
  organicEnhancers: string;
  irrigationSchedule: string;
  askAgronomistTitle: string;
  askAgronomistSubtitle: string;
  chatPlaceholder: string;
  sendQuestion: string;
  aiThinking: string;

  // Footer
  footerDesc: string;
  quickLinks: string;
  kisanCallCenter: string;
  emergencyHelpline: string;
  tollFree: string;
  copyright: string;
  advisoryDisclaimer: string;

  // Supplementary fields & synonyms
  dropLeafPhoto?: string;
  takePhoto?: string;
  chooseFile?: string;
  optionalCropHint?: string;
  cropPlaceholder?: string;
  analyzingLeaf?: string;
  analyzeCropHealth?: string;
  orTrySampleLeaves?: string;
  diagnosticReport?: string;
  targetCrop?: string;
  assessedCondition?: string;
  pathogen?: string;
  severity?: string;
  symptoms?: string;
  causes?: string;
  recommendedSteps?: string;
  immediateActions?: string;
  organicTreatments?: string;
  chemicalTreatments?: string;
  preventionSteps?: string;
  recoveryTime?: string;
  disclaimerTitle?: string;
  disclaimerBody?: string;
  printSavePdf?: string;
  readyToInspect?: string;
  step1GuideTitle?: string;
  step1GuideDesc?: string;
  step2GuideTitle?: string;
  step2GuideDesc?: string;
  step3GuideTitle?: string;
  step3GuideDesc?: string;
  savedLocally?: string;
  rainProbability?: string;
  soilMoisture?: string;
  soilTemp?: string;
  evapotranspiration?: string;
  fieldSuitabilityTitle?: string;
  foliarSpray?: string;
  irrigationAdvice?: string;
  diseaseRiskRadar?: string;
  fieldWork?: string;
  sevenDayForecast?: string;
  customPlanWizard?: string;
  selectCrop?: string;
  growthStage?: string;
  soilType?: string;
  landSize?: string;
  farmingMode?: string;
  askAiExpert?: string;
  askQuestionPlaceholder?: string;
  sendMessage?: string;
  step1Title?: string;
  cropDuration?: string;
  growthSeason?: string;
  waterNeeds?: string;
  cropYield?: string;
  marketPrice?: string;
  [key: string]: string | undefined;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  Telugu: {
    // Navigation & Brand
    appName: 'అగ్రిపల్స్',
    appSubtitle: 'స్మార్ట్ వ్యవసాయ యాజమాన్యం & పంట సంరక్షణ',
    farmEdition: 'రైతు సంచిక',
    navDashboard: 'డ్యాష్‌బోర్డ్',
    navVoice: 'వాయిస్ అసిస్టెంట్',
    navDisease: 'పంట వ్యాధుల గుర్తింపు',
    navCrops: 'పంటల మార్గదర్శిని',
    navWeather: 'వాతావరణం & పిచికారీ',
    navRecommendations: 'వ్యవసాయ సలహాలు',
    navSoil: 'నేల ఆరోగ్య విశ్లేషణ',
    navPestAlerts: 'తెగుళ్ల హెచ్చరికలు',
    navHistory: 'వ్యవసాయ చరిత్ర',
    navRotation: 'పంట మార్పిడి',
    aiActive: 'AI సిద్ధంగా ఉంది',
    languageSelect: 'భాషను ఎంచుకోండి',
    languageSelectPrompt: 'మీకు అనుకూలమైన భాషను ఎంచుకోండి',

    // Hero & Dashboard
    greetingFarmer: 'శుభోదయం, రైతు సోదరా',
    heroSubtext: 'మీ స్మార్ట్ AI వ్యవసాయ సహాయకురాలు సిద్ధంగా ఉంది. మీ భాషలోనే మాట్లాడండి, పంట తెగుళ్లను గుర్తించండి, పిచికారీకి అనుకూల సమయాలను తెలుసుకోండి మరియు సరైన ఎరువుల ప్రణాళికను పొందండి.',
    talkToVoiceAI: 'వాయిస్ అసిస్టెంట్‌తో మాట్లాడండి',
    scanLeafPhoto: 'ఆకు ఫోటో స్కాన్ చేయండి',
    quickMetrics: 'ముఖ్యమైన క్షేత్ర సమాచారం',
    fieldReadiness: 'పొలం పనికి అనుకూలత',
    fieldReadinessOptimal: 'చాలా అనుకూలం',
    soilMoistureStatus: 'నేలలో తేమ శాతం',
    soilMoistureAdequate: 'సరిపడా తేమ (68%)',
    activeCropSeason: 'ప్రస్తుత పంట కాలం',
    seasonKharif: 'ఖరీఫ్ / వేసవి పంటలు',
    activeAlerts: 'వాతావరణ హెచ్చరికలు',
    noCriticalAlerts: 'ప్రమాదకర హెచ్చరికలు లేవు',
    coreModulesTitle: 'ప్రధాన వ్యవసాయ విభాగాలు',
    coreModulesSubtitle: 'వాయిస్ సంభాషణ, పంట వ్యాధుల గుర్తింపు, వాతావరణం మరియు ప్రణాళికా విభాగాలు',

    // Core Module Cards
    cardVoiceTitle: 'వాయిస్ అసిస్టెంట్',
    cardVoiceBadge: 'బహుభాషా AI వాయిస్',
    cardVoiceDesc: 'తెలుగులో సహజంగా మాట్లాడండి. ఆకులపై మచ్చలు, ఎరువులు లేదా వాతావరణం గురించి అడగండి.',
    cardVoiceAction: 'మాట్లాడటం ప్రారంభించండి',

    cardDiseaseTitle: 'పంట వ్యాధుల గుర్తింపు',
    cardDiseaseBadge: 'AI డాక్టర్',
    cardDiseaseDesc: 'బాధిత ఆకు ఫోటో తీయండి. సిలీంద్ర, బ్యాక్టీరియా మరియు వైరస్ తెగుళ్లను గుర్తించి సహజ నివారణలను సూచిస్తుంది.',
    cardDiseaseAction: 'ఆకును స్కాన్ చేయండి',

    cardCropsTitle: 'పంటల సమాచారం',
    cardCropsBadge: 'సాగు మార్గదర్శిని',
    cardCropsDesc: 'వివిధ పంటల సాగు పద్ధతులు, NPK ఎరువుల మోతాదు, నేల pH మరియు దిగుబడి వివరాలు తెలుసుకోండి.',
    cardCropsAction: 'పంటల జాబితా చూడండి',

    cardWeatherTitle: 'వాతావరణం & పిచికారీ',
    cardWeatherBadge: 'వాతావరణ రాడార్',
    cardWeatherDesc: '7 రోజుల వ్యవసాయ వాతావరణం, మందుల పిచికారీకి అనుకూల వేళలు, వర్ష సూచన మరియు తెగుళ్ల ప్రమాదం.',
    cardWeatherAction: 'వాతావరణం చూడండి',

    cardAdvisoryTitle: 'వ్యవసాయ సలహాలు',
    cardAdvisoryBadge: 'స్మార్ట్ ప్లానర్',
    cardAdvisoryDesc: 'మీ పంట మరియు విస్తీర్ణానికి తగిన ఎరువుల మోతాదు, నీటి పారుదల మరియు AI వ్యవసాయ నిపుణునితో చర్చించండి.',
    cardAdvisoryAction: 'ప్రణాళికను పొందండి',

    cardSoilTitle: 'నేల ఆరోగ్య విశ్లేషణ',
    cardSoilBadge: 'సాయిల్ హెల్త్ కార్డ్',
    cardSoilDesc: 'నేల రకం, pH, NPK పోషకాలు మరియు తేమను విశ్లేషించి ఆరోగ్య స్థితి (ఆకుపచ్చ/పసుపు/ఎరుపు) మరియు తగిన పంటలను తెలుసుకోండి.',
    cardSoilAction: 'నేల పరీక్ష చేయండి',

    cardPestTitle: 'తెగులు & వ్యాధి హెచ్చరికలు',
    cardPestBadge: 'నిఘా రాడార్',
    cardPestDesc: 'పంట లక్షణాల ఆధారంగా తెగుళ్ల ముందస్తు ప్రమాద స్థాయిని అంచనా వేసి తక్షణ నివారణ చర్యలను చేపట్టండి.',
    cardPestAction: 'హెచ్చరికలు చూడండి',

    cardHistoryTitle: 'వ్యవసాయ చరిత్ర విశ్లేషణ',
    cardHistoryBadge: 'క్షేత్ర నిఘా',
    cardHistoryDesc: 'గత పంటల దిగుబడులు, ఎదురైన తెగుళ్లు, నీటి పారుదల మరియు నేల పరిశీలనలను నమోదు చేసి పోకడలను తెలుసుకోండి.',
    cardHistoryAction: 'కాలక్రమం చూడండి',

    cardRotationTitle: 'స్మార్ట్ పంట మార్పిడి ప్రణాళిక',
    cardRotationBadge: 'శాస్త్రీయ సాగు',
    cardRotationDesc: 'నేల సారాన్ని పునరుద్ధరించడానికి, తెగుళ్ల చక్రాన్ని తెంచడానికి 3-సీజన్ల పంట మార్పిడి ప్రణాళికను రూపొందించండి.',
    cardRotationAction: 'మార్పిడి ప్రణాళిక',

    // Farm Tasks / Checklist
    farmChecklistTitle: 'నేటి పొలం పనుల జాబితా',
    farmChecklistSubtitle: 'మీ రోజువారీ క్షేత్ర పర్యవేక్షణ మరియు ముఖ్యమైన పనులు',
    completedTasks: 'పూర్తయిన పనులు',
    taskPending: 'చేయవలసిన పని',
    taskCompleted: 'పూర్తయింది',
    addTask: 'కొత్త పనిని చేర్చండి',
    taskHighPriority: 'అత్యవసరం',
    taskMediumPriority: 'మధ్యస్థం',
    taskLowPriority: 'సాధారణం',

    // Recent Scans
    recentScansTitle: 'ఇటీవల చేసిన వ్యాధి పరీక్షలు',
    recentScansSubtitle: 'మీరు స్కాన్ చేసిన ఆకుల చరిత్ర మరియు ఫలితాలు',
    noScansYet: 'ఇంతవరకు ఎలాంటి స్కాన్లు చేయలేదు',
    viewAllScans: 'అన్ని స్కాన్లు చూడండి',
    confidence: 'ఖచ్చితత్వం',
    viewDetails: 'పూర్తి వివరాలు',

    // Voice Assistant
    voiceAssistantTitle: 'కిసాన్ వాయిస్ అసిస్టెంట్',
    voiceAssistantSubtitle: '7 భారతీయ భాషల్లో రైతులకు స్నేహపూర్వక వాయిస్ సహాయకురాలు',
    voiceBadge: 'స్త్రీ AI వాయిస్',
    audioOn: 'ఆడియో ఆన్',
    audioMuted: 'మ్యూట్ చేయబడింది',
    newChat: 'కొత్త సంభాషణ',
    tryAsking: 'ఇలా అడగండి:',
    listeningStatus: 'మీ మాటలను వింటోంది...',
    pressAndSpeak: 'మైక్ నొక్కి మాట్లాడండి',
    listeningNow: 'వింటోంది...',
    typePlaceholder: 'మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి...',
    aiSpeaking: 'AI సమాధానం చెబుతోంది...',
    stopAudio: 'ఆడియో ఆపండి',
    listenAgain: 'వినండి',
    attachLeafPhoto: 'ఆకు ఫోటో జతచేయండి',
    leafPhotoReady: 'ఆకు ఫోటో జతచేయబడింది',
    farmerLabel: 'రైతు',
    aiLabel: 'అగ్రిపల్స్ AI అసిస్టెంట్',
    fullDiagnosisTool: 'పూర్తి వ్యాధి గుర్తింపు సాధనం',
    disclaimerVoice: 'ప్రాథమిక వ్యవసాయ సలహా: ఇది AI ఆధారిత ప్రాథమిక అంచనా. అధిక రసాయన మందుల వాడకానికి ముందు స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.',

    // Disease Detection
    diseaseTitle: 'AI పంట వ్యాధుల గుర్తింపు',
    diseaseSubtitle: 'బాధిత ఆకు లేదా పంట ఫోటోను అప్‌లోడ్ చేసి తక్షణ ప్రాథమిక విశ్లేషణ పొందండి',
    uploadDropzoneTitle: 'ఆకు చిత్రాన్ని ఇక్కడ లాగండి లేదా అప్‌లోడ్ చేయండి',
    uploadDropzoneSubtitle: 'స్పష్టమైన ఆకు ఫోటోను ఎంచుకోండి (JPEG, PNG, WebP)',
    useCamera: 'కెమెరాతో ఫోటో తీయండి',
    orSelectSample: 'లేదా ఈ క్రింది నమూనా ఆకులను పరీక్షించండి:',
    sampleLeavesTitle: 'పరీక్షించడానికి నమూనా ఆకులు',
    cropHintLabel: 'పంట పేరు (ఐచ్ఛికం)',
    cropHintPlaceholder: 'ఉదాహరణ: టమాటా, వరి, పత్తి, మిరప...',
    analyzeButton: 'ఆకును విశ్లేషించండి',
    analyzingButton: 'AI విశ్లేషిస్తోంది...',
    stepPreprocessing: 'చిత్ర నాణ్యతను తనిఖీ చేస్తోంది...',
    stepFeatureExtraction: 'ఆకు లక్షణాలు మరియు మచ్చలను గుర్తిస్తోంది...',
    stepPathogenMatching: 'సిలీంద్ర, బ్యాక్టీరియా నమూనాలతో సరిపోలుస్తోంది...',
    stepRemedies: 'సహజ మరియు రసాయన నివారణలను సిద్ధం చేస్తోంది...',
    healthyLeaf: 'ఆరోగ్యకరమైన ఆకు',
    infectedLeaf: 'తెగులు సోకిన ఆకు',
    pathogenType: 'రోగ కారకం రకం',
    severityLabel: 'తీవ్రత స్థాయి',
    symptomsTitle: 'ప్రధాన వ్యాధి లక్షణాలు',
    immediateActionsTitle: 'తక్షణమే చేయవలసిన పనులు',
    organicTreatmentsTitle: 'సేంద్రీయ / దేశవాళీ నివారణలు',
    chemicalTreatmentsTitle: 'రసాయన నియంత్రణ చర్యలు',
    preventionTitle: 'భవిష్యత్తు నివారణ జాగ్రత్తలు',
    preliminaryNotice: 'గమనిక: ఇది AI ఆధారిత ప్రాథమిక అంచనా మాత్రమే. భారీ మందుల వాడకానికి ముందు వ్యవసాయ క్షేత్ర అధికారిని సంప్రదించండి.',
    scanAnotherLeaf: 'మరొక ఆకును పరీక్షించండి',
    selectImageFirstError: 'దయచేసి ముందుగా ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి లేదా నమూనాను ఎంచుకోండి.',
    invalidImageError: 'దయచేసి సరైన చిత్ర ఫైల్‌ను ఎంచుకోండి (JPEG, PNG లేదా WebP).',

    // Crop Information
    cropCatalogTitle: 'పంటల సమగ్ర సమాచార మార్గదర్శిని',
    cropCatalogSubtitle: 'వివిధ పంటల సాగు అవసరాలు, ఎరువుల నిర్వహణ మరియు దిగుబడి సూచనలు',
    searchCropPlaceholder: 'పంట పేరుతో వెతకండి (ఉదా: వరి, టమాటా, మిరప)...',
    allCategories: 'అన్ని రకాలు',
    catCereals: 'ధాన్యాలు',
    catVegetables: 'కూరగాయలు',
    catFruits: 'పండ్లు',
    catCashCrops: 'వాణిజ్య పంటలు',
    catPulses: 'పప్పుదినుసులు',
    catOilseeds: 'నూనెగింజలు',
    allSeasons: 'అన్ని కాలాలు',
    growthDuration: 'పంట కాలం',
    waterRequirement: 'నీటి అవసరం',
    soilPh: 'నేల pH',
    optimalTemp: 'అనుకూల ఉష్ణోగ్రత',
    npkRatio: 'NPK ఎరువుల నిష్పత్తి',
    harvestIndicators: 'కోతకు వచ్చిన లక్షణాలు',
    viewCropGuide: 'పూర్తి సాగు వివరాలు',
    diagnoseThisCrop: 'ఈ పంటను స్కాన్ చేయండి',
    cropDetailsTitle: 'పంట సమగ్ర సమాచారం',
    seedRate: 'విత్తన మోతాదు',
    spacing: 'మొక్కల మధ్య దూరం',
    fertilizerSchedule: 'ఎరువుల వేసే సమయాలు',
    commonPests: 'ప్రధాన పురుగులు / కీటకాలు',
    commonDiseases: 'తరచుగా వచ్చే తెగుళ్లు',
    averageYield: 'సగటు దిగుబడి',
    expertTips: 'రైతులకు నిపుణుల సలహాలు',
    close: 'మూసివేయండి',

    // Weather & Spray Radar
    weatherTitle: 'వ్యవసాయ వాతావరణం & పిచికారీ రాడార్',
    weatherSubtitle: 'సూక్ష్మ వాతావరణం, పిచికారీ అనుకూల వేళలు మరియు నేలలో తేమ స్థాయిలు',
    selectFarmLocation: 'ప్రాంతాన్ని ఎంచుకోండి',
    currentConditions: 'ప్రస్తుత వాతావరణం',
    sprayingFeasibility: 'మందుల పిచికారీ అనుకూలత',
    sprayingOptimal: 'పిచికారీకి చాలా అనుకూలం',
    sprayingCaution: 'జాగ్రత్త అవసరం - మితమైన అనుకూలత',
    sprayingPoor: 'పిచికారీ చేయవద్దు - అనుకూలంగా లేదు',
    irrigationAdvisory: 'నీటి పారుదల సలహా',
    irrigationAdviseIrrigate: 'ఈ రోజు నీరు పెట్టండి',
    irrigationAdviseHold: 'నీరు పెట్టడం ఆపండి (వర్ష సూచన)',
    irrigationAdviseNormal: 'సాధారణ పద్ధతిని కొనసాగించండి',
    diseaseRiskTitle: 'తెగుళ్ల వ్యాప్తి ప్రమాదం',
    diseaseRiskLow: 'తక్కువ ప్రమాదం',
    diseaseRiskModerate: 'మధ్యస్థ సిలీంద్ర ప్రమాదం',
    diseaseRiskHigh: 'అధిక సిలీంద్ర & పురుగుల ప్రమాదం',
    fieldWorkSuitability: 'పొలం పనుల అనుకూలత',
    soilTempMoisture: 'నేల ఉష్ణోగ్రత & తేమ',
    soilMoistureLabel: 'నేల తేమ',
    soilTempLabel: 'నేల ఉష్ణోగ్రత',
    windSpeed: 'గాలి వేగం',
    humidity: 'గాలిలో తేమ',
    rainChance: 'వర్ష సంభావ్యత',
    uvIndex: 'UV సూచిక',
    dewPoint: 'మంచు బిందువు',
    hourlyForecast: 'గంటల వారీ సూచన',
    sevenDaySprayRadar: '7 రోజుల పిచికారీ ప్రణాళిక రాడార్',

    // Smart Recommendations / Advisory
    advisoryTitle: 'స్మార్ట్ వ్యవసాయ సలహాదారు',
    advisorySubtitle: 'మీ పంట, నేల రకం మరియు విస్తీర్ణానికి అనుగుణంగా ఎరువులు & నీటి ప్రణాళిక',
    wizardTitle: 'వ్యక్తిగత ఎరువుల ప్రణాళికను తయారు చేసుకోండి',
    wizardSubtitle: 'మీ పంట వివరాలను నమోదు చేసి తగిన ఎరువుల లెక్కలను పొందండి',
    step1Crop: 'పంటను ఎంచుకోండి',
    step2Land: 'భూమి విస్తీర్ణం',
    step3Stage: 'పంట దశ',
    step4Soil: 'నేల రకం',
    selectCropLabel: 'పంట',
    landAcreageLabel: 'విస్తీర్ణం (ఎకరాలు)',
    growthStageLabel: 'ప్రస్తుత పంట పెరుగుదల దశ',
    soilTypeLabel: 'నేల స్వభావం',
    generatePlanBtn: 'ఎరువుల ప్రణాళికను రూపొందించండి',
    generatedPlanTitle: 'సిఫార్సు చేయబడిన ఎరువుల ప్రణాళిక',
    npkDosagePerAcre: 'ఎకరాకు అవసరమైన NPK మోతాదు',
    nitrogen: 'నత్రజని (N)',
    phosphorus: 'భాస్వరం (P)',
    potassium: 'పొటాష్ (K)',
    applicationSchedule: 'ఎరువులు వేసే పద్ధతి',
    organicEnhancers: 'సేంద్రీయ పోషకాలు & జీవ ఎరువులు',
    irrigationSchedule: 'నీటి తడుల ప్రణాళిక',
    askAgronomistTitle: 'వ్యవసాయ నిపుణునితో మాట్లాడండి',
    askAgronomistSubtitle: 'పంట సమస్యలు, ఎరువుల మోతాదు లేదా చీడపీడల గురించి అడగండి',
    chatPlaceholder: 'మీ ప్రశ్నను ఇక్కడ రాయండి (ఉదా: టమాటాలో పూత రాలకుండా ఏం చేయాలి?)...',
    sendQuestion: 'సలహా అడగండి',
    aiThinking: 'వ్యవసాయ నిపుణురాలు ఆలోచిస్తోంది...',

    // Footer
    footerDesc: 'రైతులకు బహుభాషా వాయిస్ సంభాషణ, తక్షణ AI ఆకు వ్యాధుల గుర్తింపు, ఖచ్చితమైన వాతావరణ పిచికారీ వేళలు మరియు వ్యవసాయ సలహాలను అందించే వేదిక.',
    quickLinks: 'ముఖ్యమైన లింకులు',
    kisanCallCenter: 'కిసాన్ కాల్ సెంటర్ (ఉచితం)',
    emergencyHelpline: 'వ్యవసాయ అత్యవసర సహాయం',
    tollFree: 'టోల్ ఫ్రీ: 1800-180-1551',
    copyright: '© 2026 అగ్రిపల్స్ AI. భారతీయ రైతుల సంక్షేమం కోసం అంకితం.',
    advisoryDisclaimer: 'ముఖ్య గమనిక: అగ్రిపల్స్ AI అందించే సమాచారం ప్రాథమిక వ్యవసాయ సలహా మాత్రమే. రసాయన మందుల వాడకానికి ముందు స్థానిక వ్యవసాయ విస్తరణ అధికారిని లేదా కృషి విజ్ఞాన కేంద్రాన్ని (KVK) సంప్రదించండి.',

    // Supplementary
    dropLeafPhoto: 'ఆకు ఫోటోను ఇక్కడ ఉంచండి లేదా ఎంచుకోండి',
    takePhoto: 'కెమెరా తెరవండి',
    chooseFile: 'ఫైల్ ఎంచుకోండి',
    optionalCropHint: 'పంట పేరు (ఐచ్ఛికం)',
    cropPlaceholder: 'ఉదా. టమాటా, వరి, మిరప, వేరుశనగ...',
    analyzingLeaf: 'ఆకు ఆరోగ్యాన్ని విశ్లేషిస్తున్నాం...',
    analyzeCropHealth: 'పంట ఆరోగ్యాన్ని విశ్లేషించండి',
    orTrySampleLeaves: 'లేదా ఈ నమూనా ఆకులను పరీక్షించండి:',
    diagnosticReport: 'పంట వ్యాధి నిర్ధారణ నివేదిక',
    targetCrop: 'పంట',
    assessedCondition: 'గుర్తించిన వ్యాధి పరిస్థితి',
    pathogen: 'రోగకారకం',
    severity: 'తీవ్రత',
    symptoms: 'గమనించిన వ్యాధి లక్షణాలు',
    causes: 'వ్యాధి రావడానికి గల కారణాలు',
    recommendedSteps: 'సిఫార్సు చేయబడిన నివారణ చర్యలు',
    immediateActions: 'తక్షణమే చేపట్టాల్సిన చర్యలు',
    organicTreatments: 'సేంద్రీయ & జీవ నియంత్రణ పద్ధతులు',
    chemicalTreatments: 'రసాయన మందుల పిచికారీ',
    preventionSteps: 'భవిష్యత్తులో రాకుండా నివారణ చర్యలు',
    recoveryTime: 'కోలుకోవడానికి పట్టే సమయం',
    disclaimerTitle: 'రైతు సోదరులకు ముఖ్య గమనిక',
    disclaimerBody: 'ఈ నివేదిక AI ఆధారిత ప్రాథమిక సూచన మాత్రమే. తీవ్రమైన తెగుళ్ల నివారణకు స్థానిక వ్యవసాయ విస్తరణ అధికారిని లేదా KVK శాస్త్రవేత్తలను సంప్రదించండి.',
    printSavePdf: 'రిపోర్ట్ ప్రింట్ / PDF తీసుకోండి',
    readyToInspect: 'మీ పంట ఆరోగ్యాన్ని క్షణాల్లో తనిఖీ చేయండి',
    step1GuideTitle: '1. ఆకు ఫోటో తీయండి',
    step1GuideDesc: 'మచ్చలు లేదా తెగులు ఉన్న ఆకును మంచి వెలుతురులో ఫోటో తీయండి.',
    step2GuideTitle: '2. AI స్కాన్ చేయండి',
    step2GuideDesc: 'మా AI అల్గోరిథం వ్యాధి రకాన్ని మరియు తీవ్రతను క్షణాల్లో లెక్కిస్తుంది.',
    step3GuideTitle: '3. సరైన మందులు వాడండి',
    step3GuideDesc: 'సేంద్రీయ మరియు రసాయన నివారణ మందుల మోతాదులను తెలుసుకోండి.',
    savedLocally: 'మీ పరికరంలో భద్రపరచబడింది',
    rainProbability: 'వర్ష సంభావ్యత',
    soilMoisture: 'నేల తేమ శాతం',
    soilTemp: 'నేల ఉష్ణోగ్రత',
    evapotranspiration: 'బాష్పోత్సేకం',
    fieldSuitabilityTitle: 'వ్యవసాయ పనుల అనుకూలత సూచికలు',
    foliarSpray: 'పిచికారీ అనుకూలత',
    irrigationAdvice: 'నీటి పారుదల సలహా',
    diseaseRiskRadar: 'తెగుళ్ల ముప్పు రాడార్',
    fieldWork: 'పొలం పనులు & దుక్కి',
    sevenDayForecast: '7 రోజుల వ్యవసాయ వాతావరణ అంచనా',
    customPlanWizard: 'వ్యక్తిగత వ్యవసాయ కార్యాచరణ ప్రణాళిక',
    selectCrop: 'పంటను ఎంచుకోండి',
    growthStage: 'ప్రస్తుత పంట దశ',
    soilType: 'నేల రకం',
    landSize: 'భూమి విస్తీర్ణం',
    farmingMode: 'వ్యవసాయ పద్ధతి',
    askAiExpert: 'అగ్రిపల్స్ AI నిపుణుడిని అడగండి',
    askQuestionPlaceholder: 'ఎరువులు, తెగుళ్లు, నీటి యాజమాన్యం గురించి అడగండి...',
    sendMessage: 'సందేశం పంపండి',
    step1Title: 'దశ 1: ఆకు ఫోటోను అప్‌లోడ్ చేయండి',
    cropDuration: 'పంట కాలం',
    growthSeason: 'సాగు కాలం',
    waterNeeds: 'నీటి అవసరం',
    cropYield: 'సగటు దిగుబడి',
    marketPrice: 'మార్కెట్ ధర',
  },

  English: {
    appName: 'AgriPulse',
    appSubtitle: 'Smart Farm Management & Diagnostics',
    farmEdition: 'Farm Edition',
    navDashboard: 'Dashboard',
    navVoice: 'Voice Assistant',
    navDisease: 'Disease Detection',
    navCrops: 'Crop Guide',
    navWeather: 'Weather & Spray',
    navRecommendations: 'Smart Advisory',
    navSoil: 'Soil Health',
    navPestAlerts: 'Pest Alerts',
    navHistory: 'Farm History',
    navRotation: 'Crop Rotation',
    aiActive: 'AI Active',
    languageSelect: 'Select Language',
    languageSelectPrompt: 'Choose your preferred language',

    greetingFarmer: 'Good day, Farmer',
    heroSubtext: 'Your conversational AI agronomist is ready. Speak naturally, scan crop leaves for instant disease diagnosis, monitor spray feasibility, and generate customized fertilizer plans.',
    talkToVoiceAI: 'Talk to Voice Assistant',
    scanLeafPhoto: 'Scan Crop Leaf',
    quickMetrics: 'Key Field Insights',
    fieldReadiness: 'Field Work Suitability',
    fieldReadinessOptimal: 'Optimal for Tillage',
    soilMoistureStatus: 'Root-Zone Moisture',
    soilMoistureAdequate: 'Adequate Moisture (68%)',
    activeCropSeason: 'Active Season',
    seasonKharif: 'Kharif / Summer Crops',
    activeAlerts: 'Weather Alerts',
    noCriticalAlerts: 'No Critical Field Hazards',
    coreModulesTitle: 'Core Agriculture Modules',
    coreModulesSubtitle: 'Voice assistant, disease diagnostics, weather radar, and farm planning',

    cardVoiceTitle: 'Voice Assistant',
    cardVoiceBadge: 'Multilingual Voice AI',
    cardVoiceDesc: 'Talk naturally in your mother tongue. Ask about leaf spots, fertilizer doses, or weather.',
    cardVoiceAction: 'Start Speaking',

    cardDiseaseTitle: 'Crop Disease Detection',
    cardDiseaseBadge: 'AI Doctor',
    cardDiseaseDesc: 'Upload a leaf photo. Detects fungal, bacterial, and viral diseases with organic remedies.',
    cardDiseaseAction: 'Scan Leaf Now',

    cardCropsTitle: 'Crop Information',
    cardCropsBadge: 'Agronomic Guide',
    cardCropsDesc: 'Explore growing requirements, optimal NPK ratios, soil pH, and yield estimates.',
    cardCropsAction: 'Browse Catalog',

    cardWeatherTitle: 'Weather & Spray',
    cardWeatherBadge: 'Spray Radar',
    cardWeatherDesc: '7-day agricultural forecasts, optimal spray windows, rain probability, and disease risk.',
    cardWeatherAction: 'Check Forecast',

    cardAdvisoryTitle: 'Farm Advisory',
    cardAdvisoryBadge: 'Smart Planner',
    cardAdvisoryDesc: 'Calculate stage-specific fertilizer doses, irrigation schedules, and chat with the agronomist.',
    cardAdvisoryAction: 'Get Custom Plan',

    cardSoilTitle: 'Soil Health Analysis',
    cardSoilBadge: 'Soil Health Card',
    cardSoilDesc: 'Analyze soil pH, NPK nutrients, moisture, and organic matter to determine condition (Healthy/Needs Attention/Poor) and suitable crops.',
    cardSoilAction: 'Analyze Soil Health',

    cardPestTitle: 'Pest & Disease Alerts',
    cardPestBadge: 'Early Radar',
    cardPestDesc: 'Match observed crop symptoms with early warning risks, regional advisories, and immediate containment measures.',
    cardPestAction: 'View Pest Alerts',

    cardHistoryTitle: 'Historical Farm Analysis',
    cardHistoryBadge: 'Longitudinal Log',
    cardHistoryDesc: 'Track multi-season crop performance, recurring pests, irrigation methods, and soil observations over time.',
    cardHistoryAction: 'Explore Timeline',

    cardRotationTitle: 'Smart Crop Rotation Planner',
    cardRotationBadge: 'Succession AI',
    cardRotationDesc: 'Generate a 3-season crop rotation plan to revitalize soil nutrients, break pest cycles, and stabilize long-term yield.',
    cardRotationAction: 'Plan 3 Seasons',

    farmChecklistTitle: 'Daily Farm Checklist',
    farmChecklistSubtitle: 'Scouting routines, moisture checks, and crop care actions',
    completedTasks: 'Completed Tasks',
    taskPending: 'Pending',
    taskCompleted: 'Completed',
    addTask: 'Add Farm Task',
    taskHighPriority: 'High',
    taskMediumPriority: 'Medium',
    taskLowPriority: 'Low',

    recentScansTitle: 'Recent Diagnostic Scans',
    recentScansSubtitle: 'History of evaluated crop leaves and preliminary findings',
    noScansYet: 'No leaf scans recorded yet',
    viewAllScans: 'View All Scans',
    confidence: 'Confidence',
    viewDetails: 'View Details',

    voiceAssistantTitle: 'Kisan Voice Agronomist',
    voiceAssistantSubtitle: 'Conversational farming assistant in 7 Indian languages',
    voiceBadge: 'Female Voice AI',
    audioOn: 'Audio ON',
    audioMuted: 'Muted',
    newChat: 'New Chat',
    tryAsking: 'Try asking:',
    listeningStatus: 'Listening to your voice...',
    pressAndSpeak: 'Press & Speak',
    listeningNow: 'Listening...',
    typePlaceholder: 'Type your question here...',
    aiSpeaking: 'AI Speaking...',
    stopAudio: 'Stop Audio',
    listenAgain: 'Listen',
    attachLeafPhoto: 'Attach Leaf Photo',
    leafPhotoReady: 'Leaf photo attached',
    farmerLabel: 'Farmer',
    aiLabel: 'AgriPulse AI Assistant',
    fullDiagnosisTool: 'Full Disease Diagnosis Tool',
    disclaimerVoice: 'Preliminary Agronomic Advisory: AgriPulse provides AI-assisted assessments. Consult a local extension officer before major chemical applications.',

    diseaseTitle: 'AI Crop Disease Detection',
    diseaseSubtitle: 'Upload or capture a leaf photo for instant preliminary pathology analysis',
    uploadDropzoneTitle: 'Drag & Drop leaf photo or click to browse',
    uploadDropzoneSubtitle: 'Supports high-resolution JPEG, PNG, or WebP images',
    useCamera: 'Use Camera',
    orSelectSample: 'Or test with a sample diseased leaf:',
    sampleLeavesTitle: 'Sample Diseased Leaves for Testing',
    cropHintLabel: 'Crop Name (Optional)',
    cropHintPlaceholder: 'e.g. Tomato, Rice, Cotton, Chilli...',
    analyzeButton: 'Analyze Leaf Photo',
    analyzingButton: 'AI is Analyzing...',
    stepPreprocessing: 'Checking image clarity...',
    stepFeatureExtraction: 'Extracting leaf patterns and lesions...',
    stepPathogenMatching: 'Matching fungal & bacterial symptoms...',
    stepRemedies: 'Formulating organic and chemical controls...',
    healthyLeaf: 'Healthy Foliage',
    infectedLeaf: 'Pathology Detected',
    pathogenType: 'Pathogen Type',
    severityLabel: 'Severity Level',
    symptomsTitle: 'Primary Symptoms',
    immediateActionsTitle: 'Immediate Actions',
    organicTreatmentsTitle: 'Organic & Bio-Control Remedies',
    chemicalTreatmentsTitle: 'Chemical Control (Use with Caution)',
    preventionTitle: 'Preventive Measures',
    preliminaryNotice: 'Notice: This is an AI-assisted preliminary assessment. Confirm with an agricultural extension officer before chemical treatment.',
    scanAnotherLeaf: 'Scan Another Leaf',
    selectImageFirstError: 'Please upload a leaf image or select a sample first.',
    invalidImageError: 'Please select a valid image file (JPEG, PNG, or WebP).',

    cropCatalogTitle: 'Comprehensive Crop Encyclopedia',
    cropCatalogSubtitle: 'Growing requirements, stage-by-stage nutrition, and harvest indicators',
    searchCropPlaceholder: 'Search crop (e.g. Rice, Tomato, Cotton)...',
    allCategories: 'All Categories',
    catCereals: 'Cereals',
    catVegetables: 'Vegetables',
    catFruits: 'Fruits',
    catCashCrops: 'Cash Crops',
    catPulses: 'Pulses & Legumes',
    catOilseeds: 'Oilseeds',
    allSeasons: 'All Seasons',
    growthDuration: 'Growth Duration',
    waterRequirement: 'Water Requirement',
    soilPh: 'Soil pH',
    optimalTemp: 'Optimal Temperature',
    npkRatio: 'NPK Ratio',
    harvestIndicators: 'Harvest Indicators',
    viewCropGuide: 'View Full Guide',
    diagnoseThisCrop: 'Diagnose This Crop',
    cropDetailsTitle: 'Crop Cultivation Details',
    seedRate: 'Seed Rate',
    spacing: 'Plant Spacing',
    fertilizerSchedule: 'Fertilizer Timing',
    commonPests: 'Common Pests',
    commonDiseases: 'Common Diseases',
    averageYield: 'Average Yield',
    expertTips: 'Agronomist Tips',
    close: 'Close',

    weatherTitle: 'Agricultural Weather & Spray Radar',
    weatherSubtitle: 'Micro-climate monitoring, spray feasibility windows, and soil metrics',
    selectFarmLocation: 'Select Farm Location',
    currentConditions: 'Current Conditions',
    sprayingFeasibility: 'Spraying Feasibility',
    sprayingOptimal: 'Optimal for Spraying',
    sprayingCaution: 'Caution - Moderate Conditions',
    sprayingPoor: 'Poor - Avoid Spraying',
    irrigationAdvisory: 'Irrigation Advisory',
    irrigationAdviseIrrigate: 'Irrigate Today',
    irrigationAdviseHold: 'Hold Irrigation (Rain Expected)',
    irrigationAdviseNormal: 'Normal Routine',
    diseaseRiskTitle: 'Fungal Disease Risk',
    diseaseRiskLow: 'Low Risk',
    diseaseRiskModerate: 'Moderate Fungal Risk',
    diseaseRiskHigh: 'High Fungal & Pest Risk',
    fieldWorkSuitability: 'Field Work Suitability',
    soilTempMoisture: 'Soil Temperature & Moisture',
    soilMoistureLabel: 'Soil Moisture',
    soilTempLabel: 'Soil Temperature',
    windSpeed: 'Wind Speed',
    humidity: 'Humidity',
    rainChance: 'Rain Chance',
    uvIndex: 'UV Index',
    dewPoint: 'Dew Point',
    hourlyForecast: 'Hourly Forecast',
    sevenDaySprayRadar: '7-Day Agricultural Spray Radar',

    advisoryTitle: 'Smart Farm Advisory',
    advisorySubtitle: 'Customized stage-specific nutrient dosage and agronomist consultation',
    wizardTitle: 'Customized Fertilizer Calculator',
    wizardSubtitle: 'Input your crop and land parameters to compute precise nutrient amounts',
    step1Crop: 'Select Crop',
    step2Land: 'Land Size',
    step3Stage: 'Growth Stage',
    step4Soil: 'Soil Type',
    selectCropLabel: 'Crop',
    landAcreageLabel: 'Acreage (Acres)',
    growthStageLabel: 'Current Growth Stage',
    soilTypeLabel: 'Soil Type',
    generatePlanBtn: 'Generate Fertilizer Plan',
    generatedPlanTitle: 'Recommended Nutrient Plan',
    npkDosagePerAcre: 'Required NPK Dosage per Acre',
    nitrogen: 'Nitrogen (N)',
    phosphorus: 'Phosphorus (P)',
    potassium: 'Potash (K)',
    applicationSchedule: 'Application Schedule',
    organicEnhancers: 'Organic Soil Enhancers',
    irrigationSchedule: 'Irrigation Schedule',
    askAgronomistTitle: 'Ask AI Extension Agronomist',
    askAgronomistSubtitle: 'Ask any question regarding crop care, pests, or nutrients',
    chatPlaceholder: 'Type your question (e.g. How to control tomato flower drop?)...',
    sendQuestion: 'Ask Advisor',
    aiThinking: 'AI Agronomist is analyzing...',

    footerDesc: 'Empowering farmers with multilingual voice conversation in 7 languages, instant AI vision leaf diagnostics, precision spray radar, agronomic guides, and customized farm nutrient planning.',
    quickLinks: 'Quick Links',
    kisanCallCenter: 'Kisan Call Center (Toll Free)',
    emergencyHelpline: 'Emergency Farm Helpline',
    tollFree: 'Toll Free: 1800-180-1551',
    copyright: '© 2026 AgriPulse AI. Dedicated to the Prosperity of Farmers.',
    advisoryDisclaimer: 'Important: AgriPulse AI provides preliminary agronomic guidance. Always verify with your nearest Krishi Vigyan Kendra (KVK) before applying chemical inputs.',
  },

  Hindi: {
    appName: 'एग्रीपल्स',
    appSubtitle: 'स्मार्ट कृषि प्रबंधन और फसल सुरक्षा',
    farmEdition: 'किसान संस्करण',
    navDashboard: 'डैशबोर्ड',
    navVoice: 'वॉयस असिस्टेंट',
    navDisease: 'फसल रोग पहचान',
    navCrops: 'फसल मार्गदर्शिका',
    navWeather: 'मौसम और छिड़काव',
    navRecommendations: 'कृषि सलाह',
    aiActive: 'AI सक्रिय है',
    languageSelect: 'भाषा चुनें',
    languageSelectPrompt: 'अपनी पसंदीदा भाषा चुनें',

    greetingFarmer: 'नमस्ते, किसान भाई',
    heroSubtext: 'आपकी स्मार्ट AI कृषि सखी तैयार है। अपनी भाषा में बात करें, पत्तियों के रोग पहचानें, कीटनाशक छिड़काव का सही समय जानें और खाद की सही मात्रा पाएं।',
    talkToVoiceAI: 'वॉयस असिस्टेंट से बात करें',
    scanLeafPhoto: 'पत्ती का फोटो स्कैन करें',
    quickMetrics: 'खेत की मुख्य जानकारी',
    fieldReadiness: 'खेत कार्य उपयुक्तता',
    fieldReadinessOptimal: 'जुताई के लिए बहुत उपयुक्त',
    soilMoistureStatus: 'मिट्टी में नमी',
    soilMoistureAdequate: 'पर्याप्त नमी (68%)',
    activeCropSeason: 'वर्तमान फसल मौसम',
    seasonKharif: 'खरीफ / ग्रीष्मकालीन फसलें',
    activeAlerts: 'मौसम चेतावनी',
    noCriticalAlerts: 'कोई गंभीर चेतावनी नहीं',
    coreModulesTitle: 'मुख्य कृषि अनुभाग',
    coreModulesSubtitle: 'वॉयस बातचीत, रोग पहचान, मौसम और योजना',

    cardVoiceTitle: 'वॉयस असिस्टेंट',
    cardVoiceBadge: 'बहुभाषी AI वॉयस',
    cardVoiceDesc: 'हिंदी में स्वाभाविक बात करें। पत्तियों के धब्बों, खाद या मौसम के बारे में पूछें।',
    cardVoiceAction: 'बातचीत शुरू करें',

    cardDiseaseTitle: 'फसल रोग पहचान',
    cardDiseaseBadge: 'AI डॉक्टर',
    cardDiseaseDesc: 'प्रभावित पत्ती का फोटो अपलोड करें। फफूंद, जीवाणु और वायरस रोगों की पहचान कर जैविक उपाय बताती है।',
    cardDiseaseAction: 'पत्ती स्कैन करें',

    cardCropsTitle: 'फसल जानकारी',
    cardCropsBadge: 'खेती गाइड',
    cardCropsDesc: 'प्रमुख फसलों की खेती, खाद की मात्रा, मिट्टी का pH और पैदावार की पूरी जानकारी।',
    cardCropsAction: 'फसल सूची देखें',

    cardWeatherTitle: 'मौसम और छिड़काव',
    cardWeatherBadge: 'मौसम रडार',
    cardWeatherDesc: '7 दिनों का कृषि मौसम, कीटनाशक छिड़काव का अनुकूल समय और बारिश की संभावना।',
    cardWeatherAction: 'मौसम देखें',

    cardAdvisoryTitle: 'कृषि सलाह',
    cardAdvisoryBadge: 'स्मार्ट योजना',
    cardAdvisoryDesc: 'फसल और जमीन के अनुसार खाद की सटीक मात्रा, सिंचाई और AI कृषि वैज्ञानिक से बातचीत।',
    cardAdvisoryAction: 'योजना प्राप्त करें',

    farmChecklistTitle: 'दैनिक खेत कार्य सूची',
    farmChecklistSubtitle: 'खेत का निरीक्षण और महत्वपूर्ण कृषि कार्य',
    completedTasks: 'पूर्ण कार्य',
    taskPending: 'शेष कार्य',
    taskCompleted: 'पूर्ण हुआ',
    addTask: 'नया कार्य जोड़ें',
    taskHighPriority: 'अति आवश्यक',
    taskMediumPriority: 'मध्यम',
    taskLowPriority: 'सामान्य',

    recentScansTitle: 'हाल ही में किए गए रोग परीक्षण',
    recentScansSubtitle: 'आपके द्वारा जांची गई पत्तियों का इतिहास',
    noScansYet: 'अभी तक कोई स्कैन नहीं किया गया',
    viewAllScans: 'सभी स्कैन देखें',
    confidence: 'सटीकता',
    viewDetails: 'पूरा विवरण',

    voiceAssistantTitle: 'किसान वॉयस असिस्टेंट',
    voiceAssistantSubtitle: '7 भारतीय भाषाओं में किसानों की भरोसेमंद वॉयस सखी',
    voiceBadge: 'महिला AI वॉयस',
    audioOn: 'ऑडियो चालू',
    audioMuted: 'म्यूट',
    newChat: 'नई बातचीत',
    tryAsking: 'ऐसे पूछें:',
    listeningStatus: 'आपकी आवाज सुन रही है...',
    pressAndSpeak: 'माइक दबाकर बोलें',
    listeningNow: 'सुन रही है...',
    typePlaceholder: 'अपना सवाल यहाँ टाइप करें...',
    aiSpeaking: 'AI उत्तर दे रही है...',
    stopAudio: 'ऑडियो रोकें',
    listenAgain: 'सुनें',
    attachLeafPhoto: 'पत्ती का फोटो जोड़ें',
    leafPhotoReady: 'पत्ती का फोटो तैयार है',
    farmerLabel: 'किसान',
    aiLabel: 'एग्रीपल्स AI असिस्टेंट',
    fullDiagnosisTool: 'संपूर्ण रोग पहचान टूल',
    disclaimerVoice: 'प्रारंभिक सलाह: यह AI आधारित प्रारंभिक मूल्यांकन है। रसायनों के उपयोग से पहले नजदीकी कृषि अधिकारी से परामर्श लें।',

    diseaseTitle: 'AI फसल रोग पहचान',
    diseaseSubtitle: 'रोगग्रस्त पत्ती का फोटो अपलोड करें और तुरंत प्रारंभिक जांच परिणाम पाएं',
    uploadDropzoneTitle: 'पत्ती की तस्वीर यहाँ खींचें या अपलोड करें',
    uploadDropzoneSubtitle: 'साफ पत्ती का फोटो चुनें (JPEG, PNG, WebP)',
    useCamera: 'कैमरे से फोटो लें',
    orSelectSample: 'या इन नमूना पत्तियों का परीक्षण करें:',
    sampleLeavesTitle: 'परीक्षण के लिए नमूना पत्तियां',
    cropHintLabel: 'फसल का नाम (वैकल्पिक)',
    cropHintPlaceholder: 'उदा. टमाटर, धान, कपास, मिर्च...',
    analyzeButton: 'पत्ती का विश्लेषण करें',
    analyzingButton: 'AI विश्लेषण कर रही है...',
    stepPreprocessing: 'फोटो की स्पष्टता जांची जा रही है...',
    stepFeatureExtraction: 'पत्ती के धब्बों और लक्षणों की पहचान...',
    stepPathogenMatching: 'फफूंद और जीवाणु के लक्षणों का मिलान...',
    stepRemedies: 'जैविक और रासायनिक उपचार तैयार किए जा रहे हैं...',
    healthyLeaf: 'स्वस्थ पत्ती',
    infectedLeaf: 'रोगग्रस्त पत्ती',
    pathogenType: 'रोगज़नक़ का प्रकार',
    severityLabel: 'गंभीरता का स्तर',
    symptomsTitle: 'प्रमुख रोग लक्षण',
    immediateActionsTitle: 'तुरंत करने योग्य कार्य',
    organicTreatmentsTitle: 'जैविक और देशी उपचार',
    chemicalTreatmentsTitle: 'रासायनिक नियंत्रण उपाय',
    preventionTitle: 'भविष्य में रोकथाम के उपाय',
    preliminaryNotice: 'ध्यान दें: यह केवल प्रारंभिक AI सलाह है। कीटनाशक प्रयोग से पहले कृषि विशेषज्ञ की सलाह लें।',
    scanAnotherLeaf: 'दूसरी पत्ती स्कैन करें',
    selectImageFirstError: 'कृपया पहले पत्ती की तस्वीर अपलोड करें या नमूना चुनें।',
    invalidImageError: 'कृपया एक वैध इमेज फाइल चुनें (JPEG, PNG या WebP)।',

    cropCatalogTitle: 'संपूर्ण फसल ज्ञानकोश',
    cropCatalogSubtitle: 'फसल की आवश्यकताएं, खाद की मात्रा और कटाई के संकेत',
    searchCropPlaceholder: 'फसल खोजें (जैसे धान, टमाटर, गेहूं)...',
    allCategories: 'सभी श्रेणियां',
    catCereals: 'अनाज',
    catVegetables: 'सब्जियां',
    catFruits: 'फल',
    catCashCrops: 'नकदी फसलें',
    catPulses: 'दालें',
    catOilseeds: 'तिलहन',
    allSeasons: 'सभी मौसम',
    growthDuration: 'फसल अवधि',
    waterRequirement: 'पानी की आवश्यकता',
    soilPh: 'मिट्टी pH',
    optimalTemp: 'अनुकूल तापमान',
    npkRatio: 'NPK अनुपात',
    harvestIndicators: 'कटाई के लक्षण',
    viewCropGuide: 'पूरी गाइड देखें',
    diagnoseThisCrop: 'इस फसल की जांच करें',
    cropDetailsTitle: 'फसल की संपूर्ण जानकारी',
    seedRate: 'बीज दर',
    spacing: 'पौधों की दूरी',
    fertilizerSchedule: 'खाद देने का समय',
    commonPests: 'प्रमुख कीट',
    commonDiseases: 'प्रमुख रोग',
    averageYield: 'औसत पैदावार',
    expertTips: 'विशेषज्ञ सलाह',
    close: 'बंद करें',

    weatherTitle: 'कृषि मौसम और छिड़काव रडार',
    weatherSubtitle: 'सूक्ष्म जलवायु, छिड़काव का सही समय और मिट्टी में नमी की स्थिति',
    selectFarmLocation: 'स्थान चुनें',
    currentConditions: 'वर्तमान मौसम',
    sprayingFeasibility: 'छिड़काव उपयुक्तता',
    sprayingOptimal: 'छिड़काव के लिए बहुत उत्तम',
    sprayingCaution: 'सावधानी - मध्यम स्थिति',
    sprayingPoor: 'छिड़काव न करें - प्रतिकूल मौसम',
    irrigationAdvisory: 'सिंचाई सलाह',
    irrigationAdviseIrrigate: 'आज सिंचाई करें',
    irrigationAdviseHold: 'सिंचाई रोकें (बारिश की संभावना)',
    irrigationAdviseNormal: 'सामान्य दिनचर्या जारी रखें',
    diseaseRiskTitle: 'फफूंद रोग का खतरा',
    diseaseRiskLow: 'कम खतरा',
    diseaseRiskModerate: 'मध्यम खतरा',
    diseaseRiskHigh: 'अधिक फफूंद व कीट खतरा',
    fieldWorkSuitability: 'खेत कार्य उपयुक्तता',
    soilTempMoisture: 'मिट्टी तापमान और नमी',
    soilMoistureLabel: 'मिट्टी की नमी',
    soilTempLabel: 'मिट्टी का तापमान',
    windSpeed: 'हवा की गति',
    humidity: 'हवा में नमी',
    rainChance: 'बारिश की संभावना',
    uvIndex: 'UV सूचकांक',
    dewPoint: 'ओस बिंदु',
    hourlyForecast: 'प्रति घंटे का मौसम',
    sevenDaySprayRadar: '7 दिनों का छिड़काव रडार',

    advisoryTitle: 'स्मार्ट कृषि सलाहकार',
    advisorySubtitle: 'फसल और जमीन के अनुसार खाद और सिंचाई की सही योजना',
    wizardTitle: 'कस्टम खाद कैलकुलेटर',
    wizardSubtitle: 'अपनी फसल और जमीन का विवरण दर्ज कर सही मात्रा जानें',
    step1Crop: 'फसल चुनें',
    step2Land: 'जमीन का रकबा',
    step3Stage: 'फसल की अवस्था',
    step4Soil: 'मिट्टी का प्रकार',
    selectCropLabel: 'फसल',
    landAcreageLabel: 'रकबा (एकड़ में)',
    growthStageLabel: 'फसल की वर्तमान अवस्था',
    soilTypeLabel: 'मिट्टी का प्रकार',
    generatePlanBtn: 'खाद योजना बनाएं',
    generatedPlanTitle: 'सुझाई गई खाद योजना',
    npkDosagePerAcre: 'प्रति एकड़ आवश्यक NPK खाद',
    nitrogen: 'नाइट्रोजन (N)',
    phosphorus: 'फॉस्फोरस (P)',
    potassium: 'पोटाश (K)',
    applicationSchedule: 'खाद देने की विधि',
    organicEnhancers: 'जैविक और देशी खाद',
    irrigationSchedule: 'सिंचाई सारणी',
    askAgronomistTitle: 'कृषि वैज्ञानिक से पूछें',
    askAgronomistSubtitle: 'फसल रोग, खाद या कीटों से संबंधित कोई भी सवाल पूछें',
    chatPlaceholder: 'अपना सवाल लिखें (जैसे टमाटर में फूल गिरने से कैसे रोकें?)...',
    sendQuestion: 'सलाह मांगें',
    aiThinking: 'कृषि सखी सोच रही है...',

    footerDesc: 'किसानों के लिए 7 भाषाओं में वॉयस बातचीत, AI रोग पहचान, सटीक मौसम और खाद प्रबंधन का विश्वसनीय मंच।',
    quickLinks: 'महत्वपूर्ण लिंक',
    kisanCallCenter: 'किसान कॉल सेंटर (टोल फ्री)',
    emergencyHelpline: 'आपातकालीन किसान हेल्पलाइन',
    tollFree: 'टोल फ्री: 1800-180-1551',
    copyright: '© 2026 एग्रीपल्स AI. किसान समृद्धि को समर्पित।',
    advisoryDisclaimer: 'महत्वपूर्ण: एग्रीपल्स AI द्वारा दी गई जानकारी प्रारंभिक सलाह है। रासायनिक कीटनाशकों के प्रयोग से पहले नजदीकी कृषि विज्ञान केंद्र (KVK) से संपर्क करें।',
  },

  Tamil: {
    appName: 'அக்ரிபல்ஸ்',
    appSubtitle: 'ஸ்மார்ட் விவசாய மேலாண்மை & பயிர் பாதுகாப்பு',
    farmEdition: 'விவசாய பதிப்பு',
    navDashboard: 'டாஷ்போர்டு',
    navVoice: 'குரல் உதவியாளர்',
    navDisease: 'பயிர் நோய் கண்டறிதல்',
    navCrops: 'பயிர் கையேடு',
    navWeather: 'வானிலை & தெளிப்பு',
    navRecommendations: 'விவசாய ஆலோசனைகள்',
    aiActive: 'AI தயார்',
    languageSelect: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    languageSelectPrompt: 'உங்கள் விருப்ப மொழியைத் தேர்வுசெய்யவும்',

    greetingFarmer: 'வணக்கம், விவசாய நண்பரே',
    heroSubtext: 'உங்கள் AI வேளாண் உதவியாளர் தயார். தமிழில் பேசி பயிர் நோய்களைக் கண்டறியவும், மருந்து தெளிக்கும் நேரத்தை அறியவும், உர ஆலோசனைகளைப் பெறவும்.',
    talkToVoiceAI: 'குரல் உதவியாளரிடம் பேசுங்கள்',
    scanLeafPhoto: 'இலை புகைப்படத்தை ஸ்கேன் செய்க',
    quickMetrics: 'முக்கிய பண்ணை தகவல்கள்',
    fieldReadiness: 'பண்ணை வேலைக்கு உகந்தது',
    fieldReadinessOptimal: 'உழவு செய்ய மிக உகந்தது',
    soilMoistureStatus: 'மண் ஈரப்பதம்',
    soilMoistureAdequate: 'போதுமான ஈரப்பதம் (68%)',
    activeCropSeason: 'தற்போதைய பயிர் பருவம்',
    seasonKharif: 'காரிஃப் / கோடைப் பயிர்கள்',
    activeAlerts: 'வானிலை எச்சரிக்கைகள்',
    noCriticalAlerts: 'ஆபத்தான எச்சரிக்கைகள் இல்லை',
    coreModulesTitle: 'முக்கிய விவசாயப் பிரிவுகள்',
    coreModulesSubtitle: 'குரல் உரையாடல், பயிர் நோய் கண்டறிதல், வானிலை மற்றும் திட்டமிடல்',

    cardVoiceTitle: 'குரல் உதவியாளர்',
    cardVoiceBadge: 'பன்மொழி AI குரல்',
    cardVoiceDesc: 'தமிழில் இயல்பாகப் பேசுங்கள். பயிர் புள்ளிகள், உரம் அல்லது வானிலை பற்றி கேளுங்கள்.',
    cardVoiceAction: 'பேசத் தொடங்குங்கள்',

    cardDiseaseTitle: 'பயிர் நோய் கண்டறிதல்',
    cardDiseaseBadge: 'AI மருத்துவர்',
    cardDiseaseDesc: 'பாதிக்கப்பட்ட இலையின் புகைப்படத்தை பதிவேற்றி நோய்களைக் கண்டறிந்து இயற்கை நிவாரணங்களைப் பெறுங்கள்.',
    cardDiseaseAction: 'இலையை ஸ்கேன் செய்க',

    cardCropsTitle: 'பயிர் தகவல் கையேடு',
    cardCropsBadge: 'விவசாய வழிகாட்டி',
    cardCropsDesc: 'பயிர்களின் சாகுபடி முறைகள், NPK உர அளவு மற்றும் மகசூல் விவரங்களைத் தெரிந்துகொள்ளுங்கள்.',
    cardCropsAction: 'பயிர்களைப் பார்க்கவும்',

    cardWeatherTitle: 'வானிலை & தெளிப்பு',
    cardWeatherBadge: 'வானிலை ரேடார்',
    cardWeatherDesc: '7 நாள் வானிலை, மருந்து தெளிக்க உகந்த நேரம் மற்றும் மழை வாய்ப்புகள்.',
    cardWeatherAction: 'வானிலை பார்க்கவும்',

    cardAdvisoryTitle: 'விவசாய ஆலோசனைகள்',
    cardAdvisoryBadge: 'ஸ்மார்ட் திட்டமிடல்',
    cardAdvisoryDesc: 'பயிர் மற்றும் நிலத்திற்கு ஏற்ப உர அளவு, பாசன அட்டவணை மற்றும் AI வேளாண் நிபுணருடன் உரையாடல்.',
    cardAdvisoryAction: 'திட்டத்தைப் பெறுங்கள்',

    farmChecklistTitle: 'இன்றைய பண்ணை பணிகள்',
    farmChecklistSubtitle: 'தினசரி கள ஆய்வு மற்றும் அத்தியாவசிய பணிகள்',
    completedTasks: 'முடிந்த பணிகள்',
    taskPending: 'செய்ய வேண்டியவை',
    taskCompleted: 'முடிந்தது',
    addTask: 'புதிய பணியைச் சேர்க்கவும்',
    taskHighPriority: 'அதி முக்கியம்',
    taskMediumPriority: 'நடுத்தரம்',
    taskLowPriority: 'சாதாரண',

    recentScansTitle: 'சமீபத்திய நோய் சோதனைகள்',
    recentScansSubtitle: 'நீங்கள் ஸ்கேன் செய்த இலைகளின் வரலாறு',
    noScansYet: 'இதுவரை எந்த சோதனையும் செய்யப்படவில்லை',
    viewAllScans: 'அனைத்து சோதனைகளையும் பார்க்கவும்',
    confidence: 'துல்லியம்',
    viewDetails: 'முழு விவரங்கள்',

    voiceAssistantTitle: 'கிசான் குரல் உதவியாளர்',
    voiceAssistantSubtitle: '7 இந்திய மொழிகளில் விவசாயிகளுக்கான குரல் உதவியாளர்',
    voiceBadge: 'பெண் AI குரல்',
    audioOn: 'ஆடியோ ஆன்',
    audioMuted: 'மியூட்',
    newChat: 'புதிய உரையாடல்',
    tryAsking: 'இவ்வாறு கேட்கலாம்:',
    listeningStatus: 'கேட்கிறது...',
    pressAndSpeak: 'மைக் அழுத்திப் பேசுங்கள்',
    listeningNow: 'கேட்கிறது...',
    typePlaceholder: 'உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்...',
    aiSpeaking: 'AI பதிலளிக்கிறது...',
    stopAudio: 'ஆடியோவை நிறுத்து',
    listenAgain: 'கேளுங்கள்',
    attachLeafPhoto: 'இலை புகைப்படத்தை இணைக்கவும்',
    leafPhotoReady: 'இலை புகைப்படம் தயாராக உள்ளது',
    farmerLabel: 'விவசாயி',
    aiLabel: 'அக்ரிபல்ஸ் AI உதவியாளர்',
    fullDiagnosisTool: 'முழு நோய் கண்டறிதல் கருவி',
    disclaimerVoice: 'ஆரம்ப ஆலோசனை: இது AI அடிப்படையிலான ஆரம்ப கணிப்பு. ரசாயனங்களைப் பயன்படுத்துவதற்கு முன் வேளாண் அதிகாரியை அணுகவும்.',

    diseaseTitle: 'AI பயிர் நோய் கண்டறிதல்',
    diseaseSubtitle: 'பாதிக்கப்பட்ட இலையின் புகைப்படத்தை பதிவேற்றி உடனடி ஆரம்ப ஆய்வு முடிவுகளைப் பெறுங்கள்',
    uploadDropzoneTitle: 'இலையின் படத்தை இங்கே இழுக்கவும் அல்லது பதிவேற்றவும்',
    uploadDropzoneSubtitle: 'தெளிவான புகைப்படத்தைத் தேர்ந்தெடுக்கவும் (JPEG, PNG, WebP)',
    useCamera: 'கேமராவைப் பயன்படுத்தவும்',
    orSelectSample: 'அல்லது மாதிரி இலைகளைப் பரிசோதிக்கவும்:',
    sampleLeavesTitle: 'பரிசோதிக்க மாதிரி இலைகள்',
    cropHintLabel: 'பயிர் பெயர் (விருப்பமானது)',
    cropHintPlaceholder: 'எ.கா. தக்காளி, நெல், பருத்தி, மிளகாய்...',
    analyzeButton: 'இலையை ஆய்வு செய்க',
    analyzingButton: 'AI ஆய்வு செய்கிறது...',
    stepPreprocessing: 'படத்தின் தரம் சரிபார்க்கப்படுகிறது...',
    stepFeatureExtraction: 'இலை புள்ளிகள் கண்டறியப்படுகின்றன...',
    stepPathogenMatching: 'நோய்க்கிருமி அறிகுறிகளுடன் ஒப்பிடப்படுகிறது...',
    stepRemedies: 'இயற்கை மற்றும் ரசாயன சிகிச்சைகள் தயாரிக்கப்படுகின்றன...',
    healthyLeaf: 'ஆரோக்கியமான இலை',
    infectedLeaf: 'நோய் பாதிக்கப்பட்ட இலை',
    pathogenType: 'நோய்க்கிருமி வகை',
    severityLabel: 'தீவிர நிலை',
    symptomsTitle: 'முக்கிய நோய் அறிகுறிகள்',
    immediateActionsTitle: 'உடனடி நடவடிக்கைகள்',
    organicTreatmentsTitle: 'இயற்கை & நாட்டு மருந்துகள்',
    chemicalTreatmentsTitle: 'ரசாயன கட்டுப்பாடு',
    preventionTitle: 'வருங்கால தடுப்பு நடவடிக்கைகள்',
    preliminaryNotice: 'குறிப்பு: இது AI ஆரம்ப ஆய்வு மட்டுமே. மருந்து தெளிப்பதற்கு முன் வேளாண் அலுவலரிடம் உறுதிப்படுத்தவும்.',
    scanAnotherLeaf: 'மற்றொரு இலையை சோதிக்கவும்',
    selectImageFirstError: 'தயவுசெய்து முதலில் இலை படத்தை பதிவேற்றவும் அல்லது மாதிரியைத் தேர்ந்தெடுக்கவும்.',
    invalidImageError: 'தயவுசெய்து சரியான படக் கோப்பைத் தேர்ந்தெடுக்கவும் (JPEG, PNG அல்லது WebP).',

    cropCatalogTitle: 'முழுமையான பயிர் தகவல் கையேடு',
    cropCatalogSubtitle: 'சாகுபடி தேவைகள், ஊட்டச்சத்து மேலாண்மை மற்றும் அறுவடை அறிகுறிகள்',
    searchCropPlaceholder: 'பயிரைத் தேடுங்கள் (எ.கா. நெல், தக்காளி, பருத்தி)...',
    allCategories: 'அனைத்து வகைகள்',
    catCereals: 'தானியங்கள்',
    catVegetables: 'காய்கறிகள்',
    catFruits: 'பழங்கள்',
    catCashCrops: 'பணப்பயிர்கள்',
    catPulses: 'பருப்பு வகைகள்',
    catOilseeds: 'எண்ணெய் வித்துக்கள்',
    allSeasons: 'அனைத்துப் பருவங்கள்',
    growthDuration: 'பயிர் காலம்',
    waterRequirement: 'நீர் தேவை',
    soilPh: 'மண் pH',
    optimalTemp: 'உகந்த வெப்பநிலை',
    npkRatio: 'NPK உர விகிதம்',
    harvestIndicators: 'அறுவடை அறிகுறிகள்',
    viewCropGuide: 'முழு வழிகாட்டி',
    diagnoseThisCrop: 'இந்த பயிரை சோதிக்கவும்',
    cropDetailsTitle: 'பயிர் சாகுபடி விவரங்கள்',
    seedRate: 'விதை அளவு',
    spacing: 'செடி இடைவெளி',
    fertilizerSchedule: 'உரமிடும் நேரம்',
    commonPests: 'முக்கிய பூச்சிகள்',
    commonDiseases: 'முக்கிய நோய்கள்',
    averageYield: 'சராசரி மகசூல்',
    expertTips: 'நிபுணர் ஆலோசனைகள்',
    close: 'மூடு',

    weatherTitle: 'விவசாய வானிலை & தெளிப்பு ரேடார்',
    weatherSubtitle: 'நுண்ணிய வானிலை, மருந்து தெளிக்கும் நேரம் மற்றும் மண் ஈரப்பதம்',
    selectFarmLocation: 'இடத்தைத் தேர்ந்தெடுக்கவும்',
    currentConditions: 'தற்போதைய வானிலை',
    sprayingFeasibility: 'மருந்து தெளிப்பு உகந்த நிலை',
    sprayingOptimal: 'தெளிக்க மிக உகந்தது',
    sprayingCaution: 'எச்சரிக்கை - மிதமான நிலை',
    sprayingPoor: 'தெளிக்க வேண்டாம் - பாதகமான வானிலை',
    irrigationAdvisory: 'பாசன ஆலோசனை',
    irrigationAdviseIrrigate: 'இன்று தண்ணீர் பாய்ச்சவும்',
    irrigationAdviseHold: 'பாசனத்தை நிறுத்தவும் (மழை வாய்ப்பு)',
    irrigationAdviseNormal: 'வழக்கமான பாசனம் தொடரவும்',
    diseaseRiskTitle: 'பூஞ்சை நோய் ஆபத்து',
    diseaseRiskLow: 'குறைந்த ஆபத்து',
    diseaseRiskModerate: 'மிதமான பூஞ்சை ஆபத்து',
    diseaseRiskHigh: 'அதிக பூஞ்சை & பூச்சி ஆபத்து',
    fieldWorkSuitability: 'பண்ணை வேலை உகந்த நிலை',
    soilTempMoisture: 'மண் வெப்பநிலை & ஈரப்பதம்',
    soilMoistureLabel: 'மண் ஈரப்பதம்',
    soilTempLabel: 'மண் வெப்பநிலை',
    windSpeed: 'காற்று வேகம்',
    humidity: 'ஈரப்பதம்',
    rainChance: 'மழை வாய்ப்பு',
    uvIndex: 'UV குறியீடு',
    dewPoint: 'பனிப்புள்ளி',
    hourlyForecast: 'மணிநேர முன்னறிவிப்பு',
    sevenDaySprayRadar: '7 நாள் தெளிப்பு ரேடார்',

    advisoryTitle: 'ஸ்மார்ட் விவசாய ஆலோசகர்',
    advisorySubtitle: 'பயிர் மற்றும் நிலத்திற்கு ஏற்ப உர மற்றும் பாசன திட்டம்',
    wizardTitle: 'தனிப்பயன் உர கால்குலேட்டர்',
    wizardSubtitle: 'உங்கள் பயிர் விவரங்களை உள்ளிட்டு சரியான உர அளவைக் கண்டறியவும்',
    step1Crop: 'பயிரைத் தேர்வுசெய்க',
    step2Land: 'நில அளவு',
    step3Stage: 'வளர்ச்சி நிலை',
    step4Soil: 'மண் வகை',
    selectCropLabel: 'பயிர்',
    landAcreageLabel: 'நிலம் (ஏக்கரில்)',
    growthStageLabel: 'தற்போதைய வளர்ச்சி நிலை',
    soilTypeLabel: 'மண் வகை',
    generatePlanBtn: 'உரத் திட்டத்தை உருவாக்கு',
    generatedPlanTitle: 'பரிந்துரைக்கப்பட்ட உரத் திட்டம்',
    npkDosagePerAcre: 'ஏக்கருக்குத் தேவையான NPK உர அளவு',
    nitrogen: 'தழைச்சத்து (N)',
    phosphorus: 'மணிச்சத்து (P)',
    potassium: 'சாம்பல் சத்து (K)',
    applicationSchedule: 'உரமிடும் முறை',
    organicEnhancers: 'இயற்கை உரம் & சத்துக்கள்',
    irrigationSchedule: 'பாசன அட்டவணை',
    askAgronomistTitle: 'வேளாண் நிபுணரிடம் கேளுங்கள்',
    askAgronomistSubtitle: 'பயிர் பாதுகாப்பு மற்றும் உரங்கள் பற்றிய கேள்விகள்',
    chatPlaceholder: 'உங்கள் கேள்வியை எழுதுங்கள் (எ.கா. தக்காளி பூ உதிர்வதை தடுப்பது எப்படி?)...',
    sendQuestion: 'கேளுங்கள்',
    aiThinking: 'AI யோசிக்கிறது...',

    footerDesc: 'விவசாயிகளுக்கு 7 மொழிகளில் குரல் உரையாடல், உடனடி AI நோய் கண்டறிதல், துல்லியமான வானிலை மற்றும் உர மேலாண்மை வழங்கும் தளம்.',
    quickLinks: 'முக்கிய இணைப்புகள்',
    kisanCallCenter: 'கிசான் கால் சென்டர் (இலவசம்)',
    emergencyHelpline: 'விவசாய அவசர உதவி எண்',
    tollFree: 'இலவச எண்: 1800-180-1551',
    copyright: '© 2026 அக்ரிபல்ஸ் AI. விவசாயிகளின் நலனுக்காக அர்ப்பணிக்கப்பட்டது.',
    advisoryDisclaimer: 'முக்கிய குறிப்பு: அக்ரிபல்ஸ் AI வழங்கும் தகவல் ஆரம்ப வழிகாட்டுதல் மட்டுமே. மருந்து பயன்பாட்டிற்கு முன் அருகிலுள்ள வேளாண் அறிவியல் மையத்தை (KVK) அணுகவும்.',
  },

  Kannada: {
    appName: 'ಅಗ್ರಿಪಲ್ಸ್',
    appSubtitle: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ನಿರ್ವಹಣೆ ಮತ್ತು ಬೆಳೆ ಸಂರಕ್ಷಣೆ',
    farmEdition: 'ರೈತ ಆವೃತ್ತಿ',
    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navVoice: 'ಧ್ವನಿ ಸಹಾಯಕ',
    navDisease: 'ಬೆಳೆ ರೋಗ ಪತ್ತೆ',
    navCrops: 'ಬೆಳೆ ಮಾರ್ಗದರ್ಶಿ',
    navWeather: 'ಹವಾಮಾನ ಮತ್ತು ಸಿಂಪರಣೆ',
    navRecommendations: 'ಕೃಷಿ ಸಲಹೆಗಳು',
    aiActive: 'AI ಸಕ್ರಿಯವಾಗಿದೆ',
    languageSelect: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    languageSelectPrompt: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',

    greetingFarmer: 'ನಮಸ್ಕಾರ, ರೈತ ಮಿತ್ರರೇ',
    heroSubtext: 'ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ ಸಿದ್ಧವಾಗಿದೆ. ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲೇ ಮಾತನಾಡಿ, ಬೆಳೆ ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ, ಸಿಂಪರಣೆಯ ಸರಿಯಾದ ಸಮಯವನ್ನು ತಿಳಿಯಿರಿ ಮತ್ತು ಗೊಬ್ಬರದ ಪ್ರಮಾಣವನ್ನು ಪಡೆಯಿರಿ.',
    talkToVoiceAI: 'ಧ್ವನಿ ಸಹಾಯಕರೊಂದಿಗೆ ಮಾತನಾಡಿ',
    scanLeafPhoto: 'ಎಲೆ ಫೋಟೋ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    quickMetrics: 'ಹೊಲದ ಮುಖ್ಯ ಮಾಹಿತಿ',
    fieldReadiness: 'ಹೊಲದ ಕೆಲಸಕ್ಕೆ ಸೂಕ್ತತೆ',
    fieldReadinessOptimal: 'ಉಳುಮೆಗೆ ಅತ್ಯುತ್ತಮ',
    soilMoistureStatus: 'ಮಣ್ಣಿನ ತೇವಾಂಶ',
    soilMoistureAdequate: 'ಸಾಕಷ್ಟು ತೇವಾಂಶ (68%)',
    activeCropSeason: 'ಪ್ರಸ್ತುತ ಬೆಳೆ ಹಂಗಾಮು',
    seasonKharif: 'ಖಾರೀಫ್ / ಬೇಸಿಗೆ ಬೆಳೆಗಳು',
    activeAlerts: 'ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು',
    noCriticalAlerts: 'ಯಾವುದೇ ಗಂಭೀರ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ',
    coreModulesTitle: 'ಪ್ರಮುಖ ಕೃಷಿ ವಿಭಾಗಗಳು',
    coreModulesSubtitle: 'ಧ್ವನಿ ಸಂಭಾಷಣೆ, ಬೆಳೆ ರೋಗ ಪತ್ತೆ, ಹವಾಮಾನ ಮತ್ತು ಯೋಜನೆ',

    cardVoiceTitle: 'ಧ್ವನಿ ಸಹಾಯಕ',
    cardVoiceBadge: 'ಬಹುಭಾಷಾ AI ಧ್ವನಿ',
    cardVoiceDesc: 'ಕನ್ನಡದಲ್ಲಿ ಸಹಜವಾಗಿ ಮಾತನಾಡಿ. ಎಲೆಯ ಕಲೆಗಳು, ಗೊಬ್ಬರ ಅಥವಾ ಹವಾಮಾನದ ಬಗ್ಗೆ ಕೇಳಿ.',
    cardVoiceAction: 'ಮಾತನಾಡಲು ಪ್ರಾರಂಭಿಸಿ',

    cardDiseaseTitle: 'ಬೆಳೆ ರೋಗ ಪತ್ತೆ',
    cardDiseaseBadge: 'AI ವೈದ್ಯ',
    cardDiseaseDesc: 'ಬಾಧಿತ ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ. ಶಿಲೀಂಧ್ರ ಮತ್ತು ಕೀಟ ರೋಗಗಳನ್ನು ಗುರುತಿಸಿ ನೈಸರ್ಗಿಕ ಪರಿಹಾರಗಳನ್ನು ಸೂಚಿಸುತ್ತದೆ.',
    cardDiseaseAction: 'ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',

    cardCropsTitle: 'ಬೆಳೆ ಮಾಹಿತಿ ಕೈಪಿಡಿ',
    cardCropsBadge: 'ಕೃಷಿ ಮಾರ್ಗದರ್ಶಿ',
    cardCropsDesc: 'ಬೆಳೆಗಳ ಬೇಸಾಯ ಕ್ರಮ, NPK ಗೊಬ್ಬರದ ಪ್ರಮಾಣ ಮತ್ತು ಇಳುವರಿ ವಿವರಗಳನ್ನು ತಿಳಿಯಿರಿ.',
    cardCropsAction: 'ಬೆಳೆಗಳ ಪಟ್ಟಿ ನೋಡಿ',

    cardWeatherTitle: 'ಹವಾಮಾನ ಮತ್ತು ಸಿಂಪರಣೆ',
    cardWeatherBadge: 'ಹವಾಮಾನ ರೇಡಾರ್',
    cardWeatherDesc: '7 ದಿನಗಳ ಕೃಷಿ ಹವಾಮಾನ, ಔಷಧ ಸಿಂಪರಣೆಗೆ ಸೂಕ್ತ ಸಮಯ ಮತ್ತು ಮಳೆಯ ಮುನ್ಸೂಚನೆ.',
    cardWeatherAction: 'ಹವಾಮಾನ ನೋಡಿ',

    cardAdvisoryTitle: 'ಕೃಷಿ ಸಲಹೆಗಳು',
    cardAdvisoryBadge: 'ಸ್ಮಾರ್ಟ್ ಪ್ಲಾನರ್',
    cardAdvisoryDesc: 'ಬೆಳೆ ಮತ್ತು ಜಮೀನಿಗೆ ತಕ್ಕ ಗೊಬ್ಬರದ ಪ್ರಮಾಣ, ನೀರಾವರಿ ಮತ್ತು AI ಕೃಷಿ ತಜ್ಞರೊಂದಿಗೆ ಸಮಾಲೋಚನೆ.',
    cardAdvisoryAction: 'ಯೋಜನೆ ಪಡೆಯಿರಿ',

    farmChecklistTitle: 'ಇಂದಿನ ಹೊಲದ ಕೆಲಸಗಳ ಪಟ್ಟಿ',
    farmChecklistSubtitle: 'ದೈನಂದಿನ ಕ್ಷೇತ್ರ ಪರಿಶೀಲನೆ ಮತ್ತು ಪ್ರಮುಖ ಕೆಲಸಗಳು',
    completedTasks: 'ಪೂರ್ಣಗೊಂಡ ಕೆಲಸಗಳು',
    taskPending: 'ಬಾಕಿ ಕೆಲಸ',
    taskCompleted: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    addTask: 'ಹೊಸ ಕೆಲಸ ಸೇರಿಸಿ',
    taskHighPriority: 'ತುರ್ತು',
    taskMediumPriority: 'ಮಧ್ಯಮ',
    taskLowPriority: 'ಸಾಮಾನ್ಯ',

    recentScansTitle: 'ಇತ್ತೀಚಿನ ರೋಗ ಪರೀಕ್ಷೆಗಳು',
    recentScansSubtitle: 'ನೀವು ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ಎಲೆಗಳ ಇತಿಹಾಸ',
    noScansYet: 'ಇದುವರೆಗೆ ಯಾವುದೇ ಸ್ಕ್ಯಾನ್ ಮಾಡಿಲ್ಲ',
    viewAllScans: 'ಎಲ್ಲಾ ಸ್ಕ್ಯಾನ್‌ಗಳನ್ನು ನೋಡಿ',
    confidence: 'ನಿಖರತೆ',
    viewDetails: 'ಪೂರ್ಣ ವಿವರಗಳು',

    voiceAssistantTitle: 'ಕಿಸಾನ್ ವಾಯ್ಸ್ ಸಹಾಯಕ',
    voiceAssistantSubtitle: '7 ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ರೈತರಿಗೆ ಧ್ವನಿ ಸಹಾಯಕ',
    voiceBadge: 'ಮಹಿಳಾ AI ಧ್ವನಿ',
    audioOn: 'ಆಡಿಯೋ ಆನ್',
    audioMuted: 'ಮ್ಯೂಟ್ ಆಗಿದೆ',
    newChat: 'ಹೊಸ ಸಂಭಾಷಣೆ',
    tryAsking: 'ಹೀಗೆ ಕೇಳಿ:',
    listeningStatus: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...',
    pressAndSpeak: 'ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ',
    listeningNow: 'ಕೇಳುತ್ತಿದೆ...',
    typePlaceholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...',
    aiSpeaking: 'AI ಉತ್ತರಿಸುತ್ತಿದೆ...',
    stopAudio: 'ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ',
    listenAgain: 'ಕೇಳಿ',
    attachLeafPhoto: 'ಎಲೆ ಫೋಟೋ ಲಗತ್ತಿಸಿ',
    leafPhotoReady: 'ಎಲೆ ಫೋಟೋ ಸಿದ್ಧವಾಗಿದೆ',
    farmerLabel: 'ರೈತ',
    aiLabel: 'ಅಗ್ರಿಪಲ್ಸ್ AI ಸಹಾಯಕ',
    fullDiagnosisTool: 'ಸಂಪೂರ್ಣ ರೋಗ ಪತ್ತೆ ಸಾಧನ',
    disclaimerVoice: 'ಪ್ರಾಥಮಿಕ ಕೃಷಿ ಸಲಹೆ: ಇದು AI ಆಧಾರಿತ ಪ್ರಾಥಮಿಕ ಅಂದಾಜು. ರಾಸಾಯನಿಕ ಬಳಕೆಗೆ ಮುನ್ನ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.',

    diseaseTitle: 'AI ಬೆಳೆ ರೋಗ ಪತ್ತೆ',
    diseaseSubtitle: 'ಬಾಧಿತ ಎಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ತಕ್ಷಣದ ಪ್ರಾಥಮಿಕ ಫಲಿತಾಂಶ ಪಡೆಯಿರಿ',
    uploadDropzoneTitle: 'ಎಲೆಯ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    uploadDropzoneSubtitle: 'ಸ್ಪಷ್ಟವಾದ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ (JPEG, PNG, WebP)',
    useCamera: 'ಕ್ಯಾಮೆರಾ ಬಳಸಿ',
    orSelectSample: 'ಅಥವಾ ಮಾದರಿ ಎಲೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ:',
    sampleLeavesTitle: 'ಪರೀಕ್ಷಿಸಲು ಮಾದರಿ ಎಲೆಗಳು',
    cropHintLabel: 'ಬೆಳೆಯ ಹೆಸರು (ಐಚ್ಛಿಕ)',
    cropHintPlaceholder: 'ಉದಾ: ಟೊಮೆಟೊ, ಭತ್ತ, ಹತ್ತಿ, ಮೆಣಸಿನಕಾಯಿ...',
    analyzeButton: 'ಎಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
    analyzingButton: 'AI ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...',
    stepPreprocessing: 'ಚಿತ್ರದ ಗುಣಮಟ್ಟ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    stepFeatureExtraction: 'ಎಲೆಯ ಕಲೆಗಳನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ...',
    stepPathogenMatching: 'ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ಹೊಂದಿಸಲಾಗುತ್ತಿದೆ...',
    stepRemedies: 'ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಪರಿಹಾರ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
    healthyLeaf: 'ಆರೋಗ್ಯಕರ ಎಲೆ',
    infectedLeaf: 'ರೋಗಗ್ರಸ್ತ ಎಲೆ',
    pathogenType: 'ರೋಗಕಾರಕದ ವಿಧ',
    severityLabel: 'ತೀವ್ರತೆಯ ಮಟ್ಟ',
    symptomsTitle: 'ಮುಖ್ಯ ರೋಗ ಲಕ್ಷಣಗಳು',
    immediateActionsTitle: 'ತಕ್ಷಣದ ಕ್ರಮಗಳು',
    organicTreatmentsTitle: 'ಸಾವಯವ / ದೇಸಿ ಪರಿಹಾರಗಳು',
    chemicalTreatmentsTitle: 'ರಾಸಾಯನಿಕ ನಿಯಂತ್ರಣ',
    preventionTitle: 'ಮುನ್ನೆಚ್ಚರಿಕೆ ಕ್ರಮಗಳು',
    preliminaryNotice: 'ಗಮನಿಸಿ: ಇದು AI ಆಧಾರಿತ ಪ್ರಾಥಮಿಕ ಸಲಹೆ ಮಾತ್ರ. ಔಷಧ ಸಿಂಪರಣೆಗೆ ಮುನ್ನ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    scanAnotherLeaf: 'ಮತ್ತೊಂದು ಎಲೆ ಪರೀಕ್ಷಿಸಿ',
    selectImageFirstError: 'ದಯವಿಟ್ಟು ಮೊದಲು ಎಲೆಯ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಮಾದರಿ ಆಯ್ಕೆಮಾಡಿ.',
    invalidImageError: 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಚಿತ್ರ ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ (JPEG, PNG ಅಥವಾ WebP).',

    cropCatalogTitle: 'ಸಮಗ್ರ ಬೆಳೆ ಮಾಹಿತಿ ಕೋಶ',
    cropCatalogSubtitle: 'ಬೇಸಾಯ ಕ್ರಮಗಳು, ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ ಮತ್ತು ಕೊಯ್ಲಿನ ಲಕ್ಷಣಗಳು',
    searchCropPlaceholder: 'ಬೆಳೆಯನ್ನು ಹುಡುಕಿ (ಉದಾ: ಭತ್ತ, ಟೊಮೆಟೊ, ಹತ್ತಿ)...',
    allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
    catCereals: 'ಧಾನ್ಯಗಳು',
    catVegetables: 'ತರಕಾರಿಗಳು',
    catFruits: 'ಹಣ್ಣುಗಳು',
    catCashCrops: 'ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು',
    catPulses: 'ದ್ವಿದಳ ಧಾನ್ಯಗಳು',
    catOilseeds: 'ಎಣ್ಣೆಕಾಳುಗಳು',
    allSeasons: 'ಎಲ್ಲಾ ಹಂಗಾಮುಗಳು',
    growthDuration: 'ಬೆಳೆಯ ಅವಧಿ',
    waterRequirement: 'ನೀರಿನ ಅವಶ್ಯಕತೆ',
    soilPh: 'ಮಣ್ಣಿನ pH',
    optimalTemp: 'ಸೂಕ್ತ ತಾಪಮಾನ',
    npkRatio: 'NPK ಗೊಬ್ಬರದ ಅನುಪಾತ',
    harvestIndicators: 'ಕೊಯ್ಲಿನ ಲಕ್ಷಣಗಳು',
    viewCropGuide: 'ಸಂಪೂರ್ಣ ವಿವರ',
    diagnoseThisCrop: 'ಈ ಬೆಳೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ',
    cropDetailsTitle: 'ಬೆಳೆ ಬೇಸಾಯದ ವಿವರಗಳು',
    seedRate: 'ಬೀಜದ ಪ್ರಮಾಣ',
    spacing: 'ಗಿಡಗಳ ಅಂತರ',
    fertilizerSchedule: 'ಗೊಬ್ಬರ ಹಾಕುವ ಸಮಯ',
    commonPests: 'ಮುಖ್ಯ ಕೀಟಗಳು',
    commonDiseases: 'ಮುಖ್ಯ ರೋಗಗಳು',
    averageYield: 'ಸರಾಸರಿ ಇಳುವರಿ',
    expertTips: 'ತಜ್ಞರ ಸಲಹೆಗಳು',
    close: 'ಮುಚ್ಚಿ',

    weatherTitle: 'ಕೃಷಿ ಹವಾಮಾನ ಮತ್ತು ಸಿಂಪರಣೆ ರೇಡಾರ್',
    weatherSubtitle: 'ಸೂಕ್ಷ್ಮ ಹವಾಮಾನ, ಔಷಧ ಸಿಂಪರಣೆಗೆ ಸೂಕ್ತ ಸಮಯ ಮತ್ತು ಮಣ್ಣಿನ ತೇವಾಂಶ',
    selectFarmLocation: 'ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    currentConditions: 'ಪ್ರಸ್ತುತ ಹವಾಮಾನ',
    sprayingFeasibility: 'ಸಿಂಪರಣೆಗೆ ಸೂಕ್ತತೆ',
    sprayingOptimal: 'ಸಿಂಪರಣೆಗೆ ಅತ್ಯುತ್ತಮ',
    sprayingCaution: 'ಎಚ್ಚರಿಕೆ - ಮಧ್ಯಮ ಸೂಕ್ತತೆ',
    sprayingPoor: 'ಸಿಂಪರಣೆ ಮಾಡಬೇಡಿ - ಪ್ರತಿಕೂಲ ಹವಾಮಾನ',
    irrigationAdvisory: 'ನೀರಾವರಿ ಸಲಹೆ',
    irrigationAdviseIrrigate: 'ಇಂದು ನೀರು ಹಾಯಿಸಿ',
    irrigationAdviseHold: 'ನೀರಾವರಿ ನಿಲ್ಲಿಸಿ (ಮಳೆಯ ಸಾಧ್ಯತೆ)',
    irrigationAdviseNormal: 'ಸಾಮಾನ್ಯ ನೀರಾವರಿ ಮುಂದುವರಿಸಿ',
    diseaseRiskTitle: 'ಶಿಲೀಂಧ್ರ ರೋಗದ ಅಪಾಯ',
    diseaseRiskLow: 'ಕಡಿಮೆ ಅಪಾಯ',
    diseaseRiskModerate: 'ಮಧ್ಯಮ ಅಪಾಯ',
    diseaseRiskHigh: 'ಹೆಚ್ಚಿನ ರೋಗ ಮತ್ತು ಕೀಟ ಅಪಾಯ',
    fieldWorkSuitability: 'ಹೊಲದ ಕೆಲಸಕ್ಕೆ ಸೂಕ್ತತೆ',
    soilTempMoisture: 'ಮಣ್ಣಿನ ತಾಪಮಾನ ಮತ್ತು ತೇವಾಂಶ',
    soilMoistureLabel: 'ಮಣ್ಣಿನ ತೇವಾಂಶ',
    soilTempLabel: 'ಮಣ್ಣಿನ ತಾಪಮಾನ',
    windSpeed: 'ಗಾಳಿಯ ವೇಗ',
    humidity: 'ತೇವಾಂಶ',
    rainChance: 'ಮಳೆಯ ಸಾಧ್ಯತೆ',
    uvIndex: 'UV ಸೂಚ್ಯಂಕ',
    dewPoint: 'ಇಬ್ಬನಿ ಬಿಂದು',
    hourlyForecast: 'ಗಂಟೆವಾರು ಹವಾಮಾನ',
    sevenDaySprayRadar: '7 ದಿನಗಳ ಸಿಂಪರಣಾ ರೇಡಾರ್',

    advisoryTitle: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಲಹೆಗಾರ',
    advisorySubtitle: 'ಬೆಳೆ ಮತ್ತು ಜಮೀನಿಗೆ ತಕ್ಕ ಗೊಬ್ಬರ ಮತ್ತು ನೀರಾವರಿ ಯೋಜನೆ',
    wizardTitle: 'ಕಸ್ಟಮ್ ಗೊಬ್ಬರ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    wizardSubtitle: 'ನಿಮ್ಮ ಬೆಳೆ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ ಸರಿಯಾದ ಗೊಬ್ಬರದ ಲೆಕ್ಕ ಪಡೆಯಿರಿ',
    step1Crop: 'ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ',
    step2Land: 'ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ',
    step3Stage: 'ಬೆಳೆಯ ಹಂತ',
    step4Soil: 'ಮಣ್ಣಿನ ವಿಧ',
    selectCropLabel: 'ಬೆಳೆ',
    landAcreageLabel: 'ವಿಸ್ತೀರ್ಣ (ಎಕರೆಗಳಲ್ಲಿ)',
    growthStageLabel: 'ಪ್ರಸ್ತುತ ಬೆಳವಣಿಗೆಯ ಹಂತ',
    soilTypeLabel: 'ಮಣ್ಣಿನ ವಿಧ',
    generatePlanBtn: 'ಗೊಬ್ಬರದ ಯೋಜನೆ ರಚಿಸಿ',
    generatedPlanTitle: 'ಶಿಫಾರಸು ಮಾಡಿದ ಗೊಬ್ಬರದ ಯೋಜನೆ',
    npkDosagePerAcre: 'ಪ್ರತಿ ಎಕರೆಗೆ ಬೇಕಾದ NPK ಗೊಬ್ಬರ',
    nitrogen: 'ಸಾರಜನಕ (N)',
    phosphorus: 'ರಂಜಕ (P)',
    potassium: 'ಪೊಟ್ಯಾಷ್ (K)',
    applicationSchedule: 'ಗೊಬ್ಬರ ಹಾಕುವ ವಿಧಾನ',
    organicEnhancers: 'ಸಾವಯವ ಪೋಷಕಾಂಶಗಳು',
    irrigationSchedule: 'ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ',
    askAgronomistTitle: 'ಕೃಷಿ ತಜ್ಞರನ್ನು ಕೇಳಿ',
    askAgronomistSubtitle: 'ಬೆಳೆ ರೋಗ, ಗೊಬ್ಬರ ಅಥವಾ ಕೀಟಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ',
    chatPlaceholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಬರೆಯಿರಿ (ಉದಾ: ಟೊಮೆಟೊ ಹೂ ಉದುರುವುದನ್ನು ತಡೆಯುವುದು ಹೇಗೆ?)...',
    sendQuestion: 'ಸಲಹೆ ಕೇಳಿ',
    aiThinking: 'AI ಯೋಚಿಸುತ್ತಿದೆ...',

    footerDesc: 'ರೈತರಿಗೆ 7 ಭಾಷೆಗಳಲ್ಲಿ ಧ್ವನಿ ಸಂಭಾಷಣೆ, ತಕ್ಷಣದ AI ರೋಗ ಪತ್ತೆ, ನಿಖರ ಹವಾಮಾನ ಮತ್ತು ಗೊಬ್ಬರ ನಿರ್ವಹಣೆ ಒದಗಿಸುವ ವೇದಿಕೆ.',
    quickLinks: 'ಪ್ರಮುಖ ಲಿಂಕ್‌ಗಳು',
    kisanCallCenter: 'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ (ಉಚಿತ)',
    emergencyHelpline: 'ತುರ್ತು ಕೃಷಿ ಸಹಾಯವಾಣಿ',
    tollFree: 'ಟೋಲ್ ಫ್ರೀ: 1800-180-1551',
    copyright: '© 2026 ಅಗ್ರಿಪಲ್ಸ್ AI. ರೈತರ ಸಮೃದ್ಧಿಗಾಗಿ ಸಮರ್ಪಿತ.',
    advisoryDisclaimer: 'ಪ್ರಮುಖ ಸೂಚನೆ: ಅಗ್ರಿಪಲ್ಸ್ AI ನೀಡುವ ಮಾಹಿತಿ ಪ್ರಾಥಮಿಕ ಸಲಹೆ ಮಾತ್ರ. ಔಷಧ ಬಳಸುವ ಮುನ್ನ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರವನ್ನು (KVK) ಸಂಪರ್ಕಿಸಿ.',
  },

  Malayalam: {
    appName: 'അഗ്രിപൾസ്',
    appSubtitle: 'സ്മാർട്ട് കാർഷിക പരിപാലനവും വിള സംരക്ഷണവും',
    farmEdition: 'കർഷക പതിപ്പ്',
    navDashboard: 'ഡാഷ്‌ബോർഡ്',
    navVoice: 'വോയ്‌സ് അസിസ്റ്റന്റ്',
    navDisease: 'വിള രോഗനിർണയം',
    navCrops: 'വിള സഹായി',
    navWeather: 'കാലാവസ്ഥയും സ്പ്രേയിംഗും',
    navRecommendations: 'കാർഷിക നിർദ്ദേശങ്ങൾ',
    aiActive: 'AI തയ്യാറാണ്',
    languageSelect: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    languageSelectPrompt: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',

    greetingFarmer: 'നമസ്കാരം, കർഷക സുഹൃത്തേ',
    heroSubtext: 'നിങ്ങളുടെ AI കാർഷിക സഹായി തയ്യാറാണ്. നിങ്ങളുടെ മാതൃഭാഷയിൽ സംസാരിക്കൂ, വിള രോഗങ്ങൾ കണ്ടെത്തൂ, കൃത്യമായ വളപ്രയോഗവും കാലാവസ്ഥയും അറിയൂ.',
    talkToVoiceAI: 'വോയ്‌സ് അസിസ്റ്റന്റിനോട് സംസാരിക്കുക',
    scanLeafPhoto: 'ഇലയുടെ ഫോട്ടോ സ്കാൻ ചെയ്യുക',
    quickMetrics: 'പ്രധാന കൃഷി വിവരങ്ങൾ',
    fieldReadiness: 'പാടത്തെ പണിക്ക് അനുയോജ്യം',
    fieldReadinessOptimal: 'കൃഷിപ്പണിക്ക് വളരെ ഉചിതം',
    soilMoistureStatus: 'മണ്ണിലെ ഈർപ്പം',
    soilMoistureAdequate: 'ആവശ്യത്തിന് ഈർപ്പം (68%)',
    activeCropSeason: 'നിലവിലെ വിള സീസൺ',
    seasonKharif: 'ഖാരിഫ് / വേനൽക്കാല വിളകൾ',
    activeAlerts: 'കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ',
    noCriticalAlerts: 'പ്രത്യേക മുന്നറിയിപ്പുകൾ ഇല്ല',
    coreModulesTitle: 'പ്രധാന കാർഷിക വിഭാഗങ്ങൾ',
    coreModulesSubtitle: 'വോയ്‌സ് സംഭാഷണം, രോഗനിർണയം, കാലാവസ്ഥ, കൃഷി ആസൂത്രണം',

    cardVoiceTitle: 'വോയ്‌സ് അസിസ്റ്റന്റ്',
    cardVoiceBadge: 'ബഹുഭാഷാ AI വോയ്‌സ്',
    cardVoiceDesc: 'മലയാളത്തിൽ സംസാരിക്കൂ. ഇലകളിലെ പാടുകൾ, വളം അല്ലെങ്കിൽ കാലാവസ്ഥയെക്കുറിച്ച് ചോദിക്കൂ.',
    cardVoiceAction: 'സംസാരിച്ചു തുടങ്ങാം',

    cardDiseaseTitle: 'വിള രോഗനിർണയം',
    cardDiseaseBadge: 'AI ഡോക്ടർ',
    cardDiseaseDesc: 'ബാധിച്ച ഇലയുടെ ഫോട്ടോ എടുക്കൂ. ഫംഗസ്, ബാക്ടീരിയ രോഗങ്ങൾ കണ്ടെത്തി ജൈവ പരിഹാരങ്ങൾ നൽകുന്നു.',
    cardDiseaseAction: 'ഇല സ്കാൻ ചെയ്യുക',

    cardCropsTitle: 'വിള വിവരങ്ങൾ',
    cardCropsBadge: 'കൃഷി ഗൈഡ്',
    cardCropsDesc: 'വിളകളുടെ കൃഷിരീതികൾ, NPK വളത്തിന്റെ അളവ്, മണ്ണിന്റെ pH, വിളവ് എന്നിവ അറിയൂ.',
    cardCropsAction: 'വിളകൾ കാണുക',

    cardWeatherTitle: 'കാലാവസ്ഥയും സ്പ്രേയിംഗും',
    cardWeatherBadge: 'കാലാവസ്ഥാ റഡാർ',
    cardWeatherDesc: '7 ദിവസത്തെ കാലാവസ്ഥ, കീടനാശിനി പ്രയോഗത്തിന് അനുയോജ്യമായ സമയം, മഴ സാധ്യത.',
    cardWeatherAction: 'കാലാവസ്ഥ അറിയുക',

    cardAdvisoryTitle: 'കാർഷിക നിർദ്ദേശങ്ങൾ',
    cardAdvisoryBadge: 'സ്മാർട്ട് പ്ലാനർ',
    cardAdvisoryDesc: 'വിളയ്ക്കും മണ്ണിനും അനുയോജ്യമായ വളം, നനയ്ക്കൽ പദ്ധതി, AI കൃഷി വിദഗ്ദ്ധനുമായി സംഭാഷണം.',
    cardAdvisoryAction: 'പദ്ധതി നേടുക',

    farmChecklistTitle: 'ഇന്നത്തെ കൃഷിപ്പണികൾ',
    farmChecklistSubtitle: 'ദൈനംദിന പാട പരിശോധനയും പ്രധാന ജോലികളും',
    completedTasks: 'പൂർത്തിയായവ',
    taskPending: 'ബാക്കിയുള്ളവ',
    taskCompleted: 'പൂർത്തിയായി',
    addTask: 'പുതിയ ജോലി ചേർക്കുക',
    taskHighPriority: 'വളരെ പ്രധാനം',
    taskMediumPriority: 'ഇടത്തരം',
    taskLowPriority: 'സാധാരണ',

    recentScansTitle: 'സമീപകാല രോഗ പരിശോധനകൾ',
    recentScansSubtitle: 'നിങ്ങൾ പരിശോധിച്ച ഇലകളുടെ ചരിത്രം',
    noScansYet: 'ഇതുവരെ സ്കാനുകൾ ഒന്നും ചെയ്തിട്ടില്ല',
    viewAllScans: 'എല്ലാ സ്കാനുകളും കാണുക',
    confidence: 'കൃത്യത',
    viewDetails: 'മുഴുവൻ വിവരങ്ങൾ',

    voiceAssistantTitle: 'കിസാൻ വോയ്‌സ് അസിസ്റ്റന്റ്',
    voiceAssistantSubtitle: '7 ഇന്ത്യൻ ഭാഷകളിൽ കർഷകർക്കുള്ള വോയ്‌സ് സഹായി',
    voiceBadge: 'വനിതാ AI ശബ്ദം',
    audioOn: 'ഓഡിയോ ഓൺ',
    audioMuted: 'മ്യൂട്ട്',
    newChat: 'പുതിയ സംഭാഷണം',
    tryAsking: 'ഇങ്ങനെ ചോദിക്കാം:',
    listeningStatus: 'ശ്രദ്ധിക്കുന്നു...',
    pressAndSpeak: 'മൈക്ക് അമർത്തി സംസാരിക്കുക',
    listeningNow: 'ശ്രദ്ധിക്കുന്നു...',
    typePlaceholder: 'നിങ്ങളുടെ ചോദ്യം ഇവിടെ ടൈപ്പ് ചെയ്യുക...',
    aiSpeaking: 'AI മറുപടി നൽകുന്നു...',
    stopAudio: 'ഓഡിയോ നിർത്തുക',
    listenAgain: 'കേൾക്കുക',
    attachLeafPhoto: 'ഇലയുടെ ഫോട്ടോ ചേർക്കുക',
    leafPhotoReady: 'ഇലയുടെ ഫോട്ടോ തയ്യാറാണ്',
    farmerLabel: 'കർഷകൻ',
    aiLabel: 'അഗ്രിപൾസ് AI അസിസ്റ്റന്റ്',
    fullDiagnosisTool: 'പൂർണ്ണ രോഗനിർണയ ടൂൾ',
    disclaimerVoice: 'പ്രാഥമിക ഉപദേശം: ഇത് AI അധിഷ്ഠിത പ്രാഥമിക വിലയിരുത്തലാണ്. രാസവസ്തുക്കൾ ഉപയോഗിക്കുന്നതിന് മുൻപ് കൃഷി ഓഫീസറെ സമീപിക്കുക.',

    diseaseTitle: 'AI വിള രോഗനിർണയം',
    diseaseSubtitle: 'ഇലയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്ത് ഉടനടി പ്രാഥമിക വിലയിരുത്തൽ നേടുക',
    uploadDropzoneTitle: 'ഇലയുടെ ചിത്രം ഇവിടെ വലിച്ചിടുക അല്ലെങ്കിൽ അപ്‌ലോഡ് ചെയ്യുക',
    uploadDropzoneSubtitle: 'വ്യക്തമായ ഫോട്ടോ തിരഞ്ഞെടുക്കുക (JPEG, PNG, WebP)',
    useCamera: 'ക്യാമറ ഉപയോഗിക്കുക',
    orSelectSample: 'അല്ലെങ്കിൽ മാതൃകാ ഇലകൾ പരിശോധിക്കുക:',
    sampleLeavesTitle: 'പരിശോധിക്കാനുള്ള മാതൃകാ ഇലകൾ',
    cropHintLabel: 'വിളയുടെ പേര് (ഓപ്ഷണൽ)',
    cropHintPlaceholder: 'ഉദാ: തക്കാളി, നെല്ല്, പരുത്തി, മുളക്...',
    analyzeButton: 'ഇല പരിശോധിക്കുക',
    analyzingButton: 'AI പരിശോധിക്കുന്നു...',
    stepPreprocessing: 'ചിത്രത്തിന്റെ ഗുണനിലവാരം പരിശോധിക്കുന്നു...',
    stepFeatureExtraction: 'ഇലയിലെ പാടുകൾ കണ്ടെത്തുന്നു...',
    stepPathogenMatching: 'രോഗ ലക്ഷണങ്ങൾ ഒത്തുനോക്കുന്നു...',
    stepRemedies: 'ജൈവ, രാസ പരിഹാരങ്ങൾ തയ്യാറാക്കുന്നു...',
    healthyLeaf: 'ആരോഗ്യമുള്ള ഇല',
    infectedLeaf: 'രോഗബാധിതമായ ഇല',
    pathogenType: 'രോഗകാരിയുടെ തരം',
    severityLabel: 'തീവ്രത',
    symptomsTitle: 'പ്രധാന രോഗലക്ഷണങ്ങൾ',
    immediateActionsTitle: 'ഉടൻ ചെയ്യേണ്ട കാര്യങ്ങൾ',
    organicTreatmentsTitle: 'ജൈവ / നാടൻ പരിഹാരങ്ങൾ',
    chemicalTreatmentsTitle: 'രാസ നിയന്ത്രണം',
    preventionTitle: 'പ്രതിരോധ മുൻകരുതലുകൾ',
    preliminaryNotice: 'ശ്രദ്ധിക്കുക: ഇത് AI പ്രാഥമിക ഉപദേശം മാത്രമാണ്. രാസവളപ്രയോഗത്തിന് മുൻപ് കൃഷി ഉദ്യോഗസ്ഥരുമായി ബന്ധപ്പെടുക.',
    scanAnotherLeaf: 'മറ്റൊരു ഇല പരിശോധിക്കുക',
    selectImageFirstError: 'ദയവായി ആദ്യം ഒരു ഇലയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക അല്ലെങ്കിൽ മാതൃക തിരഞ്ഞെടുക്കുക.',
    invalidImageError: 'ദയവായി സാധുവായ ഒരു ഇമേജ് ഫയൽ തിരഞ്ഞെടുക്കുക (JPEG, PNG അല്ലെങ്കിൽ WebP).',

    cropCatalogTitle: 'സമ്പൂർണ്ണ വിള വിജ്ഞാനകോശം',
    cropCatalogSubtitle: 'കൃഷിരീതികൾ, പോഷക പരിപാലനം, വിളവെടുപ്പ് ലക്ഷണങ്ങൾ',
    searchCropPlaceholder: 'വിളകൾ തിരയുക (ഉദാ: നെല്ല്, തക്കാളി, പരുത്തി)...',
    allCategories: 'എല്ലാ വിഭാഗങ്ങളും',
    catCereals: 'ധാന്യങ്ങൾ',
    catVegetables: 'പച്ചക്കറികൾ',
    catFruits: 'പഴങ്ങൾ',
    catCashCrops: 'നാണ്യവിളകൾ',
    catPulses: 'പയറുവർഗ്ഗങ്ങൾ',
    catOilseeds: 'എണ്ണക്കുരുക്കൾ',
    allSeasons: 'എല്ലാ സീസണുകളും',
    growthDuration: 'വിള കാലയളവ്',
    waterRequirement: 'ജല ലഭ്യത',
    soilPh: 'മണ്ണിന്റെ pH',
    optimalTemp: 'അനുയോജ്യമായ താപനില',
    npkRatio: 'NPK അനുപാതം',
    harvestIndicators: 'വിളവെടുപ്പ് ലക്ഷണങ്ങൾ',
    viewCropGuide: 'മുഴുവൻ വിവരങ്ങൾ',
    diagnoseThisCrop: 'ഈ വിള പരിശോധിക്കുക',
    cropDetailsTitle: 'വിള കൃഷി വിവരങ്ങൾ',
    seedRate: 'വിത്ത് നിരക്ക്',
    spacing: 'ചെടികൾ തമ്മിലുള്ള അകലം',
    fertilizerSchedule: 'വളപ്രയോഗ സമയം',
    commonPests: 'പ്രധാന കീടങ്ങൾ',
    commonDiseases: 'പ്രധാന രോഗങ്ങൾ',
    averageYield: 'ശരാശരി വിളവ്',
    expertTips: 'വിദഗ്ദ്ധോപദേശം',
    close: 'അടയ്ക്കുക',

    weatherTitle: 'കാർഷിക കാലാവസ്ഥയും സ്പ്രേയിംഗും',
    weatherSubtitle: 'സൂക്ഷ്മ കാലാവസ്ഥ, മരുന്ന് തളിക്കാനുള്ള സമയം, മണ്ണിന്റെ ഈർപ്പം',
    selectFarmLocation: 'സ്ഥലം തിരഞ്ഞെടുക്കുക',
    currentConditions: 'നിലവിലെ കാലാവസ്ഥ',
    sprayingFeasibility: 'മരുന്ന് തളിക്കാൻ അനുയോജ്യമായ സമയം',
    sprayingOptimal: 'മരുന്ന് തളിക്കാൻ വളരെ ഉചിതം',
    sprayingCaution: 'ശ്രദ്ധിക്കുക - ഇടത്തരം അനുയോജ്യം',
    sprayingPoor: 'മരുന്ന് തളിക്കരുത് - പ്രതികൂല കാലാവസ്ഥ',
    irrigationAdvisory: 'നനയ്ക്കൽ നിർദ്ദേശം',
    irrigationAdviseIrrigate: 'ഇന്ന് നനയ്ക്കുക',
    irrigationAdviseHold: 'നനയ്ക്കൽ നിർത്തുക (മഴ സാധ്യത)',
    irrigationAdviseNormal: 'സാധാരണ പോലെ നനയ്ക്കുക',
    diseaseRiskTitle: 'ഫംഗസ് രോഗ സാധ്യത',
    diseaseRiskLow: 'കുറഞ്ഞ സാധ്യത',
    diseaseRiskModerate: 'ഇടത്തരം സാധ്യത',
    diseaseRiskHigh: 'കൂടുതൽ ഫംഗസ് & കീട സാധ്യത',
    fieldWorkSuitability: 'പാടത്തെ പണിക്ക് അനുയോജ്യം',
    soilTempMoisture: 'മണ്ണിന്റെ താപനിലയും ഈർപ്പവും',
    soilMoistureLabel: 'മണ്ണിലെ ഈർപ്പം',
    soilTempLabel: 'മണ്ണിന്റെ താപനില',
    windSpeed: 'കാറ്റിന്റെ വേഗത',
    humidity: 'ഈർപ്പം',
    rainChance: 'മഴ സാധ്യത',
    uvIndex: 'UV സൂചിക',
    dewPoint: 'ഡ്യൂ പോയിന്റ്',
    hourlyForecast: 'മണിക്കൂർ തോറുമുള്ള കാലാവസ്ഥ',
    sevenDaySprayRadar: '7 ദിവസത്തെ സ്പ്രേയിംഗ് റഡാർ',

    advisoryTitle: 'സ്മാർട്ട് കാർഷിക ഉപദേശകൻ',
    advisorySubtitle: 'വിളയ്ക്കും മണ്ണിനും അനുയോജ്യമായ വളം, ജലസേചന പദ്ധതി',
    wizardTitle: 'വള കാൽക്കുലേറ്റർ',
    wizardSubtitle: 'വിളയുടെ വിവരങ്ങൾ നൽകി ആവശ്യമായ വളത്തിന്റെ അളവ് കണ്ടെത്തൂ',
    step1Crop: 'വിള തിരഞ്ഞെടുക്കുക',
    step2Land: 'ഭൂമിയുടെ വിസ്തൃതി',
    step3Stage: 'വളർച്ചാ ഘട്ടം',
    step4Soil: 'മണ്ണിന്റെ ഇനം',
    selectCropLabel: 'വിള',
    landAcreageLabel: 'വിസ്തീർണ്ണം (ഏക്കറിൽ)',
    growthStageLabel: 'നിലവിലെ വളർച്ചാ ഘട്ടം',
    soilTypeLabel: 'മണ്ണിന്റെ ഇനം',
    generatePlanBtn: 'വള പദ്ധതി തയ്യാറാക്കുക',
    generatedPlanTitle: 'നിർദ്ദേശിച്ച വള പദ്ധതി',
    npkDosagePerAcre: 'ഏക്കറിന് ആവശ്യമായ NPK വളം',
    nitrogen: 'നൈട്രജൻ (N)',
    phosphorus: 'ഫോസ്ഫറസ് (P)',
    potassium: 'പൊട്ടാഷ് (K)',
    applicationSchedule: 'വളം നൽകുന്ന രീതി',
    organicEnhancers: 'ജൈവ പോഷകങ്ങൾ',
    irrigationSchedule: 'നനയ്ക്കൽ രീതി',
    askAgronomistTitle: 'കൃഷി വിദഗ്ദ്ധനോട് ചോദിക്കാം',
    askAgronomistSubtitle: 'വിള സംരക്ഷണം, വളം, കീടങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള ചോദ്യങ്ങൾ',
    chatPlaceholder: 'നിങ്ങളുടെ ചോദ്യം എഴുതുക (ഉദാ: തക്കാളി പൂ കൊഴിച്ചിൽ എങ്ങനെ തടയാം?)...',
    sendQuestion: 'ചോദിക്കുക',
    aiThinking: 'AI ചിന്തിക്കുന്നു...',

    footerDesc: 'കർഷകർക്കായി 7 ഭാഷകളിൽ വോയ്‌സ് സംഭാഷണം, AI രോഗനിർണയം, കൃത്യമായ കാലാവസ്ഥ, വള പരിപാലനം എന്നിവ നൽകുന്ന വേദി.',
    quickLinks: 'പ്രധാന ലിങ്കുകൾ',
    kisanCallCenter: 'കിസാൻ കോൾ സെന്റർ (സൗജന്യം)',
    emergencyHelpline: 'അടിയന്തിര കാർഷിക ഹെൽപ്പ്‌ലൈൻ',
    tollFree: 'ടോൾ ഫ്രീ: 1800-180-1551',
    copyright: '© 2026 അഗ്രിപൾസ് AI. കർഷക ക്ഷേമത്തിനായി സമർപ്പിക്കുന്നു.',
    advisoryDisclaimer: 'പ്രധാന അറിയിപ്പ്: അഗ്രിപൾസ് AI നൽകുന്ന വിവരങ്ങൾ പ്രാഥമിക മാർഗ്ഗനിർദ്ദേശങ്ങൾ മാത്രമാണ്. രാസവസ്തുക്കൾ ഉപയോഗിക്കുന്നതിന് മുൻപ് കൃഷി വിജ്ഞാന കേന്ദ്രവുമായി (KVK) ബന്ധപ്പെടുക.',
  },

  Marathi: {
    appName: 'ॲग्रीपल्स',
    appSubtitle: 'स्मार्ट शेती व्यवस्थापन आणि पीक संरक्षण',
    farmEdition: 'शेतकरी आवृत्ती',
    navDashboard: 'डॅशबोर्ड',
    navVoice: 'व्हॉइस असिस्टंट',
    navDisease: 'पीक रोग निदान',
    navCrops: 'पीक मार्गदर्शिका',
    navWeather: 'हवामान आणि फवारणी',
    navRecommendations: 'शेती सल्ला',
    aiActive: 'AI सक्रिय आहे',
    languageSelect: 'भाषा निवडा',
    languageSelectPrompt: 'तुमची पसंतीची भाषा निवडा',

    greetingFarmer: 'नमस्कार, शेतकरी मित्र',
    heroSubtext: 'तुमची स्मार्ट AI कृषी मैत्रीण सज्ज आहे. मराठीत बोला, पिकांवरील रोग ओळखा, फवारणीची योग्य वेळ जाणून घ्या आणि खतांचे अचूक नियोजन मिळवा.',
    talkToVoiceAI: 'व्हॉइस असिस्टंटशी बोला',
    scanLeafPhoto: 'पानाचा फोटो स्कॅन करा',
    quickMetrics: 'शेताची मुख्य माहिती',
    fieldReadiness: 'शेतकामासाठी अनुकूलता',
    fieldReadinessOptimal: 'मशागतीसाठी अत्यंत योग्य',
    soilMoistureStatus: 'मातीतील ओलावा',
    soilMoistureAdequate: 'पुरेसा ओलावा (68%)',
    activeCropSeason: 'सध्याचा पीक हंगाम',
    seasonKharif: 'खरीप / उन्हाळी पिके',
    activeAlerts: 'हवामान इशारे',
    noCriticalAlerts: 'कोणताही गंभीर इशारा नाही',
    coreModulesTitle: 'मुख्य कृषी विभाग',
    coreModulesSubtitle: 'व्हॉइस संवाद, रोग निदान, हवामान आणि पीक नियोजन',

    cardVoiceTitle: 'व्हॉइस असिस्टंट',
    cardVoiceBadge: 'बहुभाषिक AI व्हॉइस',
    cardVoiceDesc: 'मराठीत सहज बोला. पानांवरील डाग, खते किंवा हवामानाबद्दल विचारा.',
    cardVoiceAction: 'संभाषण सुरू करा',

    cardDiseaseTitle: 'पीक रोग निदान',
    cardDiseaseBadge: 'AI डॉक्टर',
    cardDiseaseDesc: 'बाधित पानाचा फोटो अपलोड करा. बुरशी, जिवाणू आणि विषाणू रोग ओळखून सेंद्रिय उपाय सुचवते.',
    cardDiseaseAction: 'पान स्कॅन करा',

    cardCropsTitle: 'पीक माहिती मार्गदर्शिका',
    cardCropsBadge: 'शेती माहिती',
    cardCropsDesc: 'विविध पिकांची लागवड पद्धत, NPK खतांचे प्रमाण, मातीचा pH आणि उत्पादनाची माहिती घ्या.',
    cardCropsAction: 'पिकांची यादी पहा',

    cardWeatherTitle: 'हवामान आणि फवारणी',
    cardWeatherBadge: 'हवामान रडार',
    cardWeatherDesc: '7 दिवसांचे हवामान, औषध फवारणीसाठी योग्य वेळ आणि पावसाची शक्यता.',
    cardWeatherAction: 'हवामान पहा',

    cardAdvisoryTitle: 'शेती सल्ला',
    cardAdvisoryBadge: 'स्मार्ट प्लॅनर',
    cardAdvisoryDesc: 'पीक आणि जमिनीनुसार खतांचे योग्य प्रमाण, पाणी व्यवस्थापन आणि AI कृषी तज्ज्ञांशी संवाद.',
    cardAdvisoryAction: 'नियोजन मिळवा',

    farmChecklistTitle: 'दैनंदिन शेती कामांची यादी',
    farmChecklistSubtitle: 'शेत पाहणी आणि महत्त्वाची कामे',
    completedTasks: 'पूर्ण झालेली कामे',
    taskPending: 'शिल्लक कामे',
    taskCompleted: 'पूर्ण झाले',
    addTask: 'नवीन काम जोडा',
    taskHighPriority: 'अति महत्त्वाचे',
    taskMediumPriority: 'मध्यम',
    taskLowPriority: 'सामान्य',

    recentScansTitle: 'अलीकडील रोग चाचण्या',
    recentScansSubtitle: 'तुम्ही स्कॅन केलेल्या पानांचा इतिहास',
    noScansYet: 'अद्याप कोणतेही स्कॅन केलेले नाही',
    viewAllScans: 'सर्व स्कॅन पहा',
    confidence: 'अचूकता',
    viewDetails: 'पूर्ण माहिती',

    voiceAssistantTitle: 'किसान व्हॉइस असिस्टंट',
    voiceAssistantSubtitle: '7 भारतीय भाषांमध्ये शेतकऱ्यांसाठी व्हॉइस सहाय्यक',
    voiceBadge: 'महिला AI आवाज',
    audioOn: 'ऑडिओ चालू',
    audioMuted: 'म्यूट',
    newChat: 'नवीन संभाषण',
    tryAsking: 'असे विचारू शकता:',
    listeningStatus: 'ऐकत आहे...',
    pressAndSpeak: 'माइक दाबून बोला',
    listeningNow: 'ऐकत आहे...',
    typePlaceholder: 'तुमचा प्रश्न येथे टाइप करा...',
    aiSpeaking: 'AI उत्तर देत आहे...',
    stopAudio: 'ऑडिओ थांबवा',
    listenAgain: 'ऐका',
    attachLeafPhoto: 'पानाचा फोटो जोडा',
    leafPhotoReady: 'पानाचा फोटो तयार आहे',
    farmerLabel: 'शेतकरी',
    aiLabel: 'ॲग्रीपल्स AI असिस्टंट',
    fullDiagnosisTool: 'संपूर्ण रोग निदान साधन',
    disclaimerVoice: 'प्राथमिक सल्ला: हे AI आधारित प्राथमिक मूल्यांकन आहे. रसायनांचा वापर करण्यापूर्वी कृषी अधिकाऱ्यांचा सल्ला घ्या.',

    diseaseTitle: 'AI पीक रोग निदान',
    diseaseSubtitle: 'बाधित पानाचा फोटो अपलोड करा आणि त्वरित प्राथमिक विश्लेषण मिळवा',
    uploadDropzoneTitle: 'पानाचा फोटो येथे ड्रॅग करा किंवा अपलोड करा',
    uploadDropzoneSubtitle: 'स्पष्ट फोटो निवडा (JPEG, PNG, WebP)',
    useCamera: 'कॅमेऱ्याने फोटो काढा',
    orSelectSample: 'किंवा नमुना पानांची चाचणी घ्या:',
    sampleLeavesTitle: 'चाचणीसाठी नमुना पाने',
    cropHintLabel: 'पिकाचे नाव (ऐच्छिक)',
    cropHintPlaceholder: 'उदा. टोमॅटो, भात, कापूस, मिरची...',
    analyzeButton: 'पानाचे विश्लेषण करा',
    analyzingButton: 'AI विश्लेषण करत आहे...',
    stepPreprocessing: 'फोटोची गुणवत्ता तपासली जात आहे...',
    stepFeatureExtraction: 'पानावरील डाग ओळखले जात आहेत...',
    stepPathogenMatching: 'रोगाच्या लक्षणांची जुळवाजुळव होत आहे...',
    stepRemedies: 'सेंद्रिय आणि रासायनिक उपाय तयार केले जात आहेत...',
    healthyLeaf: 'निरोगी पान',
    infectedLeaf: 'रोगग्रस्त पान',
    pathogenType: 'रोगकारक प्रकार',
    severityLabel: 'तीव्रता पातळी',
    symptomsTitle: 'मुख्य रोग लक्षणे',
    immediateActionsTitle: 'त्वरित करण्याचे उपाय',
    organicTreatmentsTitle: 'सेंद्रिय आणि देशी उपाय',
    chemicalTreatmentsTitle: 'रासायनिक नियंत्रण',
    preventionTitle: 'भविष्यातील प्रतिबंधात्मक काळजी',
    preliminaryNotice: 'टीप: हे केवळ AI आधारित प्राथमिक मूल्यांकन आहे. औषध फवारणीपूर्वी कृषी तज्ज्ञांचा सल्ला घ्या.',
    scanAnotherLeaf: 'दुसरे पान स्कॅन करा',
    selectImageFirstError: 'कृपया आधी पानाचा फोटो अपलोड करा किंवा नमुना निवडा.',
    invalidImageError: 'कृपया वैध इमेज फाइल निवडा (JPEG, PNG किंवा WebP).',

    cropCatalogTitle: 'संपूर्ण पीक माहिती कोष',
    cropCatalogSubtitle: 'लागवड पद्धती, खत व्यवस्थापन आणि काढणीची लक्षणे',
    searchCropPlaceholder: 'पीक शोधा (उदा. भात, टोमॅटो, कापूस)...',
    allCategories: 'सर्व प्रकार',
    catCereals: 'धान्य पिके',
    catVegetables: 'भाजीपाला',
    catFruits: 'फळपिके',
    catCashCrops: 'नगदी पिके',
    catPulses: 'कडधान्ये',
    catOilseeds: 'तेलबिया',
    allSeasons: 'सर्व हंगाम',
    growthDuration: 'पिकाचा कालावधी',
    waterRequirement: 'पाण्याची गरज',
    soilPh: 'मातीचा pH',
    optimalTemp: 'योग्य तापमान',
    npkRatio: 'NPK खतांचे प्रमाण',
    harvestIndicators: 'काढणीची लक्षणे',
    viewCropGuide: 'संपूर्ण माहिती',
    diagnoseThisCrop: 'या पिकाची चाचणी करा',
    cropDetailsTitle: 'पीक लागवड सविस्तर माहिती',
    seedRate: 'बियाणे प्रमाण',
    spacing: 'झाडांमधील अंतर',
    fertilizerSchedule: 'खत देण्याची वेळ',
    commonPests: 'मुख्य किडी',
    commonDiseases: 'मुख्य रोग',
    averageYield: 'सरासरी उत्पादन',
    expertTips: 'तज्ज्ञांचा सल्ला',
    close: 'बंद करा',

    weatherTitle: 'कृषी हवामान आणि फवारणी रडार',
    weatherSubtitle: 'स्थानिक हवामान, फवारणीसाठी योग्य वेळ आणि मातीतील ओलावा',
    selectFarmLocation: 'ठिकाण निवडा',
    currentConditions: 'सध्याचे हवामान',
    sprayingFeasibility: 'फवारणीसाठी अनुकूलता',
    sprayingOptimal: 'फवारणीसाठी अत्यंत योग्य',
    sprayingCaution: 'सावधगिरी - मध्यम परिस्थिती',
    sprayingPoor: 'फवारणी करू नका - प्रतिकूल हवामान',
    irrigationAdvisory: 'पाणी व्यवस्थापन सल्ला',
    irrigationAdviseIrrigate: 'आज पाणी द्या',
    irrigationAdviseHold: 'पाणी देणे थांबवा (पावसाची शक्यता)',
    irrigationAdviseNormal: 'नेहमीप्रमाणे पाणी द्या',
    diseaseRiskTitle: 'बुरशीजन्य रोगांचा धोका',
    diseaseRiskLow: 'कमी धोका',
    diseaseRiskModerate: 'मध्यम धोका',
    diseaseRiskHigh: 'अधिक बुरशी आणि कीड धोका',
    fieldWorkSuitability: 'शेतकामासाठी अनुकूलता',
    soilTempMoisture: 'मातीचे तापमान आणि ओलावा',
    soilMoistureLabel: 'मातीतील ओलावा',
    soilTempLabel: 'मातीचे तापमान',
    windSpeed: 'वाऱ्याचा वेग',
    humidity: 'हवेतील आर्द्रता',
    rainChance: 'पावसाची शक्यता',
    uvIndex: 'UV निर्देशांक',
    dewPoint: 'दव बिंदू',
    hourlyForecast: 'तासनिहाय हवामान',
    sevenDaySprayRadar: '7 दिवसांचा फवारणी रडार',

    advisoryTitle: 'स्मार्ट शेती सल्लागार',
    advisorySubtitle: 'पीक आणि जमिनीनुसार खत आणि पाण्याचे अचूक नियोजन',
    wizardTitle: 'खत गणकयंत्र',
    wizardSubtitle: 'तुमच्या पिकाची माहिती नोंदवून योग्य खतांचे प्रमाण जाणून घ्या',
    step1Crop: 'पीक निवडा',
    step2Land: 'जमीन क्षेत्र',
    step3Stage: 'पिकाची वाढीची अवस्था',
    step4Soil: 'मातीचा प्रकार',
    selectCropLabel: 'पीक',
    landAcreageLabel: 'क्षेत्र (एकरमध्ये)',
    growthStageLabel: 'सध्याची वाढीची अवस्था',
    soilTypeLabel: 'मातीचा प्रकार',
    generatePlanBtn: 'खत नियोजन तयार करा',
    generatedPlanTitle: 'शिफारस केलेले खत नियोजन',
    npkDosagePerAcre: 'प्रति एकर आवश्यक NPK खत',
    nitrogen: 'नायट्रोजन (N)',
    phosphorus: 'फॉस्फरस (P)',
    potassium: 'पोटॅश (K)',
    applicationSchedule: 'खत देण्याची पद्धत',
    organicEnhancers: 'सेंद्रिय आणि जिवाणू खते',
    irrigationSchedule: 'पाणी देण्याचे वेळापत्रक',
    askAgronomistTitle: 'कृषी तज्ज्ञांना विचारा',
    askAgronomistSubtitle: 'पीक संरक्षण, खत किंवा किडींविषयी कोणतेही प्रश्न विचारा',
    chatPlaceholder: 'तुमचा प्रश्न लिहा (उदा. टोमॅटोची फुलगळ कशी थांबवावी?)...',
    sendQuestion: 'सल्ला विचारा',
    aiThinking: 'AI विचार करत आहे...',

    footerDesc: 'शेतकऱ्यांसाठी 7 भाषांमध्ये व्हॉइस संवाद, AI रोग निदान, अचूक हवामान आणि खत व्यवस्थापनाचे विश्वासू व्यासपीठ.',
    quickLinks: 'महत्त्वाच्या लिंक्स',
    kisanCallCenter: 'किसान कॉल सेंटर (टोल फ्री)',
    emergencyHelpline: 'आपत्कालीन शेतकरी हेल्पलाइन',
    tollFree: 'टोल फ्री: 1800-180-1551',
    copyright: '© 2026 ॲग्रीपल्स AI. शेतकरी समृद्धीसाठी समर्पित.',
    advisoryDisclaimer: 'महत्त्वाची सूचना: ॲग्रीपल्स AI द्वारे दिलेली माहिती प्राथमिक स्वरूपाची आहे. रासायनिक औषधांचा वापर करण्यापूर्वी कृषी विज्ञान केंद्राशी (KVK) संपर्क साधा.',
  },
};

export const getTranslation = (lang: SupportedLanguage): Translations => {
  return TRANSLATIONS[lang] || TRANSLATIONS.Telugu;
};
