import React, { useContext, useEffect } from 'react';
import { AppCtx } from './../App';
import EmployeeDashboard from './Dashboards/employee.dashboard';
import HRDashboard from './Dashboards/hr.dashboard';

const Dashboard = () => {
  const { isHRLogin } = useContext(AppCtx);

  useEffect(() => {
    // handleDashboard()
  }, [isHRLogin]);

  return <div>{isHRLogin ? <HRDashboard /> : <EmployeeDashboard />}</div>;
};

export default Dashboard;
