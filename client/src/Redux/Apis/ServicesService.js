import Axios from './Axios';

const getAllServices = async (token) => {
    const { data } = await Axios.get(`/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };
const createService = async (token, service) => {
  const { data } = await Axios.post(`/services`, service, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
const updateService = async (token, id, service) => {
  const { data } = await Axios.put(`/services/${id}`, service, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
const deleteService = async (token,id) => {
  const { data } = await Axios.delete(`/services/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
const deleteAllService = async (token) => {
  const { data } = await Axios.delete(`/services`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {getAllServices, createService, updateService, deleteService, deleteAllService}