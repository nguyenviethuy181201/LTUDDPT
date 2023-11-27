import React from 'react';
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GoEye } from 'react-icons/go';
import { DateFormat, shortUpperCaseId } from '../Notfications/Empty';
const Head = 'text-xs text-left text-main font-semibold px-6 py-2 uppercase';
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3';
const Rows = ({ data, i, users, OnEditFuntion, onDeleteFuntion }) => {
  return (
    <tr>
      {users ? (
        <>
          <td className={`${Text}`}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={`${data.image ? data.image : '/images/user.png'}`}
                alt={data?.fullName}
              />
            </div>
          </td>

          <td className={`${Text} `}>
            {data?._id ? shortUpperCaseId(data._id) : '1111aBC'}
          </td>
          <td className={`${Text}`}>{DateFormat(data?.createAt)}</td>
          <td className={`${Text}`}>{data.fullName}</td>
          <td className={`${Text}`}>{data.email}</td>
          <td className={`${Text} float-right flex-rows gap-2 `}>
            {!data.isAdmin && (
              <button
                onClick={() => onDeleteFuntion(data?._id)}
                className="bg-subMain text-white rounded flex-colo w-6 h-6 "
              >
                <MdDelete />
              </button>
            )}
          </td>
        </>
      ) : (
        //category
        <>
          <td className={`${Text} font-bold `}>
            {data?._id ? shortUpperCaseId(data._id) : '1111aBC'}
          </td>
          <td className={`${Text}`}>{DateFormat(data?.createAt)}</td>
          <td className={`${Text}`}>{data.title}</td>
          <td className={`${Text} float-right flex-rows gap-2 `}>
            <button
              onClick={() => OnEditFuntion(data)}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2"
            >
               <FaEdit className="text-green" />
            </button>
            <button
              onClick={() => onDeleteFuntion(data?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6 "
            >
              <MdDelete />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

const Table2 = ({ data, users, OnEditFuntion, onDeleteFuntion }) => {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full  border border-border devide-y devide-border">
        <thead>
          <tr className="bg-dryGray">
            {users ? (
              <>
                <th scope="col" className={`${Head}`}>
                  Image
                </th>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  Full Name
                </th>
                <th scope="col" className={`${Head}`}>
                  Email
                </th>
              </>
            ) : (
              <>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  Title
                </th>
              </>
            )}

            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((data, i) => (
            <Rows
              key={i}
              data={data}
              users={users}
              OnEditFuntion={OnEditFuntion}
              onDeleteFuntion={onDeleteFuntion}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
