import React, { useContext, useEffect, useState } from "react";
import Style from "./Checkout.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Checkout() {
  let navigate = useNavigate()
  let headers = {
    token: localStorage.getItem("userTaken"),
  };

  let { displayCart ,setcartInfo } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const [isloading, setisLoading] = useState(false);
  async function getCart() {
    let response = await displayCart();
    setCartDetails(response.data);
  }
  function createCashOrder(formValues) {
    setisLoading(true)
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartDetails?.data._id}`,
        formValues,
        {
          headers
        }
      )
      .then((apiResponse) => {
        console.log(apiResponse);
        toast.success("order created successfully");
        setisLoading(false)
        setcartInfo(null)
        navigate('/allorders')
      })
      .catch((apiResponse) => {
        console.log(apiResponse);
        setisLoading(false);
      });
  }
  function createOnlineOrder(formValues) {
    console.log("online");
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartDetails?.data._id}?url=http://localhost:5173`,
        formValues,
        {
          headers,
        }
      )
      .then((apiResponse) => {
        console.log(apiResponse);
        toast.loading('redirct to payment gateway')
        setTimeout( ()=>{
          if (apiResponse?.data.status == "success") {
            window.location.href = apiResponse.data.session.url;
          }
        },3000)
      })
      .catch((apiResponse) => {
        console.log(apiResponse);
      });
  }
  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (formValues)=>{
      if (orderType === "cash") {
        createCashOrder(formValues);
      }else{
        createOnlineOrder(formValues)
      }
    }
  });
  useEffect(()=>{
      getCart()
    } , []);
  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <h2 className="text-2xl font-bold mt-4 text-green-600">
        Shipping Address
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full px-20 mt-4 mx-auto"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.city}
            type="text"
            name="shippingAddress.city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.phone}
            type="tel"
            name="shippingAddress.phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone Number
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <textarea
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.details}
            type="text"
            name="shippingAddress.details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          ></textarea>
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Order Details
          </label>
        </div>
        <button
          onClick={() => {
            setOrderType("cash");
          }}
          type="submit"
          className="btn mr-2"
        >
          {isloading ? (
            <i className="fas fa-spinner fa-spin me-2"></i>
          ) : (
            "Cash Order"
          )}
        </button>
        <button
          onClick={() => {
            setOrderType("online");
          }}
          type="submit"
          className="btn"
        >
          Online Order
        </button>
      </form>
    </>
  );
}
