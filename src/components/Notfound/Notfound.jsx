import React, { useEffect, useState } from 'react';
import Style from './Notfound.module.css';
import { Link } from 'react-router-dom';


export default function Notfound() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="btn">
          Go to Home
        </Link>
      </div>
    </>
  );
}
