import React from 'react'

const Shimmer = () => {
  return (
    <div className='w-full'>
        <div className='w-full h-[350px] gap-5 text-white flex justify-center items-center flex-col bg-slate-900 '>
            <div className='relative'>
                <img className='w-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 left-1/2' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
                <span className="loader"></span>
            </div>
            <h1 className='text-2xl'>Looking for great food near you...</h1>
        </div>

        <div className='w-[90%] justify-center items-center mx-auto py-6 flex flex-wrap gap-2'>
            {Array(10).fill("").map((data,i) => 
              (<div key={i} className='flex flex-col gap-3'>
              <div className='w-[315px] h-[210px] animate bg-gray-100 rounded-md'></div>
              <div className='w-[50%] h-3 rounded-lg animate'></div>
              <div className='w-[30%] h-3 rounded-lg animate'></div>
            </div>)
            )}
        </div>

    </div>
  )
}

export default Shimmer;

export function MenuShimmer() {
  return (
    <div className='w-full lg:w-[50%] mx-auto mt-10 '>
      <div className='w-full h-40 sm:h-80 rounded-xl animate '></div>
      <div className='w-full flex mt-10 justify-between'>
        <div className='w-[45%] h-10 rounded-xl animate' ></div>
        <div className='w-[45%] h-10 rounded-xl animate' ></div>
      </div>

      <div className='w-full mt-20 flex flex-col gap-10'>
        {
          Array(10).fill("").map((data,i) => (
            <div key={i} className='w-full h-40 flex justify-between'>
          <div className='w-[60%] flex flex-col gap-5 h-full'>
            <div className='w-[100%] h-5 animate'></div>
            <div className='w-[50%] h-5 animate'></div>
            <div className='w-[30%] h-5 animate'></div>
          </div>
          <div className='w-[30%] rounded-xl h-full animate'></div>
            </div>
          ))
        }
      </div>
    </div>
  )
}