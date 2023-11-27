import React, { useEffect, useState } from 'react';
import MainModal from './MainModal';
import { useDispatch, useSelector } from 'react-redux';
import {memberRegister} from '../../../Redux/Actions/memberActions'
import { toast } from 'react-hot-toast';
import { getAllServicesAction } from '../../../Redux/Actions/servicesAction';
import { GET_ALL_SERVICES_REQUEST } from '../../../Redux/Constants/ServicesContants';
const ServiceModal = ({filmCode, user, modalOpen, setModalOpen}) => {
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess } = useSelector(
        (state) => state.createNavigation
      );
      const { services } = useSelector((state) => state.getAllServices);
    // const {
        
    //     isError: getAllError,
    //     isSuccess: getAllSuccess,
    //     services,
    // } = useSelector (
    //     (state) => state.getAllServices
    // );
    
    //   dispatch(getAllServicesAction())


      useEffect(() => {
        dispatch(getAllServicesAction())
        if (isError ) {
          toast.error(isError );
          dispatch({
            type:  'CREATE_NAVIGATION_REQUEST' ,
          });
        }
        if (isSuccess  ) {
          dispatch({
            type:  'CREATE_NAVIGATION_REQUEST' ,
          });
        }
      }, [dispatch, isError, isSuccess, modalOpen]);
      console.log(services)
    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className="flex flex-col gap-[10px]  justify-center items-center  border border-border  w-full  align-middle p-10 bg-dry overflow-y-auto  text-white rounded-2xl ">
                <p className='text-2xl font-bold'>Khám phá bất tận</p>
                <div className='flex w-full gap-[10px]'>
                    {
                        services?.map((service, index) => (
                             
                            <div key={index} className={  `w-[50%] border rounded flex flex-col justify-center items-center p-5 ${index === 0 ? "bg-gradient-to-tr from-[#a32cdf] to-[#1fc9fd]" : index === 1 ? "bg-gradient-to-tr from-[#ff0a6c] to-[#4a3cdb]" : null }`}>
                                <div className='flex gap-[10px] flex-col justify-center items-center'>
                                    <div>
                                        <span className='text-5xl font-bold'>{service.limit}</span> <span className='text-xl font-semibold'>Ngày</span>
                                    </div>
                                    <p className='text-center text-lg'> Trải nghiệm xem phim miễn phí không giới hạn</p>
                                    <div className='mt-[20px]'>
                                        <span className='text-4xl font-bold'>{service.price/1000}K</span> <span className='text-xl'>/</span> <span className='text-sm'>{service.limit} Ngày</span>
                                    </div>
                                    
                                </div>
                                <button onClick={() => {setModalOpen(false); {dispatch(memberRegister({amount: service.price, info : filmCode + '_' + user + '_' + service.package})) }}} className='mt-[30px] border rounded-3xl py-2 px-6 text-lg   transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300'>
                                    Đăng ký ngay
                                </button>
                            </div>
                        ))
                    }
                    {/* <div className='w-[50%] bg-gradient-to-tr from-[#ff0a6c] to-[#4a3cdb] border rounded flex flex-col justify-center items-center p-5 '>
                        <div className='flex gap-[10px] flex-col justify-center items-center '>
                            <div>
                                <span className='text-5xl font-bold'>365</span> <span className='text-xl font-semibold'>Ngày</span>
                            </div>
                            <p className='text-center text-lg'>Trải nghiệm xem phim miễn phí không giới hạn</p>
                            <div className='mt-[20px]'>
                                <span className='text-4xl font-bold'>1000K</span> <span className='text-xl'>/</span> <span className='text-sm'>365 Ngày</span>
                            </div>
                        </div>
                        <button onClick={submitHandler} className='mt-[30px] border rounded-3xl py-2 px-6 text-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300'>
                            Đăng ký ngay
                        </button>
                    </div> */}
                </div>
                
            </div>
        </MainModal>
    )
}

export default ServiceModal;