import React, { useContext, useEffect, useState } from 'react';
import Style from './ChangePassword.module.css';
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";


export default function ChangePassword() {
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();
  let { setUserLogin } = useContext(UserContext);
  let headers = {
    token: localStorage.getItem("userTaken"),
  };
  function handleChange(formValues) {
    setisLoading(true);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        formValues
        , {
            headers:headers
        }
      )
      .then((apiResponse) => {
        console.log(apiResponse);
        if (apiResponse?.data?.message === "success") {
          localStorage.setItem("userTaken", apiResponse.data.token);
          setUserLogin(apiResponse.data.token);
          setisLoading(false);
          toast.success("Password updated successfully");
          navigate("/");
          console.log(apiResponse);
        }
      })
      .catch((apiResponse) => {
        console.log(apiResponse);
        setisLoading(false);
      });
    console.log(formValues);
  }
  let yupValidation = Yup.object().shape({
    currentPassword : Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'Password must start with uppercase ..').required('Password is required'),
    password : Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'Password must start with uppercase ..').required('Password is required'),
    rePassword : Yup.string().oneOf([Yup.ref('password')] , "dont't match").required('Repassword is required'),
  })
  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    // validate:myValidation,
    validationSchema: yupValidation,
    onSubmit: handleChange,
  });
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
    <div className="py-8 max-w-xl mx-auto">
      <h2 className='text-3xl mb-6 font-bold text-center text-green-600'>Change Password</h2>
    <form onSubmit={formik.handleSubmit} >
      <div className="relative z-0 w-full mb-5 group">
      <input type="currentPassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.currentPassword} name="currentPassword" id="currentPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="currentPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Current Password :</label>
  </div>
  {formik.errors.currentPassword && formik.touched.currentPassword?<div class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 font-medium dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.currentPassword}
</div>:null}
      <div className="relative z-0 w-full mb-5 group">
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New Password :</label>
  </div>
  {formik.errors.password && formik.touched.password?<div class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 font-medium dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.password}
</div>:null}
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repeat Your Password :</label>
  </div>
  {formik.errors.rePassword && formik.touched.rePassword?<div class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 font-medium dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.rePassword}
</div>:null}
  <button  type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      {isLoading?<i className='fas fa-spinner fa-spin me-2'></i>:'Submit'}
      
      </button>
    </form>
    </div>
  </>
}
