import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Close,
  EventNote,
  KeyboardArrowDown,
  Publish,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Menu, MenuItem } from "@mui/material";
import { AppCtx } from "App";
import LeaveBalances from "components/MyProfile/Leaves/leave.balances";
import DialogModal from "CustomComponents/DialogModal";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "slices/userAccess/authSlice";
import LeaveForm from "../Forms/LeaveForm";
import moment, { Moment } from "moment";
import {
  getAllDataAction,
  data as requestsData,
  dataStatus,
  newDataStatus,
  updateStatus,
  createAction,
  newData,
} from "slices/leaveRequests";
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
import { getListOfValues } from "slices";
import {
  createAction as createOB,
  data as OBRequestsData,
  dataStatus as OBDataStatus,
} from "slices/obRequests";
import { PENDING } from "constants/Values";
import Leaves from "components/MyProfile/Leaves";
import useRequiredChecker from "hooks/useRequiredChecker";
// import TeamCalendar from "components/ManagerDashboard/TeamCalendar";
import TeamCalendar from "components/ManagerDashboard/team_calendar/TeamCalendar";
import { EmployeeI } from "slices/interfaces/employeeI";

const approverModes = ["approver", "hr admin"];

const color = {
  APPROVED: "green",
  PENDING: "orange",
  //TODO: add more color per status
};

export type LeavesContext = {
  isRefresh: boolean;
  leaveTypes: any[];
  isApprover: boolean;
};

export const LeavesCtx = createContext<LeavesContext>({
  isRefresh: true,
  leaveTypes: [],
  isApprover: false,
});

const initialTeamCalendarData = {
  teamMembers: [],
  leavesPerTeam: [],
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

const LeaveManagement = () => {
  const dispatch = useDispatch();
  const { userGroup } = useSelector(authStore);
  const { access_token } = useContext(AppCtx);
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
  const [isRefresh, setIsRefresh] = useState<boolean>(true);
  const [withError, setWithError] = useState<boolean>(true);
  const [teamCalendarData, setTeamCalendarData] = useState<{
    teamMembers: any[];
    leavesPerTeam: any[];
  }>(initialTeamCalendarData);

  const { leaveTypes } = useSelector(getListOfValues);
  const data = useSelector(requestsData);
  const getDataStatus = useSelector(dataStatus);
  const { userData } = useContext(AppCtx);
  const { teamMembers } = useSelector(authStore);

  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [leaveHistory, setLeaveHistory] = useState<any[]>([]);
  const [cancelledLeaves, setCancelledLeaves] = useState<any[]>([]);
  const [pendingLeaves, setPendingLeaves] = useState<any[]>([]);
  const getNewDataStatus = useSelector(newDataStatus);
  const getUpdateDataStatus = useSelector(updateStatus);
  const getNewData = useSelector(newData);

  useEffect(() => {
    if (isApprover) {
      if (teamMembers) {
        getData();
      }
    } else {
      getData();
    }
  }, [access_token]);

  useEffect(() => {
    if (
      getNewDataStatus === "succeeded" ||
      getUpdateDataStatus === "succeeded"
    ) {
      getData();
      // notifyApprover();
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
      setPendingLeaves(pending);
      setLeaveRequests(upcoming);
      setLeaveHistory(history);
      setCancelledLeaves(disapprovedCancelled);
      
      if (isApprover && teamMembers.length > 0) {
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
    // console.log({data})
    setTeamCalendarData((prev: any) => {
      return {
        ...prev,
        teamMembers: teamMembers.map((o: EmployeeI) => {
          return {
            id: parseInt(o.employeeNo),
            title: `${o.lastName}, ${o.firstName[0]}.`,
          };
        }),
        leavesPerTeam: data.map((o: LeaveDetailsModel, i: number) => {
          

          return {
            id: i,
            group: parseInt(o.employeeNo),
            title: o.reasonOfLeave,
            start_time: moment(o.dateFrom).valueOf(),
            end_time: moment(o.dateOfReturnToWork).valueOf(),

            itemProps: {
              // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
              "data-custom-attribute": "Random content",
              "aria-hidden": true,
              onDoubleClick: () => {
                console.log("You clicked double!");
              },
              className: "weekend",
              
              style: {
                background: `${color[o.status]}`,
              },
            },
          };
        }),
      };
    });
  };

  const getLeaveIcon = (type: string) => {
    // console.log(type.toLocaleUpperCase(), "type.toLocaleUpperCase()")
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
    if (isApprover) {
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

  const handleSubmit = async () => {
    if (leaveDetails.leaveType === "OB") {
      const {
        id,
        dateOfReturnToWork,
        leaveType,
        noOfDays,
        offsetOThrs,
        reasonOfLeave,
        ...obData
      } = leaveDetails;
      await dispatch(
        createOB({
          body: {
            ...obData,
          },
          access_token,
        })
      );
    } else {
      const { id, ...rest } = leaveDetails;
      await dispatch(
        createAction({
          body: {
            ...rest,
          },
          access_token,
        })
      );
    }
    setOpen(false);
  };
  const isApprover = approverModes.indexOf(userGroup.toLocaleLowerCase()) >= 0;


  return (
    <LeavesCtx.Provider
      value={{
        isRefresh,
        leaveTypes,
        isApprover,
      }}
    >
      {isApprover ? (
        <TeamCalendar {...teamCalendarData} />
      ) : (
        <>
          <LeaveBalances />
          <SelectAndFileLeave setSelectedLeaveType={setSelectedLeaveType} />
        </>
      )}
      {open && (
        <NewApplicationModal
          open={open}
          setOpen={setOpen}
          selectedLeaveType={selectedLeaveType}
          leaveDetails={leaveDetails}
          setLeaveDetails={setLeaveDetails}
          handleSubmit={handleSubmit}
          withError={withError}
          setWithError={setWithError}
        />
      )}
      <Leaves
        leaveRequests={leaveRequests}
        pendingLeaves={pendingLeaves}
        cancelledLeaves={cancelledLeaves}
        leaveHistory={leaveHistory}
      />
    </LeavesCtx.Provider>
  );
};

const SelectAndFileLeave = ({ setSelectedLeaveType }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { leaveTypes } = useContext(LeavesCtx);
  const [leaveTypeList, setLeaveTypeList] = useState<any[]>([]);

  useEffect(() => {
    setLeaveTypeList(leaveTypes || []);
  }, [leaveTypes]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    selected: any
  ) => {
    setSelectedLeaveType(selected);
    setAnchorEl(null);
  };
  // console.log({leaveTypeList})
  return (
    <div>
      <Button
        // variant="contained"
        disableElevation
        // color='primary'
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Apply for Leave
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {leaveTypeList
          .slice()
          .sort((a: any, b: any) => a.name.localeCompare(b.name))
          .map((option) => (
            <MenuItem
              key={option.code}
              onClick={(event) => handleMenuItemClick(event, option)}
            >
              {option.name}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

const NewApplicationModal = ({
  open,
  setOpen,
  selectedLeaveType,
  leaveDetails,
  setLeaveDetails,
  handleSubmit,
  withError,
  setWithError,
}) => {
  // console.log({ leaveDetails }, "leaveDetailsleaveDetails")
  const { validated } = useRequiredChecker({
    data: leaveDetails,
    module: "leaveForm",
  });

  return (
    <DialogModal
      id="leaveForm-dialog"
      className="laptop:w-[500px] desktop:w-[500px] "
      titleIcon={<EventNote className="mr-2 text-sky-500" />}
      title={`${selectedLeaveType.name} Form`}
      onClose={() => setOpen(false)}
      open={open}
      actions={
        <div className="mt-4">
          <div className="grid grid-cols-2">
            <LoadingButton
              className="bg-sky-500 hover:bg-sky-600 text-md ease-in-out"
              // loading={loading}
              loadingPosition="start"
              // startIcon={<Publish />}
              variant="contained"
              disabled={!validated || withError}
              onClick={() => handleSubmit()}
              disableElevation
            >
              Submit
            </LoadingButton>
            <button
              className="col-span-1 px-2 py-1 text-slate-400 hover:text-slate-800"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      }
    >
      <LeaveForm
        leaveType={selectedLeaveType.code}
        leaveDetails={leaveDetails}
        setLeaveDetails={setLeaveDetails}
        setWithError={setWithError}
      />
    </DialogModal>
  );
};

export default LeaveManagement;
