import { signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {auth, provider} from "../config/firebase";
import { addUserData, removeUserData } from '../utils/authSlice';
import { toggleLogin } from '../utils/toggleSlice';
import { toast } from 'react-hot-toast';

const SigninBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector(state => state.authSlice.userData);

    async function handleAuth() {
        let data = await signInWithRedirect(auth,provider);
        const userData = {
            name: data.user.displayName,
            photo: data.user.photoURL,
        }

        dispatch(addUserData(userData));
        dispatch(toggleLogin());
        toast.success("Aagye khaana order karne!")
        navigate("/");
    }

    async function handleLogout() {
        await signOut(auth);
        dispatch(removeUserData());
        dispatch(toggleLogin());
        toast.success("Logged out!");
    }

  return (
    <div>
        
        

        {userData ? 
            <button onClick={handleLogout} className="bg-[#fc8019] p-3 my-5 text-lg text-white font-semibold w-full">Logout</button> :
            <button onClick={handleAuth} className='bg-[#fc8019] p-3 my-5 text-lg text-white font-semibold w-full'>Login with Google</button>
        }
    </div>
  )
}

export default SigninBtn;