"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollText } from "lucide-react"
import UseCourseHooks from "@/hooks/useCourseHooks"
import { Button } from "./ui/button"

interface MediaItem {
  thumbnail_url?: string;
  name?: string;
  resource_type?: "video" | "image" | string;
}

interface CheckListItem {
  icon?: string;
  text?: string;
}

interface Course {
  media?: MediaItem[];
  checklist?: CheckListItem[];
  cta_text?: {
    value?: string;
    name?: string;
  };
}

export default function ScrollPriceCard() {
  const {course, loading, error} = UseCourseHooks() as { course: any, loading: boolean, error: any }
  const checkListItems: CheckListItem[] = Array.isArray(course?.checklist) ? course.checklist : [];
  const [showCard, setShowCard] = useState(false)

  useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    const bottomDistance = fullHeight - (scrollTop + windowHeight);
    setShowCard(scrollTop >= 1000 && bottomDistance >= 1000);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <div className="relative z-[999] hidden lg:block">
      <div
        className={`fixed top-18 right-10 transition-all duration-300 ease-in-out transform ${
          showCard ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"
        }`}
      >
        <Card className="w-96 shadow-lg border-2 border-blue-200 bg-white">
          <CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-green-600">৳1000</span>
              <span className="text-lg text-gray-500 line-through">৳5000</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">23% OFF</span>
            </div>
           <a href="https://app.10minuteschool.com/checkout" target="_blank">
             <Button className="w-full bg-green-600 hover:bg-green-700 cursor-pointer" value={course?.cta_text?.value}>
              {course?.cta_text?.name}
            </Button>
           </a>
          </CardHeader>
          <CardContent>
              <div className="space-y-3 ">
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-2">এই কোর্সে যা থাকছে</h3>
            </div>
            {checkListItems?.map((checkItem, id) => (
              <div key={id} className="flex items-center gap-3">
                {checkItem?.icon && <img src={checkItem.icon} alt="icon" className="w-5 h-5 object-contain" />}
                <span>{checkItem?.text}</span>
              </div>
            ))}
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
