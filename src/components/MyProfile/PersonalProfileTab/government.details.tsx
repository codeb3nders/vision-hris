import { AssuredWorkloadTwoTone } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useContext } from 'react';
import CollapseWrapper from './collapse.wrapper';
import { TaxExemption } from './../../HRDashboard/EmployeeData';
import GridWrapper from 'CustomComponents/GridWrapper';
import { ProfileCtx } from '../profile.main';

type Props = {};

const GovernmentDetails = (props: Props) => {
  const { isNew, employeeDetails, setEmployeeDetails } = useContext(ProfileCtx);
  return (
    <CollapseWrapper
      panelTitle='Government Details'
      icon={AssuredWorkloadTwoTone}
    >
      <GridWrapper colSize='2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            variant='standard'
            size='small'
            fullWidth
            label='SSS'
            defaultValue={employeeDetails?.sss}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                sss: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            variant='standard'
            size='small'
            fullWidth
            label='PagIBIG'
            defaultValue={employeeDetails?.pagIbig}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                pagIbig: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            variant='standard'
            size='small'
            fullWidth
            label='TIN'
            defaultValue={employeeDetails?.tin}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                tin: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            variant='standard'
            size='small'
            fullWidth
            label='PhilHealth'
            defaultValue={employeeDetails?.philHealth}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                philHealth: e.target.value,
              })
            }
          />
        </div>
        <div className='col-span-2'>
          <FormControl variant='standard' fullWidth size='small'>
            <InputLabel id='tax'>Tax Exemption</InputLabel>
            <Select
              labelId='tax'
              defaultValue={employeeDetails?.taxExemption}
              onChange={(e: any) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  taxExemption: e.target.value,
                })
              }
            >
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
