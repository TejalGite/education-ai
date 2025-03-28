// Chatbot service for AI-powered learning assistance
import { v4 as uuidv4 } from "uuid";

export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// In a real application, this would connect to an AI API like OpenAI, Claude, or Llama
class ChatbotService {
  private sessions: Map<string, ChatSession> = new Map();
  private apiKey: string = import.meta.env.VITE_AI_API_KEY || "";
  private apiEndpoint: string = import.meta.env.VITE_AI_API_ENDPOINT || "";

  // Get or create a chat session for a user
  getOrCreateSession(userId: string): ChatSession {
    const existingSession = Array.from(this.sessions.values()).find(
      (session) => session.userId === userId,
    );

    if (existingSession) {
      return existingSession;
    }

    const newSession: ChatSession = {
      id: uuidv4(),
      messages: [
        {
          id: uuidv4(),
          content:
            "Hello! I'm your AI learning assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.sessions.set(newSession.id, newSession);
    return newSession;
  }

  // Send a message and get a response
  async sendMessage(sessionId: string, content: string): Promise<ChatMessage> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error("Chat session not found");
    }

    // Add user message to session
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    session.messages.push(userMessage);
    session.updatedAt = new Date();

    // Generate bot response
    const botResponse = await this.generateResponse(content, session.messages);
    session.messages.push(botResponse);

    // In a real app, we would store the session in a database
    return botResponse;
  }

  // Get chat history for a session
  getSessionHistory(sessionId: string): ChatMessage[] {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error("Chat session not found");
    }

    return [...session.messages];
  }

  // Clear chat history for a session
  clearSessionHistory(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error("Chat session not found");
    }

    session.messages = [
      {
        id: uuidv4(),
        content:
          "Hello! I'm your AI learning assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ];
    session.updatedAt = new Date();
  }

  // Generate a response based on user input and conversation history
  // In a real app, this would call an AI API like OpenAI, Claude, etc.
  private async generateResponse(
    userInput: string,
    conversationHistory: ChatMessage[],
  ): Promise<ChatMessage> {
    // If API key is available, try to use the AI API
    if (this.apiKey && this.apiEndpoint) {
      try {
        return await this.callAIAPI(userInput, conversationHistory);
      } catch (error) {
        console.error("Error calling AI API:", error);
        // Fall back to rule-based responses
      }
    }

    // Rule-based responses as fallback
    return this.generateRuleBasedResponse(userInput, conversationHistory);
  }

  // Call external AI API (OpenAI, Claude, etc.)
  private async callAIAPI(
    userInput: string,
    conversationHistory: ChatMessage[],
  ): Promise<ChatMessage> {
    // Format conversation history for the API
    const formattedHistory = conversationHistory
      .slice(-10) // Only use the last 10 messages to stay within token limits
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }));

    // Add system message for context
    const messages = [
      {
        role: "system",
        content:
          "You are an AI learning assistant for an educational platform. Your goal is to help users learn new skills, answer their questions about course content, and provide personalized learning recommendations. Be concise, helpful, and encouraging.",
      },
      ...formattedHistory,
    ];

    try {
      // This is a placeholder for the actual API call
      // In a real app, you would use fetch or axios to call the API
      // const response = await fetch(this.apiEndpoint, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${this.apiKey}`
      //   },
      //   body: JSON.stringify({
      //     model: 'gpt-4',
      //     messages,
      //     temperature: 0.7,
      //     max_tokens: 500
      //   })
      // });
      //
      // const data = await response.json();
      // const aiResponse = data.choices[0].message.content;

      // Simulate API response for demo
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const aiResponse =
        "I'm simulating an AI response since we're not connected to a real API yet. In a production environment, this would be a response from OpenAI, Claude, or another AI model.";

      return {
        id: uuidv4(),
        content: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("Error calling AI API:", error);
      throw error;
    }
  }

  // Generate rule-based responses for demo purposes
  private generateRuleBasedResponse(
    userInput: string,
    conversationHistory: ChatMessage[],
  ): Promise<ChatMessage> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple NLP: Convert to lowercase and remove punctuation for matching
        const processedInput = userInput
          .toLowerCase()
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

        // Context-aware responses based on conversation history
        const recentUserMessages = conversationHistory
          .filter((msg) => msg.sender === "user")
          .slice(-3)
          .map((msg) => msg.content.toLowerCase());

        let responseContent = "";

        // Check for learning path related questions
        if (
          processedInput.includes("learning path") ||
          processedInput.includes("roadmap")
        ) {
          responseContent =
            "Based on your profile and progress, I recommend starting with the fundamentals of AI and machine learning before moving to more advanced topics. Would you like me to create a personalized learning path for you?";
        }
        // Check for course recommendations
        else if (
          processedInput.includes("recommend") ||
          processedInput.includes("suggestion") ||
          processedInput.includes("course")
        ) {
          responseContent =
            'I can recommend courses based on your interests. Our "Introduction to Artificial Intelligence" course has excellent reviews and matches your learning profile. Would you like more information about it?';
        }
        // Check for progress tracking
        else if (
          processedInput.includes("progress") ||
          processedInput.includes("how am i doing")
        ) {
          responseContent =
            "You're making excellent progress! You've completed 65% of your current course and your quiz scores are above average. Keep up the good work!";
        }
        // Check for quiz or assessment related questions
        else if (
          processedInput.includes("quiz") ||
          processedInput.includes("test") ||
          processedInput.includes("assessment")
        ) {
          responseContent =
            "Would you like me to generate a practice quiz on your recent learning topics? This can help reinforce your knowledge and identify areas for improvement.";
        }
        // Check for help requests
        else if (
          processedInput.includes("help") ||
          processedInput.includes("confused") ||
          processedInput.includes("understand")
        ) {
          responseContent =
            "I'm here to help! Could you tell me which specific concept or topic you're having trouble with? I can provide explanations, examples, or additional resources.";
        }
        // Check for thank you messages
        else if (
          processedInput.includes("thank") ||
          processedInput.includes("thanks")
        ) {
          responseContent =
            "You're welcome! Is there anything else I can help you with in your learning journey?";
        }
        // Check for greetings
        else if (
          processedInput.includes("hello") ||
          processedInput.includes("hi") ||
          processedInput.includes("hey")
        ) {
          responseContent = "Hello! How can I assist with your learning today?";
        }
        // Default responses based on learning context
        else {
          const defaultResponses = [
            "That's a great question! Based on your progress, I recommend focusing on the machine learning module next.",
            "I've analyzed your learning pattern and suggest reviewing the recent quiz on data structures.",
            "You're making excellent progress! Would you like me to recommend some advanced exercises?",
            "According to your learning history, you might enjoy our new course on AI ethics.",
            "Have you considered exploring the practical applications of what you've learned so far? I can suggest some projects.",
            "Based on your interests, I think you might find the new workshop on neural networks valuable.",
            "Your consistent study habits are impressive! Research shows that spaced repetition like you're doing leads to better retention.",
          ];
          responseContent =
            defaultResponses[
              Math.floor(Math.random() * defaultResponses.length)
            ];
        }

        resolve({
          id: uuidv4(),
          content: responseContent,
          sender: "bot",
          timestamp: new Date(),
        });
      }, 1000);
    });
  }
}

// Create a singleton instance
const chatbotService = new ChatbotService();
export default chatbotService;
