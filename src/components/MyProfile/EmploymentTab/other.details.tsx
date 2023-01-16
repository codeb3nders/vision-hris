/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { ProfileCtx } from '../profile.main';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import {
  getEmployeeItems as _getEmployeeItems,
  getEmployeeUpdateStatus as _getEmployeeUpdateStatus,
  getEmployeeUpdateError as _getEmployeeUpdateError,
  getOneEmployeeAction as _getOneEmployeeAction,
  resetUpdate, updateEmployee, getEmployeeItems
} from 'slices';
import { USER_GROUP } from 'constants/Values';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import { AppCtx, consoler } from 'App';
import { UserGroupIcon } from '@heroicons/react/outline';
import { updateUserCredentialsEndpoint, UserCredentialsI } from 'apis/userAccess';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';

type Props = {};

const OtherDetails = (props: Props) => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);
  const { employeeDetails, setEmployeeDetails, setIndex } = useContext(ProfileCtx);
  const {isNew} = useContext(EmployeeCtx)
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const [isApprover, setIsApprover] = useState<boolean>(false);
  const [updatedDetails, setUpdatedDetails] = useState<any>({});
  const [withUpdate, setWithUpdate] = useState<boolean>(false);
  const [isRehire, setIsRehire] = useState<boolean>(false);
  const [oldEmployeeNo, setOldEmployeeNo] = useState<string>("");
  const [userCredentials, setUserCredentials] = useState<UserCredentialsI>({
    accessGroup: "", employeeNo: "", isActive: true
  })

  // useEffect(() => {
  //   setEmployeeDetails((prev: any) => {
  //     return {...prev, ...updatedDetails}
  //   })
  // }, [updatedDetails])

  const handleUpdate = async () => {
    try {
      await dispatch(updateEmployee(
        {
          params: { ...updatedDetails },
          where: {employeeNo: employeeDetails.employeeNo},
          access_token
        }))
      await dispatch(
        _getOneEmployeeAction({
          access_token,
          params: { employeeNo: employeeDetails.employeeNo },
        })
      );
      setIndex("2")
    } catch (error: any) {
      consoler({userGroup: userCredentials.accessGroup}, 'red', 'Update Employee User Group Error');
    }
  };
console.log({updatedDetails})
  return (
    <CollapseWrapper
      panelTitle='Other Details'
      icon={UserGroupIcon}
      contentClassName='p-0'
      open
    >
      <div className='mb-2 flex flex-row justify-end'>
        <button
          type='button'
          disabled={Object.keys(updatedDetails).length == 0}
          onClick={handleUpdate}
          className='px-4 py-1 bg-green-500 hover:bg-green-400 transition-all duration-200 text-white disabled:bg-gray-300 disabled:cursor-not-allowed rounded-sm'
        >
          Save Changes
        </button>
      </div>
      <GridWrapper colSize='3' className='items-center p-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='companyEmail'
            name="companyEmail"
            required
            label='Company Email'
            size='small'
            variant='standard'
            onChange={(e: any) => setUpdatedDetails((prev: any) => {
              return {...prev, companyEmail: e.target.value}
            })}
            fullWidth
            defaultValue={employeeDetails.companyEmail}
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='companyContactNumber'
            name="companyContactNumber"
            required
            label='Company Contact Number'
            size='small'
            variant='standard'
            onChange={(e: any) => setUpdatedDetails((prev: any) => {
              return {...prev, companyContactNumber: e.target.value}
            })}
            fullWidth
            defaultValue={employeeDetails.companyContactNumber}
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='userGroup'
            name="userGroup"
            InputProps={{
              readOnly: true,
            }}
            label='User Group'
            size='small'
            variant='standard'
            fullWidth
            value={employeeDetails.userGroup.name}
          />
        </div>
      </GridWrapper>
      <Divider />
      <GridWrapper colSize='3' className='items-center p-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <FormControlLabel control={<Checkbox onChange={(e: any) => {
            setUpdatedDetails({
              oldEmployeeNo: !e.target.checked ? "" : employeeDetails.oldEmployeeNo,
              isRehire: e.target.checked
            });
          }} />} label="For Rehire" />
        </div>
        {updatedDetails.isRehire && <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            id='old-employee-no'
            label='Old Employee No.'
            variant='standard'
            fullWidth
            value={employeeDetails.oldEmployeeNo}
            multiline
            size='small'
            className='col-span-1'
            onChange={(e: any) => {
              setUpdatedDetails({
                oldEmployeeNo: e.target.value
              });
            }}
          />
        </div>
        }
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default React.memo(OtherDetails);
