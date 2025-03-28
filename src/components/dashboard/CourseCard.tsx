import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Clock, BookOpen, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  duration?: string;
  lessons?: number;
  progress?: number;
  category?: string;
  onClick?: () => void;
  onContinue?: () => void;
}

const CourseCard = ({
  id = "course-1",
  title = "Introduction to Artificial Intelligence",
  description = "Learn the fundamentals of AI, including machine learning, neural networks, and practical applications.",
  thumbnail = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80",
  duration = "4h 30m",
  lessons = 12,
  progress = 45,
  category = "AI & Machine Learning",
  onClick = () => console.log("Course card clicked"),
  onContinue = () => console.log("Continue learning clicked"),
}: CourseCardProps) => {
  return (
    <Card className="w-full max-w-[300px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-[160px] object-cover"
        />
        <Badge
          className="absolute top-2 right-2 bg-primary/90 hover:bg-primary"
          variant="secondary"
        >
          {category}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-2">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 h-10">
          {description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{lessons} lessons</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onClick}>
          View Details
        </Button>
        <Button className="flex-1 gap-1" onClick={onContinue}>
          <Play className="h-3.5 w-3.5" />
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
