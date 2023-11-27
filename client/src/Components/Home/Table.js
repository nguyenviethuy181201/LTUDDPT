import React from 'react';
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GoEye } from 'react-icons/go';
const Head = 'text-xs  text-main font-semibold px-6 py-2 uppercase';
const Text = 'text-sm  leading-6 whitespace-nowrap text-center px-5 py-3';
const Rows = (movie, i, onDeleteHandler, admin) => {
  return (
    <tr key={i}>
      <td className={`${Text} flex justify-center items-center`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={movie?.image ? movie.image : '/images/user.png'}
            alt={movie?.name}
          />
        </div>
      </td>

      <td className={`${Text} max-w-xs truncate`}>{movie.name}</td>
      <td className={`${Text} `}>{movie.category}</td>
      <td className={`${Text}`}>{movie.language}</td>
      <td className={`${Text}`}>{movie.year}</td>
      <td className={`${Text}`}>{movie.time}hr</td>
      <td className={`${Text}  relative`}>
        {admin ? (
          <div className='transform  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex gap-2'>
            <Link
              to={`/edit/${movie?._id}`}
              className="border border-border bg-dry flex justify-center items-center text-border rounded flex-colo w-6 h-6"
            >
               <FaEdit className="text-green" />
            </Link>
            <button
              onClick={() => onDeleteHandler(movie?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6 "
            >
              <MdDelete />
            </button>
          </div>
        ) : (
          <>
            {/* <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
              Download <FaCloudDownloadAlt className="text-green" />
            </button> */}
            <Link
              to={`/movie/${movie?._id}`}
              className="bg-subMain group text-white rounded flex-colo  w-6 h-6 transform  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] hover:bg-transparent hover:border-subMain border border-transparent"
            >
              <GoEye className='group-hover:text-red-500'/>
            </Link>
            
          </>
        )}
      </td>
    </tr>
  );
};

const Table = ({ data, admin, onDeleteHandler }) => {
  return (
    <div className="overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border devide-y devide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Category
            </th>
            <th scope="col" className={`${Head}`}>
              Language
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            <th scope="col" className={`${Head}`}>
              Hours
            </th>
            <th scope="col" className={`${Head}`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, i) => Rows(movie, i, onDeleteHandler, admin))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
