import React from 'react';
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import { IoIosArrowRoundBack,IoIosArrowRoundForward } from "react-icons/io";
import { useState } from 'react';

const Cuisine = ({data}) => {
    const [val,setVal] = useState(0);

    const handleNext = () => {
        val >= 156 ? "" : setVal((prev) => prev + 78);
    }

    const handlePrev = () => {
        val <= 0 ? "" : setVal((prev) => prev - 78);
    }
  return (
    <div>
        <div className='mt-4 px-4 mb-4 flex justify-between'>
                <h2 className='font-bold text-2xl'>{data?.header?.title}</h2>
                <div className='flex gap-4'>
                    <div onClick={handlePrev} className={`cursor-pointer rounded-full flex items-center w-8 m-auto ` + (val <= 0 ? "bg-gray-100": "bg-gray-200")}>
                        <IoIosArrowRoundBack className={`w-6 m-auto h-8 rounded-full ` + (val <= 0 ? "text-gray-400": "text-gray-600")} />
                    </div>
                    <div onClick={handleNext} className={`cursor-pointer rounded-full flex items-center w-8 m-auto ` + (val >= 156 ? "bg-gray-100": "bg-gray-200")}>
                        <IoIosArrowRoundForward className={`w-6 m-auto h-8 rounded-full ` + (val >= 156 ? "text-gray-400": "text-gray-600") } />
                    </div>
                </div>
            </div>
            <div style={{translate: `-${val}%`}} className={`flex duration-1000`}>
                {data?.imageGridCards?.info.map((item) => (
                    <img className='w-36' key={item?.id} src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.imageId}`} />
                ))}
            </div>

            <hr className='mt-10' />
    </div>
  )
}

export default Cuisine;