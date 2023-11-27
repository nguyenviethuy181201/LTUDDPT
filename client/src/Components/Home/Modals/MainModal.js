import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
const MainModal = ({ modalOpen, setModalOpen, children }) => {
  const cancelButtonRef = useRef();
  return (
    <>
      {modalOpen && (
        <div onClick={() => setModalOpen(false)} className="fixed inset-0 z-30 overflow-y-auto bg-black bg-opacity-60 ">
          {/* <div className=" flex items-center justify-center">
            <div className="bg-white w-full md:w-96 p-6 rounded-lg relative">
              {children}
              <button
                onClick={() => setModalOpen(false)}
                ref={cancelButtonRef}
                className="absolute top-2 right-2 p-2 text-white bg-subMain rounded-full hover:bg-white hover:text-subMain"
              >
                <IoClose />
              </button>
            </div>
          </div> */}
          <div className='fixed w-[50%]   top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
            <div onClick={(e) => e.stopPropagation()} className="w-full flex items-center justify-center relative  p-6  rounded-lg">
                {children}
                <button
                  onClick={() => setModalOpen(false)}
                  ref={cancelButtonRef}
                  className="absolute right-3 top-3 p-2 text-white bg-subMain rounded-full hover:bg-white hover:text-subMain"
                >
                  <IoClose />
                </button>
            </div>
          </div>
        </div>
      )}
      {/* <Transition show={modalOpen} as={Fragment} appear>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto text-center"
          initialFocus={cancelButtonRef}
          onClose={() => setModalOpen(false)}
        >
          <div className="min-h-screen px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black  opacity-60" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </Transition.Child>
            <div className="absolute right-5 top-5 ">
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                className=" transitions w-8 h-8 flex-colo text-base font-medium text-white bg-subMain rounded-full hover:bg-white hover:text-subMain  "
              >
                <IoClose />
              </button>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </>
  );
};

export default MainModal;
