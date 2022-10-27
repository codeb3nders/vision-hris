/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import {
  Clear,
  CloudDoneOutlined,
  CloudOffOutlined,
  CloudUploadOutlined,
  SaveTwoTone,
  UploadFileOutlined,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { AppCtx } from 'App';
import { EXCEL } from 'assets';
import * as XLSX from 'xlsx';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import GridWrapper from 'CustomComponents/GridWrapper';
import { Moment } from 'moment';
import holidays from '../../constants/holidays';

var moment = require('moment-business-days');
 
moment.updateLocale('us', {
   holidays: [holidays[2022], holidays[2023]],
   holidayFormat: 'MM-DD-YYYY'
});

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Allowed extensions for input file
const allowedExtensions = ['vnd.ms-excel'];

const TimekeepingUploader = ({ open, setOpen }: Props) => {
  const { access_token } = useContext(AppCtx);
  const dispatch = useDispatch();
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<any>([]);
  const [missingHeaders, setMissingHeaders] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [saved, setSaved] = useState(false);
    const [tableColumns, setTableColumns] = useState<any[]>([])
    const [tempData, setTempData] = useState<any[]>([]);
  const [params, setParams] = useState<{
      periodStartDate: Date | null, periodEndDate: Date | null, verificationDueDate: Moment | null
    }>({
      periodStartDate: null, periodEndDate: null, verificationDueDate: moment().businessAdd(1)._d
    });

  useEffect(() => {
    if (!open) {
      handleRemoveFile();
    }
  }, [open]);
    
    useEffect(() => {
        tempData.length > 0 && handleDataCleanse()
     }, [tempData])

  useEffect(() => {
    file && handleParse();
  }, [file]);

    const handleDataCleanse = async () => {
        let tempLines:any = [];
            tempData.filter((x: any) => x.length > 0).map((x: any, i: number) => {
                if (x[0] !== "Visionproperties Development Corporation" && x[0] !== "Daily Time Record Report Detailed" && x[0] !== "Date" && x[0] !== undefined) {
                tempLines.push(x)
                }
                
            });
        let employeesTKdata: any = [], employeeName;
        for (var i = 0; i < tempLines.length; i++){
            const employeeNameTmp = tempLines[i][0].split(".) ");
            if (employeeNameTmp.length === 2) {
                employeeName = employeeNameTmp[1]
            } else {
                employeesTKdata.push({
                    employeeName,
                    date: tempLines[i][0],
                    day: tempLines[i][1],
                    holidayType: tempLines[i][2],
                    shift: tempLines[i][3],
                    in1: tempLines[i][4],
                    out1: tempLines[i][5],
                    in2: tempLines[i][6],
                    out2: tempLines[i][7],
                    regHours: tempLines[i][8],
                    lateMins: tempLines[i][9],
                    utMins: tempLines[i][10],
                    absentHrs: tempLines[i][11],
                    otHrs: tempLines[i][12],
                    ndiffHrs: tempLines[i][13],
                    ndiffOTHrs: tempLines[i][14],
                    remarks: tempLines[i][15]
                })
            }
        }
        if (employeesTKdata.length > 0) {
            setProcessing(false);
        }
        setData(employeesTKdata);
        console.log({tempLines})
        console.log({ employeesTKdata })

    }

  const handleChange = (e: any) => {
    const xls = e.target?.files[0];

    const fileExtension = xls?.type.split('/')[1];
    if (!allowedExtensions.includes(fileExtension)) {
      setError('Please input an xls file');
      return;
    }

    setError('');
    setMissingHeaders([]);
    setFile(xls);
  };

  const handleParse = () => {
    if (!file) return setError('Enter a valid file');
    setError('');
    setMissingHeaders([]);
    setProcessing(true)
      
    var name = file.name;
    const reader = new FileReader();
    reader.onload = (evt:any) => { // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type:'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, {header:1, raw: false});
        /* Update state */
        setTempData(data)
    };
      reader.readAsBinaryString(file);
      
  };

    const handleSave = async () => {
    setSaving(true);
        try {
            console.log({ data });
            debugger;
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
          <UploadFileOutlined /> Upload Timekeeping File
        </strong>

        <Snackbar
          open={saved}
          autoHideDuration={2000}
          onClose={() => setSaved(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity="success">Timekeeping file was successfully uploaded</Alert>
        </Snackbar>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={processing}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Divider />
        <GridWrapper colSize='3'>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Payroll Cutoff Start Date'
              onChange={(value) => {
                setParams({...params, periodStartDate: value})
              }}
              value={params.periodStartDate}
              renderInput={(params) => (
                <TextField {...params} required fullWidth variant='standard' />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Payroll Cutoff End Date'
              onChange={(value) => {
                setParams({...params, periodEndDate: value})
              }}
              value={params.periodEndDate}
              renderInput={(params) => (
                <TextField {...params} required fullWidth variant='standard' />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Verification Due Date'
              onChange={(value) => {
                setParams({...params, verificationDueDate: value})
              }}
              value={params.verificationDueDate}
              renderInput={(params) => (
                <TextField {...params} required fullWidth variant='standard' />
              )}
            />
          </LocalizationProvider>
        </GridWrapper>
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
            disabled={saving || processing || !params.periodStartDate || !params.periodEndDate || !params.verificationDueDate}
            hidden
            accept=".xls"
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
            <div className="p-1">
                <img src={EXCEL} alt="" width={50} />
            </div>

            <div className="font-bold flex flex-row gap-2 items-center w-full">
              <strong className="flex-1 text-[16px]">
                {file?.name.split('.xls')[0]}
              </strong>
              <small className="bg-gray-100 px-2 py-1 rounded-sm text-xs">
                {file?.size} bytes
              </small>
            </div>

            <IconButton
              size="small"
              onClick={handleRemoveFile}
              disabled={saving || processing}
            >
              <Clear />
            </IconButton>
          </div>
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
            disabled={disabled || !file || processing || data.length === 0}
            startIcon={<SaveTwoTone />}
            onClick={handleSave}
            loadingPosition="start"
          >
            {saving ? 'Saving' : 'Save'} Timekeeping Data
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

export default TimekeepingUploader;
