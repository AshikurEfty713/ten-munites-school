"use client"

import { useState } from "react"
import { Search, Phone, ChevronDown, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import tenMunitesLogo from "../../../public/images/10mslogo.svg"
import Image from "next/image"

interface NavigationItem {
  title: string
  items: string[]
}

const navigationItems: NavigationItem[] = [
  {
    title: "Class 6-12",
    items: ["Class Six", "Class Seven", "Class Eignt", "Class Nine", "Class Ten", "Class Eleven", "Class Twelve"],
  },
  {
    title: "Skills",
    items: ["Web Development", "Graphic Design", "Digital Marketing", "Language Learning", "Business Skills"],
  },
  {
    title: "Admission Test",
    items: ["University Admission", "Medical Admission", "Engineering Admission", "BCS Preparation"],
  },
  {
    title: "Online Batch",
    items: ["Live Class", "Recorded Class", "Practice Test", "Assignment"],
  },
  {
    title: "English Center",
    items: ["Spoken English", "IELTS", "TOEFL", "GRE"],
  },
]

export default function NavigationHeader() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null)

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
    setExpandedMobileItem(null)
  }

  const toggleMobileItem = (title: string) => {
    setExpandedMobileItem((prev) => (prev === title ? null : title))
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[999]">
      {/*============= Main menu part start ========== */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center cursor-pointer">
              <Image
                src={tenMunitesLogo}
                alt="10 Minutes School Logo"
                width={40}
                height={40}
                className="h-8 w-20 lg:w-auto"
              />
            </div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="কিসের কোর্স, কিংবা স্কুল প্রোগ্রাম খুঁজে বের করুন"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-3xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <nav className="hidden xl:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div
                key={item?.title}
                className="relative"
                onMouseEnter={() => setHoveredItem(item?.title)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button className="flex items-center cursor-pointer px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors whitespace-nowrap">
                  {item?.title}
                  <ChevronDown className="ml-1 w-3 h-3 xl:w-4 xl:h-4" />
                </button>
                {hoveredItem === item?.title && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                    {item?.items?.map((subItem, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center text-sm text-gray-600">
              <span className="font-medium">EN</span>
            </div>

            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-600" />
              <span className="font-medium text-green-600">16910</span>
            </div>

            <button className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-md font-medium text-xs sm:text-sm">
              Log In
            </button>

            <button
              onClick={toggleMobileMenu}
              className="xl:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden pb-3 sm:pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="কিসের কোর্স, কিংবা স্কুল প্রোগ্রাম খুঁজে বের করুন"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {/*========== Mobile Dropdown Menu ==========*/}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <nav className="py-4">
              {navigationItems.map((item) => (
                <div key={item.title} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => toggleMobileItem(item.title)}
                    className="flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {item.title}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedMobileItem === item.title ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedMobileItem === item.title && (
                    <div className="bg-gray-50">
                      {item.items.map((subItem, index) => (
                        <a
                          key={index}
                          href="#"
                          className="block px-8 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
