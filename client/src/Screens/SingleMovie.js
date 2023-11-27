import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { Movies } from '../Data/DataMovies';
import MovieInfo from '../Components/Home/Single/MovieInfo';
import MovieCasts from '../Components/Home/Single/MovieCasts';
import MovieRate from '../Components/Home/Single/MovieRate';
import Titles from '../Components/Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../Components/Movie';
import ShareMovieModal from '../Components/Home/Modals/ShareModal';

import { useDispatch, useSelector } from 'react-redux';
import { getMovieByMovieIdAction } from '../Redux/Actions/MoviesActions';
import Loader from '../Components/Notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import ServiceModal from '../Components/Home/Modals/ServiceModal';
import { getAllServicesAction } from '../Redux/Actions/servicesAction';

const SingleMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = 'w-full gap-6 flex-colo min-h-screen';
  // use Selector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  
  );
  
  const { movies } = useSelector((state) => state.getAllMovies);
  // related movies
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category);
  
  //useeffect
  useEffect(() => {
    // movie id
    dispatch(getMovieByMovieIdAction(id));
    // dispatch(getAllServicesAction());
  }, [dispatch, id]);
  // console.log(services)
  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">{isError}</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <ServiceModal
            filmCode={id}
            user={userInfo?._id}
            modalOpen={serviceModalOpen}
            setModalOpen={setServiceModalOpen}
          />
          <MovieInfo movie={movie} setModalOpen={setModalOpen} setServiceModalOpen={setServiceModalOpen}/>
          <div className="container mx-auto min-h-screen px-2 my-6 ">
            <MovieCasts movie={movie} />
            {/* rate */}
            <MovieRate movie={movie} />
            {/*  */}
            {RelatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Movies" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid:cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {RelatedMovies?.map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default SingleMovie;
