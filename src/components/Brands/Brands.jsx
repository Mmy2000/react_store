import React, { useEffect, useState } from 'react';
import Style from './Brands.module.css';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { RingLoader } from "react-spinners";
import { Link } from 'react-router-dom';

export default function Brands() {
  function brands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { isPending, isError, error, data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: brands,
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


    // const [brands, setBrands] = useState([]);

    // function getBrands() {
    //   axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    //   .then( ({data})=>{
    //     console.log(data.data);
    //     setBrands(data.data)
    //   })
    //   .catch( ()=>{

    //   })
    // }
    // useEffect(()=>{
    //   getBrands()
    // } , []);
  return (
    <>
      <div className="row">
        {data?.data.data.map((brand) => (
          <div key={brand._id} className="w-1/2 sm:w-1/4 xl:w-1/6 py-4 ">
            <Link to={`/brands/${brand.name}`}>
              <div className="brand relative  mx-4">
                <img className="w-full" src={brand.image} alt="" />
                <div className="cover ">
                  <h3 className="text-xl font-extrabold pt-2">{brand.name}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
