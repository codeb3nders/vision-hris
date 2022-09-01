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

type Props = {};

const GovernmentDetails = (props: Props) => {
  const { employeeDetails: details, setEmployeeDetails } =
    useContext(ProfileCtx);

  const employeeDetails = useMemo(() => details, [details]);

  const handleTaxExemption = () => {
    switch (employeeDetails.civilStatus) {
      case 'MARRIED':
        console.log({ dep: employeeDetails.NumberOfDependents });

        const marriedTax =
          employeeDetails.NumberOfDependents > 0
            ? `MARRIED-${employeeDetails.NumberOfDependents}`
            : 'MARRIED';
        setEmployeeDetails((prev: any) => ({
          ...prev,
          taxExemption: marriedTax,
        }));
        break;
      default:
        const singleTax =
          employeeDetails.NumberOfDependents > 0
            ? `SINGLE-${employeeDetails.NumberOfDependents}`
            : 'SINGLE';
        setEmployeeDetails((prev: any) => ({
          ...prev,
          taxExemption: singleTax,
        }));
        break;
    }
  };

  useEffect(() => {
    employeeDetails.NumberOfDependents >= 0 &&
      employeeDetails.civilStatus &&
      handleTaxExemption();
  }, [employeeDetails.NumberOfDependents]);

  return (
    <CollapseWrapper
      panelTitle='Government Details'
      icon={AssuredWorkloadTwoTone}
      open
    >
      <GridWrapper colSize='2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-sss'
            required
            variant='standard'
            size='small'
            fullWidth
            label='SSS'
            value={employeeDetails?.sss}
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
            id='gov-philhealth'
            required
            variant='standard'
            size='small'
            fullWidth
            label='PhilHealth'
            value={employeeDetails?.philHealth}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                philHealth: e.target.value,
              })
            }
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-pagibig'
            required
            variant='standard'
            size='small'
            fullWidth
            label='Pag-IBIG/HMDF'
            value={employeeDetails?.pagIbig}
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
            id='gov-tin'
            required
            variant='standard'
            size='small'
            fullWidth
            label='TIN'
            value={employeeDetails?.tin}
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
            id='gov-no-of-deps'
            required
            variant='standard'
            size='small'
            fullWidth
            type='number'
            label='Number of Dependents'
            value={employeeDetails?.NumberOfDependents}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                NumberOfDependents: e.target.value,
              })
            }
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            id='gov-tax-exemp'
            required
            variant='standard'
            size='small'
            fullWidth
            label='Tax Exemption'
            value={employeeDetails?.taxExemption}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                taxExemption: e.target.value,
              })
            }
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default React.memo(GovernmentDetails);
