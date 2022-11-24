import { AppCtx } from 'App';
import React, { useContext } from 'react';
import LeaveTable from '../Tables/LeaveTable';

const approverModes = ["approver", "hr admin"];

const LeaveManagement = () => {
  const { userData } = useContext(AppCtx);
console.log({userData})
  const isApprover = approverModes.indexOf(userData.userGroup.name.toLocaleLowerCase()) >= 0;
  return <LeaveTable isApprover={isApprover} />;
};

export default LeaveManagement;
