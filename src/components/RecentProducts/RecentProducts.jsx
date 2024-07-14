import React, { useContext, useEffect, useState } from 'react';
import Style from './RecentProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RingLoader } from 'react-spinners';
import { CartContext } from "../../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import { wishlistContext } from '../../Context/wishlistContext';


export default function RecentProducts() {
  let { addToCart } = useContext(CartContext);
  let { addToWishlist } = useContext(wishlistContext);
  const [isloading, setisLoading] = useState(false);
  const [currentId, setcurrentId] = useState('');

  async function addProductToCart(productId) {
    setisLoading(true)
    setcurrentId(productId);
    
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success("Product added successfully to your cart");
      setisLoading(false)
    } else {
      toast.error("Product Not added ");
      setisLoading(false);
    }
    // console.log(response);
  }
  async function addProductToWishlist(productId){
    let response = await addToWishlist(productId)
    if (response.data.status === "success") {
      toast.success("Product added successfully to your wishlist");
      setisLoading(false);
      
    } else {
      toast.error("Product Not added ");
      setisLoading(false);
    }
  }

  function recent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { isPending, isError,error, data , isLoading} = useQuery({
    queryKey: ["recentProducts"],
    queryFn: recent,
    refetchInterval:3000,
    refetchIntervalInBackground:true
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
    return <>
      <div className="flex items-center w-full justify-center">
        <h3>{error}</h3>
      </div>
      </>
  }
  
  

    // const [recentProducts, setRecentProducts] = useState([]);

    // function getProducts() {
    //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    //   .then( ({data})=>{
    //     setRecentProducts(data.data)
    //     console.log(recentProducts);
    //   })
    //   .catch( (error)=>{

    //   })
    // }
    //   const [counter, setCounter] = useState(0);
    //   useEffect(()=>{
    //     getProducts()
    //   } , []);
    return (
      <>
        <div className="row">
          {data?.data.data.map((product) => (
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
                <div className='flex justify-between '>
                <button className="btn" onClick={()=> addProductToCart(product.id)}>{currentId === product.id && isloading?<i className='fas fa-spinner fa-spin me-2'></i>:'add to cart'}</button>
                <button className="btn2 w-1/4" onClick={()=> addProductToWishlist(product.id)}><i className="fa-solid fa-heart fa-xl"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
