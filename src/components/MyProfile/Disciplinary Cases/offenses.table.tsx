import { Delete, Edit, GavelTwoTone, SaveTwoTone } from '@mui/icons-material';
import {
  Chip,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
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
  deleteStatus,
  updateStatus,
  newDataStatus,
  updateAction
} from 'slices/disciplinaryCases';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import ConfirmDelete from 'components/Other/confirm.delete';

type Props = {};

type OffenseI = {
  id: string;
  employeeNo: string;
  caseNumber: string;
  violationCategory: any;
  offenseStage: any;
  violations: any;
  offenseLevel: any;
  reportIssueDate: Date | null;
  explainIssueDate: Date | null;
  explanationDate: Date | null;
  finalDisposition: string;
  dispositionDate: Date | null;
  cleansingPeriod: Date | null;
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
  const [offenseData, setOffenseData] = useState<OffenseI>(initialState);
  const [confirmDelete, setConfirmDelete] = useState<{
    row: any;
    status: boolean;
  }>({ row: null, status: false });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const isUpdate = offenseData.id;

  const employeeCases = useSelector(data);
  const employeeCasesStatus = useSelector(dataStatus);
  const employeeNewCaseStatus = useSelector(newDataStatus);
  const employeeUpdateCaseStatus = useSelector(updateStatus);

  useEffect(() => {
    !open && setOffenseData(initialState);
  }, [open]);

  useEffect(() => {
    if (employeeCasesStatus !== "idle") {
      setOffenses(employeeCases)
    }
  }, [employeeCasesStatus])

  useEffect(() => {
    if (employeeDetails.employeeNo) {
      getData();
    }
  }, [employeeDetails.employeeNo])

  useEffect(() => {
    if (employeeUpdateCaseStatus === "succeeded" || employeeNewCaseStatus === "succeeded") {
      getData();
      setIsSaving(false);
    }
  }, [employeeUpdateCaseStatus, employeeNewCaseStatus])

  const getData = async () => {
    await dispatch(getByEmployeeNoAction({access_token, employeeNo: employeeDetails.employeeNo}))
  }

  const handleDelete = async(row: OffenseI) => {
    await dispatch(deleteAction({id: row.id, access_token}))
    setConfirmDelete({ row: null, status: false });
  };

  const handleEdit = async (row: OffenseI) => {
    const offense = offenses.filter(
      (t) => t.id === row.id
    )[0];
    offense.id && setOffenseData(offense);
    setOpen(true);
  }

  return (
    <div>
      <ConfirmDelete
        open={confirmDelete}
        setOpen={setConfirmDelete}
        handleDelete={handleDelete}
      />
      <OffenseDialog
        open={open}
        setOpen={setOpen}
        isSaving={isSaving}
        setIsSaving={setIsSaving}
        failed={failed}
        employeeNo={employeeDetails.employeeNo}
        access_token={access_token}
        resetNotif={resetNotif}
        enums={enums}
        offenseData={offenseData}
        isUpdate={isUpdate}
      />
      <div style={{ width: '100%' }}>
        <div style={{marginBottom: 10}}>
          <AddButton text='Add Record' cb={() => setOpen(true)} />
        </div>
        <DataGrid
          autoHeight
          disableSelectionOnClick
          columns={showAll ?  allColumns(setConfirmDelete, handleEdit) : columns(setConfirmDelete, handleEdit)}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
              wordBreak: "break-word"
            },
          }}
          pageSize={30}
          rowsPerPageOptions={[30]}
          hideFooter={true}
          rows={offenses}
          getRowHeight={() => 'auto'}
          // components={{ Toolbar: CustomToolbar }}
          getRowId={(data) => data.id}
        />
      </div>
    </div>
  );
};

const initialState: OffenseI = {
  id: "",
  employeeNo: "",
  caseNumber: '',
  violationCategory: {},
  offenseStage: {},
  violations: {},
  offenseLevel: {},
  reportIssueDate: null,
  explainIssueDate: new Date(),
  explanationDate: null,
  finalDisposition: '',
  dispositionDate: null,
  cleansingPeriod: null,
  status: 'Open',
  aging: '',
};

const OffenseDialog = ({ open, setOpen, failed, employeeNo, access_token, resetNotif, enums, offenseData: data, isUpdate, isSaving, setIsSaving }) => {
  const dispatch = useDispatch();
  const [offense, setOffense] = useState<OffenseI>(initialState);
  const [offenseLevels, setOffenseLevels] = useState<any[]>([]);
  const [violationsList, setViolationsList] = useState<any[]>([]);
  const [offenseStages, setOffenseStages] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
   const [offenseData, setOffenseData] = useState<any>(initialState);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setCategories(enums.violationCategories)
    setOffenseLevels(enums.offenseLevel)
    setViolationsList(enums.violations)
    setOffenseStages(enums.offenseStages)
  }, [enums])

  useEffect(() => {
    setOffenseData(data);
  }, [data]);

   useEffect(() => {
    if (!open) {
      setOffense(initialState)
      resetNotif()
    }
  }, [open]);

  useEffect(() => { 
    if (offense.violations?.code && offense.offenseStage?.code) {
      const violationLevel = offense.violations;
      let offenseLevel = offenseLevels.find((x: any) => x.code === violationLevel.Level)
      let cleansingPeriod:any = null;
      if (offenseLevel?.Cleansing_Days) {
        cleansingPeriod = moment(offense.explainIssueDate).add(offenseLevel?.Cleansing_Days, "days").endOf("day");
      }
      const offenseStageCnt = parseInt(offense.offenseStage?.code.replace(/\D/g, ""));
      if (!isNaN(offenseStageCnt) && offenseStageCnt > 1) {
        const violationLevelCnt = parseInt(violationLevel.Level.replace(/\D/g, ""));
        offenseLevel = offenseLevels.find((x: any) => {
          const codeCnt = parseInt(x.code.replace(/\D/g, ""));
          return (violationLevelCnt+(offenseStageCnt-1)) === codeCnt
        })
      }
      setOffense((prev: any) => {
        return { ...prev, offenseLevel, cleansingPeriod }
      })
      isUpdate && setOffenseData((prev: any) => ({
        ...prev,
        offenseLevel, cleansingPeriod
      }));
    }
  }, [offense.violations, offense.offenseStage])

  useEffect(() => {
    let cleansingPeriod: any = null;
    if (offense.offenseLevel?.Cleansing_Days) {
        cleansingPeriod = moment(offense.explainIssueDate).add(offense.offenseLevel?.Cleansing_Days, "days").endOf("day");
      }
      setOffense((prev: any) => {
        return { ...prev, cleansingPeriod }
      })
  }, [offense.explainIssueDate, offense.offenseLevel])

  useEffect(() => {
    let cleansingPeriod: any = null;
    if (offenseData.offenseLevel?.Cleansing_Days) {
        cleansingPeriod = moment(offense.explainIssueDate).add(offense.offenseLevel?.Cleansing_Days, "days").endOf("day");
      }
      setOffenseData((prev: any) => ({
      ...prev,
      cleansingPeriod
    }));
  }, [offenseData.explainIssueDate, offenseData.offenseLevel])

  const handleSaveOffense = async () => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("offense-dialog");
        const required = dialog.querySelectorAll("[required]");
        let invalidCtr = 0;

        invalidCtr = await Array.from(required)
          .filter((e: any) => !e.value)
          .map((e: any) => e.id).length;

        if (invalidCtr > 0 || ((!isUpdate && offense.offenseLevel?.code === undefined) || (isUpdate && offenseData.offenseLevel?.code === undefined))) {
          return failed(INCOMPLETE_FORM_MESSAGE);
        }
        return true;
      }
      //check inputs...
    if (await validateFields()) {
      setIsSaving(true);
       try {
        if (isUpdate) {
          const data = {
            violationCategory: offense.violationCategory.code,
            violations: offense.violations.code,
            offenseLevel: offense.offenseLevel.code,
            offenseStage: offense.offenseStage.code,
            cleansingPeriod: offense.cleansingPeriod,
            dispositionDate: offense.dispositionDate,
            noticeToExplainIssueDate: offense.explainIssueDate,
            explanationDate: offense.explanationDate,
            finalDisposition: offense.finalDisposition,
            misconductReportIssueDate: offense.reportIssueDate,
            status: offense.status
          }
          await dispatch(updateAction({
              params: {
                id: offenseData.id,
                ...data
              },
              access_token,
            }));
        } else {
          const data = {
            violationCategory: offense.violationCategory.code,
            violations: offense.violations.code,
            offenseLevel: offense.offenseLevel.code,
            offenseStage: offense.offenseStage.code,
            cleansingPeriod: offense.cleansingPeriod,
            dispositionDate: offense.dispositionDate,
            noticeToExplainIssueDate: offense.explainIssueDate,
            explanationDate: offense.explanationDate,
            finalDisposition: offense.finalDisposition,
            misconductReportIssueDate: offense.reportIssueDate,
            status: offense.status
          }
          await dispatch(createAction({ body: {...data, employeeNo}, access_token }));
        }
      } catch (error: any) {
        console.error(error);
      }
      setOpen(false);
      setOffense(initialState);
    }
  };

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
            <FormControl fullWidth size='small' variant='standard' required>
              <InputLabel id='category'>Subject</InputLabel>
              <Select
                labelId='category'
                label='Subject'
                value={offense.violationCategory?.code}
                defaultValue={offenseData.violationCategory.code}
                onChange={(e: any, option: any) => {
                  setOffense((prev) => ({ ...initialState, violationCategory: option.props["data-value"] }));
                  isUpdate && setOffenseData((prev: any) => ({
                    ...prev,
                    violationCategory: option.props["data-value"]
                  }));
                }}
              >
                {categories.sort((a:any, b:any) => a.name.localeCompare(b.name))
                  .map((a: any) => (
                  <MenuItem key={a.code} id={a.code} data-value={a} style={{whiteSpace: 'normal'}} value={a.code}>
                    {a.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </GridWrapper>

        <GridWrapper colSize='1'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl fullWidth size='small' variant='standard' required>
              <InputLabel id='description'>Description</InputLabel>
              <Select
                style={{ whiteSpace: "normal" }}
                labelId='description'
                label='Description'
                defaultValue={offenseData.violations.code}
                onChange={(e: any, option: any) => {
                  setOffense((prev) => ({
                    ...prev,
                    violations: option.props["data-value"]
                  }));
                  isUpdate && setOffenseData((prev: any) => ({
                    ...prev,
                    violations: option.props["data-value"]
                  }));
                }}
              >
                {violationsList.filter((x: any) => {
                  if (!isUpdate) {
                    return x.Category == offense.violationCategory?.code
                  }
                  return x.Category == offenseData.violationCategory?.code
                })
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
            <FormControl fullWidth size='small' variant='standard' required>
              <InputLabel id='offense-stage'>Offense Stage</InputLabel>
              <Select
                labelId='offense-stage'
                label='Offense Stage'
                defaultValue={offenseData.offenseStage.code}
                onChange={(e: any, option: any) => {
                  setOffense((prev) => ({
                    ...prev,
                    offenseStage: option.props["data-value"]
                  }));
                  isUpdate && setOffenseData((prev: any) => ({
                    ...prev,
                    offenseStage: option.props["data-value"]
                  }));
                }}
              >
                {offenseStages.map((a:any) => (
                  <MenuItem key={a.code} id={a.code} data-value={a} style={{whiteSpace: 'normal'}} value={a.code.toUpperCase()}>
                    {a.name}
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
                startAdornment: offense.offenseLevel !== undefined ? <Chip label={offense.offenseLevel.name || offenseData.offenseLevel.name} /> : "N/A",
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
                onChange={(value: any) => {
                  setOffense((prev) => ({
                    ...prev,
                    reportIssueDate: value,
                  }));
                  isUpdate && setOffenseData((prev: any) => ({
                    ...prev,
                    reportIssueDate: value
                  }));
                }}
                value={offense.reportIssueDate || offenseData.misconductReportIssueDate || null}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Notice To Explain Issue Date'
                onChange={(value: any) => {
                  setOffense((prev) => ({
                    ...prev,
                    explainIssueDate: value,
                  }));
                  isUpdate && setOffenseData((prev: any) => ({
                    ...prev,
                    explainIssueDate: value
                  }));
                }}
                value={offense.explainIssueDate || offenseData.noticeToExplainIssueDate || null}
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
                onChange={(value: any) => {
                  setOffense((prev) => ({
                    ...prev,
                    explanationDate: value,
                  }));
                  isUpdate && setOffenseData((prev: any) => ({
                    ...prev,
                    explanationDate: value
                  }));
                }}
                value={offense.explanationDate || offenseData.explanationDate || null}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>
        </GridWrapper>
        <GridWrapper colSize='2'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <TextField
              size='small'
              variant='standard'
              fullWidth
              defaultValue={offenseData.finalDisposition}
              label='Final Disposition'
              onChange={(e: any) => {
                setOffense((prev) => ({
                  ...prev,
                  finalDisposition: e.target.value,
                }));
                isUpdate && setOffenseData((prev: any) => ({
                  ...prev,
                  finalDisposition: e.target.value
                }));
              }}
            />
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Disposition Date'
                onChange={(value: any) => {
                  setOffense((prev) => ({
                    ...prev,
                    dispositionDate: value,
                  }));
                  isUpdate && setOffenseData((prev: any) => ({
                    ...prev,
                    dispositionDate: value
                  }));
                }}
                value={offense.dispositionDate || offenseData.dispositionDate || null}
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
                onChange={(value: any) => {
                  setOffense((prev) => ({
                    ...prev,
                    cleansingPeriod: value,
                  }));
                  isUpdate && setOffenseData((prev: any) => ({
                    ...prev,
                    cleansingPeriod: value
                  }));
                }}
                value={offense.cleansingPeriod || offenseData.cleansingPeriod}
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
                defaultValue={offenseData.status}
                onChange={(e: any) => {
                  setOffense((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }));
                  isUpdate && setOffenseData((prev: any) => ({
                    ...prev,
                    status: e.target.value
                  }));
                }}
              >
                {status.map((stat) => (
                  <MenuItem key={stat} id={stat} value={stat}>
                    {stat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {isUpdate && <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <TextField
              size='small'
              fullWidth
              label='Aging'
              disabled
              variant='standard'
              InputProps={{
                startAdornment: <Chip label={offenseData.aging} />,
                disableUnderline: true
              }}
            />
          </div>}
        </GridWrapper>

        <div className='grid grid-cols-5'>
          <button
          disabled={(!isUpdate && offense.offenseLevel?.code === undefined) || (isUpdate && offenseData.offenseLevel?.code === undefined) || isSaving}
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

const columns: any = (setConfirmDelete: any, handleEdit:any) => [
  {
    field: 'caseNumber',
    headerName: 'Case Number',
    width: 120,
  },
  {
    field: 'offenseLevel',
    headerName: 'Offense Level',
    width: 180,
    renderCell: (params: any) => params.value.name
  },
  {
    field: 'violationCategory',
    headerName: 'Subject',
    width: 180,
    renderCell: (params:any) => params.value.name
  },
  {
    field: 'violations',
    headerName: 'Description',
    width: 200,
    renderCell: (params:any) => params.value.name
  },
  {
    field: 'offenseStage',
    headerName: 'Offense Stage',
    flex: 1,
    renderCell: (params:any) => params.value.name
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params: any) => {
      return <div>
        {/* <IconButton size='small' onClick={() => setConfirmDelete({ row: params.row, status: true })}>
          <Delete />
        </IconButton> */}
        <IconButton size='small' onClick={() => handleEdit(params.row)}>
          <Edit />
        </IconButton>
      </div>
    },
  },
];

const allColumns: any = (setConfirmDelete: any, handleEdit:any) => [
  ...columns,
  {
    field: 'misconductReportIssueDate',
    headerName: 'Workplace Misconduct Report Issue Date',
    width: 120,
    renderCell: (params:any) => params.value && moment(params.value).format("YYYY/MM/DD")
  },
  {
    field: 'noticeToExplainIssueDate',
    headerName: 'Notice To Explain Issue Date',
    width: 120,
    renderCell: (params:any) => params.value && moment(params.value).format("YYYY/MM/DD")
  },
  {
    field: 'explanationDate',
    headerName: 'Explanation Date',
    width: 120,
    renderCell: (params:any) => params.value && moment(params.value).format("YYYY/MM/DD")
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
    renderCell: (params:any) => params.value && moment(params.value).format("YYYY/MM/DD")
  },
  {
    field: 'cleansingPeriod',
    headerName: 'Cleansing Period',
    width: 120,
    renderCell: (params:any) => params.value && moment(params.value).format("YYYY/MM/DD")
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
