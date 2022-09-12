/* eslint-disable react-hooks/exhaustive-deps */
import { Add, AttachMoneyTwoTone, Delete } from '@mui/icons-material';
import { Dialog, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { ProfileCtx } from '../profile.main';

type Props = {};

const AllowanceDetails = (props: Props) => {
  const { setUpdatedDetails, isNew, enums } = useContext(ProfileCtx);
  const [open, setOpen] = useState<boolean>(false);
  const [allowances, setAllowances] = useState<any[]>([]);

  const handleDelete = (params: any) => {
    setAllowances((prev: any) => {
      const filtered = prev.filter((a: any) => a.id !== params.row.id);
      return filtered;
    });
  };

  useEffect(() => {
    !isNew &&
      allowances.length > 0 &&
      setUpdatedDetails((prev: any) => ({
        ...prev,
        allowanceDetails: allowances,
      }));

    allowances.length <= 0 &&
      setUpdatedDetails((prev: any) => {
        delete prev?.allowanceDetails;
        return prev;
      });
  }, [allowances]);

  return (
    <CollapseWrapper
      panelTitle='Allowance Details'
      icon={AttachMoneyTwoTone}
      contentClassName='p-0'
    >
      <AllowanceDialog
        open={open}
        setOpen={setOpen}
        setAllowances={setAllowances}
        enums={enums}
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

const AllowanceDialog = ({ open, setOpen, setAllowances, enums }) => {
  const [allowance, setAllowance] = useState<{
    allowanceType: string;
    amount: string;
  }>({ allowanceType: '', amount: '' });
  const [allowanceTypes, setAllowanceTypes] = useState<any[]>([]);

  useEffect(() => { 
    setAllowanceTypes(enums.allowance_types)
  }, [enums])

  const handleSave = () => {
    setOpen(false);
    setAllowances((prev: any) => [...prev, { ...allowance }]);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
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

        <button
          className='px-2 py-1 w-full bg-green-500 text-white'
          onClick={handleSave}
        >
          Save Allowance Details
        </button>
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
};

export default AllowanceDetails;
