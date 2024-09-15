import React from "react";
import { MdStars } from "react-icons/md";
import { Link } from "react-router-dom";

const RestaurantCard = ({item}) => {
  return (
    <Link to={`/restaurant/${item?.cta?.link.split("/").slice(-1)}`}>
      <div className="w-[315px]">
      <div className="min-w-[265px] h-[210px] relative ">
        <img
          className="min-w-full aspect-video h-full object-cover rounded-2xl "
          key={item?.info?.id}
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.info?.cloudinaryImageId}`}
        />
        <div className=" absolute w-full h-full rounded-2xl bg-gradient-to-t from-black from-1% to-transparent to-40% top-0 "></div>
        <div className="flex absolute bottom-0 text-white text-2xl ml-2 mb-1 font-bold gap-1">
          <p>
            {item?.info?.aggregatedDiscountInfoV3?.header
              ? item?.info?.aggregatedDiscountInfoV3?.header
              : "" + " "}
          </p>
          <p>
            {" "}
            {" " + item?.info?.aggregatedDiscountInfoV3?.subHeader
              ? item?.info?.aggregatedDiscountInfoV3?.subHeader
              : ""}
          </p>
        </div>
      </div>
      <div className="p-3">
        <p className="text-lg text-gray-800 font-bold">{item?.info?.name}</p>
        <div className="flex gap-1">
          <p className="flex font-semibold items-center">
            <MdStars className="text-green-600 text-2xl" />{" "}
            {item?.info?.avgRatingString + " • "}
          </p>
          <span className="font-semibold">{item?.info?.sla?.slaString}</span>
        </div>
        <div className="text-gray-500 line-clamp-1">
          {item?.info?.cuisines.join(", ")}
        </div>
        <p className="text-gray-500">{item?.info?.areaName}</p>
      </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
