import { Add, AdminPanelSettingsTwoTone, Delete } from '@mui/icons-material';
import { Dialog, IconButton, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import CollapseWrapper from './collapse.wrapper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

type Props = {};

const Licensure = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [exams, setExams] = useState<any[]>([]);

  const handleDelete = (params: any) => {
    setExams((prev: any) => {
      const filtered = prev.filter((a: any) => a.id !== params.row.id);
      return filtered;
    });
  };

  return (
    <CollapseWrapper
      panelTitle='Government/Professional Licensure Examinations Passed'
      icon={AdminPanelSettingsTwoTone}
    >
      <LicensureDialog open={open} setOpen={setOpen} setExams={setExams} />
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) => data?.dateTaken}
          autoHeight
          disableSelectionOnClick
          rows={exams}
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
          <Add fontSize='small' /> Add Licensure Examinations
        </button>
      </div>
    </CollapseWrapper>
  );
};

const LicensureDialog = ({ open, setOpen, setExams }) => {
  const [data, setData] = useState<any>({});

  const handleSave = () => {
    setExams((prev: any) => [
      ...prev,
      { ...data, id: `${data.rating}~${data.dateTaken}` },
    ]);
    setOpen(false);

    setData({
      examinationTitle: '',
      dateTaken: '',
      rating: '',
    });
  };

  useEffect(() => {
    !open &&
      setData({
        examinationTitle: '',
        dateTaken: '',
        rating: '',
      });
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <AdminPanelSettingsTwoTone fontSize='small' /> New Licensure
          Examination
        </p>

        <TextField
          id='title-licensure-exam'
          variant='standard'
          size='small'
          label='Title of Government Exam/Professional Licensure Exam'
          value={data.examinationTitle}
          onChange={(e: any) =>
            setData((prev: any) => ({
              ...prev,
              examinationTitle: e.target.value,
            }))
          }
        />

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label='Date taken'
            value={data?.dateTaken || null}
            onChange={(value: any) =>
              setData((prev: any) => ({
                ...prev,
                dateTaken: moment(value).format('LL'),
              }))
            }
            renderInput={(params) => (
              <TextField
                id='date-taken'
                size='small'
                {...params}
                fullWidth
                variant='standard'
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          id='rating'
          variant='standard'
          size='small'
          label='Rating'
          value={data.rating}
          onChange={(e: any) =>
            setData((prev: any) => ({
              ...prev,
              rating: e.target.value,
            }))
          }
        />

        <button
          className='px-2 py-1 w-full bg-green-500 text-white'
          onClick={handleSave}
        >
          Save Licensure Examination
        </button>
      </div>
    </Dialog>
  );
};

const columns: any = (handleDelete: any) => {
  return [
    {
      field: 'examinationTitle',
      headerName: 'Title of Government Exam/Professional Licensure Exam',
      flex: 1,
    },
    {
      field: 'dateTaken',
      headerName: 'Date Taken',
      flex: 1,
    },
    {
      field: 'rating',
      headerName: 'Rating',
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

export default Licensure;
