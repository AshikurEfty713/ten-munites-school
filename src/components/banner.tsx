"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import topBannerImg from '../../public/images/topbanner.jpeg';import Link from 'next/link';
import { Star } from 'lucide-react';
;
import UseCourseHooks from '../hooks/useCourseHooks';
import CourseSlider from './courseSlider';
import ScrollPriceCard from './scrollPriceCard';

type Course = {
  title?: string;
  description?: string;
} | null;

const Banner = () => {
  const {course} = UseCourseHooks() as { course: Course | null};
  const [showItem, setShowItem] = useState(true);
  const closeBanner = () => {
    setShowItem(false);
  }

  return (
    <div> 
      {/*======== top banner part start ==========*/}
      {showItem && (
        <div className='cursor-pointer'>
          {course && (
            <div className=' top-0 left-0 right-0 z-50'>
              <div className='flex items-center justify-between bg-white  '>
                <Link href="#" className="flex relative items-center">
                  <Image src={topBannerImg} alt="" className=" w-full h-auto " priority />
                  <button onClick={closeBanner} className="cursor-pointer absolute -top-1 text-2xl right-2 text-white font-bold transition-colors">
                    &times;
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
      {/*========== text banner part start  =========*/}
      <div className='lg:relative flex flex-col lg:flex-row items-center justify-between  mx-auto   gap-5'>
            <div className='lg:absolute lg:right-10 lg:top-10 '>
              <CourseSlider></CourseSlider>
            </div>
            <div className='bg-gradient-to-b w-full to-indigo-950 from-black text-white'>
              <div className=' container mx-auto py-20 px-10 text-left'>
                <h2 className='text-2xl lg:text-4xl  font-medium'>{course?.title}</h2>
                <div className='lg:flex items-center gap-2 mt-4'>
                  <div className='flex gap-1 text-orange-400'><Star/><Star/><Star/><Star/><Star/></div>
                  <span>(82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)</span>
                </div>
                <p className='max-w-2xl mt-3'>{
                    (() => {
                  const match = course?.description?.match(/Get complete([\s\S]*?)country\./);
                  return match ? `Get complete${match[1]}country.` : '';
                })()
                }</p>
            </div>
            </div>
            
      </div>
      <div>
        <ScrollPriceCard></ScrollPriceCard>
      </div>
    </div>
  )
}

export default Banner;