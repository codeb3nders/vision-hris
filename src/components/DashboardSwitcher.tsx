/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppCtx } from '../App';
import AdminMainDashboard from './Dashboards/Admin/admin.main.dashboard';
import EmployeeDashboard from './Dashboards/Employee/main.dashboard';
// import DashboardImg from '../assets/images/dashboard.png';
import HRMainDashboard from './Dashboards/HR/hr.main.dashboard';
import ManagerMainDashboard from './Dashboards/Manager/manager.main.dashboard';
import { MainCtx } from './Main';

const Dashboard = () => {
  const { isLoggedIn } = useContext(AppCtx);
  const { setIsTable } = useContext(MainCtx);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/people/employees') {
      setIsTable(true);
    } else {
      setIsTable(false);
    }
  }, [location]);

  const switcher = () => {
    switch (isLoggedIn.alias) {
      case 'EMPLOYEE':
        return <EmployeeDashboard />;
      case 'APPROVER':
        return <ManagerMainDashboard />;
      case 'HR ADMIN':
        return <HRMainDashboard />;
      case 'SYSTEM ADMIN':
        return <AdminMainDashboard />;

      default:
        break;
    }
  };

  return <div className='w-full'>{switcher()}</div>;
};

export default Dashboard;
