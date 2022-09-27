/* eslint-disable react-hooks/exhaustive-deps */
import { Add, AttachMoneyTwoTone, Delete, SaveTwoTone } from '@mui/icons-material';
import { Dialog, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { EmployeeI } from 'slices/interfaces/employeeI';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { ProfileCtx } from '../profile.main';

type Props = {};

const initialData = {
  allowanceType: '',
  amount: ''
}

const AllowanceDetails = (props: Props) => {
  const { setUpdatedDetails, isNew, enums, getIcon, employeeDetails, setEmployeeDetails } = useContext(ProfileCtx);
  const [open, setOpen] = useState<boolean>(false);
  const [allowances, setAllowances] = useState<any[]>([]);
  const [withUpdate, setWithUpdate] = useState<boolean>(false);

  const withData = useMemo(() => {
    return allowances.some((x:any) => x.amount || x.allowanceType)
  }, [allowances])

  useEffect(() => {
    if (isNew && withData) {
      setEmployeeDetails((prev:any) => {
        return {
          ...prev,
          allowanceDetails: allowances
        }
      })
    }
  }, [withData]);

  useEffect(() => {
    if (withUpdate) {
      if (!isNew) {
        setUpdatedDetails((prev: any) => {
          return {
            ...prev,
            allowanceDetails: allowances
          }
        })
      } else {
        setEmployeeDetails((prev:EmployeeI) => {
          return {
            ...prev,
            allowanceDetails: allowances
          }
        })
      }
    }
  }, [allowances])

  useEffect(() => {
    const dbData:any[] = employeeDetails?.allowanceDetails || [];
    setAllowances(dbData);
  }, [employeeDetails.allowanceDetails]);

  const handleDelete = (params: any) => {
    setAllowances((prev: any) => {
      const filtered = prev.filter((a: any) => !(a.allowanceType === params.row.allowanceType && a.amount === params.row.amount));
      return filtered;
    });
    setWithUpdate(true);
  };
  
  return (
    <CollapseWrapper
      panelTitle='Allowance Details'
      icon={() => getIcon(<AttachMoneyTwoTone />, "allowanceDetails")}
      contentClassName='p-0'
    >
      <AllowanceDialog
        open={open}
        setOpen={setOpen}
        setAllowances={setAllowances}
        enums={enums}
        setWithUpdate={setWithUpdate}
      />
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) => data?.allowanceType}
          autoHeight
          disableSelectionOnClick
          rows={allowances}
          columns={columns(handleDelete)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowHeight={() => 'auto'}
        />
      </div>
      <div className='flex justify-end'>
        <button
          className='px-2 py-1 border border-sky-500 text-sky-500 rounded-md hover:bg-sky-200 transition ease-in-out mt-2'
          onClick={() => setOpen(true)}
        >
          <Add fontSize='small' /> Add Allowance Details
        </button>
      </div>
    </CollapseWrapper>
  );
};

const AllowanceDialog = ({ open, setOpen, setAllowances, enums, setWithUpdate }) => {
  const { resetNotif, failed } = useContext(ProfileCtx);
  const [allowance, setAllowance] = useState<{
    allowanceType: string;
    amount: string;
  }>(initialData);
  const [allowanceTypes, setAllowanceTypes] = useState<any[]>([]);

  useEffect(() => {
    if (!open) {
      setAllowance(initialData);
      resetNotif()
    }
  }, [open]);

  useEffect(() => { 
    setAllowanceTypes(enums.allowance_types)
  }, [enums])

  const handleSave = async() => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("allowance-dialog");
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
      setWithUpdate(true);
      setOpen(false);
      setAllowances((prev: any) => [...prev, { ...allowance }]);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="allowance-dialog">
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <AttachMoneyTwoTone fontSize='small' /> New Allowance Details
        </p>

        <FormControl variant='standard' fullWidth size='small' required>
          <InputLabel id='allowanceType-label'>Allowance Type</InputLabel>
          <Select
            id='allowance-type-select'
            labelId='allowanceType-label'
            onChange={(e: any, option: any) => {
              setAllowance((prev: any) => ({
                ...prev,
                allowanceType: e.target.value,
              }))
            }}
          >
            {allowanceTypes.map((type: any, i: number) => {
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

        <div className='flex flex-row items-center gap-1'>
          <span className='text-xs translate-y-2 '>PHP</span>
          <TextField
            id='allowance-amount'
            variant='standard'
            size='small'
            label='Amount'
            fullWidth
            onChange={(e: any) =>
              setAllowance((prev: any) => ({
                ...prev,
                amount: e.target.value,
              }))
            }
          />
        </div>

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

const columns: any = (handleDelete: any) => {
  return [
    {
      field: 'allowanceType',
      headerName: 'Allowance Type',
      flex: 1,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div className='flex flex-row items-center w-full gap-1'>
            <span className='text-xs'>PHP</span> {params.value}
          </div>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params: any) => {
        return <IconButton size='small' onClick={() => handleDelete(params)}>
          <Delete />
        </IconButton>
      },
    },
  ];
};

export default AllowanceDetails;
