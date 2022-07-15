import env from 'environments/env';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getEmployeeItems, getEmployeesWithLeaves, getError, getStatus,  } from 'slices/employees/getEmployeesWithLeaveSlice';



const Test = () => {
  const dispatch = useDispatch()
  const employeeItems = useSelector(getEmployeeItems)
  const employeeStatus = useSelector(getStatus)
  const employeeError = useSelector(getError)

  useEffect(() => {
    if(employeeStatus==='idle'){
      dispatch(getEmployeesWithLeaves())
    }
  
  
  }, [employeeStatus, dispatch])
  
console.log({env})
  const listItems = employeeItems.map((d) => {
  console.log({d})
  return <li key={d.employeeNo}>{JSON.stringify(d) }</li>});

  return (
    <div>
    {employeeError ? employeeError : listItems}
    </div>
  );
  
};

export default Test;
