import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Send,
  Mic,
  Bot,
  User,
  Paperclip,
  X,
  Trash2,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import chatbotService, { ChatMessage } from "@/services/chatbot";
import speechRecognitionService from "@/services/speechRecognition";

interface ChatbotWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
  userName?: string;
  initialMessages?: ChatMessage[];
}

const ChatbotWidget = ({
  isOpen = true,
  onClose = () => {},
  userName = "Student",
  initialMessages = [],
}: ChatbotWidgetProps) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session
  useEffect(() => {
    if (currentUser) {
      const session = chatbotService.getOrCreateSession(currentUser.uid);
      setSessionId(session.id);
      setMessages(session.messages);
    } else {
      // For users who aren't logged in, create a guest session
      const guestSession = chatbotService.getOrCreateSession("guest");
      setSessionId(guestSession.id);
      setMessages(guestSession.messages);
    }
  }, [currentUser]);

  // Check if speech recognition is supported
  useEffect(() => {
    setIsSpeechSupported(speechRecognitionService.checkSupport());
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return;

    // Add user message to UI immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Send message to chatbot service and get response
      const botResponse = await chatbotService.sendMessage(
        sessionId,
        inputValue.trim(),
      );
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        content:
          "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (sessionId) {
      chatbotService.clearSessionHistory(sessionId);
      const session = chatbotService.getOrCreateSession(
        currentUser?.uid || "guest",
      );
      setMessages(session.messages);
    }
  };

  const toggleSpeechRecognition = () => {
    if (isListening) {
      speechRecognitionService.stopListening();
      setIsListening(false);
      return;
    }

    const success = speechRecognitionService.startListening(
      (transcript, isFinal) => {
        setInputValue(transcript);
        if (isFinal && transcript.trim().length > 0) {
          // Optionally auto-send when speech recognition is final
          // setTimeout(() => handleSendMessage(), 500);
        }
      },
      { continuous: false, interimResults: true },
    );

    setIsListening(success);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-[350px] h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 z-50">
      {/* Chat Header */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-primary text-primary-foreground flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h3 className="font-medium">AI Learning Assistant</h3>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearChat}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary/90"
                >
                  <Trash2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear chat history</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary/90"
                >
                  <X size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Close</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4" id="chat-messages">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-start gap-2 max-w-[80%]">
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 bg-primary/20">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=assistant"
                      alt="AI Assistant"
                    />
                    <AvatarFallback>
                      <Bot size={16} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 bg-secondary/20">
                    <AvatarImage
                      src={
                        currentUser?.photoURL ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
                      }
                      alt={userName}
                    />
                    <AvatarFallback>
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2 max-w-[80%]">
                <Avatar className="h-8 w-8 bg-primary/20">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=assistant"
                    alt="AI Assistant"
                  />
                  <AvatarFallback>
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-muted">
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Paperclip size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach file (coming soon)</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Input
            placeholder="Ask me anything about your learning..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1"
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isListening ? "default" : "outline"}
                  size="icon"
                  className="shrink-0"
                  onClick={toggleSpeechRecognition}
                  disabled={!isSpeechSupported}
                >
                  <Mic
                    size={18}
                    className={isListening ? "text-white animate-pulse" : ""}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {!isSpeechSupported
                  ? "Speech recognition not supported in this browser"
                  : isListening
                    ? "Stop listening"
                    : "Start voice input"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            onClick={handleSendMessage}
            size="icon"
            disabled={!inputValue.trim() || !sessionId}
            className="shrink-0"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;
