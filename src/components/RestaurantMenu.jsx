import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { MdStars } from "react-icons/md";
import { IoBicycleOutline } from "react-icons/io5";
import { IoIosArrowRoundBack,IoIosArrowRoundForward } from "react-icons/io";
import { Coordinates } from '../context/contextApi';
import { useContext } from 'react';
import Discount from './Discount';
import { IoIosSearch } from "react-icons/io";
import MenuCard from './MenuCard';
import { MenuShimmer } from './Shimmer';

const RestaurantMenu = () => {
    let {id} = useParams();
    const mainId = id.split("-").at(-1);
    let numbers = mainId.replace(/\D/g, '');
    const [menu,setMenu] = useState("");
    const [resData,setResData] = useState("");
    const [discount,setDiscount] = useState([]);
    const [menuData,setMenuData] = useState([]);
    const [val2,setVal2] = useState(0);
    const [pick,setPick] = useState(null);
    const [val,setVal] = useState(0);
    const {coord:{lat,lng}} = useContext(Coordinates);

    const fetchMenuData = async() => {
      try {
        const data = await fetch(`${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${numbers}&catalog_qa=undefined&submitAction=ENTER`)
        const json = await data.json();
        setMenu(json);
        const m = json?.data?.cards.find(data => 
          data?.card?.card?.["@type"].includes("swiggy.presentation.food.v2.Restaurant"))?.card?.card?.info;
        setResData(m);
        const n = json?.data?.cards.find(data => data?.card?.card?.["@type"].includes("swiggy.gandalf.widgets.v2.GridWidget"))?.card?.card?.gridElements?.infoWithStyle?.offers;
        setDiscount(n);
        const regularMenu = json?.data?.cards.find(card => card?.groupedCard?.cardGroupMap?.REGULAR);
        const topPick = json?.data?.cards.find(card => card?.groupedCard?.cardGroupMap?.REGULAR);
        if (regularMenu) {
            setMenuData(regularMenu.groupedCard.cardGroupMap.REGULAR.cards);
        } else {
            setMenuData([]);
        }
        if(topPick) {
          setPick((topPick.groupedCard.cardGroupMap.REGULAR.cards).filter(data => data.card.card.title === "Top Picks")[0]);
        } else {
          setPick(null);
        }

      } catch(err) {
        console.log("ERROR");
      }
    }
    const handleNext = () => {
      val >= 156 ? "" : setVal((prev) => prev + 78);
  }
  const handleNext2 = () => {
    val2 >= 156 ? "" : setVal2((prev) => prev + 78);
}

  const handlePrev = () => {
      val <= 0 ? "" : setVal((prev) => prev - 78);
  }
  const handlePrev2 = () => {
    val2 <= 0 ? "" : setVal2((prev) => prev - 78);
}

    useEffect(() => {
        fetchMenuData();
    },[lat,lng]);
  return (
    <div className='w-full'>
    {
      resData ? (
        <div>
        <div className='w-[95%] md:w-[800px] pt-8 mx-auto'>
        <p className=' mt-6 text-xs text-gray-500'><Link to={"/"} >Home </Link>/ {resData?.city} / <Link to={"/"}><span className='text-gray-700'>{resData?.name}</span></Link></p>
        <h2 className='mt-8 p-1 font-bold text-2xl'>{resData?.name}</h2> 
        <div className='w-full h-[200px] bg-gradient-to-t from-slate-200/100 px-4 pb-4 mt-3 rounded-[30px]'>
          <div className='w-full border border-slate-200/100 rounded-[30px] h-full bg-white'>
            <div className='w-full p-4'>
              <div className='flex items-center gap-1 font-semibold'>
                <MdStars className='text-xl text-green-600 ' />
                <p>{resData?.avgRating}</p>
                <p>({resData?.totalRatingsString}) <span className='text-gray-400'>•</span></p>
                <p>{resData?.costForTwoMessage}</p>
              </div>
              <p className='p-1 text-orange-600 text-sm font-semibold underline'>{resData?.cuisines}</p>
              <div className='flex gap-2'>
                <div className='w-[9px] flex flex-col justify-center items-center '>
                  <div className='w-[7px] h-[7px] bg-gray-500 rounded-full'></div>
                  <div className='w-[1px] h-[20px] bg-gray-500' ></div>
                  <div className='w-[7px] h-[7px] bg-gray-500 rounded-full'></div>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-xs font-semibold'>Outlet <span className='text-gray-500 font-normal text-xs'>{resData?.locality}</span></p> 
                  <p className='text-sm'>{resData?.sla?.slaString}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className='px-6 py-4 flex items-center gap-2'>
              <IoBicycleOutline className='text-xl text-gray-600' />
              {resData?.feeDetails?.message ? <p className='text-sm text-gray-600'>{resData?.feeDetails?.message.replace(/<[^>]*>/g, "")}</p> : ""}
            </div>
          </div>
        </div>
      </div>
          <div className='w-[95%]  md:w-[800px] mx-auto overflow-hidden'>
            <div className='mt-4 mb-4 flex justify-between'>
                <h2 className='font-bold text-xl'>Deals for you</h2>
                <div className='flex gap-4'>
                    <div onClick={handlePrev} className={`cursor-pointer rounded-full flex items-center w-8 m-auto ` + (val <= 0 ? "bg-gray-100": "bg-gray-200")}>
                        <IoIosArrowRoundBack className={`w-6 m-auto h-8 rounded-full ` + (val <= 0 ? "text-gray-400": "text-gray-600")} />
                    </div>
                    <div onClick={handleNext} className={`cursor-pointer rounded-full flex items-center w-8 m-auto ` + (val >= 156 ? "bg-gray-100": "bg-gray-200")}>
                        <IoIosArrowRoundForward className={`w-6 m-auto h-8 rounded-full ` + (val >= 156 ? "text-gray-400": "text-gray-600") } />
                    </div>
                </div>
            </div>
            <div style={{translate: `-${val}%`}} className={`flex duration-1000 gap-3`}>
                {discount && discount.map((item) => (
                    <Discount item={item} key={item?.info?.offerIds[0]} />
                ))}
            </div>
            

        </div>
        <div className='w-[95%] md:w-[800px] mx-auto'>
        <h2 className='text-center mt-5 leading-5 text-sm text-gray-500'>MENU</h2>
          <Link to='/search'>
            <div className='w-full mt-5 relative cursor-pointer'>
                <div className='w-full p-3 rounded-xl bg-slate-200 font-semibold text-md text-gray-500 text-center'>Search for dishes</div>
                <IoIosSearch className='absolute top-3 text-2xl right-4' />
            </div>
          </Link>
        </div>
        {/* <div className='flex items-center justify-center mx-auto w-[95%] md:w-[800px] overflow-hidden'>
        {
              pick && 
              <div className='w-full mx-auto overflow-hidden'>
            <div className='mt-4 mb-4 flex justify-between'>
                <h2 className='font-bold text-xl'>Top Picks</h2>
                <div className='flex gap-4'>
                    <div onClick={handlePrev} className={`cursor-pointer rounded-full flex items-center w-8 m-auto ` + (val <= 0 ? "bg-gray-100": "bg-gray-200")}>
                        <IoIosArrowRoundBack className={`w-6 m-auto h-8 rounded-full ` + (val <= 0 ? "text-gray-400": "text-gray-600")} />
                    </div>
                    <div onClick={handleNext} className={`cursor-pointer rounded-full flex items-center w-8 m-auto ` + (val >= 156 ? "bg-gray-100": "bg-gray-200")}>
                        <IoIosArrowRoundForward className={`w-6 m-auto h-8 rounded-full ` + (val >= 156 ? "text-gray-400": "text-gray-600") } />
                    </div>
                </div>
            </div>
            <div style={{translate: `-${val}%`}} className={`flex justify-between duration-1000 gap-3`}>
                {pick.card.card.carousel.map(({creativeId, dish: {info: {price}}}) => (
                    <div className='relative'>
                      <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/"+creativeId} alt="" />
                      <div className='w-full flex justify-between items-center absolute bottom-4 px-5 text-white'>
                        <p className=''>₹{price/100}</p>
                        <button className='px-6 py-2 text-green-600 bg-white rounded-lg font-bold'>ADD</button>
                      </div>
                    </div>
                ))}
            </div>
            

        </div>
            }
        </div> */}
            <div className='w-[95%] md:w-[800px] mx-auto'>
              {menuData.length > 0 ? menuData.filter((data) => data?.card?.card?.categories || data.card.card.itemCards).map(({card:{card}}, index) => (
                    <MenuCard card={card} key={index} resData={resData} />
                    )) : "No menu data available"}
            </div>
        </div>
      ) : <MenuShimmer />
    }

    </div>
  )
}

export default RestaurantMenu;