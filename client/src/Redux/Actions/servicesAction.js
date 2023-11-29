import * as ServicesConstants from '../Constants/ServicesContants';
import * as servicesApi from '../Apis/ServicesService';
import toast from 'react-hot-toast';
import { ErrorsAction, tokenProtection } from '../Protection.js';

const getAllServicesAction = () => async (dispatch, getState) => {
    try {
        dispatch({type : ServicesConstants.GET_ALL_SERVICES_REQUEST });
      const response = await servicesApi.getAllServices(tokenProtection(getState));
      dispatch({ type: ServicesConstants.GET_ALL_SERVICES_SUCCESS, payload: response });
      
    } catch (error) {
      ErrorsAction(error, dispatch, ServicesConstants.GET_ALL_SERVICES_FAIL);
    } 
  };

const createServicesAction = (service) => async (dispatch, getState) => {
  try {
    dispatch({type : ServicesConstants.CREATE_SERVICES_REQUEST });
    const response = await servicesApi.createService(tokenProtection(getState), service);
    dispatch({ type: ServicesConstants.CREATE_SERVICES_SUCCESS, payload: response });
    toast.success('Service created successfully');
    
  } catch (error) {
    ErrorsAction(error, dispatch, ServicesConstants.CREATE_SERVICES_FAIL);
  }
};

const updateServicesAction = (service,id) => async (dispatch, getState) => {
  try {
      dispatch({type : ServicesConstants.UPDATE_SERVICES_REQUEST });
    const response = await servicesApi.updateService(tokenProtection(getState), service, id);
    dispatch({ type: ServicesConstants.UPDATE_SERVICES_SUCCESS, payload: response });
    toast.success('Service updateed successfully');
    dispatch(getAllServicesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, ServicesConstants.UPDATE_SERVICES_FAIL);
  }
};

const deleteServicesAction = (id) => async (dispatch, getState) => {
  try {
      dispatch({type : ServicesConstants.DELETE_SERVICES_REQUEST });
    const response = await servicesApi.deleteService(tokenProtection(getState), id);
    dispatch({ type: ServicesConstants.DELETE_SERVICES_SUCCESS, payload: response });
    toast.success('Service deleted successfully');
    dispatch(getAllServicesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, ServicesConstants.DELETE_SERVICES_FAIL);
  }
};

const deleteAllServicesAction = () => async (dispatch, getState) => {
  try {
      dispatch({type : ServicesConstants.DELETE_ALL_SERVICES_REQUEST });
    const response = await servicesApi.createService(tokenProtection(getState));
    dispatch({ type: ServicesConstants.DELETE_ALL_SERVICES_SUCCESS, payload: response });
    toast.success('All movies deleted successfully');
    dispatch(getAllServicesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, ServicesConstants.DELETE_ALL_SERVICES_FAIL);
  }
};

export {getAllServicesAction, createServicesAction, updateServicesAction, deleteServicesAction, deleteAllServicesAction}