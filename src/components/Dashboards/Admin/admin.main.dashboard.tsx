import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";





import {
  getEmployeesWithLeavesAction as _getEmployeesWithLeavesAction,
  getEmployeesWithLeaveStatus as _getEmployeesWithLeaveStatus,
  getEmployeesWithLeaveItems as _getEmployeesWithLeaveItems,
  getEmployeesWithLeaveError as _getEmployeesWithLeaveError,
  getAllEmployeesAction as _getEmployeesAction,
  getEmployeeStatus as _getEmployeeStatus,
  getEmployeeItems as _getEmployeeItems,
  getEmployeeError as _getEmployeeError

} from "slices"

type Props = {};

const AdminMainDashboard = (props: Props) => {
  const dispatch = useDispatch();


  // Employees
  const getEmployeeStatus = useSelector(_getEmployeeStatus);
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const getEmployeeError = useSelector(_getEmployeeError)


  const getEmployeesWithLeaveStatus = useSelector(_getEmployeesWithLeaveStatus);
  const getEmployeesWithLeaveItems = useSelector(_getEmployeesWithLeaveItems);
  const getEmployeesWithLeaveError = useSelector(_getEmployeesWithLeaveError)



  // Employees
  useEffect(() => {
    if (getEmployeeStatus === "idle") {
      setTimeout(() => {
        dispatch(_getEmployeesAction()); // or add employeeNo as parameter
      }, 5000);



    }
  }, [getEmployeeStatus, dispatch]);


  // Employees with leave
  useEffect(() => {
    if (getEmployeesWithLeaveStatus === "idle") {
      dispatch(_getEmployeesWithLeavesAction()); // or add employeeNo as parameter
    }
  }, [getEmployeesWithLeaveStatus, dispatch]);


  return <div>
    <div>AdminMainDashboard</div>
    <br />
    employees count: {getEmployeeItems.length > 0 && getEmployeeItems.length} <br />
    getEmployeeStatus: {getEmployeeStatus}<br />
    getEmployeeError: {getEmployeeError}<br />
    <br />
    employees with leave count: {getEmployeesWithLeaveStatus} <br />
    employees with leave status: {getEmployeesWithLeaveItems.length}<br />
    employees with leave error: {getEmployeesWithLeaveError}<br />
  </div>
};

export default AdminMainDashboard;
