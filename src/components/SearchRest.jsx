import React from 'react'
import { FaStar } from 'react-icons/fa';

const SearchRest = ({data: {card: {card:{info:{id,cloudinaryImageId,aggregatedDiscountInfoV3 = {}, cuisines,promoted= false, costForTwoMessage, name:resName,avgRating,sla:{slaRating}}}}}}) => {
  return (
    <div className='bg-white m-4 p-4 flex gap-5 items-center md:max-w-fit'>
      <div className='w-[30%]'>
        <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`} className="aspect-square rounded-lg" alt="" />
      </div>
      <div className='w-[70%]'>
        <p className='font-bold line-clamp-1'>{resName}</p>
        <p className='my-1 flex items-center gap-1 font-semibold text-gray-500 text-sm'> <FaStar /> {avgRating} . {costForTwoMessage}</p>
        <p className='line-clamp-1 font-normal text-sm text-gray-500'>{cuisines.join(", ")}</p>
      </div>
    </div>
  )
}

export default SearchRest;