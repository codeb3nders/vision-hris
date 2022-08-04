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
import { useContext } from 'react';
import { ProfileCtx } from '../profile.main';

type Props = {};

const Personal = (props: Props) => {
  const { setEmployeeDetails, employeeDetails, isNew } = useContext(ProfileCtx);
  const handleChange = () => {};
  return (
    <CollapseWrapper
      panelTitle='Personal'
      icon={AccountCircleTwoTone}
      open
      // className='phone:border-0 desktop:border laptop:border'
      // contentClassName='!border-0'
    >
      <GridWrapper colSize='6'>
        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-6'>
          <TextField
            label='First Name'
            size='small'
            variant='standard'
            fullWidth
            defaultValue={isNew ? null : 'JOHN'}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-6'>
          <TextField
            label='Middle Name'
            size='small'
            variant='standard'
            fullWidth
            defaultValue={null}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                middleName: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-6'>
          <TextField
            label='Last Name'
            size='small'
            variant='standard'
            fullWidth
            defaultValue={isNew ? null : 'DOE'}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                lastName: e.target.value,
              })
            }
          />
        </div>

        <div className='desktop:col-span-3 laptop:col-span-3 phone:col-span-6'>
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

        <div className='desktop:col-span-3 laptop:col-span-3 phone:col-span-6'>
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
