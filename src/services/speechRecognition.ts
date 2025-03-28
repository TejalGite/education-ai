// Speech recognition service for voice-to-text functionality

interface SpeechRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

type SpeechRecognitionCallback = (transcript: string, isFinal: boolean) => void;

class SpeechRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private isSupported: boolean = false;
  private isListening: boolean = false;

  constructor() {
    // Check if the browser supports the Web Speech API
    this.isSupported =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
  }

  // Initialize speech recognition
  private initRecognition(options: SpeechRecognitionOptions = {}) {
    if (!this.isSupported) return;

    // Use the appropriate constructor based on browser support
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognitionConstructor();

    // Configure recognition
    this.recognition.lang = options.language || "en-US";
    this.recognition.continuous =
      options.continuous !== undefined ? options.continuous : false;
    this.recognition.interimResults =
      options.interimResults !== undefined ? options.interimResults : true;
    this.recognition.maxAlternatives = options.maxAlternatives || 1;
  }

  // Start listening for speech
  startListening(
    callback: SpeechRecognitionCallback,
    options: SpeechRecognitionOptions = {},
  ) {
    if (!this.isSupported) {
      console.error("Speech recognition is not supported in this browser");
      return false;
    }

    if (this.isListening) {
      this.stopListening();
    }

    this.initRecognition(options);

    if (!this.recognition) return false;

    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const isFinal = result.isFinal;

      callback(transcript, isFinal);
    };

    this.recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (error) {
      console.error("Error starting speech recognition", error);
      return false;
    }
  }

  // Stop listening
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      return true;
    }
    return false;
  }

  // Check if speech recognition is supported
  checkSupport() {
    return this.isSupported;
  }

  // Check if currently listening
  isCurrentlyListening() {
    return this.isListening;
  }
}

// Create a singleton instance
const speechRecognitionService = new SpeechRecognitionService();
export default speechRecognitionService;

// Add TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
