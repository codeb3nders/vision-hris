import { BadgeTwoTone } from '@mui/icons-material';
import GridWrapper from 'CustomComponents/GridWrapper';
import React, { useContext } from 'react';
import CollapseWrapper from './../PersonalProfileTab/collapse.wrapper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';
import { ProfileCtx } from '../profile.main';

type Props = {};

const General = (props: Props) => {
  const { setEmployeeDetails, employeeDetails, isNew } = useContext(ProfileCtx);

  const handleChange = (value: Date | any) => {
    setEmployeeDetails({ ...employeeDetails, dateHired: value });
  };

  return (
    <CollapseWrapper panelTitle='General' icon={BadgeTwoTone} open>
      <GridWrapper colSize='3' className='items-center'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Hire Date'
              onChange={handleChange}
              value={new Date()}
              renderInput={(params) => (
                <TextField {...params} fullWidth required variant='standard' />
              )}
            />
          </LocalizationProvider>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <TextField
            label='Employee Number'
            size='small'
            variant='standard'
            fullWidth
            defaultValue={isNew ? null : '0122'}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                employeeNo: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <TextField
            label='Years in service'
            size='small'
            variant='standard'
            fullWidth
            defaultValue={isNew ? null : '3.2'}
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default General;
