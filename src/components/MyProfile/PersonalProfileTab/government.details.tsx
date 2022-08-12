import { AssuredWorkloadTwoTone } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import CollapseWrapper from './collapse.wrapper';
import { TaxExemption } from './../../HRDashboard/EmployeeData';
import GridWrapper from 'CustomComponents/GridWrapper';

type Props = {};

const GovernmentDetails = (props: Props) => {
  return (
    <CollapseWrapper
      panelTitle='Government Details'
      icon={AssuredWorkloadTwoTone}
    >
      <GridWrapper colSize='2'>
        <div className='col-span-1'>
          <TextField variant='standard' size='small' fullWidth label='SSS' />
        </div>
        <div className='col-span-1'>
          <TextField
            variant='standard'
            size='small'
            fullWidth
            label='PagIBIG'
          />
        </div>
        <div className='col-span-1'>
          <TextField variant='standard' size='small' fullWidth label='TIN' />
        </div>
        <div className='col-span-1'>
          <TextField
            variant='standard'
            size='small'
            fullWidth
            label='PhilHealth'
          />
        </div>
        <div className='col-span-2'>
          <FormControl variant='standard' fullWidth size='small'>
            <InputLabel id='tax'>Tax Exemption</InputLabel>
            <Select labelId='tax'>
              {TaxExemption.map((tax) => {
                return <MenuItem value={tax}>{tax}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default GovernmentDetails;
