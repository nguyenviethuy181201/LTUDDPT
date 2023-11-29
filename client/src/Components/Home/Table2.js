import React from 'react';
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GoEye } from 'react-icons/go';
import { DateFormat, shortUpperCaseId } from '../Notfications/Empty';


const Head = 'text-xs  text-main font-semibold px-6 py-2 uppercase';
const Text = 'text-sm  leading-6 whitespace-nowrap text-center px-5 py-3';
const Rows = ({ data, i, users,categories,services, OnEditFuntion, onDeleteFuntion }) => {
  return (
    <tr>
      {users  ? (
        <>
          <td className={`${Text} flex justify-center items-center`}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={`${data.image ? data.image : '/images/user.png'}`}
                alt={data?.fullName}
              />
            </div>
          </td>

          <td className={`${Text} `}>
            {data?._id ? shortUpperCaseId(data._id) : ''}
          </td>
          <td className={`${Text}`}>{DateFormat(data?.createAt)}</td>
          <td className={`${Text} max-w-xs truncate`}>{data.fullName}</td>
          <td className={`${Text} max-w-xs truncate`}>{data.email}</td>
          <td className={`${Text} relative `}>
            {!data.isAdmin && (
              <button
                onClick={() => onDeleteFuntion(data?._id)}
                className="bg-subMain text-white rounded flex-colo w-6 h-6 transform absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
              >
                <MdDelete />
              </button>
            )}
          </td>
        </>
      ) : categories ? (
        //category
        <>
          <td className={`${Text} font-bold`}>
            {data?._id ? shortUpperCaseId(data._id) : ''}
          </td>
          <td className={`${Text}`}>{DateFormat(data?.createAt)}</td>
          <td className={`${Text}`}>{data.title}</td>
          <td className={`${Text} relative `}>
            <div className='transform  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex gap-2'>

              <button
                onClick={() => OnEditFuntion(data)}
                className="border border-border bg-dry  rounded flex-colo w-6 h-6"
              >
                <FaEdit className="text-green" />
              </button>
              <button
                onClick={() => onDeleteFuntion(data?._id)}
                className="bg-subMain text-white rounded flex-colo w-6 h-6 group hover:bg-transparent hover:border hover:border-subMain"
              >
                <MdDelete className='group-hover:text-subMain'/>
              </button>
            </div>
          </td>
        </>
      ) :  services ? (
        <>
          <td className={`${Text} font-bold`}>
            {data?._id ? shortUpperCaseId(data._id) : ''}
          </td>
          <td className={`${Text}`}>{data.title}</td>
          <td className={`${Text}`}>{data.price}</td>
          <td className={`${Text}`}>{data.servicePackage}</td>
          <td className={`${Text}`}>{data?.createdAt ? `${DateFormat(data.createAt)}` : "November 29, 2023"}</td>
          <td className={`${Text} relative `}>
            <div className='transform  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex gap-2'>

              <button
                onClick={() => OnEditFuntion(data)}
                className="border border-border bg-dry  rounded flex-colo w-6 h-6"
              >
                <FaEdit className="text-green" />
              </button>
              <button
                onClick={() => onDeleteFuntion(data?._id)}
                className="bg-subMain text-white rounded flex-colo w-6 h-6 group hover:bg-transparent hover:border hover:border-subMain"
              >
                <MdDelete className='group-hover:text-subMain'/>
              </button>
            </div>
          </td>
        </>
      ) : (
        <></>
      )}
    </tr>
  );
};

const Table2 = ({ data, users,categories,services, OnEditFuntion, onDeleteFuntion }) => {
  return (
    <div className="overflow-y-auto max-h-[500px] overflow-hidden relative w-full">
      <table className="w-full table-auto  border border-border devide-y devide-border">
        <thead>
          <tr className="bg-dryGray">
            {users  ? (
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
                <th scope="col" className={`${Head} `}>
                  Actions
                </th>
              </>
            ) : categories ? (
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
                <th scope="col" className={`${Head}`}>
                  Actions
                </th>
              </>
            ) : services ? (
              <>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Title
                </th>
                <th scope="col" className={`${Head}`}>
                  Price
                </th>
                <th scope="col" className={`${Head}`}>
                  Term
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  Actions
                </th>
              </>
            ) : (<></>)}

          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((data, i) => (
            <Rows
              key={i}
              data={data}
              users={users}
              categories={categories}
              services={services}
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
