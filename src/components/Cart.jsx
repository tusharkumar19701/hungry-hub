import React, { useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/contextApi'
import { clearCart, deleteItem } from '../utils/cartSlice';
import { toggleLogin } from '../utils/toggleSlice';
import CartCard from './CartCard';

const Cart = () => {
    // const {cartData,setCartData} = useContext(CartContext);
    const cartData = useSelector((state) => state.cartSlice.cartItems);
    const resData = useSelector((state) => state.cartSlice.resData);
    const dispatch = useDispatch();
    const userData = useSelector(state => state.authSlice.userData);
    const navigate = useNavigate();
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

    function handleClearCart() {
        dispatch(clearCart());
        toast.success("Cart cleared")
    }

    function handlePlaceOrder() {
        if(!userData) {
            toast.error("Please Log in");
            dispatch(toggleLogin());
            return;

        }
        toast.success("Order Placed");
    }

    let totalPrice = 0;
    for(let i=0;i<cartData.length;i++) {
        totalPrice = totalPrice + cartData[i]?.price /100;
    }

    if(cartData.length <= 0) {
        return (
            <div className='w-screen h-screen'>
                <div className='flex flex-col mt-20 justify-center items-center '>
                    <img className='w-[30%] h-[60%] object-cover' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" />
                    <h1 className='text-sm text-gray-400 mt-4 mb-4'>You can go to home page to view more restaurants</h1>
                    <Link to="/"><button className='bg-orange-400 text-white font-bold px-12 py-2'>See Restaurants near you</button></Link>
                </div>
            </div>
        )
    }
  return (
    <div className='w-full'>
      
        {!resData?.id ? <h1>Loading...</h1> : <Link to={`/restaurant/${resData?.id}`}>
            <div className='flex gap-10 lg:w-[70%] mt-4 w-[90%] md:w-[80%]w-[50%] mx-auto'>
                <img className='w-32 md:w-48 rounded-xl aspect-square object-contain' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_250,h_250/" +resData?.cloudinaryImageId} alt="" />
                <div>
                    <p className='mt-4 font-semibold border-b-2 border-black pb-2 text-lg md:text-3xl'>{resData.name}</p>
                    <p className='text-gray-500 text-md md:text-lg mt-2'>{resData.areaName}</p>
                </div>
                
            </div>
        </Link>}

        <div className='lg:w-[70%] w-[90%] lg:max-h-full md:w-[80%] mx-auto'>
            {
                cartData.map((data,i) => (
                    <CartCard className='border border-black ' data={data} key={i} />
                ))
            }
            
            <h1 className='font-semibold text-lg'>Total - ₹{totalPrice}</h1>
            <div className='flex md:flex-column justify-between mt-8'>
                <button onClick={handlePlaceOrder} className='mt-4 px-10 py-2 bg-green-600 text-white font-bold'>Place Order</button>
                <button onClick={handleClearCart} className='mt-4 px-10 py-2 bg-green-600 text-white font-bold'>Clear Cart</button>
            </div>
        </div>
    </div>
  )
}

export default Cart