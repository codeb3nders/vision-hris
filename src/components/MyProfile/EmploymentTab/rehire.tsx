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
  FormControlLabel,
  Checkbox,
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

const Rehire = (props: Props) => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);
  const { employeeDetails, setEmployeeDetails, isNew } = useContext(ProfileCtx);
  const [isRehire, setIsRehire] = useState<boolean>(false);
  const [oldEmployeeNo, setOldEmployeeNo] = useState<string>("");

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

  const handleUpdate = async () => {
    const params:any = { isRehire, oldEmployeeNo, employeeNo: employeeDetails.employeeNo }
    try {
      await dispatch(
        updateEmployee({
          params,
          access_token,
        })
      );
    } catch (error: any) {
      consoler(params, 'red', 'Update Employee Rehire Error');
    }
  };

  return (
      <GridWrapper colSize='3' className='items-center p-2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <FormControlLabel control={<Checkbox onChange={(e:any) => setIsRehire(e.target.checked)} />} label="For Rehire" />
        </div>
        {isRehire && <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            id='old-employeeNo'
            label='Old Employee No.'
            variant='standard'
            fullWidth
            multiline
            size='small'
            className='col-span-1'
            onChange={(e: any) => {
              setEmployeeDetails((prev: any) => ({
                ...prev,
                oldEmployeeNo: e.target.value,
              }));
              !isNew && setOldEmployeeNo(e.target.value);
            }}
            defaultValue={employeeDetails.oldEmployeeNo}
          />
        </div>
        }
        {!isNew && <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
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
  )
};

export default React.memo(Rehire);
