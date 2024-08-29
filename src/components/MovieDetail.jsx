// src/components/MovieDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { topRatedMovies } from "../constants"; // Adjust import if needed

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const movie = topRatedMovies.find((movie) => movie.imdbID === imdbID);
    setMovie(movie);
  }, [imdbID]);

  // Helper function to convert runtime to hours and minutes
  const convertRuntime = (runtime) => {
    const minutes = parseInt(runtime.split(" ")[0], 10);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (!movie) {
    return (
      <div className="p-4 max-w-2xl mx-auto flex justify-center items-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto bg-gradient-to-b from-white to-cyan-50">
      <span className="flex justify-between">
        <Link to="/" className="text-customPurple text-3xl top-4 left-20">
          <i className="fas fa-arrow-left"></i>
        </Link>

        <div className="top-4 right-4 text-customPurple text-3xl">
          <i className="fas fa-ellipsis-h"></i>
        </div>
      </span>

      <div className="relative mt-10 overflow-hidden h-96">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-full object-cover rounded-xl shadow-lg shadow-black"
        />
      </div>

      <div className="mt-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-black mr-2">
            {movie.Title}
          </h1>
          <span className="text-gray-600">({movie.Year})</span>
        </div>
        <p className="text-gray-600 mt-2">{movie.Genre}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-600">
            {convertRuntime(movie.Runtime)}
          </span>
          <div className="flex items-center space-x-4">
            <i className="fa-regular fa-heart text-red-500 text-3xl"></i>
            <div className="flex items-center bg-white rounded-lg space-x-2 shadow-md p-2">
              <i className="fas fa-star text-yellow-400 mr-1"></i>
              <span className="text-gray-600">{movie.imdbRating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
