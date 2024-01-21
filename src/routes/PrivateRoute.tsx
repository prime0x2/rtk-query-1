import { useAppSelector } from '@/store/hook';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<IProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { user, isLoading } = useAppSelector((state) => state.user);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
