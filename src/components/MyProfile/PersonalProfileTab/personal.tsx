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
import { useContext, useState } from 'react';
import { ProfileCtx } from '../profile.main';
import moment from 'moment';
import { CIVIL_STATUS, HIGHEST_EDUCATION, RELIGION } from 'constants/Values';

type Props = {};

const Personal = (props: Props) => {
  const { setEmployeeDetails, employeeDetails } = useContext(ProfileCtx);
  const [otherReligion, setOtherReligion] = useState<boolean>(false);

  const handleReligion = (e: any) => {
    if (e.target.value !== 'Others, please specify') {
      setOtherReligion(false);
      setEmployeeDetails({
        ...employeeDetails,
        religion: e.target.value,
      });
    } else {
      setOtherReligion(true);
    }
  };

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
              defaultValue={employeeDetails?.gender}
            >
              <MenuItem value='MALE'>Male</MenuItem>
              <MenuItem value='FEMALE'>Female</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-3 laptop:col-span-3 phone:col-span-6'>
          <FormControl required fullWidth variant='standard'>
            <InputLabel id='civil_status'>Civil Status</InputLabel>
            <Select
              labelId='civil_status'
              size='small'
              onChange={(e: any) => {
                setEmployeeDetails({
                  ...employeeDetails,
                  civilStatus: e.target.value,
                });
              }}
              defaultValue={employeeDetails?.civilStatus}
            >
              {CIVIL_STATUS.map((status) => {
                return <MenuItem value={status}>{status}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-3 laptop:col-span-3 phone:col-span-6'>
          <FormControl required fullWidth variant='standard'>
            <InputLabel id='religion'>Religion</InputLabel>
            <Select
              labelId='religion'
              size='small'
              onChange={handleReligion}
              defaultValue={employeeDetails?.religion}
            >
              {RELIGION.map((religion) => {
                return <MenuItem value={religion}>{religion}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>

        {otherReligion && (
          <>
            <div className='desktop:col-span-3 laptop:col-span-3 phone:col-span-6'></div>
            <div className='desktop:col-span-3 laptop:col-span-3 phone:col-span-6'>
              <TextField
                label='Please specify your religion.'
                size='small'
                variant='standard'
                fullWidth
                // defaultValue={employeeDetails?.religion}
                onChange={(e: any) =>
                  setEmployeeDetails({
                    ...employeeDetails,
                    religion: e.target.value,
                  })
                }
              />
            </div>
          </>
        )}

        <div className='desktop:col-span-3 laptop:col-span-3 phone:col-span-6'>
          <FormControl required fullWidth variant='standard'>
            <InputLabel id='educational_attainment'>
              Highest Educational Attainment
            </InputLabel>
            <Select
              labelId='educational_attainment'
              size='small'
              onChange={(e: any) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  highestEducationalAttainment: e.target.value,
                })
              }
              defaultValue={employeeDetails?.highestEducationalAttainment}
            >
              {HIGHEST_EDUCATION.map((education) => {
                return <MenuItem value={education}>{education}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-3 laptop:col-span-3 phone:col-span-6'>
          <TextField
            required
            label='Citizenship'
            size='small'
            variant='standard'
            fullWidth
            defaultValue={employeeDetails?.citizenship}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                citizenship: e.target.value,
              })
            }
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default Personal;
