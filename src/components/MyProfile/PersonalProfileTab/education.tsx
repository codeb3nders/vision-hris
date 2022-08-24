import { Add, SchoolTwoTone } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GridWrapper from 'CustomComponents/GridWrapper';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileCtx } from '../profile.main';
import CollapseWrapper from './collapse.wrapper';
import { EmployeeI } from 'slices/interfaces/employeeI';

type Props = {};

const Education = (props: Props) => {
  const { setEmployeeDetails, employeeDetails } = useContext(ProfileCtx);
  const [rows, setRows] = useState<any[]>([]);
  const [addText, setAddText] = useState<string>('');
  const [selectedLevels, setSelectedLevels] = useState<any>('');

  // useEffect(() => {
  //   if (!employeeDetails.elementaryYrFrom) {
  //     setAddText('Elementary Level');
  //   } else if (
  //     employeeDetails.elementaryYrFrom &&
  //     !employeeDetails.secondaryYrFrom
  //   ) {
  //     setAddText('Secondary Level');
  //   } else if (
  //     employeeDetails.secondaryYrFrom &&
  //     !employeeDetails.tertiaryYrFrom
  //   ) {
  //     setAddText('Tertiary Level');
  //   } else if (
  //     employeeDetails.tertiaryYrFrom &&
  //     !employeeDetails.postGradYrFrom
  //   ) {
  //     setAddText('Post Graduate Level');
  //   } else {
  //     setAddText('Others');
  //   }
  // }, [employeeDetails]);

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

  const columns: GridColDef[] = [
    {
      field: 'yrFrom',
      headerName: 'Years of Inclusion',
      width: 300,
      renderCell: (params: any) => {
        const yrFrom: any = handleKey(params.row.levelOfEducation, 'YrFrom');
        const yrTo: any = handleKey(params.row.levelOfEducation, 'YrTo');
        // console.log({ yrFrom, yrTo, params });

        return (
          <span className='flex flex-row p-1 text-xs w-full gap-4'>
            <span className='flex-1'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  disabled={!handleExist(params.row.levelOfEducation)}
                  value={employeeDetails[yrFrom] || null}
                  label='From'
                  views={['year']}
                  onChange={(value: any) =>
                    setEmployeeDetails((prev: EmployeeI) => ({
                      ...prev,
                      [yrFrom]: moment(value).format('LL'),
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      size='small'
                      {...params}
                      fullWidth
                      required
                      variant='standard'
                    />
                  )}
                />
              </LocalizationProvider>
            </span>
            <span className='flex-1'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  disabled={!handleExist(params.row.levelOfEducation)}
                  label='To'
                  views={['year']}
                  onChange={(value: any) =>
                    setEmployeeDetails((prev: EmployeeI) => ({
                      ...prev,
                      [yrTo]: moment(value).format('LL'),
                    }))
                  }
                  value={employeeDetails[yrTo] || null}
                  renderInput={(params) => (
                    <TextField
                      size='small'
                      {...params}
                      fullWidth
                      required
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
      field: 'levelOfEducation',
      headerName: 'Level of Education',
      width: 150,
      renderCell: (params: any) => {
        return (
          <div
            className={
              handleExist(params.row.levelOfEducation)
                ? 'text-black'
                : 'text-black/40'
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
        const key: any = handleKey(
          params.row.levelOfEducation,
          'SchoolAndAddress'
        );
        return handleExist(params.row.levelOfEducation) ? (
          <TextField
            variant='standard'
            size='small'
            fullWidth
            multiline
            onChange={(e: any) =>
              setEmployeeDetails((prev: EmployeeI) => ({
                ...prev,
                [key]: e.target.value,
              }))
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
        const key: any = handleKey(params.row.levelOfEducation, 'Degree');
        return handleExist(params.row.levelOfEducation) ? (
          <TextField
            variant='standard'
            size='small'
            fullWidth
            onChange={(e: any) =>
              setEmployeeDetails((prev: EmployeeI) => ({
                ...prev,
                [key]: e.target.value,
              }))
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
        const key: any = handleKey(params.row.levelOfEducation, 'Honors');
        return handleExist(params.row.levelOfEducation) ? (
          <TextField
            variant='standard'
            size='small'
            fullWidth
            value={employeeDetails[key] || null}
            onChange={(e: any) =>
              setEmployeeDetails((prev: EmployeeI) => ({
                ...prev,
                [key]: e.target.value,
              }))
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
      levelOfEducation: 'Elementary',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
    {
      yrFrom: new Date(),
      yrTo: new Date(),
      levelOfEducation: 'Secondary',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
    {
      yrFrom: new Date(),
      yrTo: new Date(),
      levelOfEducation: 'Tertiary',
      schoolAndAddress: '',
      degree: '',
      honors: '',
    },
    {
      yrFrom: new Date(),
      yrTo: new Date(),
      levelOfEducation: 'Post Graduation',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
    {
      yrFrom: new Date(),
      yrTo: new Date(),
      levelOfEducation: 'Others',
      degree: '',
      schoolAndAddress: '',
      honors: '',
    },
  ];

  return (
    <CollapseWrapper panelTitle='Educational Attainment' icon={SchoolTwoTone}>
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) => data.levelOfEducation}
          autoHeight
          disableSelectionOnClick
          rows={levels}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowHeight={() => 'auto'}
          onStateChange={(state: any) => setSelectedLevels(state.selection)}
        />
      </div>
    </CollapseWrapper>
  );
};

export default Education;
