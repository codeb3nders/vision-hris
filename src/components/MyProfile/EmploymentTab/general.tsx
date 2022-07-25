import { BadgeTwoTone } from '@mui/icons-material';
import GridWrapper from 'CustomComponents/GridWrapper';
import React from 'react';
import CollapseWrapper from './../PersonalProfileTab/collapse.wrapper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TextField } from '@mui/material';

type Props = {};

const General = (props: Props) => {
  const handleChange = () => {};
  return (
    <CollapseWrapper panelTitle='General' icon={BadgeTwoTone} open>
      <GridWrapper colSize='3' className='items-center'>
        <div className='col-span-1'>
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

        <div className='col-span-1'>
          <TextField
            label='Employee Number'
            size='small'
            variant='standard'
            fullWidth
            value='0122'
          />
        </div>
        <div className='col-span-1'>
          <TextField
            label='Years in service'
            size='small'
            variant='standard'
            fullWidth
            value='3.2'
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default General;
