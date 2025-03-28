import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import WelcomeArea from "./WelcomeArea";
import ProgressTracking from "./ProgressTracking";
import CourseGrid from "./CourseGrid";
import ChatbotWidget from "./ChatbotWidget";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);

  const handleNavigate = (path: string) => {
    // In a real app, you would use react-router's navigate function
    console.log(`Navigating to: ${path}`);
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleToggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        userName={currentUser?.displayName || "User"}
        userAvatar={currentUser?.photoURL || undefined}
        onNavigate={handleNavigate}
        activePath="/dashboard"
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main content area with scrolling */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto space-y-6">
            {/* Welcome Area */}
            <WelcomeArea
              userName={currentUser?.displayName?.split(" ")[0] || "User"}
            />

            {/* Two-column layout for desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress Tracking (1/3 width on desktop) */}
              <div className="lg:col-span-1">
                <ProgressTracking />
              </div>

              {/* Course Grid (2/3 width on desktop) */}
              <div className="lg:col-span-2">
                <CourseGrid />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Chatbot Widget */}
      <ChatbotWidget
        isOpen={isChatbotOpen}
        onClose={handleToggleChatbot}
        userName={currentUser?.displayName || "User"}
      />
    </div>
  );
};

export default Dashboard;
