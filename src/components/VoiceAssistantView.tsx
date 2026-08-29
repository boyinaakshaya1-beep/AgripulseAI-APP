import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Camera,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Languages,
  AlertCircle,
} from 'lucide-react';
import { SupportedLanguage, VoiceChatMessage } from '../types';
import { SUPPORTED_LANGUAGES, getLanguageConfig } from '../data/languages';
import { useLanguage } from '../context/LanguageContext';

interface VoiceAssistantViewProps {
  setActiveTab: (tab: 'dashboard' | 'disease' | 'crops' | 'weather' | 'recommendations' | 'voice') => void;
  onSendImageToDetection?: (imageBase64: string) => void;
}

// Check Web Speech API availability
const SpeechRecognitionAPI =
  typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

// Optional quick-start topic categories for farmer inspiration
interface QuickTopic {
  id: string;
  icon: string;
  labels: Record<string, string>;
  questions: Record<string, string[]>;
}

const QUICK_TOPICS: QuickTopic[] = [
  {
    id: 'all',
    icon: '🌾',
    labels: {
      Telugu: 'అన్ని ప్రశ్నలు',
      Hindi: 'सभी सवाल',
      English: 'All Questions',
      Tamil: 'அனைத்து கேள்விகள்',
      Kannada: 'ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳು',
      Malayalam: 'എല്ലാ ചോദ്യങ്ങളും',
      Marathi: 'सर्व प्रश्न',
    },
    questions: {
      Telugu: [
        'నేను వరి వేశాను, ఇప్పుడు ఏం చేయాలి?',
        'నా టమాటాకు మచ్చలు వచ్చాయి.',
        'నా పంట సరిగ్గా పెరగడం లేదు.',
        'వర్షం పడితే స్ప్రే చేయొచ్చా?',
        'నిన్న ఎరువు వేశాను, ఇవాళ నీళ్లు పెట్టొచ్చా?',
      ],
      Hindi: [
        'मैंने धान की बुवाई की है, अब मुझे क्या करना चाहिए?',
        'पिछले हफ्ते मिर्च लगाई थी, आगे के कदम क्या हैं?',
        'टमाटर के पत्ते पीले पड़ रहे हैं, क्या उपाय करें?',
        'कल खाद डाली थी, क्या आज पानी दे सकते हैं?',
        'फसल की कटाई हो गई है, आगे क्या करें?',
      ],
      English: [
        'I have sown paddy. What should I do now?',
        'I planted chilli last week. What should I do next?',
        'My tomato leaves are turning yellow, what should I do?',
        'I applied fertilizer yesterday. Can I irrigate today?',
        'I harvested my crop. What should I do next?',
      ],
      Tamil: [
        'நெல் விதைத்துள்ளேன், இப்போது என்ன செய்ய வேண்டும்?',
        'கடந்த வாரம் மிளகாய் நட்டேன், அடுத்த கட்டம் என்ன?',
        'தக்காளி இலைகள் மஞ்சள் நிறமாக மாறுகின்றன',
        'நேற்று உரம் போட்டேன், இன்று தண்ணீர் பாய்ச்சலாமா?',
      ],
      Kannada: [
        'ನಾನು ಭತ್ತ ಬಿತ್ತನೆ ಮಾಡಿದ್ದೇನೆ, ಈಗ ಏನು ಮಾಡಬೇಕು?',
        'ಹಿಂದಿನ ವಾರ ಮೆಣಸಿನಕಾಯಿ ನಾಟಿ ಮಾಡಿದ್ದೇನೆ, ಮುಂದಿನ ಹಂತವೇನು?',
        'ಟೊಮೆಟೊ ಎಲೆಗಳು ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತಿವೆ',
        'ನಿನ್ನೆ ಗೊಬ್ಬರ ಹಾಕಿದ್ದೇನೆ, ಇಂದು ನೀರು ಹಾಯಿಸಬಹುದೇ?',
      ],
      Malayalam: [
        'ഞാൻ നെല്ല് വിതച്ചു, ഇനി എന്താണ് ചെയ്യേണ്ടത്?',
        'കഴിഞ്ഞ ആഴ്ച മുളക് നട്ടു, അടുത്ത നടപടികൾ എന്തൊക്കെയാണ്?',
        'തക്കാളി ഇലകൾ മഞ്ഞനിറമാകുന്നു, പരിഹാരം എന്താണ്?',
        'ഇന്നലെ വളം ഇട്ടു, ഇന്ന് നനയ്ക്കാമോ?',
      ],
      Marathi: [
        'मी भाताची पेरणी केली आहे, आता पुढे काय करावे?',
        'गेल्या आठवड्यात मिरचीची लागवड केली, पुढचे नियोजन काय?',
        'टोमॅटोची पाने पिवळी पडत आहेत, काय उपाय करावा?',
        'काल खत टाकले होते, आज पाणी देऊ शकतो का?',
      ],
    },
  },
  {
    id: 'sowing',
    icon: '🌱',
    labels: {
      Telugu: 'విత్తడం & ఎదుగుదల',
      Hindi: 'बुवाई और विकास',
      English: 'Sowing & Stages',
      Tamil: 'விதைப்பு & வளர்ச்சி',
      Kannada: 'ಬಿತ್ತನೆ & ಬೆಳವಣಿಗೆ',
      Malayalam: 'വിതയ്ക്കൽ & വളർച്ച',
      Marathi: 'पेरणी आणि वाढ',
    },
    questions: {
      Telugu: [
        'వరి విత్తిన 3వ రోజు ఎలాంటి జాగ్రత్తలు తీసుకోవాలి?',
        'పత్తి గింజలు మొలకెత్తడానికి సరైన తేమ ఎంత ఉండాలి?',
        'మిరప నారు నాటిన తర్వాత ఎప్పుడు తడి ఇవ్వాలి?',
      ],
      Hindi: [
        'धान बुवाई के 3 दिन बाद क्या सावधानी रखें?',
        'कपास में अंकुरण के लिए कितनी नमी चाहिए?',
        'सब्जी रोपाई के बाद पहली सिंचाई कब करें?',
      ],
      English: [
        'What care is needed 3-5 days after paddy sowing?',
        'How to ensure 95%+ germination in cotton?',
        'When to provide first irrigation after transplanting chilli?',
      ],
      Tamil: [
        'நெல் விதைத்த 3 நாட்களில் என்ன செய்ய வேண்டும்?',
        'பருத்தி விதை முளைக்க எவ்வளவு ஈரப்பதம் தேவை?',
      ],
      Kannada: [
        'ಭತ್ತ ಬಿತ್ತಿದ ನಂತರದ 3 ದಿನಗಳಲ್ಲಿ ಏನು ಮಾಡಬೇಕು?',
        'ಹತ್ತಿ ಬೀಜ ಮೊಳಕೆಯೊಡೆಯಲು ಎಷ್ಟು ತೇವಾಂಶ ಬೇಕು?',
      ],
      Malayalam: [
        'നെല്ല് വിതച്ച് 3 ദിവസത്തിന് ശേഷം എന്താണ് ചെയ്യേണ്ടത്?',
      ],
      Marathi: [
        'भात पेरणीनंतर ३ दिवसांत काय काळजी घ्यावी?',
        'कापूस बियाणे उगवण्यासाठी किती ओलावा लागतो?',
      ],
    },
  },
  {
    id: 'health',
    icon: '🍃',
    labels: {
      Telugu: 'ఆకుమచ్చలు & తెగుళ్లు',
      Hindi: 'पत्ते और कीट समस्या',
      English: 'Leaves & Pests',
      Tamil: 'இலை புள்ளிகள் & பூச்சிகள்',
      Kannada: 'ಎಲೆ ಕಲೆಗಳು & ರೋಗಗಳು',
      Malayalam: 'ഇല രോഗങ്ങൾ & കീടങ്ങൾ',
      Marathi: 'पानावरील डाग आणि कीड',
    },
    questions: {
      Telugu: [
        'టమాటా ఆకులపై నల్లటి వలయాల మచ్చలు ఉన్నాయి',
        'మిరపలో ఆకులు ముడుచుకుపోతున్నాయి, నివారణ ఏమిటి?',
        'వరిలో మెడవిరుపు లేదా ఆకుమచ్చ తెగులు లక్షణాలు ఏమిటి?',
      ],
      Hindi: [
        'टमाटर की पत्तियों पर काले छल्लेदार धब्बे हैं',
        'मिर्च में पत्तियां मुड़ रही हैं, क्या करें?',
        'धान में ब्लास्ट रोग के लक्षण और रोकथाम क्या है?',
      ],
      English: [
        'Tomato leaves have concentric black spots with yellow halos',
        'Chilli leaves are curling upwards, how to treat thrips?',
        'How to control early blast symptoms in rice?',
      ],
      Tamil: [
        'தக்காளி இலைகளில் கரும்புள்ளிகள் உள்ளன',
        'மிளகாய் இலை சுருட்டல் நோய்க்கு என்ன மருந்து?',
      ],
      Kannada: [
        'ಟೊಮೆಟೊ ಎಲೆಗಳಲ್ಲಿ ಕಪ್ಪು ಕಲೆಗಳು ಕಾಣಿಸುತ್ತಿವೆ',
        'ಮೆಣಸಿನಕಾಯಿ ಎಲೆ ಮುದುಡುವ ರೋಗಕ್ಕೆ ಪರಿಹಾರವೇನು?',
      ],
      Malayalam: [
        'തക്കാളി ഇലകളിൽ കറുത്ത പാടുകൾ കാണുന്നു',
      ],
      Marathi: [
        'टोमॅटोच्या पानांवर काळे डाग पडले आहेत',
        'मिरचीची पाने चुरडत आहेत, काय उपाय करावा?',
      ],
    },
  },
  {
    id: 'fertilizer',
    icon: '💧',
    labels: {
      Telugu: 'ఎరువులు & నీటి యాజమాన్యం',
      Hindi: 'खाद और सिंचाई',
      English: 'Fertilizers & Water',
      Tamil: 'உரம் & பாசனம்',
      Kannada: 'ಗೊಬ್ಬರ & ನೀರಾವರಿ',
      Malayalam: 'വളപ്രയോഗം & നനയ്ക്കൽ',
      Marathi: 'खत आणि पाणी व्यवस्थापन',
    },
    questions: {
      Telugu: [
        'ఎకరా వరి పంటకు మొదటి విడత యూరియా ఎంత వేయాలి?',
        'నిన్న ఎరువు వేశాను, ఈరోజు నీరు పెట్టవచ్చా?',
        'డ్రిప్ ద్వారా 19-19-19 ఎరువును ఏ సమయంలో ఇవ్వాలి?',
      ],
      Hindi: [
        'एक एकड़ धान में पहली यूरिया की कितनी मात्रा डालें?',
        'कल खाद डाली थी, क्या आज पानी दे सकते हैं?',
        'ड्रिप से 19:19:19 खाद देने का सही समय क्या है?',
      ],
      English: [
        'What is the recommended 1st top dressing of urea per acre?',
        'I applied fertilizer yesterday. Can I irrigate today?',
        'When is the best stage to apply water-soluble 19-19-19?',
      ],
      Tamil: [
        'ஒரு ஏக்கர் நெல்லுக்கு எவ்வளவு யூரியா போட வேண்டும்?',
        'நேற்று உரம் போட்டேன், இன்று தண்ணீர் பாய்ச்சலாமா?',
      ],
      Kannada: [
        'ಒಂದು ಎಕರೆ ಭತ್ತಕ್ಕೆ ಮೊದಲ ಕಂತಿನ ಯೂರಿಯಾ ಎಷ್ಟು ಹಾಕಬೇಕು?',
        'ನಿನ್ನೆ ಗೊಬ್ಬರ ಹಾಕಿದ್ದೇನೆ, ಇಂದು ನೀರು ಹಾಯಿಸಬಹುದೇ?',
      ],
      Malayalam: [
        'ഒരു ഏക്കർ നെല്ലിന് എത്ര യൂറിയ പ്രയോഗിക്കണം?',
      ],
      Marathi: [
        'एका एकर भातासाठी पहिल्या हप्त्यात किती युरिया द्यावा?',
        'काल खत टाकले होते, आज पाणी देऊ शकतो का?',
      ],
    },
  },
  {
    id: 'harvest',
    icon: '📦',
    labels: {
      Telugu: 'కోత & నేల సంరక్షణ',
      Hindi: 'कटाई और भंडारण',
      English: 'Harvest & Post-Harvest',
      Tamil: 'அறுவடை & சேமிப்பு',
      Kannada: 'ಕಟಾವು & ಶೇಖರಣೆ',
      Malayalam: 'വിളവെടുപ്പ് & സംരക്ഷണം',
      Marathi: 'काढणी आणि साठवणूक',
    },
    questions: {
      Telugu: [
        'పంట కోత తర్వాత నేలను ఎలా సిద్ధం చేయాలి?',
        'ధాన్యం నిల్వ చేయడానికి తేమ శాతం ఎంత ఉండాలి?',
        'వరి తర్వాత ఏ పప్పుధాన్యాల పంట వేస్తే నేల బాగుంటుంది?',
      ],
      Hindi: [
        'फसल कटाई के बाद मिट्टी की तैयारी कैसे करें?',
        'भंडारण के लिए अनाज में कितनी नमी होनी चाहिए?',
        'धान के बाद कौन सी दलहनी फसल लगाएं?',
      ],
      English: [
        'What soil preparation is needed after crop harvest?',
        'What is the safe grain moisture percentage for storage?',
        'Which pulse crop is best to rotate after rice?',
      ],
      Tamil: [
        'அறுவடைக்கு பின் நிலத்தை எப்படி தயார் செய்வது?',
      ],
      Kannada: [
        'ಬೆಳೆ ಕಟಾವಿನ ನಂತರ ಮಣ್ಣನ್ನು ಹೇಗೆ ಸಿದ್ಧಪಡಿಸಬೇಕು?',
      ],
      Malayalam: [
        'വിളവെടുപ്പിന് ശേഷം മണ്ണ് എങ്ങനെ ഒരുക്കണം?',
      ],
      Marathi: [
        'काढणीनंतर जमिनीची मशागत कशी करावी?',
      ],
    },
  },
];

export const VoiceAssistantView: React.FC<VoiceAssistantViewProps> = ({
  setActiveTab,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [messages, setMessages] = useState<VoiceChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [sttError, setSttError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState('all');

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const langConfig = getLanguageConfig(language);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const isSubmittedRef = useRef(false);
  const lastTranscriptRef = useRef('');

  // Initialize Speech Synthesis and voice list listener
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      const updateVoices = () => {
        if (synthRef.current) {
          const voices = synthRef.current.getVoices();
          setAvailableVoices(voices);
        }
      };
      updateVoices();
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing, interimTranscript]);

  // Handle Initial Greeting when language changes or first load
  useEffect(() => {
    // Stop any ongoing speech and listening on language switch
    stopSpeaking();
    stopListening();
    setSttError(null);

    const config = getLanguageConfig(language);
    const greetingMsg: VoiceChatMessage = {
      id: `greeting-${Date.now()}`,
      sender: 'assistant',
      text: config.greetingText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestPhoto: false,
    };

    setMessages([greetingMsg]);

    // Automatically speak the greeting if autoSpeak is enabled
    if (autoSpeak) {
      const timer = setTimeout(() => {
        speakText(config.greetingText, config.locale);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [language]);

  // Setup Speech Recognition with reliable Telugu (te-IN) and multilingual handling
  const startListening = () => {
    stopSpeaking();
    setSttError(null);
    isSubmittedRef.current = false;
    lastTranscriptRef.current = '';

    if (!SpeechRecognitionAPI) {
      setSttError(
        language === 'Telugu'
          ? 'ఈ బ్రౌజర్‌లో తెలుగు వాయిస్ సపోర్ట్ అందుబాటులో లేదు. దయచేసి Chrome బ్రౌజర్ ఉపయోగించండి లేదా క్రింద టైప్ చేయండి.'
          : 'Telugu voice support is not available in this browser. Please try Chrome or use text input.'
      );
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }

      const recognition = new SpeechRecognitionAPI();
      // Set speech recognition locale explicitly based on current language
      recognition.lang = langConfig.locale || (language === 'Telugu' ? 'te-IN' : 'en-IN');
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setInterimTranscript('');
        lastTranscriptRef.current = '';
        isSubmittedRef.current = false;
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const trans = event.results[i][0]?.transcript || '';
          if (event.results[i].isFinal) {
            final += trans;
          } else {
            interim += trans;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
          lastTranscriptRef.current = interim;
        }

        if (final && final.trim()) {
          lastTranscriptRef.current = final.trim();
          setInterimTranscript('');
          isSubmittedRef.current = true;
          stopListening();
          handleUserSubmit(final.trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setInterimTranscript('');
        
        if (event.error === 'not-allowed') {
          setSttError(
            language === 'Telugu'
              ? 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. మైక్ యాక్సెస్ అనుమతించండి లేదా క్రింద ప్రశ్నను టైప్ చేయండి.'
              : 'Microphone permission denied. Please allow microphone access or use text input.'
          );
        } else if (event.error === 'language-not-supported') {
          setSttError(
            language === 'Telugu'
              ? 'ఈ బ్రౌజర్‌లో తెలుగు వాయిస్ సపోర్ట్ అందుబాటులో లేదు. దయచేసి Chrome బ్రౌజర్ ఉపయోగించండి లేదా క్రింద టైప్ చేయండి.'
              : 'Telugu voice support is not available in this browser. Please try Chrome or use text input.'
          );
        } else if (event.error === 'no-speech') {
          setSttError(
            language === 'Telugu'
              ? 'మాటలు వినపడలేదు. దయచేసి మైక్ బటన్ నొక్కి మళ్ళీ స్పష్టంగా మాట్లాడండి.'
              : 'No speech detected. Please press the mic button and speak clearly.'
          );
        } else if (event.error === 'network') {
          setSttError(
            language === 'Telugu'
              ? 'ఇంటర్నెట్ కనెక్షన్ సమస్య వల్ల వాయిస్ పనిచేయడం లేదు. దయచేసి టైప్ చేయండి.'
              : 'Network issue for voice recognition. Please use text input or check connection.'
          );
        } else {
          setSttError(
            language === 'Telugu'
              ? 'ఈ బ్రౌజర్‌లో తెలుగు వాయిస్ సపోర్ట్ అందుబాటులో లేదు. దయచేసి Chrome బ్రౌజర్ ఉపయోగించండి లేదా క్రింద టైప్ చేయండి.'
              : 'Telugu voice support is not available in this browser. Please try Chrome or use text input.'
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        // Fallback: If recognition ended with unsubmitted recognized text (e.g. mobile Safari/Chrome pause)
        if (!isSubmittedRef.current && lastTranscriptRef.current && lastTranscriptRef.current.trim().length > 1) {
          const textToSubmit = lastTranscriptRef.current.trim();
          isSubmittedRef.current = true;
          setInterimTranscript('');
          handleUserSubmit(textToSubmit);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setSttError(
        language === 'Telugu'
          ? 'ఈ బ్రౌజర్‌లో తెలుగు వాయిస్ సపోర్ట్ అందుబాటులో లేదు. దయచేసి Chrome బ్రౌజర్ ఉపయోగించండి లేదా క్రింద టైప్ చేయండి.'
          : 'Telugu voice support is not available in this browser. Please try Chrome or use text input.'
      );
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
    }
  };

  // Text-To-Speech function with enhanced Telugu voice matching and clear pronunciation
  const speakText = (text: string, locale: string = langConfig.locale) => {
    if (!synthRef.current || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      synthRef.current.cancel();

      // Clean text for speech synthesis so numbers/bullets sound natural without robotic punctuation
      const cleaned = text
        .replace(/[*#_~`>]/g, '')
        .replace(/^[0-9]+\.\s*/gm, ', ') // replace numbered list markers with natural pause
        .replace(/\n\s*[-•]\s*/g, ', ')  // replace bullet points with pause
        .replace(/\n+/g, '. ')          // replace newlines with sentence pause
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      const isTelugu = locale.startsWith('te') || language === 'Telugu';
      utterance.lang = isTelugu ? 'te-IN' : locale;
      
      // Slightly relaxed rate for natural, crystal-clear Telugu pronunciation
      utterance.rate = isTelugu ? 0.92 : 0.95;
      utterance.pitch = 1.0;

      const voices = synthRef.current.getVoices().length > 0 ? synthRef.current.getVoices() : availableVoices;
      
      let matchedVoice: SpeechSynthesisVoice | undefined;

      if (isTelugu) {
        // Priority 1: Exact matching Telugu voice by language code or name
        matchedVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().replace('_', '-').startsWith('te') ||
            v.name.toLowerCase().includes('telugu') ||
            v.name.toLowerCase().includes('తెలుగు') ||
            v.lang.toLowerCase().includes('te-in') ||
            v.lang.toLowerCase().includes('te_in')
        );
      } else {
        // For other languages: match by language prefix
        const langPrefix = locale.split('-')[0].toLowerCase();
        matchedVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().replace('_', '-').startsWith(locale.toLowerCase()) ||
            v.lang.toLowerCase().startsWith(langPrefix) ||
            v.name.toLowerCase().includes(language.toLowerCase())
        );
      }

      // CRITICAL: Only set utterance.voice if matched voice genuinely matches the language.
      // Do NOT set an English voice for Telugu, as it corrupts pronunciation or goes silent.
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (err) => {
        console.warn('Speech synthesis playback error:', err);
        setIsSpeaking(false);
      };

      synthRef.current.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleUserSubmit = async (userText: string) => {
    if (!userText.trim() && !attachedImage) return;

    stopSpeaking();
    stopListening();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentImg = attachedImage;
    setAttachedImage(null);
    setInputText('');
    setInterimTranscript('');

    const farmerMsg: VoiceChatMessage = {
      id: `farmer-${Date.now()}`,
      sender: 'farmer',
      text: userText,
      timestamp,
      imageUrl: currentImg || undefined,
    };

    const newHistory = [...messages, farmerMsg];
    setMessages(newHistory);
    setIsProcessing(true);

    try {
      const formattedHistory = newHistory.map((m) => ({
        role: m.sender === 'farmer' ? 'farmer' : 'assistant',
        text: m.text,
      }));

      const res = await fetch('/api/voice-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          language: language,
          history: formattedHistory,
          imageBase64: currentImg || undefined,
        }),
      });

      const data = await res.json();

      if (data.success && data.reply) {
        const assistantMsg: VoiceChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestPhoto: data.shouldSuggestPhoto,
        };

        setMessages((prev) => [...prev, assistantMsg]);

        if (autoSpeak) {
          speakText(data.reply, langConfig.locale);
        }
      } else {
        throw new Error(data.error || 'Failed to get answer');
      }
    } catch (err: any) {
      console.error('Error fetching voice reply:', err);
      const fallbackReply = getFallbackErrorReply(language);
      const errorMsg: VoiceChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestPhoto: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
      if (autoSpeak) {
        speakText(fallbackReply, langConfig.locale);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAttachedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetConversation = () => {
    stopSpeaking();
    stopListening();
    const greetingMsg: VoiceChatMessage = {
      id: `greeting-${Date.now()}`,
      sender: 'assistant',
      text: langConfig.greetingText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([greetingMsg]);
    if (autoSpeak) {
      speakText(langConfig.greetingText, langConfig.locale);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-4 sm:space-y-6">
      
      {/* Top Header & Language Selector */}
      <div className="bg-[#1B3B2B] text-white rounded-3xl p-4 sm:p-6 border border-[#2D5A45] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Assistant Info */}
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md">
                <Sparkles className="w-7 h-7 text-[#1B3B2B]" />
              </div>
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#1B3B2B]"></span>
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                  {t.voiceAssistantTitle}
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  {t.voiceBadge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/80 mt-0.5">
                {t.voiceAssistantSubtitle}
              </p>
            </div>
          </div>

          {/* Controls: Auto-Speak toggle & Reset */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              id="voice-auto-speak-toggle"
              onClick={() => {
                if (isSpeaking) stopSpeaking();
                setAutoSpeak(!autoSpeak);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                autoSpeak
                  ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40'
                  : 'bg-[#152E21] text-stone-400 border-[#2D5A45]'
              }`}
              title={autoSpeak ? t.audioOn : t.audioMuted}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
              <span>{autoSpeak ? t.audioOn : t.audioMuted}</span>
            </button>

            <button
              id="voice-reset-btn"
              onClick={handleResetConversation}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#152E21] text-emerald-200 border border-[#2D5A45] hover:bg-[#2D5A45] transition-colors cursor-pointer"
              title={t.newChat}
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">{t.newChat}</span>
            </button>
          </div>

        </div>

        {/* Language Selection Pills */}
        <div className="mt-5 pt-4 border-t border-[#2D5A45]">
          <div className="flex items-center gap-2 mb-2.5 text-xs text-emerald-300 font-semibold">
            <Languages className="w-4 h-4 text-emerald-400" />
            <span>{t.languageSelect}:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.id;
              return (
                <button
                  key={lang.id}
                  id={`voice-lang-btn-${lang.id}`}
                  onClick={() => setLanguage(lang.id)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-400 text-[#1B3B2B] shadow-md font-bold scale-105'
                      : 'bg-[#152E21] text-emerald-100/80 hover:bg-[#2D5A45] border border-[#2D5A45]'
                  }`}
                >
                  <span>{lang.nativeName}</span>
                  <span className={`text-[10px] opacity-75 ${isSelected ? 'text-[#1B3B2B]' : 'text-emerald-300'}`}>
                    ({lang.name})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 sm:p-3.5 flex items-start gap-2.5 text-xs text-emerald-900">
        <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t.disclaimerVoice}
        </p>
      </div>

      {/* Main Conversation Window */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[520px] sm:h-[580px]">
        
        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/40">
          
          {messages.map((msg) => {
            const isFarmer = msg.sender === 'farmer';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isFarmer ? 'justify-end' : 'justify-start'}`}
              >
                {!isFarmer && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1B3B2B] text-emerald-300 flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 transition-all shadow-xs ${
                    isFarmer
                      ? 'bg-[#1B3B2B] text-white rounded-tr-xs border border-[#2D5A45]'
                      : 'bg-white text-stone-800 rounded-tl-xs border border-stone-200/90 shadow-sm'
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isFarmer ? 'text-emerald-300' : 'text-emerald-800'
                      }`}
                    >
                      {isFarmer ? t.farmerLabel : t.aiLabel}
                    </span>
                    <span
                      className={`text-[10px] ${
                        isFarmer ? 'text-emerald-300/70' : 'text-stone-600'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Attached Image Preview if any */}
                  {msg.imageUrl && (
                    <div className="mb-2.5 rounded-xl overflow-hidden border border-emerald-800/40 max-w-xs">
                      <img
                        src={msg.imageUrl}
                        alt="Crop upload"
                        className="w-full h-36 object-cover"
                      />
                    </div>
                  )}

                  {/* Message Text */}
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal">
                    {msg.text}
                  </p>

                  {/* Assistant Actions: Audio Replay & Photo Callout */}
                  {!isFarmer && (
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => speakText(msg.text, langConfig.locale)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
                        title={t.listenAgain}
                      >
                        <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.listenAgain}</span>
                      </button>

                      {msg.suggestPhoto && (
                        <button
                          onClick={() => {
                            if (fileInputRef.current) {
                              fileInputRef.current.click();
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-all shadow-xs cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>{t.attachLeafPhoto}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {isFarmer && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1 font-bold text-xs">
                    👨‍🌾
                  </div>
                )}
              </div>
            );
          })}

          {/* Real-time speech transcript preview while speaking */}
          {isListening && interimTranscript && (
            <div className="flex justify-end">
              <div className="bg-[#1B3B2B]/90 text-white rounded-2xl rounded-tr-xs p-3.5 max-w-[80%] border border-dashed border-emerald-400 animate-pulse">
                <div className="flex items-center gap-2 mb-1 text-[11px] text-emerald-300 font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{t.listeningNow}</span>
                </div>
                <p className="text-sm italic text-emerald-100 font-medium">
                  "{interimTranscript}"
                </p>
              </div>
            </div>
          )}

          {/* AI Thinking Animation */}
          {isProcessing && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1B3B2B] text-emerald-300 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
              </div>
              <div className="bg-white rounded-2xl p-3.5 border border-stone-200 flex items-center gap-2 shadow-xs">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-xs text-stone-600 font-medium">
                  {t.aiThinking}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* AI Speaking State Overlay Indicator */}
        {isSpeaking && (
          <div className="bg-emerald-950 text-white px-4 py-2 flex items-center justify-between border-t border-emerald-800/60 animate-in fade-in duration-150">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-0.5 h-4">
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3"></span>
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-4"></span>
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2"></span>
                <span className="w-1 bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-4"></span>
              </div>
              <span className="text-xs font-semibold text-emerald-200">
                {t.aiSpeaking}
              </span>
            </div>
            <button
              onClick={stopSpeaking}
              className="px-2.5 py-1 rounded-lg bg-emerald-800 text-xs font-semibold hover:bg-emerald-700 text-white transition-colors cursor-pointer"
            >
              {t.stopAudio}
            </button>
          </div>
        )}

        {/* STT Error Notification */}
        {sttError && (
          <div className="bg-amber-50 border-t border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{sttError}</span>
            </div>
            <button
              onClick={() => setSttError(null)}
              className="text-amber-800 font-bold hover:underline ml-2 cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        )}

        {/* Bottom Interaction Area */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
          
          {/* Quick Voice Prompts & Topics */}
          <div className="mb-3 space-y-2">
            {/* Optional Topic Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
              {QUICK_TOPICS.map((topic) => {
                const isSelected = selectedTopic === topic.id;
                const label = topic.labels[language] || topic.labels.English || topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1B3B2B] text-emerald-300 shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    <span>{topic.icon}</span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Sample Questions */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-bold text-stone-600 shrink-0 uppercase tracking-wider">
                {t.tryAsking}
              </span>
              {(() => {
                const activeTopicObj = QUICK_TOPICS.find((t) => t.id === selectedTopic) || QUICK_TOPICS[0];
                const questions = activeTopicObj.questions[language] || activeTopicObj.questions.English || langConfig.sampleQuestions;
                return questions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleUserSubmit(q)}
                    className="shrink-0 px-2.5 py-1 rounded-full text-xs bg-stone-100 text-stone-700 hover:bg-emerald-100 hover:text-emerald-900 border border-stone-200 transition-colors cursor-pointer"
                  >
                    "{q}"
                  </button>
                ));
              })()}
            </div>
          </div>

          {/* Attached Image Chip if selected */}
          {attachedImage && (
            <div className="mb-2 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-xs">
              <ImageIcon className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold">{t.leafPhotoReady}</span>
              <button
                onClick={() => setAttachedImage(null)}
                className="text-stone-600 hover:text-stone-700 font-bold ml-1 cursor-pointer"
              >
                ×
              </button>
            </div>
          )}

          {/* Input Controls */}
          <div className="flex items-center gap-2">
            
            {/* Hidden File Input for Leaf Photo */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />

            <button
              id="voice-attach-photo-btn"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-2xl bg-stone-100 text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200 transition-colors shrink-0 cursor-pointer"
              title={t.attachLeafPhoto}
            >
              <Camera className="w-5 h-5" />
            </button>

            {/* Main Central Tactile Microphone Button */}
            <button
              id="voice-mic-main-btn"
              onClick={() => {
                if (isListening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
              className={`relative flex items-center justify-center p-3.5 sm:px-6 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md shrink-0 cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white scale-105 ring-4 ring-rose-300 animate-pulse'
                  : 'bg-[#1B3B2B] text-emerald-300 hover:bg-[#254F3A] hover:text-white border border-[#2D5A45]'
              }`}
              title={isListening ? t.listeningNow : t.pressAndSpeak}
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5 sm:mr-2" />
                  <span className="hidden sm:inline">{t.listeningNow}</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 sm:mr-2 text-emerald-400" />
                  <span className="hidden sm:inline">{t.pressAndSpeak}</span>
                </>
              )}
            </button>

            {/* Fallback Text Input */}
            <div className="flex-1 relative">
              <input
                id="voice-text-fallback-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUserSubmit(inputText);
                  }
                }}
                placeholder={t.typePlaceholder}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all pr-10"
              />
              {inputText.trim() && (
                <button
                  id="voice-send-btn"
                  onClick={() => handleUserSubmit(inputText)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Quick status line */}
          <div className="mt-2 flex items-center justify-between text-[11px] text-stone-600 px-1">
            <span>
              {isListening ? '🔴 ' + t.listeningStatus : '💡 ' + t.heroSubtext.slice(0, 75) + '...'}
            </span>
            <button
              onClick={() => setActiveTab('disease')}
              className="font-semibold text-emerald-700 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>{t.fullDiagnosisTool}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

function getFallbackErrorReply(lang: SupportedLanguage): string {
  switch (lang) {
    case 'Telugu':
      return 'సరే రైతు సోదరా. మీ పంట ఆకుల మీద ఉన్న సమస్యను స్పష్టంగా అర్థం చేసుకోవడానికి ఫోటో పంపించండి లేదా మళ్ళీ చెప్పండి.';
    case 'Hindi':
      return 'जी किसान भाई। कृपया अपनी फसल की समस्या या पत्तियों का एक साफ फोटो भेजें ताकि मैं सही सलाह दे सकूँ।';
    case 'Tamil':
      return 'சரி விவசாய நண்பரே. உங்கள் பயிரின் பிரச்சனையை அறிய ஒரு புகைப்படத்தை அனுப்புங்கள் அல்லது மீண்டும் கூறவும்.';
    case 'Kannada':
      return 'ಸರಿ ರೈತ ಮಿತ್ರರೇ. ನಿಮ್ಮ ಬೆಳೆಯ ಸಮಸ್ಯೆಯನ್ನು ತಿಳಿಯಲು ಫೋಟೋ ಕಳುಹಿಸಿ ಅಥವಾ ಮತ್ತೊಮ್ಮೆ ಮಾತನಾಡಿ.';
    case 'Malayalam':
      return 'ശരി കർഷക സുഹൃത്തേ. വിളയുടെ പ്രശ്നം വ്യക്തമായി മനസ്സിലാക്കാൻ ഒരു ഫോട്ടോ അയച്ചുതരിക.';
    case 'Marathi':
      return 'होय शेतकरी मित्र. तुमच्या पिकाच्या समस्येचा एक फोटो पाठवा किंवा पुन्हा सांगा.';
    default:
      return 'Understood farmer. Please share a photo of your affected crop leaf or ask your question again.';
  }
}
