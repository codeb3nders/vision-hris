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

type Props = {};

type TimekeepingDetailsI = {
  id: string;
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

const TimekeepingDetails: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);
  const timekeepingData = useSelector(_timekeepingData);
  const dataStatus = useSelector(_dataStatus);
  const [employees, setEmployees] = useState<EmployeeI[]>([]);
  const [data, setData] = useState<TimekeepingDetailsI[]>([]);
  const [verifiedCnt, setVerifiedCnt] = useState(0);
  const [verifiedList, setVerifiedList] = useState<any[]>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (dataStatus !== "idle") {
      // setData(timekeepingData);
    }
  }, [dataStatus]);

  useEffect(() => {getData()}, [])

  const getData = async () => {
  // await dispatch(getAllDataAction({ access_token }));
}

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
      // console.log({data})
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
      <Card sx={{ mt: 5, p: 2 }}>
        <section className="flex desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col items-center justify-center">
          <div className="flex-1 w-full desktop:max-w-[400px] laptop:max-w-[400px] tablet:max-w-full phone:max-w-full relative">
            <Typography variant="subtitle1" gutterBottom>
            Period: <Chip label="09/10/2022 - 09/24/2022" />
            </Typography>
          </div>
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

        {verifiedCnt === 0 && <section className="mb-2">
          <Alert severity="warning">Please verify timekeeping on or before <strong>{ moment("09/25/2022").format("LL")}</strong> </Alert>
        </section>
        }
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          style={{width: '100%'}}
          autoHeight
          getRowHeight={() => "auto"}
          // density="compact"
          disableSelectionOnClick
          rows={data}
          columns={columns()}
          pageSize={30}
          rowsPerPageOptions={[30]}
          checkboxSelection={true}
          getRowId={(row) => row.id}
        />
      </Card>
    </>
  );
};

const columns = () => [
  {
    field: "date",
    headerName: "Date",
    renderCell: (cell) => cell.value && moment(cell.value).format("ll"),
    flex: 1
  },
  {
    field: "day",
    headerName: "Day",
    flex: 1,
  },
  {
    field: "holidayType",
    headerName: "Holiday Type",
    flex: 1,
  },
  {
    field: "shift",
    headerName: "Shift",
    flex: 1
    },
  {
    field: "in1",
    headerName: "IN1",
    flex: 1
    },
  {
    field: "out1",
    headerName: "Out1",
    flex: 1
    },
  {
    field: "in2",
    headerName: "IN2",
    flex: 1
    },
  {
    field: "out2",
    headerName: "OUT2",
    flex: 1
    },
  {
    field: "regHours",
    headerName: "Reg. Hours",
    flex: 1,
  },
  {
    field: "lateMins",
    headerName: "Late Mins",
    flex: 1,
  },
  {
    field: "utMins",
    headerName: "UT Mins",
    flex: 1
    },
  {
    field: "otHrs",
    headerName: "N. Diff OT Hrs",
    flex: 1
    },
  {
    field: "nDiffOTHrs",
    headerName: "N. Diff OT Hrs",
    flex: 1
    },
  {
    field: "remarks",
    headerName: "Remarks",
    flex: 1
    },
  {
    field: "verified",
    headerName: "Verified",
      flex: 1,
      renderCell: (params:any) => <Checkbox checked={params.value != ""} />
  },
];

export default TimekeepingDetails;
