import React from 'react'
import { Card, CardContent } from './ui/card';
import { Award, Book, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import bookImg from '../../public/images/book.jpeg';

const FreeItem = () => {
  return (
    <div className='mt-12'>
        <div className="pb-5 ">
            <h2 className="text-2xl font-medium text-gray-900">Free items with this products-</h2>
      </div>
        {/*==================== Free Items ===================*/}
      <Card className="bg-linear-35 from-gray-950 to-red-500 text-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">ঘরে বসে IELTS প্রস্তুতি (Hardcopy Book)</h2>
          <div className="lg:flex md:flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5" />
                <span className="text-sm">Reading Book</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <span className="text-sm">Group Access</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3">
                <Book className="w-5 h-5" />
                <span className="text-sm">Practice Materials</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className=" rounded-lg mt-4 lg:mt-0">
                <Image
                  src={bookImg}
                  alt="Free reading book"
                  width={150}
                  height={80}
                  className="rounded"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FreeItem;