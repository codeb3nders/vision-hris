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
  const { setEmployeeDetails, employeeDetails } = useContext(ProfileCtx);

  const [selectedRegion, setSelectedRegion] = useState<any>('');
  const [selectedProvince, setSelectedProvince] = useState<any>('');
  const [selectedMunicipality, setSelectedMunicipality] = useState<any>('');
  const [selectedBarangay, setSelectedBarangay] = useState<any>('');

  useEffect(() => {
    isPermanent
      ? setEmployeeDetails((prev: EmployeeI) => ({
        ...prev,
        permanentRegion: selectedRegion.region_name,
        permanentProvince: selectedProvince.id,
        permanentMunicipality: selectedMunicipality.id,
        permanentBarangay: selectedBarangay,
      }))
      : setEmployeeDetails((prev: EmployeeI) => ({
        ...prev,
        presentRegion: selectedRegion.region_name,
        presentProvince: selectedProvince.id,
        presentMunicipality: selectedMunicipality.id,
        presentBarangay: selectedBarangay,
      }));
  }, [
    selectedRegion,
    selectedProvince,
    selectedMunicipality,
    selectedBarangay,
  ]);

  useEffect(() => {
    setSelectedProvince('');
    setSelectedMunicipality('');
    setSelectedBarangay('');
  }, [selectedRegion]);

  return (
    <GridWrapper colSize='8'>
      <div className='col-span-8'>
        <TextField
          multiline
          required
          label={`${isPermanent ? 'Permanent' : 'Present'} Street Address`}
          size='small'
          variant='standard'
          fullWidth
          defaultValue={employeeDetails?.presentResidenceAddress}
          onChange={(e: any) => {
            setEmployeeDetails({
              ...employeeDetails,
              presentResidenceAddress: e.target.value,
            });
          }}
        />
      </div>
      {/* <div className='col-span-4'>
        <TextField
          multiline
          required
          label={`${isPermanent ? 'Permanent' : 'Present'} Street Address 2`}
          size='small'
          variant='standard'
          fullWidth
          defaultValue={employeeDetails?.presentResidenceAddress}
          onChange={(e: any) => {
            setEmployeeDetails({
              ...employeeDetails,
              presentResidenceAddress: e.target.value,
            });
          }}
        />
      </div> */}

      <div className='col-span-2'>
        <FormControl variant='standard' size='small' required fullWidth>
          <InputLabel id='region'>Region</InputLabel>
          <Select onChange={(e: any) => setSelectedRegion(e.target.value)}>
            {data
              ?.sort((a: any, b: any) =>
                a.region_name.localeCompare(b.region_name)
              )
              ?.map((d: any) => {
                return (
                  <MenuItem key={d.region_name} value={d}>
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
          required
          fullWidth
          disabled={!selectedRegion}
        >
          <InputLabel id='region'>Province</InputLabel>
          <Select onChange={(e: any) => setSelectedProvince(e.target.value)}>
            {selectedRegion?.province_list?.map((province: any) => {
              return (
                <MenuItem key={province.id} value={province}>
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
          required
          fullWidth
          disabled={!selectedProvince}
        >
          <InputLabel id='region'>Municipality</InputLabel>
          <Select
            onChange={(e: any) => setSelectedMunicipality(e.target.value)}
          >
            {selectedProvince?.municipality_list?.map((municipality: any) => {
              return (
                <MenuItem value={municipality}>{municipality.id}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className='col-span-2'>
        <FormControl
          variant='standard'
          size='small'
          required
          fullWidth
          disabled={!selectedMunicipality}
        >
          <InputLabel id='region'>Barangay</InputLabel>
          <Select onChange={(e: any) => setSelectedBarangay(e.target.value)}>
            {selectedMunicipality?.barangay_list?.map((barangay: any) => {
              return <MenuItem value={barangay}>{barangay}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    </GridWrapper>
  );
};

export default Address;
