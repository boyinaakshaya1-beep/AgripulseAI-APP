export interface DiseaseDetectionResult {
  cropName: string;
  diseaseName: string;
  isHealthy: boolean;
  confidenceScore: number;
  severity: 'Low' | 'Moderate' | 'High' | 'None' | string;
  pathogenType: string;
  symptoms: string[];
  causes?: string[];
  immediateActions: string[];
  organicTreatments: string[];
  chemicalTreatments: string[];
  preventionSteps: string[];
  recoveryTime?: string;
  disclaimer: string;
  imageUrl?: string;
  timestamp?: string;
  source?: string;
}

export interface SampleLeaf {
  id: string;
  title: string;
  crop: string;
  disease: string;
  imageUrl: string;
  description: string;
  severity: 'Low' | 'Moderate' | 'High' | 'None' | string;
}

export interface CropInfo {
  id: string;
  name: string;
  botanicalName: string;
  family: string;
  category: 'Cereals' | 'Vegetables' | 'Fruits' | 'Cash Crops' | 'Pulses & Legumes' | 'Oilseeds' | string;
  season: 'Kharif / Monsoon' | 'Rabi / Winter' | 'Zaid / Summer' | 'Year-Round' | string;
  optimalTemp: string;
  rainfall: string;
  soilType: string;
  soilPh: string;
  waterRequirement: string;
  growthDuration: string;
  seedRate: string;
  spacing: string;
  fertilizerSchedule: {
    basal: string;
    vegetative: string;
    flowering: string;
    npkRatio: string;
  };
  commonPests: string[];
  commonDiseases: string[];
  harvestIndicators: string[];
  averageYield: string;
  marketPriceRange: string;
  imageUrl: string;
  description: string;
  tips: string[];
}

export interface WeatherCondition {
  location: string;
  region: string;
  tempC: number;
  tempF: number;
  condition: string;
  iconName: string;
  humidity: number;
  precipitationChance: number;
  rainfallMm: number;
  windSpeedKmh: number;
  windDirection: string;
  uvIndex: number;
  soilTempC: number;
  soilMoisturePercent: number;
  evapotranspiration: string;
  dewPointC: number;
  advisories: {
    sprayingCondition: 'Optimal' | 'Moderate' | 'Poor - Avoid Spraying' | string;
    sprayingReason: string;
    irrigationAdvice: 'Irrigate Today' | 'Hold Irrigation (Rain Expected)' | 'Normal Routine' | string;
    irrigationReason: string;
    diseaseRisk: 'Low Risk' | 'Moderate Fungal Risk' | 'High Fungal & Pest Risk' | string;
    diseaseReason: string;
    fieldWorkSuitability: 'Excellent for Tillage' | 'Moderate' | 'Field too wet' | string;
  };
  forecast: DailyForecast[];
  hourly: HourlyForecast[];
  alerts?: {
    type: 'warning' | 'info' | 'critical';
    title: string;
    message: string;
    action: string;
  }[];
}

export interface DailyForecast {
  day: string;
  date: string;
  tempMaxC: number;
  tempMinC: number;
  tempMaxF: number;
  tempMinF: number;
  condition: string;
  icon: string;
  rainChance: number;
  spraySuitability: 'Optimal' | 'Caution' | 'Unsuitable' | string;
  irrigationAction: 'Irrigate' | 'Hold' | 'Normal' | string;
}

export interface HourlyForecast {
  time: string;
  tempC: number;
  tempF: number;
  rainChance: number;
  humidity: number;
  icon: string;
}

export interface FarmTask {
  id: string;
  title: string;
  crop: string;
  category: 'Irrigation' | 'Fertilization' | 'Scouting' | 'Spraying' | 'Harvest';
  priority: 'High' | 'Medium' | 'Low';
  timeEstimate: string;
  completed: boolean;
  notes: string;
}

export interface ScanHistoryRecord extends DiseaseDetectionResult {
  id: string;
  date: string;
  thumbnailUrl: string;
}

export type SupportedLanguage = 'Telugu' | 'Hindi' | 'English' | 'Tamil' | 'Kannada' | 'Malayalam' | 'Marathi';

export interface LanguageConfig {
  id: SupportedLanguage;
  name: string;
  nativeName: string;
  locale: string;
  greetingText: string;
  greetingSpoken: string;
  sampleQuestions: string[];
}

export interface VoiceChatMessage {
  id: string;
  sender: 'farmer' | 'assistant';
  text: string;
  timestamp: string;
  imageUrl?: string;
  isSpoken?: boolean;
  suggestPhoto?: boolean;
}

// ==========================================
// 1. 🌱 SOIL HEALTH ANALYSIS TYPES
// ==========================================
export type SoilHealthStatus = 'healthy' | 'attention' | 'poor';
export type SoilAnalysisMode = 'simple' | 'advanced';

export type SimpleSoilType = 
  | 'red' 
  | 'black' 
  | 'sandy' 
  | 'sandy-loam' 
  | 'loamy' 
  | 'clay' 
  | 'unknown';

export type SimpleSoilCondition = 
  | 'very-dry' 
  | 'slightly-dry' 
  | 'normal' 
  | 'wet' 
  | 'waterlogged';

export type SimpleIrrigation = 'low' | 'medium' | 'high';

export type SimpleVisibleProblem = 
  | 'none' 
  | 'very-dry' 
  | 'waterlogging' 
  | 'poor-growth' 
  | 'nutrient-deficiency' 
  | 'other';

export interface SimpleSoilInput {
  soilType: SimpleSoilType;
  currentCrop: string;
  soilCondition: SimpleSoilCondition;
  irrigation: SimpleIrrigation;
  previousCrop: string;
  visibleProblem: SimpleVisibleProblem;
}

export interface SimpleSoilAssessmentResult {
  status: SoilHealthStatus;
  statusLabel: string;
  score: number; // 0 to 100
  assessmentTitle: string;
  conditionSummary: string;
  possibleConcerns: string[];
  generalRecommendations: string[];
  suitableCrops: string[];
  disclaimer: string;
  isPreliminary: boolean;
}

export interface SoilHealthInput {
  soilType: string;
  ph: number;
  nitrogen: 'Low' | 'Medium' | 'High';
  phosphorus: 'Low' | 'Medium' | 'High';
  potassium: 'Low' | 'Medium' | 'High';
  moisture: number; // 0 - 100%
  organicMatter?: number; // e.g. 0.65%
  crop: string;
  isDemoData?: boolean;
}

export interface SoilHealthResult {
  status: SoilHealthStatus;
  statusLabel: string;
  score: number; // 0 to 100
  summary: string;
  nutrientStatus: {
    nitrogen: { level: string; status: 'optimal' | 'low' | 'high'; advice: string };
    phosphorus: { level: string; status: 'optimal' | 'low' | 'high'; advice: string };
    potassium: { level: string; status: 'optimal' | 'low' | 'high'; advice: string };
    ph: { value: number; classification: string; impact: string };
    organicMatter: { value: number; status: string; advice: string };
    moisture: { value: number; status: string; advice: string };
  };
  concerns: string[];
  managementSuggestions: string[];
  suitableCrops: string[];
  isDemoData: boolean;
}

// ==========================================
// 📍 LOCATION TYPES
// ==========================================
export interface FarmLocationState {
  stateId: string;
  districtId: string;
  mandal: string;
  village: string;
  isAutoDetected: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// ==========================================
// 2. 🐛 PEST & DISEASE ALERTS TYPES
// ==========================================
export interface PestAlertItem {
  id: string;
  crop: string;
  pestOrDiseaseName: string;
  scientificName?: string;
  type: 'Pest' | 'Fungal Disease' | 'Bacterial Disease' | 'Viral Disease' | 'Nutritional Deficiency' | string;
  riskLevel: 'Low' | 'Medium' | 'High';
  alertStatus: 'Active Alert' | 'Regional Advisory' | 'Seasonal Watch' | string;
  symptoms: string[];
  suggestedNextSteps: string[];
  preventionPractices: string[];
  affectedParts: string[];
  regionalArea?: string;
  isSampleAlert?: boolean;
  reportedDate?: string;
}

export interface PestAlertInput {
  crop: string;
  symptoms: string[];
  customDescription?: string;
  imageUrl?: string;
}

export interface PestAlertResult {
  matchedAlerts: PestAlertItem[];
  primaryDiagnosis: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  symptomsSummary: string[];
  suggestedNextSteps: string[];
  preventionPractices: string[];
  alertStatus: string;
  disclaimer: string;
  isDemoData: boolean;
}

// ==========================================
// 3. 📊 HISTORICAL FARM ANALYSIS TYPES
// ==========================================
export interface FarmHistoryRecord {
  id: string;
  year: number;
  season: 'Kharif' | 'Rabi' | 'Zaid' | string;
  crop: string;
  yieldApprox: string;
  yieldRating: 'Good' | 'Average' | 'Poor';
  majorPestOrDisease: string;
  irrigationMethod: 'Drip' | 'Borewell / Flood' | 'Canal' | 'Rainfed' | 'Sprinkler' | string;
  soilObservations: string;
  farmNotes: string;
  isDemoData?: boolean;
}

export interface FarmHistoryAnalysis {
  totalSeasonsRecorded: number;
  topPerformingCrops: string[];
  recurringPests: { name: string; count: number; affectedYears: string[] }[];
  soilTrends: string[];
  importantPatterns: string[];
  suggestedFutureAdjustments: string[];
}

// ==========================================
// 4. 🔄 SMART CROP ROTATION TYPES
// ==========================================
export interface CropRotationInput {
  currentCrop: string;
  soilType: string;
  season: string;
  waterAvailability: 'Abundant / Canal' | 'Moderate / Borewell' | 'Limited / Rainfed' | 'Drip Protected' | string;
  farmLocation?: string;
  previousPestIssue?: string;
}

export interface CropRotationSeason {
  seasonNumber: number;
  seasonName: string;
  suggestedCrop: string;
  cropFamily: string;
  purpose: string;
  rationale: string;
  nutrientContribution: string;
  waterRequirement: string;
}

export interface CropRotationPlan {
  currentCrop: string;
  seasons: CropRotationSeason[];
  whySuggested: string[];
  cropDiversityBenefits: string[];
  soilNutrientManagement: string[];
  potentialBenefits: string[];
  cautions: string[];
  disclaimer: string;
}

