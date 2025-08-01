"use client";

import Image, { StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import similarImg1 from "../../public/images/similar1.jpg";
import similarImg2 from "../../public/images/similar2.jpg";
import similarImg3 from "../../public/images/similar3.jpg";
import similarImg4 from "../../public/images/similar4.jpg";
import similarImg5 from "../../public/images/similar5.jpg";

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: string;
  originalPrice?: string;
  image: StaticImageData;
  badge: string;
  badgeColor: string;
}

export default function Component() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const courses: Course[] = [
    {
      id: 1,
      title: "IELTS LIVE Batch",
      instructor: "Munzereen Shahid, Sakib Bin Rashid",
      price: "৳6500",
      originalPrice: "৳10000",
      image: similarImg1,
      badge: "IELTS",
      badgeColor: "bg-red-600",
    },
    {
      id: 2,
      title: "ঘরে বসে Spoken English",
      instructor: "Munzereen Shahid",
      price: "৳1950",
      image: similarImg2,
      badge: "SPOKEN ENGLISH",
      badgeColor: "bg-blue-600",
    },
    {
      id: 3,
      title: "Email Marketing কোর্স Freelancing",
      instructor: "Tasnuva Tisha",
      price: "৳1950",
      image: similarImg3,
      badge: "EMAIL MARKETING",
      badgeColor: "bg-orange-600",
    },
    {
      id: 4,
      title: "Complete English Grammar Course",
      instructor: "Munzereen Shahid",
      price: "৳1950",
      image: similarImg4,
      badge: "ENGLISH GRAMMAR",
      badgeColor: "bg-green-600",
    },
    {
      id: 5,
      title: "Web Development Bootcamp",
      instructor: "John Doe",
      price: "৳2500",
      image: similarImg5,
      badge: "WEB DEV",
      badgeColor: "bg-purple-600",
    },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Similar Course</h2>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="h-10 w-10 rounded-full bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="h-10 w-10 rounded-full bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {courses.map((course) => (
            <Card
              key={course.id}
              className="flex-shrink-0 w-80 overflow-hidden hover:shadow-lg pt-0 pb-2 transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={320}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span
                    className={`${course.badgeColor} text-white text-xs font-bold px-2 py-1 rounded`}
                  >
                    {course.badge}
                  </span>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3">{course.instructor}</p>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">{course.price}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {course.originalPrice}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
