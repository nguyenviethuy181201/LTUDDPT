import Axios from './Axios';

const getAllServices = async (token) => {
    const { data } = await Axios.get(`/services/buy`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

export {getAllServices}