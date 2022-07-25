import React, { useContext } from 'react';
import { AppCtx } from '../App';
import AdminMainDashboard from './Dashboards/Admin/admin.main.dashboard';
import EmployeeDashboard from './Dashboards/Employee/main.dashboard';
// import DashboardImg from '../assets/images/dashboard.png';
import HRMainDashboard from './Dashboards/HR/hr.main.dashboard';
import ManagerMainDashboard from './Dashboards/Manager/manager.main.dashboard';

const Dashboard = () => {
  const { isLoggedIn } = useContext(AppCtx);

  // useEffect(() => {}, [isHRLogin]);c

  const switcher = () => {
    switch (isLoggedIn.alias) {
      case 'EMPLOYEE':
        return <EmployeeDashboard />;
      case 'MANAGER':
        return <ManagerMainDashboard />;
      case 'HR':
        return <HRMainDashboard />;
      case 'ADMIN':
        return <AdminMainDashboard />;

      default:
        break;
    }
  };

  return <div className='w-full'>{switcher()}</div>;
};

export default Dashboard;
