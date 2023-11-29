import * as ServicesConstants from '../Constants/ServicesContants';



export const getAllServicesReducer = (state = { services: [] }, action) => {
  switch (action.type) {
    case ServicesConstants.GET_ALL_SERVICES_REQUEST:
      return { isLoading: true };
    case ServicesConstants.GET_ALL_SERVICES_SUCCESS:
      return {
        isLoading: false,
        services: action.payload
      };
    case ServicesConstants.GET_ALL_SERVICES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

export const createServiceReducer = (state = {}, action) => {
  switch (action.type) {
    case ServicesConstants.CREATE_SERVICES_REQUEST:
      return { isLoading: true };
    case ServicesConstants.CREATE_SERVICES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case ServicesConstants.CREATE_SERVICES_FAIL:
      return { isLoading: false, isError: action.payload };
    case ServicesConstants.CREATE_SERVICES_RESET:
      return {};
    default:
      return state;
  }
};

export const updateServiceReducer = (state = {}, action) => {
  switch (action.type) {
    case ServicesConstants.CREATE_SERVICES_REQUEST:
      return { isLoading: true };
    case ServicesConstants.CREATE_SERVICES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case ServicesConstants.CREATE_SERVICES_FAIL:
      return { isLoading: false, isError: action.payload };
    case ServicesConstants.CREATE_SERVICES_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteServiceReducer = (state = {}, action) => {
  switch (action.type) {
    case ServicesConstants.UPDATE_SERVICES_REQUEST:
      return { isLoading: true };
    case ServicesConstants.UPDATE_SERVICES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case ServicesConstants.UPDATE_SERVICES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

export const deleteAllServiceReducer = (state = {}, action) => {
  switch (action.type) {
    case ServicesConstants.CREATE_SERVICES_REQUEST:
      return { isLoading: true };
    case ServicesConstants.CREATE_SERVICES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case ServicesConstants.CREATE_SERVICES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};