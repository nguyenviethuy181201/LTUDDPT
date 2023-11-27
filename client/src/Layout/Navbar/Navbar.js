import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { CgUser } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { FaRegUserCircle,FaUser } from "react-icons/fa";
const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  const hover = 'hover:text-subMain transitions text-white';
  const Hover = ({ isActive }) => (isActive ? 'text-subMain' : hover);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/movies/${search}`);
      setSearch(search);
    } else {
      navigate(`/movies`);
    }
  };

  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* Logo */}
          <div className="col-span-1 lg:block hidden ">
            <Link to="/">
              <img
                src="/images/logophim.jpg"
                alt="logo"
                className="w-full h-16 object-contain"
              />
            </Link>
          </div>
          {/* Form search here */}
          <div className="col-span-3">
            <form
              onSubmit={handleSearch}
              className="w-full text-sm bg-dryGray rounded flex-btn gap-4"
            >
              <button
                type="submit"
                className="bg-subMain w-12 flex-colo h-12 rounded text-white  "
              >
                <FaSearch />
              </button>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your movies favorite"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none  px-2 text-black"
              />
            </form>
          </div>
          {/* Menu */}
          <div className="col-span-3 font-medium text-sm hidden x1:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/movies" className={Hover}>
              Movies
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact
            </NavLink>
            <NavLink
              to={
                userInfo?.isAdmin
                  ? '/dashboard'
                  : userInfo
                  ? '/profile'
                  : '/login'
              }
              
            >
              {userInfo ? (
                <img
                  src={userInfo?.image ? userInfo?.image : '/images/user.png'}
                  alt={userInfo?.fullName}
                  className="w-8 h-8 rounded-full border object-cover "
                />
              ) : (
                
                <FaRegUserCircle className="w-8 h-8" />
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
