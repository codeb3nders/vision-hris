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

interface Props {}

const Main: React.FC<Props> = () => {
  return (
    <main>
      <Router>
        <Navbar />
        <section className='px-8'>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route
              exact
              path='/ess/leave-applications'
              component={LeaveTable}
            />
            <Route
              exact
              path='/ess/leave-applications/new'
              component={LeaveForm}
            />
            <Route
              path='/ess/leave-applications/new?type=:type'
              component={LeaveForm}
            />
            <Route exact path='/ess/ot-applications' component={OTTable} />
            <Route path='/ess/ot-applications/new' component={OTForm} />
            <Route
              path='/manage/leave-applications'
              component={LeaveManagement}
            />
            <Route
              path='/requests/leave-applications'
              component={LeaveManagement}
            />
            <Route
              exact
              path='/manage/ot-applications'
              component={OTManangement}
            />
            <Route
              exact
              path='/requests/ot-applications'
              component={OTManangement}
            />
            <Route path='/employees' component={EmployeeDatabase} />
            <Route path='/workers' component={WorkersDatabase} />
          </Switch>
        </section>
      </Router>
    </main>
  );
};

export default Main;
