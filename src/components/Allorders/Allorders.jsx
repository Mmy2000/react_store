import React, { useEffect, useState } from 'react';
import Style from './Allorders.module.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';


export default function Allorders() {
  const [orders, setOrders] = useState(null);
  const {id} = jwtDecode(localStorage.getItem("userTaken"));
  console.log(id);
  function getUserOrder(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((apiResponse) => {
        console.log(apiResponse);
        setOrders(apiResponse?.data)
      })
      .catch((apiResponse) => {
        console.log(apiResponse);
      });
  }
  
    const [counter, setCounter] = useState(0);
    useEffect(()=>{
      getUserOrder(id)
    } , []);
  return (
    <>
    <Helmet>
      <title>Orders</title>
    </Helmet>
      {orders ? (
        orders.map((order) => (
          <div className="orders border mt-4 border-gray-400 rounded p-4">
            <div className="flex justify-between">
              <div>
                <h2>Order ID : #{order.id}</h2>
                <h3>Total Price : {order.totalOrderPrice} EGP</h3>
              </div>
              <div>
                {order.isDelivered ? (
                  <span className="btn me-2">delivered</span>
                ) : (
                  <span className="btn me-2">Under delivery</span>
                )}
                {order.isPaid ? (
                  <span className="btn">paid</span>
                ) : (
                  <span className="btn">Unpaid</span>
                )}
              </div>
            </div>
            <div className="grid gap-3 grid-cols-12">
              {order?.cartItems.map((product) => (
                <div className="product shadow p-2 col-span-2">
                  <img
                    src={product.product.imageCover}
                    alt=""
                    className="w-full"
                  />
                  <h3 className="text-lg font-bold text-gray-900 ">
                    {product.product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <span>{product.price}EGP</span>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center w-full justify-center">
          <RingLoader color="green" />
        </div>
      )}
    </>
  );
}
