import React, { useEffect, useState } from "react";
import SlideBar from "../SlideBar";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Notfications/Loader";
import Table2 from "../../../Components/Home/Table2";
import { Empty } from "../../../Components/Notfications/Empty";
import toast from "react-hot-toast";
import { deleteServicesAction, getAllServicesAction } from "../../../Redux/Actions/servicesAction";
import ServiceModalAdmin from "../../../Components/Home/Modals/ServiceModalAdmin";

const Services = () => {
    const dispatch = useDispatch();
    
    const { services, isLoading } = useSelector(
        (state) => state.getAllServices
    );
    const [modalOpen, setModalOpen] = useState(false);
    const [service,setService] = useState();

    console.log(services)

    const { isSuccess, isError } = useSelector((state) => state.deleteService);
    
    const adminDeleteService = (id) => {
        if (window.confirm('Are you sure you want to delete')) {
        dispatch(deleteServicesAction(id));
        }
    };
    const OnEditFuntion = (id) => {
        setService(id);
        setModalOpen(!modalOpen);
      };

    useEffect(() => {
        dispatch(getAllServicesAction());
        if (isError) {
          toast.error(isError);
          dispatch({
            type: 'DELETE_SERVICES_RESET',
          });
        }
        if (isSuccess) {
          dispatch({ type: 'DELETE_SERVICES_RESET' });
        //   dispatch(getAllServicesAction());

        }
    
        if (modalOpen === false) {
          setService();
        }
      }, [ modalOpen, dispatch, isError, isSuccess]);
    return(
        <SlideBar>
            <ServiceModalAdmin
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                service={service}
            />
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-xl font-bold ">Services</h2>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-subMain flex-rows gap-2 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-2 rounded "
                    >
                        <HiPlusCircle /> Create
                    </button>
                </div>
                {isLoading ? (
                <Loader />
                ) : services?.length > 0 ? (
                <Table2
                    data={services}
                    services={true}
                    OnEditFuntion={OnEditFuntion}
                    onDeleteFuntion={adminDeleteService}
                />
                
                ) : (
                <Empty message="Not found services" />
                )}
            </div>
        </SlideBar>
    )
}

export default Services;