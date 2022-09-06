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
    employeeDetails: details,
    setUpdatedDetails,
    isNew,
  } = useContext(ProfileCtx);
  const [selectedLevels, setSelectedLevels] = useState<any>('');

  const employeeDetails = useMemo(() => details, [details]);

  useEffect(() => {
    console.log({ selectedLevels });
  }, [selectedLevels]);

  const handleExist = (levelOfEducation: any) => {
    return (
      selectedLevels.findIndex((level: any) => level === levelOfEducation) > -1
    );
  };

  const handleKey = (level: string, col: string) => {
    switch (level) {
      case 'Elementary':
        return `elementary${col}`;
      case 'Secondary':
        return `secondary${col}`;
      case 'Tertiary':
        return `tertiary${col}`;
      case 'Post Graduation':
        return `postGrad${col}`;
      case 'Others':
        return `others${col}`;

      default:
        break;
    }
  };

  const handleEducation = (col: string, value: any, level: string) => {
    const exist: any = employeeDetails.educationalBackground?.findIndex(
      (educ: any) => educ.level === level
    );

    console.log({ exist });

    if (
      exist >= 0 &&
      employeeDetails?.educationalBackground &&
      employeeDetails?.educationalBackground.length > 0
    ) {
      setEmployeeDetails((prev: EmployeeI | any) => {
        return {
          ...prev,
          educationalBackground: prev?.educationalBackground?.map(
            (education: EducationI) => {
              console.log({ education, level });

              if (education.level === level) {
                console.log({ education });

                return {
                  ...education,
                  [col]: value,
                };
              }

              return education;
            }
          ),
        };
      });

      !isNew &&
        setUpdatedDetails((prev: any) => {
          return {
            ...prev,
            educationalBackground: prev?.educationalBackground?.map(
              (education: EducationI) => {
                console.log({ education, level });

                if (education.level === level) {
                  console.log({ education });

                  return {
                    ...education,
                    [col]: value,
                  };
                }

                return education;
              }
            ),
          };
        });
    } else if (exist === -1) {
      setEmployeeDetails((prev: EmployeeI | any) => ({
        ...prev,
        educationalBackground: [
          ...prev.educationalBackground,
          { [col]: value, level },
        ],
      }));

      !isNew &&
        setUpdatedDetails((prev: any) => ({
          ...prev,
          educationalBackground: prev?.educationalBackground
            ? [...prev?.educationalBackground, { [col]: value, level }]
            : [{ [col]: value, level }],
        }));
    } else {
      setEmployeeDetails((prev: EmployeeI | any) => ({
        ...prev,
        educationalBackground: [{ [col]: value, level }],
      }));

      !isNew &&
        setUpdatedDetails((prev: any) => ({
          ...prev,
          educationalBackground: [{ [col]: value, level }],
        }));
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'yrFrom',
      headerName: 'Years of Inclusion',
      width: 300,
      renderCell: (params: any) => {
        const level = params.row.level;
        const value = employeeDetails.educationalBackground?.filter(
          (educ: EmployeeI | any) => educ.level === level
        )[0];

        return (
          <span className='flex flex-row p-1 text-xs w-full gap-4'>
            <span className='flex-1'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  disabled={!handleExist(level)}
                  value={value?.yrFrom}
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
                  disabled={!handleExist(level)}
                  label='To'
                  views={['year']}
                  onChange={(value: any) =>
                    handleEducation('yrTo', value, level)
                  }
                  value={value?.yrTo}
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
      headerName: 'Level of Education',
      width: 150,
      renderCell: (params: any) => {
        return (
          <div
            className={
              handleExist(params.row.level) ? 'text-black' : 'text-black/40'
            }
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: 'schoolAndAddress',
      headerName: 'Name of School and Address',
      width: 250,
      renderCell: (params: any) => {
        const key: any = handleKey(params.row.level, 'SchoolAndAddress');
        return handleExist(params.row.level) ? (
          <TextField
            id='school-and-address'
            variant='standard'
            size='small'
            fullWidth
            onChange={(e: any) =>
              handleEducation(
                'schoolAndAddress',
                e.target.value,
                params.row.level
              )
            }
          />
        ) : (
          <div>{params.value}</div>
        );
      },
    },
    {
      field: 'degree',
      headerName: 'Degree',
      width: 200,
      renderCell: (params: any) => {
        const key: any = handleKey(params.row.level, 'Degree');
        return handleExist(params.row.level) ? (
          <TextField
            id='degree'
            variant='standard'
            size='small'
            fullWidth
            onChange={(e: any) =>
              handleEducation('degree', e.target.value, params.row.level)
            }
          />
        ) : (
          <div>{params.value}</div>
        );
      },
    },
    {
      field: 'honors',
      headerName: 'Honors Received (If any)',
      width: 200,
      renderCell: (params: any) => {
        const key: any = handleKey(params.row.level, 'Honors');
        return handleExist(params.row.level) ? (
          <TextField
            id='honors'
            variant='standard'
            size='small'
            fullWidth
            value={employeeDetails[key] || null}
            onChange={(e: any) =>
              handleEducation('honors', e.target.value, params.row.level)
            }
          />
        ) : (
          <div>{params.value}</div>
        );
      },
    },
  ];

  const levels = [
    {
      yrFrom: new Date(),
      yrTo: new Date(),
      level: 'Elementary',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
    {
      yrFrom: new Date(),
      yrTo: new Date(),
      level: 'Secondary',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
    {
      yrFrom: new Date(),
      yrTo: new Date(),
      level: 'Tertiary',
      schoolAndAddress: '',
      degree: '',
      honors: '',
    },
    {
      yrFrom: new Date(),
      yrTo: new Date(),
      level: 'Post Graduation',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
    {
      yrFrom: new Date(),
      yrTo: new Date(),
      level: 'Others',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
  ];

  return (
    <CollapseWrapper panelTitle='Educational Attainment' icon={SchoolTwoTone}>
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) => data.level}
          autoHeight
          disableSelectionOnClick
          rows={levels}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          // getRowHeight={() => 'auto'}
          onStateChange={(state: any) => setSelectedLevels(state.selection)}
        />
      </div>
    </CollapseWrapper>
  );
};

export default Education;
