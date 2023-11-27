import * as ServicesConstants from '../Constants/ServicesContants';



export const getAllServicesReducer = (state = {}, action) => {
  switch (action.type) {
    case ServicesConstants.GET_ALL_SERVICES_REQUEST:
      return { isLoading: true };
    case ServicesConstants.GET_ALL_SERVICES_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        services: action.payload, // Đảm bảo trả về dữ liệu từ action payload
      };
    case ServicesConstants.GET_ALL_SERVICES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};
