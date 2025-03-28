import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Clock,
  Sparkles,
  BarChart2,
  Activity,
  Cloud,
  Smartphone,
  Link,
} from "lucide-react";

interface RecommendationProps {
  id: string;
  title: string;
  description: string;
  duration?: string;
  icon: React.ReactNode;
}

interface WelcomeAreaProps {
  userName?: string;
  recommendations?: RecommendationProps[];
  lastCourse?: {
    id: string;
    title: string;
    progress: number;
    timeLeft: string;
  };
}

const WelcomeArea = ({
  userName = "Alex",
  recommendations: initialRecommendations = [],
  lastCourse: initialLastCourse = {
    id: "course-1",
    title: "Introduction to Neural Networks",
    progress: 65,
    timeLeft: "2h 15m",
  },
}: WelcomeAreaProps) => {
  const [recommendations, setRecommendations] = useState<RecommendationProps[]>(
    initialRecommendations.length > 0
      ? initialRecommendations
      : [
          {
            id: "topic-1",
            title: "Machine Learning Basics",
            description:
              "Learn the fundamentals of machine learning algorithms",
            duration: "1h 30m",
            icon: <Sparkles className="h-5 w-5 text-purple-500" />,
          },
          {
            id: "topic-2",
            title: "Neural Networks Architecture",
            description: "Understand how neural networks are structured",
            duration: "2h 15m",
            icon: <BookOpen className="h-5 w-5 text-blue-500" />,
          },
          {
            id: "topic-3",
            title: "Data Visualization Techniques",
            description: "Master data visualization for better insights",
            duration: "1h 45m",
            icon: <BarChart2 className="h-5 w-5 text-green-500" />,
          },
          {
            id: "topic-4",
            title: "Cloud Computing for AI",
            description: "Deploy AI models using cloud infrastructure",
            duration: "2h 00m",
            icon: <Cloud className="h-5 w-5 text-sky-500" />,
          },
          {
            id: "topic-5",
            title: "Mobile AI Applications",
            description: "Build AI-powered mobile applications",
            duration: "1h 30m",
            icon: <Smartphone className="h-5 w-5 text-amber-500" />,
          },
          {
            id: "topic-6",
            title: "API Integration for AI Services",
            description: "Connect your applications to AI services",
            duration: "1h 15m",
            icon: <Link className="h-5 w-5 text-indigo-500" />,
          },
        ],
  );

  const [lastCourse, setLastCourse] = useState(initialLastCourse);
  const [loading, setLoading] = useState(false);

  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      sparkles: <Sparkles className="h-5 w-5 text-purple-500" />,
      "book-open": <BookOpen className="h-5 w-5 text-blue-500" />,
      "bar-chart-2": <BarChart2 className="h-5 w-5 text-green-500" />,
      activity: <Activity className="h-5 w-5 text-red-500" />,
      cloud: <Cloud className="h-5 w-5 text-sky-500" />,
      smartphone: <Smartphone className="h-5 w-5 text-amber-500" />,
      link: <Link className="h-5 w-5 text-indigo-500" />,
    };
    return (
      iconMap[iconName] || <Sparkles className="h-5 w-5 text-purple-500" />
    );
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {userName}!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Here's what we recommend for you today
            </p>
          </div>
          {lastCourse && lastCourse.id && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex items-center gap-3 min-w-[250px]">
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Continue Learning
                </p>
                <h4 className="font-medium text-blue-900 dark:text-blue-200 truncate max-w-[180px]">
                  {lastCourse.title}
                </h4>
                <div className="w-full bg-blue-200 dark:bg-blue-700 h-1.5 rounded-full mt-2">
                  <div
                    className="bg-blue-600 dark:bg-blue-400 h-1.5 rounded-full"
                    style={{ width: `${lastCourse.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-blue-700 dark:text-blue-300 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {lastCourse.timeLeft}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-8 text-blue-700 dark:text-blue-300 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800/30"
                >
                  Resume
                </Button>
              </div>
            </div>
          )}
        </div>

        {!loading && recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            {recommendations.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-start p-3 rounded-lg transition-colors",
                  "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700/50",
                )}
              >
                <div className="flex-shrink-0 mr-3 mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                  {item.duration && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.duration}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WelcomeArea;
