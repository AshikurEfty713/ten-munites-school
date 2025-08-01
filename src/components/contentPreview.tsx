"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  Play,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Types
type Lesson = {
  id: string
  title: string
  type: "video" | "content"
  completed: boolean
}

type Section = {
  id: string
  title: string
  isOpen: boolean
  lessons: Lesson[]
}

export default function ContentPreview() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "introduction",
      title: "Introduction",
      isOpen: true,
      lessons: [
        {
          id: "1",
          title: "Video: IELTS Introduction",
          type: "video",
          completed: true,
        },
        {
          id: "2",
          title: "Video: IELTS Overview",
          type: "video",
          completed: true,
        },
        {
          id: "3",
          title: "Video: How to Prepare for IELTS?",
          type: "video",
          completed: true,
        },
        {
          id: "4",
          title: "Video: Making a Daily Routine",
          type: "video",
          completed: true,
        },
        {
          id: "5",
          title: "Video: Direct and Sentence Structure to Improve Writing",
          type: "video",
          completed: false,
        },
        {
          id: "6",
          title: "IELTS General Facts",
          type: "content",
          completed: false,
        },
        {
          id: "7",
          title: "IELTS Vocabulary",
          type: "content",
          completed: false,
        },
      ],
    },
    {
      id: "course-support",
      title: "IELTS Course by Munzareen Shahid | Exclusive Support Group",
      isOpen: false,
      lessons: [],
    },
    {
      id: "academic-reading",
      title: "Academic Reading",
      isOpen: false,
      lessons: [],
    },
    {
      id: "academic-reading-mock",
      title: "Academic Reading Mock Test",
      isOpen: false,
      lessons: [],
    },
    {
      id: "listening",
      title: "Listening",
      isOpen: false,
      lessons: [],
    },
  ])

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    )
  }

  return (
    <div className="w-full bg-white border-gray-200 mt-12">
      <div className="pb-5">
        <h2 className="text-2xl font-medium text-gray-900">Content preview</h2>
      </div>

      <div className="divide-y divide-gray-100 rounded-lg shadow-sm">
        {sections.map((section) => (
          <Collapsible
            key={section.id}
            open={section.isOpen}
            onOpenChange={() => toggleSection(section.id)}
          >
            <CollapsibleTrigger asChild>
              <button
                className="w-full justify-between p-4 h-auto text-left font-normal hover:bg-gray-50"
              >
                <span className="text-sm text-gray-900">{section.title}</span>
                {section.isOpen ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="px-4 pb-2">
              <div className="space-y-2">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 py-2 px-2 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      {lesson.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm ${
                          lesson.completed ? "text-gray-900" : "text-gray-600"
                        }`}
                      >
                        {lesson.title}
                      </p>
                    </div>

                    {lesson.type === "video" && (
                      <div className="flex-shrink-0">
                        <Play className="h-3 w-3 text-gray-400" />
                      </div>
                    )}

                    {lesson.completed && (
                      <div className="flex-shrink-0">
                        <span className="text-xs text-green-600 font-medium">
                          Free
                        </span>
                      </div>
                    )}
                  </div>
                ))}

                {section.id === "listening" &&
                  section.lessons.length === 0 && (
                    <div className="py-2 px-2">
                      <p className="text-sm text-gray-500">Free</p>
                    </div>
                  )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}
