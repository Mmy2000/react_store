import React, { useEffect, useState } from 'react';
import Style from './Offline.module.css';


export default function Offline() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
    <h1>Offline</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi eligendi accusantium libero quae sit ex reiciendis eaque voluptatem. Sed architecto, voluptatibus ab nobis praesentium laudantium consequatur assumenda error odio maiores!</p>
  </>
}
