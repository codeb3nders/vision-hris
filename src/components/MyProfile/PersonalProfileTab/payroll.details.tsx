import { AccountBalanceWalletTwoTone } from '@mui/icons-material';
import { TextField } from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import CollapseWrapper from './collapse.wrapper';

type Props = {};

const PayrollDetails = (props: Props) => {
  return (
    <CollapseWrapper
      panelTitle='Payroll Details'
      icon={AccountBalanceWalletTwoTone}
    >
      <GridWrapper colSize='2'>
        <div className='col-span-1'>
          <TextField fullWidth variant='standard' label='Bank Name' />
        </div>
        <div className='col-span-1'>
          <TextField fullWidth variant='standard' label='Account Name' />
        </div>
        <div className='col-span-1'>
          <TextField fullWidth variant='standard' label='Account Number' />
        </div>
        <div className='col-span-1'>
          <TextField fullWidth variant='standard' label='Account Type' />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default PayrollDetails;
