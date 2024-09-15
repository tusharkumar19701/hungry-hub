import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cartItems : JSON.parse(localStorage.getItem("cartData")) || [],
        resData: JSON.parse(localStorage.getItem("resData")) || [],
    },
    reducers: {
        addToCart: (state,action) => {
            const {info,resData} = action.payload;
            state.cartItems = [...state.cartItems, info];
            state.resData = resData;
            localStorage.setItem("cartData", JSON.stringify(state.cartItems));
            localStorage.setItem("resData",JSON.stringify(state.resData));
        },
        deleteItem: (state,action) => {
            state.cartItems = action.payload;
            localStorage.setItem("cartData",JSON.stringify(action.payload));
            if(state.cartItems.length === 0) {
                state.resData = null;
                localStorage.removeItem("resData");
            }
        },
        clearCart: (state,action) => {
            state.cartItems = [];
            state.resData = [];
            localStorage.removeItem("cartData");
            localStorage.removeItem("resData");
        },
    },
});

export const {addToCart,deleteItem,clearCart} = cartSlice.actions;
export default cartSlice.reducer;