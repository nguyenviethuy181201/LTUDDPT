import Axios from "./Axios";

const registerMemberService =  async ( amount,filmCode,  token) => {
  
    const { data } = await Axios.post('/vnpay/member', {amount, filmCode}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    window.location.href = data;
  };

export {registerMemberService};