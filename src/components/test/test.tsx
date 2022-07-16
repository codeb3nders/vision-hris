import env from "environments/env";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeItems, getEmployees } from "slices/employees/getEmployeesSlice";
import {
  getEmployeesWithLeaves,
  getEmployeesWithLeaveStatus,
  getEmployeesWithLeaveError,
  getEmployeesWithLeaveItems,
} from "slices/employees/getEmployeesWithLeaveSlice";

const Test = () => {
  const dispatch = useDispatch();
  const employeesWithLeaveItems = useSelector(getEmployeesWithLeaveItems);
  const employeeStatus = useSelector(getEmployeesWithLeaveStatus);
  const employeeError = useSelector(getEmployeesWithLeaveError);

  const employeeItems = useSelector(getEmployeeItems);  

  useEffect(() => {
    if (employeeStatus === "idle") {
      dispatch(getEmployeesWithLeaves()); // or add employeeNo as parameter
      dispatch(getEmployees()); // or add employeeNo as parameter
    }
  }, [employeeStatus, dispatch]);

  // console.log({ employeesWithLeaveItems });
  // const listItems = employeesWithLeaveItems.map((d) => {
  //   return <li key={d.employeeNo}>{JSON.stringify(d)}</li>;
  // });

 // return <div>{employeeError ? employeeError : listItems}</div>;

 return <div>
  employees with leave count: { employeesWithLeaveItems.length} 
  employees  count: { employeeItems.length}
 </div>
};

export default Test;
