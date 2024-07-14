import React, { useContext, useEffect, useState } from 'react';
import Style from './ProductDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { RingLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";



export default function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settings2 = {
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay:true,
    speed:1000,
  };
  let {id , category} = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  function getProductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then( ({data})=>{
      setProductDetails(data.data)
      // console.log(data.data.images);
    })
    .catch( ()=>{

    })}
    // function details(id) {
      
    //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      
    // }
    // let { isPending, isError, error, data, isLoading } = useQuery({
    //   queryKey: ["productDetails"],
    //   queryFn: ()=>{
    //     details(id)
    //   },
    //   // refetchInterval: 3000,
    //   // refetchIntervalInBackground: true,
    //   // staleTime:5000,
    //   // retry:10
    // });
    // console.log(data);
    // console.log(error);
    // console.log(isPending);
    let { addToCart } = useContext(CartContext);
    const [isloading, setisLoading] = useState(false);
    const [currentId, setcurrentId] = useState("");

    async function addProductToCart(productId) {
      setisLoading(true)
      setcurrentId(productId)
      let response = await addToCart(productId);
      if (response.data.status === "success") {
        toast.success("Product added successfully to your cart");
        setisLoading(false)
      } else {
        toast.error("Product Not added ");
        setisLoading(false)
      }
      // console.log(response);
    }
  
  function getRelatedProducts(category) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then( ({data})=>{
      let allProducts = data.data
      let related = allProducts.filter( (product)=> product.category.name == category)
      setRelatedProducts(related)

    })
    .catch( ()=>{

    })
  }
    
    useEffect(()=>{
      getProductDetails(id)
      getRelatedProducts(category)
    } , [id,category]);
  return (
    <>
      <Helmet>
        <title>{productDetails?.title}</title>
      </Helmet>
      {productDetails ? (
        <div className="row px-5 mx-5">
          <div className="w-full  md:w-1/4 ">
            <Slider {...settings}>
              {productDetails?.images.map((src) => (
                <img
                  key={id}
                  className="w-full "
                  src={src}
                  alt={productDetails?.title}
                />
              ))}
            </Slider>
          </div>
          <div className="w-full md:w-3/4 p-6">
            <h1 className="text-lg font-normal text-slate-900 ">
              {productDetails?.title}
            </h1>
            <p className="font-light mt-4 text-gray-700">
              {productDetails?.description}
            </p>
            <div className="flex items-center mt-4 w-full justify-between">
              <span className="mb-2">{productDetails?.price} EGP</span>
              <span>
                {productDetails?.ratingsAverage}{" "}
                <i className="fas fa-star text-yellow-500"></i>
              </span>
            </div>
            <button
              className="btn"
              onClick={() => addProductToCart(productDetails.id)}
            >
              {currentId === productDetails.id && isloading ? (
                <i className="fas fa-spinner fa-spin me-2"></i>
              ) : (
                "add to cart"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center w-full justify-center">
          <RingLoader color="green" />
        </div>
      )}

      <div className="row px-5 mx-5">
        <h1 className="text-center text-lg w-full  font-semibold ">
          Related Products
        </h1>
        <div className="w-full">
          <Slider {...settings2}>
            {relatedProducts?.map((product) => (
              <div key={product.id} className="w-1/2 sm:w-1/4 xl:w-1/6 py-4">
                <div className="product py-4 px-4">
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <img className="w-full" src={product.imageCover} />
                    <span className="block font-light text-green-600">
                      {product.category.name}
                    </span>
                    <h3 className="text-lg font-normal text-gray-900 mb-4">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span>{product.price} EGP</span>
                      <span>
                        {product.ratingsAverage}{" "}
                        <i className="fas fa-star text-yellow-500"></i>
                      </span>
                    </div>
                  </Link>
                  <button
                    className="btn"
                    onClick={() => addProductToCart(product.id)}
                  >
                    {currentId === product.id && isloading ? (
                      <i className="fas fa-spinner fa-spin me-2"></i>
                    ) : (
                      "add to cart"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
