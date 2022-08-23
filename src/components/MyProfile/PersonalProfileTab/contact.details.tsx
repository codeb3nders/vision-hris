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
            defaultValue={employeeDetails?.personalContactNumber}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                personalContactNumber: e.target.value,
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
            disabled
            type='email'
            label='VPDC Email Address'
            variant='standard'
            fullWidth
            className='VPDC_EMAIL [&>div>input>div]:!text-black'
            defaultValue={employeeDetails?.companyEmail}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                companyEmail: e.target.value,
              })
            }
            sx={{
              '& .Mui-disabled': {
                '-webkit-text-fill-color': 'black',
                color: 'black',
              },
              '& .MuiInputLabel-root': {
                '-webkit-text-fill-color': 'rgba(0,0,0,.6)',
                color: 'rgba(0,0,0,.6)',
              },
            }}
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default ContactDetails;
