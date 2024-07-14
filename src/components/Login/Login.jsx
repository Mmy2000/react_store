import React, { useContext, useEffect, useState } from 'react';
import Style from './Login.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'
import {  Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';



export default function Login() {
  let navigate = useNavigate();
  let {setUserLogin} = useContext(UserContext)


  const [apiError, setapiError] = useState('');
  const [isLoading, setisLoading] = useState(false);
  async function handleLogin(formValues) {
  
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , formValues)
    .then( (apiResponse)=>{
      if (apiResponse?.data?.message === 'success') {
        localStorage.setItem('userTaken' , apiResponse.data.token)
        setUserLogin(apiResponse.data.token)
        setisLoading(false)
      navigate('/')
      console.log(apiResponse);
      }
    })
    .catch( (apiResponse)=>{
      setapiError(apiResponse?.response?.data?.message)
      setisLoading(false)
    })
    console.log(formValues);
  }
  let yupValidation = Yup.object().shape({
    email : Yup.string().email('Email is invalid').required('Email is required'),
    password : Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , 'Password must start with uppercase ..').required('Password is required'),
  })

  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:yupValidation,
    onSubmit:handleLogin
  })



  
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="py-8 max-w-xl mx-auto">
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}
        <h2 className="text-3xl mb-6 font-bold text-center text-green-600">
          Login now
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email address :
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 font-medium dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Password :
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 font-medium dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
          <span className="font-semibold ">
            <Link
              className="text-green-800  hover:text-green-700"
              to={"/forgot"}
            >
              Forgot Password?
            </Link>
          </span>
          <div className="flex text-center mt-2 items-center">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin me-2"></i>
              ) : (
                "Login"
              )}
            </button>
            <p className="pl-4">
              didn't have account yet ?{" "}
              <span className="font-semibold">
                <Link
                  className="text-green-800 hover:text-green-700"
                  to={"/register"}
                >
                  Register now
                </Link>
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
