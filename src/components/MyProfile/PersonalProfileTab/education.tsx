import { SchoolTwoTone } from '@mui/icons-material';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ProfileCtx } from '../profile.main';
import CollapseWrapper from './collapse.wrapper';
import { EducationI, EmployeeI } from 'slices/interfaces/employeeI';
import * as func from 'utils/functions'

type Props = {};

const Education = (props: Props) => {
  const {
    // setEmployeeDetails,
    // employeeDetails,
    setUpdatedDetails, updatedDetails, setEducationalBgData, educationalBgData,
    isNew,getIcon
  } = useContext(ProfileCtx);
  const [educationData, setEducationData] = useState<any[]>([]);
  const [withUpdate, setWithUpdate] = useState<boolean>(false);
  const yearSelect = func.generateArrayOfYears(60);

  const withData = useMemo(() => {
    return educationData.some((x:any) => x.yrFrom || x.yrTo || x.schoolAndAddress || x.degree || x.honors)
  }, [educationData])

  useEffect(() => {
    const dbData:any = educationalBgData;
    let education: any = dbData || [];
    if (education.length === 0) {
      education = levels;
    } else {
      education = levels.map((e: any) => {
        const exists = dbData.findIndex((o: any) => o.level.toLowerCase() === e.level.toLowerCase());
        if (exists >= 0) {
          return dbData[exists];
        }
        return e;
      }) 
    }
    setEducationData(education);
  }, [educationalBgData]);
      console.log({educationData})

  useEffect(() => {
    if (withUpdate) {
      if (!isNew) {
        if (withData) {
          setUpdatedDetails((prev: any) => {
            return {
              ...prev,
              educationalBackground: educationData
            }
          })
        } else {
          setUpdatedDetails((prev: any) => {
            const { educationalBackground, ...rest } = prev;
            return {
              ...rest
            }
          })
        }
      } else {
        if (withData) {
          setEducationalBgData(educationData)
        } else {
          setEducationalBgData([])
        }
      }
    }
  }, [educationData])

  const handleEducation = (col: string, value: any, level: string) => {
    setEducationData((prev:any[]) => {
      return prev.map((o: any) => {
        if (o?.level === level) {
          return {
            ...o,
            [col]:value
          }
        }
        return o;
      })
    })
    setWithUpdate(true)
  };

  const columns: GridColDef[] = [
    {
      field: 'yrFrom',
      headerName: 'From',
      width: 100,
      renderCell: (params: any) => {
        const level = params.row.level;
        return <FormControl variant='standard' fullWidth size='small'>
          <Select
          key={`education-yrfrom-${level}`}
          value={params.value}
          onChange={(e: any) =>
            handleEducation('yrFrom', e.target.value, level)
          }
          >
            {
              yearSelect.map((o: any) => {
                return <MenuItem value={o} key={`yrFrom-${o}`}>{o}</MenuItem>
            })
            }
          </Select>
        </FormControl>
      },
    },
    {
      field: 'yrTo',
      headerName: 'To',
      width: 100,
      renderCell: (params: any) => {
        const level = params.row.level;
        return <FormControl variant='standard' fullWidth size='small'>
          <Select
          key={`education-yrTo-${level}`}
          value={params.value}
          onChange={(e: any) =>
            handleEducation('yrTo', e.target.value, level)
          }
          >
            {
              yearSelect.map((o: any) => {
                return <MenuItem value={o} key={`yrTo-${o}`}>{o}</MenuItem>
            })
            }
          </Select>
        </FormControl>
      },
    },
    {
      field: 'level',
      headerName: 'Level',
      width: 120
    },
    {
      field: 'schoolAndAddress',
      headerName: 'Name of School and Address',
      width: 250,
      renderCell: (params: any) => {
        const level = params.row.level;
        return <TextField
          key={`school-and-address_${level}`}
          variant='standard'
          size='small'
          fullWidth
          onKeyDown={(event)=>event.stopPropagation()}
          value={params.value}
          onChange={(e: any) => {
              handleEducation(
                'schoolAndAddress',
                e.target.value,
                level
              )
          }}
        />
      },
    },
    {
      field: 'degree',
      headerName: 'Degree',
      width: 200,
      renderCell: (params: any) => {
        const level = params.row.level;
        return <TextField
            key={`degree-${level}`}
            variant='standard'
            size='small'
            fullWidth
            onKeyDown={(event)=>event.stopPropagation()}
            value={params.value}
            onChange={(e: any) =>
              handleEducation('degree', e.target.value, level)
            }
        />
      },
    },
    {
      field: 'honors',
      headerName: 'Honors Received (If any)',
      width: 200,
      renderCell: (params: any) => {
        const level = params.row.level;
        return <TextField
            key={`honors-${level}`}
            variant='standard'
            size='small'
            fullWidth
            onKeyDown={(event)=>event.stopPropagation()}
            value={params.value}
            onChange={(e: any) =>
              handleEducation('honors', e.target.value, level)
            }
        />
      },
    },
  ];

  const levels = [
    {
      yrFrom: null,
      yrTo: null,
      level: 'Elementary',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
    {
      yrFrom: null,
      yrTo: null,
      level: 'Secondary',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
    {
      yrFrom: null,
      yrTo: null,
      level: 'Tertiary',
      schoolAndAddress: '',
      degree: '',
      honors: '',
    },
    {
      yrFrom: null,
      yrTo: null,
      level: 'Post Graduate',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
    {
      yrFrom: null,
      yrTo: null,
      level: 'Others',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
  ];

  return (
    <CollapseWrapper panelTitle='Educational Attainment' icon={() => getIcon(<SchoolTwoTone/>, "educationalBackground")}>
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) => data.level}
          autoHeight
          disableSelectionOnClick
          rows={educationData}
          columns={columns}
          hideFooter={true}
        />
      </div>
    </CollapseWrapper>
  );
};

export default Education;
