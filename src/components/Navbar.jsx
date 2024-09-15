import React, { useContext, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { Link, Outlet } from 'react-router-dom';
import { CartContext, Coordinates, Visibility } from '../context/contextApi';
import { IoCloseOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdHelpBuoy } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { toggleLogin, toggleSearchBar } from '../utils/toggleSlice';
import SigninBtn from './SigninBtn';

const Navbar = () => {

  // const {visible,setVisible} = useContext(Visibility);
  const {setCoord} = useContext(Coordinates);
  const [address,setAddress] = useState("");
  // const {cartData} = useContext(CartContext);
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const userData = useSelector(state => state.authSlice.userData);
  const visible = useSelector((state) => state.toggle.searchToggle);
  const loginVisible = useSelector((state) => state.toggle.loginToggle);
  const dispatch = useDispatch(); 

  const [loc,setLoc] = useState("");
  function handleVisibility() {
    dispatch(toggleSearchBar());
  }

  async function searchLocation(val) {
    if(val === "") return;
    const data = await fetch(`${import.meta.env.VITE_BASE_URL}/misc/place-autocomplete?input=${val}`);
    const json = await data.json();
    setLoc(json.data);
  }

  async function fetchLatAndLong(id) {
    
    const data = await fetch(`${import.meta.env.VITE_BASE_URL}/misc/address-recommend?place_id=${id}`);
    const json = await data.json();
    setCoord({
      lat : json.data[0].geometry.location.lat,
      lng : json.data[0].geometry.location.lng
    });
    setAddress(json?.data[0]?.formatted_address)
    handleVisibility();
  }

  function handleLogin() {
    dispatch(toggleLogin());
  }

  return (
    <>
      <div className='w-full'>
        <div className={'w-full h-full z-50 bg-black/50 absolute '+(visible ? " visible " : " invisible")}>
          <div className={'bg-white w-full md:w-[40%] flex justify-end z-40 h-full absolute duration-300 ' + (visible ? " left-0" : " -left-[100%]")}>
            
          <div className='flex cursor-pointer flex-col w-full lg:w-[60%] mr-10 gap-4 mt-3'>
            <IoCloseOutline className='text-4xl' onClick={handleVisibility} />
              <input type="text" placeholder='Enter location' className='border border-gray-400 px-5 py-3 focus:outline-none focus:shadow-lg' onChange={(e) => searchLocation(e.target.value)} />
              <div className='p-5 border'>
                <ul>
                  {loc && loc.map((data,index) => {
                    const isLast = (index === loc.length - 1);
                    return(
                    
                    <div key={index} className='my-5'>
                      <div className='flex gap-4 '>
                        <IoLocationOutline className='mt-2 text-xl' />
                        <li onClick={() => fetchLatAndLong(data?.place_id)} className="text-md">{data?.structured_formatting?.main_text} <p className='text-sm opacity-65'>{data?.structured_formatting?.secondary_text}</p>
                        {!isLast && <p className='text-gray-300'>------------------------------------</p>}
                        </li>
                      </div>
                    </div>
                  )})}
                </ul>
              </div>
          </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <div className={'w-full h-full z-50 bg-black/50 absolute '+(loginVisible ? " visible " : " invisible")}>
          <div className={'bg-white w-full md:w-[60%] lg:w-[40%] flex z-40 h-full fixed duration-300 ' + (loginVisible ? " right-0" : " -right-[100%]")}>
            
          <div className='m-3 cursor-pointer w-full lg:w-[70%]'>
            <IoCloseOutline className='text-4xl' onClick={handleLogin} />
            <div className='my-10 w-full flex justify-between items-center'>
              <h2 className='font-semibold pb-5 border-b-2 border-black text-3xl'>Login</h2>
              <img className='w-20' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
            </div>
            <SigninBtn />
            <p className='text-sm mt-2 text-gray-500'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
          </div>
          </div>
        </div>
      </div>
      <div  className='relative w-full overflow-hidden'>
        <div className='w-full sticky shadow-lg bg-white z-20 h-20 flex justify-between items-center'>
        <div className='flex md:w-[70%] justify-between cursor-pointer items-center w-[90%] m-auto'> 
          <div className='flex items-center'>
            <Link to="/">
              <div className='w-16'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIMhQZ3YpaYOinNFPBeej97sfcA8W7m6ex1A&s" alt="" />
              </div>
            </Link>
            <div className='flex items-center gap-1 cursor-pointer' onClick={handleVisibility}>
              <p className='flex items-center'><span className='font-bold text-sm ml-3 border-b-2 border-black'>Other</span> <span className='ml-2 max-w-[250px] text-sm opacity-60 line-clamp-1'>{address}</span></p>
              <IoIosArrowDown className='text-orange-500 font-bold text-md' />
            </div>
          </div>
          <div className='hidden md:flex justify-center items-center gap-8'>
 
            <Link to="/search">
              <div className='flex gap-2 cursor-pointer items-center'>
                <IoIosSearch className='text-xl visible' />
                <p className=''>Search</p>
              </div>
            </Link>
            <div onClick={handleLogin}>
                <div className='flex gap-2 items-center'>
                  {userData ? <img className='w-10 rounded-full' src={userData.photo} /> : <CiUser className='text-xl' />}
                  {userData? <p>{userData.name}</p> : <p>Sign in</p>}
                </div>
            </div>
            <Link to="/cart">
              <div className='flex gap-2 items-center'>
                <FaCartShopping className='text-xl' />
                <p>Cart <span>{cartData.length > 0 ? cartData.length : ""}</span></p>
              </div>
            </Link>
          </div>
          <div className='flex items-center gap-6 md:hidden'>
            <Link to='/search'>
              <div className='flex gap-2 items-center'>
                <IoIosSearch className='text-xl' />
              </div>
            </Link>
            <Link>
              <div onClick={handleLogin} className="cursor-pointer">
                {userData ? <img className='w-10 rounded-full' src={userData.photo} /> : <CiUser className='text-xl' />}
              </div>
            </Link>
            <Link to='/cart'>
              <div className='flex'>
                <FaCartShopping className='text-xl' />
                <span>{cartData.length > 0 ? cartData.length : ""}</span>
              </div>
            </Link>
          </div>
        </div>

        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Navbar;