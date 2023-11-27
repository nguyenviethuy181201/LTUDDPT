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

export {getAllServicesAction}