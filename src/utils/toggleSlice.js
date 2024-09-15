import { createSlice } from "@reduxjs/toolkit";


const toggleSlice = createSlice({
    name: "toggleSlice",
    initialState: {
        searchToggle: false,
        loginToggle: false,
        similarResDish: {
            isSimilarResDishes: false,
            city : "",
            resLocation: "",
            resId: "",
            itemId: "",
        }
    },
    reducers: {
        toggleSearchBar: (state,action) => {
            state.searchToggle = !state.searchToggle
        },
        toggleLogin: (state) => {
            state.loginToggle = !state.loginToggle
        },
        setSimilarResDish: (state,action) => {
            state.similarResDish = action.payload
        },
        resetSimilarResDish: (state) => {
            state.similarResDish = {
                isSimilarResDishes: false,
                city : "",
                resLocation: "",
                resId: "",
                itemId: "",
            }
        }
    }
})

export const {toggleSearchBar,toggleLogin,setSimilarResDish,resetSimilarResDish} = toggleSlice.actions;
export default toggleSlice.reducer;