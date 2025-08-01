"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UseCourseHooks from "@/hooks/useCourseHooks";

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

export default function CourseSlider() {
  const { course, loading, error } = UseCourseHooks() as {
    course: Course | null | undefined;
    loading: boolean;
    error?: unknown;
  };

  const mediaItems: MediaItem[] = Array.isArray(course?.media) ? course.media : [];
  const checkListItems: CheckListItem[] = Array.isArray(course?.checklist) ? course.checklist : [];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentItem = mediaItems.length > 0 ? mediaItems[currentIndex] : null;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1));
    setIsPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1));
    setIsPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentItem?.resource_type === "video") {
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return (
      <div className="w-96 border-1 bg-white rounded-sm absolute -top-75 right-10 mx-auto p-1 space-y-4">
        <Card className="p-6 text-center">Loading...</Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-96 border-1 bg-white rounded-sm absolute -top-75 right-10 mx-auto p-1 space-y-4">
        <Card className="p-6 text-center text-red-600">Error loading course data.</Card>
      </div>
    );
  }

  if (mediaItems.length === 0) {
    return (
      <div className="w-96 border-1 bg-white rounded-sm absolute -top-75 right-10 mx-auto p-1 space-y-4">
        <Card className="p-6 text-center">No media items available.</Card>
      </div>
    );
  }

  return (
    <div className="lg:w-96 md:w-full md:mt-4 w-80 border-1 bg-white rounded-sm   p-1 space-y-4">
      <Card className="relative overflow-hidden rounded-sm py-0 ">
        <div className="relative aspect-video">
          <div className="relative w-full h-full">
            <Image
              src={currentItem?.thumbnail_url || "/placeholder.svg"}
              alt={currentItem?.name || ""}
              fill
               
              className="w-full h-full object-cover"
            />

            {/*========== Video Play Overlay ===========*/}
            {currentItem?.resource_type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Button size="lg" variant="secondary" className="z-50 rounded-full lg:w-14 lg:h-14 w-10 h-10 p-0" onClick={togglePlay}>
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
              </div>
            )}
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="absolute z-50 w-6 h-6 lg:w-8 lg:h-8 left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute z-50 w-6 h-6  lg:w-8 lg:h-8 right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
            onClick={goToNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          <div className="absolute h-full bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6"></div>
        </div>
      </Card>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {mediaItems.map((item, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative flex-shrink-0 rounded-lg overflow-hidden scrollbar-hide w-17 h-10 mt-1 transition-all duration-200 ${
              index === currentIndex ? "ring-2 ring-green-500 scale-105" : "hover:scale-102 opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={item?.thumbnail_url || "/placeholder.svg"} alt={item?.name || ""} width={120} height={80} className="object-cover" />

            {item?.resource_type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {mediaItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-red-500 w-6" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
      <Card className="p-3 border-0 shadow-none price-card">
        <div className="space-y-4">
          <div>
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
          </div>

          <div className="space-y-3 mt-5">
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-2">এই কোর্সে যা থাকছে</h3>
            </div>
            {checkListItems.map((checkItem, id) => (
              <div key={id} className="flex items-center gap-3">
                {checkItem?.icon && <Image src={checkItem.icon} alt="icon" width={100} height={100} className="w-5 h-5 object-contain" />}
                <span>{checkItem?.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
