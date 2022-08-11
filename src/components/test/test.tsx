import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";



import {
  createEmployee as _createEmployee, 
  getEmployeesWithLeavesAction as _getEmployeesWithLeavesAction,
  getEmployeesWithLeaveStatus as _getEmployeesWithLeaveStatus,
  getEmployeesWithLeaveItems as _getEmployeesWithLeaveItems,
  getEmployeesWithLeaveError as _getEmployeesWithLeaveError,
  getEmployeesAction as _getEmployeesAction, 
  getEmployeeStatus as _getEmployeeStatus,
  getEmployeeItems as _getEmployeeItems,
  getEmployeeError as _getEmployeeError} from "slices/employees"

  const sampleBody = {
    "employeeNo": new Date().valueOf(),
    "firstName": "Randy",
    "lastName": "Gomez",
    "middleName": "Alegre",
    "fsCode": "FS-04",
    "bioCode": "B-04",
    "position": "PLANNING & SCHEDULING MANAGER",
    "rank": "MANAGERIAL",
    "division": "HEAD OFFICE",
    "department": "Operations Center - Planning & Scheduling ",
    "designation": "HEAD OFFICE",
    "dateHired": "1-Jun-21",
    "yearsInService": 1,
    "employmentStatus": "REGULAR",
    "endOfProbationary": "1-Dec-21",
    "contractEndDate": "1-Dec-23",
    "gender": "MALE",
    "birthDate": "2015-03-25T12:00:00Z",
    "age": 29,
    "contactNumber": "9064195953",
    "taxExemption": "MARRIED",
    "email": "{{$timestamp}}@gmail.com",
    "backAccountNo": "1111111111",
    "civilStatus": "MARRIED",
    "NumberOfDependents": "3",
    "sss": "3443240796",
    "philHealth": "030255293113",
    "pagIbig": "121233972057",
    "tin": "440996953",
    "address": "11 Blk 13 Park Place Ave Park Place Village Cainta Rizal",
    "course": "BS Civil Engineering",
    "educationalAttainment": "COLLEGE GRADUATE",
    "schoolAttended": "2008-2013",
    "licensure": "Civil Engineer",
    "prcIdNo": "PRC-01",
    "noticeOffense": "Notice of offense details",
    "audit201": "201 Audit",
    "remarks": "Some remarks",
    "cocNo": "COC-01",
    "vaccineStatus": "VACCINATED",
    "digitalBulletin": "Member",
    "viberNumber": "093445678",
    "vpdcEmail": "jayven.abne@vcdcph.com",
    "emergencyContactPerson": "Aubrey Q. Abne",
    "emergencyAddress": "11 Block 13 Parkplace Avenue Parkplace Village, Cainta, Rizal",
    "emergencyContactNo": "9954887546"
  }

  const Test = ()=>{
    const dispatch = useDispatch();
    const getEmployeeStatus = useSelector(_getEmployeeStatus);
// Employees
  useEffect(() => {
    if (getEmployeeStatus === "idle") {
      dispatch(_getEmployeesAction()); // or add employeeNo as parameter
    }
  }, [getEmployeeStatus, dispatch]);
    return <h1>test</h1>
  }

const TestX = () => {
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
      dispatch(_getEmployeesAction()); // or add employeeNo as parameter
    }
  }, [getEmployeeStatus, dispatch]);


  // Employees with leave
  useEffect(() => {
    if (getEmployeesWithLeaveStatus === "idle") {
      dispatch(_getEmployeesWithLeavesAction()); // or add employeeNo as parameter
    }
  }, [getEmployeesWithLeaveStatus, dispatch]);


 return <div>
  employees count: {getEmployeeItems.length > 0 && getEmployeeItems.length} <br/>
  getEmployeeStatus: {getEmployeeStatus}<br/>
  getEmployeeError: {getEmployeeError}<br/>

  employees with leave count: {getEmployeesWithLeaveStatus} <br/>
  employees with leave status: {getEmployeesWithLeaveItems.length}<br/>
  employees with leave error: {getEmployeesWithLeaveError}<br/>
 </div>
};

export default TestX;
