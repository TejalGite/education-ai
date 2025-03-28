// Course service for fetching and managing courses

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  progress: number;
  category: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  tags: string[];
  rating: number;
  enrolledCount: number;
  isRecommended?: boolean;
}

export interface UserPreferences {
  interests: string[];
  preferredCategories: string[];
  preferredLevel: "beginner" | "intermediate" | "advanced" | "all";
  learningGoals: string[];
}

// Mock data for courses
const mockCourses: Course[] = [
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
    level: "beginner",
    tags: ["AI", "Machine Learning", "Python"],
    rating: 4.8,
    enrolledCount: 1245,
    isRecommended: true,
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
    level: "intermediate",
    tags: ["JavaScript", "React", "Node.js"],
    rating: 4.6,
    enrolledCount: 987,
    isRecommended: false,
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
    level: "beginner",
    tags: ["Data Analysis", "Python", "Statistics"],
    rating: 4.7,
    enrolledCount: 1532,
    isRecommended: true,
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
    level: "intermediate",
    tags: ["Machine Learning", "Python", "TensorFlow"],
    rating: 4.9,
    enrolledCount: 876,
    isRecommended: true,
  },
  {
    id: "5",
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications with React Native.",
    thumbnail:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80",
    progress: 12,
    category: "Mobile Development",
    duration: "8 weeks",
    level: "intermediate",
    tags: ["React Native", "JavaScript", "Mobile"],
    rating: 4.5,
    enrolledCount: 654,
    isRecommended: false,
  },
  {
    id: "6",
    title: "Cloud Computing Essentials",
    description: "Master cloud services, deployment models, and architecture.",
    thumbnail:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    progress: 50,
    category: "Cloud Computing",
    duration: "6 weeks",
    level: "beginner",
    tags: ["AWS", "Azure", "Cloud"],
    rating: 4.4,
    enrolledCount: 432,
    isRecommended: false,
  },
  {
    id: "7",
    title: "Deep Learning Specialization",
    description: "Master neural networks and deep learning techniques.",
    thumbnail:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
    progress: 0,
    category: "AI",
    duration: "14 weeks",
    level: "advanced",
    tags: ["Deep Learning", "Neural Networks", "PyTorch"],
    rating: 4.9,
    enrolledCount: 789,
    isRecommended: true,
  },
  {
    id: "8",
    title: "Cybersecurity Fundamentals",
    description: "Learn essential security concepts and practices.",
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    progress: 0,
    category: "Security",
    duration: "8 weeks",
    level: "beginner",
    tags: ["Security", "Networking", "Ethical Hacking"],
    rating: 4.6,
    enrolledCount: 543,
    isRecommended: false,
  },
  {
    id: "9",
    title: "Blockchain Development",
    description:
      "Build decentralized applications using blockchain technology.",
    thumbnail:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80",
    progress: 0,
    category: "Blockchain",
    duration: "10 weeks",
    level: "intermediate",
    tags: ["Blockchain", "Ethereum", "Smart Contracts"],
    rating: 4.7,
    enrolledCount: 321,
    isRecommended: false,
  },
  {
    id: "10",
    title: "UI/UX Design Principles",
    description: "Create intuitive and engaging user experiences.",
    thumbnail:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    progress: 0,
    category: "Design",
    duration: "7 weeks",
    level: "beginner",
    tags: ["UI", "UX", "Design", "Figma"],
    rating: 4.8,
    enrolledCount: 876,
    isRecommended: true,
  },
];

// Default user preferences
const defaultPreferences: UserPreferences = {
  interests: ["AI", "Machine Learning", "Web Development"],
  preferredCategories: ["AI", "Data Science"],
  preferredLevel: "all",
  learningGoals: ["Career advancement", "Skill development"],
};

class CourseService {
  private courses: Course[] = mockCourses;
  private userPreferences: Map<string, UserPreferences> = new Map();

  // Get all courses
  getAllCourses(): Course[] {
    return [...this.courses];
  }

  // Get course by ID
  getCourseById(id: string): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  // Get courses by category
  getCoursesByCategory(category: string): Course[] {
    return this.courses.filter((course) => course.category === category);
  }

  // Get courses by level
  getCoursesByLevel(level: "beginner" | "intermediate" | "advanced"): Course[] {
    return this.courses.filter((course) => course.level === level);
  }

  // Get courses in progress
  getCoursesInProgress(): Course[] {
    return this.courses.filter(
      (course) => course.progress > 0 && course.progress < 100,
    );
  }

  // Get completed courses
  getCompletedCourses(): Course[] {
    return this.courses.filter((course) => course.progress === 100);
  }

  // Get not started courses
  getNotStartedCourses(): Course[] {
    return this.courses.filter((course) => course.progress === 0);
  }

  // Get user preferences
  getUserPreferences(userId: string): UserPreferences {
    return this.userPreferences.get(userId) || defaultPreferences;
  }

  // Update user preferences
  updateUserPreferences(
    userId: string,
    preferences: Partial<UserPreferences>,
  ): UserPreferences {
    const currentPreferences = this.getUserPreferences(userId);
    const updatedPreferences = { ...currentPreferences, ...preferences };
    this.userPreferences.set(userId, updatedPreferences);
    return updatedPreferences;
  }

  // Get recommended courses based on user preferences
  getRecommendedCourses(userId: string, limit: number = 3): Course[] {
    const preferences = this.getUserPreferences(userId);

    // In a real app, this would use a sophisticated recommendation algorithm
    // For now, we'll use a simple filtering approach
    let recommendedCourses = this.courses.filter((course) => {
      // Check if course matches user's interests
      const matchesInterests = course.tags.some((tag) =>
        preferences.interests.includes(tag),
      );

      // Check if course matches user's preferred categories
      const matchesCategories = preferences.preferredCategories.includes(
        course.category,
      );

      // Check if course matches user's preferred level
      const matchesLevel =
        preferences.preferredLevel === "all" ||
        course.level === preferences.preferredLevel;

      return (matchesInterests || matchesCategories) && matchesLevel;
    });

    // Sort by rating and enrolled count to get the most popular courses
    recommendedCourses.sort((a, b) => {
      // Calculate a score based on rating and popularity
      const scoreA = a.rating * 0.7 + (a.enrolledCount / 2000) * 0.3;
      const scoreB = b.rating * 0.7 + (b.enrolledCount / 2000) * 0.3;
      return scoreB - scoreA;
    });

    // Return the top N recommended courses
    return recommendedCourses.slice(0, limit);
  }

  // Get daily recommended topics
  getDailyRecommendedTopics(
    userId: string,
    limit: number = 3,
  ): { title: string; description: string; icon: string }[] {
    const preferences = this.getUserPreferences(userId);

    // Mock daily topics based on user interests
    const allTopics = [
      {
        title: "Machine Learning Fundamentals",
        description: "Based on your interest in AI and data science",
        icon: "sparkles",
        tags: ["AI", "Machine Learning", "Data Science"],
      },
      {
        title: "Advanced React Patterns",
        description: "Continue your web development journey",
        icon: "book-open",
        tags: ["Web Development", "React", "JavaScript"],
      },
      {
        title: "Data Visualization with D3",
        description: "Complement your frontend skills",
        icon: "bar-chart-2",
        tags: ["Data Science", "Web Development", "JavaScript"],
      },
      {
        title: "Neural Networks Architecture",
        description: "Deepen your understanding of deep learning",
        icon: "activity",
        tags: ["AI", "Deep Learning", "Neural Networks"],
      },
      {
        title: "Cloud Deployment Strategies",
        description: "Learn best practices for cloud applications",
        icon: "cloud",
        tags: ["Cloud Computing", "DevOps"],
      },
      {
        title: "Mobile UI Best Practices",
        description: "Create better mobile experiences",
        icon: "smartphone",
        tags: ["Mobile Development", "UI", "UX"],
      },
      {
        title: "Blockchain Fundamentals",
        description: "Understand the basics of distributed ledgers",
        icon: "link",
        tags: ["Blockchain", "Cryptocurrency"],
      },
    ];

    // Filter topics based on user interests
    const filteredTopics = allTopics.filter((topic) =>
      topic.tags.some((tag) => preferences.interests.includes(tag)),
    );

    // If no matches, return some default topics
    if (filteredTopics.length === 0) {
      return allTopics.slice(0, limit);
    }

    // Shuffle the filtered topics to get different recommendations each day
    const shuffled = [...filteredTopics].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, limit);
  }

  // Update course progress
  updateCourseProgress(courseId: string, progress: number): Course | undefined {
    const courseIndex = this.courses.findIndex(
      (course) => course.id === courseId,
    );
    if (courseIndex === -1) return undefined;

    this.courses[courseIndex] = {
      ...this.courses[courseIndex],
      progress: Math.min(100, Math.max(0, progress)), // Ensure progress is between 0-100
    };

    return this.courses[courseIndex];
  }
}

// Create a singleton instance
const courseService = new CourseService();
export default courseService;
