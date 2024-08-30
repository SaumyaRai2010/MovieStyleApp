import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./components/Home";
import Favourites from "./components/Favourites";
import MovieDetail from "./components/MovieDetail";
import "./App.css";

function App() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [favouriteMovies, setFavouriteMovies] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // console.log(favouriteMovies)
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavouriteMovies(storedFavorites);
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <Router>
      <div className="flex h-screen">
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-customPurple text-white
    ${isNavbarOpen ? "translate-x-0" : "-translate-x-full"}
    transition-transform duration-300 ease-in-out z-50`}
        >
          <nav className="mt-16 flex flex-col items-center">
            <NavLink
              to="/"
              className={
                ({ isActive }) =>
                  !isActive
                    ? "text-violet-400 text-xl py-2" 
                    : "text-white text-xl py-2" 
              }
              onClick={toggleNavbar}
            >
              <i className="fas fa-home"></i> Home
            </NavLink>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                !isActive
                  ? "text-violet-400 text-xl py-2" 
                  : "text-white text-xl py-2" 
              }
            >
              <i className="fas fa-star"></i> Favourites
            </NavLink>
          </nav>
        </div>

        <div
          className={`flex-1 p-4 transition-all duration-300
            ${isNavbarOpen ? "ml-64" : "ml-0"}`}
        >
          <button
            className="fixed top-4 left-4 text-2xl z-50"
            onClick={toggleNavbar}
          >
            {isNavbarOpen ? (
              <i className="fas fa-times text-white"></i>
            ) : (
              <svg
                className="w-10 h-10 text-customPurple"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M4 6h16M4 12h16M4 18h8"
                />
              </svg>
            )}
          </button>

          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="I want to watch..."
                className="w-full p-2 pl-10 rounded-3xl border bg-gray-100 text-gray-500"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/favourites"
              element={<Favourites movies={favouriteMovies} />}
            />
            <Route path="/movie/:imdbID" element={<MovieDetail />} />
          </Routes>
        </div>

        <footer className="flex justify-evenly bg-gray-100 items-center text-white p-4 fixed bottom-0 w-full z-50">
          <div className="text-3xl">
            <i className="fas fa-dice-six text-customPurple"></i>
          </div>
          <div className="text-3xl">
            <i className="fas fa-tv text-gray-500"></i>
          </div>
          <div className="text-3xl">
            <i className="fas fa-heart text-gray-500"></i>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
