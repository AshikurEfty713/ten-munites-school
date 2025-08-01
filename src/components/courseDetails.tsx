"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ContentPreview from "./contentPreview"
import StudentOpinion from "./studentOpinion"
import CourseExclusive from "./courseExclusive"
import FreeItem from "./freeItem"
import Faq from "./faq"
import Image from "next/image"
import CourseDetailsCard from "./courseDetailsCard"
import UseCourseHooks from "@/hooks/useCourseHooks"
import iltsImg from "../../public/images/IltsImg.jpg"

// Type definitions
interface Tab {
  id: string
  label: string
}

interface InstructorInfo {
  image?: string
  name?: string
  description?: string
}

interface FeatureInfo {
  icon?: string
  title?: string
  subtitle?: string
}

interface LearnInfo {
  text?: string
}

interface SectionValue {
  image?: string
  name?: string
  description?: string
  icon?: string
  title?: string
  subtitle?: string
  text?: string
}

interface CourseSection {
  type: string
  name?: string
  values?: SectionValue[]
}

interface Course {
  sections?: CourseSection[]
}

interface UseCourseHooksReturn {
  course: Course | null
  loading: boolean
  error: unknown
}

const tabs: Tab[] = [
  { id: "instructor", label: "Course instructor" },
  { id: "layout", label: "How the course is laid out" },
  { id: "learn", label: "What you will learn by doing the course" },
  { id: "course", label: "Course Details" },
  { id: "exclusive", label: "Course Exclusive Feature" },
  { id: "free", label: "Free items with this product" },
  { id: "opinion", label: "Students opinion" },
  { id: "faq", label: "Frequently Ask Questions" },
]

export default function CourseDetails() {
  const { course} = UseCourseHooks() as UseCourseHooksReturn
  const [activeTab, setActiveTab] = useState<string>("instructor")
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const navMenuRef = useRef<HTMLDivElement | null>(null)

  const scrollToSection = (tabId: string): void => {
    const section = sectionRefs.current[tabId]
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }

  const handleTabClick = (tabId: string, index: number): void => {
    setActiveTab(tabId)
    setCurrentTabIndex(index)
    scrollToSection(tabId)
  }

  const handleArrowClick = (direction: "prev" | "next"): void => {
    const navMenu = navMenuRef.current
    if (navMenu) {
      const scrollAmount = 200
      const currentScroll = navMenu.scrollLeft
      if (direction === "prev") {
        navMenu.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: "smooth",
        })
      } else {
        navMenu.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        })
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tabId = entry.target.getAttribute("data-section")
            if (tabId) {
              const tabIndex = tabs.findIndex((tab) => tab.id === tabId)
              if (tabIndex !== -1) {
                setActiveTab(tabId)
                setCurrentTabIndex(tabIndex)
              }
            }
          }
        })
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // instructor info found
  const instructorSection: CourseSection | undefined = course?.sections?.find(
    (section: CourseSection) => section.type === "instructors"
  )
  const instructorInfo: InstructorInfo | undefined = instructorSection?.values?.[0]

  // How the course is laid out feature found
  const featuresSection: CourseSection | undefined = course?.sections?.find((section: CourseSection) => section.type === "features")
  const featuresInfo: FeatureInfo[] = (featuresSection?.values || []) as FeatureInfo[]

  // What you will learn by doing the course section data found
  const learnSection: CourseSection | undefined = course?.sections?.find((section: CourseSection) => section.type === "pointers")
  const learnInfo: LearnInfo[] = (learnSection?.values || []) as LearnInfo[]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      <div className="lg:max-w-4xl max-w-fit lg:mx-auto lg:p-4">
        <div className="sticky top-16 z-50 flex items-center justify-between mb-8 bg-white border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleArrowClick("prev")}
            className="rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div ref={navMenuRef} className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-1 px-4  lg:min-w-max">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id, index)}
                  className={`px-4 py-3 cursor-pointer text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "text-green-600 border-green-600"
                      : "text-gray-600 border-transparent hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleArrowClick("next")}
            className="rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-12">
          {/*============= Course Instructor Section =============*/}
          <section
            ref={(el) => { sectionRefs.current.instructor = el }}
            data-section="instructor"
            className="scroll-mt-8"
          >
            <h2 className="text-2xl font-bold mb-6">{instructorSection?.name}</h2>
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={instructorInfo?.image || "/placeholder.svg"} alt="Munzereen Shahid" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{instructorInfo?.name}</h3>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                       <p className="lg:w-60">
                          {instructorInfo?.description
                            ? instructorInfo.description.replace(/<[^>]+>/g, "")
                            : ""}
                        </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/*============= How the course is laid out Section ===============*/}
          <section ref={(el) => { sectionRefs.current.layout = el }} data-section="layout" className="scroll-mt-8">
            <h2 className="text-2xl font-bold mb-6">How the course is laid out</h2>
            <div className="bg-slate-800 rounded-lg px-6 py-12">
              <div className="grid md:grid-cols-2 gap-8">
                {featuresInfo.map((feature, id) => (
                  <div key={id} className="flex items-start space-x-3">
                    <div className="w-16 rounded-full">
                      <Image src={feature?.icon || "/placeholder.svg"} width={400} height={400} alt="Feature icon" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">{feature?.title}</h3>
                      <p className="text-gray-300 text-sm">{feature?.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="scroll-mt-8">
            <div className="w-full max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-b from-black via-gray-900 to-purple-950 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="flex-1 text-white space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-orange-500 rounded-lg p-2">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-orange-400 font-semibold text-lg">Free PDF</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      IELTS Confirm 7+ Score
                      <br />
                      <span className="text-xl md:text-2xl">(Guideline)</span>
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base">
                      IELTS ভাল score করার সেরা Strategies
                      <br />
                      আর পদ্ধতি জানুন বিস্তারিত !
                    </p>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                      size="lg"
                    >
                      <Download className="w-5 h-5" />
                      PDF Download করুন
                    </Button>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Image
                        src={iltsImg || "/placeholder.svg"}
                        alt="IELTS success students with their scores"
                        width={400}
                        height={300}
                        className="rounded-lg border-2 border-gray-700"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-purple-900/20 pointer-events-none" />
              </div>
            </div>
          </section>

          {/*============= What you will learn by doing the course Section ===============*/}
          <section ref={(el) => { sectionRefs.current.learn = el }} data-section="learn" className="scroll-mt-8">
            <h2 className="text-2xl font-bold mb-6">What you will learn by doing the course</h2>
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {learnInfo.map((learnItem, id) => (
                    <div key={id} className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2"></span>
                      <p className="text-gray-700">{learnItem?.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <section>
          <ContentPreview />
        </section>

        <section ref={(el) => { sectionRefs.current.course = el }} data-section="course" className="mt-12">
          <CourseDetailsCard />
        </section>

        <section ref={(el) => { sectionRefs.current.exclusive = el }} data-section="exclusive" className="mt-12">
          <CourseExclusive />
        </section>

        <section ref={(el) => { sectionRefs.current.free = el }} data-section="free">
          <FreeItem />
        </section>

        <section ref={(el) => { sectionRefs.current.opinion = el }} data-section="opinion">
          <StudentOpinion />
        </section>

        <section ref={(el) => { sectionRefs.current.faq = el }} data-section="faq">
          <Faq />
        </section>
      </div>

      {/* <section className="absolute right-0 col-span-1 md:col-span-2">
        <CourseSlider />
      </section> */}
    </div>
  )
}
