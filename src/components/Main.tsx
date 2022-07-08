import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navigation/Navbar';
import Dashboard from './DashboardSwitcher';
import LeaveForm from './EmployeeDashboard/Forms/LeaveForm';
import LeaveTable from './EmployeeDashboard/Tables/LeaveTable';
import OTTable from './EmployeeDashboard/Tables/OTTable';
import LeaveManagement from './EmployeeDashboard/Management/LeaveManagement';
import OTManangement from './EmployeeDashboard/Management/OTManangement';
import EmployeeDatabase from './HRDashboard/EmployeeDatabase';
import WorkersDatabase from './HRDashboard/WorkersDatabase';
import OTForm from './EmployeeDashboard/Forms/OTForm';
import { Path } from 'constants/Path';

const { Employee, Admin, HR, Manager } = Path;

interface Props {}

const Main: React.FC<Props> = () => {
  return (
    <main>
      <Router>
        <Navbar />
        <section className='px-8'>
          <Switch>
            <Route exact path={Employee.Dashboard} component={Dashboard} />
            <Route exact path={Employee.ESS.Leave} component={LeaveTable} />
            <Route exact path={Employee.ESS.LeaveNew} component={LeaveForm} />
            <Route path={Employee.ESS.LeaveType} component={LeaveForm} />
            <Route exact path={Employee.ESS.OT} component={OTTable} />
            <Route path={Employee.ESS.OTNew} component={OTForm} />
            <Route path={Employee.ESS.WorkersOT} component={OTTable} />
            <Route path={Manager.Requests.Leave} component={LeaveManagement} />
            <Route exact path={Manager.Requests.OT} component={OTManangement} />
            <Route path={HR.Requests.Leave} component={LeaveManagement} />
            <Route exact path={HR.Requests.OT} component={OTManangement} />
            <Route
              path={Manager.People.Directory}
              component={EmployeeDatabase}
            />
            <Route path={Manager.People.Team} component={WorkersDatabase} />
            <Route path={HR.People.Directory} component={EmployeeDatabase} />
            <Route path={HR.People.Workers} component={WorkersDatabase} />
          </Switch>
        </section>
      </Router>
    </main>
  );
};

export default Main;
