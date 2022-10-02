import { GavelTwoTone, SaveTwoTone } from '@mui/icons-material';
import {
  Chip,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AppCtx } from 'App';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import AddButton from 'CustomComponents/AddButton';
import GridWrapper from 'CustomComponents/GridWrapper';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileCtx } from '../profile.main';
import {
  createAction,
  deleteAction,
  getByEmployeeNoAction,
  data, dataStatus,
  deleteStatus as getAssetDeleteStatus,
  dataError
} from 'slices/disciplinaryCases';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';

type Props = {};

type OffenseI = {
  caseNumber: string;
  subject: string;
  description: string;
  offenseStage: string;
  violation: any;
  offenseLevel: any;
  reportIssueDate: Date | null;
  explainIssueDate: Date | null;
  explanationDate: Date | null;
  finalDisposition: string;
  dispositionDate: Date | null;
  cleansingPeriod: string;
  status: string;
  aging: string;
};

const OffensesTable = (props: Props) => {
  const dispatch = useDispatch();
  const {employeeDetails, failed, resetNotif, enums } = useContext(ProfileCtx);
  const { access_token} = useContext(AppCtx);
  const [open, setOpen] = useState<boolean>(false);
  const [offenses, setOffenses] = useState<OffenseI[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const employeeCases = useSelector(data);
  const employeeCasesStatus = useSelector(dataStatus);
  const employeeDeleteCasesStatus = useSelector(dataError);

  // useEffect(() => {
  //   if (employeeCasesStatus !== "idle") {
  //     setOffenses(employeeCases)
  //   }
  // }, [employeeCasesStatus])

  // useEffect(() => {
  //   if (employeeDetails.employeeNo) {
  //     getData();
  //   }
  // }, [employeeDetails.employeeNo])

  // useEffect(() => {
  //   if (employeeDeleteCasesStatus === "succeeded") {
  //     getData();
  //   }
  // }, [employeeDeleteCasesStatus])

  // const getData = async () => {
  //   await dispatch(getByEmployeeNoAction({access_token, employeeNo: employeeDetails.employeeNo}))
  // }

  // const handleDelete = async(id: string) => {
  //   await dispatch(deleteAction({id, access_token}))
  // };

  const handleEdit = async (id?: string) => {
    
  }

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
      <OffenseDialog
        open={open}
        setOpen={setOpen}
        setOffenses={setOffenses}
        failed={failed}
        employeeNo={employeeDetails.employeeNo}
        access_token={access_token}
        resetNotif={resetNotif}
        enums={enums}
      />
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
      <AddButton setOpen={setOpen} text='Add Record' />
    </div>
  );
};

const initialState: OffenseI = {
  caseNumber: '',
  subject: '',
  description: '',
  offenseStage: '1ST OFFENSE',
  violation: {},
  offenseLevel: {},
  reportIssueDate: null,
  explainIssueDate: new Date(),
  explanationDate: null,
  finalDisposition: '',
  dispositionDate: null,
  cleansingPeriod: '',
  status: '',
  aging: '',
};

const OffenseDialog = ({ open, setOpen, setOffenses, failed, employeeNo, access_token, resetNotif, enums }) => {
  const dispatch = useDispatch();
  const [offense, setOffense] = useState<OffenseI>(initialState);
  const [offenseLevels, setOffenseLevels] = useState<any[]>([]);
  const [violationsList, setViolationsList] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setCategories(() => {
      const data = violationsList.map((a: any) => a.Category);
      return Array.from(new Set(data));
    })
  }, [violationsList])

  useEffect(() => { 
    setOffenseLevels(enums.offenseLevel)
    setViolationsList(enums.violations)
  }, [enums])

  useEffect(() => { 
    if (offense.description) {
      const violationLevel = offense.violation;
      let offenseLevel = offenseLevels.find((x: any) => x.code === violationLevel.Level)
      let cleansingPeriod:any = null;
      if (offenseLevel?.Cleansing_Days) {
        cleansingPeriod = moment(offense.explainIssueDate).add(offenseLevel?.Cleansing_Days, "days").endOf("day");
      }
      const offenseStageCnt = parseInt(offense.offenseStage.replace(/\D/g, ""));
      if (!isNaN(offenseStageCnt) && offenseStageCnt > 1) {
        const violationLevelCnt = parseInt(violationLevel.Level.replace(/\D/g, ""));
        offenseLevel = offenseLevels.find((x: any) => {
          const codeCnt = parseInt(x.code.replace(/\D/g, ""));
          console.log({codeCnt}, {violationLevelCnt}, {offenseStageCnt})
          return (violationLevelCnt+(offenseStageCnt-1)) === codeCnt
        })
      }
      setOffense((prev: any) => {
        return { ...prev, offenseLevel, cleansingPeriod }
      })
    }
  }, [offense.violation, offense.offenseStage])

  useEffect(() => {
    let cleansingPeriod: any = null;
    if (offense.offenseLevel?.Cleansing_Days) {
      cleansingPeriod = moment(offense.explainIssueDate).add(offense.offenseLevel?.Cleansing_Days, "days").endOf("day");
    }
    setOffense((prev: any) => {
      return { ...prev, cleansingPeriod }
    })
  }, [offense.explainIssueDate, offense.offenseLevel])

  const handleSaveOffense = async() => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("offense-dialog");
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
      try {
        await dispatch(createAction({ body: {...offense, employeeNo}, access_token }));
      } catch (error: any) {
        console.log(error);
      }
      setOpen(false);
      setOffense(initialState);
    }
  };

  const offenseStage = [
    '1ST OFFENSE',
    '2ND OFFENSE',
    '3RD OFFENSE',
    '4TH OFFENSE',
    '5TH OFFENSE',
  ];
console.log({offense}, {offenseLevels}, {violationsList})
  const status = ['Open', 'Close'];
  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="offense-dialog"
      fullWidth={true}
      maxWidth="xl"
    >
      <div className='p-6 flex flex-col gap-4 w-[100%]'>
        <p className='text-md font-bold '>
          <GavelTwoTone /> Add Disciplinary Case
        </p>

        <GridWrapper colSize='1'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2 w[200px]'>
            <FormControl fullWidth size='small' variant='standard'>
              <InputLabel id='subject'>Subject</InputLabel>
              <Select
                labelId='subject'
                label='Subject'
                value={offense.subject}
                onChange={(e: any) =>
                  setOffense((prev) => ({ ...initialState, subject: e.target.value }))
                }
                // autoWidth
              >
                {categories.sort((a:any, b:any) => a.localeCompare(b)).map((category:any) => (
                  <MenuItem key={category} id={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </GridWrapper>

        <GridWrapper colSize='1'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl fullWidth size='small' variant='standard'>
              <InputLabel id='description'>Description</InputLabel>
              <Select
                style={{whiteSpace: "normal"}}
                labelId='description'
                label='Description'
                // autoWidth
                value={offense.description}
                onChange={(e: any, option:any) =>
                  setOffense((prev) => ({
                    ...prev,
                    description: e.target.value,
                    violation: option.props["data-value"]
                  }))
                }
              >
                {violationsList.filter((x: any) => x.Category == offense.subject)
                  .sort((a:any, b:any) => a.name.localeCompare(b.name))
                  .map((a: any) => (
                  <MenuItem key={a.code} id={a.code} data-value={a} style={{whiteSpace: 'normal'}} value={a.code}>
                    {a.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </GridWrapper>

        <GridWrapper colSize='2'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl fullWidth size='small' variant='standard'>
              <InputLabel id='offense-stage'>Offense Stage</InputLabel>
              <Select
                labelId='offense-stage'
                label='Offense Stage'
                defaultValue={offense.offenseStage}
                onChange={(e: any) =>
                  setOffense((prev) => ({
                    ...prev,
                    offenseStage: e.target.value
                  }))
                }
              >
                {offenseStage.map((a:any) => (
                  <MenuItem key={a} id={a} value={a}>
                    {a}
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
              InputProps={{
                startAdornment: offense.offenseLevel !== undefined ? <Chip label={offense.offenseLevel.name} /> : "N/A",
                disableUnderline: true
              }}
            />
          </div>
        </GridWrapper>
        <GridWrapper colSize='3'>
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
                value={offense.reportIssueDate}
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
                value={offense.explainIssueDate}
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
                value={offense.explanationDate}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>
        </GridWrapper>
        <GridWrapper colSize='2'>
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
                value={offense.finalDisposition}
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
                value={offense.dispositionDate}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>
        </GridWrapper>
        <GridWrapper colSize='3'>
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
                value={offense.cleansingPeriod}
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
                value="Open"
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

          {/* <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
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
          </div> */}
        </GridWrapper>

        <div className='grid grid-cols-5'>
          <button
            onClick={handleSaveOffense}
            className='col-span-3 px-2 py-1 bg-green-500 text-white rounded-md w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
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
