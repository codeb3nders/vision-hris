/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Card,
  Checkbox,
  Chip,
  Typography,
  Alert,
} from "@mui/material";
import {
  TaskAlt,
  Verified,
} from "@mui/icons-material";
import {
  getAllDataAction, data as _timekeepingData, dataStatus as _dataStatus
} from "slices/timekeeping";
import { EmployeeI } from "slices/interfaces/employeeI";
import { AppCtx } from "App";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { TimekeepingI } from "slices/interfaces/timekeepingI";
import CollapsibleTable from "CustomComponents/CollapsibleTable";

type Props = {
  data: any[];
};

type TimekeepingDetailsI = {
  date: Date;
  day: string;
  holidayType: string;
  shift: string;
  in1: string;
  out1: string;
  in2: string;
  out2: string;
  regHours: number;
  lateMins: number;
  utMins: number;
  absentHrs: number;
  otHrs: number;
  nDiffHrs: number;
  nDiffOTHrs: number;
  remarks: string;
  verified: string;
};

const TimekeepingDetailsInitial: TimekeepingDetailsI = {
  date: new Date(),
  day: "",
  holidayType: "",
  shift: "",
  in1: "",
  out1: "",
  in2: "",
  out2: "",
  regHours: 0,
  lateMins: 0,
  utMins: 0,
  absentHrs: 0,
  otHrs: 0,
  nDiffHrs: 0,
  nDiffOTHrs: 0,
  remarks: "",
  verified: ""
};

const TimekeepingDetails: React.FC<Props> = ({data}) => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);
  const timekeepingData = useSelector(_timekeepingData);
  const dataStatus = useSelector(_dataStatus);
  const [tableData, setTableData] = useState<any[]>([]);
  // const [data, setData] = useState<TimekeepingI[]>([]);
  const [verifiedList, setVerifiedList] = useState<any[]>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
// console.log({data})

  useEffect(() => { 
    setTableData(data.map((o:any) => {
      return {
        "Employee Name": o.employeeName,
        "Employee No.": o.employeeNo,
        "Total Reg Hrs": o.totalRegHrs,
        "Total Late Mins": o.totalLateMins,
        "Total UT Mins": o.totalUtMins,
        "Total Absent Hrs": o.totalAbsentHrs,
        "Total OT Hrs": o.totalOTHrs,
        "Total Ndiff Hrs": o.totalNdiffHrs,
        "Total Ndiff OT Hrs": o.totalNdiffOTHrs,
        children: o.details.map((d:any)=>{
          return {
            ...TimekeepingDetailsInitial,
            ...d
          }
        })
      }
    }))
  }, [data])
//   useEffect(() => {
//     if (dataStatus !== "idle") {
//       // setData(timekeepingData);
//     }
//   }, [dataStatus]);

//   useEffect(() => {getData()}, [])

//   const getData = async () => {
//   // await dispatch(getAllDataAction({ access_token }));
// }

  const handleVerify = async () => {
    setIsVerifying(true);
    setIsSuccess(false);
    setError("");
    try {
      setTimeout(() => {
        setIsVerifying(false);
        setIsSuccess(true);
        setError("");
      }, 2000);

      // const config = {
      //     headers: { Authorization: `Bearer ${access_token}` },
      // };
      // const { status, data } = await changePasswordEndpoint(config, { oldPassword, newPassword, employeeNo: userData.employeeNo })
      // // console.log({data})
      // if (status === 200) {
      //   if (data.isValid === false) {
      //     setError(data.error)
      //   }else{
      //     setIsSuccess(true);
      //   }
      // }
      // setIsVerifying(false);
    } catch (error: any) {
      console.log(error);
      setIsSuccess(false);
    }
  };

  return (
    <>
      <div >
        <section className="flex desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col items-center justify-center">
          {/* <div className="flex-1 w-full desktop:max-w-[400px] laptop:max-w-[400px] tablet:max-w-full phone:max-w-full relative">
            <Typography variant="subtitle1" gutterBottom>
            Period: <Chip label="09/10/2022 - 09/24/2022" />
            </Typography>
          </div> */}
          <div className="flex-1 mb-[16px] desktop:text-right laptop:text-right tablet:text-left phone:text-left">
            <LoadingButton
              variant="contained"
              onClick={handleVerify}
              startIcon={<TaskAlt />}
              sx={{ mr: 1 }}
              disabled={verifiedList.length === 0}
              loading={isVerifying}
              loadingPosition="start"
            >
              Verify Timekeeping
            </LoadingButton>
          </div>
        </section>

        
        {tableData.length > 0 && <CollapsibleTable data={tableData}/>}
      </div>
    </>
  );
};

const columns = [
  {
    field: "employeeName",
    headerName: "Employee Name",
    flex: 1
  },
  {
    field: "date",
    headerName: "Date",
    renderCell: (cell) => moment(cell.row.details.date).format("ll"),
    flex: 1,
  },
  {
    field: "day",
    headerName: "Day",
    flex: 1,
    renderCell: (cell) => cell.row.details.day
  },
  {
    field: "holidayType",
    headerName: "Holiday Type",
    flex: 1,
    renderCell: (cell) => cell.row.details.holidayType
  },
  {
    field: "shift",
    headerName: "Shift",
    flex: 1,
    renderCell: (cell) => cell.row.details.shift
    },
  {
    field: "in1",
    headerName: "IN1",
    flex: 1,
    renderCell: (cell) => cell.row.details.in1
    },
  {
    field: "out1",
    headerName: "Out1",
    flex: 1,
    renderCell: (cell) => cell.row.details.out1
    },
  {
    field: "in2",
    headerName: "IN2",
    flex: 1,
    renderCell: (cell) => cell.row.details.in2
    },
  {
    field: "out2",
    headerName: "OUT2",
    flex: 1,
    renderCell: (cell) => cell.row.details.out2
    },
  {
    field: "regHours",
    headerName: "Reg. Hours",
    flex: 1,
    renderCell: (cell) => cell.row.details.regHours
  },
  {
    field: "lateMins",
    headerName: "Late Mins",
    flex: 1,
    renderCell: (cell) => cell.row.details.lateMins
  },
  {
    field: "utMins",
    headerName: "UT Mins",
    flex: 1,
    renderCell: (cell) => cell.row.details.utMins
    },
  {
    field: "otHrs",
    headerName: "N. Diff OT Hrs",
    flex: 1,
    renderCell: (cell) => cell.row.details.otHrs
    },
  {
    field: "nDiffOTHrs",
    headerName: "N. Diff OT Hrs",
    flex: 1,
    renderCell: (cell) => cell.row.details.nDiffOTHrs
    },
  {
    field: "remarks",
    headerName: "Remarks",
    flex: 1,
    renderCell: (cell) => cell.row.details.remarks
    },
  // {
  //   field: "verified",
  //   headerName: "Verified",
  //     flex: 1,
  //     renderCell: (params:any) => <Checkbox checked={params.value != ""} />
  // },
];

export default TimekeepingDetails;
