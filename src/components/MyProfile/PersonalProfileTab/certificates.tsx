/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Delete, SaveTwoTone, WorkspacePremiumTwoTone } from '@mui/icons-material';
import { Dialog, IconButton, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useMemo, useState } from 'react';
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
const initialData = {
  certificate: '',
  authorizingEntity: '',
  validUntil: '',
  licenseCertNo: '',
}
const Certificates = (props: Props) => {
  const { setEmployeeDetails, isNew, setUpdatedDetails, getIcon, employeeDetails, updatedDetails } =
    useContext(ProfileCtx);
  const [open, setOpen] = useState<boolean>(false);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [withUpdate, setWithUpdate] = useState<boolean>(false);

  const withData = useMemo(() => {
    return certificates.some((x:any) => x.certificate || x.authorizingEntity || x.validUntil || x.licenseCertNo)
  }, [certificates])

  useEffect(() => {
    if (isNew && withData) {
      setEmployeeDetails((prev:any) => {
        return {
          ...prev,
          licensesCertifications: certificates
        }
      })
    }
  }, [withData]);

  useEffect(() => {
    if (!isNew && withUpdate) {
      if (withData) {
        setUpdatedDetails((prev: any) => {
          return {
            ...prev,
            licensesCertifications: certificates
          }
        })
      } else {
        if (updatedDetails) {
          setUpdatedDetails((prev: any) => {
            const { licensesCertifications, ...rest } = prev;
            return {
              ...rest
            }
          })
        } else {
          setUpdatedDetails((prev: any) => {
            return {
              ...prev,
              licensesCertifications: []
            }
          })
        }
      }
      setWithUpdate(false);
    }
  }, [certificates])

  useEffect(() => {
    const dbData:any[] = employeeDetails?.licensesCertifications || [];
    setCertificates(dbData);
  }, [employeeDetails.licensesCertifications]);

  const handleDelete = (params: any) => {
    setCertificates((prev: any) => {
      const filtered = prev.filter((a: any) => {
        const paramsKey = `${params.row.name}-${params.row.licenseCertNo}`;
        const aKey = `${a?.name}-${a?.licenseCertNo}`;
        return paramsKey !== aKey;
      });
      return filtered;
    });
    setWithUpdate(true);
  };

  return (
    <CollapseWrapper
      panelTitle='Licenses and Certifications'
      icon={() => getIcon(<WorkspacePremiumTwoTone />, "licensesCertifications")}
    >
      <LicensureDialog
        open={open}
        setOpen={setOpen}
        setCertificates={setCertificates}
        setWithUpdate={setWithUpdate}
      />
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) => data?.licenseCertNo}
          autoHeight
          disableSelectionOnClick
          rows={certificates}
          columns={columns(handleDelete)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowHeight={() => 'auto'}
        />
      </div>
      <AddButton text='Add License/Certificate' setOpen={setOpen} />
    </CollapseWrapper>
  );
};

const LicensureDialog = ({ open, setOpen, setCertificates, setWithUpdate }) => {
  const {setOpenNotif, failed} = useContext(ProfileCtx)
  const [data, setData] = useState<any>({});

  const handleSave = async() => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("certificates-dialog");
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
      setCertificates((prev: any) => [
        ...prev,
        data
      ]);
      setOpen(false);
      setData(initialData);
    }
  };

  useEffect(() => {
    if (!open) {
      setData(initialData);
      setOpenNotif({ message: '', status: false, severity: '' })
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="certificates-dialog">
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <WorkspacePremiumTwoTone fontSize='small' /> New Licence/Certificate
        </p>

        <TextField
          id='certification'
          required
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
          required
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
            value={data?.validUntil || null}
            onChange={(value: any) =>
              setData((prev: any) => ({
                ...prev,
                validUntil: value,
              }))
            }
            renderInput={(params) => (
              <TextField
                id='certification-valid-until'
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
          id='certification-number'
          required
          variant='standard'
          size='small'
          label='License/Certification Number'
          value={data.licenseCertNo}
          onChange={(e: any) =>
            setData((prev: any) => ({
              ...prev,
              licenseCertNo: e.target.value,
            }))
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
    field: 'validUntil',
    headerName: 'License/Certification Valid Until',
    flex: 1,
    renderCell: (params: any) => moment(params.value).format("LL")
  },
  {
    field: 'licenseCertNo',
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
