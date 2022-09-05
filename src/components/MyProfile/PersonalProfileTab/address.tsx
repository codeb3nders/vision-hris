/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import GridWrapper from 'CustomComponents/GridWrapper';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ProfileCtx } from '../profile.main';
import { EmployeeI } from 'slices/interfaces/employeeI';

type Props = {
  data: any;
  isPermanent?: boolean;
};

const Address = ({ data, isPermanent }: Props) => {
  const { setEmployeeDetails, employeeDetails, isNew, setUpdatedDetails } =
    useContext(ProfileCtx);

  const [selectedRegion, setSelectedRegion] = useState<any>('');
  const [selectedProvince, setSelectedProvince] = useState<any>('');
  const [selectedMunicipality, setSelectedMunicipality] = useState<any>('');
  const [selectedBarangay, setSelectedBarangay] = useState<any>('');
  const [addressLine, setAddressLine] = useState<string>('');

  useEffect(() => {
    isPermanent
      ? handleAddress('permanentAddress')
      : handleAddress('presentAddress');
  }, [
    selectedRegion,
    selectedProvince,
    selectedMunicipality,
    selectedBarangay,
    addressLine,
  ]);

  const handleAddress = (type: string) => {
    setEmployeeDetails((prev: EmployeeI) => ({
      ...prev,
      [type]: {
        addressLine,
        region: selectedRegion.region_name,
        province: selectedProvince.id,
        municipality: selectedMunicipality.id,
        barangay: selectedBarangay,
      },
    }));
  };

  useEffect(() => {
    setSelectedProvince('');
    setSelectedMunicipality('');
    setSelectedBarangay('');
  }, [selectedRegion]);

  // useEffect(() => {
  //   setEmployeeDetails({
  //     ...employeeDetails,
  //     [isPermanent ? 'permanentResidenceAddress' : 'presentResidenceAddress']: {
  //       addressLine:
  //     },
  //   });
  // }, [streetAddress1, streetAddress2]);

  const handleUpdateAddress = (value: string, col: string) => {
    !isNew &&
      setUpdatedDetails((prev: any) => ({
        ...prev,
        [isPermanent ? 'permanentAddress' : 'presentAddress']: {
          ...prev[isPermanent ? 'permanentAddress' : 'presentAddress'],
          [col]: value,
        },
      }));
  };

  return (
    <GridWrapper colSize='8'>
      <div className='col-span-8'>
        <TextField
          id={`${isPermanent ? 'permanent' : 'present'}-addressline`}
          multiline
          label={`${isPermanent ? 'Permanent' : 'Present'} Street Address`}
          size='small'
          variant='standard'
          fullWidth
          defaultValue={addressLine}
          onChange={(e: any) => {
            setAddressLine(e.target.value);

            handleUpdateAddress(e.target.value, 'addressLine');
          }}
        />
      </div>
      {/* <div className='col-span-4'>
        <TextField
          multiline
          id={`${isPermanent ? 'permanent' : 'present'}-address-2`}
          label={`${isPermanent ? 'Permanent' : 'Present'} Street Address 2`}
          size='small'
          variant='standard'
          fullWidth
          defaultValue={
            employeeDetails[isPermanent ? 'permanent' : 'present']
              ?.streetAddress2
          }
          onChange={(e: any) => setStreetAddress2(e.target.value)}
        />
      </div> */}

      <div className='col-span-2'>
        <FormControl variant='standard' size='small' fullWidth>
          <InputLabel>Region</InputLabel>
          <Select
            id={`${isPermanent ? 'permanent' : 'present'}-region`}
            onChange={(e: any) => {
              setSelectedRegion(e.target.value);
              handleUpdateAddress(e.target.value.region_name, 'region');
            }}
          >
            {data
              ?.sort((a: any, b: any) =>
                a.region_name.localeCompare(b.region_name)
              )
              ?.map((d: any) => {
                return (
                  <MenuItem key={d.region_name} id={d.region_name} value={d}>
                    {d.region_name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </div>

      <div className='col-span-2'>
        <FormControl
          variant='standard'
          size='small'
          fullWidth
          disabled={!selectedRegion}
        >
          <InputLabel>Province</InputLabel>
          <Select
            id={`${isPermanent ? 'permanent' : 'present'}-province`}
            onChange={(e: any) => {
              setSelectedProvince(e.target.value);
              handleUpdateAddress(e.target.value.id, 'province');
            }}
          >
            {selectedRegion?.province_list?.map((province: any) => {
              return (
                <MenuItem key={province.id} id={province.id} value={province}>
                  {province.id}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className='col-span-2'>
        <FormControl
          variant='standard'
          size='small'
          fullWidth
          disabled={!selectedProvince}
        >
          <InputLabel>Municipality</InputLabel>
          <Select
            id={`${isPermanent ? 'permanent' : 'present'}-municipality`}
            onChange={(e: any) => {
              setSelectedMunicipality(e.target.value);
              handleUpdateAddress(e.target.value.id, 'municipality');
            }}
          >
            {selectedProvince?.municipality_list?.map((municipality: any) => {
              return (
                <MenuItem value={municipality} id={municipality.id}>
                  {municipality.id}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className='col-span-2'>
        <FormControl
          variant='standard'
          size='small'
          fullWidth
          disabled={!selectedMunicipality}
        >
          <InputLabel>Barangay</InputLabel>
          <Select
            id={`${isPermanent ? 'permanent' : 'present'}-barangay`}
            onChange={(e: any) => {
              setSelectedBarangay(e.target.value);
              handleUpdateAddress(e.target.value, 'barangay');
            }}
          >
            {selectedMunicipality?.barangay_list?.map((barangay: any) => {
              return (
                <MenuItem value={barangay} id={barangay}>
                  {barangay}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </GridWrapper>
  );
};

export default Address;
