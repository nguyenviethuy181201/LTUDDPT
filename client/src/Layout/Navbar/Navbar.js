import React, { useEffect,useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { CgUser } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { FaRegUserCircle,FaUser } from "react-icons/fa";
import axios from 'axios';
import { Hint } from 'react-autocomplete-hint';
import SearchResults from './SearchResults';

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
    setSearch(''); // Xóa giá trị của input
  };
  


  const [searchResults, setSearchResults] = useState([]);
  const [firstProductNameArray, setFirstProductNameArray] = useState([]);

  const throttle = (callback, delay) => {
    let shouldWait = false;
    let lastArgs = null;

    return (...args) => {
      if (shouldWait) {
        lastArgs = args;

        return;
      }

      callback(...args);
      shouldWait = true;
      setTimeout(() => {
        if (lastArgs === null) {
          shouldWait = false;
        } else {
          shouldWait = false;
          callback(...lastArgs);
          lastArgs = null;
        }
      }, 1000);
    }
  }

  useEffect(() => {
    if (!search) {
      setSearchResults([]);
    } else {
      (async () => {
        const url = 'http://localhost:4000/api/movies/search';
        // const url = 'http://localhost:8080/search';

        try {
          const response = await axios.get(url, {
            params: {
              name: search,
            }
          });

          setSearchResults(response.data);

          if (response.data.length > 0) {
            const firstProductName = response.data[0].name;
            console.log(response.data[0]._id)
            setFirstProductNameArray([firstProductName]);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      })();
    }
  }, [search]);

  const handleResultClick = () => {
    setSearch(''); // Reset giá trị input
    setSearchResults([]); // Xóa kết quả tìm kiếm
    // Chuyển đến trang ProductDetail với ID sản phẩm được chọn
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
              <div style={{
                flexDirection: 'column', // Hiển thị các phần tử thẳng hàng
                width: '600px'
              }}
                className="flex flex-col rounded-lg overflow-hidden shadow-lg max-w-600px w-90 mt-1rem mx-auto">

    
                <div className='w-[565px]'>
                  <Hint options={firstProductNameArray}>
                    <input
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search your movies favorite"
                      className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none  px-2 text-black"
                    />
                  </Hint>
                </div>
              </div>
            </form>
            {search && (
              <div className="max-h-75vh p-0 overflow-y-auto absolute top-[90px] z-5 bg-dryGray text-black rounded-lg">
                <div className="px-4 ">
                  <ul className="border-t-1 border-gray-300 pt-2 pb-4 ">
                    <SearchResults searchResults={searchResults} handleResultClick={handleResultClick} />
                  </ul>
                </div>
              </div>
            )}
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
