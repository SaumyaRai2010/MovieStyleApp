import React, { useEffect, useState } from 'react';

const Favourites = () => {
  const [favouriteMovies, setFavouriteMovies] = useState([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favorites');
    if (storedFavourites) {
      setFavouriteMovies(JSON.parse(storedFavourites));
    }
  }, []);

  return (
    <div className="ml-10 min-h-screen bg-gradient-to-b from-white to-cyan-100">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 max-w-7xl">
        {favouriteMovies.length > 0 ? (
          favouriteMovies.map((movie) => (
            <div key={movie.imdbID} className="relative group">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <div className="absolute rounded-lg inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-lg font-bold">{movie.Title}</h3>
                  <p className="text-sm">{movie.Year}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No favourite movies added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
