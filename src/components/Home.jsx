import React, { act, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { topRatedMovies } from "../constants"; // Adjust the path to reach constants.js

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsLength = topRatedMovies.length;

  const handleSlideChange = (event) => {
    let newIndex = event.item;
    if (newIndex < 0) {
      newIndex = itemsLength - 1;
    }
    else if (newIndex >= itemsLength) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  const getOpacityAndScale = (index) => {
    if (index === activeIndex) {
      return "opacity-100 z-20 scale-105";
    } else if (
      index === (activeIndex + 1) % itemsLength ||
      index === (activeIndex - 1 + itemsLength) % itemsLength
    ) {
      return "opacity-50 z-15 scale-60";
    } else if (
      index === (activeIndex + 2) % itemsLength ||
      index === (activeIndex - 2 + itemsLength) % itemsLength
    ) {
      return "opacity-25 z-10 scale-50";
    } else {
      return "opacity-5 z-5 scale-50";
    }
  };

  const items = topRatedMovies.map((movie, index) => (
    <div
      key={movie.imdbID}
      className={`carousel-item relative p-2 rounded-lg overflow-hidden transition-transform transform  ${getOpacityAndScale(
        index
      )}`}
      style={{
        width: "calc(150%)",
        height: "400px",
        marginLeft: index !== activeIndex ? "-50px" : "0", // Overlapping effect
      }}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full object-cover rounded-3xl h-full"
      />
    </div>
  ));

  return (
    <div className="p-4">
      <div className="carousel-container mx-auto max-w-lg relative">
        <h1 className="text-5xl text-gray-700 font-bold mt-4">Movies</h1>
        <h2 className="text-xl text-gray-500 font-medium mt-8 mb-5">Popular</h2>
        <AliceCarousel
          infinite
          items={items}
          responsive={{
            0: { items: 1 },
            768: { items: 3 },
            1024: { items: 3 },
          }}
          controlsStrategy="alternate"
          onSlideChanged={handleSlideChange} // Track active slide
          disableDotsControls
          // disableButtonsControls
        />
      </div>
    </div>
  );
}

export default Home;
