/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Button,
  Dialog,
  Divider,
  IconButton,
  Snackbar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import {
  Clear,
  CloudDoneOutlined,
  CloudOffOutlined,
  CloudUploadOutlined,
  PersonAddTwoTone,
  SaveTwoTone,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import UploaderTable from './uploader.table';
import { LoadingButton } from '@mui/lab';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Allowed extensions for input file
const allowedExtensions = ['csv'];
const requiredHeaders = [
  'Last Name',
  'First Name',
  'Middle Name',
  'Suffix',
  'Birth Date',
  'Gender',
  'Civil Status',
  'Citizenship',
  'Personal Contact Number',
  'Personal Email',
];

const EmployeeUploader = ({ open, setOpen }: Props) => {
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<any>([]);
  const [missingHeaders, setMissingHeaders] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!open) {
      handleRemoveFile();
    }
  }, [open]);

  useEffect(() => {
    file && handleParse();
  }, [file]);

  const handleChange = (e: any) => {
    const csv = e.target?.files[0];

    const fileExtension = csv?.type.split('/')[1];
    if (!allowedExtensions.includes(fileExtension)) {
      setError('Please input a csv file');
      return;
    }

    setError('');
    setMissingHeaders([]);
    setFile(csv);
  };

  const handleParse = () => {
    if (!file) return setError('Enter a valid file');
    setError('');
    setMissingHeaders([]);
    const reader = new FileReader();

    reader.onload = async ({ target }: any) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData: any = csv?.data;
      const columns = Object.keys(parsedData[0]);

      const file_obj = parsedData
        .filter((data: any, idx: number) => {
          return idx > 0;
        })
        .map((data: any) => {
          return columns?.reduce((prevVal: any, curVal: any) => {
            return {
              ...prevVal,
              [parsedData[0][curVal]]: data[curVal],
            };
          }, {});
        })
        .filter((data: any) => data.lastName && data.firstName);

      console.log(file_obj);

      setData(file_obj);

      const missingHeaders: string[] = [];
      requiredHeaders.forEach((header) => {
        const idx = columns.findIndex((col) => col === header);
        idx === -1 && missingHeaders.push(header);
      });

      if (missingHeaders.length > 0) {
        setError('Missing Headers');
        setMissingHeaders(missingHeaders);
      }
    };
    reader.readAsText(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      console.log({ data });
      setTimeout(() => {
        setSaving(false);
        setSaved(true);

        setTimeout(() => {
          setOpen(false);
        }, 2000);
      }, 2000);
    } catch (error) {
      console.log('handleSave error:', error);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setData([]);
    setError('');
    setMissingHeaders([]);
    setShow(false);
    setSaved(false);
    setSaving(false);
  };

  const disabled = error ? true : false || missingHeaders.length > 0;

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <section className="w-full max-w-[550px] min-w-[550px] rounded-sm p-4 flex flex-col gap-4">
        <strong className="text-sm">
          <PersonAddTwoTone /> Upload Employee Details
        </strong>

        <Snackbar
          open={saved}
          autoHideDuration={2000}
          onClose={() => setSaved(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity="success">Employee Details Saved</Alert>
        </Snackbar>

        <Divider />
        <label
          className={`flex flex-col items-center justify-center h-[100px] w-full border border-dashed ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-lg cursor-pointer hover:bg-gray-100 transition-all duration-200`}
        >
          {file && missingHeaders.length <= 0 ? (
            <CloudDoneOutlined className="text-green-500 text-[60px]" />
          ) : file && missingHeaders.length > 0 ? (
            <CloudOffOutlined className="text-red-500 text-[60px]" />
          ) : (
            <CloudUploadOutlined className="text-gray-500 text-[60px]" />
          )}

          <span className="text-sm">
            Click to <strong className="text-sky-500">browse</strong> files.
          </span>
          <input
            disabled={saving}
            hidden
            accept=".csv"
            type="file"
            onChange={handleChange}
            value={file && null}
          />
        </label>

        {file && (
          <div className="flex flex-row gap-2 items-center">
            <div className="uppercase p-1 bg-green-500 rounded-md text-white font-bold">
              {file?.type.split('/')[1]}
            </div>

            <div className="font-bold flex flex-row gap-2 items-center w-full">
              <strong className="flex-1 text-[16px]">
                {file?.name.split('.csv')[0]}
              </strong>
              <small className="bg-gray-100 px-2 py-1 rounded-sm text-xs">
                {file?.size} bytes
              </small>
            </div>

            <IconButton
              disabled={disabled}
              size="small"
              onClick={() => setShow(!show)}
            >
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <IconButton
              size="small"
              onClick={handleRemoveFile}
              disabled={saving}
            >
              <Clear />
            </IconButton>
          </div>
        )}

        {missingHeaders.length > 0 ? (
          <Alert severity="error">
            <strong>{missingHeaders.join(', ')}</strong>{' '}
            {missingHeaders.length > 1 ? 'are' : 'is'} required.
          </Alert>
        ) : (
          error && <Alert severity="error">{error}</Alert>
        )}

        {file && !error && missingHeaders.length <= 0 && (
          <Alert severity="success">File validation success.</Alert>
        )}

        {file && show && !error && missingHeaders.length <= 0 && (
          <UploaderTable rows={data && data} />
        )}

        <Divider />

        <section className="flex items-center justify-end">
          <LoadingButton
            loading={saving}
            size="small"
            variant="contained"
            color="primary"
            disableElevation
            className="bg-sky-500 hover:bg-sky-600 disabled:bg-gray-200"
            disabled={disabled || !file}
            startIcon={<SaveTwoTone />}
            onClick={handleSave}
            loadingPosition="start"
          >
            {saving ? 'Saving' : 'Save'} Employee Details
          </LoadingButton>
          <Button
            size="small"
            variant="text"
            onClick={() => setOpen(false)}
            disableElevation
            className="text-gray-500 hover:text-black"
          >
            Close
          </Button>
        </section>
      </section>
    </Dialog>
  );
};

export default EmployeeUploader;
