/* eslint-disable react-hooks/exhaustive-deps */
import { AdminPanelSettingsTwoTone, Delete } from '@mui/icons-material';
import { Dialog, IconButton, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import CollapseWrapper from './collapse.wrapper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { ProfileCtx } from '../profile.main';
import { EmployeeI } from 'slices/interfaces/employeeI';
import AddButton from 'CustomComponents/AddButton';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';

type Props = {};

const Licensure = (props: Props) => {
  const { setEmployeeDetails, isNew, setUpdatedDetails, getIcon } =
    useContext(ProfileCtx);
  const [open, setOpen] = useState<boolean>(false);
  const [exams, setExams] = useState<any[]>([]);

  const handleDelete = (params: any) => {
    setExams((prev: any) => {
      const filtered = prev.filter((a: any) => a.id !== params.row.id);
      return filtered;
    });
  };

  useEffect(() => {
    setEmployeeDetails((prev: EmployeeI) => ({
      ...prev,
      govtProfExamsPassed: exams,
    }));

    !isNew &&
      exams.length > 0 &&
      setUpdatedDetails((prev: any) => ({
        ...prev,
        govtProfExamsPassed: exams,
      }));

    exams.length <= 0 &&
      setUpdatedDetails((prev: any) => {
        delete prev?.govtProfExamsPassed;
        return prev;
      });
  }, [exams]);

  return (
    <CollapseWrapper
      panelTitle='Government/Professional Licensure Examinations Passed'
      icon={() => getIcon(<AdminPanelSettingsTwoTone />, "govtProfExamsPassed")}
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
      <AddButton text='Add Licensure Examinations' setOpen={setOpen} />
    </CollapseWrapper>
  );
};

const LicensureDialog = ({ open, setOpen, setExams }) => {
  const { failed } = useContext(ProfileCtx);
  const [data, setData] = useState<any>({});

  const handleSave = async () => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("licensure-dialog");
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
      setExams((prev: any) => [
        ...prev,
        { ...data, id: `${data.rating}~${data.dateTaken}` },
      ]);
      setOpen(false);

      setData({
        examTitle: '',
        dateTaken: '',
        rating: '',
      });
    }
  };

  useEffect(() => {
    !open &&
      setData({
        examTitle: '',
        dateTaken: '',
        rating: '',
      });
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="licensure-dialog">
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <AdminPanelSettingsTwoTone fontSize='small' /> New Licensure
          Examination
        </p>

        <TextField
          required
          id='title-licensure-exam'
          variant='standard'
          size='small'
          label='Title of Government Exam/Professional Licensure Exam'
          value={data.examTitle}
          onChange={(e: any) =>
            setData((prev: any) => ({
              ...prev,
              examTitle: e.target.value,
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
                required
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
          required
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
      field: 'examTitle',
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

export default React.memo(Licensure);
