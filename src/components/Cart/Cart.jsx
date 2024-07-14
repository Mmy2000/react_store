 import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { ToastContainer, toast } from "react-toastify";
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
    
    const [cartDetails, setCartDetails] = useState(null);
    const [isloading, setisloading] = useState(false);
    const [currentId, setcurrentId] = useState("");
    let { displayCart,cartInfo,setcartInfo, deleteCartItem , updateCartItem } = useContext(CartContext);

    async function getCart(){
      let response = await displayCart()
      setCartDetails(response.data);
      console.log(cartInfo);
    }

    async function updateCartQuantity(productId , count){
      setcurrentId(productId)
      if (count < 1) {
        return
      }
      
      let response = await updateCartItem(productId, count);
      setCartDetails(response.data);
      setcartInfo(response.data)
      toast.success("Cart Item updated successfully");
    }
    
    async function deleteItem(productId) {
      setisloading(true)
      setcurrentId(productId);
      let response = await deleteCartItem(productId)
      setCartDetails(response.data);
      setcartInfo(response.data);
      toast.success("Cart Item deleted successfully");
      setisloading(false)
    }

    useEffect(()=>{
      getCart()
    } , []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartDetails ? (
        cartDetails.data.products.length > 0 ? (
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-75 my-5 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.data.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>

                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>{product.count}</div>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>

                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteItem(product.product.id)}
                        className="font-medium text-white cursor-pointer py-2 px-2 rounded bg-red-600"
                      >
                        {currentId === product.product.id && isloading ? (
                          <i className="fas fa-spinner fa-spin me-2"></i>
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/checkout">
              <button className="btn mt-4">Checkout</button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center w-full flex-col  py-16 justify-center">
            <h3 className="text-lg">No cart items</h3>
            <Link to="/products" className="btn">
              Go For Shopping
            </Link>
          </div>
        )
      ) : (
        <div className="flex items-center w-full justify-center">
          <RingLoader color="green" />
        </div>
      )}
    </>
  );
}
