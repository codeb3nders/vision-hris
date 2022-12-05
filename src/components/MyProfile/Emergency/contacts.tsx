/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  AddIcCallTwoTone,
  ContactPhoneTwoTone,
  Delete,
  SaveTwoTone,
} from '@mui/icons-material';
import {
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ProfileCtx } from '../profile.main';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { RELATION } from 'constants/Values';
import { EmployeeI } from 'slices/interfaces/employeeI';
import AddButton from 'CustomComponents/AddButton';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';

type Props = {};

type ContactsI = {
  name: string;
  relation: string;
  contactNumber: string;
  address: string;
};

const initialData = {
  name: null,
  address: null,
  contactNumber: null,
  relation: null,
}

const Contacts = (props: Props) => {
  const { setUpdatedDetails, employeeDetails, setEmployeeDetails, getIcon, failed, resetNotif } =
    useContext(ProfileCtx);
  const { isNew } = useContext(EmployeeCtx);
  const [rows, setRows] = useState<ContactsI[]>([]);
  const [newContact, setNewContact] = useState<any>(initialData);
  const [open, setOpen] = useState<boolean>(false);
  const [withUpdate, setWithUpdate] = useState<boolean>(false);

  const withData = useMemo(() => {
    return rows.some((x:any) => x.name || x.relation || x.address || x.contactNumber)
  }, [rows])

  useEffect(() => {
    if (withUpdate) {
      if (!isNew) {
        setUpdatedDetails((prev: any) => {
          return {
            ...prev,
            emergencyContact: rows
          }
        })
      } else {
        setEmployeeDetails((prev:EmployeeI) => {
          return {
            ...prev,
            emergencyContact: rows
          }
        })
      }
    }
  }, [rows])

  useEffect(() => {
    const dbData:any[] = employeeDetails?.emergencyContact || [];
    setRows(dbData);
  }, [employeeDetails.emergencyContact]);
  
  const handleDelete = (params: any) => {
    setRows((prev: any) => {
      const filtered = prev.filter((a: any) => {
        const paramsKey = `${params.row.name}-${params.row.licenseCertNo}`;
        const aKey = `${a?.name}-${a?.licenseCertNo}`;
        return paramsKey !== aKey;
      });
      return filtered;
    });
    setWithUpdate(true);
  };

  const columns: any = (handleDelete: any) => [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'relation',
      headerName: 'Relation',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
    },
    {
      field: 'contactNumber',
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

  const handleSaveNewContact = async() => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("emergency-dialog");
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
      setRows((prev: any) => [
        ...prev,
        newContact
      ]);
      setOpen(false);
      setNewContact(initialData);
    }
  };

  useEffect(() => {
    if (!open) {
      setNewContact(initialData);
      resetNotif()
    }
  }, [open]);

  return (
    <CollapseWrapper panelTitle='Emergency Contact' icon={() => getIcon(<ContactPhoneTwoTone />, "emergencyContact")}>
      <div className='flex flex-col'>
        <Dialog open={open} onClose={() => setOpen(false)} id="emergency-dialog">
          <div className='p-6 flex flex-col gap-4 w-[350px]'>
            <p className='text-md font-bold '>
              <AddIcCallTwoTone fontSize='small' /> Add Emergency Contact
            </p>
            <TextField
              required
              id='emergency-name'
              fullWidth
              variant='standard'
              size='small'
              label='Name'
              onChange={(e: any) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
            />
            <FormControl variant='standard' required>
              <InputLabel id='relation'>Relation</InputLabel>
              <Select
                id='relation'
                labelId='relation'
                onChange={(e: any) =>
                  setNewContact({ ...newContact, relation: e.target.value })
                }
              >
                {RELATION.map((relation: any, i: number) => {
                  return (
                    <MenuItem key={i} value={relation}>
                      {relation}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id='emergency-residence'
              fullWidth
              variant='standard'
              size='small'
              multiline
              required
              minRows={2}
              label='Residence'
              onChange={(e: any) =>
                setNewContact({ ...newContact, address: e.target.value })
              }
            />
            <TextField
              id='emergency-phone-number'
              fullWidth
              variant='standard'
              required
              size='small'
              label='Phone Number'
              onChange={(e: any) =>
                setNewContact({ ...newContact, contactNumber: e.target.value })
              }
            />
            <div className='grid grid-cols-5'>
              <button
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
            getRowId={(data: any) => data.name}
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

        <AddButton text='Add Emergency Contact' cb={() => setOpen(true)} />
      </div>
    </CollapseWrapper>
  );
};

export default Contacts;
