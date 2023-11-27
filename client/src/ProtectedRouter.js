import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

//public protect
const ProtectedRouter = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
};

//admin router protection
const AdminProtectedRouer = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo?.token ? (
    userInfo?.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="*" />
    )
  ) : (
    <Navigate to="/login" />
  );
};
export { ProtectedRouter, AdminProtectedRouer };
