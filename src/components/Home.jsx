import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { topRatedMovies } from '../constants'; // Adjust the path to reach constants.js

function Home() {
  const items = topRatedMovies.map((movie) => (
    <div
      key={movie.imdbID}
      className="carousel-item p-2 rounded-lg overflow-hidden transition-transform transform hover:scale-105"
      style={{ width: '100%', height: '500px' }}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  ));

  return (
    <div className="p-4">
      <div className="carousel-container mx-auto max-w-screen-xl">
      <h1 className="text-4xl text-gray-700 font-bold ">Movies</h1>
        <h2 className="text-xl text-gray-500 font-medium my-10 ">Popular</h2>
        <AliceCarousel
          infinite
          items={items}
          responsive={{
            0: { items: 1 },
            768: { items: 3 },
            1024: { items: 3 }
          }}
        />
      </div>
    </div>
  );
}

export default Home;
