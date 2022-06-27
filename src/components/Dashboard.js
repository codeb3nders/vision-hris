import React, { useContext, useEffect } from 'react';
import { AppCtx } from './../App';
import DashboardImg from '../assets/images/dashboard.png';

const Dashboard = () => {
  const { isHRLogin } = useContext(AppCtx);

  useEffect(() => {}, [isHRLogin]);

  return (
    <div style={{ width: '100%' }}>
      <img
        style={{ width: '100%', userSelect: 'none' }}
        src={DashboardImg}
        alt='Dashboard'
      />
    </div>
  );
};

export default Dashboard;
