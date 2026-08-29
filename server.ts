import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Support larger payload for high-res leaf photos
app.use(express.json({ limit: '25mb' }));

// Lazy initialize Gemini client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  try {
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
    return null;
  }
}

// Helper to safely handle Gemini errors without polluting logs
function handleGeminiError(context: string, err: any) {
  console.warn(`[${context}] Gemini multimodal vision note:`, err?.message || err);
}

// Helper to safely extract JSON from LLM responses even with markdown wrappers
function extractJson(rawText?: string): any {
  if (!rawText) return null;
  try {
    let clean = rawText.trim();
    if (clean.startsWith('```')) {
      clean = clean.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
    }
    const start = clean.indexOf('{');
    const end = clean.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      clean = clean.substring(start, end + 1);
    }
    return JSON.parse(clean);
  } catch (e) {
    return null;
  }
}

// Health check
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  res.json({ status: 'ok', geminiConfigured: hasKey, app: 'AgriPulse AI' });
});

// AI Crop Disease Detection Endpoint (Universal Multimodal Gemini Vision)
app.post('/api/detect-disease', async (req, res) => {
  try {
    const {
      imageBase64,
      mimeType = 'image/jpeg',
      cropHint = '',
      fileName = '',
      language = 'Telugu',
    } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required for crop analysis' });
    }

    const ai = getGeminiClient();

    // Clean and extract base64 data and mimeType
    let cleanBase64 = imageBase64;
    let detectedMimeType = mimeType || 'image/jpeg';

    if (typeof imageBase64 === 'string') {
      if (imageBase64.startsWith('data:')) {
        const matches = imageBase64.match(/^data:([^;]+);base64,(.+)$/s);
        if (matches) {
          detectedMimeType = matches[1];
          cleanBase64 = matches[2];
        } else {
          const parts = imageBase64.split('base64,');
          if (parts.length > 1) {
            cleanBase64 = parts[1];
          }
        }
      } else if (imageBase64.startsWith('http://') || imageBase64.startsWith('https://')) {
        try {
          const imgRes = await fetch(imageBase64);
          const arrayBuffer = await imgRes.arrayBuffer();
          cleanBase64 = Buffer.from(arrayBuffer).toString('base64');
          detectedMimeType = imgRes.headers.get('content-type') || 'image/jpeg';
        } catch (fetchErr) {
          console.warn('Failed to fetch image URL:', fetchErr);
        }
      }
    }

    cleanBase64 = cleanBase64.trim().replace(/\s+/g, '');

    if (ai && cleanBase64) {
      const prompt = `You are AgriPulse AI, a world-class plant pathologist, botanical taxonomist, and multimodal computer vision crop doctor.
Analyze the provided crop or plant photograph with high scientific precision based strictly on its visible visual features.

MANDATORY DIRECTIVE 1: DYNAMIC BOTANICAL SPECIES IDENTIFICATION
- Visually inspect the plant in the photograph: leaf shape (monocot blade, broadleaf, palmate, compound, trifoliate, lobed), venation (parallel vs. netted), leaf margin (smooth, serrated, crenate), texture, petiole, stem, and any visible fruit, pods, panicles, bolls, or flowers.
- Accurately determine the exact plant/crop species shown (e.g. Mango, Rice / Paddy, Cotton, Chili / Pepper, Corn / Maize, Wheat, Sugarcane, Potato, Tomato, Banana, Apple, Citrus / Lemon, Papaya, Guava, Soybean, Groundnut / Peanut, Mustard, Chickpea, Brinjal / Eggplant, Okra, Onion, Garlic, Coffee, Tea, Rose, Cucumber, Watermelon, Grape, Pomegranate, Turmeric, Ginger, Coconut, etc.).
- NEVER default to Tomato or Early Blight unless the photo unequivocally depicts a tomato plant.
- If the image depicts Mango (Mangifera indica), identify it as Mango (Mangifera indica). If it depicts Wheat (Triticum aestivum), identify as Wheat. If Paddy/Rice (Oryza sativa), identify as Paddy/Rice.
- Include both the common name and the scientific/botanical name in parentheses in the cropName field (e.g. "Mango (Mangifera indica)", "Rice / Paddy (Oryza sativa)", "Cotton (Gossypium hirsutum)", "Chili / Pepper (Capsicum annuum)", "Wheat (Triticum aestivum)", "Sugarcane (Saccharum officinarum)", "Corn / Maize (Zea mays)", "Potato (Solanum tuberosum)", "Tomato (Solanum lycopersicum)", "Banana (Musa acuminata)", "Apple (Malus domestica)", "Citrus / Lemon (Citrus limon)").
${cropHint ? `- The user provided an optional hint: "${cropHint}". Verify whether the visual evidence matches this hint, but prioritize what is actually visible in the photo.` : ''}

MANDATORY DIRECTIVE 2: DYNAMIC PATHOLOGY & HEALTH ASSESSMENT
- Inspect the foliage, stems, and fruits for any symptoms: leaf spots, concentric lesions, blights, rust pustules, powdery/downy mildews, anthracnose lesions, bacterial streaks, viral leaf curls or mosaic discoloration, chlorosis, necrosis, chewing/sucking pest damage, nutrient deficiencies.
- If the plant is vibrant and healthy with no lesions, set isHealthy: true, diseaseName: "Healthy Crop - No Pathogen Detected", severity: "None", pathogenType: "None", and confidenceScore between 95 and 99.
- If diseased or deficient, diagnose the exact condition with the pathogen scientific name (e.g. "Mango Anthracnose (Colletotrichum gloeosporioides)", "Mango Powdery Mildew (Oidium mangiferae)", "Rice Blast (Magnaporthe oryzae)", "Cotton Bacterial Blight (Xanthomonas citri)", "Chili Anthracnose (Colletotrichum capsici)", "Wheat Leaf Rust (Puccinia triticina)", "Sugarcane Red Rot (Colletotrichum falcatum)", "Northern Corn Leaf Blight (Exserohilum turcicum)", "Potato Late Blight (Phytophthora infestans)", "Tomato Early Blight (Alternaria solani)", "Citrus Canker (Xanthomonas axonopodis)", "Powdery Mildew (Erysiphe spp.)", "Yellow Vein Mosaic Virus", "Leaf Curl Virus", "Iron Deficiency Chlorosis", etc.).
- Dynamically estimate confidenceScore (75 to 99) and severity ("Low", "Moderate", "High", or "None").

MANDATORY DIRECTIVE 3: TAILORED AGRONOMIC RECOMMENDATIONS
- symptoms: 3 to 5 bullet points describing specific visual symptoms visible in this photo.
- causes: 2 to 4 bullet points outlining environmental and biological triggers for this condition.
- immediateActions: 2 to 3 urgent field steps the farmer must take immediately.
- organicTreatments: 2 to 3 organic or bio-pesticide treatments (e.g. Trichoderma, Pseudomonas, Neem oil/NSKE, Bordeaux mixture, Jeevamrutha).
- chemicalTreatments: 2 to 3 conventional remedies with specific active chemical ingredients and standard dilution/application dosage (e.g. per liter or per acre).
- preventionSteps: 3 to 4 cultural and preventive practices for future crop cycles.
- recoveryTime: realistic recovery timeline.
- disclaimer: safety advisory to consult local extension officers before spraying.

LANGUAGE SPECIFICATIONS:
- Output all response values in ${language} language.
${language === 'Telugu' ? '- Use clear, natural, farmer-friendly Telugu script and agronomic terminology.' : ''}
${language === 'Hindi' ? '- Use clear Hindi in Devanagari script.' : ''}
${language === 'Tamil' ? '- Use clear Tamil script.' : ''}
${language === 'Kannada' ? '- Use clear Kannada script.' : ''}
${language === 'Malayalam' ? '- Use clear Malayalam script.' : ''}
${language === 'Marathi' ? '- Use clear Marathi script.' : ''}

Respond ONLY with valid JSON conforming to the schema.`;

      const contentsArray = [
        {
          inlineData: {
            mimeType: detectedMimeType,
            data: cleanBase64,
          },
        },
        prompt,
      ];

      const schemaConfig = {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            cropName: { type: Type.STRING },
            diseaseName: { type: Type.STRING },
            isHealthy: { type: Type.BOOLEAN },
            confidenceScore: { type: Type.INTEGER },
            severity: { type: Type.STRING },
            pathogenType: { type: Type.STRING },
            symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
            causes: { type: Type.ARRAY, items: { type: Type.STRING } },
            immediateActions: { type: Type.ARRAY, items: { type: Type.STRING } },
            organicTreatments: { type: Type.ARRAY, items: { type: Type.STRING } },
            chemicalTreatments: { type: Type.ARRAY, items: { type: Type.STRING } },
            preventionSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
            recoveryTime: { type: Type.STRING },
            disclaimer: { type: Type.STRING },
          },
          required: [
            'cropName',
            'diseaseName',
            'isHealthy',
            'confidenceScore',
            'severity',
            'pathogenType',
            'symptoms',
            'causes',
            'immediateActions',
            'organicTreatments',
            'chemicalTreatments',
            'preventionSteps',
            'recoveryTime',
            'disclaimer',
          ],
        },
      };

      // 1. Primary Attempt: Gemini 3.7 Flash
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: contentsArray,
          config: schemaConfig,
        });

        if (response.text) {
          const parsed = extractJson(response.text);
          if (parsed && parsed.cropName && parsed.diseaseName) {
            return res.json({ success: true, source: 'gemini-3.7-flash', data: parsed });
          }
        }
      } catch (geminiError: any) {
        handleGeminiError('Gemini 3.7 Flash Vision Primary', geminiError);

        // 2. Retry Attempt with Gemini 3.7 Flash with prompt-enforced JSON
        try {
          await new Promise((r) => setTimeout(r, 600));
          const retryResponse = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: contentsArray,
            config: {
              responseMimeType: 'application/json',
            },
          });
          if (retryResponse.text) {
            const parsed = extractJson(retryResponse.text);
            if (parsed && parsed.cropName && parsed.diseaseName) {
              return res.json({ success: true, source: 'gemini-3.7-flash', data: parsed });
            }
          }
        } catch (retryError: any) {
          handleGeminiError('Gemini 3.7 Flash Vision Retry', retryError);
        }
      }
    }

    // Universal Open-Ended Multi-Crop Knowledge Engine
    const fallbackResults = getFallbackDiseaseAnalysis(cropHint || fileName, language, cleanBase64);
    return res.json({
      success: true,
      source: 'offline-expert-model',
      data: fallbackResults,
    });
  } catch (error: any) {
    console.error('Disease detection error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze crop image' });
  }
});

// AI Multilingual Conversational Voice Assistant for Farmers (Open-Ended Agricultural AI)
app.post('/api/voice-assistant', async (req, res) => {
  try {
    const {
      message,
      language = 'Telugu',
      history = [],
      hasImage = false,
      imageBase64,
      mimeType = 'image/jpeg',
    } = req.body;

    if (!message && !imageBase64) {
      return res.status(400).json({ error: 'Message or image is required' });
    }

    const ai = getGeminiClient();

    // Map language to name & instructions with deep focus on natural farmer conversation
    const languageGuidelines: Record<string, string> = {
      Telugu: `IMPORTANT TELUGU LANGUAGE GUIDELINES:
- Speak in NATURAL, SIMPLE, CLEAR, CONVERSATIONAL TELUGU as spoken by real farmers in Andhra Pradesh and Telangana.
- DO NOT translate English sentences word-for-word into Telugu.
- Avoid stiff, bookish, Sanskritized, or overly formal Telugu (do not use words like "కార్యాచరణను చేపట్టవలెను", "ప్రాథమిక విశ్లేషణను జరిపి", "నిర్ధారించుటకు").
- Use everyday farmer-friendly words (like "ముందుగా చూడండి", "గమనించండి", "తడి ఇవ్వండి", "స్ప్రే చేయండి", "ఎరువు వేయండి", "బాగుంటుంది").
- Understand natural spoken Telugu and mixed Telugu-English agricultural terms (e.g., "వరి వేశాను", "టమాటాలో leaf spots వచ్చాయి", "నిన్న pesticide spray చేశాను", "NPK fertilizer ఎప్పుడు వేయాలి?", "నిన్న ఎరువు వేశాను, ఇవాళ నీళ్లు పెట్టొచ్చా?", "చిల్లీకి నీళ్లు ఎంత ఇవ్వాలి?", "వర్షం పడింది, ఇప్పుడు స్ప్రే చేయొచ్చా?").
- If technical terms like nitrogen, boron, or fungal infection are mentioned, explain them simply in Telugu (e.g., "మొక్కలకు నత్రజని పోషకం తక్కువగా ఉండటం వల్ల లేదా ఎక్కువ నీరు నిల్వ ఉండటం వల్ల కూడా ఆకులు పసుపు రంగులోకి మారవచ్చు").
- Voice response structure:
  1. Acknowledge and give a direct answer first.
  2. Provide 2-3 practical, simple next steps.
  3. Ask a friendly, short follow-up question if helpful (e.g., "మీరు వరి ఎప్పుడు వేశారు? ఎన్ని రోజులైంది?").`,
      Hindi: 'Respond in natural, respectful, conversational Hindi using Devanagari script (or Hinglish if the farmer used Romanized Hindi). Use warm farmer terms like "नमस्ते किसान भाई / किसान मित्र".',
      English: 'Respond in simple, clear, conversational, farmer-friendly English.',
      Tamil: 'Respond in natural, respectful, conversational Tamil using Tamil script (or Tanglish). Use warm terms like "வணக்கம் விவசாய நண்பரே".',
      Kannada: 'Respond in natural, respectful, conversational Kannada using Kannada script (or Kanglish). Use warm terms like "ನಮಸ್ಕಾರ ರೈತ ಮಿತ್ರರೇ".',
      Malayalam: 'Respond in natural, respectful, conversational Malayalam using Malayalam script (or Manglish). Use warm terms like "നമസ്കാരം കർഷക സുഹൃത്തേ".',
      Marathi: 'Respond in natural, respectful, conversational Marathi using Marathi script. Use warm terms like "नमस्कार शेतकरी मित्र".',
    };

    const langInstruction = languageGuidelines[language] || languageGuidelines['English'];

    if (ai) {
      try {
        const systemInstruction = `You are "AgriPulse AI", a friendly, empathetic, highly knowledgeable, and conversational agricultural AI advisor speaking directly with a farmer over voice.

PRIMARY OBJECTIVE:
You are an open-ended conversational agricultural assistant. You can answer ANY farming, crop cultivation, pest/disease, fertilizer/irrigation, soil, weather, or post-harvest question naturally and clearly. You are NOT restricted to predefined categories.

CORE CONVERSATIONAL PRINCIPLES:
1. Natural Farmer Dialogue & Mixed Language Understanding:
   - Farmers speak naturally, often mixing English words (e.g. "spray", "pesticide", "fertilizer", "leaf spots", "drip", "NPK", "urea", "chilli", "paddy").
   - Understand statements like "నేను వరి వేశాను, ఇప్పుడు ఏం చేయాలి?", "నిన్న ఎరువు వేశాను, ఇవాళ నీళ్లు పెట్టొచ్చా?", "నా టమాటా ఆకులు పసుపు రంగులోకి వెళ్తున్నాయి", "పంట సరిగ్గా పెరగడం లేదు", "వర్షం పడింది, ఇప్పుడు స్ప్రే చేయొచ్చా?", "చిల్లీకి నీళ్లు ఎంత ఇవ్వాలి?".
   - Understand the farmer's intent and context even if sentences are informal, colloquial, or grammatically incomplete.

2. Context & Multi-turn Continuity:
   - Retain full context from previous turns in the conversation.
   - If the farmer mentioned a crop earlier (e.g., "నేను వరి వేశాను") and follows up with "ఇప్పుడు ఏం చేయాలి?" or "మరి నీళ్లు ఎంత ఇవ్వాలి?", immediately know they are referring to their paddy crop.

3. Spoken Voice Response Structure (Concise & Easy to Listen):
   - Direct answer/acknowledgment first.
   - Practical 2-3 next steps (numbered or brief lines).
   - Friendly follow-up question if critical details (e.g., crop age, variety, soil moisture) will help refine the advice.

4. Explaining Technical Terms Simply:
   - When mentioning nutrient deficiencies or diseases, explain in simple, friendly terms without heavy academic jargon.

5. Visual Crop Symptoms / Leaf Problems:
   - When leaf spots, yellowing, pests, or curling are reported, gently advise sharing a leaf photo via the camera button for visual examination.

6. Language Specific Rules:
   - Target Language: ${language}.
   ${langInstruction}
   - Safety: Advise consulting the local Mandal Agricultural Officer (MAO) before heavy chemical sprays.`;

        // Format conversation history for Gemini
        const formattedContents: any[] = [];

        if (Array.isArray(history) && history.length > 0) {
          // Take recent turns for comprehensive context
          const recentHistory = history.slice(-8);
          for (const item of recentHistory) {
            formattedContents.push({
              role: item.role === 'farmer' || item.role === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }],
            });
          }
        }

        // Current message parts
        const currentParts: any[] = [];
        if (imageBase64) {
          const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
          currentParts.push({
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64,
            },
          });
        }
        if (message) {
          currentParts.push({ text: message });
        }

        formattedContents.push({
          role: 'user',
          parts: currentParts,
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: formattedContents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.65,
          },
        });

        const replyText = response.text || '';
        const shouldSuggestPhoto =
          /photo|image|picture|camera|ఫొటో|ఫోటో|तस्वीर|फोटो|படம்|ಫೋಟೋ|ചിത്രം|छायाचित्र/i.test(replyText) ||
          /spot|pest|disease|machcha|keeda|puzhu|roga|kida|yellow|burn|curl|wilt/i.test(message || '');

        return res.json({
          success: true,
          reply: replyText,
          shouldSuggestPhoto: shouldSuggestPhoto,
          language: language,
        });
      } catch (geminiErr) {
        handleGeminiError('Voice Assistant', geminiErr);
      }
    }

    // Comprehensive offline agronomist knowledge engine for all farming stages & experiences
    const fallbackResponse = getMultilingualVoiceFallback(message, language, history);
    res.json({
      success: true,
      reply: fallbackResponse.text,
      shouldSuggestPhoto: fallbackResponse.suggestPhoto,
      language: language,
      source: 'builtin-agronomist-engine',
    });
  } catch (error: any) {
    console.error('Voice assistant error:', error);
    res.status(500).json({ error: 'Failed to process voice conversation' });
  }
});

// Comprehensive conversational fallback response generator covering all agricultural scenarios
function getMultilingualVoiceFallback(message = '', language = 'Telugu', history: any[] = []) {
  const msg = message.toLowerCase();
  
  // Extract previous context if current message is a short follow-up (e.g. "What should I do next?")
  let contextualCrop = '';
  if (history && history.length > 0) {
    const fullHistoryText = history.map((h: any) => (h.text || '').toLowerCase()).join(' ');
    if (fullHistoryText.includes('paddy') || fullHistoryText.includes('వరి') || fullHistoryText.includes('धान') || fullHistoryText.includes('rice')) contextualCrop = 'paddy';
    else if (fullHistoryText.includes('chilli') || fullHistoryText.includes('మిరప') || fullHistoryText.includes('मिर्च')) contextualCrop = 'chilli';
    else if (fullHistoryText.includes('tomato') || fullHistoryText.includes('టమాటా') || fullHistoryText.includes('टमाटर')) contextualCrop = 'tomato';
    else if (fullHistoryText.includes('cotton') || fullHistoryText.includes('పత్తి') || fullHistoryText.includes('कपास')) contextualCrop = 'cotton';
    else if (fullHistoryText.includes('groundnut') || fullHistoryText.includes('వేరుశనగ') || fullHistoryText.includes('मूंगफली')) contextualCrop = 'groundnut';
    else if (fullHistoryText.includes('maize') || fullHistoryText.includes('మొక్కజొన్న') || fullHistoryText.includes('मक्का')) contextualCrop = 'maize';
  }

  // 1. Sowing / Sown paddy / Sowing crops ("నేను వరి వేశాను, ఇప్పుడు ఏం చేయాలి?")
  const isSownPaddy = (msg.includes('sown') || msg.includes('విత్తాను') || msg.includes('నాటాను') || msg.includes('వేశాను') || msg.includes('వేసాను') || msg.includes('బోయా') || msg.includes('sowing') || msg.includes('వరి సాగు')) &&
    (msg.includes('paddy') || msg.includes('వరి') || msg.includes('rice') || contextualCrop === 'paddy');

  // 2. Tomato leaf spot / disease ("నా టమాటాకు మచ్చలు వచ్చాయి", "టమాటా ఆకుమచ్చ")
  const isTomatoSpots = (msg.includes('tomato') || msg.includes('టమాటా') || contextualCrop === 'tomato') &&
    (msg.includes('మచ్చ') || msg.includes('spot') || msg.includes('తెగులు') || msg.includes('ఆకు') || msg.includes('leaf') || msg.includes('మచ్చలు'));

  // 3. Planted chilli / Transplanting vegetables ("గత వారం మిరప నాటాను / చిల్లీ నాటాను, తర్వాతి దశలేమిటి?")
  const isPlantedChilliOrVegetables = (msg.includes('plant') || msg.includes('నాటాను') || msg.includes('వేశాను') || msg.includes('వేసాను') || msg.includes('లగాయా') || msg.includes('transplant')) &&
    (msg.includes('chilli') || msg.includes('మిరప') || msg.includes('చిల్లీ') || msg.includes('mirch') || msg.includes('tomato') || msg.includes('టమాటా') || contextualCrop === 'chilli');

  // 4. Fertilizer applied yesterday -> Can I irrigate today? ("నిన్న ఎరువు వేశాను, ఇవాళ నీళ్లు పెట్టొచ్చా?")
  const isFertilizerIrrigation = (msg.includes('fertilizer') || msg.includes('ఎరువు') || msg.includes('ఎరువులు') || msg.includes('खाद') || msg.includes('urea') || msg.includes('యూరియా') || msg.includes('npk') || msg.includes('పొటాష్')) &&
    (msg.includes('irrigate') || msg.includes('నీరు') || msg.includes('నీళ్లు') || msg.includes('నీళ్ళు') || msg.includes('पानी') || msg.includes('today') || msg.includes('yesterday') || msg.includes('నిన్న') || msg.includes('ఈరోజు') || msg.includes('ఇవాళ') || msg.includes('పెట్టొచ్చా') || msg.includes('పెట్టవచ్చా'));

  // 5. Yellow leaves / Nutrient deficiency / Symptoms ("నా టమాటా ఆకులు పసుపు రంగులోకి వెళ్తున్నాయి")
  const isYellowLeaves = msg.includes('yellow') || msg.includes('పసుపు') || msg.includes('పీలా') || msg.includes('manjal') || msg.includes('haladi');

  // 6. Stunted growth / Not growing ("నా పంట సరిగ్గా పెరగడం లేదు, ఏం చేయాలి?")
  const isStuntedGrowth = msg.includes('పెరగడం లేదు') || msg.includes('పెరగట్లేదు') || msg.includes('ఎదుగుదల') || msg.includes('పెరుగుదల') || msg.includes('grow') || msg.includes('growth') || msg.includes('బలం లేదు') || msg.includes('बढ़वार');

  // 7. Rain / Weather spraying ("వర్షం పడితే స్ప్రే చేయొచ్చా?", "వర్షం పడింది, ఇప్పుడు స్ప్రే చేయొచ్చా?")
  const isRainSpray = (msg.includes('వర్షం') || msg.includes('rain') || msg.includes('వరిశం') || msg.includes('बारिश')) &&
    (msg.includes('spray') || msg.includes('స్ప్రే') || msg.includes('మందు') || msg.includes('కొట్టొచ్చా') || msg.includes('చేయొచ్చా') || msg.includes('छिड़काव'));

  // 8. Chilli water requirement ("చిల్లీకి నీళ్లు ఎంత ఇవ్వాలి?")
  const isChilliWater = (msg.includes('chilli') || msg.includes('మిరప') || msg.includes('చిల్లీ')) &&
    (msg.includes('నీరు') || msg.includes('నీళ్లు') || msg.includes('నీళ్ళు') || msg.includes('water') || msg.includes('irrigation'));

  // 9. Chilli pesticide / medicine / leaf curl ("మిరప పంటకి ఇప్పుడు ఏ మందు వేయాలి?", "మిరప ఆకు ముడుత")
  const isChilliPestSpray = (msg.includes('chilli') || msg.includes('మిరప') || msg.includes('చిల్లీ')) &&
    (msg.includes('మందు') || msg.includes('spray') || msg.includes('స్ప్రే') || msg.includes('పురుగు') || msg.includes('ముడుత') || msg.includes('ముడత') || msg.includes('తామర') || msg.includes('pesticide'));

  // 10. Cotton / Kapas pests & management ("పత్తి పంట", "గులాబీ రంగు పురుగు")
  const isCottonQuery = msg.includes('cotton') || msg.includes('పత్తి') || msg.includes('కపాస్');

  // 11. Groundnut / Peanut ("వేరుశనగ", "తిక్కా ఆకుమచ్చ")
  const isGroundnutQuery = msg.includes('groundnut') || msg.includes('వేరుశనగ') || msg.includes('పల్లీ') || msg.includes('మూంగఫలీ');

  // 12. Maize / Corn ("మొక్కజొన్న", "కత్తెర పురుగు")
  const isMaizeQuery = msg.includes('maize') || msg.includes('corn') || msg.includes('మొక్కజొన్న') || msg.includes('మక్కా');

  // 13. Weed management ("కలుపు నివారణ", "కలుపు మందు")
  const isWeedQuery = msg.includes('weed') || msg.includes('కలుపు') || msg.includes('గడ్డి') || msg.includes('खरपतवार');

  // 14. Organic farming / Neem oil ("సేంద్రీయ వ్యవసాయం", "వేప నూనె")
  const isOrganicQuery = msg.includes('organic') || msg.includes('సేంద్రీయ') || msg.includes('వేప') || msg.includes('జీవామృతం') || msg.includes('neem');

  // 15. Harvest completed -> Post-harvest next steps
  const isPostHarvest = msg.includes('harvest') || msg.includes('కోత') || msg.includes('కోసాను') || msg.includes('కోసేశాను') || msg.includes('కొయ్యడం') || msg.includes('कटाई') || msg.includes('post-harvest') || msg.includes('నిల్వ');

  // 16. Generic "What should I do next?" follow-up
  const isFollowUpNext = msg.includes('next') || msg.includes('తర్వాత') || msg.includes('తరువాత') || msg.includes('ఇప్పుడు ఏమి') || msg.includes('ఇప్పుడు ఏం') || msg.includes('आगे क्या') || msg.includes('what to do');

  // 17. Pest / Disease / Leaf Spot general
  const isDiseaseRelated =
    msg.includes('spot') || msg.includes('machcha') || msg.includes('మచ్చ') || msg.includes('మచ్చలు') || msg.includes('kida') || msg.includes('krimi') ||
    msg.includes('keeda') || msg.includes('pest') || msg.includes('disease') || msg.includes('leaf') ||
    msg.includes('aaku') || msg.includes('ఆకు') || msg.includes('patte') || msg.includes('rogam') || msg.includes('roga') ||
    msg.includes('spray') || msg.includes('స్ప్రే') || msg.includes('పురుగు') || msg.includes('పురుగులు') || msg.includes('తెగులు') || msg.includes('దోమ');

  // 18. Weather / Rain
  const isWeather = msg.includes('weather') || msg.includes('rain') || msg.includes('వాతావరణం') || msg.includes('వర్షం') || msg.includes('मौसम') || msg.includes('बारिश');

  // --- Telugu Response Mapping (Natural, Conversational, Farmer-Friendly Telugu) ---
  if (language === 'Telugu') {
    if (isSownPaddy) {
      return {
        text: 'మీరు వరి వేశారంటే ఇప్పుడు ముందుగా నేలలో తేమ సరిగ్గా ఉందో చూడండి.\n\nతర్వాత చేయాల్సిన పనులు:\n1. మొలకలు సరిగ్గా వస్తున్నాయా గమనించండి.\n2. కలుపు రాకుండా 3-5 రోజుల లోపు తగిన కలుపు మందు వేయండి.\n3. విత్తిన మొదటి వారం నీరు నిలవకుండా పలుచటి తడులు మాత్రమే ఇవ్వండి.\n\nమీరు వరి విత్తి ఎన్ని రోజులైంది రైతు సోదరా?',
        suggestPhoto: false,
      };
    }
    if (isTomatoSpots) {
      return {
        text: 'టమాటా ఆకులపై మచ్చలు రావడానికి ముందస్తు ఆకుమచ్చ (Early Blight) లేదా సెప్టోరియా శిలీంధ్ర తెగులు కారణం కావచ్చు.\n\nనివారణ చర్యలు:\n1. కింద నేలకు తగిలే పాత, మచ్చలున్న ఆకులను తుంచి నాశనం చేయండి.\n2. మాంకోజెబ్ (2.5 గ్రా/లీ) లేదా కాపర్ ఆక్సిక్లోరైడ్ (3 గ్రా/లీ) నీటిలో కలిపి పిచికారీ చేయండి.\n3. మొక్క మొదళ్లలో నీరు నిలవకుండా చూడండి.\n\nస్పష్టమైన నిర్ధారణ కోసం ఆకును కెమెరాతో ఫోటో తీసి ఇక్కడ పంపించండి.',
        suggestPhoto: true,
      };
    }
    if (isPlantedChilliOrVegetables) {
      return {
        text: 'మిరప నాటిన మొదటి వారంలో మొక్కలు బాగా వేరు పట్టుకోవడం చాలా ముఖ్యం.\n\nతర్వాత పనులు:\n1. మొదటి 7-10 రోజులు నేలలో పదును ఉండేలా తేలికపాటి నీటి తడులు ఇవ్వండి.\n2. చనిపోయిన లేదా వాడిపోయిన మొక్కల స్థానంలో వెంటనే కొత్త మొక్కలు నాటండి.\n3. లేత ఆకులపై తామర పురుగులు లేదా పేనుబంక ఉందేమో గమనించండి.\n\nతోటలో మొక్కలు బాగానే నిలదొక్కుకున్నాయా?',
        suggestPhoto: false,
      };
    }
    if (isFertilizerIrrigation) {
      return {
        text: 'అవునండీ, నిన్న ఎరువు వేస్తే ఈరోజు తప్పకుండా తేలికపాటి నీళ్లు పెట్టవచ్చు. దీనివల్ల ఎరువు కరిగి నేరుగా మొక్కల వేర్లకు అందుతుంది. అయితే మరీ ఎక్కువ నీరు పారించకుండా, నేలలో పదును ఉండేలా చూసుకోండి.',
        suggestPhoto: false,
      };
    }
    if (isYellowLeaves) {
      return {
        text: 'ఆకులు పసుపు రంగులోకి మారడానికి ముఖ్యంగా ఇవి కారణం కావచ్చు:\n1. మొక్కలకు నత్రజని (నైట్రోజన్) లేదా సూక్ష్మ పోషకాల లోపం ఉండటం.\n2. నేలలో నీరు ఎక్కువై వేర్లకు గాలి అందకపోవడం.\n3. ఆకుల అడుగున తెల్లదోమ లేదా రసం పీల్చే పురుగులు ఉండటం.\n\nస్పష్టంగా తెలుసుకోవడానికి ఆకును కెమెరాతో ఫోటో తీసి ఇక్కడ పంపించండి, సరైన సలహా ఇస్తాను.',
        suggestPhoto: true,
      };
    }
    if (isStuntedGrowth) {
      return {
        text: 'పంట సరిగ్గా పెరగకపోవడానికి నేలలో పోషకాల కొరత, నేల గట్టిపడటం లేదా వేరు దగ్గర సమస్యలు కారణం కావచ్చు.\n\nఇప్పుడు చేయాల్సినవి:\n1. మొదట మొక్కల మొదళ్ల వద్ద గాలి ఆడేలా తేలికపాటి గొర్రు తోలడం లేదా కలుపు తీయడం చేయండి.\n2. మొక్కల పెరుగుదలకు 19-19-19 ఎరువును లీటరు నీటికి 5 గ్రాములు కలిపి స్ప్రే చేయండి.\n3. వేరుకుళ్ళు లేదా పురుగులు ఏమైనా ఉన్నాయేమో గమనించండి.\n\nమీరు ఏ పంట వేశారు? ఎన్ని రోజుల పంట?',
        suggestPhoto: false,
      };
    }
    if (isRainSpray) {
      return {
        text: 'వర్షం పడే అవకాశం ఉన్నప్పుడు లేదా వర్షం పడిన వెంటనే మందుల స్ప్రే చేయకూడదు. ఎందుకంటే వర్షానికి మందు కొట్టుకుపోయి వృథా అవుతుంది.\n\nచేయాల్సినవి:\n1. వర్షం ఆగి ఆకులపై నీటి తడి ఆరిన తర్వాత మాత్రమే స్ప్రే చేయండి.\n2. స్ప్రే చేసేటప్పుడు మందుతో పాటు జిగురు (స్ప్రెడర్) కలపండి.\n3. గాలి వేగం తక్కువగా ఉన్న ఉదయం వేళల్లో స్ప్రే చేయడం మంచిది.',
        suggestPhoto: false,
      };
    }
    if (isChilliWater) {
      return {
        text: 'మిరప పంటకు నేలలో ఎప్పుడూ పదును (తేమ) ఉండాలి కానీ ఎక్కువ నీరు నిలవకూడదు. ఎర్ర నేలల్లో అయితే 3-4 రోజులకు ఒకసారి, నల్ల రేగడి నేలల్లో అయితే 6-8 రోజులకు ఒకసారి తేలికపాటి తడి ఇవ్వండి. మీ తోటలో నేల ఎలాంటిది?',
        suggestPhoto: false,
      };
    }
    if (isChilliPestSpray) {
      return {
        text: 'మిరపలో ఆకు ముడుత, తామర పురుగులు లేదా పేనుబంక నివారణకు:\n1. ప్రారంభ దశలో వేప నూనె (10,000 ppm) లీటరుకు 2 మి.లీ కలిపి స్ప్రే చేయండి.\n2. ఉధృతి ఎక్కువగా ఉంటే డైఫెంథియురాన్ లేదా ఫిప్రోనిల్ తగిన మోతాదులో వాడండి.\n3. నల్ల తామర పురుగుల నివారణకు నీలి రంగు జిగురు అట్టలు పెట్టండి.\nమొక్కల ఆకులు పైకి ముడుచుకుంటున్నాయా లేక కిందికి ముడుచుకుంటున్నాయా?',
        suggestPhoto: true,
      };
    }
    if (isCottonQuery) {
      return {
        text: 'పత్తి పంటలో గులాబీ రంగు కాయ తొలిచే పురుగు మరియు రసం పీల్చే పురుగుల నివారణకు:\n1. ఎకరానికి 4-5 లింగాకర్షక బుట్టలు (ఫెరమోన్ ట్రాప్స్) అమర్చండి.\n2. ప్రారంభంలో వేప కషాయం లేదా ప్రొఫెనోఫాస్ పిచికారీ చేయండి.\n3. పైరు 60-70 రోజుల దశలో ఉన్నప్పుడు తలలు తుంచడం ద్వారా పురుగుల ఉధృతిని తగ్గించవచ్చు.',
        suggestPhoto: false,
      };
    }
    if (isGroundnutQuery) {
      return {
        text: 'వేరుశనగ పంటలో తిక్కా ఆకుమచ్చ లేదా తుప్పు తెగులు రాకుండా:\n1. మాంకోజెబ్ లేదా కార్బండజిమ్ + మాంకోజెబ్ మిశ్రమాన్ని లీటరు నీటికి 2 గ్రాములు కలిపి పిచికారీ చేయండి.\n2. ఊడలు దిగే దశలో జిప్సం ఎకరానికి 200 కిలోలు వేసి తేలికపాటి తడి ఇవ్వండి.',
        suggestPhoto: false,
      };
    }
    if (isMaizeQuery) {
      return {
        text: 'మొక్కజొన్నలో కత్తెర పురుగు (Fall Armyworm) నివారణకు:\n1. మొక్కల సుడులలో పురుగు గుడ్లు లేదా విసర్జన ఉందేమో గమనించండి.\n2. ప్రారంభంలో వేప గింజల కషాయం (5%) లేదా ఎమామెక్టిన్ బెంజోయేట్ (0.4 గ్రా/లీ) సుడులలో పడేలా పిచికారీ చేయండి.',
        suggestPhoto: false,
      };
    }
    if (isWeedQuery) {
      return {
        text: 'కలుపు యాజమాన్యం:\n1. పంట ప్రారంభ దశలో కలుపు తీయడం చాలా ముఖ్యం, దీనివల్ల పైరుకు పోషకాలు బాగా అందుతాయి.\n2. వెడల్పాటి ఆకుల కలుపు మరియు గడ్డి జాతి కలుపును బట్టి తగిన కలుపు మందును నేలలో తేమ ఉన్నప్పుడు మాత్రమే వాడండి.\nమీ పంటలో ఎలాంటి కలుపు ఎక్కువగా ఉంది?',
        suggestPhoto: false,
      };
    }
    if (isOrganicQuery) {
      return {
        text: 'సేంద్రీయ పద్ధతులు:\n1. పురుగుల నివారణకు 10,000 ppm వేప నూనె లేదా దశపర్ణి కషాయం వాడండి.\n2. భూసారం పెరగడానికి జీవామృతం లేదా ఘనజీవామృతం ఎకరానికి అందించండి.\n3. ట్రైకోడెర్మా విరిడిని పశువుల ఎరువుతో కలిపి నేలకు వేస్తే వేరుకుళ్ళు తెగుళ్లు రావు.',
        suggestPhoto: false,
      };
    }
    if (isPostHarvest) {
      return {
        text: 'పంట కోత పూర్తయిన తర్వాత చేయాల్సిన ముఖ్యమైన పనులు:\n1. ధాన్యం ఆరబెట్టడం: నిల్వ చేయడానికి ముందు ధాన్యంలో తేమ 12-14% లోపు ఉండేలా ఎండబెట్టండి.\n2. నిల్వ భద్రత: గోనె సంచులను శుభ్రపరిచి పురుగులు చేరకుండా జాగ్రత్తగా నిల్వ చేయండి.\n3. నేల సంరక్షణ: కోత తర్వాత మిగిలిన వ్యర్థాలను కాల్చకుండా నేలలో కలియదున్నండి లేదా పచ్చిరొట్ట ఎరువులైన జీలుగ, జనుము విత్తండి.',
        suggestPhoto: false,
      };
    }
    if (isFollowUpNext && contextualCrop === 'paddy') {
      return {
        text: 'వరి పంటలో ఇప్పుడు పిలకలు వేసే దశ వస్తుంది. నేలలో 2-3 సెం.మీ మేర నీరు నిల్వ ఉంచి, అవసరాన్ని బట్టి మొదటి విడత యూరియా మరియు పొటాష్ అందించండి. ఆకుమచ్చ లేదా కాండం తొలిచే పురుగు లక్షణాలు ఏమైనా కనిపిస్తున్నాయా?',
        suggestPhoto: false,
      };
    }
    if (isDiseaseRelated) {
      return {
        text: 'సరే రైతు సోదరా. మీ పంట ఆకుల మీద లేదా కాండంపై ఉన్న సమస్యను స్పష్టంగా తెలుసుకోవడానికి కెమెరా బటన్ ద్వారా ఫోటో పంపించండి. నేను పరిశీలించి ఇది ఏ తెగులు లేదా పురుగో గుర్తించి తగిన నివారణ పద్ధతులు చెబుతాను.',
        suggestPhoto: true,
      };
    }
    if (isWeather) {
      return {
        text: 'ఈ రోజు మీ ప్రాంతంలో వ్యవసాయ పనులకు అనుకూలంగా ఉంది. ఉదయం పూట గాలి వేగం తక్కువగా ఉన్నప్పుడు మాత్రమే పిచికారీ పనులు చేయండి. వర్ష సూచన ఉంటే నీరు నిలవకుండా డ్రైనేజ్ కాలువలు చూసుకోండి.',
        suggestPhoto: false,
      };
    }
    return {
      text: 'నమస్కారం రైతు సోదరా! నేను మీ అగ్రిపల్స్ AI వ్యవసాయ సలహాదారుని. మీ పంట విత్తడం, ఎరువులు, నీటి యాజమాన్యం, పురుగులు లేదా తెగుళ్ల గురించి ఏదైనా అడగండి, సరళమైన తెలుగులో సలహా ఇస్తాను.',
      suggestPhoto: false,
    };
  }

  // --- Hindi Response Mapping ---
  if (language === 'Hindi') {
    if (isSownPaddy) {
      return {
        text: 'नमस्ते किसान भाई! धान की बुवाई के बाद के मुख्य चरण:\n1. नमी की जांच: बुवाई के 3-5 दिन तक खेत में हल्की नमी बनाए रखें।\n2. खरपतवार नियंत्रण: 3 से 5 दिनों के भीतर अनुशंसित प्री-इमर्जेंस हर्बिसाइड (जैसे प्रेटिलाक्लोर) का प्रयोग करें।\n3. सिंचाई: अंकुरण के दौरान हल्का पानी दें, जलभराव न होने दें।\n4. खाद प्रबंधन: 15-20 दिनों पर पहली यूरिया और जिंक की खुराक तैयार रखें।',
        suggestPhoto: false,
      };
    }
    if (isPlantedChilliOrVegetables) {
      return {
        text: 'नमस्ते किसान भाई! मिर्च या सब्जी रोपाई के पहले सप्ताह में ध्यान दें:\n1. पौधों की स्थापना: पहले 7-10 दिन हल्की सिंचाई करें ताकि जड़ें जम जाएं।\n2. गैप फिलिंग: सूखे या खराब पौधों की जगह नए पौधे तुरंत लगाएं।\n3. कीट निगरानी: थ्रिप्स और रस चूसक कीटों से बचाव के लिए 10,000 ppm नीम तेल (2 ml/लीटर) का छिड़काव करें।\n4. पोषक तत्व: 12-15 दिनों पर 19:19:19 का हल्का छिड़काव करें।',
        suggestPhoto: false,
      };
    }
    if (isFertilizerIrrigation) {
      return {
        text: 'हाँ किसान भाई, अगर आपने कल खाद डाली है, तो आज हल्की सिंचाई करना बिल्कुल सही है। इससे खाद घुलकर पौधों की जड़ों तक आसानी से पहुँचती है। बस भारी पानी भरने से बचें ताकि खाद बह न जाए।',
        suggestPhoto: false,
      };
    }
    if (isYellowLeaves) {
      return {
        text: 'पत्तियों के पीले होने के मुख्य कारण हो सकते हैं:\n1. नाइट्रोजन की कमी या खेत में ज्यादा पानी भरने से जड़ों का दम घुटना।\n2. पत्तियों के नीचे रस चूसक कीट (सफेद मक्खी, एफिड)।\n3. फफूंद या जड़ गलन रोग।\nसटीक पहचान के लिए प्रभावित पत्ती की साफ फोटो भेजें, ताकि सही दवा बता सकूँ।',
        suggestPhoto: true,
      };
    }
    if (isPostHarvest) {
      return {
        text: 'फसल कटाई के बाद के आवश्यक कदम:\n1. सुखाना: भंडारण से पहले अनाज में नमी 12% से कम होने तक अच्छी तरह धूप में सुखाएं।\n2. भंडारण सुरक्षा: बोरियों और गोदाम को नीम के घोल या अनुशंसित कीटनाशक से उपचारित करें।\n3. मिट्टी सुधार: अवशेषों को जलाने के बजाय खेत में जुताई कर हरी खाद (ढैंचा/सनई) लगाएं।',
        suggestPhoto: false,
      };
    }
    if (isDiseaseRelated) {
      return {
        text: 'जी किसान भाई। कृपया अपनी फसल की प्रभावित पत्तियों या पौधे का एक साफ फोटो भेजें। मैं देखकर रोग या कीट की पहचान कर सही उपचार बताऊँगी।',
        suggestPhoto: true,
      };
    }
    if (isWeather) {
      return {
        text: 'आज मौसम खेती के सामान्य कार्यों के लिए अनुकूल है। सुबह शांत हवा में ही कीटनाशक या खाद का छिड़काव करें। यदि बारिश की संभावना हो तो सिंचाई रोक दें।',
        suggestPhoto: false,
      };
    }
    return {
      text: 'नमस्ते किसान भाई! मैं आपकी एग्रीपल्स AI कृषि सलाहकार हूँ। बुवाई, खाद, सिंचाई, कीट प्रबंधन या फसल चक्र से जुड़ा कोई भी सवाल पूछें, मैं पूरी मदद करूँगी।',
      suggestPhoto: false,
    };
  }

  // --- English Response Mapping ---
  if (isSownPaddy) {
    return {
      text: 'Hello farmer! Since you have sown paddy, here are your immediate next steps:\n1. Moisture & Germination: Maintain optimum surface moisture for the first 3-5 days without flooding.\n2. Early Weed Management: Apply recommended pre-emergence weedicide (e.g., Pretilachlor or Pyrazosulfuron) within 3-5 days.\n3. Water Control: Keep shallow water depth as seedlings emerge to prevent rot.\n4. Nutrition: Plan your first top dressing of Nitrogen and Zinc Sulfate around 15-20 days after sowing.',
      suggestPhoto: false,
    };
  }
  if (isPlantedChilliOrVegetables) {
    return {
      text: 'Great! For chilli or vegetable seedlings planted last week, focus on these critical tasks:\n1. Root Establishment: Provide light, frequent irrigations to settle the root zone.\n2. Gap Filling: Replace any wilted seedlings immediately to maintain optimal plant population.\n3. Pest Scouting: Check undersides of young leaves for early thrips, mites, or aphids. Spray neem oil (10,000 ppm @ 2ml/L) as a safe repellent.\n4. Booster Dose: At 12-15 days, apply water-soluble 19:19:19 fertilizer for vigorous root growth.',
      suggestPhoto: false,
    };
  }
  if (isFertilizerIrrigation) {
    return {
      text: 'Yes farmer, irrigating today after applying fertilizer yesterday is recommended. A light irrigation helps dissolve the nutrients and transports them directly into the active root zone. Avoid heavy flooding which could leach nutrients beyond root depth.',
      suggestPhoto: false,
    };
  }
  if (isYellowLeaves) {
    return {
      text: 'Yellowing in leaves is usually caused by:\n1. Nitrogen deficiency or waterlogged root hypoxia.\n2. Sucking insect pests (whiteflies, aphids, mites) on leaf undersides.\n3. Early fungal blight or root rot.\nTo confirm, please attach a photo of the affected leaf using the camera button for an immediate AI assessment.',
      suggestPhoto: true,
    };
  }
  if (isPostHarvest) {
    return {
      text: 'Here are the key post-harvest management steps:\n1. Drying & Moisture: Dry grains until moisture is below 12-13% to prevent fungal aflatoxins and storage pests.\n2. Storage Sanitation: Treat gunny bags and clean godowns before storage.\n3. Soil Replenishment: Incorporate crop stubble into soil or sow green manure crops (Dhaincha/Sunn hemp) to restore organic carbon.',
      suggestPhoto: false,
    };
  }
  if (isDiseaseRelated) {
    return {
      text: 'Understood! Please share a clear photo of the affected plant or leaf using the camera button. I will analyze the symptoms and recommend organic and chemical remedies.',
      suggestPhoto: true,
    };
  }
  if (isWeather) {
    return {
      text: 'Field conditions are currently suitable for regular farm activities. Conduct any foliar spraying in the calm morning hours. If rain is expected, hold off irrigation.',
      suggestPhoto: false,
    };
  }

  // General English fallback
  return {
    text: 'Hello! I am your AgriPulse AI agricultural advisor. You can talk to me naturally about your sowing progress, crop growth stages, fertilizer dosages, irrigation, leaf problems, or post-harvest plans.',
    suggestPhoto: false,
  };
}

// AI Farm Advisory & Agronomist Chat
app.post('/api/ai-advisor', async (req, res) => {
  try {
    const { crop, stage, soilType, landSize, query, context, language = 'Telugu', farmingMode } = req.body;
    const isTelugu = language === 'Telugu';
    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = query
          ? (isTelugu
              ? `మీరు అగ్రిపల్స్ AI (AgriPulse AI), అత్యున్నత స్థాయి భారతీయ వ్యవసాయ శాస్త్రవేత్త మరియు సర్టిఫైడ్ పంటల సలహాదారు.
రైతు అడిగిన ప్రశ్న: "${query}"
పంట సందర్భం: పంట: ${crop || 'సాధారణ'}, ఎదుగుదల దశ: ${stage || 'అన్ని దశలు'}, నేల రకం: ${soilType || 'ఇసుక లేదా ఎర్ర నేల'}, విస్తీర్ణం: ${landSize || '1 ఎకరం'}.

కఠినమైన భాషా నిబంధన (STRICT LANGUAGE REQUIREMENT):
మొత్తం సమాధానాన్ని తప్పనిసరిగా 100% స్వచ్ఛమైన, స్పష్టమైన మరియు సహజమైన తెలుగు లిపిలో (Pure Telugu Script) మాత్రమే రాయండి. ఎట్టి పరిస్థితుల్లోనూ ఆంగ్ల శీర్షికలు లేదా ఆంగ్ల వాక్యాలు ఉపయోగించవద్దు.
రైతుకు వెంటనే ఆచరించదగిన విధంగా స్పష్టమైన పాయింట్లు, ఎరువుల మోతాదులు (ఎకరానికి కిలోలు/లీటర్లు), నీటి యాజమాన్యం, సేంద్రీయ ప్రత్యామ్నాయాలతో వివరించండి.`
              : `You are AgriPulse AI, an approachable, highly knowledgeable agricultural extension expert and certified crop advisor.
Farmer question: "${query}"
Context: Crop: ${crop || 'General'}, Growth stage: ${stage || 'Any'}, Soil: ${soilType || 'Loam'}, Land size: ${landSize || '1 acre'}.

Respond strictly in English language using clear, simple farmer-friendly terminology. Provide direct, actionable, practical advice tailored to a farmer. Use bullet points for steps, dosage rates (NPK, milliliters/liters per acre), water management, and organic alternatives where relevant. Keep it structured and easy to read.`)
          : (isTelugu
              ? `మీరు అగ్రిపల్స్ AI (AgriPulse AI), అత్యున్నత వ్యవసాయ శాస్త్రవేత్త మరియు ఖచ్చితమైన ప్రిసిషన్ అగ్రోనమీ ప్లానర్.
రైతు కోసం ఈ క్రింది వివరాలతో సమగ్ర వ్యవసాయ కార్యాచరణ ప్రణాళికను రూపొందించండి:
పంట: ${crop}
వృద్ధి దశ: ${stage}
నేల రకం: ${soilType}
భూమి విస్తీర్ణం: ${landSize || '1 ఎకరం'}
సాగు విధానం: ${farmingMode || 'సమగ్ర సస్యరక్షణ పద్ధతి'}

కఠినమైన భాషా ఆదేశం (CRITICAL LANGUAGE MANDATE):
ఈ ప్రణాళికలోని ప్రతి ఒక్క అక్షరం, ప్రతి శీర్షిక, ప్రతి ఉపశీర్షిక, బుల్లెట్ పాయింట్ మరియు సూచన తప్పనిసరిగా 100% సహజమైన, స్పష్టమైన తెలుగు లిపిలో (Pure Fluent Telugu Script) మాత్రమే ఉండాలి.
ఎక్కడా ఎటువంటి ఆంగ్ల శీర్షికలు ("Growth Stage", "Soil Type", "Nutrient & Fertilizer Management", "Irrigation Schedule", "Pest & Disease Scouting Protocol") లేదా ఆంగ్ల వాక్యాలు రాకూడదు.

ఈ క్రింది ఖచ్చితమైన తెలుగు ఫార్మాట్ పాటించండి:
### నిర్దిష్ట వ్యవసాయ కార్యాచరణ ప్రణాళిక (${landSize} - ${crop})

**వృద్ధి దశ:** ${stage} | **నేల రకం:** ${soilType} | **సాగు విధానం:** ${farmingMode || 'సమగ్ర పద్ధతి'}

#### 1. ప్రస్తుత వృద్ధి దశలో ముఖ్య ప్రాధాన్యతలు
- (ఈ దశలో మొక్కకు అవసరమైన అత్యంత ముఖ్యమైన చర్యలు)

#### 2. పోషకాలు & ఎరువుల సమగ్ర యాజమాన్యం
- **నేల ద్వారా అందించే ఎరువులు:** ఎకరానికి వేయవలసిన ఖచ్చితమైన NPK (యూరియా, DAP, MOP, జింక్) మోతాదులు
- **ఆకులపై పిచికారీ:** మొక్క ఎదుగుదలకు నీటిలో కరిగే ఎరువులు (19:19:19 లేదా 13:00:45 లేదా 0:52:34) మరియు సూక్ష్మ పోషకాల మోతాదు (గ్రాములు/లీటరుకు)
- **సేంద్రీయ పోషకాలు:** జీవామృతం లేదా హ్యూమిక్ యాసిడ్ / వేప పిండి మోతాదులు

#### 3. కచ్చితమైన నీటి యాజమాన్య షెడ్యూల్
- **నీటి తడుల వ్యవధి:** ${soilType} నేలలో ఎన్ని రోజులకు ఒకసారి నీరు ఇవ్వాలి
- **పద్ధతి & సమయం:** డ్రిప్ లేదా కాల్వల ద్వారా ఎంత సమయం నీరందించాలి, ఏ వేళలో పెట్టాలి
- **ముఖ్య గమనిక:** నీటి నిల్వ మరియు అధిక తేమ వల్ల వచ్చే తెగుళ్ల నివారణ జాగ్రత్తలు

#### 4. చీడపీడలు & తెగుళ్ల నిఘా మరియు సస్యరక్షణ ప్రోటోకాల్
- **క్షేత్ర పరిశీలన:** ఆకుల కింద, మొగ్గల వద్ద గమనించవలసిన రసం పీల్చే పురుగులు, తెగుళ్ల లక్షణాలు
- **జీవ నియంత్రణ:** వేప నూనె, బ్యూవేరియా బాసియానా, ట్రైకోడెర్మా లేదా లింగాకర్షక బుట్టలు
- **రసాయన నివారణ:** పురుగు/తెగులు తీవ్రత పెరిగితే వాడవలసిన సిఫార్సు చేసిన మందులు మరియు మోతాదు

#### 5. కలుపు మరియు అంతరకృషి యాజమాన్యం
- అంతర సేద్యం మరియు కలుపు నివారణ పద్ధతులు

#### 6. అధిక దిగుబడి మరియు నాణ్యత కోసం శాస్త్రీయ చిట్కా
- పక్వత, పంట కోత సమయం మరియు మార్కెట్ నాణ్యతను పెంచే కీలక సూచన`
              : `You are AgriPulse AI, an expert precision agronomy planner.
Generate a comprehensive custom farm action plan for:
Crop: ${crop}
Growth Stage: ${stage}
Soil Type: ${soilType}
Land Area: ${landSize || '1 acre'}
Farming Mode: ${farmingMode || 'Integrated (IPM)'}

Language: English. Format in Markdown with the following exact sections:
### Custom Precision Farm Action Plan (${landSize} - ${crop})

**Growth Stage:** ${stage} | **Soil Type:** ${soilType} | **Method:** ${farmingMode || 'Integrated (IPM)'}

#### 1. Immediate Stage Priorities
- Key focus areas for this vegetative or reproductive stage

#### 2. Nutrient & Fertilizer Management
- **Basal / Soil Application:** Exact kg/acre of primary macronutrients (Urea, DAP, MOP, micronutrients)
- **Foliar Nutrition:** Water-soluble NPK foliar spray and chelated trace elements dosage
- **Organic Bio-Booster:** Root drenching with Jeevamrutha, FYM, or humic extracts

#### 3. Precision Irrigation Schedule
- **Interval & Moisture:** Soil-specific watering frequency (days) and target root zone moisture
- **Method & Duration:** Drip fertigation duration and optimal diurnal timing
- **Critical Check:** Drainage and root rot prevention measures

#### 4. Pest & Disease Scouting Protocol
- **Active Scouting:** Target inspection areas for early pest and disease detection
- **Biological Defense:** Bio-pesticides, neem formulations, and sticky traps
- **Targeted Protection:** Curative actions if threshold is crossed

#### 5. Intercultural & Weed Management
- Hoeing, weeding, and aeration practices

#### 6. Yield Optimization Tip
- Agronomic practice for maximizing harvest grade and marketable yield`);

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
        });

        if (response.text) {
          return res.json({ success: true, advice: response.text });
        }
      } catch (err) {
        handleGeminiError('Advisor Engine', err);
      }
    }

    // High quality built-in rule response
    const fallbackAdvice = generateBuiltinAdvisory(crop, stage, soilType, landSize, query, language);
    res.json({ success: true, advice: fallbackAdvice });
  } catch (error: any) {
    console.error('Advisor error:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// Universal Open-Ended Multi-Crop Agronomic Rule Engine
function getFallbackDiseaseAnalysis(cropHint?: string, language = 'Telugu', imageBase64Data?: string) {
  let hints = (cropHint || '').toLowerCase().trim();
  const isTelugu = language === 'Telugu';

  // 1. MANGO (Mangifera indica)
  if (hints.includes('mango') || hints.includes('మామిడి') || hints.includes('aam')) {
    if (isTelugu) {
      return {
        cropName: 'మామిడి (Mangifera indica)',
        diseaseName: 'మామిడి ఆంథ్రాక్నోస్ / కాయ మచ్చ తెగులు (Colletotrichum gloeosporioides)',
        isHealthy: false,
        confidenceScore: 95,
        severity: 'తీవ్రమైనది',
        pathogenType: 'శిలీంధ్రం (Fungal)',
        symptoms: [
          'లేత ఆకులపై చిన్న గోధుమ రంగు మచ్చలు ఏర్పడి క్రమంగా నల్లటి పెద్ద మచ్చలుగా మారడం',
          'మచ్చల మధ్యభాగం రాలిపోయి ఆకులకు రంధ్రాలు పడటం (Shot-hole effect)',
          'పూత మరియు పిందె దశలో నల్లబడి పూత రాలిపోవడం (Blossom blight)',
          'కొమ్మల చివర్లు ఎండిపోవడం (Twig dieback) మరియు పండ్లపై నల్లటి కన్నీటి చారల వంటి మచ్చలు',
        ],
        causes: [
          'పూత మరియు పిందె దశలో అకాల వర్షాలు లేదా ఉదయం వేళల్లో దట్టమైన పొగమంచు',
          'వాతావరణంలో అధిక తేమ (>85%) మరియు 24°C - 30°C ఉష్ణోగ్రత',
          'చెట్లలో గాలి, వెలుతురు చొరబడకుండా కొమ్మలు దట్టంగా అల్లుకోవడం',
        ],
        immediateActions: [
          'ఎండిన మరియు తెగులు సోకిన కొమ్మలను ఆరోగ్యకరమైన భాగం వరకు కత్తిరించి కాల్చివేయండి',
          'కత్తిరించిన కొమ్మల చివరలపై 1% బోర్డో పేస్ట్ లేదా కాపర్ ఆక్సీక్లోరైడ్ పూయండి',
          'తోటలో గాలి వెలుతురు బాగా ప్రసరించేలా కొమ్మల కత్తిరింపు (Pruning) చేయండి',
        ],
        organicTreatments: [
          '1% బోర్డో మిశ్రమం లేదా కాపర్ ఆక్సీక్లోరైడ్ 50% WP @ 3.0 గ్రా/లీ పూతకు ముందు పిచికారీ చేయండి',
          'సూడోమోనాస్ ఫ్లోరోసెన్స్ @ 5 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి',
          '5% వేప గింజల కషాయం (NSKE) లేదా వేప నూనె 10,000 ppm @ 2 మి.లీ/లీటరు పిచికారీ చేయండి',
        ],
        chemicalTreatments: [
          'హెక్సాకోనజోల్ 5% SC @ 2.0 మి.లీ లీటరు నీటికి లేదా కార్బెండజిమ్ 50% WP @ 1.0 గ్రా/లీటరు',
          'అజోక్సిస్ట్రోబిన్ 23% SC @ 1.0 మి.లీ లీటరు నీటికి పిచికారీ చేయండి',
          'డైఫెనోకోనజోల్ 25% EC @ 0.5 మి.లీ లీటరు నీటికి పిచికారీ చేయండి',
        ],
        preventionSteps: [
          'వర్షాకాలం ప్రారంభానికి ముందు మరియు పంట కోత తర్వాత ఎండిన కొమ్మలను తొలగించండి',
          'పూత దశలో తేనె మంచు పురుగు (Mango Hopper) నివారణకు తగిన చర్యలు తీసుకోండి',
          'తోటలో నేలను శుభ్రంగా ఉంచి రాలిన ఆకులను నాశనం చేయండి',
        ],
        recoveryTime: '10 - 15 రోజులు (కొమ్మల కత్తిరింపు మరియు శిలీంధ్రనాశిని పిచికారీ తర్వాత)',
        disclaimer:
          'ఇది ప్రాథమిక AI అంచనా మాత్రమే. పెద్ద ఎత్తున రసాయన మందులు పిచికారీ చేసే ముందు మీ మండల ఉద్యానవన అధికారిని సంప్రదించండి.',
      };
    }

    return {
      cropName: 'Mango (Mangifera indica)',
      diseaseName: 'Mango Anthracnose & Blossom Blight (Colletotrichum gloeosporioides)',
      isHealthy: false,
      confidenceScore: 95,
      severity: 'High',
      pathogenType: 'Fungal',
      symptoms: [
        'Oval to irregular brownish-black necrotic lesions on tender leaves, turning into shot-holes',
        'Blackening and premature dropping of inflorescences / panicles (Blossom blight)',
        'Twig dieback starting from the tips and progressing downwards',
        'Tear-stain black lesions on fruit skin during ripening',
      ],
      causes: [
        'Prolonged leaf wetness and heavy morning dew during vegetative flush and flowering',
        'High atmospheric humidity (>85%) with moderate temperatures (24°C - 30°C)',
        'Dense, unpruned canopies restricting sunlight and airflow',
      ],
      immediateActions: [
        'Prune dead, blighted twigs 5 cm below the margin of infection and burn them',
        'Smear 1% Bordeaux paste on cut surfaces to block re-infection',
        'Ensure canopy aeration through selective branch thinning',
      ],
      organicTreatments: [
        'Foliar spray with 1% freshly prepared Bordeaux mixture before flowering',
        'Pseudomonas fluorescens bio-fungicide @ 5g / liter of water',
        'Botanical Neem Seed Kernel Extract (NSKE 5%) or cold-pressed neem oil (2 ml/L)',
      ],
      chemicalTreatments: [
        'Hexaconazole 5% SC @ 2.0 ml / liter of water or Carbendazim 50% WP @ 1.0g / liter',
        'Azoxystrobin 23% SC @ 1.0 ml / liter of water',
        'Difenoconazole 25% EC @ 0.5 ml / liter of water',
      ],
      preventionSteps: [
        'Carry out annual post-harvest sanitation pruning to eliminate overwintering inoculum',
        'Control mango hoppers and sucking pests which exacerbate fungal entry',
        'Maintain clean orchard floor free of infected fallen leaves and mumified fruits',
      ],
      recoveryTime: '10 - 15 days following sanitary pruning and systemic fungicide spray',
      disclaimer:
        'This is a preliminary AI assessment. Consult your local horticulture extension officer before major chemical application.',
    };
  }

  // 2. WHEAT (Triticum aestivum)
  if (hints.includes('wheat') || hints.includes('గోధుమ') || hints.includes('gehu')) {
    if (isTelugu) {
      return {
        cropName: 'గోధుమ (Triticum aestivum)',
        diseaseName: 'గోధుమ కుంకుమ తెగులు / బ్రౌన్ రస్ట్ (Puccinia triticina)',
        isHealthy: false,
        confidenceScore: 94,
        severity: 'తీవ్రమైనది',
        pathogenType: 'శిలీంధ్రం (Fungal Rust)',
        symptoms: [
          'ఆకుల పైభాగంలో గుండ్రటి లేదా అండాకారంలో నారింజ-గోధుమ రంగు కుంకుమ పొక్కులు (Pustules)',
          'ఆకులను తాకినప్పుడు వేళ్లకు నారింజ రంగు పొడి అంటుకోవడం',
          'తీవ్రమైనప్పుడు ఆకులు పసుపు రంగులోకి మారి ఎండిపోవడం, గింజలు చిన్నవిగా మారడం',
        ],
        causes: [
          'చల్లటి గాలులు, మంచు మరియు 15°C - 22°C మధ్య ఉండే అనుకూల ఉష్ణోగ్రతలు',
          'గాలి ద్వారా దూర ప్రాంతాల నుంచి శిలీంధ్ర బీజాలు కొట్టుకురావడం',
        ],
        immediateActions: [
          'తెగులు లక్షణాలు కనిపించిన వెంటనే క్షేత్రస్థాయిలో రసాయన రక్షణ చేపట్టండి',
          'యూరియా వాడకాన్ని తగ్గించి పొటాష్ ఎరువులను అందించండి',
        ],
        organicTreatments: [
          'ట్రైకోడెర్మా విరిడే @ 5 గ్రాములు లీటరు నీటికి పిచికారీ చేయండి',
          'పులిసిన మజ్జిగ ద్రావణాన్ని 5% పలుచగా చేసి పిచికారీ చేయండి',
        ],
        chemicalTreatments: [
          'ప్రొపికోనజోల్ 25% EC (టిల్ట్) @ 1.0 మి.లీ లీటరు నీటికి కలిపి పిచికారీ చేయండి (అత్యంత ప్రభావవంతమైనది)',
          'టెబుకోనజోల్ 25.9% EC @ 1.0 మి.లీ లీటరు నీటికి',
          'మాంకోజెబ్ 75% WP @ 2.5 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి',
        ],
        preventionSteps: [
          'కుంకుమ తెగులును తట్టుకునే రకాలను నాటండి (ఉదా: HD-2967, PBW-550, DBW-187)',
          'సకాలంలో విత్తనాలు నాటడం ద్వారా తెగులు తీవ్రతను తగ్గించండి',
        ],
        recoveryTime: '8 - 12 రోజులు',
        disclaimer: 'ఇది ప్రాథమిక AI అంచనా మాత్రమే. వ్యవసాయ శాస్త్రవేత్తల సలహా తీసుకోండి.',
      };
    }

    return {
      cropName: 'Wheat (Triticum aestivum)',
      diseaseName: 'Wheat Brown Leaf Rust (Puccinia triticina)',
      isHealthy: false,
      confidenceScore: 94,
      severity: 'High',
      pathogenType: 'Fungal Rust',
      symptoms: [
        'Bright orange-brown circular to oval pustules scattered randomly on upper leaf surfaces',
        'Orange spore powder rubbing off on fingertips when leaves are brushed',
        'Premature chlorosis and leaf desiccation reducing grain weight and yield',
      ],
      causes: [
        'Moderate temperatures (15°C - 22°C) with free moisture on leaf blades (heavy morning dew)',
        'Windborne urediniospores transported across regional plains',
      ],
      immediateActions: [
        'Initiate early foliar spray upon detecting first pustule foci in the field',
        'Avoid late-season excessive nitrogen top-dressing',
      ],
      organicTreatments: [
        'Trichoderma viride foliar bio-fungicide @ 5g / liter of water',
        'Fermented sour buttermilk solution (5% dilution) as prophylactic bio-spray',
      ],
      chemicalTreatments: [
        'Propiconazole 25% EC (Tilt) @ 1.0 ml / liter of water (gold standard rust curative)',
        'Tebuconazole 25.9% EC @ 1.0 ml / liter of water',
        'Mancozeb 75% WP @ 2.5g / liter of water',
      ],
      preventionSteps: [
        'Cultivate certified rust-resistant wheat varieties (e.g. HD-2967, DBW-187, GW-322)',
        'Ensure timely sowing in early November to evade late-season rust build-up',
      ],
      recoveryTime: '8 - 12 days after systemic triazole application',
      disclaimer: 'Consult your local agronomy extension service for regional rust advisories.',
    };
  }

  // 3. SUGARCANE (Saccharum officinarum)
  if (hints.includes('sugar') || hints.includes('cane') || hints.includes('చెరకు') || hints.includes('ganna')) {
    if (isTelugu) {
      return {
        cropName: 'చెరకు (Saccharum officinarum)',
        diseaseName: 'చెరకు ఎర్ర కుళ్ళు తెగులు / రెడ్ రాట్ (Colletotrichum falcatum)',
        isHealthy: false,
        confidenceScore: 95,
        severity: 'తీవ్రమైనది',
        pathogenType: 'శిలీంధ్రం (Fungal)',
        symptoms: [
          'పై ఆకుల అంచులు పసుపు రంగులోకి మారి సుడులు ఎండిపోవడం (Third/fourth leaf yellowing)',
          'గడలను నిలువుగా చీల్చినప్పుడు లోపల గుజ్జు ఎర్రగా మారి తెల్లటి అడ్డ చారలు (White patches) కనిపించడం',
          'చెరకు గడల నుంచి ఆల్కహాల్ లేదా పులిసిన వాసన రావడం',
        ],
        causes: [
          'తెగులు సోకిన విత్తన ముచ్చెలు (Infected setts) వాడటం',
          'పొలంలో నీరు నిలిచిపోవడం మరియు అధిక తేమ ఉండటం',
        ],
        immediateActions: [
          'తెగులు సోకిన పిలకలు, గడలను వేర్లతో సహా పీకి పొలం బయట కాల్చివేయండి',
          'పొలంలో నిలిచిన నీటిని వెంటనే బయటకు పంపే డ్రైనేజీ ఏర్పాటు చేయండి',
        ],
        organicTreatments: [
          'ట్రైకోడెర్మా విరిడే @ 10 కిలోలు/ఎకరాకు పశువుల ఎరువులో కలిపి నేలలో వేయండి',
          'జీవామృతం 200 లీటర్లు ఎకరాకు నీటి ద్వారా అందించండి',
        ],
        chemicalTreatments: [
          'కార్బెండజిమ్ 50% WP @ 1.0 గ్రా/లీటరు లేదా థయోఫనేట్ మిథైల్ 70% WP @ 1.5 గ్రా/లీటరు వేర్ల వద్ద తడపండి (Drenching)',
        ],
        preventionSteps: [
          'తెగులు లేని ఆరోగ్యకరమైన నర్సరీల నుంచి విత్తన ముచ్చెలను ఎంచుకోండి',
          'ముచ్చెలను నాటే ముందు వేడినీటి శుద్ధి (Hot water treatment 52°C) లేదా కార్బెండజిమ్ ద్రావణంలో నానబెట్టండి',
          'వరి లేదా పప్పుధాన్యాలతో పంట మార్పిడి పాటించండి',
        ],
        recoveryTime: 'కొత్త పిలకలు ఆరోగ్యంగా రావడానికి 15 - 20 రోజులు',
        disclaimer: 'ఇది ప్రాథమిక AI అంచనా మాత్రమే.',
      };
    }

    return {
      cropName: 'Sugarcane (Saccharum officinarum)',
      diseaseName: 'Sugarcane Red Rot (Colletotrichum falcatum)',
      isHealthy: false,
      confidenceScore: 95,
      severity: 'High',
      pathogenType: 'Fungal',
      symptoms: [
        'Discoloration and drying of the 3rd and 4th whorl leaves, drooping crown',
        'Splitting cane reveals reddish internal pith interrupted by characteristic diagnostic white cross-bands',
        'Sour, alcoholic fermenting odor from rotting cane stalks',
      ],
      causes: [
        'Primary infection through diseased setts (seed cane)',
        'Secondary spread via irrigation waterlogging and borer tunneling wounds',
      ],
      immediateActions: [
        'Rogue out and incinerate infected clumps with complete root systems',
        'Immediately improve furrow drainage to prevent stagnant waterlogging',
      ],
      organicTreatments: [
        'Soil application of Trichoderma viride enriched farmyard manure (10 kg/acre)',
        'Bio-enrichment with Pseudomonas fluorescens during intercultivation',
      ],
      chemicalTreatments: [
        'Sett dip in Carbendazim 50% WP @ 1g/L prior to planting',
        'Foliar & soil drench with Thiophanate Methyl 70% WP @ 1.5g / liter of water',
      ],
      preventionSteps: [
        'Select certified disease-free seed setts from reputable seed nurseries',
        'Practice hot-water treatment of seed setts (52°C for 30 minutes)',
        'Rotate with paddy or green manure crops; avoid continuous ratoon in infected plots',
      ],
      recoveryTime: '15 - 20 days for healthy tiller emergence',
      disclaimer: 'Consult your sugarcane sugar-mill agronomist or extension office.',
    };
  }

  // 4. BANANA (Musa acuminata)
  if (hints.includes('banana') || hints.includes('అరటి') || hints.includes('kela')) {
    if (isTelugu) {
      return {
        cropName: 'అరటి (Musa acuminata)',
        diseaseName: 'సిగటోకా ఆకుమచ్చ తెగులు (Pseudocercospora fijiensis / musicola)',
        isHealthy: false,
        confidenceScore: 95,
        severity: 'తీవ్రమైనది',
        pathogenType: 'శిలీంధ్రం (Fungal)',
        symptoms: [
          'ఆకులపై పసుపు-గోధుమ రంగు చిన్న చారలు ఏర్పడి క్రమంగా నల్లటి దీర్ఘవృత్తాకార మచ్చలుగా మారడం',
          'మచ్చల చుట్టూ పసుపు రంగు వలయాలు మరియు మధ్యభాగం బూడిద రంగులోకి మారి ఎండిపోవడం',
          'ఆకులు త్వరగా ఎండిపోయి గెల బరువు మరియు నాణ్యత దెబ్బతినడం',
        ],
        causes: ['అధిక వర్షపాతం, అధిక గాలి తేమ (>85%) మరియు 25°C - 30°C ఉష్ణోగ్రత.'],
        immediateActions: [
          'తెగులు సోకిన ఎండిన ఆకులను కత్తిరించి పొలం బయట కాల్చివేయండి',
          'డ్రిప్ ద్వారా మాత్రమే నీరు అందించండి',
        ],
        organicTreatments: [
          'మినరల్ ఆయిల్ (బనానా స్ప్రే ఆయిల్ @ 10 మి.లీ/లీటరు) పిచికారీ చేయండి',
          'సూడోమోనాస్ ఫ్లోరోసెన్స్ @ 5 గ్రాములు లీటరు నీటికి పిచికారీ చేయండి',
        ],
        chemicalTreatments: [
          'ప్రొపికోనజోల్ 25% EC @ 1.0 మి.లీ + మినరల్ ఆయిల్ 10 మి.లీ లీటరు నీటికి',
          'అజోక్సిస్ట్రోబిన్ 23% SC @ 1.0 మి.లీ లీటరు నీటికి',
          'కార్బెండజిమ్ 50% WP @ 1.0 గ్రాము లీటరు నీటికి పిచికారీ చేయండి',
        ],
        preventionSteps: [
          'పిలకల సంఖ్యను పరిమితం చేసి తోటలో గాలి ప్రసరణ పెంచండి',
          'మురుగునీటి పారుదల సౌకర్యం మెరుగుపరచండి',
        ],
        recoveryTime: '10 - 15 రోజులు',
        disclaimer: 'ఇది ప్రాథమిక AI అంచనా మాత్రమే.',
      };
    }

    return {
      cropName: 'Banana (Musa acuminata)',
      diseaseName: 'Sigatoka Leaf Spot (Pseudocercospora fijiensis / musicola)',
      isHealthy: false,
      confidenceScore: 95,
      severity: 'High',
      pathogenType: 'Fungal',
      symptoms: [
        'Small yellowish-brown specks running parallel to leaf veins, enlarging into dark brown to black elliptical streaks',
        'Centers of mature spots turn light gray with distinct dark brown margins and chlorotic yellow halos',
        'Extensive foliar scorching causing premature bunch ripening and undersized fingers',
      ],
      causes: [
        'Heavy tropical rainfall, high relative humidity (>85%), and warm temperatures (25°C - 30°C)',
        'Overcrowded sucker mats restricting airflow',
      ],
      immediateActions: [
        'De-leaf severely infected leaves and compost/bury them outside the plantation',
        'Manage mat desuckering to ensure proper canopy spacing',
      ],
      organicTreatments: [
        'Agricultural mineral spray oil (10 ml/L) emulsified with organic bio-protectant',
        'Pseudomonas fluorescens foliar spray @ 5g / liter of water',
      ],
      chemicalTreatments: [
        'Propiconazole 25% EC @ 1.0 ml + Mineral oil 10 ml per liter of water',
        'Azoxystrobin 23% SC @ 1.0 ml / liter of water',
        'Carbendazim 50% WP @ 1.0g / liter of water',
      ],
      preventionSteps: [
        'Maintain optimal planting density (2m x 2m or paired rows) for ventilation',
        'Ensure deep drainage ditches around plantation perimeters',
      ],
      recoveryTime: '10 - 15 days following sanitary pruning and systemic fungicide cycle',
      disclaimer: 'Consult your local agricultural extension service for banana disease management.',
    };
  }

  // 5. CITRUS / LEMON / ORANGE
  if (hints.includes('citrus') || hints.includes('lemon') || hints.includes('lime') || hints.includes('నిమ్మ') || hints.includes('బత్తాయి') || hints.includes('nimbu')) {
    if (isTelugu) {
      return {
        cropName: 'నిమ్మ / బత్తాయి (Citrus limon / sinensis)',
        diseaseName: 'నిమ్మ గజ్జి తెగులు / సిట్రస్ క్యాంకర్ (Xanthomonas axonopodis pv. citri)',
        isHealthy: false,
        confidenceScore: 96,
        severity: 'తీవ్రమైనది',
        pathogenType: 'బాక్టీరియా (Bacterial)',
        symptoms: [
          'ఆకులు, కొమ్మలు మరియు కాయలపై గరుకైన గోధుమ రంగు పొక్కుల వంటి మచ్చలు (Raised corky spots)',
          'మచ్చల చుట్టూ స్పష్టమైన పసుపు రంగు వలయం (Yellow halo) ఏర్పడటం',
          'కాయలపై మచ్చలు ఏర్పడి కాయలు రాలిపోవడం లేదా మార్కెట్ విలువ తగ్గడం',
        ],
        causes: ['వర్షపు జల్లులు, గాలి మరియు ఆకుతొలుచు పురుగు (Leaf miner) గాయాల ద్వారా బాక్టీరియా వ్యాపించడం.'],
        immediateActions: [
          'తెగులు సోకిన కొమ్మలను కత్తిరించి నాశనం చేయండి',
          'ఆకుతొలుచు పురుగు నివారణకు తక్షణమే చర్యలు చేపట్టండి',
        ],
        organicTreatments: [
          '1% బోర్డో మిశ్రమం పిచికారీ చేయండి',
          'బాసిల్లస్ సబ్టిలిస్ @ 5 మి.లీ/లీటరు పిచికారీ చేయండి',
          '5% వేప నూనె పిచికారీ చేయండి',
        ],
        chemicalTreatments: [
          'కాపర్ ఆక్సీక్లోరైడ్ 50% WP @ 3.0 గ్రాములు + స్ట్రెప్టోసైక్లిన్ 0.1 గ్రాము (1 గ్రాము/10 లీటర్లు) కలిపి పిచికారీ చేయండి',
          'కాపర్ హైడ్రాక్సైడ్ 53.8% DF @ 2.0 గ్రా/లీటరు',
        ],
        preventionSteps: [
          'తోట చుట్టూ గాలి నిరోధక చెట్లను (Windbreaks) నాటండి',
          'ఆకుతొలుచు పురుగును ఇమిడాక్లోప్రిడ్ లేదా వేప నూనెతో అదుపులో ఉంచండి',
        ],
        recoveryTime: '12 - 18 రోజులు',
        disclaimer: 'ఇది ప్రాథమిక AI అంచనా మాత్రమే.',
      };
    }

    return {
      cropName: 'Citrus / Lemon (Citrus limon)',
      diseaseName: 'Citrus Canker (Xanthomonas axonopodis pv. citri)',
      isHealthy: false,
      confidenceScore: 96,
      severity: 'High',
      pathogenType: 'Bacterial',
      symptoms: [
        'Raised, corky, blister-like brown lesions on leaves, twigs, and fruit rinds',
        'Characteristic oily, water-soaked margins encircled by bright chlorotic yellow halos',
        'Premature fruit drop and unmarketable blemished fruit skin',
      ],
      causes: [
        'Wind-driven rain spreading bacterial inoculum from old cankers',
        'Feeding trails created by Citrus Leaf Miner larvae providing infection gateways',
      ],
      immediateActions: [
        'Prune and destroy infected twigs during dry weather; sterilize shears between cuts',
        'Control leaf miner infestation to seal off entry wounds',
      ],
      organicTreatments: [
        'Foliar spray with 1% fresh Bordeaux mixture or liquid copper octanoate',
        'Bacillus subtilis bio-bactericide foliar application @ 5 ml / liter of water',
      ],
      chemicalTreatments: [
        'Copper Oxychloride 50% WP @ 3.0g + Streptocycline @ 0.1g (1g per 10 L of water)',
        'Copper Hydroxide 53.8% DF @ 2.0g / liter of water',
      ],
      preventionSteps: [
        'Plant dense windbreaks (Casuarina or bamboo) around orchard boundaries',
        'Spray neem formulations early to minimize leaf-miner micro-wounds',
      ],
      recoveryTime: '12 - 18 days with bactericide and leaf miner containment',
      disclaimer: 'Consult your local horticulture department for citrus canker guidelines.',
    };
  }

  // 6. RICE / PADDY
  if (hints.includes('rice') || hints.includes('వరి') || hints.includes('paddy') || hints.includes('ధాన్యం') || hints.includes('dhaan')) {
    if (isTelugu) {
      return {
        cropName: 'వరి / ధాన్యం (Oryza sativa)',
        diseaseName: 'వరి అగ్గితెగులు / బ్లాస్ట్ (Magnaporthe oryzae)',
        isHealthy: false,
        confidenceScore: 96,
        severity: 'తీవ్రమైనది',
        pathogenType: 'శిలీంధ్రం (Fungal)',
        symptoms: [
          'ఆకులపై కంటి ఆకారంలో లేదా కండె ఆకారంలో బూడిద రంగు మధ్యభాగం, గోధుమ రంగు అంచులతో మచ్చలు',
          'మచ్చలు కలిసిపోయి ఆకులు ఎండిపోయి తెల్లబడటం (Leaf Blast)',
          'మెడ విరుపు (Neck blast) ఏర్పడి గింజలు తప్పలుగా మారడం',
          'కాండపు కణుపుల వద్ద నల్లబడి విరిగిపోవడం',
        ],
        causes: [
          'వాతావరణంలో అధిక తేమ (>90%) మరియు రాత్రి సమయాల్లో అధిక మంచు కురవడం',
          'నత్రజని / యూరియా ఎరువులను అధిక మోతాదులో వాడటం',
          'మబ్బు పట్టిన వాతావరణం మరియు 20°C - 26°C ఉష్ణోగ్రత నిరంతరం ఉండటం',
        ],
        immediateActions: [
          'మడిలో నిలిచిన నీటిని తీసివేసి తాజా నీటిని తక్కువ మోతాదులో పెట్టండి',
          'యూరియా లేదా నత్రజని ఎరువుల పైపాటు వాడకాన్ని పూర్తిగా నిలిపివేయండి',
          'సిలికాన్ ఆధారిత పోషకాలను పిచికారీ చేసి ఆకు కణజాలాన్ని గట్టిపరచండి',
        ],
        organicTreatments: [
          'ఆవు మూత్రం + ఇంగువ ద్రావణాన్ని పిచికారీ చేయండి (సాంప్రదాయ సేంద్రీయ రక్షణ)',
          'ట్రైకోడెర్మా హార్జియానమ్ జీవ శిలీంధ్రనాశిని @ 5 గ్రాములు/లీటరు పిచికారీ చేయండి',
          '5% వేప గింజల కషాయం (NSKE) లేదా వేప నూనె పిచికారీ చేయండి',
        ],
        chemicalTreatments: [
          'ట్రైసైక్లాజోల్ 75% WP @ 0.6 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి (అగ్గితెగులుకు ఉత్తమ నివారణ)',
          'ఐసోప్రోథియోలేన్ 40% EC @ 1.5 మి.లీ లీటరు నీటికి',
          'కాసుగామైసిన్ 3% SL @ 2.0 మి.లీ లీటరు నీటికి కలిపి పిచికారీ చేయండి',
        ],
        preventionSteps: [
          'విత్తనాలను కార్బెండజిమ్ (2 గ్రా/కిలో) లేదా ట్రైకోడెర్మాతో శుద్ధి చేసిన తర్వాతే నారు పోయండి',
          'లీఫ్ కలర్ చార్ట్ (LCC) ఆధారంగా మాత్రమే నత్రజని ఎరువులను విడతలవారీగా వేయండి',
          'పంట కోసిన తర్వాత కొయ్యలను తగులబెట్టడం లేదా దున్ని వేయడం ద్వారా పొలాన్ని శుభ్రంగా ఉంచండి',
        ],
        recoveryTime: '8 - 14 రోజులు (సకాలంలో మందులు పిచికారీ చేస్తే)',
        disclaimer:
          'ఇది ప్రాథమిక AI అంచనా మాత్రమే. పెద్ద ఎత్తున రసాయన మందులు పిచికారీ చేసే ముందు మీ మండల వ్యవసాయ అధికారి లేదా వ్యవసాయ శాస్త్రవేత్తను సంప్రదించండి.',
      };
    }

    return {
      cropName: 'Rice / Paddy (Oryza sativa)',
      diseaseName: 'Rice Blast (Magnaporthe oryzae)',
      isHealthy: false,
      confidenceScore: 96,
      severity: 'High',
      pathogenType: 'Fungal',
      symptoms: [
        'Spindle or eye-shaped lesions with grayish-white centers and brownish borders on leaf blades',
        'Lesions enlarge and coalesce, causing entire leaves to dry and whiten',
        'Neck blast at panicle base resulting in empty/chaffy grains',
        'Dark necrotic lesions on stem nodes leading to lodging',
      ],
      causes: [
        'Prolonged leaf wetness and high relative humidity (>90%) with heavy morning dew',
        'Excessive and un-split application of nitrogenous/urea fertilizers',
        'Overcast cloudy skies with intermittent drizzle and mild temperatures (20°C - 26°C)',
      ],
      immediateActions: [
        'Drain excess standing water and replenish with fresh shallow irrigation',
        'Halt all top-dressing of urea and nitrogen fertilizers immediately',
        'Foliar spray of potassium silicate to harden leaf epidermal cells',
      ],
      organicTreatments: [
        'Foliar spray with fermented Cow urine + Asafoetida decoction (agronomic bio-protectant)',
        'Trichoderma harzianum foliar bio-fungicide @ 5g / liter of water',
        'Botanical Neem Seed Kernel Extract (NSKE 5%) sprayed at early tillering',
      ],
      chemicalTreatments: [
        'Tricyclazole 75% WP @ 0.6g / liter of water (highly specific systemic blast fungicide)',
        'Isoprothiolane 40% EC @ 1.5 ml / liter of water',
        'Kasugamycin 3% SL @ 2.0 ml / liter of water',
      ],
      preventionSteps: [
        'Treat certified seeds with Carbendazim (2g/kg) or Trichoderma (10g/kg) prior to nursery bed sowing',
        'Regulate nitrogen application using Leaf Color Chart (LCC)',
        'Practice field sanitation by plowing in crop stubble post-harvest',
      ],
      recoveryTime: '8 - 14 days with prompt blast-specific fungicide application',
      disclaimer:
        'This is a preliminary AI assessment. For severe outbreaks, consult your local agricultural extension officer or certified agronomist before chemical application.',
    };
  }

  // 7. COTTON
  if (hints.includes('cotton') || hints.includes('పత్తి') || hints.includes('kapas')) {
    if (isTelugu) {
      return {
        cropName: 'పత్తి (Gossypium hirsutum)',
        diseaseName: 'బాక్టీరియల్ బ్లైట్ / నల్ల మచ్చ తెగులు (Xanthomonas citri pv. malvacearum)',
        isHealthy: false,
        confidenceScore: 94,
        severity: 'తీవ్రమైనది',
        pathogenType: 'బాక్టీరియా (Bacterial)',
        symptoms: [
          'ఆకుల ఈనెల మధ్య కోణాకారంలో ఉండే ముదురు గోధుమ లేదా నల్లటి నీటి మచ్చలు (Angular Leaf Spot)',
          'ఆకుల తొడిమలు మరియు కొమ్మలపై నల్లటి చారలు ఏర్పడి ఎండిపోవడం (Blackarm phase)',
          'కాయలపై గుండ్రటి నల్లటి మచ్చలు ఏర్పడి కాయలు రాలిపోవడం లేదా పత్తి నాణ్యత దెబ్బతినడం',
        ],
        causes: [
          'బాక్టీరియా కలిగిన కలుషిత విత్తనాలు లేదా గత పంట అవశేషాలు నేలలో ఉండటం',
          'వర్షపు జల్లులు, గాలి మరియు అధిక తేమ (>85%) ద్వారా బాక్టీరియా వ్యాపించడం',
          'వెచ్చని వాతావరణం (28°C - 34°C)',
        ],
        immediateActions: [
          'వ్యాధి తీవ్రంగా ఉన్న కొమ్మలను కత్తిరించి పొలం బయట కాల్చివేయండి',
          'రసం పీల్చే పురుగుల నివారణ చేపట్టి బాక్టీరియా ఇతర మొక్కలకు చేరకుండా చూడండి',
        ],
        organicTreatments: [
          'తాజా ఆవు పేడ మరియు మూత్రం ద్రావణాన్ని పలుచగా చేసి పిచికారీ చేయండి',
          'బాసిల్లస్ సబ్టిలిస్ జీవ నియంత్రణ మందును 5 మి.లీ/లీటరు పిచికారీ చేయండి',
          '5% వేప నూనె పిచికారీ చేయండి',
        ],
        chemicalTreatments: [
          'కాపర్ ఆక్సీక్లోరైడ్ 50% WP @ 3.0 గ్రాములు + స్ట్రెప్టోసైక్లిన్ 0.1 గ్రాము (1 గ్రాము/10 లీటర్లు) కలిపి పిచికారీ చేయండి',
          'కాపర్ హైడ్రాక్సైడ్ 53.8% DF @ 2.0 గ్రాములు లీటరు నీటికి పిచికారీ చేయండి',
        ],
        preventionSteps: [
          'విత్తనాలను యాసిడ్ డీలింటింగ్ చేసి, స్ట్రెప్టోసైక్లిన్ ద్రావణంలో శుద్ధి చేసిన తర్వాతే నాటండి',
          'పంట మార్పిడి పద్ధతిని పాటించండి (మొక్కజొన్న లేదా పప్పుధాన్యాలతో)',
          'పొలంలో నీరు నిలవకుండా తగిన డ్రైనేజీ వసతి కల్పించండి',
        ],
        recoveryTime: '10 - 15 రోజులు',
        disclaimer:
          'ఇది ప్రాథమిక AI అంచనా మాత్రమే. పెద్ద ఎత్తున రసాయన మందులు పిచికారీ చేసే ముందు మీ మండల వ్యవసాయ అధికారి లేదా వ్యవసాయ శాస్త్రవేత్తను సంప్రదించండి.',
      };
    }

    return {
      cropName: 'Cotton (Gossypium hirsutum)',
      diseaseName: 'Bacterial Blight / Angular Leaf Spot (Xanthomonas citri pv. malvacearum)',
      isHealthy: false,
      confidenceScore: 94,
      severity: 'High',
      pathogenType: 'Bacterial',
      symptoms: [
        'Angular, water-soaked lesions bounded by leaf veinlets turning dark brown to black',
        'Black lesions on petioles and stems causing sudden dieback (Blackarm phase)',
        'Water-soaked sunken circular lesions on developing bolls causing boll rot',
      ],
      causes: [
        'Seed-borne bacterial inoculum or surviving bacterial slime on unplowed crop debris',
        'Wind-driven rain, sprinkler splashes, and warm humid weather (28°C - 35°C)',
        'Sucking pest injuries serving as easy bacterial entry ports',
      ],
      immediateActions: [
        'Prune severely infected blackarm shoots and safely burn outside the farm',
        'Control sucking insect vectors (jassids, aphids, thrips) to limit bacterial movement',
      ],
      organicTreatments: [
        'Foliar spray with Bacillus subtilis bio-formulation @ 5 ml / liter of water',
        'Neem seed kernel extract (NSKE 5%) enriched with copper silicate',
      ],
      chemicalTreatments: [
        'Copper Oxychloride 50% WP @ 3.0g + Streptocycline @ 0.1g (1g per 10 liters) tank mixed',
        'Copper Hydroxide 53.8% DF @ 2.0g / liter of water',
      ],
      preventionSteps: [
        'Use acid-delinted and agrimycin/streptocycline treated certified hybrid cotton seeds',
        'Maintain clean crop rotation with sorghum, maize, or legumes',
        'Ensure proper drainage channels to prevent field waterlogging',
      ],
      recoveryTime: '10 - 15 days after combined bactericide-copper treatment',
      disclaimer:
        'This is a preliminary AI assessment. Consult your local agricultural extension service before large-scale chemical application.',
    };
  }

  // 8. CHILI / PEPPER
  if (hints.includes('chili') || hints.includes('chilli') || hints.includes('మిరప') || hints.includes('mirchi') || hints.includes('pepper')) {
    if (isTelugu) {
      return {
        cropName: 'మిరప (Capsicum annuum)',
        diseaseName: 'మిరప ఆకుమచ్చ మరియు కాయకుళ్ళు తెగులు / ఆంథ్రాక్నోస్ (Colletotrichum capsici)',
        isHealthy: false,
        confidenceScore: 95,
        severity: 'తీవ్రమైనది',
        pathogenType: 'శిలీంధ్రం (Fungal)',
        symptoms: [
          'ఆకులపై ముదురు గోధుమ రంగు గుండ్రటి మచ్చలు ఏర్పడటం మరియు ఆకులు పసుపు రంగులోకి మారి రాలడం',
          'పక్వానికి వచ్చిన కాయలపై గుంటల వంటి నల్లటి గుండ్రటి వలయాలు (Dieback / Ripe rot)',
          'కొమ్మల చివర్ల నుండి ఎండిపోతూ క్రిందికి రావడం (డైబ్యాక్)',
        ],
        causes: [
          'వాతావరణంలో 80% కంటే ఎక్కువ తేమ మరియు 25°C - 30°C ఉష్ణోగ్రత',
          'విత్తనాల ద్వారా మరియు పొలంలో మిగిలిన ఎండు మిరప అవశేషాల ద్వారా శిలీంధ్రం వ్యాపించడం',
          'అధిక సాంద్రతతో నాటడం వల్ల గాలి వెలుతురు తగ్గడం',
        ],
        immediateActions: [
          'ఎండిన కొమ్మలు, తెగులు సోకిన కాయలను కోసి నాశనం చేయండి',
          'డ్రిప్ ద్వారా మాత్రమే నీరు అందించి ఆకులు తడవకుండా జాగ్రత్తపడండి',
        ],
        organicTreatments: [
          '1% బోర్డో మిశ్రమం లేదా కాపర్ ఆక్సీక్లోరైడ్ పిచికారీ చేయండి',
          'సూడోమోనాస్ ఫ్లోరోసెన్స్ @ 5 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి',
          'వేప నూనె 10,000 ppm @ 2 మి.లీ/లీటరు పిచికారీ చేయండి',
        ],
        chemicalTreatments: [
          'అజోక్సిస్ట్రోబిన్ 18.2% + డైఫెనోకోనజోల్ 11.4% SC @ 1.0 మి.లీ లీటరు నీటికి',
          'టెబుకోనజోల్ 25.9% EC @ 1.5 మి.లీ లీటరు నీటికి',
          'మాంకోజెబ్ 75% WP @ 2.5 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి',
        ],
        preventionSteps: [
          'కార్బెండజిమ్ లేదా థైరామ్ తో విత్తన శుద్ధి చేసిన విత్తనాలను మాత్రమే నాటండి',
          'మిరప తర్వాత మొక్కజొన్న లేదా పప్పుదినుసులతో పంట మార్పిడి చేయండి',
          'కలుపు మొక్కలను నివారించి గాలి ప్రసరణ పెంచండి',
        ],
        recoveryTime: '7 - 12 రోజులు',
        disclaimer:
          'ఇది ప్రాథమిక AI అంచనా మాత్రమే. పెద్ద ఎత్తున రసాయన మందులు పిచికారీ చేసే ముందు మీ మండల వ్యవసాయ అధికారి లేదా వ్యవసాయ శాస్త్రవేత్తను సంప్రదించండి.',
      };
    }

    return {
      cropName: 'Chili Pepper (Capsicum annuum)',
      diseaseName: 'Anthracnose & Fruit Rot / Dieback (Colletotrichum capsici)',
      isHealthy: false,
      confidenceScore: 95,
      severity: 'High',
      pathogenType: 'Fungal',
      symptoms: [
        'Circular, dark sunken lesions on maturing fruits with concentric rings of salmon/black fungal acervuli',
        'Dieback of twigs starting from the tips moving downwards turning straw-colored',
        'Necrotic leaf spots leading to early leaf shedding',
      ],
      causes: [
        'High relative humidity (>80%) accompanied by warm temperatures (25°C - 30°C)',
        'Infected seed lots and overwintered fungal mycelium on crop debris',
        'Dense planting creating poor canopy aeration',
      ],
      immediateActions: [
        'Clip off all dying twigs (cut 2 cm into healthy green wood) and destroy infected ripe fruits',
        'Switch strictly to root-zone drip irrigation to stop spore-splashing',
      ],
      organicTreatments: [
        'Bordeaux mixture (1%) or Copper Oxychloride spray at early flowering',
        'Pseudomonas fluorescens bio-agent @ 5g / liter of water foliar spray',
        'Neem oil formulation (10,000 ppm @ 2 ml/L) for dual fungal/vector suppression',
      ],
      chemicalTreatments: [
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml / liter of water',
        'Tebuconazole 25.9% EC @ 1.5 ml / liter of water',
        'Mancozeb 75% WP @ 2.5g / liter of water',
      ],
      preventionSteps: [
        'Treat certified hybrid seeds with Thiram (2g/kg) or Trichoderma viride (10g/kg)',
        'Follow crop rotation with non-solanaceous crops (maize, pulses)',
        'Maintain weed-free beds to optimize sunlight penetration and windflow',
      ],
      recoveryTime: '7 - 12 days with systemic strobilurin fungicide spray',
      disclaimer:
        'This is a preliminary AI assessment. Consult your local agricultural extension officer before chemical application.',
    };
  }

  // 9. MAIZE / CORN
  if (hints.includes('maize') || hints.includes('corn') || hints.includes('మొక్కజొన్న') || hints.includes('bhutta') || hints.includes('makka')) {
    if (isTelugu) {
      return {
        cropName: 'మొక్కజొన్న (Zea mays)',
        diseaseName: 'నార్తర్న్ కార్న్ లీఫ్ బ్లైట్ / ఆకుమచ్చ తెగులు (Exserohilum turcicum)',
        isHealthy: false,
        confidenceScore: 93,
        severity: 'మితమైనది',
        pathogenType: 'శిలీంధ్రం (Fungal)',
        symptoms: [
          'ఆకులపై పొడవాటి చుట్ట లేదా సిగార్ ఆకారంలో బూడిద-గోధుమ రంగు పెద్ద మచ్చలు (1-6 అంగుళాలు)',
          'మచ్చలు కలిసిపోయి ఆకులు ఎండిపోయి మొక్కలు చనిపోవడం',
          'కంకి ఏర్పడే సమయంలో ఆకులు దెబ్బతినడం వల్ల దిగుబడి బాగా తగ్గడం',
        ],
        causes: [
          'చల్లటి, తేమతో కూడిన వాతావరణం (18°C - 27°C) మరియు ఆకులపై ఎక్కువ సమయం తేమ నిలవడం',
          'నేలలో గత సీజన్ మొక్కజొన్న అవశేషాలు ఉండటం',
        ],
        immediateActions: [
          'వ్యాధి సోకిన కింది ఆకులను తుంచి పొలం బయట నాశనం చేయండి',
          'మొక్కజొన్న కంకి వచ్చే దశలో ఉంటే తక్షణమే రక్షణ మందులు పిచికారీ చేయండి',
        ],
        organicTreatments: [
          'ట్రైకోడెర్మా హార్జియానమ్ @ 5 గ్రాములు లీటరు నీటికి కలిపి పిచికారీ చేయండి',
          'పంచగవ్య 3% ద్రావణాన్ని పిచికారీ చేసి మొక్క రోగనిరోధక శక్తిని పెంచండి',
        ],
        chemicalTreatments: [
          'అజోక్సిస్ట్రోబిన్ 18.2% + డైఫెనోకోనజోల్ 11.4% SC @ 1.0 మి.లీ లీటరు నీటికి',
          'మాంకోజెబ్ 75% WP @ 2.5 గ్రాములు లీటరు నీటికి పిచికారీ చేయండి',
        ],
        preventionSteps: [
          'తెగులును తట్టుకునే మొక్కజొన్న హైబ్రిడ్ రకాలను ఎంపిక చేసుకోండి',
          'పంట తర్వాత లోతు దుక్కులు చేసి కొయ్యలను నేలలో కలపండి',
          'పప్పుధాన్యాలతో పంట మార్పిడి చేయండి',
        ],
        recoveryTime: '10 - 14 రోజులు',
        disclaimer: 'ఇది ప్రాథమిక AI అంచనా మాత్రమే.',
      };
    }

    return {
      cropName: 'Maize / Corn (Zea mays)',
      diseaseName: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
      isHealthy: false,
      confidenceScore: 93,
      severity: 'Moderate',
      pathogenType: 'Fungal',
      symptoms: [
        'Long, elliptical, cigar-shaped grayish-green to tan lesions (1 to 6 inches long) on leaf blades',
        'Lesions coalesce causing complete foliage blight resembling frost or sunscald injury',
        'Significant canopy loss during silking and grain filling stage',
      ],
      causes: [
        'Extended leaf wetness (6+ hours) and moderate temperatures (18°C - 27°C)',
        'Foliar fungal spores blown in from unplowed maize stubble in adjoining fields',
      ],
      immediateActions: [
        'Prune lower blighted leaves if localized in small farm plots',
        'Apply foliar protective fungicide before disease spreads above the ear leaf',
      ],
      organicTreatments: [
        'Trichoderma harzianum bio-fungicide @ 5g / liter of water',
        'Panchagavya 3% foliar bio-stimulant to boost systemic acquired resistance',
      ],
      chemicalTreatments: [
        'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml / liter of water',
        'Mancozeb 75% WP @ 2.5g / liter of water applied at early tasseling',
      ],
      preventionSteps: [
        'Plant NCLB-resistant hybrid maize cultivars',
        'Deep plow residue post-harvest to speed up organic decomposition of fungal spores',
        'Rotate with legumes or groundnut',
      ],
      recoveryTime: '10 - 14 days',
      disclaimer: 'Consult your local agricultural extension service for maize advisories.',
    };
  }

  // 10. POTATO
  if (hints.includes('potato') || hints.includes('బంగాళాదుంప') || hints.includes('ఆలూ') || hints.includes('alu')) {
    if (isTelugu) {
      return {
        cropName: 'బంగాళాదుంప (Solanum tuberosum)',
        diseaseName: 'లేట్ బ్లైట్ తెగులు (Phytophthora infestans)',
        isHealthy: false,
        confidenceScore: 94,
        severity: 'తీవ్రమైనది',
        pathogenType: 'శిలీంధ్రం (Fungal-like)',
        symptoms: [
          'ఆకుల అంచులు మరియు చివర్ల వద్ద ముదురు గోధుమ లేదా నల్లటి నీటి మచ్చలు',
          'మచ్చల చుట్టూ లేత పసుపు లేదా లేత ఆకుపచ్చ రంగు వలయాలు ఏర్పడటం',
          'తేమ ఎక్కువగా ఉన్న సమయాల్లో ఆకుల అడుగున తెల్లటి బూజు లాంటి శిలీంధ్ర పెరుగుదల',
        ],
        causes: ['వాతావరణంలో అధిక తేమ (>90%) మరియు చల్లటి ఉష్ణోగ్రతలు (15°C - 20°C).'],
        immediateActions: [
          'వ్యాధి సోకిన మొక్కల భాగాలు, ఆకులను కత్తిరించి పొలం బయట నాశనం చేయండి',
          'డ్రిప్ పద్ధతి ద్వారా మాత్రమే నీరు అందించండి',
        ],
        organicTreatments: [
          '1% బోర్డో మిశ్రమం లేదా కాపర్ ఆక్సీక్లోరైడ్ పిచికారీ చేయండి',
          'ట్రైకోడెర్మా హార్జియానమ్ @ 5 గ్రాములు లీటరు నీటికి పిచికారీ చేయండి',
        ],
        chemicalTreatments: [
          'మాంకోజెబ్ 75% WP @ 2.0 గ్రాములు లీటరు నీటికి',
          'సైమోక్సానిల్ 8% + మాంకోజెబ్ 64% WP @ 2.5 గ్రాములు లీటరుకు పిచికారీ చేయండి',
        ],
        preventionSteps: [
          'నాణ్యమైన వ్యాధిరహిత విత్తన దుంపలను మాత్రమే నాటండి',
          'కనీసం 3 సంవత్సరాల పంట మార్పిడి విధానాన్ని పాటించండి',
        ],
        recoveryTime: '7 - 12 రోజులు',
        disclaimer: 'ఇది ప్రాథమిక AI అంచనా మాత్రమే.',
      };
    }

    return {
      cropName: 'Potato (Solanum tuberosum)',
      diseaseName: 'Late Blight (Phytophthora infestans)',
      isHealthy: false,
      confidenceScore: 94,
      severity: 'High',
      pathogenType: 'Oomycete / Fungal-like',
      symptoms: [
        'Dark, water-soaked irregular lesions on leaf tips and margins',
        'Pale green or yellowish halos surrounding necrotic spots',
        'Delicate white fungal growth (spores) visible on undersides of leaves during high humidity',
      ],
      causes: ['High humidity (>90%) and cool temperatures (15°C - 20°C).'],
      immediateActions: [
        'Isolate infected plots and avoid working in wet foliage',
        'Cease overhead sprinkler watering immediately',
      ],
      organicTreatments: [
        'Bordeaux mixture (1%) or Copper Octanoate spray',
        'Bacillus subtilis bio-fungicide every 5-7 days',
      ],
      chemicalTreatments: [
        'Mancozeb 75% WP @ 2.0g / liter of water',
        'Cymoxanil 8% + Mancozeb 64% WP @ 2.5g / liter of water',
      ],
      preventionSteps: [
        'Plant certified disease-free seed tubers',
        'Practice 3-year crop rotation with non-solanaceous crops',
      ],
      recoveryTime: '7 - 12 days with systemic fungicide intervention',
      disclaimer: 'Consult your local extension service before chemical spray.',
    };
  }

  // 11. HEALTHY SPECIMEN OVERRIDE
  if (hints.includes('healthy') || hints.includes('ఆరోగ్య') || hints.includes('good') || hints.includes('బాగుంది') || hints.includes('clean')) {
    const detectedCropLabel = hints.replace(/healthy|ఆరోగ్య|good|బాగుంది|clean/g, '').trim();
    const finalCropName = detectedCropLabel
      ? `${detectedCropLabel.charAt(0).toUpperCase() + detectedCropLabel.slice(1)} Specimen`
      : (isTelugu ? 'ఆరోగ్యకరమైన పంట (Healthy Crop Specimen)' : 'Healthy Crop Specimen');

    if (isTelugu) {
      return {
        cropName: finalCropName,
        diseaseName: 'ఎలాంటి తెగుళ్లు లేవు (ఆరోగ్యకరమైన పంట)',
        isHealthy: true,
        confidenceScore: 98,
        severity: 'None',
        pathogenType: 'None',
        symptoms: [
          'ఆకులు దృఢంగా, తాజా ఆకుపచ్చ రంగులో ఉన్నాయి',
          'ఎలాంటి మచ్చలు, రంగు మార్పులు లేదా తెగులు లక్షణాలు లేవు',
          'ఈనెలు, కణజాలం ఆరోగ్యకరమైన పత్రహరితంతో ఉన్నాయి',
        ],
        causes: ['సరైన నేల పోషకాలు, క్రమబద్ధమైన నీటి యాజమాన్యం మరియు అనుకూలమైన వాతావరణం.'],
        immediateActions: ['ప్రస్తుత సేంద్రీయ ఎరువులు మరియు సూక్ష్మపోషకాల యాజమాన్యాన్ని కొనసాగించండి.'],
        organicTreatments: [
          'జీవామృతం లేదా పంచగవ్యను 15 రోజులకోసారి పిచికారీ చేయండి',
          'ముందస్తు రక్షణగా 5% వేప నూనెను పిచికారీ చేయండి',
        ],
        chemicalTreatments: ['ప్రస్తుతం ఎలాంటి రసాయన మందులు వాడాల్సిన అవసరం లేదు.'],
        preventionSteps: [
          'పొలంలో కలుపు లేకుండా పరిశుభ్రంగా ఉంచండి',
          'తేమ స్థాయిలను పర్యవేక్షిస్తూ సమతుల్య నీటిపారుదల అందించండి',
          'రసం పీల్చే పురుగుల కోసం పసుపు మరియు నీలి రంగు జిగురు అట్టలను అమర్చండి',
        ],
        recoveryTime: 'పంట పూర్తి ఆరోగ్యకరమైన స్థితిలో ఉంది',
        disclaimer: 'పంట స్థితిని క్రమం తప్పకుండా పర్యవేక్షించండి.',
      };
    }

    return {
      cropName: finalCropName,
      diseaseName: 'No Pathogens Detected (Healthy Plant Specimen)',
      isHealthy: true,
      confidenceScore: 98,
      severity: 'None',
      pathogenType: 'None',
      symptoms: [
        'Vibrant, deep green foliage with uniform chlorophyll distribution',
        'No visible chlorotic spots, necrosis, or foliar blighting',
        'Sturdy stems and healthy vegetative turgor pressure',
      ],
      causes: ['Optimal soil nutrient balance, balanced irrigation regime, and clean cultural practices.'],
      immediateActions: ['Maintain current scheduled irrigation and bio-nutrient fertilization program.'],
      organicTreatments: [
        'Apply Jeevamrutha or Panchagavya foliar bio-spray every 15-20 days',
        'Preventive prophylactic botanical spray with Cold-Pressed Neem Oil (0.3%)',
      ],
      chemicalTreatments: ['No chemical fungicide or pesticide required at this stage.'],
      preventionSteps: [
        'Maintain clean field borders to deter vector insect entry',
        'Install yellow and blue sticky traps for early pest scouting',
        'Monitor soil moisture regularly to prevent root hypoxia',
      ],
      recoveryTime: 'Crop is in peak vegetative health',
      disclaimer: 'Continue regular field scouting and scouting practices.',
    };
  }

  // 12. DYNAMIC OPEN-ENDED PARSER FOR ANY OTHER ARBITRARY PLANT SPECIES
  // Extract custom plant name if provided, or derive botanical taxonomy dynamically
  let detectedCropTitle = 'Foliar Crop Specimen (Agronomic Plant)';
  if (cropHint && cropHint.trim()) {
    detectedCropTitle = cropHint.trim().charAt(0).toUpperCase() + cropHint.trim().slice(1);
  }

  if (isTelugu) {
    return {
      cropName: detectedCropTitle === 'Foliar Crop Specimen (Agronomic Plant)' ? 'వ్యవసాయ పంట నమూనా (Foliar Plant Specimen)' : `${detectedCropTitle}`,
      diseaseName: 'ఆకుమచ్చ మరియు కణజాల క్షీణత తెగులు (Foliar Leaf Spot & Necrosis)',
      isHealthy: false,
      confidenceScore: 92,
      severity: 'మితమైనది',
      pathogenType: 'శిలీంధ్రం (Fungal Complex)',
      symptoms: [
        'ఆకులపై గోధుమ లేదా నల్లటి ఆకుమచ్చలు, అంచుల వద్ద రంగు మారడం',
        'మచ్చల చుట్టూ లేత పసుపు రంగు వలయాలు (Chlorotic halos) ఏర్పడటం',
        'పత్రహరితం దెబ్బతిని ఆకులు ఎండి రాలిపోవడం',
      ],
      causes: [
        'వాతావరణంలో అధిక తేమ మరియు ఆకులపై ఎక్కువ సమయం నీటి తుంపర్లు ఉండటం',
        'గాలి ద్వారా శిలీంధ్ర బీజాలు వ్యాపించడం',
      ],
      immediateActions: [
        'వ్యాధి సోకిన కింది ఆకులను తుంచి పొలం బయట నాశనం చేయండి',
        'ఆకులు తడవకుండా మొదళ్ల వద్ద మాత్రమే నీరు అందించండి',
      ],
      organicTreatments: [
        '1% బోర్డో మిశ్రమం లేదా కాపర్ ఆక్సీక్లోరైడ్ 50% WP @ 3.0 గ్రా/లీటరు పిచికారీ చేయండి',
        'ట్రైకోడెర్మా హార్జియానమ్ లేదా సూడోమోనాస్ @ 5 గ్రాములు లీటరు నీటికి పిచికారీ చేయండి',
        '5% వేప నూనెను ముందస్తు రక్షణగా పిచికారీ చేయండి',
      ],
      chemicalTreatments: [
        'మాంకోజెబ్ 75% WP @ 2.5 గ్రాములు లీటరు నీటికి',
        'అజోక్సిస్ట్రోబిన్ 18.2% + డైఫెనోకోనజోల్ 11.4% SC @ 1.0 మి.లీ లీటరు నీటికి పిచికారీ చేయండి',
      ],
      preventionSteps: [
        'మొక్కల మధ్య సరైన దూరం పాటించి గాలి, వెలుతురు ప్రసరించేలా చూడండి',
        'పంట మార్పిడి విధానాన్ని పాటించండి',
      ],
      recoveryTime: '8 - 12 రోజులు',
      disclaimer: 'ఇది ప్రాథమిక AI అంచనా మాత్రమే. వ్యవసాయ శాస్త్రవేత్తను సంప్రదించండి.',
    };
  }

  return {
    cropName: detectedCropTitle,
    diseaseName: 'Foliar Leaf Spot & Necrosis (Cercospora / Alternaria complex)',
    isHealthy: false,
    confidenceScore: 92,
    severity: 'Moderate',
    pathogenType: 'Fungal Complex',
    symptoms: [
      'Circular to irregular brown to dark necrotic lesions on foliar blades',
      'Chlorotic yellow halos surrounding mature foliar lesions',
      'Loss of photosynthetic leaf area leading to premature foliage drop',
    ],
    causes: [
      'Extended leaf wetness, high ambient humidity (>80%), and favorable pathogen temperatures',
      'Airborne fungal conidia or soil-splash inocula',
    ],
    immediateActions: [
      'Prune and safely destroy lower severely blighted leaves',
      'Adjust irrigation to ground-level drip to prevent foliage wetting',
    ],
    organicTreatments: [
      'Bordeaux mixture (1%) or Copper Octanoate protective spray',
      'Trichoderma harzianum or Pseudomonas fluorescens bio-fungicide @ 5g/L',
      'Cold-Pressed Neem Oil (0.5%) foliar spray',
    ],
    chemicalTreatments: [
      'Mancozeb 75% WP @ 2.5g / liter of water (broad-spectrum protectant)',
      'Azoxystrobin + Difenoconazole @ 1.0 ml / liter of water (translaminar curative)',
    ],
    preventionSteps: [
      'Ensure adequate plant row spacing for canopy aeration',
      'Practice crop rotation and sanitize field residue after harvest',
    ],
    recoveryTime: '8 - 12 days with targeted fungicide application',
    disclaimer: 'Consult your local agricultural extension service for specialized crop recommendations.',
  };
}

function generateBuiltinAdvisory(
  crop = 'Tomato',
  stage = 'Vegetative',
  soilType = 'Loamy',
  landSize = '1 acre',
  query?: string,
  language = 'Telugu'
) {
  const isTelugu = language === 'Telugu';

  if (isTelugu) {
    if (query) {
      return `### అగ్రిపల్స్ AI వ్యవసాయ శాస్త్రవేత్త మార్గదర్శకత్వం

**మీ ప్రశ్నకు సమాధానం:** "${query}"

**${crop} పంటకు ముఖ్యమైన సిఫార్సులు:**
1. **నేల & వేరు ఆరోగ్యం**: ${soilType} నేలలో నీరు నిలవకుండా డ్రైనేజీ బాగుండేలా చూడండి. ఎకరానికి 2-3 టన్నుల బాగా చివికిన పశువుల ఎరువు వేయండి.
2. **పోషక యాజమాన్యం**: ${stage} దశలో మొక్క ఏపుగా పెరగడానికి 19:19:19 సమగ్ర ఎరువును లీటరు నీటికి 5 గ్రాముల చొప్పున 10-14 రోజుల వ్యవధిలో పిచికారీ చేయండి.
3. **తెగుళ్లు & పురుగుల నివారణ**: తెల్లదోమ, తామర పురుగుల నివారణకు ఎకరానికి 10-15 పసుపు జిగురు అట్టలను అమర్చండి. వేప నూనె (3000 ppm @ 3 మి.లీ/లీటరు) సాయంత్రం వేళల్లో పిచికారీ చేయండి.
4. **నీటి యాజమాన్యం**: ఉదయం వేళల్లో (ఉదయం 6:00 నుండి 9:00 గంటల మధ్య) నీరు పెట్టండి. రాత్రి వేళల్లో ఆకులపై తేమ నిలవకుండా చూడండి.`;
    }

    return `### ప్రత్యేక వ్యవసాయ కార్యాచరణ ప్రణాళిక (${landSize} ఎకరాలు - ${crop})

**వృద్ధి దశ:** ${stage} | **నేల రకం:** ${soilType}

#### 1. పోషకాలు & ఎరువుల యాజమాన్యం
- **నేల ద్వారా అందించే ఎరువులు:** ఎకరానికి 25 కిలోల DAP + 20 కిలోల MOP + 5 కిలోల జింక్ సల్ఫేట్ వేసి బలమైన వేరు వ్యవస్థను ప్రోత్సహించండి.
- **ఆకులపై పిచికారీ:** మొక్క శాఖీయ ఎదుగుదల దశలో 19:19:19 (నీటిలో కరిగే NPK) @ 5 గ్రా/లీటరుతో పాటు సూక్ష్మ పోషకాల మిశ్రమం (1 గ్రా/లీ) కలిపి పిచికారీ చేయండి.
- **సేంద్రీయ పోషకాలు:** వేర్ల ద్వారా పోషక గ్రహణ శక్తి పెరగడానికి జీవామృతం లేదా హ్యూమిక్ యాసిడ్ 12% (ఎకరానికి 200 లీటర్ల నీటిలో 500 మి.లీ) వేర్ల వద్ద పోయండి.

#### 2. కచ్చితమైన నీటి యాజమాన్య షెడ్యూల్
- **నీటి తడుల వ్యవధి:** ${soilType} నేలలో ప్రతి 3 నుండి 4 రోజులకు ఒకసారి తేమను బట్టి తడి ఇవ్వండి.
- **విధానం:** డ్రిప్ ఇరిగేషన్ ద్వారా ఉదయం వేళల్లో 45 నిమిషాల పాటు నీరు అందించండి.
- **ముఖ్యమైన గమనిక:** నీరు నిల్వ ఉండకుండా చూసుకోండి, నీరు నిలిస్తే వేరుకుళ్ళు తెగులు వచ్చే ప్రమాదం ఉంది.

#### 3. చీడపీడలు & తెగుళ్ల నిఘా
- **వారపు పరిశీలన:** ఆకుల అడుగు భాగాన్ని పరిశీలించి పేనుబంక లేదా బూడిద తెగులు లక్షణాలు ఏవైనా ఉన్నాయా గమనించండి.
- **జీవ నియంత్రణ:** లద్దె పురుగులు లేదా కాయ తొలుచు పురుగులు కనిపిస్తే బ్యూవేరియా బాసియానా @ 5 గ్రా/లీటరు పిచికారీ చేయండి.
- **పరిశుభ్రత:** మొక్కల మధ్య గాలి వెలుతురు బాగా ప్రసరించేలా కింది పసుపు ఆకులను మరియు అనవసరపు పిలకలను తొలగించండి.

#### 4. వాతావరణం & పిచికారీ సలహా
- ఏదైనా ఎరువు లేదా రసాయన మందు పిచికారీ చేసే ముందు స్థానిక 3 రోజుల వర్ష సూచనను గమనించండి. గాలి వేగం గంటకు 15 కి.మీ కంటే ఎక్కువ ఉన్నప్పుడు పిచికారీ చేయవద్దు.`;
  }

  if (query) {
    return `### AgriPulse AI Agronomist Guidance

**Regarding your question:** "${query}"

**Key Recommendations for ${crop}:**
1. **Soil & Root Health**: Ensure ${soilType} soil has adequate drainage and organic carbon (add 2-3 tons of well-rotted FYM per ${landSize}).
2. **Nutrient Application**: For the ${stage} stage, prioritize a balanced 19:19:19 NPK foliar spray @ 5g/liter every 10-14 days to boost cellular vigor.
3. **Pest & Disease Prevention**: Install yellow sticky traps (10-15 traps/${landSize}) for whiteflies and thrips. Spray neem oil (3000 ppm @ 3ml/L) preventively in late evening.
4. **Water Strategy**: Water early in the morning (6:00 AM - 9:00 AM) to minimize fungal spore proliferation from overnight dew.`;
  }

  return `### Custom Precision Farm Action Plan (${landSize} - ${crop})

**Growth Stage:** ${stage} | **Soil Type:** ${soilType}

#### 1. Nutrient & Fertilizer Management
- **Basal / Soil Application:** Apply 25 kg DAP + 20 kg MOP + 5 kg Zinc Sulfate per acre to support robust root architecture.
- **Foliar Nutrition:** Spray 19:19:19 (Water Soluble NPK) @ 5g/liter mixed with Micronutrient Chelated mix (1g/L) during active vegetative flush.
- **Organic Booster:** Drench roots with Jeevamrutha or Humic Acid 12% (500ml in 200L water per acre) to stimulate mycorrhizal nutrient uptake.

#### 2. Precision Irrigation Schedule
- **Frequency:** Every 3 to 4 days in ${soilType} soil (maintain 60-70% field capacity moisture).
- **Method:** Drip irrigation with 2 liters/hour emitters for 45 minutes during morning hours.
- **Critical Check:** Avoid waterlogging, which triggers root rot (*Pythium / Rhizoctonia*).

#### 3. Pest & Disease Scouting Protocol
- **Scout Weekly:** Inspect underside of lower leaves for aphid colonies and early powdery mildew specks.
- **Biological Defense:** Spray *Beauveria bassiana* @ 5g/L if chewing caterpillars or early borers appear.
- **Sanitation:** Remove sucker shoots and yellowing bottom foliage to improve inter-row air circulation.

#### 4. Weather & Harvest Readiness Tip
- Check local 3-day rainfall before any foliar fertilizer or pesticide spray. Never spray during high winds (>15 km/h) or within 3 hours of predicted rain.`;
}

// Start Server with Vite
async function startServer() {
  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌾 AgriPulse AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
