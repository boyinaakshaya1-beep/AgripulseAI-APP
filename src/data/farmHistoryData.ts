import { FarmHistoryRecord, FarmHistoryAnalysis, SupportedLanguage } from '../types';

export const INITIAL_DEMO_FARM_HISTORY: FarmHistoryRecord[] = [
  {
    id: 'hist-2024-kharif',
    year: 2024,
    season: 'Kharif',
    crop: 'Tomato',
    yieldApprox: '24 Tonnes / Acre',
    yieldRating: 'Good',
    majorPestOrDisease: 'Early Blight (ముందస్తు ఆకుమచ్చ తెగులు - Moderate)',
    irrigationMethod: 'Drip',
    soilObservations: 'Good moisture retention; humus layer healthy after organic manuring.',
    farmNotes: 'Applied 5 tonnes Farmyard Manure (FYM) before planting. High market price obtained in early October.',
    isDemoData: true,
  },
  {
    id: 'hist-2025-rabi',
    year: 2025,
    season: 'Rabi',
    crop: 'Chilli',
    yieldApprox: '14 Quintals / Acre',
    yieldRating: 'Average',
    majorPestOrDisease: 'Thrips & Leaf Curl (తామర పురుగులు & ఆకు ముడత)',
    irrigationMethod: 'Drip',
    soilObservations: 'Slight compaction noticed during harvest; low potassium deficiency symptoms on outer leaf rims.',
    farmNotes: 'Severe dry spell in January increased thrips population. Blue sticky traps helped control flying pests.',
    isDemoData: true,
  },
  {
    id: 'hist-2026-kharif',
    year: 2026,
    season: 'Kharif',
    crop: 'Tomato',
    yieldApprox: '18 Tonnes / Acre',
    yieldRating: 'Average',
    majorPestOrDisease: 'Early Blight & Bacterial Spot (ఆకుమచ్చ మరియు బ్యాక్టీరియా మచ్చ)',
    irrigationMethod: 'Drip',
    soilObservations: 'Continuous solanaceous cropping increased soil-borne fungal spore load.',
    farmNotes: 'Frequent monsoon rains in August triggered rapid fungal spread. Repeated tomato planting in same plot showed disease recurrence.',
    isDemoData: true,
  },
];

export function analyzeFarmHistory(
  records: FarmHistoryRecord[],
  language: SupportedLanguage = 'Telugu'
): FarmHistoryAnalysis {
  const isTelugu = language === 'Telugu';

  if (!records || records.length === 0) {
    return {
      totalSeasonsRecorded: 0,
      topPerformingCrops: [],
      recurringPests: [],
      soilTrends: [isTelugu ? 'ఇంతవరకు ఎలాంటి రికార్డులు నమోదు కాలేదు.' : 'No historical records logged yet.'],
      importantPatterns: [],
      suggestedFutureAdjustments: [],
    };
  }

  // Count crops & ratings
  const cropPerformance: Record<string, { good: number; total: number }> = {};
  const pestOccurrences: Record<string, { count: number; years: string[] }> = {};

  records.forEach((rec) => {
    if (!cropPerformance[rec.crop]) {
      cropPerformance[rec.crop] = { good: 0, total: 0 };
    }
    cropPerformance[rec.crop].total += 1;
    if (rec.yieldRating === 'Good') {
      cropPerformance[rec.crop].good += 1;
    }

    if (rec.majorPestOrDisease && rec.majorPestOrDisease !== 'None' && rec.majorPestOrDisease !== 'లేవు') {
      const pestKey = rec.majorPestOrDisease;
      if (!pestOccurrences[pestKey]) {
        pestOccurrences[pestKey] = { count: 0, years: [] };
      }
      pestOccurrences[pestKey].count += 1;
      pestOccurrences[pestKey].years.push(`${rec.year} (${rec.season})`);
    }
  });

  const topPerformingCrops = Object.entries(cropPerformance)
    .sort((a, b) => b[1].good / b[1].total - a[1].good / a[1].total)
    .map(([crop]) => crop);

  const recurringPests = Object.entries(pestOccurrences).map(([name, data]) => ({
    name,
    count: data.count,
    affectedYears: data.years,
  }));

  // Detected Patterns
  const importantPatterns: string[] = [];
  const solanaceousCrops = ['Tomato', 'Chilli', 'Brinjal', 'Potato', 'టమాటా', 'మిరప', 'వంకాయ', 'బంగాళాదుంప'];
  const hasContinuousSolanaceae =
    records.filter((r) => solanaceousCrops.some((sc) => r.crop.toLowerCase().includes(sc.toLowerCase()))).length >= 2;

  if (hasContinuousSolanaceae) {
    importantPatterns.push(
      isTelugu
        ? 'వరుసగా ఒకే కుటుంబానికి చెందిన పంటలు (టమాటా / మిరప) వేయడం వల్ల నేలలో ఆకుమచ్చ శిలీంధ్ర బీజాలు (Alternaria) మరియు తామర పురుగుల తీవ్రత పునరావృతమైంది.'
        : 'Continuous cultivation of Solanaceous crops (Tomato & Chilli) led to recurring fungal spore build-up and elevated thrips pressure.'
    );
  }

  const dripRecords = records.filter((r) => r.irrigationMethod.toLowerCase().includes('drip'));
  if (dripRecords.length >= 2) {
    importantPatterns.push(
      isTelugu
        ? 'బిందు సేద్యం (Drip Irrigation) ఉపయోగించిన కాలాల్లో నీటి వినియోగ సామర్థ్యం మరియు స్థిరమైన దిగుబడి నమోదు అయింది.'
        : 'Consistent use of Drip Irrigation delivered superior water-use efficiency and stable yields compared to flood watering.'
    );
  }

  importantPatterns.push(
    isTelugu
      ? 'సేంద్రీయ ఎరువులు (FYM) వేసిన 2024 ఖరీఫ్ సీజన్లో అత్యుత్తమ దిగుబడి (24 టన్నులు/ఎకరం) మరియు నేల నాణ్యత నమోదైంది.'
      : 'Highest yield (24 Tonnes/Acre) was correlated with basal FYM application during the 2024 season.'
  );

  // Soil trends
  const soilTrends = isTelugu
    ? [
        'సేంద్రీయ ఎరువులు క్రమం తప్పకుండా వేసినప్పుడు నేల తేమ నిలుపుదల సామర్థ్యం పెరిగింది.',
        'రసాయన ఎరువుల ఏకపక్ష వినియోగం వల్ల కొన్ని కాలాల్లో పొటాష్ మరియు జింక్ లోపాలు కనిపించాయి.',
        'పచ్చిరొట్ట ఎరువులు వేయడం లేదా పప్పుధాన్యాల పంట మార్పిడి నేల జీవ చైతన్యాన్ని పునరుద్ధరిస్తుంది.',
      ]
    : [
        'Soil organic matter and moisture retention were highest in seasons following organic manure additions.',
        'Minor secondary compaction and potassium stress noted during intense harvesting periods.',
        'Soil biological activity benefits substantially when green manuring or pulse succession is adopted.',
      ];

  // Suggested Future Adjustments
  const suggestedFutureAdjustments = isTelugu
    ? [
        'తదుపరి పంటగా పప్పుధాన్యాలు (మినుము, పెసర లేదా శనగ) లేదా మొక్కజొన్నను ఎంపిక చేసి నేల సారాన్ని పెంచండి.',
        'శిలీంధ్రాల వ్యాప్తిని అరికట్టడానికి టమాటా, మిరప కాకుండా ఇతర కుటుంబాల పంటలతో 2 సంవత్సరాల మార్పిడి ప్రణాళికను అమలు చేయండి.',
        'దుక్కి తయారీ సమయంలో ఎకరానికి 250 కిలోల వేప పిండి వేసి నేలలోని పురుగుల గుడ్లు, నిమటోడ్లను నివారించండి.',
      ]
    : [
        'Rotate next season to a Legume crop (Black gram, Green gram, or Chickpea) or Cereal to replenish nitrogen and break pest cycles.',
        'Avoid planting Tomato or Chilli in this specific plot for at least 2 consecutive seasons.',
        'Incorporate 250 kg/acre Neem cake during basal ploughing to suppress soil-borne fungal inocula and nematodes.',
      ];

  return {
    totalSeasonsRecorded: records.length,
    topPerformingCrops,
    recurringPests,
    soilTrends,
    importantPatterns,
    suggestedFutureAdjustments,
  };
}
