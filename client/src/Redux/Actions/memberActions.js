import * as memberContants from '../Constants/MemberContants';
import * as vnpayAPIs from '../Apis/VnpayService';

import { ErrorsAction, tokenProtection } from '../Protection.js';
import { toast } from 'react-hot-toast';

export const memberRegister = ({amount, info}) => async (dispath, getState) => {
  
    try {
      dispath({ type: memberContants.CREATE_NAVIGATION_REQUEST });
      const data = await vnpayAPIs.registerMemberService(
        amount,
        info,
        tokenProtection(getState)
      );
      dispath({
        type: memberContants.CREATE_NAVIGATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      ErrorsAction(error, dispath, memberContants.CREATE_NAVIGATION_FAIL);
    }
  };