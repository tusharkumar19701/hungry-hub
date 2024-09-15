import React, { useContext, useEffect, useState } from "react";
import { Coordinates } from "../context/contextApi";
import Dishes from "./Dishes";
import SearchRest from "./SearchRest";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { resetSimilarResDish } from "../utils/toggleSlice";
import { Link } from "react-router-dom";

const Search = () => {
  const filterOptions = ["Restaurant", "Dishes"];
  const [activeBtn, setActive] = useState("Dishes");
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState([]);
  const [selectedResDish, setSelectedResDish] = useState(null);
  const [similarResDishes, setSimilarResDishes] = useState([]);
  const {isSimilarResDishes,city,resLocation,resId,itemId} = useSelector(
    (state) => state.toggle.similarResDish
  );

  const [restaurantData, setRestaurantData] = useState([]);
  const {
    coord: { lat, lng },
  } = useContext(Coordinates);
  function handleBtn(filterName) {
    setActive(activeBtn === filterName ? activeBtn : filterName);
  }

  function handleSearch(e) {
    let val = e.target.value;
    if (e.keyCode === 13) {
      setSearch(val);
      setSelectedResDish(null);
      setDishes([]);
    }
  }
  async function fetchSimilarResDishes() {
    let pathname = `/city/${city}/${resLocation}`;
    let encodedPath = encodeURIComponent(pathname);
    const data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${search}&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${search}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`
    );
    let res = await data.json();
    setSelectedResDish(res?.data?.cards.find((data) => data?.card?.card?.["@type"].includes("swiggy.presentation.food.v2.Dish")));
    setSimilarResDishes(res?.data?.cards.find((data) => data?.card?.card?.["@type"].includes("swiggy.gandalf.widgets.v2.Collection"))?.card?.card?.cards);
    dispatch(resetSimilarResDish());
  }

  async function fetchDishes() {
    const data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${search}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`
    );
    let res = await data.json();
    const finalData = res?.data?.cards.find(
      (card) => card?.groupedCard?.cardGroupMap?.DISH?.cards
    );
    if (finalData)
      setDishes(
        finalData?.groupedCard?.cardGroupMap?.DISH?.cards.filter(
          (data) => data?.card?.card?.info
        )
      );
    else setDishes([]);
  }
  async function fetchRestaurantData() {
    const data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${search}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`
    );
    let res = await data.json();
    const finalData = res?.data?.cards.find(
      (card) => card?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
    );
    if (finalData)
      setRestaurantData(
        finalData?.groupedCard?.cardGroupMap?.RESTAURANT?.cards.filter(
          (data) => data?.card?.card?.info
        )
      );
    else setRestaurantData([]);
  }

  useEffect(() => {
    if (isSimilarResDishes) {
      fetchSimilarResDishes();
    }
  }, [isSimilarResDishes]);

  useEffect(() => {
    if (search === "") {
      return;
    }
    // setSearch("");
    fetchDishes();
    fetchRestaurantData();
  }, [search]);

  return (
    <div className="w-full md:w-[800px] mx-auto md:p-0 p-8">
      <div className="w-full relative mt-6">
        <Link to='/'><MdOutlineKeyboardArrowLeft className="absolute top-1/2 -translate-y-1/2 ml-2 text-4xl " /></Link>
        <input
          onKeyDown={handleSearch}
          type="text"
          className="border-2 w-full pl-10 py-3 focus:outline-none"
          placeholder="Search for restaurant or food"
        />
        <FaSearch className="absolute top-1/2 -translate-y-1/2 right-0 mr-5 text-xl" />
      </div>
      {!selectedResDish && (
        <div className="my-7 flex flex-wrap gap-3">
          {filterOptions.map((filterName,i) => (
            <button key={i}
              onClick={() => handleBtn(filterName)}
              className={
                "btn flex items-center gap-2 " +
                (activeBtn === filterName ? "active" : "")
              }
            >
              <p>{filterName}</p>
            </button>
          ))}
        </div>
      )}

      <div className="md:w-[800px] mt-5 w-full grid grid-cols-1 md:grid-cols-2 bg-[#f4f5f7]">
        {selectedResDish
          ?
          <>
            <div>
              <p className="p-4 ">Item added to cart</p>
              <Dishes data={selectedResDish.card.card} />
              <p className="p-4">More dishes from this restaurant</p>
            </div>
            <br />
            {
              similarResDishes.map((data,i) => <Dishes key={i} data={{...data.card, restaurant: selectedResDish.card.card.restaurant}} /> )
            }
          </>
          : activeBtn === "Dishes"
          ? dishes.map((data,i) => <Dishes key={i} data={data.card.card} />)
          : restaurantData.map((data,i) => <SearchRest key={i} data={data} />)}
      </div>
    </div>
  );
};

export default Search;
