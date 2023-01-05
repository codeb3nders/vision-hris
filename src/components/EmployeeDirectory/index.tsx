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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import {
  EmailTwoTone,
  GroupTwoTone,
  LocationOnTwoTone,
  PhoneTwoTone,
} from "@mui/icons-material";
import {
  getAllEmployeesAction as _getEmployeesAction,
  getEmployeeStatus as _getEmployeeStatus,
  getEmployeeItems as _getEmployeeItems,
  getEmployeeError as _getEmployeeError,
} from "slices";
import { EmployeeDBI, EmployeeI } from "slices/interfaces/employeeI";
import { styled } from '@mui/material/styles';
import { AppCtx } from "App";
import { getAvatar } from "utils/functions";
import { VISION_RED } from "constants/Colors";
import Search from "../HRDashboard/search";
import CustomCard from "CustomComponents/CustomCard";

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const EmployeeDirectory: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const getEmployeeItems = useSelector(_getEmployeeItems);
  const getEmployeeStatus = useSelector(_getEmployeeStatus);
  const [employees, setEmployees] = useState<EmployeeI[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);

  // console.log({loading})
  useEffect(() => {
    if (searchText.length <= 0) {
      // setEmployees(tempEmployees);
    }
  }, [searchText]);

  return (
    <>
      {/* <Card sx={{ mt: 5, p: 2 }}> */}
      <section className="flex desktop:flex-row laptop:flex-row tablet:flex-col phone:flex-col items-center justify-center my-5">
          <div className='flex-1 w-full desktop:max-w-[600px] laptop:max-w-[600px] tablet:max-w-full phone:max-w-full relative'>
            <Search setSearchText={setSearchText} searchText={searchText} setEmployees={setEmployees} setIsLoading={setIsLoading} isLoading={loading} />
          </div>
      </section>
      <Grid container justifyContent="center" spacing={{ xs: 1, md: 2 }} columns={{ xs: 12, sm: 6, md: 12 }}>
      {employees.map((e: EmployeeI) => {
        return <Grid item xs sm={3} md={3}>
          <Item>
            <div className="flex justify-center">
              <span>
                <Avatar
                  src={getAvatar(e.gender.code)}
                  className="w-[56px] h-[56px]"
                  />
              </span>
              <div>
                <Typography variant="subtitle1" color={VISION_RED}>
                  {" "}
                  {e.lastName}, {e.firstName}
                </Typography>
                <Typography variant="caption" display={"block"}>
                  {" "}
                  {e.position.name}
                </Typography>
              </div>
            </div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start">
                <ListItemIcon sx={{minWidth: 25, marginTop: 0}}>
                  <PhoneTwoTone fontSize="small" color="primary"/>
                </ListItemIcon>
                <ListItemText className="my-0"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="caption"
                        color="text.primary"
                      >
                        {e.companyContactNumber}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="middle" />
              <ListItem alignItems="flex-start">
                <ListItemIcon sx={{minWidth: 25, marginTop: 0}}>
                  <EmailTwoTone fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText className="my-0"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline', overflowWrap: "break-word" }}
                        component="span"
                        variant="caption"
                        color="text.primary"
                      >
                        {e.companyEmail}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="middle" />
              <ListItem alignItems="flex-start">
                <ListItemIcon sx={{minWidth: 25, marginTop: 0}}>
                  <GroupTwoTone fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText className="my-0"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="caption"
                        color="text.primary"
                      >
                        {e.department.name}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="middle" />
              <ListItem alignItems="flex-start">
                <ListItemIcon sx={{minWidth: 25, marginTop: 0}}>
                  <LocationOnTwoTone fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText className="my-0"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="caption"
                        color="text.primary"
                      >
                        {e.location.map((o: any) => o.name).join(", ")}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Item>
        </Grid>
      })}
      </Grid>
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
