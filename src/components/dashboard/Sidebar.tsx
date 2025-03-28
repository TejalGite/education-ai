import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  X,
  Award,
  BarChart2,
} from "lucide-react";

interface SidebarProps {
  userName?: string;
  userAvatar?: string;
  onNavigate?: (path: string) => void;
  activePath?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  userName = "Alex Johnson",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  onNavigate = () => {},
  activePath = "/dashboard",
  isCollapsed: initialCollapsed = false,
  onToggleCollapse = () => {},
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse();
  };

  const handleNavigate = (path: string) => {
    onNavigate(path);
  };

  const navigationItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <BookOpen size={20} />, label: "Courses", path: "/courses" },
    {
      icon: <ClipboardList size={20} />,
      label: "Assessments",
      path: "/assessments",
    },
    { icon: <BarChart2 size={20} />, label: "Progress", path: "/progress" },
    { icon: <MessageSquare size={20} />, label: "Messages", path: "/messages" },
    { icon: <Award size={20} />, label: "Achievements", path: "/achievements" },
  ];

  const bottomItems = [
    { icon: <User size={20} />, label: "Profile", path: "/profile" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
    { icon: <LogOut size={20} />, label: "Logout", path: "/logout" },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">AI</span>
            </div>
            <h1 className="text-xl font-bold">LearnAI</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleCollapse}
          className="ml-auto"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <TooltipProvider key={item.path} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePath === item.path ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start mb-1",
                      isCollapsed ? "px-2" : "px-3",
                    )}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>

      <Separator className="my-2" />

      <div className="p-4">
        <nav className="space-y-1">
          {bottomItems.map((item) => (
            <TooltipProvider key={item.path} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePath === item.path ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start mb-1",
                      isCollapsed ? "px-2" : "px-3",
                    )}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>

      <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800",
                  isCollapsed ? "justify-center" : "justify-start",
                )}
                onClick={() => handleNavigate("/profile")}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="ml-3 overflow-hidden">
                    <p className="text-sm font-medium truncate">{userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      View Profile
                    </p>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">{userName}</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;
