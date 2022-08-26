import { PaidTwoTone } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {};

const PayrollInformation = (props: Props) => {
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
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth required>
            <InputLabel>Pay Rate Type</InputLabel>
            <Select label='Pay Rate Type' id='pay-rate-type'>
              <MenuItem value='Bi monthly'>Bi monthly</MenuItem>
              <MenuItem value='Weekly'>Weekly</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth required>
            <InputLabel>Payment Method</InputLabel>
            <Select label='Payment Method' id='payment-method'>
              <MenuItem value='Cash'>Cash</MenuItem>
              <MenuItem value='Check'>Check</MenuItem>
              <MenuItem value='Payroll Account'>Payroll Account</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth required>
            <InputLabel>Payroll Group</InputLabel>
            <Select label='Payroll Group' id='payroll-group'>
              <MenuItem value='Bi monthly'>Bi monthly</MenuItem>
              <MenuItem value='Weekly'>Weekly</MenuItem>
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
            fullWidth
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth required>
            <InputLabel>Deduct Philhealth Contribution</InputLabel>
            <Select
              label='Deduct Philhealth Contribution'
              id='deduct-philhealth'
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
            fullWidth
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 flex flex-row items-center gap-1'>
          <FormControl variant='standard' size='small' fullWidth required>
            <InputLabel>Fixed Contribution Rate</InputLabel>
            <Select label='Fixed Contribution Rate' id='deduct-philhealth'>
              <MenuItem value='Bi monthly'>Bi monthly</MenuItem>
              <MenuItem value='Weekly'>Weekly</MenuItem>
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
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default PayrollInformation;
