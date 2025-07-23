import React, { useState,useEffect, useContext } from 'react';
import Cuisine from './Cuisine';
import Restaurants from './Restaurants';
import Food from './Food';
import { Coordinates } from '../context/contextApi';
import { useSelector } from 'react-redux';
import Shimmer from './Shimmer';


const Body = () => {
  const [restaurant,setRestaurants] = useState([]);
  const [cuisine,setCuisine] = useState([]);
  const [resTitle,setResTitle] = useState("");
  const [foodTitle,setFoodTitle] = useState("");
  const [noData,setNoData] = useState({});
  const {coord:{lat,lng}} = useContext(Coordinates);

  async function fetchData() {
    const data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
    const json = await data.json();
    setNoData(json?.data);
    setResTitle(json?.data?.cards.find((data) => data?.card?.card?.id == "top_brands_for_you")?.card?.card?.header?.title);
    setFoodTitle(json?.data?.cards.find((data) => data?.card?.card?.id == "popular_restaurants_title")?.card?.card?.title);
    let mainData = json?.data?.cards.find((data) => data?.card?.card?.id == "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    let mainData2 = json?.data?.cards.find((data) => data?.card?.card?.id == "restaurant_grid_listing_v2")?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setRestaurants(mainData || mainData2);
    let data2 = json?.data?.cards.find((data) => data?.card?.card?.id == "whats_on_your_mind")?.card?.card;
    setCuisine(data2);
}
useEffect(() => {
    fetchData();
},[lat,lng]);

const filterVal = useSelector(state => state.filterSlice.filterVal);
const filteredData = restaurant.filter(item => {
  if(!filterVal) return true;

  switch(filterVal) {
    case "Rating 4.0+" : return item?.info?.avgRating > 4
    case "Rs. 300- Rs. 600" : return item?.info?.costForTwo?.slice(1,4) >= "300" && item?.info?.costForTwo?.slice(1,4) <= "600"
    case "Less than Rs. 300" : return item?.info?.costForTwo?.slice(1,4) < "300"
    case "Offers" :return  item?.info?.aggregatedDiscountInfoV3?.header
  }

});

  if(noData.communication) {
    return (
      <div className='flex h-screen border border-black  justify-center items-center flex-col'>
        <img className='w-72' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
        <h1>Location Unservicable</h1>
      </div>
    )
  }
  return (
    <div className='w-full'>
      {
        restaurant.length ? (      <div className='w-[95%] md:w-[80%] mx-auto overflow-hidden'>
            {
              cuisine ? (
                <>
                  <Cuisine data={cuisine} />
                  <Restaurants data={restaurant} title={resTitle} />
                </>
              ) : ""
            }

            <Food data={filterVal ? filteredData : restaurant} title={foodTitle} />
        </div>) : <Shimmer />
      }
  
    </div>
  )
}

export default Body;
