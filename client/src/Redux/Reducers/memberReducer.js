import * as MemberConstants from '../Constants/MemberContants';


export const memberRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case MemberConstants.CREATE_NAVIGATION_REQUEST:
        return { isLoading: true };
      case MemberConstants.CREATE_NAVIGATION_SUCCESS:
        return {
          isLoading: false,
          isSuccess: true,
        };
      case MemberConstants.CREATE_NAVIGATION_FAIL:
        return { isLoading: false, isError: action.payload };
      default:
        return state;
    }
  };