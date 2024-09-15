import React from 'react';
import { useState } from 'react';
import { IoIosArrowRoundBack,IoIosArrowRoundForward } from "react-icons/io";

import RestaurantCard from './RestaurantCard';

const Restaurants = ({data,title}) => {
    const [val,setVal] = useState(0);
    const handleNext = () => {
        val >= 156 ? "" : setVal((prev) => prev + 78);
    }

    const handlePrev = () => {
        val <= 0 ? "" : setVal((prev) => prev - 78);
    }
  return (
    <div className='mt-10 w-full'>
            <div className='px-4 mb-6 flex justify-between'>
                <h2 className='font-bold text-2xl'>{title}</h2>
                <div className='flex gap-4'>
                    <div onClick={handlePrev} className={`cursor-pointer rounded-full flex items-center w-8 m-auto ` + (val <= 0 ? "bg-gray-100": "bg-gray-200")}>
                        <IoIosArrowRoundBack className={`w-6 m-auto h-8 rounded-full ` + (val <= 0 ? "text-gray-400": "text-gray-600")} />
                    </div>
                    <div onClick={handleNext} className={`cursor-pointer rounded-full flex items-center w-8 m-auto ` + (val >= 156 ? "bg-gray-100": "bg-gray-200")}>
                        <IoIosArrowRoundForward className={`w-6 m-auto h-8 rounded-full ` + (val >= 156 ? "text-gray-400": "text-gray-600") } />
                    </div>
                </div>
            </div>
            <div style={{translate: `-${val}%`}} className={`flex duration-1000 gap-5 w-full`}>
                {data?.map((item,i) => (
                    <div key={i} className='cursor-pointer hover:scale-90 duration-300'>
                        <RestaurantCard item={item} />
                    </div>
                ))}
            </div>

            <hr className='mt-10' />
    </div>
  )
}

export default Restaurants;