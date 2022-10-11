/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment, { Moment } from 'moment';
import {
  EditTwoTone,
  EngineeringTwoTone,
  PersonTwoTone,
  SaveTwoTone,
} from '@mui/icons-material';
import { ProfileCtx } from '../profile.main';
import {
  Button,
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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
import { EmployeeDBI, EmployeeI } from 'slices/interfaces/employeeI';
import { AppCtx, consoler } from 'App';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import { UserGroupIcon } from '@heroicons/react/outline';

type Props = {};

const UserAccessGroup = (props: Props) => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);
  const { employeeDetails } = useContext(ProfileCtx);
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const [userGroup, setUserGroup] = useState<string>("");
  const [isApprover, setIsApprover] = useState<boolean>(false);
  const [nonRankAndFileEmployees, setNonRankAndFileEmployees] = useState<any[]>([]);

  useEffect(() => {
    const employees = getEmployeeItems
      .filter((x: EmployeeDBI) => x.rank.name.toLocaleLowerCase() === "rank and file")
      .map((r: EmployeeDBI) => {
        const mi = r.middleName ? r.middleName.charAt(0) : '';
        const full_name = `${r.lastName}, ${r.firstName} ${mi}`;
        return { id: r.employeeNo, label: full_name };
      })
    setNonRankAndFileEmployees(employees);
  }, [getEmployeeItems]);

  useEffect(() => {
    setIsApprover(userGroup.toLocaleLowerCase() === "approver")
  }, [userGroup, employeeDetails.userGroup])

  useEffect(() => {
    setUserGroup(employeeDetails.userGroup.code)
  }, [employeeDetails.userGroup])

  const handleUpdate = async () => {
    try {
      await dispatch(
        updateEmployee({
          params: { userGroup, employeeNo: employeeDetails.employeeNo },
          access_token,
        })
      );
    } catch (error: any) {
      consoler(userGroup, 'red', 'Update Employee User Group Error');
    }
  };

  return (
    <CollapseWrapper
      panelTitle='User Access Group'
      icon={UserGroupIcon}
      contentClassName='p-0'
      open
    >
      <GridWrapper colSize='3' className='items-center p-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <FormControl variant='standard' fullWidth size='small' required>
            <InputLabel id='user_group'>User Group</InputLabel>
            <Select
              required
              labelId='user_group'
              value={userGroup}
              onChange={(e: any) => setUserGroup(e.target.value)}
            >
              {USER_GROUP.map((group) => {
                return <MenuItem value={group} key={group}>{group}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        {isApprover && <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={nonRankAndFileEmployees}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Delegated Approver" variant="standard" />}
          />
        </div>
        }
        {employeeDetails && employeeDetails.userGroup.code.toLocaleLowerCase() !== userGroup.toLocaleLowerCase() && <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <button
            // disabled={!updatedDetails}
            onClick={handleUpdate}
            className='px-4 py-1 bg-green-500 hover:bg-green-400 transition-all duration-200 text-white disabled:bg-gray-300 disabled:cursor-not-allowed rounded-sm'
          >
            Save Changes
          </button>
        </div>
        }
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default React.memo(UserAccessGroup);
