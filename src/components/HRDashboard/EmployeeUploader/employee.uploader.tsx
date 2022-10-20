/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Button,
  Dialog,
  Divider,
  IconButton,
  Snackbar,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { createEmployee } from 'slices';
import { AppCtx } from 'App';
import { initialState } from 'components/MyProfile/employee.initialstate';
import { EmployeeI } from 'slices/interfaces/employeeI';
import { generateCompanyEmail, getContractEndDate, getProbationaryEndDate } from 'utils/functions';
import moment from 'moment';

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
  'Date Hired', 'Employment Type', 'Rank', 'Position', 'Department', 'Location'
];

const EmployeeUploader = ({ open, setOpen }: Props) => {
  const { access_token } = useContext(AppCtx);
  const dispatch = useDispatch();
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<any>([]);
  const [missingHeaders, setMissingHeaders] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tableColumns, setTableColumns] = useState<any[]>([])

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

      // console.log({ parsedData });

      const altered_columns: any = columns.map((col) => {
        const column = col.split(' ').join('');
        return column.charAt(0).toLowerCase() + column.slice(1);
      });

      let tableCols: any = [];

      const file_obj = parsedData
        .map((data: any) => {
          return columns?.reduce((prevVal: any, curVal: any, idx: number) => {
            // console.log({ data, curVal });
            tableCols.push({
              field: altered_columns[idx],
              headerName: curVal,
              width: 200
            })
            return {
              ...prevVal,
              [altered_columns[idx]]: data[curVal],
            };
          }, []);
        })
        .filter((data: any) => data.lastName && data.firstName);

      // console.log(file_obj);
      setData(file_obj);
      setTableColumns(tableCols)

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
console.log({data})
  const handleSave = async () => {
    setSaving(true);
    try {
      const test = Promise.all(
        data.map(async (o: EmployeeI) => {
          const d = {
            ...initialState,
            ...o,
            location: [o.location],
            companyEmail: generateCompanyEmail(o.firstName, o.lastName, o.rank),
            birthDate: moment(o.birthDate).valueOf(),
            dateHired: moment(o.dateHired).valueOf(),
            endOfProbationary: o.employmentType.toLowerCase() != 'project' ? moment(getProbationaryEndDate(o.dateHired)).valueOf() : null,
            contractEndDate: o.employmentType.toLowerCase() == 'project' ? moment(getContractEndDate(o.dateHired)).valueOf() : null,
            employmentLastUpdate:moment(o.dateHired).valueOf(),
            jobLastUpdate: moment(o.dateHired).valueOf()
          }
          await dispatch(
            createEmployee({ body: d, access_token })
          );
        })
      );
console.log({test})
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
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
      <section className="w-full rounded-sm p-4 flex flex-col gap-4">
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

        {file && (
          <div className="flex flex-row gap-2 items-center p-2 border border-gray-200 rounded-md hover:bg-green-50 hover:border-green-200 transition-all duration-200">
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

        {file && show && !error && missingHeaders.length <= 0 && (
          <UploaderTable rows={data && data} columns={tableColumns} />
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
