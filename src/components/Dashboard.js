import React, { useContext, useEffect } from 'react';
import { AppCtx } from './../App';

const Dashboard = () => {
  const { isHRLogin } = useContext(AppCtx);

  useEffect(() => {}, [isHRLogin]);

  return <div>Dashboard</div>;
};

export default Dashboard;
