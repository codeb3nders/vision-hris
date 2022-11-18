import { PaidTwoTone } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';
import GridWrapper from 'CustomComponents/GridWrapper';
import { useContext, useEffect, useState } from 'react';
import { EmployeeI } from 'slices/interfaces/employeeI';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { ProfileCtx } from '../profile.main';

type Props = {};

const PayrollInformation = (props: Props) => {
  const { setEmployeeDetails, employeeDetails, setUpdatedDetails, getIcon, enums } =
    useContext(ProfileCtx);
  const { isNew } = useContext(EmployeeCtx);
  const [payrollGroup, setPayrollGroup] = useState<any[]>([])
  const [paymentMethod, setPaymentMethod] = useState<any[]>([])
  
  useEffect(() => {
    setPayrollGroup(enums.payroll_group);
    setPaymentMethod(enums.payment_method);
  }, [enums]);
  
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
      panelTitle='Payroll Information'
      icon={() => getIcon(<PaidTwoTone />, "PayrollInfo")}
      contentClassName='p-0'
    >
      <GridWrapper colSize='2'>
        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <span className='text-xs translate-y-2'>PHP</span>
          <TextField
            id='basic-pay-amount'
            // required
            variant='standard'
            size='small'
            label='Basic Pay Amount'
            fullWidth
            value={employeeDetails.basicPay || null}
            onChange={(e: any) => handleChange({ basicPay: e.target.value})}
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth>
            <InputLabel>Pay Rate Type</InputLabel>
            <Select
              label='Pay Rate Type'
              id='pay-rate-type'
              value={employeeDetails?.payRateType?.code || employeeDetails.payRateType}
              onChange={(e: any) => handleChange({ payRateType: e.target.value})}
            >
              {
                payrollGroup.map((o: any, i:number) => {
                  return <MenuItem id={`payRateType-${i}`} key={`payRateType-${i}`} value={o.code}>{ o.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth>
            <InputLabel>Payment Method</InputLabel>
            <Select
              label='Payment Method'
              id='payment-method'
              value={employeeDetails?.paymentMethod?.code || employeeDetails.paymentMethod}
              onChange={(e: any) => handleChange({ paymentMethod: e.target.value})}
            >
              {
                paymentMethod.map((o: any, i:number) => {
                  return <MenuItem id={`paymentMethod-${i}`} key={`paymentMethod-${i}`}  value={o.code}>{ o.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth>
            <InputLabel>Payroll Group</InputLabel>
            <Select
              label='Payroll Group'
              id='payroll-group'
              value={employeeDetails?.payrollGroup?.code || employeeDetails.payrollGroup}
              onChange={(e: any) => handleChange({ payrollGroup: e.target.value})}
            >
              {
                payrollGroup.map((o: any, i:number) => {
                  return <MenuItem id={`payrollGroup-${i}`} key={`payrollGroup-${i}`} value={o.code}>{ o.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>

        <div className='font-bold text-sm my-1 mt-2 col-span-2'>Deductions</div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <span className='text-xs translate-y-2'>PHP</span>
          <TextField
            id='deduct-sss'
            // required
            variant='standard'
            size='small'
            label='Deduct For SSS Contribution'
            value={employeeDetails.deductionSSS || null}
            fullWidth
            onChange={(e: any) => handleChange({ deductionSSS: e.target.value})}
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth>
            <InputLabel>Deduct Philhealth Contribution</InputLabel>
            <Select
              label='Deduct Philhealth Contribution'
              value={employeeDetails?.deductPhilhealth?.code || employeeDetails.deductPhilhealth}
              id='deduct-philhealth'
              onChange={(e: any) => handleChange({ deductPhilhealth: e.target.value})}
            >
              {
                payrollGroup.map((o: any, i:number) => {
                  return <MenuItem id={`deductPhilhealth-${i}`} key={`deductPhilhealth-${i}`} value={o.code}>{ o.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <span className='text-xs translate-y-2'>PHP</span>
          <TextField
            id='deduct-pagibig'
            // required
            variant='standard'
            size='small'
            label='Deduct Pag-IBIG/HMDF Contribution'
            value={employeeDetails.deductHMDF || null}
            fullWidth
            onChange={(e: any) => handleChange({ deductHMDF: e.target.value})}
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth>
            <InputLabel>Fixed Contribution Rate</InputLabel>
            <Select
              label='Fixed Contribution Rate'
              id='deduct-philhealth'
              value={employeeDetails?.fixedContributionRate?.code || employeeDetails.fixedContributionRate}
              onChange={(e: any) => handleChange({ fixedContributionRate: e.target.value})}
            >
              {
                payrollGroup.map((o: any, i:number) => {
                  return <MenuItem id={`fixedContributionRate-${i}`} key={`fixedContributionRate-${i}`} value={o.code}>{ o.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <span className='text-xs translate-y-2'>PHP</span>
          <TextField
            id='deduct-tax'
            // required
            variant='standard'
            size='small'
            label='Deduct Withholding Tax'
            fullWidth
            value={employeeDetails.deductWithholdingTax || null}
            onChange={(e: any) => handleChange({ deductWithholdingTax: e.target.value})}
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default PayrollInformation;
