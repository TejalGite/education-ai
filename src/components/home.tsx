import React, { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import WelcomeArea from "./dashboard/WelcomeArea";
import ProgressTracking from "./dashboard/ProgressTracking";
import CourseGrid from "./dashboard/CourseGrid";
import ChatbotWidget from "./dashboard/ChatbotWidget";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activePath="/dashboard"
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto space-y-6 max-w-7xl">
          {/* Welcome Area */}
          <WelcomeArea />

          {/* Progress Tracking */}
          <ProgressTracking />

          {/* Course Grid */}
          <CourseGrid />
        </div>
      </main>

      {/* Chatbot Widget */}
      <ChatbotWidget
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
      />
    </div>
  );
};

export default Home;
