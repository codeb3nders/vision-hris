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

type Props = {};

const UserAccessGroup = (props: Props) => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);
  const { employeeDetails, setIndex, setEmployeeDetails, isNew } = useContext(ProfileCtx);
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const [isApprover, setIsApprover] = useState<boolean>(false);
  const [nonRankAndFileEmployees, setNonRankAndFileEmployees] = useState<any[]>([]);
  const [withUpdate, setWithUpdate] = useState<boolean>(false);
  const [isRehire, setIsRehire] = useState<boolean>(false);
  const [oldEmployeeNo, setOldEmployeeNo] = useState<string>("");
  const [userCredentials, setUserCredentials] = useState<UserCredentialsI>({
    accessGroup: "", employeeNo: "", isActive: true
  })

  useEffect(() => {
    setEmployeeDetails((prev: any) => {
      return {...prev, isRehire}
    })
    if (!isNew) {
      setOldEmployeeNo("")
    }
  }, [isRehire])

  useEffect(() => {
    setIsRehire(employeeDetails.isRehire)
  }, [employeeDetails.isRehire])

  useEffect(() => {
    const employees = getEmployeeItems
      .filter((x: EmployeeDBI) => x.rank.name.toLocaleLowerCase() !== "rank and file")
      .map((r: EmployeeDBI) => {
        const mi = r.middleName ? r.middleName.charAt(0) : '';
        const full_name = `${r.lastName}, ${r.firstName} ${mi}`;
        return { id: r.employeeNo, label: full_name };
      })
    setNonRankAndFileEmployees(employees.sort((a:any, b:any) => a.label.localeCompare(b.label)));
  }, [getEmployeeItems]);

  useEffect(() => {
    if (userCredentials.accessGroup) {
      setIsApprover(userCredentials.accessGroup.toLocaleLowerCase() === "approver")
      if (employeeDetails.userGroup && employeeDetails.userGroup.code.toLocaleLowerCase() !== userCredentials.accessGroup.toLocaleLowerCase()) {
        setWithUpdate(true);
      }
    }
  }, [userCredentials.accessGroup, employeeDetails.userGroup])

  useEffect(() => {
    setUserCredentials({...userCredentials, accessGroup: employeeDetails.userGroup.code, employeeNo: employeeDetails.employeeNo})
  }, [employeeDetails.userGroup])

  const handleUpdate = async () => {
    try {
      const config = {
          headers: { Authorization: `Bearer ${access_token}` },
      };
      const { status, data } = await updateUserCredentialsEndpoint(userCredentials, config);
      console.log({status}, {data})
      // if (status === 200) {
      //   //upsert user credentials
      //   await dispatch(
      //       _getOneEmployeeAction({
      //         access_token,
      //         params: { employeeNo: employeeDetails.employeeNo },
      //       })
      //     );
      //     setIndex("2")
      // }
      await dispatch(updateEmployee(
        {
          params: { userGroup: userCredentials.accessGroup, isRehire, oldEmployeeNo, employeeNo: employeeDetails.employeeNo },
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

  return (
    <CollapseWrapper
      panelTitle='Other Details'
      icon={UserGroupIcon}
      contentClassName='p-0'
      open
    >
      <div className='mb-2 flex flex-row justify-end'>
        <button
          disabled={!withUpdate}
          onClick={handleUpdate}
          className='px-4 py-1 bg-green-500 hover:bg-green-400 transition-all duration-200 text-white disabled:bg-gray-300 disabled:cursor-not-allowed rounded-sm'
        >
          Save Changes
        </button>
      </div>
      <GridWrapper colSize='3' className='items-center p-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <FormControl variant='standard' fullWidth size='small' required>
            <InputLabel id='user_group'>User Group</InputLabel>
            <Select
              required
              labelId='user_group'
              value={userCredentials.accessGroup}
              onChange={(e: any) => setUserCredentials({...userCredentials, accessGroup: e.target.value})}
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
      </GridWrapper>
      <Divider />
      <GridWrapper colSize='3' className='items-center p-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <FormControlLabel control={<Checkbox onChange={(e:any) => setIsRehire(e.target.checked)} />} label="For Rehire" />
        </div>
        {isRehire && <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            id='old-employee-no'
            label='Old Employee No.'
            variant='standard'
            fullWidth
            multiline
            size='small'
            className='col-span-1'
            onChange={(e: any) => {
              setOldEmployeeNo(e.target.value);
              setWithUpdate(true);
            }}
          />
        </div>
        }
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default React.memo(UserAccessGroup);
