import './App.css';
import SignInSide from './Login';
import { useEffect, createContext, useState } from 'react';
import Dashboard from './components/Dashboard';
import LeaveForm from './components/EmployeeDashboard/Forms/LeaveForm';
import OTForm from './components/EmployeeDashboard/Forms/OTForm';
import Main from './components/Main';
import LeaveTable from './components/EmployeeDashboard/Tables/LeaveTable';
import LeaveManagement from './components/EmployeeDashboard/Management/LeaveManagement';
import OTManangement from './components/EmployeeDashboard/Management/OTManangement';
import OTTable from './components/EmployeeDashboard/Tables/OTTable';
import EmployeeList from './components/HRDashboard/EmployeeList';

export const AppCtx = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHRLogin, setIsHRLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  useEffect(() => {
    console.log({ isLoggedIn });
  }, [isLoggedIn]);

  const handlePage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'ot':
        return <OTForm />;
      case 'leave':
        return <LeaveForm />;
      case 'leave-list':
        return <LeaveTable />;
      case 'ot-list':
        return <OTTable />;
      case 'leave-manage':
        return <LeaveManagement />;
      case 'ot-manage':
        return <OTManangement />;
      case 'employee':
        return <EmployeeList />;

      default:
        break;
    }
  };

  return (
    <div className='App'>
      <AppCtx.Provider
        value={{
          setIsLoggedIn,
          isLoggedIn,
          setIsHRLogin,
          isHRLogin,
          setCurrentPage,
          currentPage,
        }}
      >
        {!isLoggedIn ? <SignInSide /> : <Main>{handlePage()}</Main>}
      </AppCtx.Provider>
    </div>
  );
};

export default App;
