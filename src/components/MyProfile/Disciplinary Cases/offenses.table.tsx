import { GavelTwoTone, SaveTwoTone } from '@mui/icons-material';
import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import AddButton from 'CustomComponents/AddButton';
import GridWrapper from 'CustomComponents/GridWrapper';
import React, { useState } from 'react';

type Props = {};

type OffenseI = {
  caseNumber: string;
  subject: string;
  description: string;
  offenseStage: string;
  offenseLevel: string;
  reportIssueDate: string;
  explainIssueDate: string;
  explanationDate: string;
  finalDisposition: string;
  dispositionDate: string;
  cleansingPeriod: string;
  status: string;
  aging: string;
};

const OffensesTable = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [offenses, setOffenses] = useState<OffenseI[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const CustomToolbar = () => {
    return (
      <div className='flex flex-row justify-end p-2'>
        <button
          onClick={() => setShowAll(!showAll)}
          className={`px-2 py-1 text-sky-400 hover:text-sky-500 transition-all duration-200 rounded-sm`}
        >
          <span className='uppercase'>
            {showAll ? 'Hide Other' : 'Show All'} Columns
          </span>
        </button>
      </div>
    );
  };

  return (
    <div>
      <OffenseDialog open={open} setOpen={setOpen} setOffenses={setOffenses} />
      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          hideFooter={true}
          experimentalFeatures={{ newEditingApi: true }}
          disableSelectionOnClick
          rows={offenses}
          columns={showAll ? allColumns : columns}
          getRowHeight={() => 'auto'}
          components={{ Toolbar: CustomToolbar }}
          getRowId={(data) => data.caseNumber}
        />
      </div>
      <AddButton setOpen={setOpen} text='Add Offense' />
    </div>
  );
};

const initialState: OffenseI = {
  caseNumber: '',
  subject: '',
  description: '',
  offenseStage: '',
  offenseLevel: '',
  reportIssueDate: '',
  explainIssueDate: '',
  explanationDate: '',
  finalDisposition: '',
  dispositionDate: '',
  cleansingPeriod: '',
  status: '',
  aging: '',
};

const OffenseDialog = ({ open, setOpen, setOffenses }) => {
  const [offense, setOffense] = useState<OffenseI>(initialState);

  const handleSaveOffense = () => {
    setOffenses((prev) => [...prev, offense]);
    setOpen(false);
    setOffense(initialState);
  };

  const subject = [],
    description = [];
  const offenseStage = [
    '1ST OFFENSE',
    '2ND OFFENSE',
    '3RD OFFENSE',
    '4TH OFFENSE',
    '5TH OFFENSE',
  ];

  const status = ['Open', 'Close'];
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className='p-6 flex flex-col gap-4 w-[550px]'>
        <p className='text-md font-bold '>
          <GavelTwoTone /> New Offense
        </p>

        <GridWrapper colSize='2'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl fullWidth size='small' variant='standard'>
              <InputLabel id='subject'>Subject</InputLabel>
              <Select
                labelId='subject'
                label='Subject'
                onChange={(e: any) =>
                  setOffense((prev) => ({ ...prev, subject: e.target.value }))
                }
              >
                {subject.map((sub) => (
                  <MenuItem key={sub} id={sub} value={sub}>
                    {sub}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl fullWidth size='small' variant='standard'>
              <InputLabel id='description'>Description</InputLabel>
              <Select
                labelId='description'
                label='Description'
                onChange={(e: any) =>
                  setOffense((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              >
                {description.map((desc) => (
                  <MenuItem key={desc} id={desc} value={desc}>
                    {desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl fullWidth size='small' variant='standard'>
              <InputLabel id='offense-stage'>Offense Stage</InputLabel>
              <Select
                labelId='offense-stage'
                label='Offense Stage'
                defaultValue={'1ST OFFENSE'}
                onChange={(e: any) =>
                  setOffense((prev) => ({
                    ...prev,
                    offenseStage: e.target.value,
                  }))
                }
              >
                {offenseStage.map((desc) => (
                  <MenuItem key={desc} id={desc} value={desc}>
                    {desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <TextField
              size='small'
              fullWidth
              label='Offense Level'
              disabled
              variant='standard'
              value={offense.offenseLevel}
            />
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Workplace Misconduct Report Issue Date'
                onChange={(value: any) =>
                  setOffense((prev) => ({
                    ...prev,
                    reportIssueDate: value,
                  }))
                }
                value={null}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Notice To Explain Issue Date'
                onChange={(value: any) =>
                  setOffense((prev) => ({
                    ...prev,
                    explainIssueDate: value,
                  }))
                }
                value={null}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Explanation Date'
                onChange={(value: any) =>
                  setOffense((prev) => ({
                    ...prev,
                    explanationDate: value,
                  }))
                }
                value={null}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Final Disposation'
                onChange={(value: any) =>
                  setOffense((prev) => ({
                    ...prev,
                    finalDisposition: value,
                  }))
                }
                value={null}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Disposation Date'
                onChange={(value: any) =>
                  setOffense((prev) => ({
                    ...prev,
                    dispositionDate: value,
                  }))
                }
                value={null}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Cleansing Period'
                onChange={(value: any) =>
                  setOffense((prev) => ({
                    ...prev,
                    cleansingPeriod: value,
                  }))
                }
                value={null}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl fullWidth size='small' variant='standard'>
              <InputLabel id='status'>Status</InputLabel>
              <Select
                labelId='status'
                label='Status'
                onChange={(e: any) =>
                  setOffense((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >
                {status.map((stat) => (
                  <MenuItem key={stat} id={stat} value={stat}>
                    {stat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <TextField
              size='small'
              variant='standard'
              fullWidth
              label='Aging'
              onChange={(e: any) =>
                setOffense((prev) => ({
                  ...prev,
                  aging: e.target.value,
                }))
              }
            />
          </div>
        </GridWrapper>

        <div className='grid grid-cols-5'>
          <button
            onClick={handleSaveOffense}
            className='col-span-3 px-2 py-1 bg-green-500 text-white rounded-md w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
          >
            <SaveTwoTone fontSize='small' className='mr-2' />
            Save Offense
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

const columns: any = [
  {
    field: 'caseNumber',
    headerName: 'Case Number',
    width: 120,
  },
  {
    field: 'offenseLevel',
    headerName: 'Offense Level',
    width: 180,
  },
  {
    field: 'subject',
    headerName: 'Subject',
    width: 180,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 200,
  },
  {
    field: 'offenseStage',
    headerName: 'Offense Stage',
    width: 180,
  },
];

const allColumns: any = [
  ...columns,
  {
    field: 'reportIssueDate',
    headerName: 'Workplace Misconduct Report Issue Date',
    width: 120,
  },
  {
    field: 'explainIssueDate',
    headerName: 'Notice To Explain Issue Date',
    width: 120,
  },
  {
    field: 'explanationDate',
    headerName: 'Explanation Date',
    width: 120,
  },
  {
    field: 'finalDisposition',
    headerName: 'Final Disposition',
    width: 120,
  },
  {
    field: 'dispositionDate',
    headerName: 'Disposition Date',
    width: 120,
  },
  {
    field: 'cleansingPeriod',
    headerName: 'Cleansing Period',
    width: 120,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
  },
  {
    field: 'aging',
    headerName: 'Aging',
    width: 120,
  },
];

export default OffensesTable;
