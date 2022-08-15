import { AlternateEmailTwoTone } from '@mui/icons-material';
import { TextField } from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import { useContext } from 'react';
import { ProfileCtx } from '../profile.main';
import CollapseWrapper from './collapse.wrapper';

type Props = {};

const ContactDetails = (props: Props) => {
  const { isNew, employeeDetails, setEmployeeDetails } = useContext(ProfileCtx);
  return (
    <CollapseWrapper panelTitle='Contact Details' icon={AlternateEmailTwoTone}>
      <GridWrapper colSize='2'>
        <div className='col-span-2'>
          <TextField
            label='Address'
            multiline
            variant='standard'
            fullWidth
            defaultValue={employeeDetails?.address}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                address: e.target.value,
              })
            }
          />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            label='Mobile Number'
            variant='standard'
            fullWidth
            required
            defaultValue={employeeDetails?.contactNumber}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                contactNumber: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            label='Viber Number'
            variant='standard'
            fullWidth
            defaultValue={employeeDetails?.viberNo}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                contactNumber: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            label='Email Address'
            variant='standard'
            fullWidth
            required
            type='email'
            defaultValue={employeeDetails?.personalEmail}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                personalEmail: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            type='email'
            label='VPDC Email Address'
            variant='standard'
            fullWidth
            defaultValue={employeeDetails?.companyEmail}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                companyEmail: e.target.value,
              })
            }
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default ContactDetails;
