/* eslint-disable react-hooks/exhaustive-deps */
import { BadgeTwoTone, EditTwoTone, SaveTwoTone, WorkHistoryTwoTone } from '@mui/icons-material';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { DataGrid, GridCellParams, gridClasses, GridColDef } from '@mui/x-data-grid';
import moment, { Moment } from 'moment';
import { useContext, useEffect, useState } from 'react';
import { ProfileCtx } from '../profile.main';
import { Alert, Button, Dialog, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AppCtx, consoler } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateEmployee,
  getEmployeeUpdateStatus as _getEmployeeUpdateStatus,
  getEmployeeUpdateError as _getEmployeeUpdateError,
  getOneEmployeeAction as _getOneEmployeeAction,
  resetUpdate
} from 'slices';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import { EMPLOYMENT_HISTORY_TYPE } from 'constants/Values';

type Props = {};

const EmployementStatus = (props: Props) => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);
  const { isNew, employeeDetails, enums, failed, setIndex } = useContext(ProfileCtx);
  const [infos, setInfos] = useState<any[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<any[]>([]);
  const [employmentStatus, setEmploymentStatus] = useState<any[]>([]);
  const [editEmployment, setEditEmployment] = useState<any>(); //display
  const [employmentUpdate, setEmploymentUpdate] = useState<any>(); //save to employees table
  const [loading, setLoading] = useState<{ status: boolean; action: string }>({
    status: false,
    action: '',
  });

  useEffect(() => {
    setEmploymentTypes(enums.employment_types);
    setEmploymentStatus(enums.employment_status);
  }, [enums]);

  useEffect(() => {
    getData();
  }, [employeeDetails]);
console.log({employmentUpdate}, {editEmployment})
  const getData = async () => {
    //latest data from employees
    let data: any[] = [], prev_remarks = "";
    //updated employee job info..
    
    if (employeeDetails.employment_history.length > 0) {
      const o:any = employeeDetails.employment_history;
      for (var i = 0; i < o.length; i++){
        const history_data = {
          employmentStatus: employeeDetails.employmentStatus,
          employmentType: employeeDetails.employmentType,
          endOfProbationary: employeeDetails.endOfProbationary,
          contractEndDate: employeeDetails.contractEndDate,
          effectiveDate: new Date(),
          employmentLastUpdate: o[i]?.effectiveDate,
          remarks: prev_remarks,
          ...o[i].details,
          index: i,
        };
        prev_remarks = o[i]?.remarks || "";
        console.log({history_data})
        data.push(history_data);
      }
    }
    data.push({
      index: data.length,
      employmentLastUpdate: employeeDetails.employmentLastUpdate,
      effectiveDate: new Date(),
      employmentStatus: employeeDetails.employmentStatus,
      employmentType: employeeDetails.employmentType,
      endOfProbationary: employeeDetails.endOfProbationary,
      contractEndDate: employeeDetails.contractEndDate,
      remarks: prev_remarks
    })
    data.sort((a: any, b: any) => b.index - a.index);
    setInfos(data);
  }

  const columns: GridColDef[] = [
    {
      field: 'employmentLastUpdate',
      headerName: 'Effective Date',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div className='text-xs p-1'>{moment(params.value).format('LL')}</div>
        );
      },
    },
    {
      field: 'employmentType',
      headerName: 'Employment Type',
      flex: 1,
      renderCell: (params: any) => params.value.name
    },
    {
      field: 'employmentStatus',
      headerName: 'Employment Status',
      flex: 1,
      renderCell: (params: any) => params.value.name
    },
    {
      field: 'endOfProbationary',
      headerName: 'End of Probation',
      flex: 1,
      renderCell: (params: any) => {
        if (params.value) {
          return <div>{moment(params.value).format('LL')}</div>;
        }
        return "N/A";
      }
    },
    {
      field: 'contractEndDate',
      headerName: 'End of Contract',
      flex: 1,
      renderCell: (params: any) => {
        if (params.value) {
          return <div>{moment(params.value).format('LL')}</div>;
        }
        return "N/A";
      }
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: any) => {
        if (params.row.index === (infos.length - 1)) {
          return <Button variant="outlined" size='small' onClick={() => setEditEmployment(params.row)} startIcon={<EditTwoTone />}>
            Edit
          </Button>
        }
        return "";
      },
    },
  ];

  const getDialog = () => {
    const handleSaveChanges = async () => {

      const update = async () => {
        try {
          employmentUpdate.type = EMPLOYMENT_HISTORY_TYPE;
          employmentUpdate.effectiveDate = employeeDetails.employmentLastUpdate;
          employmentUpdate.employmentLastUpdate = moment(employmentUpdate.employmentLastUpdate).endOf("day")
          if (editEmployment.employmentStatus.code.toLowerCase() === "resigned") {
            employmentUpdate.dateInactive = moment(employmentUpdate.employmentLastUpdate).endOf("day")
          }
          consoler(employmentUpdate, 'blue', 'updateEmployment');
          await dispatch(updateEmployee(
            {
              params: { ...employmentUpdate, employeeNo: employeeDetails.employeeNo },
              access_token
            }))
          setEditEmployment(null);
          await dispatch(
            _getOneEmployeeAction({
              access_token,
              params: { employeeNo: employeeDetails.employeeNo },
            })
          );
          setIndex("2")
        } catch (error: any) {
          console.log(error);
        }
      };

      const validateFields = async () => {
        const dialog: any = document.getElementById("dialog-employment");
        const required = dialog.querySelectorAll("[required]");
        let invalidCtr = 0;

        invalidCtr = await Array.from(required)
          .filter((e: any) => !e.value)
          .map((e: any) => e.id).length;

        const employmentType = employmentUpdate?.employmentType || employeeDetails.employmentType.code;
        const endOfProbationary = employmentUpdate?.endOfProbationary || employeeDetails.endOfProbationary;
        const contractEndDate = employmentUpdate?.contractEndDate || employeeDetails.contractEndDate;
        if (employmentType.toLowerCase() == "probationary" && !endOfProbationary) {
          invalidCtr++;
        } else if (employmentType.toLowerCase() == "project" && !contractEndDate) {
          invalidCtr++;
        }
        console.log({ invalidCtr })
        if (invalidCtr > 0) {
          return failed(INCOMPLETE_FORM_MESSAGE);
        }
        return true;
      }
      //check inputs...
      await validateFields();
      await update();
    }
    return <Dialog id="dialog-employment" open={editEmployment !== null} onClose={() => setEditEmployment(null)}>
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <BadgeTwoTone /> Employment Update
        </p>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='type'>Employment Type</InputLabel>
          <Select
            id='employment_type_select'
            labelId='type'
            value={editEmployment?.employmentType.code}
            onChange={(e: any, option: any) => {
              setEmploymentUpdate((prev: any) => ({
                ...prev,
                employmentType: e.target.value,
              }));
              setEditEmployment({
                ...editEmployment,
                employmentType: option.props['data-obj']
              })
            }}
          >
            {employmentTypes.map((type: any, i: number) => {
              return (
                <MenuItem
                  id={`type-${i}`}
                  key={`type-${i}`}
                  data-obj={type}
                  value={type.code}
                >
                  {type.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='statusLabel'>Employment Status</InputLabel>
          <Select
            id='employment_status_select'
            labelId='statusLabel'
            value={editEmployment?.employmentStatus.code}
            onChange={(e: any, option: any) => {
              setEmploymentUpdate((prev: any) => ({
                ...prev,
                employmentStatus: e.target.value,
              }));
              setEditEmployment({
                ...editEmployment,
                employmentStatus: option.props['data-obj']
              })
            }}
          >
            {employmentStatus.map((status: any, i: number) => {
              return (
                <MenuItem key={i} value={status.code} data-obj={status}>{status.name}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label='End of Contract Date (If applicable)'
            value={editEmployment?.contractEndDate || null}
            onChange={(value: any) => {
              setEmploymentUpdate((prev: any) => ({
                ...prev,
                contractEndDate: value
              }));
              setEditEmployment({
                ...editEmployment,
                contractEndDate: value
              })
            }}
            renderInput={(params) => (
              <TextField
                id='end-of-contract'
                size='small'
                {...params}
                fullWidth
                variant='standard'
              />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label='End of Probation Period (If applicable)'
            value={editEmployment?.endOfProbationary || null}
            onChange={(value: any) => {
              setEmploymentUpdate((prev: any) => ({
                ...prev,
                endOfProbationary: value
              }));
              setEditEmployment({
                ...editEmployment,
                endOfProbationary: value
              })
            }}
            renderInput={(params) => (
              <TextField
                id='end-of-probation'
                size='small'
                {...params}
                fullWidth
                variant='standard'
              />
            )}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label='Effective Date'
            onChange={(value) => {
              setEmploymentUpdate({
                ...employmentUpdate,
                employmentLastUpdate: value
              });
              setEditEmployment((prev: any) => ({
                ...prev,
                effectiveDate: value
              }))
            }}
            value={editEmployment.effectiveDate}
            renderInput={(params) => (
              <TextField {...params} fullWidth required variant='standard' />
            )}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          variant='standard'
          size='small'
          label='Remarks'
          id="employment-update-remarks"
          multiline
          onChange={(e: any) => {
            setEmploymentUpdate({ ...employmentUpdate, remarks: e.target.value });
            setEditEmployment({
              ...editEmployment,
              remarks: e.target.value
            })
          }}
        />
        <div className='grid grid-cols-5'>
          <button
            onClick={handleSaveChanges}
            className='col-span-3 px-2 py-1 bg-green-500 text-white rounded-md w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
          >
            <SaveTwoTone fontSize='small' className='mr-2' />
            Save Changes
          </button>
          <button
            className='col-span-2 px-2 py-1 text-slate-400 hover:text-slate-800'
            onClick={() => {
              setEditEmployment(null);
              dispatch(resetUpdate())
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  }

  return (
    <CollapseWrapper
      panelTitle='Employment Status'
      icon={WorkHistoryTwoTone}
      contentClassName='p-0'
      open={true}
    >
      <div style={{ width: '100%' }}>
        {editEmployment && getDialog()}
        <DataGrid
          getRowId={(data: any) => data.index}
          rows={isNew ? [] : infos}
          columns={columns}
          checkboxSelection={false}
          hideFooter={true}
          getRowHeight={() => 'auto'}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
            },
          }}
          autoHeight
          className='border-0'
        />
      </div>
    </CollapseWrapper>
  );
};

export default EmployementStatus;
