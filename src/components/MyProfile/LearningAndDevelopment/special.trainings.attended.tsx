/* eslint-disable react-hooks/exhaustive-deps */
import { LocalLibraryTwoTone, Add, Delete, Edit, SaveTwoTone } from '@mui/icons-material';
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
import { AppCtx } from 'App';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import GridWrapper from 'CustomComponents/GridWrapper';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAction,
  deleteAction,
  getByEmployeeNoAction,
  data as getData, dataStatus as getDataStatus,
  deleteStatus as getDeleteStatus
} from 'slices/learningAndDevelopment';
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
  isAttended: boolean;
  status?: string;
  bondLength?: string;
  bondStartDate?: string;
  bondEndDate?: string;
}

const initialData = {
    courseTitle: '',
    institution: '',
    venue: '',
    startDate: '',
    endDate: '',
    isAttended: true
  }

const SpecialTrainings = ({ type }: Props) => {
  const dispatch = useDispatch();
  const employeeTrainings = useSelector(getData);
  const employeeTrainingsStatus = useSelector(getDataStatus);
  const employeeDeleteTrainingsStatus = useSelector(getDeleteStatus);
  const { access_token } = useContext(AppCtx);
  const {employeeDetails, failed, resetNotif} = useContext(ProfileCtx)
  const [open, setOpen] = useState<boolean>(false);
  const [trainings, setTrainings] = useState<SpecialTrainingI[]>([]);

  useEffect(() => {
    if (employeeTrainingsStatus !== "idle") {
      console.log({employeeTrainings})
      setTrainings(employeeTrainings.filter((x: any) => x.isAttended === (type === "Attended")))
    }
  }, [employeeTrainingsStatus])

  useEffect(() => {
    if (employeeDetails.employeeNo) {
      handleData();
    }
  }, [employeeDetails.employeeNo])

  useEffect(() => {
    if (employeeDeleteTrainingsStatus === "succeeded") {
      handleData();
    }
  }, [employeeDeleteTrainingsStatus])

  const handleData = async () => {
    await dispatch(getByEmployeeNoAction({access_token, employeeNo: employeeDetails.employeeNo}))
  }

  const handleDelete = async(id: string) => {
    await dispatch(deleteAction({id, access_token}))
  };

  const handleEdit = async (id?: string) => {
    
  }

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
        access_token={access_token}
        employeeNo={employeeDetails.employeeNo}
        failed={failed}
        resetNotif={resetNotif}
      />
      <DataGrid
        rows={trainings}
        columns={
          type === 'Attended'
            ? attendedColumns(handleDelete, handleEdit)
            : taughtColumns(handleDelete, handleEdit)
        }
        autoHeight
        density='compact'
        disableSelectionOnClick
        pageSize={30}
        rowsPerPageOptions={[30]}
        checkboxSelection={false}
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

const SpecialTrainingsDialog = ({ open, setOpen, type, setTrainings, employeeNo, access_token, failed, resetNotif }) => {
  const dispatch = useDispatch();
  const [training, setTraining] = useState<SpecialTrainingI>(initialData);

  useEffect(() => {
    if (!open) {
      setTraining(initialData)
      resetNotif()
    }
  }, [open]);

  const handleSave = async () => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("trainings-dialog");
        const required = dialog.querySelectorAll("[required]");
        let invalidCtr = 0;

        invalidCtr = await Array.from(required)
          .filter((e: any) => !e.value)
          .map((e: any) => e.id).length;

        if (invalidCtr > 0) {
          return failed(INCOMPLETE_FORM_MESSAGE);
        }
        return true;
      }
      //check inputs...
    if (await validateFields()) {
      setTrainings((prev: any) => [...prev, training]);
      try {
        await dispatch(createAction({ body: {...training, employeeNo: employeeNo}, access_token }));
      } catch (error: any) {
        console.log(error);
      }
      setOpen(false);
      setTraining(initialData)
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="trainings-dialog">
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
                value={training.startDate || null}
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
                value={training.endDate || null}
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
                    <MenuItem value='Done' id='Done' key='Done'>
                      Done
                    </MenuItem>
                    <MenuItem value='Ongoing' id='Ongoing' key='Ongoing'>
                      Ongoing
                    </MenuItem>
                    <MenuItem value='Not Started' id='Not Started' key='Not Started'>
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
                    <MenuItem key={6} value={6}>6 Months</MenuItem>
                    <MenuItem key={12} value={12}>12 Months</MenuItem>
                    <MenuItem key={24} value={24}>24 Months</MenuItem>
                    <MenuItem key={36} value={36}>36 Months</MenuItem>
                    <MenuItem key={48} value={48}>48 Months</MenuItem>
                    <MenuItem key={60} value={60}>60 Months</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='col-span-1'>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={training.bondStartDate || null}
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
                    value={training.bondEndDate || null}
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

        <div className='grid grid-cols-7'>
          <button
            onClick={handleSave}
            className='col-span-5 px-2 py-1 text-xs bg-green-500 text-white rounded-sm w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
          >
            <SaveTwoTone fontSize='small' className='mr-2' />
            Save
          </button>
          <button
            className='col-span-2 px-2 py-1 text-slate-400 hover:text-slate-800'
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
};

const attendedColumns = (handleDelete: any, handleEdit:any) => [
  { field: 'courseTitle', headerName: 'Course Title', flex: 1 },
  { field: 'institution', headerName: 'Institution', flex: 1 },
  { field: 'venue', headerName: 'Address/Venue', flex: 1 },
  {
    field: 'startDate',
    headerName: 'Start Date',
    flex: 1,
    renderCell: (params: any) => {
      return moment(params.value).format('MM/DD/YYYY');
    },
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    flex: 1,
    renderCell: (params: any) => {
      return moment(params.value).format('MM/DD/YYYY');
    },
  },
  { field: 'status', headerName: 'Status', flex: 1 },
  {
    field: 'bondLength',
    headerName: 'Bond Length',
    flex: 1,
    renderCell: (params: any) => {
      return params.value ? `${params.value} months` : ""
    },
  },
  {
    field: 'bondStartDate',
    headerName: 'Bond Start Date',
    flex: 1,
    renderCell: (params: any) => {
      return moment(params.value).format('MM/DD/YYYY');
    },
  },
  {
    field: 'bondEndDate',
    headerName: 'Bond End Date',
    flex: 1,
    renderCell: (params: any) => moment(params.value).format('MM/DD/YYYY')
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params: any) => {
      return <div>
        <IconButton size='small' onClick={() => handleDelete(params.row?.id)}>
          <Delete />
        </IconButton>
        <IconButton size='small' onClick={() => handleEdit(params.row?.id)}>
          <Edit />
        </IconButton>
      </div>
    },
  },
];

const taughtColumns = (handleDelete: any, handleEdit:any) => [
  { field: 'courseTitle', headerName: 'Course Title', flex: 1 },
  { field: 'institution', headerName: 'Institution', flex: 1 },
  { field: 'address', headerName: 'Address/Venue', flex: 1 },
  {
    field: 'startDate',
    headerName: 'Training Start Date',
    flex: 1,
    renderCell: (params: any) => {
      return moment(params.value).format('MM/DD/YYYY');
    },
  },
  {
    field: 'endDate',
    headerName: 'Training End Date',
    flex: 1,
    renderCell: (params: any) => moment(params.value).format('MM/DD/YYYY')
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params: any) => {
      return <div>
        <IconButton size='small' onClick={() => handleDelete(params.row?.id)}>
          <Delete />
        </IconButton>
        <IconButton size='small' onClick={() => handleEdit(params.row?.id)}>
          <Edit />
        </IconButton>
      </div>
    },
  },
];

export default SpecialTrainings;
