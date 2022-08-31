import { Add, Delete, WorkspacePremiumTwoTone } from '@mui/icons-material';
import { Dialog, IconButton, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import CollapseWrapper from './collapse.wrapper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

type Props = {};

const Certificates = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [exams, setCertificates] = useState<any[]>([]);

  const handleDelete = (params: any) => {
    setCertificates((prev: any) => {
      const filtered = prev.filter((a: any) => a.id !== params.row.id);
      return filtered;
    });
  };

  return (
    <CollapseWrapper
      panelTitle='Licenses and Certifications'
      icon={WorkspacePremiumTwoTone}
    >
      <LicensureDialog
        open={open}
        setOpen={setOpen}
        setCertificates={setCertificates}
      />
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) => data?.certificateNumber}
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
          <Add fontSize='small' /> Add License/Certificate
        </button>
      </div>
    </CollapseWrapper>
  );
};

const LicensureDialog = ({ open, setOpen, setCertificates }) => {
  const [data, setData] = useState<any>({});

  const handleSave = () => {
    setCertificates((prev: any) => [
      ...prev,
      { ...data, id: data.certificateNumber },
    ]);
    setOpen(false);

    setData({
      certificate: '',
      authorizingEntity: '',
      certificateValidUntil: '',
      certificateNumber: '',
    });
  };

  useEffect(() => {
    !open &&
      setData({
        certificate: '',
        authorizingEntity: '',
        certificateValidUntil: '',
        certificateNumber: '',
      });
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <WorkspacePremiumTwoTone fontSize='small' /> New Licence/Certificate
        </p>

        <TextField
          id='certification'
          variant='standard'
          size='small'
          label='License/Certification'
          value={data.certificate}
          onChange={(e: any) =>
            setData((prev: any) => ({
              ...prev,
              certificate: e.target.value,
            }))
          }
        />
        <TextField
          id='authorizing-entity'
          variant='standard'
          size='small'
          label='Authorizing Entity'
          value={data.authorizingEntity}
          onChange={(e: any) =>
            setData((prev: any) => ({
              ...prev,
              authorizingEntity: e.target.value,
            }))
          }
        />

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            label='License/Certification Valid Until'
            value={data?.certificateValidUntil || null}
            onChange={(value: any) =>
              setData((prev: any) => ({
                ...prev,
                certificateValidUntil: moment(value).format('LL'),
              }))
            }
            renderInput={(params) => (
              <TextField
                id='certification-valid-until'
                size='small'
                {...params}
                fullWidth
                variant='standard'
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          id='certification-number'
          variant='standard'
          size='small'
          label='License/Certification Number'
          value={data.certificateNumber}
          onChange={(e: any) =>
            setData((prev: any) => ({
              ...prev,
              certificateNumber: e.target.value,
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

const columns: any = (handleDelete: any) => [
  {
    field: 'certificate',
    headerName: 'License/Certification',
    flex: 1,
  },
  {
    field: 'authorizingEntity',
    headerName: 'Authorizing Entity',
    flex: 1,
  },
  {
    field: 'certificateValidUntil',
    headerName: 'License/Certification Valid Until',
    flex: 1,
  },
  {
    field: 'certificateNumber',
    headerName: 'License/Certification Number',
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

export default React.memo(Certificates);