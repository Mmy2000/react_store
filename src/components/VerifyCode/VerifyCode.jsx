import React, { useEffect, useState } from 'react';
import Style from './VerifyCode.module.css';
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function VerifyCode() {
  let navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false);
    function handleVarify(formValues) {
      setisLoading(true);
      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
          formValues
        )
        .then((apiResponse) => {
          console.log(apiResponse);
          if (apiResponse?.data?.status === "Success") {
            setisLoading(false);
            toast.success("Success , Update Your Password");
            navigate("/updatePassword");
          }
        })
        .catch((apiResponse) => {
          setisLoading(false);
          console.log(apiResponse);
        });
    console.log(formValues);
    
  }
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: handleVarify,
  });
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
  <div className="py-8 max-w-xl mx-auto">
      <h2 className='text-3xl mb-6 font-bold text-center text-green-600'>Verify Reset Code</h2>
    <form onSubmit={formik.handleSubmit}  >
  
  
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} name="resetCode" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your resetCode :</label>
  </div>
  <button  type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoading?<i className='fas fa-spinner fa-spin me-2'></i>:'Submit'}
      
      </button>
  </form>
    </div>
  </>
}
