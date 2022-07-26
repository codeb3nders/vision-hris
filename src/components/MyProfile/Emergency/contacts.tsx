import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AddIcCallTwoTone, AddTwoTone, SaveTwoTone } from '@mui/icons-material';
import { Dialog, TextField } from '@mui/material';

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
    field: 'phone_no',
    headerName: 'Phone Number',
    flex: 1,
    renderCell: (params: any) => {
      return params.value;
    },
  },
];

const initialState = [
  {
    id: 1,
    name: 'Jane Doe',
    address: 'Quezon City',
    phone_no: '09771234567',
    is_new: false,
  },
];

const Contacts = (props: Props) => {
  const [rows, setRows] = useState<any[]>(initialState);
  const [newContact, setNewContact] = useState<any>({
    name: null,
    address: null,
    phone_no: null,
  });

  const [open, setOpen] = useState<boolean>(false);

  const handleSaveNewContact = () => {
    setOpen(false);
    setNewContact({ name: null, address: null, phone_no: null });
    const filtered = rows.filter((r) => !r.is_new);
    setRows([...filtered, { ...newContact, id: filtered.length + 1 }]);
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
              setNewContact({ ...newContact, phone_no: e.target.value })
            }
          />
          <div className='grid grid-cols-5'>
            <button
              disabled={
                !newContact.name || !newContact.address || !newContact.phone_no
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
          className='px-2 py-1 bg-sky-500 text-white rounded-md w-[140px] flex items-center justify-center self-end hover:bg-sky-400 transition duration-150'
        >
          <AddTwoTone /> Add Contact
        </button>
      </div>
      <div style={{ minHeight: 300, width: '100%' }}>
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
