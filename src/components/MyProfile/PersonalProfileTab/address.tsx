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
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';

type Props = {
  data: any;
  isPermanent?: boolean;
};

const Address = ({ data, isPermanent }: Props) => {
  const { setEmployeeDetails, employeeDetails, setUpdatedDetails, updatedDetails } =
    useContext(ProfileCtx);
  const { isNew } = useContext(EmployeeCtx);

  const [regionList, setRegionList] = useState<any[]>([]);
  const [provinceList, setProvinceList] = useState<any>({});
  const [municipalityList, setMunicipalityList] = useState<any>({});
  const [barangayList, setBarangayList] = useState<any>({});
  const [regionFile, setRegionFile] = useState<any[]>([]);
  const [employeeData, setEmployeeData] = useState<any>({})

  useEffect(() => {
    console.log({ data })
    if (data) {
      setRegionFile(data)
    }
  }, [data])

  useEffect(() => {
    setEmployeeData(() => {
      let presentAddress = employeeDetails.presentAddress || {};
      let permanentAddress = employeeDetails.permanentAddress || {};
      return {
        ...employeeDetails,
        ...presentAddress,
        ...permanentAddress
      }
    })
  }, [employeeDetails])

  useEffect(() => {
    if (regionFile.length > 0 && employeeDetails) {
      const region = employeeDetails[`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]?.region,
        province = employeeDetails[`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]?.province,
        municipality = employeeDetails[`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]?.municipality;

      let provinceList: any[] = [], municipalityList: any[] = [], barangayList: any[] = [];
      const regionIdx = regionFile.findIndex((o: any) => o.region_name === region);
      if (regionIdx >= 0) {
        provinceList = regionFile[regionIdx].province_list;
        const provinceIdx = provinceList.findIndex((o: any) => o.id === province);

        if (provinceIdx >= 0) {
          municipalityList = provinceList[provinceIdx].municipality_list;
          const municipalityIdx = municipalityList.findIndex((o: any) => o.id === municipality);

          if (municipalityIdx >= 0) {
            barangayList = municipalityList[municipalityIdx].barangay_list;
          }
        }
      }
      setRegionList(regionFile);
      setProvinceList({
        [`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]: provinceList
      });
      setMunicipalityList({
        [`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]: municipalityList
      });
      setBarangayList({
        [`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]: barangayList
      });
    }
  }, [regionFile])

  const handleChange = (obj: any) => {
    if (Object.keys(obj).length > 0) {
      const key = Object.keys(obj)[0];
      const [column, subColumn] = key.split("-");
      setEmployeeDetails({
        ...employeeDetails,
        [column]: {
          ...employeeDetails[column],
          [subColumn]: obj[key]
        }
      })
    }
  }

  const handleUpdateAddress = (value: string, col: string) => {
    !isNew &&
      setUpdatedDetails((prev: any) => {
        if (updatedDetails && updatedDetails[isPermanent ? 'permanentAddress' : 'presentAddress']) {
          return {
            ...prev,
            [isPermanent ? 'permanentAddress' : 'presentAddress']: {
              ...prev[isPermanent ? 'permanentAddress' : 'presentAddress'],
              [col]: value,
            },
          }
        } else {
          return {
            ...prev,
            [isPermanent ? 'permanentAddress' : 'presentAddress']: {
              [col]: value,
            },
          }
        }
      });
  };

  return (
    <GridWrapper colSize='8'>
      <div className='col-span-8'>
        <TextField
          id={`${isPermanent ? 'permanentAddress' : 'presentAddress'}-addressLine`}
          multiline
          label={`${isPermanent ? 'Permanent' : 'Present'} Street Address`}
          size='small'
          variant='standard'
          fullWidth
          value={employeeData.addressLine || ""}
          onChange={(e: any) => {
            handleChange({ [`${isPermanent ? 'permanentAddress' : 'presentAddress'}-addressLine`]: e.target.value });

            handleUpdateAddress(e.target.value, 'addressLine');
          }}
        />
      </div>

      <div className='col-span-2'>
        <FormControl variant='standard' size='small' fullWidth>
          <InputLabel>Region</InputLabel>
          <Select
            value={employeeData['region']}
            id={`${isPermanent ? 'permanentAddress' : 'presentAddress'}-region`}
            onChange={(e: any, options: any) => {
              handleChange({ [`${isPermanent ? 'permanentAddress' : 'presentAddress'}-region`]: e.target.value });
              setProvinceList({
                [`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]: options.props[`data-list`].province_list
              });
              setMunicipalityList({});
              setBarangayList({});
              handleUpdateAddress(e.target.value, 'region');
            }}
          >
            {regionList
              ?.sort((a: any, b: any) =>
                a.region_name.localeCompare(b.region_name)
              )
              ?.map((d: any) => {
                return (
                  <MenuItem key={d.region_name} id={d.region_name} data-list={d} value={d.region_name}>
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
          disabled={!provinceList}
        >
          <InputLabel>Province</InputLabel>
          <Select
            value={employeeData['province']}
            id={`${isPermanent ? 'permanentAddress' : 'presentAddress'}-province`}
            onChange={(e: any, options: any) => {
              handleChange({ [`${isPermanent ? 'permanentAddress' : 'presentAddress'}-province`]: e.target.value });
              setMunicipalityList({
                [`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]: options.props[`data-list`].municipality_list
              });
              setBarangayList({});
              handleUpdateAddress(e.target.value, 'province');
            }}
          >
            {provinceList[`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]?.map((province: any) => {
              return (
                <MenuItem key={province.id} id={province.id} data-list={province} value={province.id}>
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
          disabled={!municipalityList}
        >
          <InputLabel>Municipality</InputLabel>
          <Select
            value={employeeData['municipality']}
            id={`${isPermanent ? 'permanentAddress' : 'presentAddress'}-municipality`}
            onChange={(e: any, options: any) => {
              handleChange({ [`${isPermanent ? 'permanentAddress' : 'presentAddress'}-municipality`]: e.target.value });
              setBarangayList({
                [`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]: options.props[`data-list`].barangay_list
              });
              handleUpdateAddress(e.target.value, 'municipality');
            }}
          >
            {municipalityList[`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]?.map((municipality: any) => {
              return (
                <MenuItem value={municipality.id} key={municipality.id} data-list={municipality} id={municipality.id}>
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
          disabled={!barangayList}
        >
          <InputLabel>Barangay</InputLabel>
          <Select
            value={employeeData['barangay']}
            id={`${isPermanent ? 'permanentAddress' : 'presentAddress'}-barangay`}
            onChange={(e: any) => {
              handleChange({ [`${isPermanent ? 'permanentAddress' : 'presentAddress'}-barangay`]: e.target.value });
              handleUpdateAddress(e.target.value, 'barangay');
            }}
          >
            {barangayList[`${isPermanent ? 'permanentAddress' : 'presentAddress'}`]?.map((barangay: any) => {
              return (
                <MenuItem value={barangay} key={barangay} id={barangay}>
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
