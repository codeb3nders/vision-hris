/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Tooltip,
  Avatar,
  Chip,
  Typography,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import {
  AddCircleOutlineTwoTone,
  CalendarMonthTwoTone,
  Close,
  EmailTwoTone,
  LocationOnTwoTone,
  PhoneTwoTone,
  UploadTwoTone,
} from "@mui/icons-material";
import {
  getAllDataAction, data as _timekeepingData, dataStatus as _dataStatus,
  newDataStatus as _newDataStatus,
  newDataError as _newDataError,
  reset
} from "slices/timekeeping";
import { EmployeeI } from "slices/interfaces/employeeI";
import { MainCtx } from "components/Main";
import { AppCtx } from "App";
import TimekeepingUploader from './uploader';
import moment from "moment";
import { TimekeepingI, TimekeepingLogI } from "slices/interfaces/timekeepingI";
import DialogModal from "CustomComponents/DialogModal";
import TimekeepingDetails from "./details";

type Props = {};

export const TimekeepingInitialState: TimekeepingI = {
  id: "",
  timestamp: 0,
  periodStartDate: new Date(),
  periodEndDate: new Date(),
  verificationDueDate: new Date(),
  employeeName: "",
  employeeNo: "",
  details: []
}

const Timekeeping: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);
  const timekeepingData = useSelector(_timekeepingData);
  const dataStatus = useSelector(_dataStatus);
  const [employees, setEmployees] = useState<EmployeeI[]>([]);
  const [data, setData] = useState<TimekeepingLogI[]>([]);
  const [openUploader, setOpenUploader] = useState(false);
  const { setIsTable } = useContext(MainCtx);
  const [openNotif, setOpenNotif] = useState<{
    message: string;
    status: boolean;
    severity: any;
  }>({ message: '', status: false, severity: '' });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState<{
    isOpen: boolean;
    data: TimekeepingI;
    total_verified: number;
  }>({
    isOpen: false,
    data: TimekeepingInitialState,
    total_verified: 0
  });
  const newDataStatus = useSelector(_newDataStatus);
  const newDataError = useSelector(_newDataError);
  
  useEffect(() => {
    switch (newDataStatus) {
      case "succeeded":
        success(reset(), "Timekeeping file was successfully processed.");
        setOpenUploader(false);
        break;
      case "failed":
        failed(newDataError);
        break;
      default:
    }
  }, [newDataStatus])

  useEffect(() => {
    if (dataStatus !== "idle") {
      var result:TimekeepingLogI[] = [], data:any=[];
      timekeepingData.reduce(function (res:any, curr: TimekeepingI) {
        const period: string = `${moment(curr.periodStartDate).format("L")} - ${moment(curr.periodEndDate).format("L")}`;
        if (!res[period]) {
          res[period] = { period, total_record: 0, dateUploaded: moment(curr.timestamp).format("lll"), total_verified: 0, data: [] };
          data = [];
          result.push(res[period]);
        }
        data.push(curr);
        res[period].total_record++;
        res[period].total_verified += curr.details.reduce(function (acc, obj) { return acc + (obj.verified !== undefined && obj.verified !== null ? 1 : 0); }, 0)
        res[period].data = data;
        return res;
      }, {});

      setData(result);
    }
  }, [dataStatus]);

  useEffect(() => {
    getData();
    // setIsTable(true);
  }, [])

  const getData = async () => {
    await dispatch(getAllDataAction({ access_token }));
  }

  const success = (cb: any, message: string) => {
    setOpenNotif({
      message,
      status: true,
      severity: 'success',
    });
    dispatch(cb);
    getData();
    setIsSaving(false);

    setTimeout(() => {
      setOpenNotif({
        message: '',
        status: false,
        severity: '',
      });
    }, 2000)
  };

  const failed = (message: string) => {
    setIsSaving(false);
    setOpenNotif({
      message,
      status: true,
      severity: 'error',
    });
  };

  const columns = [
    {
      field: "period",
      headerName: "Period",
      flex: 1,
      identity: true
    },
    {
      field: "total_record",
      headerName: "Total Record",
      flex: 1,
      renderCell: (cell: any) => <Button variant="text" onClick={() => {
        setOpenDetails({isOpen: true, data: cell.row.data, total_verified: cell.row.total_verified});
      }
      }>{cell.value}</Button>
    },
    {
      field: "dateUploaded",
      headerName: "Date/Time Uploaded",
      flex: 1
    },
    {
      field: "total_verified",
      headerName: "Total Verified",
      flex: 1
    },
  ];

  return (
    <>
      <Snackbar
        autoHideDuration={2000}
        open={openNotif.status}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert severity={openNotif.severity}>{openNotif.message}</Alert>
      </Snackbar>
      <TimekeepingUploader open={openUploader} setOpen={setOpenUploader} setIsSaving={setIsSaving} isSaving={isSaving}  />
      {openDetails.isOpen && <DetailsModal open={openDetails} setOpen={setOpenDetails} />}
      <Card className="phone:mt-0 desktop:mt-5 desktop:p-2 laptop:mt-5 laptop:p-2">
        <section className="flex desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col items-center justify-center">
          <div className="flex-1 desktop:text-left laptop:text-left">
            <Typography variant="h5">Timekeeping</Typography>
          </div>
          <div className="flex-1 mb-[16px] desktop:text-right laptop:text-right tablet:text-left phone:text-left">
            <Button
              onClick={() => setOpenUploader(true)}
              startIcon={<UploadTwoTone />}
              sx={{ mr: 1 }}
            >
              Upload Timekeeping
            </Button>
          </div>
        </section>  
        <DataGrid
          className="data-grid"
          autoHeight
          // getRowHeight={() => "auto"}
          density="compact"
          disableSelectionOnClick
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          getRowId={(row) => row.period}
        />
      </Card>
    </>
  );
};

const DetailsModal = ({ open, setOpen }) => {
  const { data, total_verified, isOpen } = open;
  return <DialogModal
        titleIcon={<CalendarMonthTwoTone className='mr-2 text-sky-500' />}
        title={<Typography variant="subtitle1" gutterBottom>
            Period: <Chip label={`${moment(data[0].periodStartDate).format("L")} - ${moment(data[0].periodEndDate).format("L")}`} />
            </Typography>}
        onClose={()=>setOpen({
                isOpen: false, data: []
              })}  
        className="w-screen"
        // title={
        //   <div className='flex items-start content-left'>
        //     <Typography variant="subtitle1" gutterBottom>
        //     Period: <Chip label={`${moment(data[0].periodStartDate).format("L")} - ${moment(data[0].periodEndDate).format("L")}`} />
        //     </Typography>
        //     {/* {total_verified === 0 && <section className="mb-2">
        //       <Alert severity="warning">Please verify timekeeping on or before <strong>{ moment(data[0].verificationDueDate).format("L")}</strong> </Alert>
        //     </section>
        //     } */}
        //     <IconButton
        //       sx={{ ml: 'auto' }}
        //       onClick={() => setOpen({
        //         isOpen: false, data: []
        //       })}
        //     >
        //       <Close />
        //     </IconButton>
        //   </div>
        // }
        open={isOpen}
      >
      <TimekeepingDetails data={data} />
    </DialogModal>
}

export default Timekeeping;
