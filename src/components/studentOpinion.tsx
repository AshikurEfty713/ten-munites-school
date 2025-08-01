"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useRef, useState } from "react";
import UseCourseHooks from "@/hooks/useCourseHooks";

interface CourseSection {
  type: string;
  name?: string;
  values?: CourseMediaItem[];
}

interface Course {
  sections: CourseSection[];
  [key: string]: unknown; 
}

interface CourseMediaItem {
  id: string | number;
  name: string;
  description?: string;
  testimonial?: string;
  profile_image?: string;
  thumb?: string;
  video_url?: string; 
}

export default function Component() {
  const { course} = UseCourseHooks() as { course: Course | null };
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | number | null>(null);

  // Find testimonial section from course.sections
  const courseMediaSection = course?.sections.find(
  (section: CourseSection) => section.type === "testimonials"
)
  const courses: CourseMediaItem[] = courseMediaSection?.values || [];

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

  const handleVideoClick = (courseId: string | number) => {
    setPlayingVideo(courseId);
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
  };

  // Helper: extract YouTube video ID from URL or accept ID directly
  const getYoutubeVideoId = (urlOrId?: string) => {
    if (!urlOrId) return null;

    // If already an ID (no slashes), return it
    if (!urlOrId.includes("/")) return urlOrId;

    // Parse URL to get v param or pathname
    try {
      const url = new URL(urlOrId);
      if (url.searchParams.has("v")) {
        return url.searchParams.get("v");
      }
      // For URLs like youtu.be/VIDEO_ID
      return url.pathname.split("/").filter(Boolean)[0] || null;
    } catch {
      return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{courseMediaSection?.name}</h2>

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
          className="flex lg:gap-6 gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {courses.map((item) => {
            const videoId = getYoutubeVideoId(item.video_url);

            return (
              <Card
                key={item.id}
                className="flex-shrink-0 lg:w-80 w-64 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <div className="relative group">
                  {playingVideo === item.id && videoId ? (
                    <div className="relative w-full h-48 bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={item.name}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      {/*===================== Optionally, add close button ===================*/}
                      <button
                        className="absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-full p-1"
                        onClick={handleCloseVideo}
                        aria-label="Close video"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={item.thumb || "/placeholder.svg"}
                        alt={item.name}
                        width={320}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      {videoId && (
                        <div
                          className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                          onClick={() => handleVideoClick(item.id)}
                        >
                          <div className="bg-white bg-opacity-90 rounded-full p-4 hover:scale-110">
                            <Play className="h-8 w-8 text-gray-800 fill-current" />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Image
                      src={item.profile_image || "/placeholder.svg"}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-10 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-4">{item.testimonial}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
