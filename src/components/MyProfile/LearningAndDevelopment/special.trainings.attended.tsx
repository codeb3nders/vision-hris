import { LocalLibraryTwoTone, Add, Delete } from '@mui/icons-material';
import {
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GridWrapper from 'CustomComponents/GridWrapper';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { ProfileCtx } from '../profile.main';

type Props = {
  type: string;
};

export interface SpecialTrainingI {
  courseTitle: string;
  institution: string;
  venue: string;
  startDate: string;
  endDate: string;
  status?: string;
  bondLength?: string;
  bondStartDate?: string;
  bondEndDate?: string;
}

const SpecialTrainings = ({ type }: Props) => {
  const { setUpdatedDetails, isNew } = useContext(ProfileCtx);
  const [open, setOpen] = useState<boolean>(false);
  const [trainings, setTrainings] = useState<SpecialTrainingI[]>([]);

  useEffect(() => {
    trainings.length > 0 &&
      (type === 'Attended'
        ? setUpdatedDetails((prev: any) => ({
            ...prev,
            specialTrainingsAttended: trainings,
          }))
        : setUpdatedDetails((prev: any) => ({
            ...prev,
            specialTrainingsTaught: trainings,
          })));
    console.log({ trainings });
  }, [trainings]);

  const handleDelete = (params: any) => {
    setTrainings((prev: SpecialTrainingI[]) => {
      return prev.filter(
        (training: SpecialTrainingI) =>
          training.courseTitle !== params.row.courseTitle
      );
    });
  };

  return (
    <CollapseWrapper
      open
      panelTitle={`Special Trainings/Seminars ${type}`}
      icon={LocalLibraryTwoTone}
    >
      <SpecialTrainingsDialog
        open={open}
        setOpen={setOpen}
        type={type}
        setTrainings={setTrainings}
      />
      <DataGrid
        rows={trainings}
        columns={
          type === 'Attended'
            ? attendedColumns(handleDelete)
            : taughtColumns(handleDelete)
        }
        autoHeight
        density='compact'
        disableSelectionOnClick
        pageSize={30}
        rowsPerPageOptions={[30]}
        checkboxSelection={true}
        loading={false}
        getRowId={(data: any) => data.courseTitle}
      />

      <div className='flex justify-end'>
        <button
          onClick={() => setOpen(true)}
          className='px-2 py-1 border border-sky-500 text-sky-500 rounded-md hover:bg-sky-200 transition ease-in-out mt-2'
        >
          <Add fontSize='small' className='mr-1' /> Add {type} Training
        </button>
      </div>
    </CollapseWrapper>
  );
};

const SpecialTrainingsDialog = ({ open, setOpen, type, setTrainings }) => {
  const [training, setTraining] = useState<SpecialTrainingI>({
    courseTitle: '',
    institution: '',
    venue: '',
    startDate: '',
    endDate: '',
  });

  const handleSave = () => {
    setTrainings((prev: any) => [...prev, training]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className='p-6 flex flex-col gap-4 w-[550px]'>
        <p className='text-md font-bold '>
          <LocalLibraryTwoTone fontSize='small' /> Add {type} Training
        </p>

        <GridWrapper colSize='2'>
          <TextField
            required
            id='course-title'
            label='Course Title'
            variant='standard'
            fullWidth
            multiline
            size='small'
            className='col-span-1'
            onChange={(e: any) => {
              setTraining((prev: any) => ({
                ...prev,
                courseTitle: e.target.value,
              }));
            }}
          />
          <TextField
            required
            id='institution'
            label='Institution'
            variant='standard'
            fullWidth
            multiline
            size='small'
            className='col-span-1'
            onChange={(e: any) => {
              setTraining((prev: any) => ({
                ...prev,
                institution: e.target.value,
              }));
            }}
          />
          <TextField
            required
            id='training-address'
            label='Address/Venue'
            variant='standard'
            fullWidth
            multiline
            size='small'
            className='col-span-2'
            onChange={(e: any) => {
              setTraining((prev: any) => ({
                ...prev,
                venue: e.target.value,
              }));
            }}
          />

          <div className='col-span-1'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={new Date()}
                label='Training Start Date'
                onChange={(value: any) => {
                  setTraining((prev: any) => ({
                    ...prev,
                    startDate: value,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    id='training-start-date'
                    size='small'
                    {...params}
                    fullWidth
                    variant='standard'
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className='col-span-1'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={new Date()}
                label='Training End Date'
                onChange={(value: any) => {
                  setTraining((prev: any) => ({
                    ...prev,
                    endDate: value,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    id='training-end-date'
                    size='small'
                    {...params}
                    fullWidth
                    variant='standard'
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          {type === 'Attended' && (
            <>
              {' '}
              <div className='col-span-1'>
                <FormControl variant='standard' fullWidth>
                  <InputLabel id='training-status'>Status</InputLabel>
                  <Select
                    id='status'
                    labelId='training-status'
                    onChange={(e: any) => {
                      setTraining((prev: any) => ({
                        ...prev,
                        status: e.target.value,
                      }));
                    }}
                  >
                    <MenuItem value='Done' id='Done'>
                      Done
                    </MenuItem>
                    <MenuItem value='Ongoing' id='Ongoing'>
                      Ongoing
                    </MenuItem>
                    <MenuItem value='Not Started' id='Not Started'>
                      Not Started
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='col-span-1'>
                <FormControl size='small' fullWidth variant='standard'>
                  <InputLabel id='training-length'>
                    Training Bond Length
                  </InputLabel>
                  <Select
                    labelId='training-length'
                    onChange={(e: any) => {
                      setTraining((prev: any) => ({
                        ...prev,
                        bondLength: e.target.value,
                      }));
                    }}
                  >
                    <MenuItem value='6 Months'>6 Months</MenuItem>
                    <MenuItem value='12 Months'>12 Months</MenuItem>
                    <MenuItem value='24 Months'>24 Months</MenuItem>
                    <MenuItem value='36 Months'>36 Months</MenuItem>
                    <MenuItem value='48 Months'>48 Months</MenuItem>
                    <MenuItem value='60 Months'>60 Months</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='col-span-1'>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={new Date()}
                    label='Training Bond Start Date'
                    onChange={(value: any) => {
                      setTraining((prev: any) => ({
                        ...prev,
                        bondStartDate: value,
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        id='training-bond-start-date'
                        size='small'
                        {...params}
                        fullWidth
                        variant='standard'
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className='col-span-1'>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={new Date()}
                    label='Training Bond End Date'
                    onChange={(value: any) => {
                      setTraining((prev: any) => ({
                        ...prev,
                        bondEndDate: value,
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        id='training-bond-end-date'
                        size='small'
                        {...params}
                        fullWidth
                        variant='standard'
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </>
          )}
        </GridWrapper>

        <button
          className='px-2 py-1 w-full bg-green-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
          onClick={handleSave}
          disabled={
            !training.courseTitle &&
            !training.institution &&
            !training.venue &&
            !training.startDate &&
            !training.endDate
          }
        >
          Save {type} Training
        </button>
      </div>
    </Dialog>
  );
};

const attendedColumns = (handleDelete: any) => [
  { field: 'courseTitle', headerName: 'Course Title', width: 200 },
  { field: 'institution', headerName: 'Institution', width: 200 },
  { field: 'venue', headerName: 'Address/Venue', width: 200 },
  {
    field: 'startDate',
    headerName: 'Training Start Date',
    width: 200,
    renderCell: (params: any) => {
      return moment(params.value).format('LL');
    },
  },
  {
    field: 'endDate',
    headerName: 'Training End Date',
    width: 200,
    renderCell: (params: any) => {
      return moment(params.value).format('LL');
    },
  },
  { field: 'status', headerName: 'Status', width: 200 },
  {
    field: 'bondLength',
    headerName: 'Training Bond Length',
    width: 200,
  },
  {
    field: 'bondStartDate',
    headerName: 'Training Bond Start Date',
    width: 200,
    renderCell: (params: any) => {
      return moment(params.value).format('LL');
    },
  },
  {
    field: 'bondEndDate',
    headerName: 'Training Bond End Date',
    width: 200,
    renderCell: (params: any) => {
      return (
        <div className='flex flex-row items-center w-full gap-1'>
          <span>{moment(params.value).format('LL')}</span>
          <div className='flex-1 flex justify-end'>
            <IconButton size='small' onClick={() => handleDelete(params)}>
              <Delete />
            </IconButton>
          </div>
        </div>
      );
    },
  },
];

const taughtColumns = (handleDelete: any) => [
  { field: 'courseTitle', headerName: 'Course Title', width: 200 },
  { field: 'institution', headerName: 'Institution', width: 200 },
  { field: 'address', headerName: 'Address/Venue', width: 200 },
  {
    field: 'startDate',
    headerName: 'Training Start Date',
    width: 200,
    renderCell: (params: any) => {
      return moment(params.value).format('LL');
    },
  },
  {
    field: 'endDate',
    headerName: 'Training End Date',
    width: 200,
    renderCell: (params: any) => {
      return (
        <div className='flex flex-row items-center w-full gap-1'>
          <span>{moment(params.value).format('LL')}</span>
          <div className='flex-1 flex justify-end'>
            <IconButton size='small' onClick={() => handleDelete(params)}>
              <Delete />
            </IconButton>
          </div>
        </div>
      );
    },
  },
];

export default SpecialTrainings;
