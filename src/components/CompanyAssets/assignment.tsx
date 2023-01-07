/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import {
  Checkbox,
  Dialog,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  LaptopChromebookTwoTone,
  SaveTwoTone,
} from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import AddButton from 'CustomComponents/AddButton';
import GridWrapper from 'CustomComponents/GridWrapper';
import { AppCtx } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import {
  data as _getCompanyAssetsData, dataStatus as _getCompanyAssetsDataStatus,
  updateAction as updateCompanyAsset,
} from 'slices/companyAssets';
import {
  createAction as createEmployeeAsset
} from 'slices/assets';
import ConfirmDelete from 'components/Other/confirm.delete';
import { getEmployeeItems as _getEmployeeItems } from 'slices';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import { ASSET_CONDITIONS } from 'constants/Values';
import { AssetInitialState, AssetModel } from 'components/MyProfile/Assets/assets.table';
import { CompanyAssetModel } from '.';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';

var moment = require('moment-business-days');
type Props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    access_token: string;
    assetData: AssetModel;
    failed: any;
};

const AssetAssignment = ({ setOpen, open, access_token, assetData, failed }: Props) => {
  const dispatch = useDispatch();
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const [assignedAsset, setAssignedAsset] = useState<AssetModel>(AssetInitialState);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [employees, setEmployees] = useState<EmployeeDBI[]>([]);
  const getEmployeeItems = useSelector(_getEmployeeItems);
  
  useEffect(() => {
    const employees = [...getEmployeeItems];
    setEmployees(employees.sort((a:any, b:any) => a.lastName.localeCompare(b.lastName)))
  }, [getEmployeeItems])

  useEffect(() => { 
    if (assetData.companyAssetId) {
      setAssignedAsset(assetData)
    }
  }, [assetData])

  const handleSave = async () => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("asset-assignment-dialog");
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
      setIsSaving(true);
      try {
        const { companyAssetDetails, id, timestamp, ...rest } = assignedAsset;
        await dispatch(
          createEmployeeAsset({
            body: { ...rest },
            access_token,
          })
        );
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  // console.log({assetData}, "xxxxxxxxxxxxxxxxxxxxxxxxx", {assignedAsset})
  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="asset-assignment-dialog">
      <div className='p-6 flex flex-col gap-4 w-[550px]'>
        <p className='text-md font-bold '>
          <LaptopChromebookTwoTone /> Asset Assignment
        </p>

        <GridWrapper colSize='2'>  
          <div className='col-span-2'>
            <FormControl variant='standard' size='small' fullWidth required>
              <InputLabel id='assigned-to'>Assign To</InputLabel>
              <Select
                label='Assigned To'
                labelId='assigned-to'
                onChange={(e: any) => {
                  setAssignedAsset({ ...assignedAsset, employeeNo: e.target.value });
                }}
              >
                {employees.map((employee:EmployeeDBI) => {
                  return (
                    <MenuItem key={employee.employeeNo} value={employee.employeeNo}>
                      {employee.lastName}, {employee.firstName} ({employee.employeeNo})
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Date Assigned'
                onChange={(value) => {
                  setAssignedAsset({
                    ...assignedAsset,
                    dateAssigned: value,
                  });
                }}
                value={assignedAsset.dateAssigned || null}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl variant='standard' size='small' fullWidth>
              <InputLabel id='condition'>Condition</InputLabel>
              <Select
                label='Condition'
                labelId='condition'
                onChange={(e: any) => {
                  setAssignedAsset({
                    ...assignedAsset,
                    conditionAssigned: e.target.value,
                  });
                }}
                defaultValue={assignedAsset.conditionAssigned}
              >
                {ASSET_CONDITIONS.map((o) => {
                  return (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className='col-span-2'>
            <TextField
              fullWidth
              variant='standard'
              size='small'
              label='Remarks'
              multiline
              onChange={(e: any) => {
                setAssignedAsset({
                    ...assignedAsset,
                    remarks: e.target.value,
                  });
              }}
              defaultValue={assignedAsset.remarks}
            />
          </div>
        </GridWrapper>

        <div className='grid grid-cols-7'>
          <button
            disabled={isSaving}
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
  )
}

export default AssetAssignment;
