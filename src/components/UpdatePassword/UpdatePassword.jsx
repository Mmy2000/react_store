import React, { useContext, useEffect, useState } from 'react';
import Style from './UpdatePassword.module.css';
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";

export default function UpdatePassword() {
  let navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false);
  let { setUserLogin } = useContext(UserContext);
  function handleUpdate(formValues) {
    setisLoading(true);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        formValues
      )
      .then((apiResponse) => {
        console.log(apiResponse);
        if (apiResponse?.status === 200 ) {
          localStorage.setItem("userTaken", apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          setisLoading(false);
          toast.success("Password updated successfully");
          navigate("/");
          console.log(apiResponse);
        }
      })
      .catch((apiResponse) => {
        setisLoading(false);
        console.log(apiResponse);
      });
    console.log(formValues);
  }
  let yupValidation = Yup.object().shape({
    newPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start with uppercase ..")
      .required("Password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: yupValidation,
    onSubmit: handleUpdate,
  });
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
    <div className="py-8 max-w-xl mx-auto">
      <h2 className='text-3xl mb-6 font-bold text-center text-green-600'>Reset Your Password</h2>
    <form onSubmit={formik.handleSubmit}  >
  
  
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address :</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} name="newPassword" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New Password :</label>
  </div>
  {formik.errors.newPassword && formik.touched.newPassword?<div class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 font-medium dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.newPassword}
</div>:null}
  <button  type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoading?<i className='fas fa-spinner fa-spin me-2'></i>:'Submit'}
      
      </button>
  </form>
    </div>
  </>
}
