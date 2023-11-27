import React, { useEffect } from 'react';
import { FaRegListAlt, FaUber, FaUser } from 'react-icons/fa';
import { HiViewGrid, HiViewGridAdd } from 'react-icons/hi';
import Table from '../../../Components/Home/Table';
import { Movies } from '../../../Data/DataMovies';
import SlideBar from '../SlideBar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../../../Redux/Actions/userActions';
import {
  deleteMovieAction,
  getAllMoviesAction,
} from '../../../Redux/Actions/MoviesActions';
import { getAllCategoriesAction } from '../../../Redux/Actions/categoryAction';
import { toast } from 'react-hot-toast';
import Loader from '../../../Components/Notfications/Loader';
import { Empty } from '../../../Components/Notfications/Empty';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.categoryGetAll);
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);
  const { isLoading, isError, movies, totalMovies } = useSelector(
    (state) => state.getAllMovies
  );

  // delete
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );
  const deleteMovieHandler = (id) => {
    window.confirm('Are you sure you want to delete movie') &&
      dispatch(deleteMovieAction(id));
  };
  useEffect(() => {
    dispatch(getAllUsersAction());
    // get all movies
    // dispatch(getAllMoviesAction({}));
    // // get top rated movies
    // dispatch(getAllCategoriesAction());
    //errors
    if (isError || catError || userError || deleteError) {
      toast.error('Something went wrong');
    }
  }, [dispatch, isError, userError, catError, deleteError]);

  // dashboard dataa....

  const DashBoardData = [
    {
      bg: 'bg-orange-600',
      icon: FaRegListAlt,
      title: 'Total Movies',
      total: isLoading ? 'Loading....' : totalMovies || 0,
    },
    {
      bg: 'bg-blue-700',
      icon: HiViewGridAdd,
      title: 'Total Categories',
      total: catLoading ? 'Loading....' : categories?.length || 0,
    },
    {
      bg: 'bg-green',
      icon: FaUser,
      title: 'Total Users',
      total: userLoading ? 'Loading....' : users?.length || 0,
    },
  ];
  return (
    <SlideBar>
      <h2 className="text-xl font-bold">DashBoard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashBoardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-text border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className=" mt-2 font-bold ">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6">Recent Movies</h3>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <Table
          data={movies?.slice(0, 5)}
          admin={true}
          onDeleteHandler={deleteMovieHandler}
        />
      ) : (
        <Empty message="Empty" />
      )}
    </SlideBar>
  );
};

export default Dashboard;
