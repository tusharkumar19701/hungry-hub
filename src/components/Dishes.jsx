import React from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { nonVeg, veg } from "../utils/links";
import { setSimilarResDish } from "../utils/toggleSlice";
import AddToCartForSearch from "./AddToCartForSearch";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Dishes = ({
  data: { info, restaurant: {info: resInfo},hideRestaurantDetails = false},
  
}) => {
  const dispatch = useDispatch();
  let { imageId = "", name, price, isVeg = 0 ,id:itemId} = info;
  let { id, name: resName, avgRating, sla, slugs: {city,restaurant: resLocation}} = resInfo;

  const { id: cartResId} = useSelector((state) => state.cartSlice.resData);

  function handleSameRes() {
    if (cartResId === resInfo.id || !cartResId) {
      dispatch(setSimilarResDish({
        isSimilarResDishes: true,
        city: city,
        resLocation: resLocation,
        resId: id,
        itemId ,
    }));
    }
  }

  return (
    <div className="bg-white rounded-2xl p-4 m-4">
      {!hideRestaurantDetails && (
        <>
          <Link to={`/restaurant/${resLocation}-${id}`}>
            <div className="flex justify-between text-sm opacity-50">
              <div className="">
                <p className="font-bold">By {resInfo?.name}</p>
                <p className="my-2 flex items-center gap-1">
                  <FaStar /> {resInfo?.avgRating} .{" "}
                  {resInfo?.sla?.slaString}{" "}
                </p>
              </div>
              <IoIosArrowRoundForward />
            </div>
          </Link>
          <hr className="border-dotted" />
        </>
      )}

      <div className="my-3 max-w-full flex items-center justify-between">
        <div className="w-[50%]">
          <div className="w-5 h-5">
            {isVeg ? <img src={veg} alt="" /> : <img src={nonVeg} />}
          </div>
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-lg font-semibold">₹ {price / 100}</p>
          <button className="px-4 py-1 rounded-3xl border w-max">
            More Details
          </button>
        </div>
        <div className="md:w-[50%] w-[40%] relative">
          <img
            className="rounded-xl"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_150,h_150/" +
              imageId
            }
            alt=""
          />
          <div onClick={handleSameRes}>
            <AddToCartForSearch info={info} resData={resInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dishes;
