import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  color: string;
}

interface ProgressTrackingProps {
  courses?: CourseProgress[];
  weeklyProgress?: number;
  monthlyProgress?: number;
  overallProgress?: number;
}

const ProgressTracking = ({
  courses = [
    {
      id: "1",
      title: "Introduction to AI",
      progress: 75,
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Machine Learning Basics",
      progress: 45,
      color: "bg-green-500",
    },
    { id: "3", title: "Neural Networks", progress: 20, color: "bg-purple-500" },
    {
      id: "4",
      title: "Data Science Fundamentals",
      progress: 90,
      color: "bg-yellow-500",
    },
    { id: "5", title: "Python for AI", progress: 60, color: "bg-pink-500" },
  ],
  weeklyProgress = 68,
  monthlyProgress = 72,
  overallProgress = 65,
}: ProgressTrackingProps) => {
  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">
          Your Learning Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="courses" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="courses" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                Weekly
              </TabsTrigger>
              <TabsTrigger value="overall" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" />
                Overall
              </TabsTrigger>
            </TabsList>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue="all"
            >
              <option value="all">All Time</option>
              <option value="month">Last Month</option>
              <option value="week">Last Week</option>
              <option value="day">Last 24 Hours</option>
            </select>
          </div>

          <TabsContent value="courses" className="mt-0">
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{course.title}</span>
                    <span className="text-sm text-gray-500">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "absolute h-full left-0 top-0 rounded-full",
                        course.color,
                      )}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="mt-0">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    This Week's Progress
                  </span>
                  <span className="text-sm text-gray-500">
                    {weeklyProgress}%
                  </span>
                </div>
                <Progress value={weeklyProgress} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Monthly Progress</span>
                  <span className="text-sm text-gray-500">
                    {monthlyProgress}%
                  </span>
                </div>
                <Progress value={monthlyProgress} className="h-2" />
              </div>

              <div className="grid grid-cols-7 gap-2 mt-6">
                {Array.from({ length: 7 }).map((_, index) => {
                  const height = Math.floor(Math.random() * 70) + 30;
                  const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                    index
                  ];
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-full flex items-end justify-center">
                        <div
                          className="w-6 bg-blue-500 rounded-t-sm"
                          style={{ height: `${height}px` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="overall" className="mt-0">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full border-8 border-gray-100 flex items-center justify-center">
                    <span className="text-3xl font-bold">
                      {overallProgress}%
                    </span>
                  </div>
                </div>
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray={`${(2 * Math.PI * 45 * overallProgress) / 100} ${(2 * Math.PI * 45 * (100 - overallProgress)) / 100}`}
                  />
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">Courses Completed</div>
                  <div className="text-2xl font-bold">7</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">
                    Courses In Progress
                  </div>
                  <div className="text-2xl font-bold">5</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">
                    Total Learning Hours
                  </div>
                  <div className="text-2xl font-bold">42</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-500">
                    Certificates Earned
                  </div>
                  <div className="text-2xl font-bold">3</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressTracking;
