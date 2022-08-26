import { AccountBalanceWalletTwoTone } from '@mui/icons-material';
import { TextField } from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import { useContext } from 'react';
import { ProfileCtx } from '../profile.main';
import CollapseWrapper from './collapse.wrapper';

type Props = {};

const PayrollDetails = (props: Props) => {
  const { employeeDetails, setEmployeeDetails } = useContext(ProfileCtx);

  return (
    <CollapseWrapper
      panelTitle='Payroll Account Details'
      icon={AccountBalanceWalletTwoTone}
    >
      <GridWrapper colSize='2'>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            id='payroll-bank-name'
            fullWidth
            variant='standard'
            label='Bank Name'
            defaultValue={employeeDetails?.payrollBankAccount?.bankName}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                payrollBankAccount: {
                  ...employeeDetails?.payrollBankAccount,
                  bankName: e.target.value,
                },
              })
            }
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            id='payroll-bank-branch'
            fullWidth
            variant='standard'
            label='Bank Branch'
            defaultValue={employeeDetails?.payrollBankAccount?.accountType}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                payrollBankBranch: {
                  ...employeeDetails?.payrollBankBranch,
                  bankName: e.target.value,
                },
              })
            }
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            id='payroll-account-name'
            fullWidth
            variant='standard'
            label='Account Name'
            defaultValue={employeeDetails?.payrollBankAccount?.accountName}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                payrollBankAccount: {
                  ...employeeDetails?.payrollBankAccount,
                  accountName: e.target.value,
                },
              })
            }
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            required
            id='payroll-account-number'
            fullWidth
            variant='standard'
            label='Account Number'
            defaultValue={employeeDetails?.payrollBankAccount?.accountNumber}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                payrollBankAccount: {
                  ...employeeDetails?.payrollBankAccount,
                  accountNumber: e.target.value,
                },
              })
            }
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default PayrollDetails;
