import { AlternateEmailTwoTone } from '@mui/icons-material';
import { TextField } from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import { useContext } from 'react';
import { ProfileCtx } from '../profile.main';
import CollapseWrapper from './collapse.wrapper';

type Props = {};

const ContactDetails = (props: Props) => {
  const { isNew } = useContext(ProfileCtx);
  return (
    <CollapseWrapper panelTitle='Contact Details' icon={AlternateEmailTwoTone}>
      <GridWrapper colSize='2'>
        <div className='col-span-2'>
          <TextField label='Address' multiline variant='standard' fullWidth />
        </div>

        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            label='Mobile Number'
            variant='standard'
            fullWidth
            required
            defaultValue={isNew ? null : '801-722-8299'}
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField label='Viber Number' variant='standard' fullWidth />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            label='Email Address'
            variant='standard'
            fullWidth
            required
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
          <TextField
            label='VPDC Email Address'
            variant='standard'
            fullWidth
            defaultValue={isNew ? null : 'jayven.abne@vcdcph.com'}
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default ContactDetails;
