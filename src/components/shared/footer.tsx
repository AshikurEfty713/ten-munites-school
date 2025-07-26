"user client"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import tenMunitesLogo from "../../../public/images/10mslogo.svg";
import appleImg from "../../../public/images/apple.jpeg";
import androidImg from "../../../public/images/android.jpeg";

export default function Component() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-6">
            <div className="flex items-center cursor-pointer space-x-2">
                <Image
                    src={tenMunitesLogo}
                    alt="10 Minutes School Logo"
                    width={40}
                    height={40}
                    className="h-8 w-auto"
                />
               
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Download Our Mobile App</h3>
              <div className="space-y-3">
                <Link href="#" className="block">
                  <Image
                    src={androidImg}
                    alt="Get it on Google Play"
                    width={135}
                    height={40}
                    className="rounded"
                  />
                </Link>
                <Link href="#" className="block">
                  <Image
                    src={appleImg}
                    alt="Download on the App Store"
                    width={135}
                    height={40}
                    className="rounded"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Career / Recruitment
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Join as a Teacher
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Join as an Affiliate
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Refund policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Others</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Book Store
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Free Notes & Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Job Preparation Courses
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Verify Certificate
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Free Download
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Keep up with us at</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600">Call Us: </span>
                <Link href="tel:16910" className="text-green-600 hover:text-green-700">
                  16910
                </Link>
                <span className="text-gray-600"> (24×7)</span>
              </div>

              <div>
                <span className="text-gray-600">whatsapp: </span>
                <Link href="https://wa.me/8801896016252" className="text-green-600 hover:text-green-700">
                  +8801896016252
                </Link>
                <span className="text-gray-600">(24×7)</span>
              </div>

              <div>
                <span className="text-gray-600">Outside Bangladesh: </span>
                <Link href="tel:+88096109169910" className="text-green-600 hover:text-green-700">
                  +880 9610916910
                </Link>
              </div>

              <div>
                <span className="text-gray-600">Email Us: </span>
                <Link href="mailto:support@10minuteschool.com" className="text-green-600 hover:text-green-700">
                  support@10minuteschool.com
                </Link>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Youtube className="w-5 h-5 text-white" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <div className="w-5 h-5 text-white font-bold text-xs flex items-center justify-center">T</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-gray-600 text-sm">
            2015 - 2025 Copyright © 10 Minute School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
