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
import React, { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { ProfileCtx } from '../profile.main';
import { EmployeeI } from 'slices/interfaces/employeeI';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';
const Address = lazy(() => import('./address'));

type Props = {};

const Personal = (props: Props) => {
  const {
    setEmployeeDetails,
    employeeDetails,
    isOwner,
    enums,
    setUpdatedDetails, updatedDetails, getIcon
  } = useContext(ProfileCtx);
  const { isNew } = useContext(EmployeeCtx);
  const [otherReligion, setOtherReligion] = useState<boolean>(false);
  const [sameAddress, setSameAddress] = useState<boolean>(false);
  const [philData, setPhilData] = useState<any>(null);
  const [citizenship, setCitizenship] = useState<any[]>([]);
  const [civilStatus, setCivilStatus] = useState<any[]>([]);
  const [religion, setReligion] = useState<any[]>([]);
  const [genders, setGenders] = useState<any[]>([]);
// console.log({isNew}, "nnnnnnnnnnn")
  useEffect(() => {
    setCitizenship(enums.citizenship);
    setCivilStatus(enums.civil_status);
    setReligion(enums.religions);
    setGenders(enums.gender);
  }, [enums]);

  useEffect(() => {
    // console.log({ sameAddress })
    if (sameAddress) {
      !isNew &&
        setUpdatedDetails((prev: any) => {
          const data = prev || employeeDetails;
          return {
            ...updatedDetails,
            permanentAddress: {
              addressLine: data.presentAddress.addressLine,
              region: data.presentAddress.region,
              province: data.presentAddress.province,
              municipality: data.presentAddress.municipality,
              barangay: data.presentAddress.barangay,
            },
          }
        })
      setEmployeeDetails((prev: any) => ({
        ...prev,
        permanentAddress: {
          addressLine: prev.presentAddress.addressLine,
          region: prev.presentAddress.region,
          province: prev.presentAddress.province,
          municipality: prev.presentAddress.municipality,
          barangay: prev.presentAddress.barangay,
        }
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

  const handleChange = (value: any) => {
    !isNew &&
      setUpdatedDetails((prev: any) => ({
        ...prev,
        ...value
      }))
    setEmployeeDetails((prev: EmployeeI) => ({
      ...prev,
      ...value
    }));
  };

  const handleSelectChange = (col: string, value: any, option: any) => {
    if (!isNew) {
      setUpdatedDetails((prev: any) => ({
        ...prev,
        [col]: value,
      }))
      setEmployeeDetails((prev: EmployeeI) => ({
        ...prev,
        [col]: option.props['data-obj']
      }));
    } else {
      setEmployeeDetails((prev: EmployeeI) => ({
        ...prev,
        [col]: value
      }));
    }
  }

  const isSame = () => {
    const presentAddress = employeeDetails.presentAddress, permanentAddress = employeeDetails.permanentAddress;
    return presentAddress?.addressLine == permanentAddress?.addressLine
      && presentAddress?.region == permanentAddress?.region
      && presentAddress?.province == permanentAddress?.province
      && presentAddress?.municipality == permanentAddress?.municipality
      && presentAddress?.barangay == permanentAddress?.barangay
  }

  return (
    <CollapseWrapper
      panelTitle='Personal Information'
      icon={() => getIcon(<AccountCircleTwoTone />, "Personal")}
      open
    >
      <GridWrapper colSize='7'>
        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-7'>
          <TextField
            id='first-name'
            name="firstName"
            required
            label='First Name'
            size='small'
            variant='standard'
            fullWidth
            value={employeeDetails.firstName}
            onChange={(e: any) => handleChange({ firstName: e.target.value })}
          />
        </div>
        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-7'>
          <TextField
            id='middle-name'
            label='Middle Name'
            name="middleName"
            size='small'
            variant='standard'
            fullWidth
            value={employeeDetails?.middleName}
            onChange={(e: any) => handleChange({ middleName: e.target.value })}
          />
        </div>
        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-7'>
          <TextField
            id='last-name'
            name="lastName"
            required
            label='Last Name'
            size='small'
            variant='standard'
            fullWidth
            value={employeeDetails?.lastName}
            onChange={(e: any) => handleChange({ lastName: e.target.value })}
          />
        </div>
        <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-7'>
          <TextField
            id='name-suffix'
            name="suffix"
            label='Suffix (If any)'
            size='small'
            variant='standard'
            fullWidth
            value={employeeDetails?.suffix}
            onChange={(e: any) => handleChange({ suffix: e.target.value })}
          />
        </div>

        <div className='desktop:col-span-3 laptop:col-span-3 phone:col-span-6'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Birthdate'
              value={employeeDetails?.birthDate}
              onChange={(value: any) => handleChange({ birthDate: value })}
              renderInput={(params) => (
                <TextField
                  id='birthday'
                  {...params}
                  fullWidth
                  name="birthDate"
                  required
                  variant='standard'
                />
              )}
            />
          </LocalizationProvider>
        </div>

        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-7'>
          <FormControl required fullWidth variant='standard'>
            <InputLabel id='genderLabel'>Gender</InputLabel>
            <Select
              id='gender'
              name="gender"
              labelId='genderLabel'
              size='small'
              onChange={(e: any, option: any) => handleSelectChange("gender", e.target.value, option)}
              value={employeeDetails.gender?.code}
            >
              {genders.map((gender: any, i: number) => {
                return (
                  <MenuItem key={i} data-obj={gender} value={gender.code}>
                    {gender.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-7'>
          <FormControl required fullWidth variant='standard'>
            <InputLabel id='civil_status'>Civil Status</InputLabel>
            <Select
              id='civil-status'
              name="civilStatus"
              labelId='civil_status'
              size='small'
              onChange={(e: any, option: any) => handleSelectChange("civilStatus", e.target.value, option)}
              value={employeeDetails?.civilStatus?.code}
            >
              {civilStatus.map((status) => {
                return (
                  <MenuItem key={status._id} data-obj={status} value={status.code}>
                    {status.name}
                  </MenuItem>
                );
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
                name="citizenship"
                labelId='citizenship'
                size='small'
                onChange={(e: any, option: any) => handleSelectChange("citizenship", e.target.value, option)}
                value={employeeDetails?.citizenship?.code || 'PHILIPPINES'}
              >
                {citizenship.map((c: any, idx: number) => {
                  return (
                    <MenuItem id={c._id} key={c._id} value={c.code} data-obj={c}>
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
                name="religion"
                labelId='religion'
                size='small'
                onChange={(e: any, option: any) => handleSelectChange("religion", e.target.value, option)}
                value={employeeDetails?.religion?.code}
              >
                {religion.map((religion) => {
                  return (
                    <MenuItem key={religion._id} data-obj={religion} value={religion.code}>
                      {religion.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2'>
            <TextField
              id='personal-contact-no'
              required
              name="personalContactNumber"
              label='Personal Contact Number'
              size='small'
              variant='standard'
              fullWidth
              value={employeeDetails?.personalContactNumber}
              onChange={(e: any) => handleChange({ personalContactNumber: e.target.value })}
            />
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-2'>
            <TextField
              id='personal-email'
              name="personalEmail"
              required
              label='Personal Email Address'
              size='small'
              variant='standard'
              fullWidth
              value={employeeDetails?.personalEmail}
              onChange={(e: any) => handleChange({ personalEmail: e.target.value })}
            />
          </div>

          <div className='desktop:col-span-2 laptop:col-span-2 phone:col-span-2'>
            <h5 className='text-sm col-span-2 mt-4'>
              Present Residence Address
            </h5>
            <Suspense fallback={<div>Loading...</div>}>
              <Address data={philData} />
            </Suspense>
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
                checked={sameAddress || (employeeDetails.presentAddress && employeeDetails.permanentAddress && isSame())}
                onChange={() => setSameAddress(true)}
              />
              <label htmlFor='address-yes'>Yes</label>
            </div>
            <div className='desktop:col-span-1 laptop:col-span-1 phone:col-span-4'>
              <Checkbox
                size='small'
                id='address-no'
                checked={!(sameAddress || (employeeDetails.presentAddress && employeeDetails.permanentAddress && isSame()))}
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

export default React.memo(Personal);
