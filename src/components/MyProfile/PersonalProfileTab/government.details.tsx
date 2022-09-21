/* eslint-disable react-hooks/exhaustive-deps */
import { AssuredWorkloadTwoTone } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useContext, useEffect, useMemo } from 'react';
import CollapseWrapper from './collapse.wrapper';
import GridWrapper from 'CustomComponents/GridWrapper';
import { ProfileCtx } from '../profile.main';
import { EmployeeI } from 'slices/interfaces/employeeI';

type Props = {};

const GovernmentDetails = (props: Props) => {
  const {
    employeeDetails,
    setEmployeeDetails,
    isOwner,
    isNew,
    setUpdatedDetails, getIcon, updatedDetails
  } = useContext(ProfileCtx);

  const handleTaxExemption = () => {
    console.log({ dep: employeeDetails.numberOfDependents });
    if (employeeDetails.civilStatus.code.toLocaleLowerCase() == 'married') {
      const marriedTax =
        employeeDetails.numberOfDependents !== undefined && employeeDetails.numberOfDependents > 0
          ? `MARRIED-${employeeDetails.numberOfDependents}`
          : 'MARRIED';
      handleChange({taxExemption: marriedTax})
    } else {
      const singleTax =
        employeeDetails.numberOfDependents !== undefined && employeeDetails.numberOfDependents > 0
          ? `SINGLE-${employeeDetails.numberOfDependents}`
          : 'SINGLE';
      handleChange({taxExemption: singleTax})
    }
  };

  useEffect(() => {
    if (employeeDetails.numberOfDependents && employeeDetails.civilStatus) {
      handleTaxExemption();
    } else {
      setEmployeeDetails((prev: any) => ({
        ...prev,
        taxExemption: '',
      }));
    }
  }, [employeeDetails.numberOfDependents, employeeDetails.civilStatus]);

  const handleChange = (value: any) => {
    !isNew &&
      setUpdatedDetails((prev: any) => ({
        ...prev,
        ...value
      }))
    setEmployeeDetails((prev: EmployeeI) => ({
      ...prev,
      ...value
    }));
  };

  return (
    <CollapseWrapper
      panelTitle='Government Details'
      icon={() => getIcon(<AssuredWorkloadTwoTone />, "")}
      open
    >
      <GridWrapper colSize='2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-sss'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            label='SSS'
            value={employeeDetails?.sss}
            onChange={(e: any) => handleChange({ sss: e.target.value})}
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-philhealth'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            label='PhilHealth'
            value={employeeDetails?.philHealth}
            onChange={(e: any) => handleChange({ philHealth: e.target.value})}
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-pagibig'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            label='Pag-IBIG/HMDF'
            value={employeeDetails?.pagIbig}
            onChange={(e: any) => handleChange({ pagIbig: e.target.value})}
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-tin'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            label='TIN'
            value={employeeDetails?.tin}
            onChange={(e: any) => handleChange({ tin: e.target.value})}
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-no-of-deps'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            type='number'
            label='Number of Dependents'
            value={employeeDetails?.numberOfDependents}
            onChange={(e: any) => handleChange({ numberOfDependents: e.target.value})}
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-tax-exemp'
            required={isOwner}
            variant='standard'
            size='small'
            fullWidth
            disabled
            label='Tax Exemption'
            value={employeeDetails?.taxExemption}
            onChange={(e: any) => handleChange({ taxExemption: e.target.value})}
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default React.memo(GovernmentDetails);
