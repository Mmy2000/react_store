import React, { useEffect, useState } from 'react';
import Style from './MainSlider.module.css';
import MainSlide from '../../assets/images/slider-image-3.jpeg'
import MainSlide1 from '../../assets/images/grocery-banner-2.jpeg'
import MainSlide2 from '../../assets/images/grocery-banner.png'
import Slide1 from '../../assets/images/slider-image-1.jpeg'
import Slide2 from '../../assets/images/slider-image-2.jpeg'
import Slider from "react-slick";


export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    speed:1000,
    arrows:false,
  };
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
    <div className="row p-5 mx-5">
      <div className='w-3/4'>
        <Slider {...settings}>
        <img src={MainSlide} className='w-full h-[400px]' alt="" />
        <img src={MainSlide1} className='w-full h-[400px]' alt="" />
        <img src={MainSlide2} className='w-full h-[400px]' alt="" />
        </Slider>
      </div>
      <div className='w-1/4'>
        <img src={Slide1} className='w-full h-[200px]' alt="" />
        <img src={Slide2} className='w-full h-[200px]' alt="" />
      </div>
    </div>
  </>
}
