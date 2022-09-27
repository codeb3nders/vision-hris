/* eslint-disable react-hooks/exhaustive-deps */
import { BadgeTwoTone, Delete, SaveTwoTone } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import CollapseWrapper from './collapse.wrapper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Badge, Dialog, IconButton, TextField } from '@mui/material';
import moment from 'moment';
import { ProfileCtx } from '../profile.main';
import { EmployeeI } from 'slices/interfaces/employeeI';
import AddButton from 'CustomComponents/AddButton';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';

type Props = {};
const initialData = {
        yrFrom: '',
        yrTo: '',
        companyName: '',
        companyAddress: '',
        positionHeld: '',
      }

const EmploymentRecord = (props: Props) => {
  const { setEmployeeDetails, isNew, setUpdatedDetails, getIcon, employeeDetails, updatedDetails } =
    useContext(ProfileCtx);
  const [records, setRecords] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [withUpdate, setWithUpdate] = useState<boolean>(false);

  const withData = useMemo(() => {
    return records.some((x:any) => x.yrFrom || x.yrTo || x.companyName || x.companyAddress || x.positionHeld)
  }, [records])

  useEffect(() => {
    if (isNew && withData) {
      setEmployeeDetails((prev:any) => {
        return {
          ...prev,
          employmentRecords: records
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
            employmentRecords: records
          }
        })
      } else {
        setEmployeeDetails((prev:EmployeeI) => {
          return {
            ...prev,
            employmentRecords: records
          }
        })
      }
    }
  }, [records])

  useEffect(() => {
    const dbData:any[] = employeeDetails?.employmentRecords || [];
    setRecords(dbData);
  }, [employeeDetails.employmentRecords]);

  const handleDelete = (params: any) => {
    setRecords((prev: any) => {
      const filtered = prev.filter((a: any) => {
        const paramsKey = `${params.row.companyName}-${params.row.yrFrom}-${params.row.yrTo}`;
        const aKey = `${a?.companyName}-${a?.yrFrom}-${a?.yrTo}`;
        return paramsKey != aKey
      });
      return filtered;
    });
    setWithUpdate(true);
  };

  return (
    <CollapseWrapper panelTitle='Employment Record' icon={()=>getIcon(<BadgeTwoTone />, "employmentRecords")}>
      <RecordDialog open={open} setOpen={setOpen} setRecords={setRecords} setWithUpdate={setWithUpdate} />
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) => `${data?.companyName}-${data?.yrFrom}-${data?.yrTo}`}
          autoHeight
          disableSelectionOnClick
          rows={records}
          columns={columns(handleDelete)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowHeight={() => 'auto'}
        />
      </div>
      <AddButton text='Add Employment Record' setOpen={setOpen} />
    </CollapseWrapper>
  );
};

const RecordDialog = ({ open, setOpen, setRecords, setWithUpdate }) => {
  const { failed, resetNotif } = useContext(ProfileCtx);
  const [data, setData] = useState<any>({});

  const handleSave = async() => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("employmentRecord-dialog");
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
      setRecords((prev: any) => [...prev, data]);
      setOpen(false);
      setData(initialData);
    }
  };

  useEffect(() => {
    if (!open) {
      setData(initialData);
      resetNotif()
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="employmentRecord-dialog">
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <BadgeTwoTone fontSize='small' /> New Employment Record
        </p>

        <div>
          <span>Years of Inclusion</span>
          <span className='flex flex-row p-1 text-xs w-full gap-4'>
            <span className='flex-1'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label='From'
                  value={data?.yrFrom || null}
                  views={['year']}
                  onChange={(value: any) =>
                    setData((prev: any) => ({
                      ...prev,
                      yrFrom: moment(value).startOf("year").format("YYYY")
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      id='years-of-inclusion-from'
                      size='small'
                      {...params}
                      fullWidth
                      variant='standard'
                      required
                    />
                  )}
                />
              </LocalizationProvider>
            </span>
            <span className='flex-1'>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label='To'
                  views={['year']}
                  value={data?.yrTo || null}
                  onChange={(value: any) =>
                    setData((prev: any) => ({
                      ...prev,
                      yrTo: moment(value).startOf("year").format("YYYY")
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      id='years-of-inclusion-to'
                      size='small'
                      {...params}
                      fullWidth
                      variant='standard'
                      required
                    />
                  )}
                />
              </LocalizationProvider>
            </span>
          </span>
        </div>

        <TextField
          id='company-name'
          required
          variant='standard'
          label='Company Name'
          value={data.companyName}
          onChange={(e: any) =>
            setData((prev: any) => ({ ...prev, companyName: e.target.value }))
          }
        />
        <TextField
          id='company-address'
          required
          variant='standard'
          label='Company Address'
          multiline
          value={data.companyAddress}
          onChange={(e: any) =>
            setData((prev: any) => ({
              ...prev,
              companyAddress: e.target.value,
            }))
          }
        />
        <TextField
          id='position-held'
          variant='standard'
          required
          label='Position Held'
          value={data.positionHeld}
          onChange={(e: any) =>
            setData((prev: any) => ({ ...prev, positionHeld: e.target.value }))
          }
        />

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
      field: 'yearsOfInclusion',
      headerName: 'Years of Inclusions',
      width: 300,
      renderCell: (params: any) => {
        return (
          <div className='text-xs'>
            <span>{params?.row?.yrFrom}</span>
            <span className='mx-2'> - </span>
            <span>{params?.row?.yrTo}</span>
          </div>
        );
      },
    },
    {
      field: 'companyName',
      headerName: 'Company Name',
      width: 150,
      renderCell: (params: any) => {
        return <span className='text-xs'>{params.value}</span>;
      },
    },
    {
      field: 'companyAddress',
      headerName: 'Company Address',
      width: 300,
      renderCell: (params: any) => {
        return <span className='text-xs'>{params.value}</span>;
      },
    },
    {
      field: 'positionHeld',
      headerName: 'Position Held',
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
};

export default React.memo(EmploymentRecord);
