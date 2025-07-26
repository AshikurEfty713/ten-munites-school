"use client";

import { useState } from "react";
import { Check, ChevronDown, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: "item-1",
    question: "How do I start after purchasing the course?",
    answer:
      "After purchasing the course, you will receive an email with your login credentials and access instructions. Simply log into your account and navigate to the course dashboard to begin your learning journey.",
  },
  {
    id: "item-2",
    question:
      "Where should I contact for any technical issues (forgot password, change password, course refund, etc.)?",
    answer:
      "For any technical issues including password recovery, account changes, or refund requests, please contact our support team at support@example.com or use the contact form in your account dashboard. Our team typically responds within 24 hours.",
  },
  {
    id: "item-3",
    question: "Is this course designed for Academic or General IELTS?",
    answer:
      "This course is designed to cover both Academic and General IELTS formats. The curriculum includes modules specific to each test type, allowing you to focus on the version that matches your goals and requirements.",
  },
  {
    id: "item-4",
    question: "What are the benefits of studying online with you instead of enrolling offline elsewhere?",
    answer:
      "Our online platform offers flexible scheduling, personalized learning paths, interactive practice tests, one-on-one tutoring sessions, and access to a comprehensive resource library. You can study at your own pace from anywhere, with 24/7 access to materials and progress tracking.",
  },
  {
    id: "item-5",
    question: "Are live classes available?",
    answer:
      "Yes, we offer live interactive classes conducted by certified IELTS instructors. These sessions include speaking practice, writing workshops, and Q&A sessions. Live classes are scheduled multiple times per week to accommodate different time zones.",
  },
  {
    id: "item-6",
    question: "How long do I have access to the course materials?",
    answer:
      "You have lifetime access to all course materials, including any future updates and additional resources we add to the curriculum.",
  },
  {
    id: "item-7",
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee. If you're not satisfied with the course within the first 30 days, you can request a full refund through our support team.",
  },
  {
    id: "item-8",
    question: "Do you provide certificates upon completion?",
    answer:
      "Yes, upon successful completion of the course and passing the final assessment, you will receive a certificate of completion that you can download and print.",
  },
];

export default function Faq() {
  const [showAll, setShowAll] = useState<boolean>(false);
  const displayedFaqs = showAll ? faqData : faqData.slice(0, 5);

  return (
    <div>
      <div className="mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Course details</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">ইউটিউবেট সংস্করণ (ওয়াইফাই বা মোবাইল ইন্টারনেট)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">স্মার্টফোন অথবা পিসি</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment process</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700">
                কীভাবে পেমেন্ট করবেন তা বিস্তারিত জানতে{" "}
                <Link href="#" className="text-green-600 underline hover:text-green-700 transition-colors">
                  এই ভিডিওটি দেখুন
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 ">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="space-y-2 border-1 p-4 bg-white rounded-lg shadow-sm">
          {displayedFaqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-b border-dashed rounded-none border-gray-200 px-4">
              <AccordionTrigger className="text-left hover:no-underline py-4 cursor-pointer">
                <span className="text-sm font-medium text-gray-700 pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {!showAll && faqData.length > 5 && (
          <div className="-mt-6 text-center ">
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

      <div className="mt-12 lg:w-96 ">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">আরও কোন জিজ্ঞাসা আছে?</h2>
        <Card className="bg-gray-50 border-gray-200 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <a href="tel:16910" className="flex items-start gap-3 cursor-pointer">
                <Phone className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">কল করুন 16910 নম্বরে</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
