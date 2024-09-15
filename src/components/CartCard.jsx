import React from 'react';
import { useSelector } from 'react-redux';
import { clearCart, deleteItem } from '../utils/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';



const CartCard = ({data,i}) => {
    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const dispatch = useDispatch();
    function handleClearCart() {
        dispatch(clearCart());
        toast.success("Cart cleared")
    }
    function handleRemoveFromCart(i) {
        if(cartData.length > 1) {
            let newArr = [...cartData];
            newArr.splice(i,1);
            dispatch(deleteItem(newArr));
            toast.success("Item removed from cart");
        } else {
            localStorage.clear();
            handleClearCart();
        }
    }
  return (
        <div className=' flex w--[100%] pr-10 max-h-44 overflow-hidden justify-between my-5 p-2 border-b-2 pb-5'>
            <div className='w-[70%]'>
                <h2 className='w-[70%] font-semibold text-md'>{data?.name}</h2>
                <p className='mt-2 font-semibold text-md'>₹{data?.price /100}</p>
                <p className='font-normal text-gray-600 mt-2 text-sm line-clamp-2'>{data?.description}</p>
            </div>
            <div className='md:w-[24%] w-[40%] relative h-full'>
                <img className='rounded-xl aspect-square object-contain' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_150,h_150/" +data?.imageId} alt="" />
                <button onClick={() => handleRemoveFromCart(i)} className="bg-white absolute  bottom-0 left-0 border px-8 sm:px-10 text-red-600 py-1 drop-shadow rounded-lg text-md md:text-lg font-bold">Remove</button>
            </div>
        </div>
  )
}

export default CartCard;