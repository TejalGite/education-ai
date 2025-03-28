import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  progress: number;
  category: string;
  duration: string;
}

interface CourseCardProps {
  title?: string;
  description?: string;
  thumbnail?: string;
  progress?: number;
  category?: string;
  duration?: string;
}

// Inline CourseCard component since the import was causing issues
const CourseCard = ({
  title = "Course Title",
  description = "Course description goes here",
  thumbnail = "https://images.unsplash.com/photo-1677442135136-760c813028c4?w=800&q=80",
  progress = 0,
  category = "General",
  duration = "8 weeks",
}: CourseCardProps) => {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md h-full border border-gray-200 dark:border-gray-700">
      <div className="relative h-48">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
          {category}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow">
          {description}
        </p>

        <div className="mt-auto">
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>{duration}</span>
            <span>{progress}% complete</span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1">
              {progress > 0 ? "Continue" : "Start"} Learning
            </Button>
            <Button variant="outline" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CourseGridProps {
  courses?: Course[];
  title?: string;
  description?: string;
}

const CourseGrid = ({
  courses = [
    {
      id: "1",
      title: "Introduction to Artificial Intelligence",
      description:
        "Learn the fundamentals of AI and machine learning algorithms.",
      thumbnail:
        "https://images.unsplash.com/photo-1677442135136-760c813028c4?w=800&q=80",
      progress: 65,
      category: "AI",
      duration: "8 weeks",
    },
    {
      id: "2",
      title: "Web Development Masterclass",
      description: "Comprehensive guide to modern web development techniques.",
      thumbnail:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
      progress: 32,
      category: "Web Development",
      duration: "10 weeks",
    },
    {
      id: "3",
      title: "Data Science Fundamentals",
      description:
        "Explore data analysis, visualization, and statistical methods.",
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      progress: 78,
      category: "Data Science",
      duration: "12 weeks",
    },
    {
      id: "4",
      title: "Machine Learning Applications",
      description: "Apply ML algorithms to real-world problems and datasets.",
      thumbnail:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
      progress: 45,
      category: "AI",
      duration: "9 weeks",
    },
    {
      id: "5",
      title: "Mobile App Development",
      description:
        "Build cross-platform mobile applications with React Native.",
      thumbnail:
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80",
      progress: 12,
      category: "Mobile Development",
      duration: "8 weeks",
    },
    {
      id: "6",
      title: "Cloud Computing Essentials",
      description:
        "Master cloud services, deployment models, and architecture.",
      thumbnail:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
      progress: 50,
      category: "Cloud Computing",
      duration: "6 weeks",
    },
  ],
  title = "Recommended Courses",
  description = "Courses tailored to your learning preferences and progress",
}: CourseGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeTab, setActiveTab] = useState("all");

  // Filter courses based on search query, category, and active tab
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "in-progress" &&
        course.progress > 0 &&
        course.progress < 100) ||
      (activeTab === "completed" && course.progress === 100) ||
      (activeTab === "not-started" && course.progress === 0);

    return matchesSearch && matchesCategory && matchesTab;
  });

  // Sort courses based on sort order
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  // Get unique categories from courses
  const categories = [
    "all",
    ...new Set(courses.map((course) => course.category)),
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="h-10 w-10"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="not-started">Not Started</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <CourseGrid.Content courses={sortedCourses} />
          </TabsContent>

          <TabsContent value="in-progress" className="mt-4">
            <CourseGrid.Content courses={sortedCourses} />
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <CourseGrid.Content courses={sortedCourses} />
          </TabsContent>

          <TabsContent value="not-started" className="mt-4">
            <CourseGrid.Content courses={sortedCourses} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Grid content component
CourseGrid.Content = ({ courses }: { courses: Course[] }) => {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 mb-4">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          No courses found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          title={course.title}
          description={course.description}
          thumbnail={course.thumbnail}
          progress={course.progress}
          category={course.category}
          duration={course.duration}
        />
      ))}
    </div>
  );
};

export default CourseGrid;
