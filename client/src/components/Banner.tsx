import Image from "next/image";
import React from "react";
import banner from "/public/row-old-books-brown-shelf-horizontal-background.jpg"; 

const Banner = () => {
 return (
  <div className="w-9/12 mx-auto p-9 relative">
    {/* Text overlay */}
    <div className="absolute top-1/2  right-2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
      <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
        Welcome to BookApp
      </h1>
      <p className="mt-2 text-md md:text-lg text-white drop-shadow-md">
        Explore and discover your favorite books
      </p>
    </div>

    {/* Full-width Banner Image */}
    <Image
      src={banner}
      alt="Banner"
      width={1920}
      height={600}
      priority
      className="w-full h-[12rem] md:h-[18rem] object-cover rounded-md"
    />
  </div>
);

};

export default Banner;
