"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import UseCourseHooks from "@/hooks/useCourseHooks"

interface CourseValue {
  id: string
  title?: string
  description?: string
}

interface CourseSection {
  type: string
  values: CourseValue[]
}

interface Course {
  sections?: CourseSection[]
}

function stripHtmlTags(html: string): string {
  if (!html) return ""

  const withoutTags = html.replace(/<[^>]*>/g, "")
  const decoded = withoutTags
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")

  return decoded.replace(/\s+/g, " ").trim()
}

function formatListItems(html: string): string {
  if (!html) return ""

  let formatted = html.replace(/<li[^>]*>/g, "• ")
  formatted = formatted.replace(/<\/li>/g, "")

  const stripped = stripHtmlTags(formatted)
  const items = stripped.split("•").filter((item) => item.trim())

  return items.map((item) => `• ${item.trim()}`).join("\n")
}

export default function CourseDetailsCard() {
  const { course, loading, error } = UseCourseHooks() as {
    course: Course | null
    loading: boolean
    error: string | null
  }

  const courseDetailSection = course?.sections?.find(
    (section) => section.type === "about"
  )
  const courseDetails = courseDetailSection?.values || []

  const [showAll, setShowAll] = useState(false)
  const detailsInfo = showAll ? courseDetails : courseDetails.slice(0, 3)

  if (loading) {
    return (
      <div className="mt-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-12">
        <div className="text-red-600 p-4 bg-red-50 rounded-lg">
          Error loading course details: {error}
        </div>
      </div>
    )
  }

  if (!courseDetails.length) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Course Details
        </h2>
        <div className="text-gray-500 p-4 bg-gray-50 rounded-lg">
          No course details available.
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        Course Details
      </h2>
      <Accordion
        type="single"
        collapsible
        className="space-y-2 border p-4 bg-white rounded-lg shadow-sm"
      >
        {detailsInfo.map((item) => {
          const cleanTitle = stripHtmlTags(item?.title || "")
          const cleanDescription = item?.description?.includes("<li>")
            ? formatListItems(item.description)
            : stripHtmlTags(item?.description || "")

          return (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b border-dashed rounded-none border-gray-200 px-4"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4 cursor-pointer">
                <span className="text-sm font-medium text-gray-700 pr-4">
                  {cleanTitle}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {cleanDescription}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      {!showAll && courseDetails.length > 3 && (
        <div className="-mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => setShowAll(true)}
            className="text-sm text-gray-600 rounded-full bg-gray-50 p-4 cursor-pointer shadow-lg hover:text-gray-900"
          >
            See all
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}

      {showAll && (
        <div className="-mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => setShowAll(false)}
            className="text-sm text-gray-600 rounded-full bg-gray-50 p-4 shadow-lg cursor-pointer hover:text-gray-900"
          >
            Show less
            <ChevronDown className="ml-1 h-4 w-4 rotate-180" />
          </Button>
        </div>
      )}
    </div>
  )
}
