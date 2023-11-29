import React, { useEffect, useState } from 'react';
import { Input } from '../UsedInput';
import MainModal from './MainModal';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-hot-toast';
import { createServicesAction, getAllServicesAction, updateServicesAction } from '../../../Redux/Actions/servicesAction';

const ServiceModalAdmin = ({ modalOpen, setModalOpen, service }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [servicePackage, setServicePackage] = useState('');
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createService
  );
  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSuccess,
  } = useSelector((state) => state.updateService);
  // create category handler
  // console.log({huhu: service})
  const submitHandler = (e) => {
    e.preventDefault();
    if (title && price && servicePackage) {
      if (service) {
        dispatch(updateServicesAction(service?._id, { title: title, price: price, servicePackage:  servicePackage}));
        setModalOpen(!modalOpen);
      } else {
        dispatch(createServicesAction({ title: title, price: price, servicePackage:  servicePackage}));
        setTitle("");
        setPrice("");
        setServicePackage("");
      }
    } else {
      toast.error('Please provide the missing information.');
    }
  };
  // useEffect
  useEffect(() => {
    dispatch(getAllServicesAction());
    if (upError || isError) {
      toast.error(upError || isError);
      dispatch({
        type: isError ? 'CREATE_SERVICES_RESET' : 'UPDATE_SERVICES_RESET',
      });
    }
    if (isSuccess || upSuccess) {
      dispatch({
        type: isError ? 'CREATE_SERVICES_RESET' : 'UPDATE_SERVICES_RESET',
      });
      // dispatch(getAllServicesAction());
    }
    //  if category is not null
    if (service) {
      setTitle(service?.title);
      setPrice(service?.price)
      setServicePackage(service?.servicePackage)
    }
    if (modalOpen === false) {
      setTitle('');
      setPrice('');
      setServicePackage('')
    }
  }, [dispatch, isError, isSuccess, upSuccess, upError, service, modalOpen]);
  console.log(title,price,servicePackage)
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="flex flex-col gap-[10px]  justify-center items-center  border border-border  w-full  align-middle p-10 bg-dry overflow-y-auto  text-white rounded-2xl ">
        <h2 className="text-3xl font-bold ">
          {service ? 'Update' : 'Create'}
        </h2>
        <form
          className="flex flex-col gap-6 text-left mt-6"
        >
          <Input
            label="Service Title"
            placeholder="Enter information"
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Service Price"
            placeholder="Enter information"
            type="number"
            bg={false}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Service Package"
            placeholder="Enter information"
            type="number"
            bg={false}
            value={servicePackage}
            onChange={(e) => setServicePackage(e.target.value)}
          />
          <button
            disabled={isLoading || upLoading}
            type="submit"
            onClick={(e) => {setModalOpen(false); submitHandler(e)}}
            className="w-full flex-rows gap-4 py-3 font-bold hover:bg-dry transitions rounded bg-subMain text-white"
          >
            {isLoading || upLoading
              ? 'Loading...'
              : service
              ? 'Update'
              : 'Create'}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default ServiceModalAdmin;
