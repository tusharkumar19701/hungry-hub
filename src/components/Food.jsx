import React, { useState } from 'react'
import RestaurantCard from './RestaurantCard';
import { IoIosClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setFilterVal } from '../utils/filterSlice';

const Food = ({data,title}) => {

  const filterOptions = [
    {
      filterName: "Rating 4.0+",
    },
    {
      filterName: "Rs. 300- Rs. 600",
    },
    {
      filterName: "Offers",
    },
    {
      filterName: "Less than Rs. 300",
    }
  ];

  const dispatch = useDispatch();

  const [active,setActive] = useState(null);
  function handleBtn(filterName) {
    setActive(active === filterName ? null : filterName)
  }
  dispatch(setFilterVal(active));


  return (
    <div className=' mt-12'>
        <h2 className='font-bold text-2xl'>{title}</h2>
        <div className='my-7 flex flex-wrap gap-3'>
          {
            filterOptions.map((data,i) => (
              <button key={i} onClick={() => handleBtn(data.filterName)} className={"btn flex items-center gap-2 "+(active === data.filterName ? "active": "")}>
                <p>{data.filterName}</p>
                <span className='hidden'><IoIosClose className='text-2xl' /></span>
              </button>
            ))
          }
        </div>
        <div className='flex flex-wrap justify-center gap-7 mt-6'>
            {data?.map((item,i) => (
                <div key={i} className='cursor-pointer hover:scale-90 duration-300'>
                    <RestaurantCard item={item} key={item?.info?.id} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Food;