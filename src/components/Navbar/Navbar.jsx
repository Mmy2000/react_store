import React, { useContext, useEffect, useState } from 'react';
import Style from './Navbar.module.css';
import logo from '../../assets/images/logo.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { wishlistContext } from "../../Context/wishlistContext";



export default function Navbar() {
    const [counter, setCounter] = useState(0);
    const [cartDetails, setCartDetails] = useState([]);
    let { displayWishlist, wishCount } = useContext(wishlistContext);
    let { displayCart,cartInfo, deleteCartItem , updateCartItem } = useContext(CartContext);
    let navigate = useNavigate()
    let {userLogin , setUserLogin} = useContext(UserContext)

    async function getCart() {
      let response = await displayCart();

      setCartDetails(response.data);
    }
    async function getWishlist() {
      let response = await displayWishlist();

      // console.log(wishList);
      // console.log(response.data.data);
    }
   

    function LogOut() {
      localStorage.removeItem('userTaken')
      setUserLogin(null)
      navigate('/login')
    }

    useEffect(()=>{
        getCart();
        getWishlist()

    } , []);
  return (
    <>
      <nav className="bg-gray-100 text-center shadow-xl px-10  xl:fixed top-0 left-0 right-0 z-50">
        <div className="container items-center flex flex-col lg:flex-row justify-between mx-auto py-2">
          <div className="flex flex-col lg:flex-row text-center ">
            <img src={logo} width={120} alt="fresh cart logo " />
            <ul className="flex flex-col lg:flex-row justify-around m-0 ">
              {userLogin !== null ? (
                <>
                  <li className="text-md mx-2 py-1 text-slate-900 font-normal ">
                    <NavLink to={"/"}> Home </NavLink>
                  </li>
                  <li className="text-md mx-2 py-1 text-slate-900 font-normal ">
                    <NavLink to={"/products"}> Products </NavLink>
                  </li>

                  <li className="text-md mx-2 py-1 text-slate-900 font-normal ">
                    <NavLink to={"/categories"}> Categories </NavLink>
                  </li>
                  <li className="text-md mx-2 py-1 text-slate-900 font-normal ">
                    <NavLink to={"/brands"}> Brands </NavLink>
                  </li>
                  <li className="text-md mx-2 py-1 text-slate-900 font-normal ">
                    <NavLink to={"/allorders"}> Orders </NavLink>
                  </li>
                  <li className="text-md mx-2 py-1 text-slate-900 font-normal ">
                    <NavLink to={"/about"}> About </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>

          <ul className="flex flex-col lg:flex-row justify-around m-0 ">
            {userLogin == null ? (
              <>
                <li className="text-md mx-2 py-1 text-slate-900 font-normal ">
                  <NavLink to={"/login"}> Login </NavLink>
                </li>
                <li className="text-md mx-2 py-1 text-slate-900 font-normal ">
                  <NavLink to={"/register"}> Register </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="text-md mx-2  bg-gray-200 px-3 rounded py-2 text-slate-900 font-normal ">
                  <NavLink to={"/cart"}>
                    <i className="fa-solid fa-cart-shopping fa-fw fa-xl"></i>{" "}
                    <span>{cartInfo?.numOfCartItems || 0}</span>{" "}
                  </NavLink>
                </li>
                <li className="text-md mx-2  bg-gray-200 px-3 rounded py-2 text-slate-900 font-normal ">
                  <NavLink to={"/wishlist"}>
                    <i className="fa-solid fa-heart fa-fw fa-xl"></i>{" "}
                    <span>{wishCount}</span>{" "}
                  </NavLink>
                </li>
                <li
                  onClick={LogOut}
                  className="text-md mx-2 py-1 text-slate-900 font-normal cursor-pointer "
                >
                  <span> Logout </span>
                </li>
              </>
            )}

            <li className="text-md mx-2 py-1 text-slate-900 font-normal mt-2 lg:mt-0  items-center flex justify-between ">
              <i className="fab fa-facebook mx-2 fa-sm"></i>
              <i className="fab fa-twitter mx-2 fa-sm"></i>
              <i className="fab fa-instagram mx-2 fa-sm"></i>
              <i className="fab fa-tiktok mx-2 fa-sm"></i>
              <i className="fab fa-youtube mx-2 fa-sm"></i>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
