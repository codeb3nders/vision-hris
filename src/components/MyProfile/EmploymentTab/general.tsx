import { BadgeTwoTone } from '@mui/icons-material';
import GridWrapper from 'CustomComponents/GridWrapper';
import React, { useContext, useState } from 'react';
import CollapseWrapper from './../PersonalProfileTab/collapse.wrapper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';
import { ProfileCtx } from '../profile.main';
import moment from 'moment';

type Props = {};

const General = (props: Props) => {
  const [hireDate, setHireDate] = useState<any>(null);
  const { setEmployeeDetails, employeeDetails, isNew } = useContext(ProfileCtx);

  const handleChange = (value: Date | any) => {
    setHireDate(value);
    setEmployeeDetails({
      ...employeeDetails,
      dateHired: moment(value),
    });
  };

  return (
    <CollapseWrapper panelTitle='General' icon={BadgeTwoTone} open>
      <GridWrapper colSize={isNew ? '2' : '3'} className='items-center'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Hire Date'
              onChange={(value: Date | any) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  dateHired: moment(value),
                })
              }
              value={employeeDetails?.dateHired}
              renderInput={(params) => (
                <TextField {...params} fullWidth required variant='standard' />
              )}
            />
          </LocalizationProvider>
        </div>

        {!isNew && (
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
            <TextField
              disabled
              label='Employee Number'
              required
              size='small'
              variant='standard'
              fullWidth
              defaultValue={employeeDetails?.employeeNo}
              onChange={(e: any) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  employeeNo: e.target.value,
                })
              }
            />
          </div>
        )}
        {!isNew && (
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-3'>
            <TextField
              label='Years in service'
              size='small'
              variant='standard'
              fullWidth
              defaultValue={moment(employeeDetails?.dateHired).fromNow()}
            />
          </div>
        )}

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2'>
          <TextField
            required
            label='Company Contact Number'
            size='small'
            variant='standard'
            fullWidth
            defaultValue={employeeDetails?.companyContactNumber}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                companyContactNumber: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2'>
          <TextField
            required
            label='Company Email Address'
            size='small'
            variant='standard'
            fullWidth
            defaultValue={employeeDetails?.companyEmail}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                companyEmail: e.target.value,
              })
            }
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default General;
