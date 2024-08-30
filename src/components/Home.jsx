import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { topRatedMovies } from "../constants";
import { useNavigate } from "react-router-dom";

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsLength = topRatedMovies.length;
  const navigate = useNavigate(); 

  const handleSlideChange = (event) => {
    let newIndex = event.item;
    if (newIndex < 0) {
      newIndex = itemsLength - 1;
    } else if (newIndex >= itemsLength) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  const handleItemClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
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

  const carouselItems = topRatedMovies.map((movie, index) => (
    <div
      key={movie.imdbID}
      className={`carousel-item relative p-2 rounded-lg overflow-hidden transition-transform transform  ${getOpacityAndScale(
        index
      )}`}
      style={{
        width: "calc(150%)",
        height: "400px",
        marginLeft: index === activeIndex ? "0" : "-100px"
      }}
      onClick={() => handleItemClick(movie.imdbID)}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full object-cover rounded-3xl h-full hover:cursor-pointer"
      />
      <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-black bg-opacity-50 text-white py-1 px-3 rounded-full">
        <i className="fas fa-star text-yellow-400"></i> 
        <span className="text-lg font-semibold">{movie.imdbRating}</span>
      </div>
    </div>
  ));

  const gridItems = topRatedMovies.map((movie) => (
    <div
      key={movie.imdbID}
      className="p-2 rounded-lg overflow-hidden shadow-xl shadow-indigo-500/50 transition-transform transform hover:scale-105"
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-72 object-cover rounded-2xl"
      />
      <h3 className="text-lg font-semibold text-gray-700 mt-2">
        {movie.Title}
      </h3>
      <p className="text-gray-500">{movie.Year}</p>
    </div>
  ));
  

  return (
    <div className="p-4">
      <div className="carousel-container mx-auto max-w-lg relative">
      <div className="flex items-center justify-between">
          <h1 className="text-5xl text-gray-700 font-bold mt-3">Movies</h1>
          <img
            src="https://cdn.britannica.com/12/215912-050-02257657/Indian-actor-Amitabh-Bachchan-2013.jpg" 
            alt="Person"
            className="w-16 h-16 rounded-full border-4 border-customPurple object-cover"
          />
        </div>
        <h2 className="text-2xl text-gray-500 font-semibold mt-7 mb-5">
          Popular
        </h2>
        <AliceCarousel
          infinite
          items={carouselItems}
          responsive={{
            0: { items: 1 },
            768: { items: 3 },
            1024: { items: 3 },
          }}
          controlsStrategy="alternate"
          animationDuration={800} 
          animationEasingFunction="ease" 
          onSlideChanged={handleSlideChange} 
          disableDotsControls
          // disableButtonsControls
        />

        <span className="flex justify-between mt-8 mb-24">
          <h2 className="text-2xl text-gray-500 font-semibold">In Theatre</h2>
          <h2 className="text-lg text-customPurple font-semibold">Browse All</h2>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gridItems}
        </div>
      </div>
    </div>
  );
}

export default Home;
