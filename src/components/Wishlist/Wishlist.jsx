import React, { useContext, useEffect, useState } from 'react';
import Style from './Wishlist.module.css';
import { wishlistContext } from "../../Context/wishlistContext";
import { Link } from 'react-router-dom';
import { CartContext } from "../../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import { RingLoader } from 'react-spinners';


export default function Wishlist() {
    let { addToCart } = useContext(CartContext);
    let { displayWishlist, deleteFromWishlist } = useContext(wishlistContext);
    const [isloading, setisLoading] = useState(false);
    const [currentId, setcurrentId] = useState("");
    const [wishList, setwishList] = useState([]);

    async function getWishlist(){
      let response = await displayWishlist()
      
      
      // console.log(wishList);
      // console.log(response.data.data);
      setwishList(response?.data.data);
      console.log(wishList);
    }
    async function addProductToCart(productId) {
      setisLoading(true);

      let response = await addToCart(productId);
      if (response.data.status === "success") {
        toast.success("Product added successfully to your cart");
        setisLoading(false);
        setcurrentId(currentId);
      } else {
        toast.error("Product Not added ");
        setisLoading(false);
        setcurrentId(currentId);
      }
      

    }
    async function deleteWishlist(productId) {
      setisLoading(true);
      let response = await deleteFromWishlist(productId);
      console.log(response);
      if (response.data.status === "success") {
        setwishList(response?.data.data);
        setisLoading(false);
        toast.success("Product deleted successfully to your wishlist");
      } else {
        setisLoading(false);
        toast.error("Product Not deleted ");
      }
    }
    useEffect(()=>{
      getWishlist()
    } , []);
  return (
    <>
      <>
        {wishList ? (
          <div className="row">
            {wishList.length > 0 ? (
              wishList.map((product) => (
                <div key={product.id} className="w-1/2 sm:w-1/4 xl:w-1/6 py-4">
                  <div className="product py-4 px-4">
                    <Link
                      to={`/productdetails/${product.id}/${product?.category.name}`}
                    >
                      <img
                        className="w-full"
                        src={product.imageCover}
                        alt={product.title}
                      />
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
                    <div className="flex justify-between">
                      <button
                        className="btn w-1/2"
                        onClick={() => addProductToCart(product.id)}
                      >
                        Add to cart
                      </button>
                      <button
                        className="btn2 w-1/4"
                        onClick={() => deleteWishlist(product.id)}
                      >
                        <i className="fa-solid fa-heart fa-xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center w-full flex-col py-16 justify-center">
                <h3 className="text-lg">No Products Found</h3>
                <Link to="/products" className="btn">
                  Go For Shopping
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center w-full justify-center">
            <RingLoader color="green" />
          </div>
        )}
      </>
    </>
  );
}
