/* eslint-disable react-hooks/exhaustive-deps */
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import CollapseWrapper from './collapse.wrapper';
import { AccountCircleTwoTone } from '@mui/icons-material';
import GridWrapper from 'CustomComponents/GridWrapper';
import { useContext, useEffect, useState } from 'react';
import { ProfileCtx } from '../profile.main';
import { EmployeeI } from 'slices/interfaces/employeeI';
import Address from './address';

type Props = {};

const Personal = (props: Props) => {
  const { setEmployeeDetails, employeeDetails, isOwner, enums } = useContext(ProfileCtx);
  const [otherReligion, setOtherReligion] = useState<boolean>(false);
  const [sameAddress, setSameAddress] = useState<boolean>(false);
  const [philData, setPhilData] = useState<any>(null);
  const [citizenship, setCitizenship] = useState<any[]>([])
  const [civilStatus, setCivilStatus] = useState<any[]>([])
  const [religion, setReligion] = useState<any[]>([])

  useEffect(() => {
    setCitizenship(enums.citizenship)
    setCivilStatus(enums.civil_status)
    setReligion(enums.religions)
  }, [enums])

  useEffect(() => {
    if (sameAddress) {
      setEmployeeDetails((prev: any) => ({
        ...prev,
        permanentRegion: prev.presentRegion,
        permanentProvince: prev.presentProvince,
        permanentMunicipality: prev.presentMunicipality,
        permanentBarangay: prev.presentBarangay,
      }));
    } else {
      setEmployeeDetails((prev: EmployeeI) => ({
        ...prev,
        permanentResidenceAddress: '',
      }));
    }
  }, [sameAddress]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(
      '/philippine_provinces_cities_municipalities_and_barangays_2019v2.json',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        const dataList: any = [];

        for (const key in data) {
          if (data?.hasOwnProperty.call(data, key)) {
            const region = data[key];
            const province_list = region.province_list;
            const provinces: any = [];

            for (const provinceKey in province_list) {
              if (
                province_list?.hasOwnProperty.call(province_list, provinceKey)
              ) {
                const province = province_list[provinceKey];
                const municipality_list = province.municipality_list;
                const municipalities: any = [];

                for (const municipalityKey in municipality_list) {
                  if (
                    municipality_list?.hasOwnProperty.call(
                      municipality_list,
                      municipalityKey
                    )
                  ) {
                    const municipality = municipality_list[municipalityKey];
                    municipalities.push({
                      ...municipality,
                      id: municipalityKey,
                    });
                  }
                }

                provinces.push({
                  ...province,
                  municipality_list: municipalities,
                  id: provinceKey,
                });
              }
            }
            provinces.length > 0 &&
              dataList.push({ ...region, id: key, province_list: provinces });
          }
        }
        setPhilData(dataList);
      });
  };

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
    setEmployeeDetails(employeeDetails);
  };

  return (
    <CollapseWrapper
      panelTitle='Personal Information'
      icon={AccountCircleTwoTone}
      open
    >
      <GridWrapper colSize='7'>
        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-7'>
          <TextField
            id='first-name'
            required
            label='First Name'
            size='small'
            variant='standard'
            fullWidth
            value={employeeDetails.firstName}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-7'>
          <TextField
            id='middle-name'
            label='Middle Name'
            size='small'
            variant='standard'
            fullWidth
            value={employeeDetails?.middleName}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                middleName: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-7'>
          <TextField
            id='last-name'
            required
            label='Last Name'
            size='small'
            variant='standard'
            fullWidth
            value={employeeDetails?.lastName}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                lastName: e.target.value,
              })
            }
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-7'>
          <TextField
            id='name-suffix'
            label='Suffix (If any)'
            size='small'
            variant='standard'
            fullWidth
            value={employeeDetails?.suffix}
            onChange={(e: any) =>
              setEmployeeDetails({
                ...employeeDetails,
                suffix: e.target.value,
              })
            }
          />
        </div>

        <div className='desktop:col-span-3 laptop:col-span-3 phone:col-span-6'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Birthdate'
              onChange={handleChange}
              // disabled={loading}
              value={employeeDetails?.birthDate || null}
              renderInput={(params) => (
                <TextField
                  id='birthday'
                  {...params}
                  fullWidth
                  required
                  variant='standard'
                />
              )}
            />
          </LocalizationProvider>
        </div>

        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-7'>
          <FormControl required fullWidth variant='standard'>
            <InputLabel id='gender'>Gender</InputLabel>
            <Select
              id='gender'
              labelId='gender'
              size='small'
              onChange={(e: any) => {
                setEmployeeDetails({
                  ...employeeDetails,
                  gender: e.target.value,
                });
              }}
              value={employeeDetails?.gender}
            >
              <MenuItem value='MALE'>Male</MenuItem>
              <MenuItem value='FEMALE'>Female</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-7'>
          <FormControl required fullWidth variant='standard'>
            <InputLabel id='civil_status'>Civil Status</InputLabel>
            <Select
              id='civil-status'
              labelId='civil_status'
              size='small'
              onChange={(e: any) => {
                setEmployeeDetails({
                  ...employeeDetails,
                  civilStatus: e.target.value,
                });
              }}
              value={employeeDetails?.civilStatus}
            >
              {civilStatus.map((status) => {
                return <MenuItem key={status._id} value={status.code}>{status.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>

        <GridWrapper
          colSize='2'
          className='desktop:col-span-7 laptop:col-span-7 phone:col-span-7'
        >
          <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2'>
            <FormControl required={isOwner} fullWidth variant='standard'>
              <InputLabel id='citizenship'>Citizenship</InputLabel>
              <Select
                id='citizenship'
                labelId='citizenship'
                size='small'
                onChange={(e: any) => {
                  setEmployeeDetails({
                    ...employeeDetails,
                    citizenship: e.target.value,
                  });
                }}
                value={employeeDetails?.citizenship || "Philippines"}
              >
                {citizenship.map((c: any, idx: number) => {
                  return (
                    <MenuItem key={`${c._id}~${idx}`} value={c.code}>
                      {c.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2'>
            <FormControl required={isOwner} fullWidth variant='standard'>
              <InputLabel id='religion'>Religion</InputLabel>
              <Select
                id='religion'
                labelId='religion'
                size='small'
                onChange={handleReligion}
                value={employeeDetails?.religion}
              >
                {religion.map((religion) => {
                  return <MenuItem key={religion._id} value={religion.code}>{religion.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>

          {otherReligion && (
            <>
              <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2 phone:hidden desktop:block laptop:block'></div>
              <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2'>
                <TextField
                  id='other-religion'
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

          <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2'>
            <TextField
              id='personal-contact-no'
              required
              label='Personal Contact Number'
              size='small'
              variant='standard'
              fullWidth
              value={employeeDetails?.personalContactNumber}
              onChange={(e: any) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  personalContactNumber: e.target.value,
                })
              }
            />
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2'>
            <TextField
              id='personal-email'
              required
              label='Personal Email Address'
              size='small'
              variant='standard'
              fullWidth
              value={employeeDetails?.personalEmail}
              onChange={(e: any) =>
                setEmployeeDetails({
                  ...employeeDetails,
                  personalEmail: e.target.value,
                })
              }
            />
          </div>

          <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-2'>
            <h5 className='text-sm col-span-2 mt-4'>
              Present Residence Address
            </h5>
            <Address data={philData} />
          </div>

          <h5 className='text-sm col-span-2'>Permanent Residence Address</h5>
          <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-2 grid grid-cols-8 gap-2 items-center'>
            <span className='text-xs desktop:col-span-2 laptop:col-span-2 phone:col-span-8'>
              Same as Present Address?
            </span>{' '}
            <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-4'>
              <Checkbox
                size='small'
                id='address-yes'
                checked={sameAddress}
                onChange={() => setSameAddress(true)}
              />
              <label htmlFor='address-yes'>Yes</label>
            </div>
            <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-4'>
              <Checkbox
                size='small'
                id='address-no'
                checked={!sameAddress}
                onChange={() => setSameAddress(false)}
              />
              <label htmlFor='address-no'>No</label>
            </div>
            <span className='italic text-xs desktop:col-span-4 laptop:col-span-4 phone:col-span-8'>
              If no, please fill-out Permanent Residence Address below.
            </span>
          </div>

          {!sameAddress && (
            <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-2'>
              <Address data={philData} isPermanent />
            </div>
          )}
        </GridWrapper>

      </GridWrapper>
    </CollapseWrapper>
  );
};

export default Personal;
