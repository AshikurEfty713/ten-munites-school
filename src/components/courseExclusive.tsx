"use client"

import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import UseCourseHooks from "@/hooks/useCourseHooks"

interface ExclusiveItem {
  title: string
  file_url: string
  checklist?: string[]
}

interface Section {
  type: string
  name?: string
  values?: ExclusiveItem[]
}

interface Course {
  sections?: Section[]
}

export default function CourseExclusive() {
  const { course} = UseCourseHooks() as { course: Course | null}

  const exclusiveSection = course?.sections?.find((section) => section.type === "feature_explanations")
  const exclusiveInfo = exclusiveSection?.values || []

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="pb-1">
        <h2 className="text-2xl font-medium text-gray-900">{exclusiveSection?.name}</h2>
      </div>
      {exclusiveInfo.map((exclusiveItem, id) => (
        <Card key={id} className="border-green-200">
          <CardContent className="p-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h2 className="text-md font-bold text-gray-800 mb-4">{exclusiveItem?.title}</h2>
                {(exclusiveItem?.checklist || []).map((title, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 mt-2" />
                    <p className="text-gray-700 mt-2">{title}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Image
                  src={exclusiveItem.file_url}
                  alt={exclusiveItem.title}
                  width={300}
                  height={200}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
