/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { AppCtx } from "App";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "slices/userAccess/authSlice";

import {
  BirthdayIcon,
  CompensatoryIcon,
  EmergencyIcon,
  MaternityIcon,
  PaternityIcon,
  ServiceIcon,
  SickIcon,
  UnpaidIcon,
  VacationIcon,
} from "components/Dashboards/Common/icons";

import moment, { Moment } from "moment-timezone";
import {
  getAllDataAction,
  data as requestsData,
  dataStatus,
  newDataStatus,
  updateStatus,
} from "slices/leaveRequests";
import { getListOfValues } from "slices";
import { PENDING } from "constants/Values";
import TeamCalendar from "components/ManagerDashboard/team_calendar/TeamCalendar";
import { EmployeeI } from "slices/interfaces/employeeI";

moment.tz.setDefault("Asia/Manila");

export type LeavesContext = {
  isRefresh: boolean;
  leaveTypes: any[];
};

export type LeaveDetailsModel = {
  id?: string;
  timestamp?: number;
  employeeNo: string;
  leaveType: string;
  offsetOThrs?: number;
  dateFrom: Moment | null;
  dateTo: Moment | null;
  noOfDays: number | null;
  dateOfReturnToWork: Moment | null;
  reasonOfLeave: string;
  status: string;
  approver: string;
  isWorkFromHome?: boolean;
  leaveReasonOfDisapproval?: string;
  dateTimeApproved?: Date | null;
  approvedBy?: string;
  employeeDetails?: any;
  approverDetails?: any;
  leaveTypeDetails?: any;
};

export const LeavesCtx = createContext<LeavesContext>({
  isRefresh: true,
  leaveTypes: [],
});

const leaveStatusColor = {
  APPROVED: "green",
  PENDING: "orange",
};

const leaveTypeColor = {
  BL: "purple",
  CL: "yellow",
  ML: "pink",
  PL: "blue",
  SIL: "black",
  SL: "red",
  UL: "black",
  VL: "black",
  BLM: "black",
  CHR: "black",
  GIL: "black",
  HIL: "black",
  IBP: "black",
  MDT: "black",
  OLD: "black",
  SHA: "black",
  SOL: "black",
  STH: "black",
  TRZ: "black",
  VCW: "black",
  VHO: "black",
  VIN: "black",
};

const initialTeamCalendarData = {
  teamMembers: [],
  leavesPerTeam: [],
};

export const LeaveDetailsInitialState: LeaveDetailsModel = {
  id: "",
  employeeNo: "",
  leaveType: "",
  dateFrom: null,
  dateTo: null,
  noOfDays: null,
  dateOfReturnToWork: null,
  reasonOfLeave: "",
  status: PENDING,
  approver: "",
};

export const useLeave = () => {
  const { access_token, userData, isManagerLogin } = useContext(AppCtx);

  const dispatch = useDispatch();

  const { leaveTypes } = useSelector(getListOfValues);
  const data = useSelector(requestsData);
  const getDataStatus = useSelector(dataStatus);
  const { teamMembers } = useSelector(authStore);
  const getNewDataStatus = useSelector(newDataStatus);
  const getUpdateDataStatus = useSelector(updateStatus);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState<{
    code: string;
    name: string;
  }>({
    code: "",
    name: "",
  });
  const [leaveDetails, setLeaveDetails] = useState<LeaveDetailsModel>(
    LeaveDetailsInitialState
  );
  const [teamCalendarValue, setTeamCalendarData] = useState<{
    teamMembers: any[];
    leavesPerTeam: any[];
  }>(initialTeamCalendarData);

  useEffect(() => {
    if (isManagerLogin) {
      if (teamMembers) {
        getData();
      }
    } else {
      getData();
    }
  }, [access_token, isManagerLogin]);

  useEffect(() => {
    if (
      getNewDataStatus === "succeeded" ||
      getUpdateDataStatus === "succeeded"
    ) {
      getData();
    }
  }, [getNewDataStatus, getUpdateDataStatus]);

  useEffect(() => {
    if (getDataStatus !== "idle") {
      let pending: any[] = [],
        upcoming: any[] = [],
        history: any[] = [],
        disapprovedCancelled: any[] = [];

      const allLeaves = data.map((o: LeaveDetailsModel) => {
        const d: any = {
          ...o,
          startDate: moment(o.dateFrom).format("llll"),
          returnDate: moment(o.dateOfReturnToWork).format("ll"),
          lastDate: moment(o.dateTo).format("ll"),
          dateRequested: moment(o.timestamp).format("ll"),
          leaveTypeDetails: {
            type: o.leaveType,
            icon: getLeaveIcon(o.leaveType),
            name: leaveTypes.find(
              (l: any) =>
                l.code.toLocaleLowerCase() === o.leaveType.toLocaleLowerCase()
            ).name,
          },
        };
        if (
          o.status === "APPROVED" &&
          (moment()
            .startOf("day")
            .isSameOrAfter(moment(o.dateFrom).startOf("day")) ||
            moment()
              .startOf("day")
              .isSameOrAfter(moment(o.dateTo).startOf("day")))
        ) {
          upcoming.push(d);
        } else {
          if (o.status === "PENDING") {
            pending.push(d);
          } else if (o.status === "APPROVED") {
            history.push(d);
          } else {
            disapprovedCancelled.push(d);
          }
        }
        return d;
      });

      if (isManagerLogin && teamMembers.length > 0) {
        console.log({ teamMembers });
        handleTeamCalendar(allLeaves);
      }
    }
  }, [getDataStatus]);

  useEffect(() => {
    if (selectedLeaveType.code !== "") {
      setLeaveDetails({
        ...leaveDetails,
        employeeNo: userData.employeeNo,
        leaveType: selectedLeaveType.code,
        approver: userData.reportsTo.employeeNo,
        approverDetails: userData.reportsTo,
      });
      setOpen(true);
    }
  }, [selectedLeaveType]);

  useEffect(() => {
    if (!open) {
      setSelectedLeaveType({
        code: "",
        name: "",
      });
      setLeaveDetails(LeaveDetailsInitialState);
    }
  }, [open]);

  const handleTeamCalendar = (data) => {
    console.log({ teamMembers });
    setTeamCalendarData((prev: any) => {
      return {
        ...prev,
        teamMembers: teamMembers.map((o: EmployeeI) => {
          return (
            o.firstName && {
              id: parseInt(o.employeeNo),
              title: `${o.lastName}, ${o.firstName[0]}.`,
            }
          );
        }),
        leavesPerTeam: data.map((o: LeaveDetailsModel, i: number) => {
          return {
            id: i,
            group: parseInt(o.employeeNo),
            title: o.reasonOfLeave,
            start_time: moment(o.dateFrom).startOf("day").valueOf(),
            end_time: moment(o.dateOfReturnToWork).startOf("day").valueOf(),
            itemProps: {
              // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
              "data-custom-attribute": "Random content",
              "aria-hidden": true,
              onDoubleClick: () => {
                console.log("You clicked double!");
              },
              className: "weekend",

              style: {
                background: statusColor(o),
              },
            },
          };
        }),
      };
    });
  };

  const statusColor = (o) => {
    console.log({ o });
    return `linear-gradient(to right, 
        ${leaveTypeColor[o.leaveType]},
        ${leaveTypeColor[o.leaveType]},
        ${leaveStatusColor[o.status]}, 
        ${leaveStatusColor[o.status]},                   
        ${leaveStatusColor[o.status]}, 
        ${leaveStatusColor[o.status]})`;
  };

  const getLeaveIcon = (type: string) => {
    switch (type.toLocaleUpperCase()) {
      case "BL":
        return <BirthdayIcon />;
      case "EL":
        return <EmergencyIcon />;
      case "SL":
        return <SickIcon />;
      case "UL":
        return <UnpaidIcon />;
      case "SIL":
        return <ServiceIcon />;
      case "CL":
        return <CompensatoryIcon />;
      case "ML":
        return <MaternityIcon />;
      case "PL":
        return <PaternityIcon />;
      default: //VL
        return <VacationIcon />;
    }
  };

  const getData = async () => {
    const employeeNo = userData.employeeNo;
    let params: any = { employeeNo };
    if (isManagerLogin) {
      params = {
        approver: employeeNo,
      };
    }
    await dispatch(
      getAllDataAction({
        access_token,
        params,
      })
    );
  };

  return {
    open,
    selectedLeaveType,
    leaveDetails,
    teamCalendarValue,
    setOpen,
    setSelectedLeaveType,
    setLeaveDetails,
    setTeamCalendarData,
  };
};
