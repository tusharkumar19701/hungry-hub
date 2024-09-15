import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../context/contextApi";
import { addToCart } from "../utils/cartSlice";
import AddToCartBtn from "./AddToCartBtn";

const MenuCardOpt = ({info,resData}) => {
    const {name, price, itemAttribute, ratings:{aggregatedRating: {rating,ratingCountV2}},description,imageId} = info;
    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const dispatch = useDispatch();
    function handleAddToCart() {
      const isAdded = cartData.find((data) => data.id === info.id);
      const getResDataFromLocalStorage = JSON.parse(localStorage.getItem("resData")) || [];
        if(!isAdded) {
          if(getResDataFromLocalStorage.name === resData.name || getResDataFromLocalStorage.length === 0) {
            dispatch(addToCart({info,resData}));
            toast.success("Item added to cart");
            localStorage.setItem("resData",JSON.stringify(resData));
          } else {
            toast.error("Different Restaurant Item");
          }
        } else {
          toast.error("Already added");
        }
    }
  return (
    <div className="mb-2">
      <div className="flex justify-between w-full">
        <div className="w-[60%] lg:w-[75%] max-h-44 lg:max-h-full  overflow-hidden md:w-[70%]">
          <img
            className="w-5 rounded-sm"
            src={
              itemAttribute && itemAttribute.vegClassifier === "VEG"
                ? "https://freesvg.org/img/1531813273.png"
                : "https://freesvg.org/img/1531813245.png"
            }
            alt=""
          />
          <p>{itemAttribute && itemAttribute.vegClassifier}</p>
          <h2 className="font-semibold text-lg">{name}</h2>
          <p className="text-lg font-bold">₹{price / 100}</p>
          <p className="flex items-center gap-1">
            <FaStar />{" "}
            <span>
              {rating} ({ratingCountV2})
            </span>
          </p>
          <p className="text-gray-600 font-base text-sm">{description}</p>
        </div>
        <div className="relative md:w-[20%] w-[40%]">
          <img
            className="md:w-[100%] rounded-xl"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_150,h_150/" +
              imageId
            }
            alt=""
          />
          <AddToCartBtn info={info} resData={resData} />
        </div>
      </div>
      <hr className='my-5 border-[1px] border-slate-200' />
    </div>
  );
};

export default MenuCardOpt;
