import React from 'react';
import { Input } from '../UsedInput';
import MainModal from './MainModal';
import { HiPlusCircle } from 'react-icons/hi';
import { FaFacebook, FaTelegram, FaTwitter } from 'react-icons/fa';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';
const ShareMovieModal = ({ modalOpen, setModalOpen, movie }) => {
  const shareData = [
    {
      icon: FaFacebook,
      shareButton: FacebookShareButton,
    },
    {
      icon: FaTwitter,
      shareButton: TwitterShareButton,
    },
    {
      icon: FaTelegram,
      shareButton: TelegramShareButton,
    },
  ];

  const url = `${window.location.protocol}//${window.location.host}/movie/${movie?._id}`;

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="flex flex-col  justify-center items-center  border border-border  w-full  align-middle p-10 bg-dry overflow-y-auto  text-white rounded-2xl ">
        <h2 className="text-2xl">
          Share <span className="text-xl font-bold">{movie?.name}</span>
        </h2>
        <form className="flex-rows flex-wrap gap-6 mt-6">
          {shareData.map((data, index) => (
            
              <div className="w-12 transitions hover:bg-subMain flex-colo text-lg h-12 bg-white rounded bg-opacity-30">
                <data.icon />
              </div>
            
          ))}
        </form>
      </div>
    </MainModal>
  );
};

export default ShareMovieModal;
