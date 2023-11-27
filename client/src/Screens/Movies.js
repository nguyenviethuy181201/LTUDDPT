import React, { useEffect, useMemo, useState } from 'react';
import Filter from '../Components/Home/Filter';

import Movie from '../Components/Movie';
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb';
import Layout from '../Layout/Layout';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { getAllMoviesAction } from '../Redux/Actions/MoviesActions';
import Loader from '../Components/Notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { LanguageData, RatesData, TimesData, YearData } from '../Data/FlterData';
import { useParams } from 'react-router-dom';

const MoviesPage = () => {
  const { search } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: 'All Categories' });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);



  // all movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );
  //get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);

  // queries
  const queries = useMemo(() => {
    const query = {
      category: category?.title === 'All Categories' ? '' : category?.title,
      time: times?.title.replace(/\D/g, ''),
      language: language?.title === 'Sort By Language' ? '' : language?.title,
      rate: rates?.title.replace(/\D/g, ''),
      year: year?.title.replace(/\D/g, ''),
      search: search ? search : '',
    };
    console.log(query.category)
    return query;
  }, [category, times, language, rates, year, search]);
  // useEffect to load movies when queries change
  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    //  get all movies
    dispatch(getAllMoviesAction(queries));
  }, [dispatch, isError, queries]);

  const nextpage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page + 1,
      })
    );
  };
  const prevpage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page - 1,
      })
    );
  };
  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
  };
  
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filter data={datas} />
        <p className="text-lg font-medium my-6">
          Total{' '}
          <span className="font-bold text-subMain">
            {movies ? movies?.length : 0}
          </span>
          {''} item Found {search && `for "${search}"`}
        </p>
        {isLoading ? (
          <div className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:border-subMain ">
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid:cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {movies?.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>

            {/* Loading more */}
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button
                onClick={prevpage}
                disabled={page === 1}
                className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:border-subMain "
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                onClick={nextpage}
                disabled={page === pages}
                className="text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:border-subMain "
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className="w-24 h-24 rounded-full mb-4 bg-main text-subMain text-4xl flex-colo">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              It seem's like we dont have any more
            </p>
          </div>
        )}

        {/* Loading more  */}
      </div>
    </Layout>
  );
};

export default MoviesPage;
