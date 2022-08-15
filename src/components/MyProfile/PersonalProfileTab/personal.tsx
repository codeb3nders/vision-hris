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
import moment from 'moment';

type Props = {};

const Personal = (props: Props) => {
  const { setEmployeeDetails, employeeDetails, isNew } = useContext(ProfileCtx);

  const handleChange = (value: any) => {
    setEmployeeDetails({
      ...employeeDetails,
      birthDate: moment(value).format('LL'),
    });
  };

  return (
    <CollapseWrapper panelTitle='Personal' icon={AccountCircleTwoTone} open>
      <GridWrapper colSize='6'>
        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-6'>
          <TextField
            required
            label='First Name'
            size='small'
            variant='standard'
            fullWidth
            defaultValue={employeeDetails?.firstName}
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
            defaultValue={employeeDetails?.middleName}
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
            required
            label='Last Name'
            size='small'
            variant='standard'
            fullWidth
            defaultValue={employeeDetails?.lastName}
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
              value={employeeDetails?.birthDate}
              renderInput={(params) => (
                <TextField {...params} fullWidth required variant='standard' />
              )}
            />
          </LocalizationProvider>
        </div>

        <div className='desktop:col-span-3 laptop:col-span-3 phone:col-span-6'>
          <FormControl required fullWidth variant='standard'>
            <InputLabel id='gender'>Gender</InputLabel>
            <Select
              labelId='gender'
              size='small'
              onChange={(e: any) => {
                setEmployeeDetails({
                  ...employeeDetails,
                  gender: e.target.value,
                });
              }}
              defaultValue={employeeDetails?.gender?.toLowerCase() || 'male'}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
          </FormControl>
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default Personal;
