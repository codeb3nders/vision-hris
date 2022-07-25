import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import CollapseWrapper from './collapse.wrapper';
import { AccountCircleTwoTone } from '@mui/icons-material';
import GridWrapper from 'CustomComponents/GridWrapper';

type Props = {};

const Personal = (props: Props) => {
  const handleChange = () => {};
  return (
    <CollapseWrapper panelTitle='Personal' icon={AccountCircleTwoTone} open>
      <GridWrapper colSize='6'>
        <div className='col-span-2 '>
          <TextField
            label='First Name'
            size='small'
            variant='standard'
            fullWidth
            defaultValue='MARK JAYVEN'
          />
        </div>
        <div className='col-span-2'>
          <TextField
            label='Middle Name'
            size='small'
            variant='standard'
            fullWidth
            defaultValue='LLANERA'
          />
        </div>
        <div className='col-span-2'>
          <TextField
            label='Last Name'
            size='small'
            variant='standard'
            fullWidth
            defaultValue='ABNE'
          />
        </div>

        <div className='col-span-3'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Birthday'
              onChange={handleChange}
              // disabled={loading}
              value={new Date()}
              renderInput={(params) => (
                <TextField {...params} fullWidth required variant='standard' />
              )}
            />
          </LocalizationProvider>
        </div>

        <div className='col-span-3'>
          <FormControl required fullWidth variant='standard'>
            <InputLabel id='gender'>Gender</InputLabel>
            <Select labelId='gender' size='small' defaultValue='Male'>
              <MenuItem value='Male'>Male</MenuItem>
              <MenuItem value='Female'>Female</MenuItem>
            </Select>
          </FormControl>
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default Personal;
