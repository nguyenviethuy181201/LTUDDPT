import * as userConstants from '../Constants/userContants';
import * as userApi from '../Apis/userServices';
import toast from 'react-hot-toast';
import { ErrorsAction, tokenProtection } from '../Protection.js';

//login action
const loginAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(datas);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

// register action

const registerAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(datas);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

// logout action
const logoutAction = () => (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_LOGIN_RESET });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
};

// update profile action
const updateProfileAction = (user, isShow=true) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userApi.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    if(isShow){
      toast.success('Profile updated successfully');
    }
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

//delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    await userApi.deleteProfileService(tokenProtection(getState));
    dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
    toast.success('Profile deleted successfully');
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
  }
};
// change password
const changePasswordAction = (passwords) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await userApi.changePasswordService(
      passwords,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
  }
};
// get all favorites movie action
const getMovieFavoritesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_GET_FAVORITE_MOVIES_REQUEST });
    const response = await userApi.getMovieFavoritesService(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_GET_FAVORITE_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_GET_FAVORITE_MOVIES_FAIL);
  }
};

// delete all favorite movies acion
const deleteFavoritesMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_FAVORITE_MOVIES_REQUEST });
    await userApi.deleteAllFavoritesMoviesServices(tokenProtection(getState));
    dispatch({
      type: userConstants.USER_DELETE_FAVORITE_MOVIES_SUCCESS,
    });
    toast.success('Favorite movies were successfully deleted');
  } catch (error) {
    ErrorsAction(
      error,
      dispatch,
      userConstants.USER_DELETE_FAVORITE_MOVIES_FAIL
    );
  }
};

// admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    const respone = await userApi.getAllUsersService(tokenProtection(getState));
    dispatch({
      type: userConstants.GET_ALL_USERS_SUCCESS,
      payload: respone,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

// admin delete user action
const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    const respone = await userApi.DeleteUserService(
      id,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_ALL_USERS_SUCCESS,
      payload: respone,
    });
    toast.success('User delete successfully');
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);
  }
};

// user like movie action
const likeMovieAction = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
    const response = await userApi.likeMoviesService(
      movieId,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.LIKE_MOVIE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
  }
};

// const userUpdateAction = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: userConstants.UPDATE_USER_REQUEST });
//     const response = await userApi.userUpdateService(
      
//       tokenProtection(getState)
//     );
//     dispatch({
//       type: userConstants.UPDATE_USER_SUCCESS,
//       payload: response,
//     });
    
//     dispatch(getMovieFavoritesAction());
//   } catch (error) {
//     ErrorsAction(error, dispatch, userConstants.UPDATE_USER_FAIL);
//   }
// };



export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
  getMovieFavoritesAction,
  deleteFavoritesMoviesAction,
  getAllUsersAction,
  deleteUserAction,
  likeMovieAction,
  // userUpdateAction,
};
