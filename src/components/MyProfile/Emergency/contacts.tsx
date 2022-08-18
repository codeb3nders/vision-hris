import { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AddIcCallTwoTone, SaveTwoTone } from '@mui/icons-material';
import { Dialog, TextField } from '@mui/material';
import { ProfileCtx } from '../profile.main';

type Props = {};

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    renderCell: (params: any) => {
      console.log({ params });

      return params.value;
    },
  },
  {
    field: 'address',
    headerName: 'Address',
    flex: 1,
    renderCell: (params: any) => {
      return (
        <TextField
          value={params.value}
          multiline
          disabled
          className='text-xs'
          sx={{
            border: 'none',
            '& > .MuiOutlinedInput-root': {
              p: 0,
              border: 'none',
              '& textarea': {
                border: 'none',
                '-webkit-text-fill-color': '#000',
                fontSize: '.85rem',
              },
              '& fieldset': {
                border: 'none',
              },
            },
          }}
        />
      );
    },
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    flex: 1,
    renderCell: (params: any) => {
      return params.value;
    },
  },
];

type ContactsI = {
  id: any;
  name: string;
  address: string;
  phoneNumber: string;
  isNew: false;
};

const Contacts = (props: Props) => {
  const { isNew, employeeDetails, setEmployeeDetails } = useContext(ProfileCtx);
  const [rows, setRows] = useState<ContactsI[]>([]);
  const [newContact, setNewContact] = useState<any>({
    name: null,
    address: null,
    phoneNumber: null,
  });

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setRows([
      {
        ...employeeDetails?.emergencyContact,
        id: `${employeeDetails?.emergencyContact?.name}~${employeeDetails?.emergencyContact?.phoneNumber}`,
      },
    ]);
  }, [employeeDetails]);

  const handleSaveNewContact = () => {
    setOpen(false);
    setNewContact({ name: null, address: null, phoneNumber: null });
    const filtered = rows.filter((r) => !r.isNew);
    setRows([...filtered, { ...newContact, id: filtered.length + 1 }]);

    setEmployeeDetails({ ...employeeDetails, emergencyContact: newContact });
  };

  return (
    <div className='flex flex-col'>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className='p-6 flex flex-col gap-4 w-[350px]'>
          <p className='text-md font-bold '>
            <AddIcCallTwoTone fontSize='small' /> New Contact
          </p>
          <TextField
            fullWidth
            variant='standard'
            size='small'
            label='Name'
            onChange={(e: any) =>
              setNewContact({ ...newContact, name: e.target.value })
            }
          />
          <TextField
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

      <div className='flex flex-row items-center justify-end mb-4 '>
        <button
          onClick={() => setOpen(true)}
          className='px-2 py-1 bg-sky-500 text-white desktop laptop:rounded-md tablet:rounded-md phone:rounded-sm w-auto flex items-center justify-center self-end hover:bg-sky-400 transition duration-150 desktop:mr-0 laptop:mr-0 tablet:mr-0 phone:mr-4 '
        >
          <AddIcCallTwoTone className='mr-2' fontSize='small' /> Add Contact
        </button>
      </div>
      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          disableSelectionOnClick
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowHeight={() => 'auto'}
        />
      </div>
    </div>
  );
};

export default Contacts;
