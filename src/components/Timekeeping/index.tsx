/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  Card,
  Button,
  Link,
  Tooltip,
  Avatar,
  Chip,
  Typography,
} from "@mui/material";
import {
  AddCircleOutlineTwoTone,
  EmailTwoTone,
  LocationOnTwoTone,
  PhoneTwoTone,
  UploadTwoTone,
} from "@mui/icons-material";
import {
  getAllDataAction, data as _timekeepingData, dataStatus as _dataStatus
} from "slices/timekeeping";
import { EmployeeI } from "slices/interfaces/employeeI";
import { MainCtx } from "components/Main";
import { AppCtx } from "App";
import { getAvatar } from "utils/functions";
import { VISION_RED } from "constants/Colors";
import Search from "../HRDashboard/search";
import TimekeepingUploader from './uploader';
import moment from "moment";

type Props = {};

type TimekeepingLogI = {
  period: string;
  total_record: number;
  timestamp: Date;
  total_verified: number;
};

const Timekeeping: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);
  const timekeepingData = useSelector(_timekeepingData);
  const dataStatus = useSelector(_dataStatus);
  const [employees, setEmployees] = useState<EmployeeI[]>([]);
  const [data, setData] = useState<TimekeepingLogI[]>([]);
  const [openUploader, setOpenUploader] = useState(false);

  useEffect(() => {
    if (dataStatus !== "idle") {
      // setData(timekeepingData);
    }
  }, [dataStatus]);

  useEffect(() => {getData()}, [])

  const getData = async () => {
  // await dispatch(getAllDataAction({ access_token }));
}
  return (
    <>
      <TimekeepingUploader open={openUploader} setOpen={setOpenUploader} />
      <Card sx={{ mt: 5, p: 2 }}>
        <section className="flex desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col items-left justify-left mb-2">
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
          autoHeight
          getRowHeight={() => "auto"}
          // density="compact"
          disableSelectionOnClick
          rows={data}
          columns={columns()}
          pageSize={30}
          rowsPerPageOptions={[30]}
          checkboxSelection={false}
          getRowId={(row) => row.period}
        />
      </Card>
    </>
  );
};

const columns = () => [
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
  },
  {
    field: "timestamp",
    headerName: "Date/Time Uploaded",
    flex: 1,
    renderCell: (cell) => cell.value && moment(cell.value).format("ll"),
    sortable: false,
  },
  {
    field: "total_verified",
    headerName: "Total Verified",
    flex: 1
  },
];

export default Timekeeping;
