import React, { createContext, useEffect, useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Navbar from './Navigation/Navbar';
import Dashboard from './DashboardSwitcher';
import LeaveForm from './EmployeeDashboard/Forms/LeaveForm';
import LeaveTable from './EmployeeDashboard/Tables/LeaveTable';
import OTTable from './EmployeeDashboard/Tables/OTTable';
import LeaveManagement from './EmployeeDashboard/Management/LeaveManagement';
import OTManangement from './EmployeeDashboard/Management/OTManangement';
import EmployeeDatabase from './HRDashboard/EmployeeDatabase';
import EmployeeDirectory from './EmployeeDirectory';
import OTForm from './EmployeeDashboard/Forms/OTForm';
import { Path } from 'constants/Path';
import ProfileMain from './MyProfile/profile.main';
import HRMainDashboard from './Dashboards/HR/hr.main.dashboard';
import { ROLE_ACCESS } from 'constants/access'
const { Employee, HR, Manager } = Path;

type MainCtxI = {
  isTable: boolean;
  setIsTable: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MainCtx = createContext<MainCtxI>({
  isTable: false,
  setIsTable: () => { },
});

interface Props {
  role: string | null;
}

const Main: React.FC<Props> = ({ role }) => {
  const [isTable, setIsTable] = useState<boolean>(false);

  const isAllowed = (module_id: string) => {
    if (!module_id) return true;
    if (!role) return true;

    const code = role.toLowerCase().replace(" ", "_");
    console.log({ code })
    const haveAcess = ROLE_ACCESS[code].indexOf(module_id);
    if (haveAcess !== -1) {
      return true;
    }

    return false; // set to true for testing purpose
  };

  const PrivateRoute = useCallback(({ module_id, component, is_allowed, ...rest }: any) => {
    const routeComponent = (props: any) => {
      return is_allowed ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{ pathname: `/noaccess${rest.path}` }} />
      );
    };

    return <Route {...rest} render={routeComponent} />;
  }, []);

  return (
    <MainCtx.Provider value={{ isTable, setIsTable }}>
      <main>
        <Router>
          <Navbar />
          <section
            className={`tablet:px-8 phone:px-4 max-w-[1200px] desktop:max-w-[1200px] laptop:max-w-[1200px] sm:max-w-full mx-auto ${isTable ? 'desktop:max-w-full laptop:max-w-full' : ''
              }`}
          >
            <Switch>
              <PrivateRoute is_allowed={isAllowed('hr_dashboard')} exact path={Employee.Dashboard} component={Dashboard} />
              <PrivateRoute is_allowed={isAllowed('employees_db')} path={HR.People.Employees} component={EmployeeDatabase} />
              <PrivateRoute is_allowed={isAllowed('employee_directory')} path={HR.People.Directory} component={EmployeeDirectory} />

              {/* <Route component={GenericErrorPage} /> */}
            </Switch>
          </section>
        </Router>
        {/* <Router>
          <Navbar />
          <section
            className={`tablet:px-8 phone:px-4 max-w-[1200px] desktop:max-w-[1200px] laptop:max-w-[1200px] sm:max-w-full mx-auto ${isTable ? 'desktop:max-w-full laptop:max-w-full' : ''
              }`}
          >
            <Switch>
              
              <Route exact path={Employee.Dashboard} component={Dashboard} />
              <Route exact path={Employee.ESS.Leave} component={LeaveTable} />
              <Route exact path={Employee.ESS.LeaveNew} component={LeaveForm} />
              <Route path={Employee.ESS.LeaveType} component={LeaveForm} />
              <Route exact path={Employee.ESS.OT} component={OTTable} />
              <Route path={Employee.ESS.OTNew} component={OTForm} />
              <Route path={Employee.ESS.WorkersOT} component={OTTable} />
              <Route path={Employee.Profile} component={ProfileMain} />

              
              <Route
                path={Manager.Requests.Leave}
                component={LeaveManagement}
              />
              <Route
                exact
                path={Manager.Requests.OT}
                component={OTManangement}
              />
              <Route path={Manager.People.Team} component={WorkersDatabase} />
              <Route
                path={Manager.People.Directory}
                component={EmployeeDatabase}
              />

              
              <Route exact path={HR.Dashboard} component={HRMainDashboard} />
              <Route
                exact
                path={HR.Requests.Leave}
                component={LeaveManagement}
              />
              <Route exact path={HR.Requests.OT} component={OTManangement} />
              <Route path={HR.People.Directory} component={EmployeeDatabase} />
              <Route path={HR.People.Employees} component={EmployeeDatabase} />
              <Route path={HR.People.Workers} component={WorkersDatabase} />
            </Switch>
          </section>
        </Router> */}
      </main>
    </MainCtx.Provider>
  );
};

export default Main;
