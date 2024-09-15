// import Navbar from "./components/Navbar";
// import Body from "./components/Body";
import { Route, Routes } from "react-router-dom";
// import RestaurantMenu from "./components/RestaurantMenu";
import { Visibility,Coordinates, CartContext } from "./context/contextApi";
import { lazy, Suspense, useEffect, useState } from "react";
// import Cart from "./components/Cart";
import { useSelector } from "react-redux";
import SigninPage from "./components/SigninBtn";
// import Search from "./components/Search";

const Search = lazy(() => import("./components/Search"));
const Cart = lazy(() => import("./components/Cart"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));
const Navbar = lazy(() => import("./components/Navbar"));
const Body = lazy(() => import("./components/Body"));

function App() {
  // const [visible,setVisible] = useState(false);
  const visible = useSelector((state) => state.toggle.searchToggle);
  const [coord,setCoord] = useState({lat: 12.9351929, lng: 77.62448069999999}); 
  const loginVisible = useSelector((state) => state.toggle.loginToggle);
  // const [cartData,setCartData] = useState([]);
  // function get_Data_From_Local_Storage() {
  //   let data = JSON.parse(localStorage.getItem("cartData")) || []
  //   setCartData(data);
  // }

  useEffect(() => {
    // get_Data_From_Local_Storage();
  },[]);

  return (
    // <CartContext.Provider value={{cartData,setCartData}}>
      <Coordinates.Provider value={{coord,setCoord}}>
        {/* <Visibility.Provider value={{visible,setVisible}}> */}
          <div className={visible || loginVisible ? " max-h-screen overflow-hidden " : " "}>
              <Routes>
                <Route path="/" element={
                    <Suspense fallback={<h1>Loading...</h1>}>
                      <Navbar />
                    </Suspense>
                }>
                  <Route path="/" element={
                    <Suspense fallback={<h1>Loading...</h1>}>
                      <Body />
                    </Suspense>
                  }></Route>
                  <Route path="/restaurant/:id" element={
                    <Suspense fallback={<h1>Loading...</h1>}>
                      <RestaurantMenu />
                    </Suspense>
                  }></Route>
                  <Route path="/cart" element={
                    <Suspense fallback={<h1>Loading...</h1>}>
                      <Cart />
                    </Suspense>
                  }></Route>
                  <Route path="/signin" element={<SigninPage />}></Route>
                  <Route path="/search" element={
                    <Suspense fallback={<h1>Loading...</h1>}>
                      <Search />
                    </Suspense>
                  }></Route>
                  <Route path="*" element={<h1>Coming soon.....</h1>}></Route>

                </Route>
              </Routes>
            </div>
          {/* </Visibility.Provider> */}
        </Coordinates.Provider>
      // </CartContext.Provider>
  )
}

export default App
