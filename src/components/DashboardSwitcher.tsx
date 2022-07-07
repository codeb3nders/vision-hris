import React, { useContext, useEffect } from 'react';
import { AppCtx } from '../App';
import EmployeeDashboard from './Dashboards/Employee/main.dashboard';
// import DashboardImg from '../assets/images/dashboard.png';
import HRDashboard from './Dashboards/hr.dashboard';

const Dashboard = () => {
  const { isLoggedIn } = useContext(AppCtx);

  // useEffect(() => {}, [isHRLogin]);c

  const switcher = () => {
    switch (isLoggedIn.alias) {
      case 'EMPLOYEE':
        return <EmployeeDashboard />;
      case 'APPROVER':
        return <EmployeeDashboard />;
      case 'HR':
        return <HRDashboard />;

      default:
        break;
    }
  };

  return <div className='w-full'>{switcher()}</div>;
};

export default Dashboard;
