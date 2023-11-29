import Axios from "./Axios";

const registerMemberService =  async ( amount,info,  token) => {
  
    const { data } = await Axios.post('/vnpay/member', {amount, info}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    window.location.href = data;
  };

export {registerMemberService};