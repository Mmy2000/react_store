import React, { useEffect, useState } from 'react';
import Style from './CategoriesSlider.module.css';
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function CategoriesSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay:true,
    speed:1000,
  };
  const [categories, setCategories] = useState([]);

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then( ({data})=>{
      setCategories(data.data)
    })
    .catch( (error)=>{

    })
  }
    const [counter, setCounter] = useState(0);
    useEffect(()=>{
      getCategories()
    } , []);
  return (
    <>
      <div className="p-5 mx-5">
        <h2 className="py-4 text-gray-800 font-light text-xl">
          Shop popular Categories
        </h2>
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id}>
              <Link to={`/categories/${category.name}`}>
                <img
                  className="category-image w-full"
                  src={category.image}
                  alt=""
                />
                <h3 className="font-light mt-2">{category.name}</h3>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
