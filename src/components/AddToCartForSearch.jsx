import React from 'react'
import { addToCart } from '../utils/cartSlice';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

const AddToCartForSearch = ({info,resData}) => {
    const cartData = useSelector((state) => state.cartSlice.cartItems);
    // const getResDataFromLocalStorage = useSelector((state) => state.cartSlice.resData);
    const dispatch = useDispatch();

    function handleAddToCart() {
        const isAdded = cartData.find((data) => data.id === info.id);
        const getResDataFromLocalStorage = JSON.parse(localStorage.getItem("resData")) || [];
          if(!isAdded) {
            if(getResDataFromLocalStorage.name === resData.name || getResDataFromLocalStorage.length === 0) {
                    dispatch(addToCart({info,resData}));
                    toast.success("Item added to cart");
                    localStorage.setItem("resData",JSON.stringify(resData));
            } 
            else {
              toast.error("Different Restaurant Item");
            }
          } else {
            toast.error("Already added");
          }
      }
      return (
        <div>
                <button
                  onClick={handleAddToCart}
                  className="bg-white absolute bottom-0 left-2 lg:bottom-0 lg:left-5 md:bottom-0 md:left-2 border px-10 text-green-600 py-1 drop-shadow rounded-lg text-lg font-bold"
                >
                  Add
                </button>
        </div>
      )
}

export default AddToCartForSearch;