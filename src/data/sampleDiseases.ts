import { DiseaseDetectionResult, SampleLeaf, SupportedLanguage } from '../types';

export const SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'sample-mango-anthracnose',
    title: 'Mango Anthracnose & Blight',
    crop: 'Mango (మామిడి)',
    disease: 'Anthracnose (Colletotrichum gloeosporioides)',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    description: 'Irregular dark brown necrotic lesions, shot-hole perforations on leaves, and blossom dieback.',
    severity: 'High',
  },
  {
    id: 'sample-wheat-rust',
    title: 'Wheat Brown Leaf Rust',
    crop: 'Wheat (గోధుమ)',
    disease: 'Leaf Rust (Puccinia triticina)',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    description: 'Bright orange-brown circular rust pustules scattered on upper leaf surfaces.',
    severity: 'High',
  },
  {
    id: 'sample-rice-blast',
    title: 'Rice Blast Spindle Spot',
    crop: 'Rice / Paddy',
    disease: 'Rice Blast (Pyricularia oryzae)',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80',
    description: 'Spindle-shaped necrotic spots with gray centers and reddish-brown borders on rice blades.',
    severity: 'High',
  },
  {
    id: 'sample-cotton-blight',
    title: 'Cotton Bacterial Blight',
    crop: 'Cotton',
    disease: 'Bacterial Blight / Angular Leaf Spot (Xanthomonas albilineans / malvacearum)',
    imageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80',
    description: 'Angular water-soaked lesions bounded by leaf veins turning dark brown and causing blackarm on stems.',
    severity: 'High',
  },
  {
    id: 'sample-chili-bacterial-spot',
    title: 'Chili Bacterial Leaf Spot',
    crop: 'Chili / Pepper',
    disease: 'Bacterial Leaf Spot (Xanthomonas campestris)',
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    description: 'Small, dark brown water-soaked lesions with yellow halos causing extensive defoliation and fruit spots.',
    severity: 'High',
  },
  {
    id: 'sample-corn-blight',
    title: 'Corn Northern Leaf Blight',
    crop: 'Maize / Corn',
    disease: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    description: 'Long elliptical cigar-shaped lesions on maize foliage causing premature canopy dieback.',
    severity: 'Moderate',
  },
  {
    id: 'sample-potato-late-blight',
    title: 'Potato Late Blight',
    crop: 'Potato',
    disease: 'Late Blight (Phytophthora infestans)',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    description: 'Dark water-soaked lesions spreading rapidly from leaf margins with white downy sporulation.',
    severity: 'High',
  },
  {
    id: 'sample-tomato-early-blight',
    title: 'Tomato Leaf Blight',
    crop: 'Tomato',
    disease: 'Early Blight (Alternaria solani)',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    description: 'Characteristic concentric bullseye rings and yellow halo on lower tomato leaves.',
    severity: 'Moderate',
  },
  {
    id: 'sample-healthy-rice',
    title: 'Healthy Rice Crop',
    crop: 'Rice / Paddy',
    disease: 'Healthy Crop (No Disease Detected)',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    description: 'Lush, upright emerald green paddy blades with vigorous tillering and zero pathogen lesions.',
    severity: 'None',
  },
  {
    id: 'sample-healthy-cotton',
    title: 'Healthy Cotton Plant',
    crop: 'Cotton',
    disease: 'Healthy Crop (No Disease Detected)',
    imageUrl: 'https://images.unsplash.com/photo-1594488555231-1554a9386d38?auto=format&fit=crop&w=600&q=80',
    description: 'Broad, vigorous deep green palmate leaves free from sucking pests, aphids, or bacterial blight.',
    severity: 'None',
  },
  {
    id: 'sample-healthy-tomato',
    title: 'Healthy Tomato Leaf',
    crop: 'Tomato',
    disease: 'Healthy Crop (No Disease Detected)',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80',
    description: 'Vibrant green, uniform leaf tissue with robust veins and no chlorosis or fungal lesions.',
    severity: 'None',
  },
];

export const SAMPLE_DETECTIONS_DB: Record<string, DiseaseDetectionResult> = {
  'sample-mango-anthracnose': {
    cropName: 'Mango (Mangifera indica)',
    diseaseName: 'Mango Anthracnose & Blossom Blight (Colletotrichum gloeosporioides)',
    isHealthy: false,
    confidenceScore: 96,
    severity: 'High',
    pathogenType: 'Fungal',
    symptoms: [
      'Oval to irregular dark brown to black necrotic lesions on tender leaves, developing into shot-holes',
      'Blackening, blight, and premature drop of blossom panicles preventing fruit set',
      'Twig dieback with dark necrotic lesions advancing downwards from branch tips',
      'Characteristic tear-stain black lesions on fruit skins during post-harvest ripening',
    ],
    causes: [
      'High ambient humidity (>85%) combined with frequent dew/unseasonal showers during flowering',
      'Dense unpruned canopy restricting sunlight and breeze penetration',
      'Spore dissemination via rain splash and wind',
    ],
    immediateActions: [
      'Prune dead, infected twigs 5 cm into healthy tissue and safely incinerate debris',
      'Paint cut branch surfaces with 1% Bordeaux paste or Copper Oxychloride paste',
      'Ensure canopy aeration through selective branch thinning',
    ],
    organicTreatments: [
      'Spray freshly prepared 1% Bordeaux mixture before panicle emergence',
      'Pseudomonas fluorescens bio-fungicide foliar spray @ 5g / liter of water',
      'Botanical Neem Seed Kernel Extract (NSKE 5%) or cold-pressed neem oil (2 ml/L)',
    ],
    chemicalTreatments: [
      'Hexaconazole 5% SC @ 2.0 ml / liter of water or Carbendazim 50% WP @ 1.0g / liter',
      'Azoxystrobin 23% SC @ 1.0 ml / liter of water',
      'Difenoconazole 25% EC @ 0.5 ml / liter of water',
    ],
    preventionSteps: [
      'Annual post-harvest sanitation pruning to remove overwintering fungal inoculum',
      'Effective control of mango hoppers that puncture leaf tissue and facilitate fungal entry',
      'Maintain clean orchard floor free of fallen infected leaves',
    ],
    recoveryTime: '10 - 15 days following sanitary pruning and systemic fungicide spray',
    disclaimer:
      'This is a preliminary AI assessment and not a guaranteed laboratory diagnosis. Consult your local horticulture extension officer before major chemical application.',
  },
  'sample-wheat-rust': {
    cropName: 'Wheat (Triticum aestivum)',
    diseaseName: 'Wheat Brown Leaf Rust (Puccinia triticina)',
    isHealthy: false,
    confidenceScore: 95,
    severity: 'High',
    pathogenType: 'Fungal Rust',
    symptoms: [
      'Bright orange-brown circular to oval pustules randomly distributed across upper leaf blades',
      'Orange-brown powdery spores rubbing off freely on fingers upon contact',
      'Chlorotic yellowing and premature drying of flag leaves leading to shriveled grains',
    ],
    causes: [
      'Cool to moderate temperatures (15°C - 22°C) with persistent heavy morning dew on leaf surfaces',
      'Windborne transport of rust urediniospores across regional cropping plains',
    ],
    immediateActions: [
      'Initiate targeted fungicide spray immediately upon detecting initial rust foci in the field',
      'Halt late-stage excessive nitrogen top-dressing to prevent succulent tissue growth',
    ],
    organicTreatments: [
      'Trichoderma viride bio-fungicide foliar spray @ 5g / liter of water',
      'Fermented sour buttermilk bio-spray (5% dilution) to create unfavorable leaf pH',
    ],
    chemicalTreatments: [
      'Propiconazole 25% EC (Tilt) @ 1.0 ml / liter of water (gold-standard rust curative)',
      'Tebuconazole 25.9% EC @ 1.0 ml / liter of water',
      'Mancozeb 75% WP @ 2.5g / liter of water',
    ],
    preventionSteps: [
      'Sow certified rust-resistant wheat varieties (HD-2967, DBW-187, GW-322)',
      'Ensure timely November sowing to evade late-season rust temperature windows',
    ],
    recoveryTime: '8 - 12 days following systemic triazole application',
    disclaimer:
      'This is a preliminary AI assessment and not a guaranteed laboratory diagnosis. Consult your local agricultural extension service for regional rust advisories.',
  },
  'sample-rice-blast': {
    cropName: 'Rice / Paddy (Oryza sativa)',
    diseaseName: 'Rice Blast (Magnaporthe oryzae / Pyricularia oryzae)',
    isHealthy: false,
    confidenceScore: 97,
    severity: 'High',
    pathogenType: 'Fungal',
    symptoms: [
      'Diamond / spindle-shaped lesions with whitish-gray centers and distinct reddish-brown margins on leaf blades',
      'Rapid lesion coalescing causing entire leaves to dry, wither, and look burned (foliar blast)',
      'Dark lesions at node junctions (node blast) causing stem lodging and lodging collapse',
      'Rotten neck / neck blast turning panicles grayish-white with completely empty chaffy grains',
    ],
    causes: [
      'High relative humidity (>90%) combined with prolonged night dew periods (>10 hours)',
      'Excessive application of chemical nitrogen (urea) creating soft, succulent leaf tissues',
      'Cloudy overcast skies and mild temperatures (20°C - 26°C / 68°F - 79°F)',
    ],
    immediateActions: [
      'Drain stagnant puddled water immediately and replenish with shallow circulating fresh water',
      'Immediately halt any nitrogen top-dressing until disease symptoms are fully contained',
      'Foliar spray silica nutrition to harden leaf epidermal cells against mycelial penetration',
    ],
    organicTreatments: [
      'Traditional bio-spray of fermented cow urine and asafoetida (10% solution)',
      'Trichoderma harzianum foliar spray @ 5g/liter of water',
      'Botanical neem cake extract 5% applied during early tillering stage',
    ],
    chemicalTreatments: [
      'Tricyclazole 75% WP @ 0.6g / liter of water (gold-standard systemic blast protection)',
      'Isoprothiolane 40% EC @ 1.5 ml / liter of water',
      'Kasugamycin 3% SL @ 2.0 ml / liter of water',
    ],
    preventionSteps: [
      'Treat seeds with Carbendazim (2g/kg) or Trichoderma (10g/kg) before nursery sowing',
      'Apply nitrogen in 3-4 split doses guided strictly by a Leaf Color Chart (LCC)',
      'Maintain 20 cm x 15 cm hill spacing for optimal airflow in puddled fields',
      'Burn or thoroughly incorporate infected stubble after harvest',
    ],
    recoveryTime: '7 - 12 days with blast-targeted fungicide spray',
    disclaimer:
      'This is a preliminary AI assessment and not a guaranteed laboratory diagnosis. For severe or rapidly spreading outbreaks, consult your local agricultural extension service or certified agronomist before large-scale chemical application.',
  },
  'sample-cotton-blight': {
    cropName: 'Cotton (Gossypium hirsutum)',
    diseaseName: 'Bacterial Blight / Angular Leaf Spot (Xanthomonas albilineans / malvacearum)',
    isHealthy: false,
    confidenceScore: 95,
    severity: 'High',
    pathogenType: 'Bacterial',
    symptoms: [
      'Angular, water-soaked translucent lesions strictly bounded by small leaf veinlets',
      'Lesions darken to reddish-brown or black with gummy exudates underneath',
      'Blackarm phase: dark elongated cankers girdling branches and main stem, causing breakage',
      'Water-soaked circular oily spots on developing green bolls causing premature drop',
    ],
    causes: [
      'Seed-borne bacteria or infected volunteer cotton stubbles from prior seasons',
      'High humidity (>85%) and warm temperatures (28°C - 35°C / 82°F - 95°F) with rainstorms',
      'Wind-driven rain and overhead sprinkler irrigation splashing bacterial ooze across plants',
    ],
    immediateActions: [
      'Prune and destroy severely infected blackarm branches with sanitized shears',
      'Cease all overhead watering immediately; use drip lines or furrow irrigation only',
      'Avoid inter-cultivation or handling plants while foliage is wet from morning dew',
    ],
    organicTreatments: [
      'Pseudomonas fluorescens foliar spray @ 10g/liter of water',
      'Copper Oxychloride 50% WP @ 2.5g/L combined with botanical neem oil 0.3%',
      'Garlic and ginger fermented bio-extract wash for antimicrobial suppression',
    ],
    chemicalTreatments: [
      'Copper Oxychloride 50% WP @ 2.5g/L + Streptomycin Sulfate (Plantomycin) @ 0.5g/L tank mix',
      'Kasugamycin 3% SL @ 2.0 ml / liter of water',
      'Copper Hydroxide 53.8% DF @ 2.0g / liter of water',
    ],
    preventionSteps: [
      'Delint and treat cotton seeds with concentrated sulfuric acid and Streptocycline prior to sowing',
      'Rotate crops for at least 2 years with sorghum, maize, or pulses',
      'Destroy all post-harvest cotton stalks thoroughly to break the pathogen survival cycle',
      'Choose resistant Bt cotton hybrids with verified Xanthomonas tolerance',
    ],
    recoveryTime: '8 - 14 days under copper bactericide and streptomycin regimen',
    disclaimer:
      'This is a preliminary AI assessment and not a guaranteed laboratory diagnosis. For severe or rapidly spreading outbreaks, consult your local agricultural extension service or certified agronomist before large-scale chemical application.',
  },
  'sample-chili-bacterial-spot': {
    cropName: 'Chili / Pepper (Capsicum annuum)',
    diseaseName: 'Bacterial Leaf Spot (Xanthomonas campestris pv. vesicatoria)',
    isHealthy: false,
    confidenceScore: 94,
    severity: 'High',
    pathogenType: 'Bacterial',
    symptoms: [
      'Small, circular to angular water-soaked lesions (1-3 mm) on foliage',
      'Lesions darken to chocolate brown with greasy appearance and pale yellow chlorotic halo',
      'Extensive defoliation leaving chili fruits exposed to direct sunscald',
      'Rough, raised blister-like brown scabs on developing green and red chili pods',
    ],
    causes: [
      'Infected seed batches or contaminated transplant nursery trays',
      'Warm temperatures (24°C - 30°C / 75°F - 86°F) combined with high relative humidity (>80%)',
      'Heavy rains and splash dispersal between adjacent crop rows',
    ],
    immediateActions: [
      'Sanitize all harvesting crates, shears, and hands with 10% sanitizing solution',
      'Never enter chili rows when leaves are wet with morning dew or rain',
      'Immediately rogue out and bag severely infected individual seedlings',
    ],
    organicTreatments: [
      'Fixed Copper Fungicide (Copper Oxychloride @ 2.5g/L) mixed with Bacillus subtilis',
      'Hydrogen peroxide / Peracetic acid eco-sanitizer spray @ 2ml/L',
      'Botanical allicin / garlic extract foliar wash',
    ],
    chemicalTreatments: [
      'Copper Hydroxide 53.8% DF @ 2.0g/L + Mancozeb 75% WP @ 2.0g/L (synergistic tank mix)',
      'Streptomycin Sulfate 90% + Tetracycline 10% (Plantomycin) @ 0.5g / liter',
      'Kasugamycin 3% SL @ 2.0 ml / liter of water',
    ],
    preventionSteps: [
      'Use hot-water treated or certified disease-free hybrid chili seeds',
      'Apply drip irrigation beneath reflective plastic mulch to eliminate water splash',
      'Maintain a 2-year rotation away from peppers, tomatoes, and eggplants',
    ],
    recoveryTime: '8 - 14 days under strict copper bactericide regimen',
    disclaimer:
      'This is a preliminary AI assessment and not a guaranteed laboratory diagnosis. For severe or rapidly spreading outbreaks, consult your local agricultural extension service or certified agronomist before large-scale chemical application.',
  },
  'sample-corn-blight': {
    cropName: 'Maize / Corn (Zea mays)',
    diseaseName: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
    isHealthy: false,
    confidenceScore: 93,
    severity: 'Moderate',
    pathogenType: 'Fungal',
    symptoms: [
      'Long, elliptical cigar-shaped lesions (3 to 15 cm long) on middle and lower leaves',
      'Lesions begin as grayish-green areas and mature into tan/brown dead leaf patches',
      'Dark olive sooty spores visible inside the lesions in damp conditions',
      'Severe blighting reduces green leaf area needed for kernel grain filling',
    ],
    causes: [
      'Overwintering fungus in corn debris left on the soil surface from previous harvest',
      'Prolonged leaf wetness (6-18 hours) with temperatures between 18°C and 27°C',
      'Planting non-resistant hybrids in continuous corn monoculture',
    ],
    immediateActions: [
      'Scout the ear leaf and two leaves above ear level; treat if lesions appear before tasseling',
      'Ensure balanced soil potassium to reduce disease susceptibility',
      'Avoid high plant density in future sowing to maintain inter-row ventilation',
    ],
    organicTreatments: [
      'Pseudomonas fluorescens @ 10g/L bio-foliar spray',
      'Azadirachtin (Neem 10,000 ppm) @ 2ml/L as early botanical deterrent',
      'Trichoderma viride foliar treatment',
    ],
    chemicalTreatments: [
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml / liter of water',
      'Propiconazole 25% EC @ 1.0 ml / liter at early silking stage',
      'Pyraclostrobin 20% WG @ 1.5g / liter',
    ],
    preventionSteps: [
      'Select Northern Leaf Blight-resistant hybrid seed varieties (Ht-gene hybrids)',
      'Practice deep tillage or residue chopping to accelerate debris breakdown',
      'Rotate crops for 2 years with non-host crops like soybeans, sunflower, or alfalfa',
      'Apply balanced NPK fertilizer with adequate micronutrient zinc',
    ],
    recoveryTime: '10 - 15 days; protects ear yield potential when applied on time',
    disclaimer:
      'This is a preliminary AI assessment and not a guaranteed laboratory diagnosis. For severe or rapidly spreading outbreaks, consult your local agricultural extension service or certified agronomist before large-scale chemical application.',
  },
  'sample-potato-late-blight': {
    cropName: 'Potato (Solanum tuberosum)',
    diseaseName: 'Late Blight (Phytophthora infestans)',
    isHealthy: false,
    confidenceScore: 94,
    severity: 'High',
    pathogenType: 'Oomycete / Water Mold',
    symptoms: [
      'Irregular, water-soaked grayish-black lesions starting at leaf margins and tips',
      'Pale green or yellowish border surrounding rapidly expanding necrotic patches',
      'Fine white downy mildew-like sporulation on undersides of leaves in humid mornings',
      'Rapid wilting and collapse of entire vine canopies with characteristic foul odor',
    ],
    causes: [
      'Persistent leaf moisture (>10 hours) and cool-moderate temperatures (15°C - 20°C / 59°F - 68°F)',
      'Wind-blown sporangia travelling miles from infected volunteer potatoes or cull piles',
      'Planting infected seed tubers',
    ],
    immediateActions: [
      'Quarantine the affected plot and avoid field entry when foliage is wet to prevent spore transport',
      'Prune and bag severely blighted vines immediately; do not leave them in compost piles',
      'Hill up soil around stems to build a thick barrier shielding developing tubers from washed-off spores',
    ],
    organicTreatments: [
      'Copper Hydroxide or Bordeaux Mixture (1%) applied protectively before rain spells',
      'Bio-fungicide formulation containing Bacillus amyloliquefaciens drench',
      'Foliar potassium silicate to fortify epidermal leaf wall resistance',
    ],
    chemicalTreatments: [
      'Cymoxanil 8% + Mancozeb 64% WP @ 2.5g / liter of water (rapid penetrant + multi-site contact)',
      'Dimethomorph 50% WP @ 1.0g / liter of water (anti-oomycete specialist)',
      'Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5g / liter for systemic curative action',
    ],
    preventionSteps: [
      'Always sow certified disease-free seed tubers with certified seed tags',
      'Maintain broad row spacing (75 cm) for good wind movement and canopy aeration',
      'Destroy all cull piles and volunteer potatoes within 500 meters of the field',
      'De-haulm (cut top vines) 10-14 days before digging to prevent tuber contamination at harvest',
    ],
    recoveryTime: '8 - 14 days under aggressive systemic fungicide management',
    disclaimer:
      'This is a preliminary AI assessment and not a guaranteed laboratory diagnosis. For severe or rapidly spreading outbreaks, consult your local agricultural extension service or certified agronomist before large-scale chemical application.',
  },
  'sample-tomato-early-blight': {
    cropName: 'Tomato (Solanum lycopersicum)',
    diseaseName: 'Early Blight (Alternaria solani)',
    isHealthy: false,
    confidenceScore: 96,
    severity: 'Moderate',
    pathogenType: 'Fungal',
    symptoms: [
      'Concentric target-like rings (bullseye pattern) inside brown necrotic lesions',
      'Chlorotic yellow halos surrounding infected spots on bottom and mid canopy leaves',
      'Dark brown stem cankers near the soil line',
      'Premature leaf defoliation exposing green tomatoes to sunscald',
    ],
    causes: [
      'Alternaria solani fungal spores overwintering in decaying crop residues',
      'High humidity (>80%) combined with warm daytime temperatures (24°C - 29°C / 75°F - 84°F)',
      'Water droplets splashing soil spores onto lower leaves during heavy rain or sprinkler irrigation',
    ],
    immediateActions: [
      'Prune and destroy all lower diseased leaves touching the ground with sanitized shears',
      'Apply 2-3 inches of straw or organic mulch to prevent rain-splash spore transmission',
      'Cease overhead sprinkler watering; switch immediately to root-zone drip irrigation',
    ],
    organicTreatments: [
      'Spray Liquid Copper Fungicide (Copper Octanoate) at 5ml/L every 7-10 days',
      'Cold-pressed Neem Oil (0.5% concentration with emulsifier) to suppress fungal germination',
      'Foliar bio-spray of Bacillus subtilis (Serenade) or Trichoderma harzianum',
    ],
    chemicalTreatments: [
      'Preventive: Mancozeb 75% WP @ 2.5g / liter of water',
      'Protectant: Chlorothalonil 75% WP @ 2.0g / liter of water',
      'Systemic / Curative: Azoxystrobin 23% SC @ 1.0 ml / liter of water',
    ],
    preventionSteps: [
      'Practice a minimum 3-year crop rotation without nightshade crops (potato, pepper, eggplant)',
      'Stake and trellis tomato vines to maximize airflow and rapid leaf drying',
      'Choose resistant cultivars (e.g. Mountain Supreme, Defiant PhR, Iron Lady)',
      'Clean all pruning tools in 70% alcohol between plant rows',
    ],
    recoveryTime: '7 - 10 days with prompt sanitization and protective fungicide application',
    disclaimer:
      'This is a preliminary AI assessment and not a guaranteed laboratory diagnosis. For severe or rapidly spreading outbreaks, consult your local agricultural extension service or certified agronomist before large-scale chemical application.',
  },
  'sample-healthy-rice': {
    cropName: 'Rice / Paddy (Oryza sativa)',
    diseaseName: 'Healthy Crop (No Disease Detected)',
    isHealthy: true,
    confidenceScore: 98,
    severity: 'None',
    pathogenType: 'None',
    symptoms: [
      'Upright, deep emerald green foliage with smooth uniform leaf edges',
      'Clean leaf sheaths and collar regions with no lesions, blast spots, or sheath rot',
      'Active root development with vigorous tillering and healthy white crown roots',
      'Uniform canopy architecture receiving full sunlight with no chlorotic streaks',
    ],
    causes: [
      'Balanced nitrogen-phosphorus-potassium fertility with micronutrient zinc',
      'Careful water depth management (2-5 cm shallow puddled condition)',
      'Effective weed suppression and pest prevention protocol',
    ],
    immediateActions: [
      'Maintain continuous shallow irrigation depth (2-5 cm) through panicle initiation',
      'Conduct weekly visual checks for early signs of yellow stem borer or brown planthopper',
      'Keep field bunds trimmed and free from weeds to eliminate pest bridges',
    ],
    organicTreatments: [
      'Preventive foliar spray of seaweed extract (2ml/L) to boost tiller vigor',
      'Neem cake application at tillering stage for organic pest repellency',
      'Bio-fertilizer Azospirillum / PSB root zone enrichment',
    ],
    chemicalTreatments: [
      'No chemical fungicide or bactericide required at this time',
      'Maintain standard fertilizer top dressing schedule as per crop stage',
    ],
    preventionSteps: [
      'Use Leaf Color Chart (LCC) for precision split urea applications',
      'Alternate wetting and drying (AWD) irrigation where feasible to promote root strength',
      'Conserve natural predators (spiders, damselflies, mirid bugs) by avoiding unnecessary sprays',
    ],
    recoveryTime: 'Plant is in prime physiological health and actively tillering',
    disclaimer:
      'This is a preliminary AI assessment. Continue regular field scouting as reproductive and grain-filling stages progress.',
  },
  'sample-healthy-cotton': {
    cropName: 'Cotton (Gossypium hirsutum)',
    diseaseName: 'Healthy Crop (No Disease Detected)',
    isHealthy: true,
    confidenceScore: 97,
    severity: 'None',
    pathogenType: 'None',
    symptoms: [
      'Broad, vigorous palmate foliage with rich dark green coloration and strong leaf turgor',
      'Clean leaf undersides free from sucking pests (jassids, aphids, thrips, whiteflies)',
      'Healthy monopodial and sympodial branch development with active square initiation',
      'No angular spots, leaf curl, vein clearing, or bacterial blackarm lesions',
    ],
    causes: [
      'Optimal soil moisture through precision drip and organic mulching',
      'Balanced basal and foliar fertilization with boron and magnesium',
      'Proactive integrated pest management (IPM)',
    ],
    immediateActions: [
      'Maintain regular irrigation interval avoiding water stress during squaring',
      'Install yellow and blue sticky traps (10-15 per acre) for prophylactic pest monitoring',
      'Inspect squares and young bolls weekly for any signs of bollworm entry holes',
    ],
    organicTreatments: [
      'Foliar spray of 5% Neem Seed Kernel Extract (NSKE) as a preventive insect repellant',
      'Bio-stimulant amino acid + seaweed extract spray at pre-bloom stage',
      'Compost tea soil drench to promote mycorrhizal phosphorus absorption',
    ],
    chemicalTreatments: [
      'No chemical treatment required at this time',
      'Keep botanical neem formulations ready for early sucking pest surges',
    ],
    preventionSteps: [
      'Apply 1% Magnesium Sulfate + 0.2% Boron foliar spray at peak flowering to prevent leaf reddening',
      'Maintain clean weed-free borders around cotton fields',
      'Avoid excessive vegetative growth caused by over-application of nitrogen',
    ],
    recoveryTime: 'Plant is in peak vegetative health with high boll-bearing potential',
    disclaimer:
      'This is a preliminary AI assessment. Continue monitoring square and boll formation throughout the season.',
  },
  'sample-healthy-tomato': {
    cropName: 'Tomato (Solanum lycopersicum)',
    diseaseName: 'Healthy Crop (No Disease Detected)',
    isHealthy: true,
    confidenceScore: 98,
    severity: 'None',
    pathogenType: 'None',
    symptoms: [
      'Lush, uniform emerald green foliage with strong leaf turgor',
      'No chlorosis, necrosis, lesions, bullseye rings, or water-soaked spots observed',
      'Smooth, clean leaf undersides free from fungal hyphae, bacterial ooze, or pest colonies',
      'Robust vascular leaf veins and healthy apex growth tips',
    ],
    causes: [
      'Optimal soil nutrient balance (N-P-K and micronutrients)',
      'Proper irrigation scheduling preventing drought or root waterlogging',
      'Good canopy aeration and proactive pest monitoring',
    ],
    immediateActions: [
      'Maintain current cultural practices and regular drip irrigation schedule',
      'Continue routine scouting twice a week for early signs of thrips or aphids',
      'Ensure mulch coverage remains intact to maintain uniform soil temperature',
    ],
    organicTreatments: [
      'Preventive weekly foliar spray of seaweed extract (2ml/L) to strengthen plant immunity',
      'Neem oil 0.3% as a preventive insect repellant',
      'Compost tea drench to sustain beneficial rhizosphere microbiology',
    ],
    chemicalTreatments: [
      'No chemical treatment required at this time',
      'Keep preventive contact protectant (e.g. Copper or Mancozeb) on hand in case of prolonged rain forecasts',
    ],
    preventionSteps: [
      'Continue staking and pruning suckers to maintain optimal sunlight penetration',
      'Test soil electrical conductivity (EC) and pH periodically (target 6.2 - 6.8)',
      'Apply balanced potassium and calcium to promote firm, crack-resistant fruit walls',
    ],
    recoveryTime: 'Plant is in prime health and actively growing',
    disclaimer:
      'This is a preliminary AI assessment and not a guaranteed laboratory diagnosis. Keep monitoring your field weekly as weather and crop growth stages evolve.',
  },
};

// TELUGU SAMPLE LEAVES
export const TELUGU_SAMPLE_LEAVES: SampleLeaf[] = [
  {
    id: 'sample-mango-anthracnose',
    title: 'మామిడి ఆంథ్రాక్నోస్ & పూత మాడు',
    crop: 'మామిడి (Mango)',
    disease: 'మామిడి ఆంథ్రాక్నోస్ తెగులు (కొల్లెటోట్రైకమ్)',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    description: 'లేత ఆకులపై గోధుమ రంగు మచ్చలు, రంధ్రాలు ఏర్పడటం మరియు పూత మాడి రాలిపోవడం.',
    severity: 'High',
  },
  {
    id: 'sample-wheat-rust',
    title: 'గోధుమ ఆకు తుప్పు తెగులు',
    crop: 'గోధుమ (Wheat)',
    disease: 'గోధుమ బ్రౌన్ లీఫ్ రస్ట్ (పక్సీనియా)',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    description: 'గోధుమ ఆకులపై నారింజ-గోధుమ రంగు తుప్పు పొక్కులు ఏర్పడి ఆకులు ఎండిపోవడం.',
    severity: 'High',
  },
  {
    id: 'sample-rice-blast',
    title: 'వరి అగ్గితెగులు (బ్లాస్ట్)',
    crop: 'వరి / ధాన్యం',
    disease: 'వరి అగ్గితెగులు (పైరికులేరియా ఒరైజే)',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80',
    description: 'ఆకులపై కదురు ఆకారంలో బూడిద రంగు కేంద్రం గల అగ్గి మచ్చలు ఏర్పడటం.',
    severity: 'High',
  },
  {
    id: 'sample-cotton-blight',
    title: 'పత్తి బ్యాక్టీరియల్ బ్లైట్',
    crop: 'పత్తి',
    disease: 'కోణీయ ఆకుమచ్చ తెగులు (జాంతోమోనాస్)',
    imageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80',
    description: 'ఆకు ఈనెల మధ్య కోణీయంగా నీటి మచ్చలు ఏర్పడి నల్లటి కాండం మచ్చలుగా మారడం.',
    severity: 'High',
  },
  {
    id: 'sample-chili-bacterial-spot',
    title: 'మిరప బ్యాక్టీరియా మచ్చ తెగులు',
    crop: 'మిరప / చిల్లీ',
    disease: 'బ్యాక్టీరియల్ లీఫ్ స్పాట్ (జాంతోమోనాస్)',
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    description: 'ఆకులపై నూనె పూసినట్లు ఉండే చిన్న చిన్న నీటి మచ్చలు ముదురు రంగులోకి మారడం.',
    severity: 'High',
  },
  {
    id: 'sample-corn-blight',
    title: 'మొక్కజొన్న ఆకు మాడు తెగులు',
    crop: 'మొక్కజొన్న',
    disease: 'ఉత్తర ఆకు మాడు తెగులు (ఎక్సెరోహైలమ్)',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    description: 'మొక్కజొన్న ఆకులపై పొడవాటి సిగార్ ఆకారపు గోధుమ మచ్చలు ఏర్పడటం.',
    severity: 'Moderate',
  },
  {
    id: 'sample-potato-late-blight',
    title: 'బంగాళాదుంప లేట్ బ్లైట్ తెగులు',
    crop: 'బంగాళాదుంప',
    disease: 'ఆలస్యపు మాడు తెగులు (ఫైటోఫ్తోరా)',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    description: 'ఆకుల అంచుల నుండి వేగంగా వ్యాపించే ముదురు నీటి మచ్చలు మరియు తెల్లటి బూజు.',
    severity: 'High',
  },
  {
    id: 'sample-tomato-early-blight',
    title: 'టమాటా ముందస్తు మాడు తెగులు',
    crop: 'టమాటా',
    disease: 'ముందస్తు మాడు తెగులు (ఆల్టర్నేరియా)',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    description: 'కింది ఆకులపై వలయాకారపు గోధుమ రంగు మచ్చలు మరియు పసుపు రంగు వలయం.',
    severity: 'Moderate',
  },
  {
    id: 'sample-healthy-rice',
    title: 'ఆరోగ్యకరమైన వరి పైరు',
    crop: 'వరి / ధాన్యం',
    disease: 'ఆరోగ్యకరమైన పైరు (తెగుళ్ళు లేవు)',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    description: 'ఎలాంటి మచ్చలు లేని నిటారుగా పెరిగిన పచ్చటి దృఢమైన వరి ఆకులు.',
    severity: 'None',
  },
  {
    id: 'sample-healthy-cotton',
    title: 'ఆరోగ్యకరమైన పత్తి పైరు',
    crop: 'పత్తి',
    disease: 'ఆరోగ్యకరమైన పైరు (తెగుళ్ళు లేవు)',
    imageUrl: 'https://images.unsplash.com/photo-1594488555231-1554a9386d38?auto=format&fit=crop&w=600&q=80',
    description: 'కీటకాలు, ఆకుముడుతలు లేని స్వచ్ఛమైన పచ్చటి ఆరోగ్యకరమైన పత్తి ఆకులు.',
    severity: 'None',
  },
  {
    id: 'sample-healthy-tomato',
    title: 'ఆరోగ్యకరమైన టమాటా ఆకు',
    crop: 'టమాటా',
    disease: 'ఆరోగ్యకరమైన పైరు (తెగుళ్ళు లేవు)',
    imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80',
    description: 'ఎలాంటి మచ్చలు, రంగు మార్పులు లేని ఆరోగ్యకరమైన ఆకుపచ్చని దృఢమైన ఆకు.',
    severity: 'None',
  },
];

// TELUGU SAMPLE DETECTIONS DB
export const TELUGU_SAMPLE_DETECTIONS_DB: Record<string, DiseaseDetectionResult> = {
  'sample-mango-anthracnose': {
    cropName: 'మామిడి (Mangifera indica)',
    diseaseName: 'మామిడి ఆంథ్రాక్నోస్ మరియు పూత మాడు తెగులు (Colletotrichum gloeosporioides)',
    isHealthy: false,
    confidenceScore: 96,
    severity: 'High',
    pathogenType: 'శిలీంధ్రం (Fungal)',
    symptoms: [
      'లేత ఆకులపై అండాకారంలో లేదా క్రమరహితంగా ముదురు గోధుమ/నల్లటి మచ్చలు ఏర్పడి రంధ్రాలుగా మారడం.',
      'పూత గుత్తులు నల్లబడి మాడిపోయి పిందె కట్టకుండా రాలిపోవడం (Blossom blight).',
      'కొమ్మల చివర్ల నుండి ఎండిపోతూ క్రిందికి రావడం (డైబ్యాక్).',
      'కాయల తొక్కపై నల్లటి కన్నీటి చారల వంటి మచ్చలు ఏర్పడి కాయలు కుళ్ళిపోవడం.',
    ],
    causes: [
      'పూత సమయంలో గాలిలో అధిక తేమ (>85%) మరియు అకాల వర్షాలు, మంచు కురవడం.',
      'తోటలో కొమ్మలు రద్దీగా ఉండి గాలి వెలుతురు సరిగ్గా సోకకపోవడం.',
      'వర్షపు తుంపర్లు మరియు గాలి ద్వారా శిలీంధ్ర బీజాలు వ్యాప్తి చెందడం.',
    ],
    immediateActions: [
      'ఎండిపోయిన, తెగులు సోకిన కొమ్మలను 5 సెం.మీ పచ్చటి భాగం వరకు కత్తిరించి కాల్చివేయండి.',
      'కత్తిరించిన కొమ్మల చివర్లకు 1% బోర్డో పేస్ట్ లేదా కాపర్ ఆక్సీక్లోరైడ్ పేస్ట్ రాయండి.',
      'తోటలో గాలి, సూర్యరశ్మి బాగా తగిలేలా కొమ్మలను పలుచబరచండి.',
    ],
    organicTreatments: [
      'పూత రాకముందే తాజా 1% బోర్డో మిశ్రమాన్ని పిచికారీ చేయండి.',
      'సూడోమోనాస్ ఫ్లోరోసెన్స్ జీవ శిలీంధ్రనాశిని @ 5 గ్రాములు / లీటరు నీటికి పిచికారీ చేయండి.',
      '5% వేప గింజల కషాయం (NSKE) లేదా 10,000 ppm వేపనూనె (2 మి.లీ/లీటరు) పిచికారీ చేయండి.',
    ],
    chemicalTreatments: [
      'హెక్సాకోనజోల్ 5% SC @ 2.0 మి.లీ / లీటరు లేదా కార్బెండజిమ్ 50% WP @ 1.0 గ్రాము / లీటరు నీటికి',
      'అజోక్సిస్ట్రోబిన్ 23% SC @ 1.0 మి.లీ / లీటరు నీటికి',
      'డైఫెనోకోనజోల్ 25% EC @ 0.5 మి.లీ / లీటరు నీటికి',
    ],
    preventionSteps: [
      'పంట కోత తర్వాత ఏటా ఎండిన కొమ్మలను కత్తిరించి తోటను శుభ్రంగా ఉంచండి.',
      'ఆకులను గాయపరిచే మామిడి తేనెమంచు పురుగులను (Hoppers) సకాలంలో అదుపు చేయండి.',
      'తోటలో రాలిన ఎండుటాకులను ఎప్పటికప్పుడు తీసివేసి పరిశుభ్రత పాటించండి.',
    ],
    recoveryTime: 'కొమ్మల కత్తిరింపు మరియు దైహిక శిలీంధ్రనాశిని పిచికారీతో 10 - 15 రోజుల్లో రికవరీ.',
    disclaimer:
      'ఇది ప్రాథమిక AI అంచనా మాత్రమే. పెద్ద ఎత్తున రసాయన మందులు పిచికారీ చేసే ముందు మీ మండల వ్యవసాయ లేదా ఉద్యానవన అధికారిని సంప్రదించండి.',
  },
  'sample-wheat-rust': {
    cropName: 'గోధుమ (Triticum aestivum)',
    diseaseName: 'గోధుమ బ్రౌన్ లీఫ్ రస్ట్ / ఆకు తుప్పు తెగులు (Puccinia triticina)',
    isHealthy: false,
    confidenceScore: 95,
    severity: 'High',
    pathogenType: 'శిలీంధ్ర తుప్పు (Fungal Rust)',
    symptoms: [
      'ఆకుల పైభాగంలో నారింజ-గోధుమ రంగు గుండ్రటి తుప్పు పొక్కులు ఏర్పడటం.',
      'చేతితో తాకినప్పుడు వేళ్ళకు నారింజ రంగు పొడి అంటుకోవడం.',
      'జెండా ఆకులు పసుపు రంగులోకి మారి ఎండిపోవడం వల్ల గింజలు తాలుగా మారడం.',
    ],
    causes: [
      'చల్లటి వాతావరణం (15°C - 22°C) మరియు ఆకులపై ఎక్కువ సమయం ఉదయపు మంచు నిలవడం.',
      'గాలి ద్వారా దూర ప్రాంతాల నుంచి తుప్పు శిలీంధ్ర బీజాలు వ్యాపించడం.',
    ],
    immediateActions: [
      'పొలంలో మొదటి తుప్పు పొక్కులు కనిపించగానే తక్షణమే శిలీంధ్రనాశిని పిచికారీ చేయండి.',
      'ఆలస్యపు దశలో నత్రజని (యూరియా) ఎరువులను అధికంగా వేయడం వెంటనే ఆపండి.',
    ],
    organicTreatments: [
      'ట్రైకోడెర్మా విరిడే జీవ శిలీంధ్రనాశిని @ 5 గ్రాములు / లీటరు నీటికి పిచికారీ చేయండి.',
      'పులిసిన మజ్జిగ ద్రావణం (5% మోతాదులో) ముందస్తు రక్షణగా పిచికారీ చేయండి.',
    ],
    chemicalTreatments: [
      'ప్రొపికోనజోల్ 25% EC (టిల్ట్) @ 1.0 మి.లీ / లీటరు నీటికి (తుప్పు తెగులుకు అత్యుత్తమ మందు)',
      'టెబుకోనజోల్ 25.9% EC @ 1.0 మి.లీ / లీటరు నీటికి',
      'మాంకోజెబ్ 75% WP @ 2.5 గ్రాములు / లీటరు నీటికి',
    ],
    preventionSteps: [
      'తుప్పు తెగులును తట్టుకునే సర్టిఫైడ్ విత్తన రకాలను (HD-2967, DBW-187, GW-322) సాగు చేయండి.',
      'నవంబర్ మొదటి వారంలోనే సకాలంలో విత్తుకోవాలి.',
    ],
    recoveryTime: 'దైహిక ట్రయాజోల్ మందు పిచికారీతో 8 - 12 రోజుల్లో రికవరీ.',
    disclaimer:
      'ఇది ప్రాథమిక AI అంచనా మాత్రమే. తుప్పు తెగులు తీవ్రంగా ఉన్నప్పుడు స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.',
  },
  'sample-rice-blast': {
    cropName: 'వరి / ధాన్యం (Oryza sativa)',
    diseaseName: 'వరి అగ్గితెగులు / బ్లాస్ట్ (Pyricularia oryzae)',
    isHealthy: false,
    confidenceScore: 97,
    severity: 'High',
    pathogenType: 'శిలీంధ్రం (Fungal)',
    symptoms: [
      'ఆకులపై కదురు లేదా కంటి ఆకారపు మచ్చలు (మధ్యలో బూడిద-తెలుపు, అంచున గోధుమ రంగు).',
      'మచ్చలు కలిసిపోయి మొత్తం ఆకు ఎండిపోయి అగ్నితో కాలినట్లు మారడం.',
      'కణుపుల వద్ద నల్లటి మచ్చలు ఏర్పడి పిలకలు విరిగిపోవడం (నోడ్ బ్లాస్ట్).',
      'మెడ విరుపు తెగులు (నెక్ బ్లాస్ట్) వల్ల వెన్ను తెల్లబడి తాలు గింజలు ఏర్పడటం.',
    ],
    causes: [
      'అధిక గాలి తేమ (>90%) మరియు రాత్రి వేళల్లో ఎక్కువ సమయం మంచు కురవడం.',
      'యూరియా (నత్రజని) ఎరువును అధిక మోతాదులో వాడటం.',
      'నారుమడిలో మొక్కలు చాలా దగ్గరగా ఉండటం మరియు నీరు నిల్వ ఉండటం.',
    ],
    immediateActions: [
      'పొలంలో నిల్వ ఉన్న నీటిని తీసివేసి కొత్త నీరు పారించండి.',
      'తెగులు తగ్గే వరకు యూరియా లేదా నత్రజని ఎరువుల వాడకాన్ని తక్షణమే నిలిపివేయండి.',
      'ఆకు కణాలను గట్టిపరచడానికి సిలికాన్ పోషకాన్ని పిచికారీ చేయండి.',
    ],
    organicTreatments: [
      'పులిసిన ఆవు మూత్రం మరియు ఇంగువ ద్రావణాన్ని (10%) పిచికారీ చేయండి.',
      'ట్రైకోడెర్మా హర్జియానమ్ @ 5 గ్రాములు/లీటరు నీటికి కలిపి పిచికారీ చేయండి.',
      '5% వేపపిండి కషాయాన్ని పిలక దశలో పిచికారీ చేయండి.',
    ],
    chemicalTreatments: [
      'ట్రైసైక్లాజోల్ 75% WP @ 0.6 గ్రాములు / లీటరు నీటికి (అగ్గితెగులుకు అత్యుత్తమ మందు)',
      'ఐసోప్రోతియోలేన్ 40% EC @ 1.5 మి.లీ / లీటరు నీటికి',
      'కసుగామైసిన్ 3% SL @ 2.0 మి.లీ / లీటరు నీటికి',
    ],
    preventionSteps: [
      'విత్తే ముందు కార్బండజిమ్ (2 గ్రా/కిలో) లేదా ట్రైకోడెర్మా (10 గ్రా/కిలో)తో విత్తన శుద్ధి చేయండి.',
      'లీఫ్ కలర్ చార్ట్ (LCC) ఆధారంగా నత్రజనిని 3-4 దఫాలుగా వేయండి.',
      'నాట్లలో 20 x 15 సెం.మీ దూరం పాటించి గాలి వెలుతురు ఆడేలా చూడండి.',
      'పంట కోత తర్వాత కొయ్యకాళ్లను కాల్చడం లేదా మట్టిలో కలియదున్నడం చేయండి.',
    ],
    recoveryTime: 'సరైన మందు పిచికారీతో 7 - 12 రోజుల్లో రికవరీ.',
    disclaimer:
      'ఇది ప్రాథమిక AI అంచనా మాత్రమే. పెద్ద ఎత్తున మందులు పిచికారీ చేసే ముందు స్థానిక వ్యవసాయ నిపుణుడిని సంప్రదించండి.',
  },
  'sample-cotton-blight': {
    cropName: 'పత్తి (Gossypium hirsutum)',
    diseaseName: 'కోణీయ ఆకుమచ్చ తెగులు / బ్యాక్టీరియల్ బ్లైట్ (Xanthomonas malvacearum)',
    isHealthy: false,
    confidenceScore: 95,
    severity: 'High',
    pathogenType: 'బ్యాక్టీరియా (Bacterial)',
    symptoms: [
      'ఆకు ఈనెల మధ్య కోణీయంగా నీరు కారిన మచ్చలు ఏర్పడటం.',
      'మచ్చలు ముదురు ఎరుపు-గోధుమ రంగులోకి మారి ఆకులు రాలిపోవడం.',
      'బ్లాక్ ఆర్మ్ దశ: కొమ్మలు మరియు కాండంపై నల్లటి చారలు ఏర్పడి విరిగిపోవడం.',
      'పచ్చి కాయలపై గుండ్రటి నీటి మచ్చలు ఏర్పడి కాయలు రాలిపోవడం.',
    ],
    causes: [
      'విత్తనాల ద్వారా లేదా గాలివానల ద్వారా బ్యాక్టీరియా వ్యాప్తి చెందడం.',
      'వాతావరణంలో అధిక తేమ (>85%) మరియు 28°C - 35°C ఉష్ణోగ్రత.',
      'వర్షపు నీటి తుంపర్లు ఒక మొక్క నుండి మరో మొక్కకు బ్యాక్టీరియాను చేరవేయడం.',
    ],
    immediateActions: [
      'నల్లబడిన కొమ్మలను కత్తిరించి పొలం బయట నాశనం చేయండి.',
      'ఆకులపై మంచు ఉన్నప్పుడు పొలంలో పనులు చేయవద్దు.',
      'స్ప్రింక్లర్లతో నీరు ఇవ్వడం ఆపి, డ్రిప్ లేదా బోదెల ద్వారా మాత్రమే నీరు ఇవ్వండి.',
    ],
    organicTreatments: [
      'సూడోమోనాస్ ఫ్లోరోసెన్స్ @ 10 గ్రాములు/లీటరు నీటికి పిచికారీ చేయండి.',
      'కాపర్ ఆక్సీక్లోరైడ్ @ 2.5 గ్రా/లీ తో పాటు 0.3% వేపనూనె పిచికారీ.',
      'వెల్లుల్లి మరియు అల్లం రసంతో తయారుచేసిన కషాయం పిచికారీ.',
    ],
    chemicalTreatments: [
      'కాపర్ ఆక్సీక్లోరైడ్ 50% WP @ 2.5 గ్రా/లీ + ప్లాంటోమైసిన్ @ 0.5 గ్రా/లీ కలిపి పిచికారీ.',
      'కసుగామైసిన్ 3% SL @ 2.0 మి.లీ / లీటరు నీటికి.',
      'కాపర్ హైడ్రాక్సైడ్ 53.8% DF @ 2.0 గ్రాములు / లీటరు నీటికి.',
    ],
    preventionSteps: [
      'విత్తే ముందు గాఢ గంధకపు ఆమ్లంతో డీలింటింగ్ చేసి స్ట్రెప్టోసైక్లిన్‌తో విత్తన శుద్ధి చేయండి.',
      'జొన్న లేదా మొక్కజొన్నతో 2 సంవత్సరాల పంట మార్పిడి చేయండి.',
      'పంట కోత తర్వాత పత్తి కట్టెలను తగులబెట్టి లేదా దున్ని నాశనం చేయండి.',
    ],
    recoveryTime: '8 - 14 రోజుల్లో తెగులు అదుపులోకి వస్తుంది.',
    disclaimer:
      'ఇది ప్రాథమిక AI అంచనా మాత్రమే. పెద్ద ఎత్తున మందులు పిచికారీ చేసే ముందు స్థానిక వ్యవసాయ నిపుణుడిని సంప్రదించండి.',
  },
  'sample-chili-bacterial-spot': {
    cropName: 'క్యాప్సికమ్ / మిరప (Capsicum annuum)',
    diseaseName: 'బ్యాక్టీరియల్ లీఫ్ స్పాట్ (Xanthomonas campestris)',
    isHealthy: false,
    confidenceScore: 94,
    severity: 'High',
    pathogenType: 'బ్యాక్టీరియా (Bacterial)',
    symptoms: [
      'ఆకులపై 1-3 మి.మీ పరిమాణంలో నీటి మచ్చలు ఏర్పడటం.',
      'మచ్చలు క్రమంగా నలుపు-గోధుమ రంగులోకి మారి చుట్టూ పసుపు రంగు వలయం రావడం.',
      'తీవ్రమైన ఆకురాల్పు జరిగి కాయలు ఎండ తీవ్రతకు గురికావడం.',
      'పచ్చి కాయల తొక్కపై గరకుగా ఉండే గోధుమ రంగు మచ్చలు ఏర్పడటం.',
    ],
    causes: [
      'తెగులు సోకిన విత్తనాలు లేదా నారు మొక్కల ద్వారా వ్యాప్తి.',
      'వెచ్చని ఉష్ణోగ్రత (24°C - 30°C) మరియు వర్షపు తుంపర్లు.',
      'ఆకులపై మంచు ఉన్నప్పుడు చేనులో పనులు చేయడం.',
    ],
    immediateActions: [
      'కోత పరికరాలు మరియు చేతులను 10% బ్లీచింగ్ ద్రావణంతో శుభ్రం చేసుకోండి.',
      'ఉదయం మంచు ఆరిపోయే వరకు మిరప చేనులోకి వెళ్ళవద్దు.',
      'తీవ్రంగా తెగులు సోకిన నారు మొక్కలను వెంటనే పీకి నాశనం చేయండి.',
    ],
    organicTreatments: [
      'కాపర్ ఆక్సిక్లోరైడ్ @ 2.5 గ్రా/లీ + బాసిల్లస్ సబ్‌టిలిస్ కలిపి పిచికారీ చేయండి.',
      'హైడ్రోజన్ పెరాక్సైడ్ పర్యావరణహిత శానిటైజర్ పిచికారీ.',
      'వెల్లుల్లి సారం (అల్లిసిన్) పిచికారీ.',
    ],
    chemicalTreatments: [
      'కాపర్ హైడ్రాక్సైడ్ 53.8% DF @ 2.0 గ్రా/లీ + మాంకోజెబ్ 75% WP @ 2.0 గ్రా/లీ',
      'ప్లాంటోమైసిన్ (స్ట్రెప్టోమైసిన్ + టెట్రాసైక్లిన్) @ 0.5 గ్రాములు / లీటరు',
      'కసుగామైసిన్ 3% SL @ 2.0 మి.లీ / లీటరు నీటికి',
    ],
    preventionSteps: [
      'వేడి నీటి శుద్ధి చేసిన సర్టిఫైడ్ హైబ్రిడ్ విత్తనాలను వాడండి.',
      'నీరు పైకి చిందకుండా ప్లాస్టిక్ మల్చింగ్ కింద డ్రిప్ ఇరిగేషన్ వాడండి.',
      'మిరప, టమాటా, వంగ పంటలు లేకుండా 2 సంవత్సరాల పంట మార్పిడి చేయండి.',
    ],
    recoveryTime: 'రాగి బాక్టీరియా నాశినులతో 8 - 14 రోజుల్లో నియంత్రణ.',
    disclaimer:
      'ఇది ప్రాథమిక AI అంచనా మాత్రమే. పెద్ద ఎత్తున మందులు పిచికారీ చేసే ముందు స్థానిక వ్యవసాయ నిపుణుడిని సంప్రదించండి.',
  },
  'sample-corn-blight': {
    cropName: 'మొక్కజొన్న (Zea mays)',
    diseaseName: 'ఉత్తర మొక్కజొన్న ఆకు మాడు తెగులు (Exserohilum turcicum)',
    isHealthy: false,
    confidenceScore: 93,
    severity: 'Moderate',
    pathogenType: 'శిలీంధ్రం (Fungal)',
    symptoms: [
      'మధ్య మరియు దిగువ ఆకులపై పొడవాటి (3 నుండి 15 సెం.మీ) సిగార్ ఆకారపు మచ్చలు.',
      'మచ్చలు మొదట బూడిద-ఆకుపచ్చగా ప్రారంభమై క్రమంగా గోధుమ రంగు ఎండిన మచ్చలుగా మారడం.',
      'తేమతో కూడిన వాతావరణంలో మచ్చల లోపల ముదురు ఆలివ్ రంగు శిలీంధ్ర బీజాలు కనిపించడం.',
      'ఆకు పచ్చదనం తగ్గి కండెలో గింజ నిండకుండా దిగుబడి తగ్గడం.',
    ],
    causes: [
      'గత పంట అవశేషాలలో శిలీంధ్రం బతికి ఉండటం.',
      'ఆకులపై 6-18 గంటల పాటు తేమ నిలిచి ఉండటం మరియు 18°C - 27°C ఉష్ణోగ్రత.',
      'తెగులును తట్టుకోలేని హైబ్రిడ్ రకాలను నిరంతరం సాగు చేయడం.',
    ],
    immediateActions: [
      'కండె వద్ద ఉన్న ఆకులు మరియు పై ఆకులను పరిశీలించి, పూతకు ముందే మందులు పిచికారీ చేయండి.',
      'తెగులు తీవ్రత తగ్గించడానికి పొటాష్ ఎరువును సమతుల్యంగా వేయండి.',
      'గాలి ప్రసరణ కోసం మొక్కల సాంద్రత మరీ ఎక్కువగా లేకుండా చూసుకోండి.',
    ],
    organicTreatments: [
      'సూడోమోనాస్ ఫ్లోరోసెన్స్ @ 10 గ్రాములు/లీటరు నీటికి కలిపి పిచికారీ చేయండి.',
      '10,000 ppm వేపనూనె @ 2 మి.లీ/లీటరు చొప్పున ముందస్తుగా పిచికారీ చేయండి.',
      'ట్రైకోడెర్మా విరిడే జీవ రసాయనాన్ని ఆకులపై చల్లండి.',
    ],
    chemicalTreatments: [
      'అజోక్సిస్ట్రోబిన్ 18.2% + డైఫెనోకోనజోల్ 11.4% SC @ 1.0 మి.లీ / లీటరు నీటికి',
      'ప్రొపికోనజోల్ 25% EC @ 1.0 మి.లీ / లీటరు నీటికి',
      'పైరాక్లోస్ట్రోబిన్ 20% WG @ 1.5 గ్రాములు / లీటరు నీటికి',
    ],
    preventionSteps: [
      'మాడు తెగులును తట్టుకునే హైబ్రిడ్ విత్తన రకాలను ఎంచుకోండి.',
      'పంట కోత తర్వాత లోతు దుక్కులు చేసి వ్యర్థాలను మట్టిలో కలపండి.',
      'సోయాబీన్, పొద్దుతిరుగుడు లేదా పప్పుధాన్యాలతో 2 సంవత్సరాల పంట మార్పిడి చేయండి.',
      'జింక్ మరియు సమతుల్య ఎన్పీకే పోషకాలను అందించండి.',
    ],
    recoveryTime: '10 - 15 రోజుల్లో ఆశించిన రక్షణ లభిస్తుంది.',
    disclaimer:
      'ఇది ప్రాథమిక AI అంచనా మాత్రమే. తీవ్రమైన పరిస్థితుల్లో స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.',
  },
  'sample-potato-late-blight': {
    cropName: 'బంగాళాదుంప (Solanum tuberosum)',
    diseaseName: 'ఆలస్యపు మాడు తెగులు (Phytophthora infestans)',
    isHealthy: false,
    confidenceScore: 94,
    severity: 'High',
    pathogenType: 'ఓమైసైట్ / నీటి బూజు (Oomycete)',
    symptoms: [
      'ఆకుల అంచులు మరియు కొనల వద్ద ప్రారంభమయ్యే ముదురు నలుపు-బూడిద రంగు నీటి మచ్చలు.',
      'వేగంగా విస్తరించే మచ్చల చుట్టూ లేత పసుపుపచ్చటి అంచు ఏర్పడటం.',
      'ఉదయం వేళల్లో అధిక తేమ ఉన్నప్పుడు ఆకుల వెనుక భాగంలో తెల్లటి బూజు లాంటి శిలీంధ్రం కనిపించడం.',
      'మొక్కలు వేగంగా వడలిపోయి దుర్వాసనతో కూడిన నల్లటి అవశేషాలుగా మారిపోవడం.',
    ],
    causes: [
      'ఆకులపై 10 గంటల కంటే ఎక్కువ సమయం తేమ నిలవడం మరియు చల్లటి వాతావరణం (15°C - 20°C).',
      'గాలి ద్వారా మైళ్ళ దూరం వ్యాపించే శిలీంధ్ర బీజాలు.',
      'తెగులు సోకిన విత్తన దుంపలను నాటడం.',
    ],
    immediateActions: [
      'వ్యాధి సోకిన భాగాన్ని గుర్తించి, ఆకులు తడిగా ఉన్నప్పుడు చేలో తిరగడం మానుకోండి.',
      'తెగులు సోకిన కొమ్మలను వెంటనే కోసి సంచులలో నింపి కాల్చివేయండి (కంపోస్టులో వేయవద్దు).',
      'వర్షపు నీటితో శిలీంధ్రం దుంపలకు చేరకుండా కాండం చుట్టూ మట్టిని బాగా ఎగదోయండి.',
    ],
    organicTreatments: [
      'వర్షాలకు ముందు కాపర్ హైడ్రాక్సైడ్ లేదా 1% బోర్డో మిశ్రమాన్ని ముందస్తుగా పిచికారీ చేయండి.',
      'బాసిల్లస్ అమైలోలిక్విఫేసియన్స్ జీవ శిలీంధ్ర నాశిని నేలలో తడిసేలా పోయండి.',
      'ఆకు కణాల గోడలను దృఢపరచడానికి పొటాషియం సిలికేట్ పిచికారీ చేయండి.',
    ],
    chemicalTreatments: [
      'సైమోక్సానిల్ 8% + మాంకోజెబ్ 64% WP @ 2.5 గ్రాములు / లీటరు నీటికి',
      'డైమెథోమార్ఫ్ 50% WP @ 1.0 గ్రాము / లీటరు నీటికి',
      'మెటలాక్సిల్-M 4% + మాంకోజెబ్ 64% WP @ 2.5 గ్రాములు / లీటరు నీటికి',
    ],
    preventionSteps: [
      'సర్టిఫైడ్ వ్యాధి రహిత నాణ్యమైన విత్తన దుంపలను మాత్రమే నాటండి.',
      'గాలి ప్రసరణ బాగుండేలా మొక్కల మధ్య తగినంత దూరం (75 సెం.మీ) పాటించండి.',
      'పొలం పరిసరాలలో ఉన్న పాత దుంపల కుప్పలను నాశనం చేయండి.',
      'దుంపలు తవ్వడానికి 10-14 రోజుల ముందే పైభాగం ఆకులను కోసివేయండి.',
    ],
    recoveryTime: 'దైహిక శిలీంధ్ర నాశినుల వాడకంతో 8 - 14 రోజుల్లో నియంత్రణ.',
    disclaimer:
      'ఇది ప్రాథమిక AI అంచనా మాత్రమే. పెద్ద ఎత్తున మందులు పిచికారీ చేసే ముందు స్థానిక వ్యవసాయ నిపుణుడిని సంప్రదించండి.',
  },
  'sample-tomato-early-blight': {
    cropName: 'టమాటా (Solanum lycopersicum)',
    diseaseName: 'ముందస్తు మాడు తెగులు (Alternaria solani)',
    isHealthy: false,
    confidenceScore: 96,
    severity: 'Moderate',
    pathogenType: 'శిలీంధ్రం (Fungal)',
    symptoms: [
      'గోధుమ నుంచి నల్లటి ఆకుమచ్చల లోపల వలయాల్లాంటి లక్షణాలు (బుల్స్-ఐ ఎఫెక్ట్) కనిపించడం.',
      'దిగువ మరియు మధ్య భాగంలోని ఆకులపై మచ్చల చుట్టూ పసుపు రంగు వలయాలు ఏర్పడటం.',
      'కాండం వద్ద గాయాలు మరియు నేల సమీపంలో లోపలికి కుంగిన ముదురు మచ్చలు కనిపించడం.',
      'ఆకులు అకాలంగా రాలిపోవడం వల్ల పచ్చి టమాటాలపై ఎండ వేడిమికి గాయాలు (సన్‌స్కాల్డ్) ఏర్పడటం.',
    ],
    causes: [
      'మునుపటి పంట వ్యర్థాలలో ఆల్టర్నేరియా సొలాని శిలీంధ్ర బీజాలు నిల్వ ఉండటం.',
      'అధిక తేమ (>80%)తో పాటు పగటి సమయంలో వెచ్చని ఉష్ణోగ్రతలు (24°C - 29°C) ఉండటం.',
      'భారీ వర్షాలు లేదా స్ప్రింక్లర్ల నీటి బిందువులు నేల నుండి కింది ఆకులపై చిందడం.',
    ],
    immediateActions: [
      'నేలను తాకుతున్న వ్యాధి సోకిన దిగువ ఆకులన్నింటినీ శుభ్రమైన కత్తెరతో కత్తిరించి నాశనం చేయండి.',
      'వర్షపు నీటి తుంపర్ల ద్వారా శిలీంధ్రం వ్యాపించకుండా 2-3 అంగుళాల గడ్డి లేదా సేంద్రీయ మల్చింగ్ వేయండి.',
      'పైనుండి నీరు చిమ్మే స్ప్రింక్లర్లను ఆపి, వెంటనే వేర్ల వద్ద బిందు సేద్యం (డ్రిప్) పద్ధతికి మారండి.',
    ],
    organicTreatments: [
      'ద్రవ రాగి శిలీంధ్ర నాశిని (కాపర్ ఆక్టానోయేట్) లీటరు నీటికి 5 మి.లీ కలిపి ప్రతి 7-10 రోజులకు పిచికారీ చేయండి.',
      'శిలీంధ్ర బీజాల పెరుగుదలను అరికట్టడానికి గానుగ వేపనూనె (0.5% మోతాదులో తగిన జిగురుతో) పిచికారీ చేయండి.',
      'బాసిల్లస్ సబ్‌టిలిస్ లేదా ట్రైకోడెర్మా హర్జియానమ్ జీవ శిలీంధ్ర నాశిని ఆకులపై పిచికారీ చేయండి.',
    ],
    chemicalTreatments: [
      'ముందస్తు రక్షణ: మాంకోజెబ్ 75% WP @ 2.5 గ్రాములు / లీటరు నీటికి',
      'రక్షణాత్మక మందు: క్లోరోథలోనిల్ 75% WP @ 2.0 గ్రాములు / లీటరు నీటికి',
      'దైహిక నివారణ: అజోక్సిస్ట్రోబిన్ 23% SC @ 1.0 మి.లీ / లీటరు నీటికి',
    ],
    preventionSteps: [
      'టమాటా, బంగాళాదుంప, మిరప వంటి సొలనేసి కుటుంబ పంటలు లేకుండా కనీసం 3 సంవత్సరాల పంట మార్పిడి పాటించండి.',
      'గాలి వెలుతురు బాగా తగిలేలా మొక్కలకు కర్రలు కట్టి పైకి ఎగబాకించండి.',
      'తెగులును తట్టుకునే రకాలను ఎంచుకోండి (ఉదా: మౌంటైన్ సుప్రీమ్, ఐరన్ లేడీ).',
      'కత్తిరింపు పరికరాలను వరుసల మధ్య 70% ఆల్కహాల్‌తో శుభ్రపరచండి.',
    ],
    recoveryTime: 'సత్వర ఆకుల తొలగింపు మరియు రక్షక శిలీంధ్ర నాశిని పిచికారీతో 7 - 10 రోజుల్లో రికవరీ.',
    disclaimer:
      'ఇది ప్రాథమిక AI అంచనా మాత్రమే, ధృవీకరించబడిన ప్రయోగశాల నిర్ధారణ కాదు. తీవ్రమైన పరిస్థితుల్లో లేదా రసాయనాలు పెద్ద ఎత్తున వాడే ముందు స్థానిక వ్యవసాయ అధికారిని లేదా శాస్త్రవేత్తను సంప్రదించండి.',
  },
  'sample-healthy-rice': {
    cropName: 'వరి / ధాన్యం (Oryza sativa)',
    diseaseName: 'ఆరోగ్యకరమైన పైరు (ఎలాంటి తెగుళ్ళు లేవు)',
    isHealthy: true,
    confidenceScore: 98,
    severity: 'None',
    pathogenType: 'None',
    symptoms: [
      'ఆకుపచ్చదనంతో నిటారుగా ఎదిగిన బలమైన వరి ఆకులు.',
      'ఎలాంటి అగ్గి మచ్చలు, కాండం కుళ్ళు లేదా రంగు మార్పులు లేవు.',
      'వేర్లు బలంగా ఉండి పిలకలు చురుకుగా వస్తున్నాయి.',
      'పైరు అంతటా సమానమైన ఎదుగుదల కనిపిస్తోంది.',
    ],
    causes: [
      'సమతుల్య నత్రజని, భాస్వరం, పొటాష్ మరియు జింక్ లభ్యత.',
      'పొలంలో 2-5 సెం.మీ లోతులో స్వచ్ఛమైన నీటి నిర్వహణ.',
      'కలుపు మొక్కలు లేకుండా సరైన జాగ్రత్తలు తీసుకోవడం.',
    ],
    immediateActions: [
      'వెన్ను దశ వరకు 2-5 సెం.మీ నీటి మట్టాన్ని కొనసాగించండి.',
      'కాండం తొలుచు పురుగు కోసం వారానికి ఒకసారి పొలాన్ని గమనించండి.',
      'గట్లపై కలుపు లేకుండా శుభ్రంగా ఉంచండి.',
    ],
    organicTreatments: [
      'మొక్క శక్తికి సముద్రపు నాచు సారం (2 మి.లీ/లీ) పిచికారీ.',
      'పిలక దశలో వేపపిండి ఎరువును వేయండి.',
      'అజోస్పైరిల్లమ్ / పీఎస్‌బీ జీవ ఎరువులను అందించండి.',
    ],
    chemicalTreatments: [
      'ప్రస్తుతం ఎలాంటి రసాయన మందులు అవసరం లేదు.',
      'సిఫార్సు చేసిన మోతాదులో మాత్రమే ఎరువులు వేయండి.',
    ],
    preventionSteps: [
      'లీఫ్ కలర్ చార్ట్ (LCC) ఆధారంగా యూరియాను విడతలవారీగా వేయండి.',
      'స్నేహపూర్వక కీటకాలను (సాలీళ్ళు, తూనీగలు) కాపాడుకోండి.',
    ],
    recoveryTime: 'పైరు సంపూర్ణ ఆరోగ్యంతో ఏపుగా పెరుగుతోంది.',
    disclaimer:
      'ఇది ప్రాథమిక AI అంచనా. పైరు పొట్ట దశ మరియు గింజ పాలు పోసుకునే దశల్లో నిరంతరం పరిశీలిస్తూ ఉండండి.',
  },
  'sample-healthy-cotton': {
    cropName: 'పత్తి (Gossypium hirsutum)',
    diseaseName: 'ఆరోగ్యకరమైన పైరు (ఎలాంటి తెగుళ్ళు లేవు)',
    isHealthy: true,
    confidenceScore: 97,
    severity: 'None',
    pathogenType: 'None',
    symptoms: [
      'విశాలమైన దృఢమైన ముదురు ఆకుపచ్చని పత్తి ఆకులు.',
      'రసం పీల్చే పురుగులు (పేనుబంక, తెల్లదోమ, తామర పురుగులు) లేవు.',
      'కొమ్మలు, పూత కాత ఆరోగ్యకరంగా ఏర్పడుతున్నాయి.',
      'ఎలాంటి కోణీయ మచ్చలు లేదా ఆకుముడుత తెగుళ్ళు లేవు.',
    ],
    causes: [
      'డ్రిప్ ద్వారా క్రమబద్ధమైన నీటి యాజమాన్యం.',
      'సమతుల్య ఎరువులు మరియు మెగ్నీషియం, బోరాన్ లభ్యత.',
      'సమగ్ర సస్యరక్షణ చర్యలు పాటించడం.',
    ],
    immediateActions: [
      'పూత దశలో నీటి ఎద్దడి రాకుండా తడులు ఇవ్వండి.',
      'పసుపు, నీలి జిగురు అట్టలను ఎకరానికి 10-15 అమర్చండి.',
      'కాయ తొలుచు పురుగుల కోసం వారానికోసారి కాయలను పరిశీలించండి.',
    ],
    organicTreatments: [
      '5% వేప గింజల కషాయం (NSKE) ముందస్తుగా పిచికారీ చేయండి.',
      'బయో-స్టిమ్యులెంట్ అమినో యాసిడ్ స్ప్రే పూత దశలో చేయండి.',
    ],
    chemicalTreatments: [
      'ప్రస్తుతం ఎలాంటి రసాయన మందులు అవసరం లేదు.',
    ],
    preventionSteps: [
      'ఆకులు ఎర్రబడకుండా 1% మెగ్నీషియం సల్ఫేట్ + 0.2% బోరాన్ పిచికారీ చేయండి.',
      'పొలం చుట్టూ కలుపు లేకుండా శుభ్రంగా ఉంచండి.',
    ],
    recoveryTime: 'పైరు అత్యుత్తమ దిగుబడి సామర్థ్యంతో ఆరోగ్యంగా ఉంది.',
    disclaimer:
      'ఇది ప్రాథమిక AI అంచనా. కాయల పెరుగుదల దశ వరకు నిరంతరం పరిశీలిస్తూ ఉండండి.',
  },
  'sample-healthy-tomato': {
    cropName: 'టమాటా (Solanum lycopersicum)',
    diseaseName: 'ఆరోగ్యకరమైన పైరు (ఎలాంటి తెగుళ్ళు లేవు)',
    isHealthy: true,
    confidenceScore: 98,
    severity: 'None',
    pathogenType: 'None',
    symptoms: [
      'మంచి పచ్చదనంతో కళకళలాడుతున్న బలమైన ఆకులు.',
      'ఎలాంటి పసుపు రంగు మచ్చలు, ముడుతలు లేదా శిలీంధ్ర లక్షణాలు లేవు.',
      'ఆకు వెనుక భాగం శుభ్రంగా ఉండి రసం పీల్చే పురుగులు లేదా బూజు లేదు.',
      'చిగుళ్ళు ఏపుగా పెరుగుతూ ఆరోగ్యకరంగా ఉన్నాయి.',
    ],
    causes: [
      'సమతుల్య ఎన్పీకే మరియు సూక్ష్మ పోషకాల లభ్యత.',
      'సక్రమమైన నీటి యాజమాన్యం మరియు తేమ నిర్వహణ.',
      'సకాలంలో సస్యరక్షణ చర్యలు చేపట్టడం.',
    ],
    immediateActions: [
      'ప్రస్తుత సాగు పద్ధతులను మరియు డ్రిప్ నీటి షెడ్యూల్‌ను కొనసాగించండి.',
      'పేనుబంక లేదా తెల్లదోమల కోసం వారానికి రెండుసార్లు క్రమం తప్పకుండా గమనించండి.',
      'నేల ఉష్ణోగ్రత నిలకడగా ఉండేలా మల్చింగ్ సరిగ్గా ఉందో లేదో చూడండి.',
    ],
    organicTreatments: [
      'మొక్క రోగనిరోధక శక్తిని పెంచడానికి సముద్రపు నాచు సారం (2 మి.లీ/లీటరు) పిచికారీ చేయండి.',
      'ముందస్తు రక్షణగా 0.3% వేపనూనె పిచికారీ చేయండి.',
      'జీవామృతం లేదా కంపోస్ట్ టీని వేర్ల వద్ద అందించండి.',
    ],
    chemicalTreatments: [
      'ప్రస్తుతం ఎలాంటి రసాయన మందులు అవసరం లేదు.',
      'వర్ష సూచన ఉన్నప్పుడు మాత్రమే ముందస్తుగా కాపర్ లేదా మాంకోజెబ్ సిద్ధంగా ఉంచుకోండి.',
    ],
    preventionSteps: [
      'గాలి, వెలుతురు బాగా తగిలేలా కొమ్మలను కర్రలకు కట్టండి.',
      'నేల పీహెచ్ (6.2 - 6.8) మరియు పోషకాల స్థాయిని క్రమంగా పరీక్షించండి.',
      'కాయలు పగలకుండా పొటాషియం మరియు కాల్షియం ఎరువులను సక్రమంగా అందించండి.',
    ],
    recoveryTime: 'మొక్క సంపూర్ణ ఆరోగ్యంతో వేగంగా ఎదుగుతోంది.',
    disclaimer:
      'ఇది ప్రాథమిక AI అంచనా. పంట దశలు మరియు వాతావరణ మార్పులను బట్టి వారానికోసారి క్షేత్రాన్ని పరిశీలిస్తూ ఉండండి.',
  },
};

export function getLocalizedSampleLeaves(language: SupportedLanguage): SampleLeaf[] {
  if (language === 'Telugu') {
    return TELUGU_SAMPLE_LEAVES;
  }
  return SAMPLE_LEAVES;
}

export function getLocalizedSampleDetections(language: SupportedLanguage): Record<string, DiseaseDetectionResult> {
  if (language === 'Telugu') {
    return TELUGU_SAMPLE_DETECTIONS_DB;
  }
  return SAMPLE_DETECTIONS_DB;
}

export function localizeDiseaseResult(
  result: DiseaseDetectionResult,
  targetLanguage: SupportedLanguage
): DiseaseDetectionResult {
  if (!result) return result;

  const isTelugu = targetLanguage === 'Telugu';
  const hasTelugu = /[\u0C00-\u0C7F]/.test(result.diseaseName || '') || /[\u0C00-\u0C7F]/.test(result.symptoms?.[0] || '');

  // If already matches target language, return as is
  if (isTelugu && hasTelugu) return result;
  if (!isTelugu && !hasTelugu) return result;

  // Try matching against sample detections DB first
  for (const [key, enItem] of Object.entries(SAMPLE_DETECTIONS_DB)) {
    const teItem = TELUGU_SAMPLE_DETECTIONS_DB[key];
    if (!teItem) continue;

    // Check if result matches this crop/disease
    const matchEn =
      enItem.cropName.toLowerCase().includes((result.cropName || '').toLowerCase()) ||
      enItem.diseaseName.toLowerCase().includes((result.diseaseName || '').toLowerCase());
    const matchTe =
      teItem.cropName.toLowerCase().includes((result.cropName || '').toLowerCase()) ||
      teItem.diseaseName.toLowerCase().includes((result.diseaseName || '').toLowerCase());

    if (matchEn || matchTe) {
      const sourceDb = isTelugu ? teItem : enItem;
      return {
        ...result,
        cropName: sourceDb.cropName,
        diseaseName: sourceDb.diseaseName,
        severity: sourceDb.severity,
        pathogenType: sourceDb.pathogenType,
        symptoms: sourceDb.symptoms,
        causes: sourceDb.causes,
        immediateActions: sourceDb.immediateActions,
        organicTreatments: sourceDb.organicTreatments,
        chemicalTreatments: sourceDb.chemicalTreatments,
        preventionSteps: sourceDb.preventionSteps,
        recoveryTime: sourceDb.recoveryTime,
        disclaimer: sourceDb.disclaimer,
      };
    }
  }

  // If dynamic translation to Telugu is required and not directly in DB:
  if (isTelugu) {
    const translateText = (text: string) => {
      if (!text) return '';
      if (/[\u0C00-\u0C7F]/.test(text)) return text;
      // Common phrase translations for custom scanned leaves
      return text
        .replace(/prune/gi, 'కత్తిరించండి')
        .replace(/spray/gi, 'పిచికారీ చేయండి')
        .replace(/destroy/gi, 'నాశనం చేయండి')
        .replace(/leaves/gi, 'ఆకులు')
        .replace(/leaf/gi, 'ఆకు')
        .replace(/water/gi, 'నీరు')
        .replace(/infected/gi, 'తెగులు సోకిన')
        .replace(/fungicide/gi, 'శిలీంధ్రనాశిని')
        .replace(/pesticide/gi, 'పురుగుల మందు')
        .replace(/neem oil/gi, 'వేప నూనె')
        .replace(/irrigation/gi, 'నీటి పారుదల')
        .replace(/fertilizer/gi, 'ఎరువులు');
    };

    return {
      ...result,
      severity: result.severity === 'High' ? 'తీవ్రమైనది' : result.severity === 'Moderate' ? 'మధ్యస్థం' : 'ఆరోగ్యకరం',
      symptoms: (result.symptoms || []).map((s) => translateText(s)),
      causes: (result.causes || []).map((c) => translateText(c)),
      immediateActions: (result.immediateActions || []).map((a) => translateText(a)),
      organicTreatments: (result.organicTreatments || []).map((o) => translateText(o)),
      chemicalTreatments: (result.chemicalTreatments || []).map((c) => translateText(c)),
      preventionSteps: (result.preventionSteps || []).map((p) => translateText(p)),
      recoveryTime: result.recoveryTime ? translateText(result.recoveryTime) : '7 - 14 రోజుల్లో రికవరీ',
      disclaimer: 'ఇది ప్రాథమిక AI అంచనా మాత్రమే. పెద్ద ఎత్తున రసాయన మందులు పిచికారీ చేసే ముందు స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.',
    };
  }

  return result;
}
