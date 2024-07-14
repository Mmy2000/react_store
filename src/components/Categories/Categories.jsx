import React, { useEffect, useState } from 'react';
import Style from './Categories.module.css';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { RingLoader } from "react-spinners";
import { Link } from 'react-router-dom';


export default function Categories() {
    // const [categories, setCategories] = useState([]);

    // function getCategories() {
    //   axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    //   .then( (({data})=>{
    //     setCategories(data.data)
    //   }))
    //   .catch( ()=>{

    //   })
    // }
    // useEffect(()=>{
    //   getCategories()
    // } , []);
    function categories() {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }
    let { isPending, isError, error, data, isLoading } = useQuery({
      queryKey: ["categories"],
      queryFn: categories,
      refetchInterval: 3000,
      refetchIntervalInBackground: true,
      // staleTime:5000,
      // retry:10
    });
    if (isLoading) {
      return (
        <div className="flex items-center w-full justify-center">
          <RingLoader color="green" />
        </div>
      );
    }
    if (isError) {
      return (
        <>
          <div className="flex items-center w-full justify-center">
            <h3>{error}</h3>
          </div>
        </>
      );
    }
  return (
    <>
      <div className="row">
        {data?.data.data.map((category) => (
          <div key={category.id} className="w-1/2 sm:w-1/4 xl:w-1/6 py-4 ">
            <Link to={`/categories/${category.name}`}>
              <div className="brand relative mx-4 ">
                <img className="w-full h-[300px]" src={category.image} alt="" />
                <div className="cover  ">
                  <h3 className="text-xl font-extrabold pt-2">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
