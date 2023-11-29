import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaStar} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IfMovieLiked, LikeMovie } from '../Context/Functionalities';
import toast from 'react-hot-toast';

const Movie = ({ movie }) => {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liekd funtion


  const isLiked = IfMovieLiked(movie);

  useEffect(() => {
    // Scroll to the top when the component mounts or when the URL changes
    window.scrollTo(0, 0);
  }, [window.location.pathname]); // Run the effect when the URL changes

  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie?._id}`} className="w-full">
          <img
            src={movie?.image ? movie?.image : '/images/user.png'}
            alt={movie?.name}
            className="w-full h-64 object-cover"
          />
        </Link>
        {/* <div className="absolute top-2 right-2 bg-main bg-opacity-60 text-white flex justify-center items-center  rounded-sm ">
          <FaStar className='text-star text-sm  flex justify-center items-center' />
          <div className="font-semibold text ">
            
            <p>{movie?.rate}</p>
          </div>
          
        </div> */}
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-while px-4 py-3">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          <button
            onClick={() => {LikeMovie(movie, dispatch, userInfo); }}
            disabled={isLiked || isLoading}
            className={`h-9 w-9 text-sm flex-colo transitions rounded 
            ${isLiked ? 'bg-transparent ' : 'bg-subMain'}
            hover:bg-transparent border-2 border-subMain rounded-md text-white`}
          >
            <FaHeart className={`${isLiked ? 'text-subMain ' : ''}`}/>
          </button>
        </div>
        
      </div>
    </>
  );
};

export default Movie;
