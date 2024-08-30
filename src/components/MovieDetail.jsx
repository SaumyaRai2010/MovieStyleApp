import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { topRatedMovies } from "../constants";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const movie = topRatedMovies.find((movie) => movie.imdbID === imdbID);
    setMovie(movie);

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFav = favorites.some((favMovie) => favMovie.imdbID === imdbID);
    setIsFavorite(isFav);
  }, [imdbID]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const newFavorites = favorites.filter(
        (favMovie) => favMovie.imdbID !== imdbID
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

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
          <h1 className="text-2xl font-bold text-black mr-2">{movie.Title}</h1>
          <span className="text-gray-600">({movie.Year})</span>
        </div>
        <p className="text-gray-400 mt-2">{movie.Genre}</p>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">{convertRuntime(movie.Runtime)}</span>
          <div className="flex items-center space-x-4">
            <button onClick={handleFavoriteClick} aria-label="Add to favorites">
              <i
                className={`fa-heart text-3xl ${
                  isFavorite ? "fas text-red-500" : "far text-red-400"
                }`}
              ></i>
            </button>
            <div className="flex items-center bg-white rounded-lg space-x-2 shadow-md p-2">
              <i className="fas fa-star text-yellow-400 mr-1"></i>
              <span className="text-gray-600">{movie.imdbRating}</span>
            </div>
          </div>
        </div>

        <div className="mb-1 mt-10">
          <p className="text-gray-900">{movie.Plot}</p>
        </div>

        <div className="mb-10 flex justify-between items-stretch mt-8">
          <div className="w-16 h-16 bg-green-500 text-white text-2xl flex items-center justify-center rounded-lg">
            68
          </div>

          <div className="flex-1 text-center border-r border-green-300 pr-4 flex items-center justify-center">
            <p className="text-gray-400">Metascore</p>
          </div>

          <div className="flex-1 text-center border-r border-green-300 pr-4 flex flex-col justify-center">
            <p className="text-gray-400">Reviews</p>
            <div className="flex items-center justify-center mt-2">
              <span className="text-gray-700 text-lg mr-2">3207</span>
              <i className="fas fa-chevron-right text-gray-700"></i>
            </div>
          </div>

          <div className="flex-1 text-center flex flex-col justify-center">
            <p className="text-gray-400">Popularity</p>
            <div className="flex items-center justify-center mt-2">
              <i className="fa-solid fa-arrow-trend-up text-green-500 mr-2"></i>
              <span className="text-gray-700 text-lg">3</span>
            </div>
          </div>
        </div>

        <div className="mt-2 mb-20">
          <h2 className="text-xl font-semibold text-black mb-4">Cast</h2>
          <div className="space-y-4">
            <div className="flex items-center border-b border-gray-300">
              <img
                src="https://cdn.britannica.com/99/254199-050-98CF4E04/Robert-Downey-JR-UK-premier-Oppenheimer-movie-July-2023.jpg"
                alt="Robert Downey Jr."
                className="w-16 h-16 mb-4 object-cover rounded-lg border border-gray-300"
              />
              <div className="ml-4">
                <p className="text-black font-semibold">Robert Downey Jr.</p>
                <p className="text-gray-500">Tony Stark / Iron Man</p>
              </div>
            </div>

            <div className="flex items-center border-b border-gray-300">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Chris_Hemsworth_by_Gage_Skidmore_3.jpg/1200px-Chris_Hemsworth_by_Gage_Skidmore_3.jpg"
                alt="Chris Hemsworth"
                className="w-16 h-16 object-cover rounded-lg mb-4 border border-gray-300"
              />
              <div className="ml-4">
                <p className="text-black font-semibold">Chris Hemsworth</p>
                <p className="text-gray-500">Thor</p>
              </div>
            </div>

            <div className="flex items-center border-b border-gray-300">
              <img
                src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/z3dvKqMNDQWk3QLxzumloQVR0pv.jpg"
                alt="Mark Ruffalo"
                className="w-16 h-16 object-cover rounded-lg mb-4 border border-gray-300"
              />
              <div className="ml-4">
                <p className="text-black font-semibold">Mark Ruffalo</p>
                <p className="text-gray-500">Bruce Banner / Hulk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
