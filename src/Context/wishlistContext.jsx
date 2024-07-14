import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishlistContext = createContext()

export default function WishlistContextProvider(props) {
  const [wishCount, setwishCount] = useState(null);

    let headers = {
      token: localStorage.getItem("userTaken"),
    }
    function displayWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
            headers
        })
        .then( (response)=> {
          setwishCount(response.data.data.length);
          return response;
        })
        .catch( (error)=> error)}

    function addToWishlist(productId) {
      return axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then( (response)=> {
        setwishCount(response.data.data.length);
        return response
      })
      .catch( (error)=> error)
    }
    function deleteFromWishlist(productId) {
      return axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        
        { headers }
      )
      .then( (response)=> {
         setwishCount(response.data.data.length);
         return response;
      })
      .catch( (error)=> error)
    }
    

    return (
      <wishlistContext.Provider value={{ displayWishlist,wishCount, addToWishlist,deleteFromWishlist }}>
        {props.children}
      </wishlistContext.Provider>
    );
}