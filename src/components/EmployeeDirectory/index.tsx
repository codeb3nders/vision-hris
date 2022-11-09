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
  getAllEmployeesAction as _getEmployeesAction,
  getEmployeeStatus as _getEmployeeStatus,
  getEmployeeItems as _getEmployeeItems,
  getEmployeeError as _getEmployeeError,
} from "slices";
import { EmployeeDBI, EmployeeI } from "slices/interfaces/employeeI";
import { MainCtx } from "components/Main";
import { AppCtx } from "App";
import { getAvatar } from "utils/functions";
import { VISION_RED } from "constants/Colors";
import Search from "../HRDashboard/search";

type Props = {};

const EmployeeDirectory: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const getEmployeeStatus = useSelector(_getEmployeeStatus);
  const [employees, setEmployees] = useState<EmployeeI[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(true);
  const [tempEmployees, setTempEmployees] = useState<EmployeeDBI[]>([]);
  const { access_token } = useContext(AppCtx);

  useEffect(() => {
    if (access_token) {
      dispatch(_getEmployeesAction({ access_token, params: { isActive: true } }));
    }
  }, [access_token]);

  useEffect(() => {
    const employees = getEmployeeItems.map((r: any) => {
      const mi = r.middleName ? r.middleName.charAt(0) : "";
      const full_name = `${r.lastName}, ${r.firstName} ${mi}`;
      return { ...r, id: r.employeeNo, full_name };
    });
    setEmployees(employees);
    setTempEmployees(employees);
    setIsLoading(false);
  }, [getEmployeeItems]);

  useEffect(() => {
    if (searchText.length <= 0) {
      setEmployees(tempEmployees);
    }
  }, [searchText]);

  return (
    <>
      <Card sx={{ mt: 5, p: 2 }}>
        <section className="flex desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col items-left justify-left mb-2">
          <Search setSearchText={setSearchText} searchText={searchText} setEmployees={setEmployees} setIsLoading={setIsLoading} />
        </section>
        <DataGrid
          autoHeight
          getRowHeight={() => "auto"}
          // density="compact"
          disableSelectionOnClick
          rows={employees || []}
          columns={columns()}
          pageSize={30}
          rowsPerPageOptions={[30]}
          checkboxSelection={false}
          loading={loading}
          getRowId={(row) => row.employeeNo}
        />
      </Card>
    </>
  );
};

const columns = () => [
  {
    field: "gender",
    headerName: "",
    width: 50,
    renderCell: (cell) => {
      return (
        <Avatar
          src={getAvatar(cell.row.gender.code)}
          className="mr-2 w-[28px] h-[28px]"
        />
      );
    },
    sortable: false,
    filterable: false,
  },
  {
    field: "full_name",
    headerName: "Employee",
    flex: 1,
    renderCell: (cell) => {
      return (
        <div style={{ marginTop: 5 }}>
          <Typography variant="subtitle2" color={VISION_RED}>
            {" "}
            {cell.value}
          </Typography>
          <Typography variant="caption" display={"block"}>
            {" "}
            {cell.row.position.name}
          </Typography>
          <Typography variant="caption" display={"block"}>
            {" "}
            {cell.row.department.name}
          </Typography>
          <Typography variant="caption" display={"block"} gutterBottom>
            <LocationOnTwoTone fontSize="small" />{" "}
            {cell.row.location.map((o: any) => o.name).join(", ")}
          </Typography>
        </div>
      );
    },
    sortable: false,
  },
  {
    field: "companyEmail",
    headerName: "Contact Details",
    flex: 1,
    renderCell: (cell) => {
      return (
        <div>
          <Typography variant="body2" gutterBottom>
            <EmailTwoTone fontSize="small" /> {cell.value}
          </Typography>
          <Typography variant="body2">
            <PhoneTwoTone fontSize="small" /> {cell.row.companyContactNumber}
          </Typography>
        </div>
      );
    },
    sortable: false,
  },
  {
    field: "reportsTo",
    headerName: "Reports To",
    flex: 1,
    renderCell: (cell) => {
      return cell.row.reportsTo?.employeeName;
    },
    // sortComparator: (v1, v2) => v1.employeeName.localeCompare(v2.employeeName),
  },
];

export default EmployeeDirectory;
