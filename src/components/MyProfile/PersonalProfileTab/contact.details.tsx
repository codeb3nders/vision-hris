import { AlternateEmailTwoTone } from '@mui/icons-material';
import { TextField } from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import CollapseWrapper from './collapse.wrapper';

type Props = {};

const ContactDetails = (props: Props) => {
  return (
    <CollapseWrapper panelTitle='Contact Details' icon={AlternateEmailTwoTone}>
      <GridWrapper colSize='2'>
        <div className='col-span-2'>
          <TextField label='Address' multiline variant='standard' fullWidth />
        </div>

        <div className='col-span-1'>
          <TextField
            label='Mobile Number'
            variant='standard'
            fullWidth
            required
            defaultValue='801-722-8299'
          />
        </div>
        <div className='col-span-1'>
          <TextField label='Viber Number' variant='standard' fullWidth />
        </div>
        <div className='col-span-1'>
          <TextField
            label='Email Address'
            variant='standard'
            fullWidth
            required
          />
        </div>
        <div className='col-span-1'>
          <TextField
            label='VPDC Email Address'
            variant='standard'
            fullWidth
            defaultValue='jayven.abne@vcdcph.com'
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default ContactDetails;
