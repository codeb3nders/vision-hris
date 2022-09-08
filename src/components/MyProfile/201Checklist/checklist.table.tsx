/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { AddTaskTwoTone, Delete, SaveTwoTone } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ProfileCtx } from '../profile.main';
import AddButton from 'CustomComponents/AddButton';
import GridWrapper from 'CustomComponents/GridWrapper';

type Props = {};

type ChecklistModel = {
  documentCode: string;
  documentDescription?: string;
  dateUploaded: string;
  fileType?: string;
  url?: string;
  remarks?: string;
};

const ChecklistTable = (props: Props) => {
  const { isNew, setUpdatedDetails } = useContext(ProfileCtx);
  const [rows, setRows] = useState<ChecklistModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = (params: any) => {
    setUpdatedDetails((prev: any) => ({ ...prev, employee201Files: rows }));
    setRows((prev: any) => {
      const filtered = prev.filter(
        (a: any) => a.documentCode !== params.row.documentCode
      );
      return filtered;
    });
  };

  useEffect(() => {
    !isNew &&
      rows.length > 0 &&
      setUpdatedDetails((prev: any) => ({ ...prev, employee201Files: rows }));

    rows.length <= 0 &&
      setUpdatedDetails((prev: any) => {
        delete prev?.employee201Files;
        return prev;
      });
  }, [rows]);

  return (
    <div>
      <File201Dialog open={open} setOpen={setOpen} setRows={setRows} />

      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          disableSelectionOnClick
          rows={rows}
          columns={columns(handleDelete)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowHeight={() => 'auto'}
          getRowId={(data) => data.documentCode}
        />
      </div>

      <AddButton text='Add 201 File' setOpen={setOpen} />
    </div>
  );
};

const file201InitialState = {
  dateUploaded: '',
  documentCode: '',
  documentDescription: '',
  fileType: '',
  remarks: '',
  url: '',
};

const File201Dialog = ({ open, setOpen, setRows }) => {
  const { enums } = useContext(ProfileCtx);
  const [newChecklist, setNewChecklist] =
    useState<ChecklistModel>(file201InitialState);

  const handleSave201File = () => {
    setRows((prev) => [...prev, newChecklist]);
    setNewChecklist(file201InitialState);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className='p-6 flex flex-col gap-4 w-[550px]'>
        <p className='text-md font-bold '>
          <AddTaskTwoTone /> New 201 File
        </p>
        <GridWrapper colSize='2'>
          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <FormControl variant='standard' size='small' fullWidth required>
              <InputLabel id='cat'>Document</InputLabel>
              <Select
                label='Document'
                labelId='cat'
                onChange={(e: any) =>
                  setNewChecklist({
                    ...newChecklist,
                    documentCode: e.target.value,
                  })
                }
              >
                {enums.file201.map((document: any) => {
                  return (
                    <MenuItem
                      key={document.code}
                      id={document.code}
                      value={document.code}
                    >
                      {document.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <TextField
              fullWidth
              variant='standard'
              size='small'
              multiline
              label='Document Description'
              onChange={(e: any) =>
                setNewChecklist({
                  ...newChecklist,
                  documentDescription: e.target.value,
                })
              }
            />
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <TextField
              fullWidth
              variant='standard'
              size='small'
              label='File Type'
              onChange={(e: any) =>
                setNewChecklist({
                  ...newChecklist,
                  fileType: e.target.value,
                })
              }
            />
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <TextField
              fullWidth
              variant='standard'
              size='small'
              label='URL'
              onChange={(e: any) =>
                setNewChecklist({ ...newChecklist, url: e.target.value })
              }
            />
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label='Date Uploaded'
                onChange={(value) =>
                  setNewChecklist({
                    ...newChecklist,
                    dateUploaded: moment(value).format('LL'),
                  })
                }
                value={new Date()}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant='standard' />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className='desktop:col-span-1 laptop:col-span-1 tablet:col-span-1 phone:col-span-2'>
            <TextField
              multiline
              fullWidth
              variant='standard'
              size='small'
              label='Remarks'
              onChange={(e: any) =>
                setNewChecklist({ ...newChecklist, remarks: e.target.value })
              }
            />
          </div>
        </GridWrapper>

        <div className='grid grid-cols-5'>
          <button
            disabled={!newChecklist.documentCode}
            onClick={handleSave201File}
            className='col-span-3 px-2 py-1 bg-green-500 text-white rounded-md w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
          >
            <SaveTwoTone fontSize='small' className='mr-2' />
            Save Task
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

const columns: any = (handleDelete: any) => [
  {
    field: 'documentCode',
    headerName: 'Document',
    flex: 1,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: 'documentDescription',
    headerName: 'Description',
    flex: 1,
    renderCell: (params: any) => {
      return params.value;
    },
  },
  {
    field: 'fileType',
    headerName: 'File Type',
    flex: 1,
    renderCell: (params: any) => {
      return params.value;
    },
  },

  {
    field: 'dateUploaded',
    headerName: 'Date Uploaded',
    flex: 1,
  },
  {
    field: 'url',
    headerName: 'URL',
    flex: 1,
    renderCell: (params: any) => {
      return (
        <div className='flex flex-row items-center w-full gap-1'>
          <span className='text-xs'>
            <a
              href={params.value}
              target='_blank'
              rel='noreferrer'
              className='text-sky-500'
            >
              {params.value}
            </a>
          </span>
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

export default ChecklistTable;
