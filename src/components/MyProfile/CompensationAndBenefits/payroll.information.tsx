import { PaidTwoTone } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import { useContext } from 'react';
import { EmployeeI } from 'slices/interfaces/employeeI';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { ProfileCtx } from '../profile.main';

type Props = {};

const PayrollInformation = (props: Props) => {
  const { setEmployeeDetails, employeeDetails } = useContext(ProfileCtx);

  return (
    <CollapseWrapper
      panelTitle='Payroll Information'
      icon={PaidTwoTone}
      contentClassName='p-0'
    >
      <GridWrapper colSize='2'>
        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <span className='text-xs translate-y-2'>PHP</span>
          <TextField
            id='basic-pay-amount'
            required
            variant='standard'
            size='small'
            label='Basic Pay Amount'
            fullWidth
            value={employeeDetails.basicPay}
            onChange={(e: any) =>
              setEmployeeDetails((prev: EmployeeI) => ({
                ...prev,
                basicPay: e.target.value,
              }))
            }
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth required>
            <InputLabel>Pay Rate Type</InputLabel>
            <Select
              label='Pay Rate Type'
              id='pay-rate-type'
              value={employeeDetails.payRateType}
              onChange={(e: any) =>
                setEmployeeDetails((prev: EmployeeI) => ({
                  ...prev,
                  payRateType: e.target.value,
                }))
              }
            >
              <MenuItem id='type-bi-monthly' value='Bi monthly'>
                Bi monthly
              </MenuItem>
              <MenuItem id='type-weekly' value='Weekly'>
                Weekly
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth required>
            <InputLabel>Payment Method</InputLabel>
            <Select
              label='Payment Method'
              id='payment-method'
              value={employeeDetails.paymentMethod}
              onChange={(e: any) =>
                setEmployeeDetails((prev: EmployeeI) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
            >
              <MenuItem value='Cash' id='cash'>
                Cash
              </MenuItem>
              <MenuItem value='Check' id='check'>
                Check
              </MenuItem>
              <MenuItem value='Payroll Account' id='payroll-account'>
                Payroll Account
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth required>
            <InputLabel>Payroll Group</InputLabel>
            <Select
              label='Payroll Group'
              value={employeeDetails.payrollGroup}
              id='payroll-group'
              onChange={(e: any) =>
                setEmployeeDetails((prev: EmployeeI) => ({
                  ...prev,
                  payrollGroup: e.target.value,
                }))
              }
            >
              <MenuItem id='group-bi-monthly' value='Bi monthly'>
                Bi monthly
              </MenuItem>
              <MenuItem id='group-weekly' value='Weekly'>
                Weekly
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='font-bold text-sm my-1 mt-2 col-span-2'>Deductions</div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <span className='text-xs translate-y-2'>PHP</span>
          <TextField
            id='deduct-sss'
            required
            variant='standard'
            size='small'
            label='Deduct For SSS Contribution'
            value={employeeDetails.deductionSSS}
            fullWidth
            onChange={(e: any) =>
              setEmployeeDetails((prev: EmployeeI) => ({
                ...prev,
                deductionSSS: e.target.value,
              }))
            }
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth required>
            <InputLabel>Deduct Philhealth Contribution</InputLabel>
            <Select
              label='Deduct Philhealth Contribution'
              value={employeeDetails.deductPhilhealth}
              id='deduct-philhealth'
              onChange={(e: any) =>
                setEmployeeDetails((prev: EmployeeI) => ({
                  ...prev,
                  deductPhilhealth: e.target.value,
                }))
              }
            >
              <MenuItem value='Bi monthly'>Bi monthly</MenuItem>
              <MenuItem value='Weekly'>Weekly</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <span className='text-xs translate-y-2'>PHP</span>
          <TextField
            id='deduct-pagibig'
            required
            variant='standard'
            size='small'
            label='Deduct Pag-IBIG/HMDF Contribution'
            value={employeeDetails.deductHMDF}
            fullWidth
            onChange={(e: any) =>
              setEmployeeDetails((prev: EmployeeI) => ({
                ...prev,
                deductHMDF: e.target.value,
              }))
            }
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth required>
            <InputLabel>Fixed Contribution Rate</InputLabel>
            <Select
              label='Fixed Contribution Rate'
              id='deduct-philhealth'
              value={employeeDetails.fixedContributionRate}
              onChange={(e: any) =>
                setEmployeeDetails((prev: EmployeeI) => ({
                  ...prev,
                  fixedContributionRate: e.target.value,
                }))
              }
            >
              <MenuItem id='contrib-bi-monthly' value='Bi monthly'>
                Bi monthly
              </MenuItem>
              <MenuItem id='contrib-weekly' value='Weekly'>
                Weekly
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <span className='text-xs translate-y-2'>PHP</span>
          <TextField
            id='deduct-tax'
            required
            variant='standard'
            size='small'
            label='Deduct Withholding Tax'
            fullWidth
            value={employeeDetails.deductWithholdingTax}
            onChange={(e: any) =>
              setEmployeeDetails((prev: EmployeeI) => ({
                ...prev,
                deductWithholdingTax: e.target.value,
              }))
            }
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default PayrollInformation;
