import { SchoolTwoTone } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ProfileCtx } from '../profile.main';
import CollapseWrapper from './collapse.wrapper';
import { EducationI, EmployeeI } from 'slices/interfaces/employeeI';

type Props = {};

const Education = (props: Props) => {
  const {
    setEmployeeDetails,
    employeeDetails,
    setUpdatedDetails, updatedDetails,
    isNew,getIcon
  } = useContext(ProfileCtx);
  const [educationData, setEducationData] = useState<any[]>([]);
  const [withUpdate, setWithUpdate] = useState<boolean>(false);

  const withData = useMemo(() => {
    return educationData.some((x:any) => x.yrFrom || x.yrTo || x.schoolAndAddress || x.degree || x.honors)
  }, [educationData])

  useEffect(() => {
    if (isNew && withData) {
      setEmployeeDetails((prev:any) => {
        return {
          ...prev,
          educationalBackground: educationData
        }
      })
    }
  }, [withData]);

  useEffect(() => {
    if (withUpdate) {
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
    }
  }, [educationData])

  useEffect(() => {
    const dbData:any = employeeDetails?.educationalBackground;
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
  }, [employeeDetails.educationalBackground]);

  const handleEducation = (col: string, value: any, level: string) => {
    setEducationData((data: any) => {
      return data.map((o: any) => {
        if (level.toLowerCase() === o.level.toLowerCase()) {
          return {
            ...o,
            [col]: value
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
      headerName: 'Years of Inclusion',
      width: 200,
      renderCell: (params: any) => {
        const level = params.row.level;
        // const value = employeeDetails.educationalBackground?.filter(
        //   (educ: EmployeeI | any) => educ.level === level
        // )[0];

        return (
          <span className='flex flex-row p-1 text-xs w-full gap-4'>
            <span className='flex-1'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  value={params.value || null}
                  label='From'
                  views={['year']}
                  onChange={(value: any) =>
                    handleEducation('yrFrom', value, level)
                  }
                  renderInput={(params) => (
                    <TextField
                      id='education-yrfrom'
                      size='small'
                      {...params}
                      fullWidth
                      variant='standard'
                    />
                  )}
                />
              </LocalizationProvider>
            </span>
            <span className='flex-1'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label='To'
                  views={['year']}
                  onChange={(value: any) =>
                    handleEducation('yrTo', value, level)
                  }
                  value={params.row.yrTo || null}
                  renderInput={(params) => (
                    <TextField
                      id='education-yrto'
                      size='small'
                      {...params}
                      fullWidth
                      variant='standard'
                    />
                  )}
                />
              </LocalizationProvider>
            </span>
          </span>
        );
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
        return <TextField
          id={`school-and-address_${params.row.level}`}
            variant='standard'
            size='small'
          fullWidth
          value={params.value}
            onChange={(e: any) =>
              handleEducation(
                'schoolAndAddress',
                e.target.value,
                params.row.level
              )
            }
          />
      },
    },
    {
      field: 'degree',
      headerName: 'Degree',
      width: 200,
      renderCell: (params: any) => {
        return <TextField
            id='degree'
            variant='standard'
            size='small'
          fullWidth
          value={params.value}
            onChange={(e: any) =>
              handleEducation('degree', e.target.value, params.row.level)
            }
        />
      },
    },
    {
      field: 'honors',
      headerName: 'Honors Received (If any)',
      width: 200,
      renderCell: (params: any) => {
        return <TextField
            id='honors'
            variant='standard'
            size='small'
            fullWidth
            value={params.value}
            onChange={(e: any) =>
              handleEducation('honors', e.target.value, params.row.level)
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
          pageSize={5}
          rowsPerPageOptions={[5]}
          hideFooter={true}
        />
      </div>
    </CollapseWrapper>
  );
};

export default Education;
