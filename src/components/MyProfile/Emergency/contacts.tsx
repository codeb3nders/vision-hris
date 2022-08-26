/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  AddIcCallTwoTone,
  ContactPhoneTwoTone,
  Delete,
  SaveTwoTone,
} from '@mui/icons-material';
import { Dialog, IconButton, TextField } from '@mui/material';
import { ProfileCtx } from '../profile.main';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {};

type ContactsI = {
  id: any;
  name: string;
  address: string;
  phoneNumber: string;
  isNew: false;
};

const Contacts = (props: Props) => {
  const { employeeDetails, setEmployeeDetails } = useContext(ProfileCtx);
  const [rows, setRows] = useState<ContactsI[]>([]);
  const [newContact, setNewContact] = useState<any>({
    id: null,
    name: null,
    address: null,
    phoneNumber: null,
  });

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    rows.length <= 0 && setRows(employeeDetails?.emergencyContact);
  }, [employeeDetails]);

  const handleSaveNewContact = () => {
    setOpen(false);

    setRows((prev: any) => [
      ...prev,
      { ...newContact, id: `${newContact.name}~${newContact.phoneNumber}` },
    ]);

    setEmployeeDetails({
      ...employeeDetails,
      emergencyContact: rows,
    });

    setNewContact({ name: null, address: null, phoneNumber: null });
  };

  const handleDelete = (params: any) => {
    setRows((prev: any) => {
      const filtered = prev.filter((a: any) => a.id !== params.row.id);
      return filtered;
    });
  };

  useEffect(() => {
    !open && setNewContact({ name: null, address: null, phoneNumber: null });
  }, [open]);

  return (
    <CollapseWrapper panelTitle='Emergency Contact' icon={ContactPhoneTwoTone}>
      <div className='flex flex-col'>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div className='p-6 flex flex-col gap-4 w-[350px]'>
            <p className='text-md font-bold '>
              <AddIcCallTwoTone fontSize='small' /> New Contact
            </p>
            <TextField
              id='emergency-name'
              fullWidth
              variant='standard'
              size='small'
              label='Name'
              onChange={(e: any) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
            />
            <TextField
              id='emergency-address'
              fullWidth
              variant='standard'
              size='small'
              multiline
              minRows={2}
              label='Address'
              onChange={(e: any) =>
                setNewContact({ ...newContact, address: e.target.value })
              }
            />
            <TextField
              id='emergency-phone-number'
              fullWidth
              variant='standard'
              size='small'
              label='Phone Number'
              onChange={(e: any) =>
                setNewContact({ ...newContact, phoneNumber: e.target.value })
              }
            />
            <div className='grid grid-cols-5'>
              <button
                disabled={
                  !newContact.name ||
                  !newContact.address ||
                  !newContact.phoneNumber
                }
                onClick={handleSaveNewContact}
                className='col-span-3 px-2 py-1 bg-green-500 text-white rounded-md w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
              >
                <SaveTwoTone fontSize='small' className='mr-2' />
                Save Contact
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

        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={(data: any) => data.id}
            autoHeight
            disableSelectionOnClick
            rows={rows}
            columns={columns(handleDelete)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            getRowHeight={() => 'auto'}
          />
        </div>

        <div className='flex flex-row items-center justify-end mb-4 '>
          <button
            onClick={() => setOpen(true)}
            className='px-2 py-1 border border-sky-500 text-sky-500 rounded-md hover:bg-sky-200 transition ease-in-out mt-2'
          >
            <AddIcCallTwoTone className='mr-2' fontSize='small' /> Add Contact
          </button>
        </div>
      </div>
    </CollapseWrapper>
  );
};

const columns: any = (handleDelete: any) => [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'address',
    headerName: 'Address',
    flex: 1,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    flex: 1,
    renderCell: (params: any) => {
      return (
        <div className='flex flex-row items-center w-full gap-1'>
          <span className='text-xs'>{params.value}</span>
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

export default Contacts;
