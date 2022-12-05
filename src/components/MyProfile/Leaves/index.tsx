import React, { useContext, useEffect, useState } from 'react';
import { AppCtx } from 'App';
import History from 'components/MyProfile/Leaves/history';
import UpcomingLeaves from 'components/MyProfile/Leaves/upcoming.leaves';
import { useDispatch, useSelector } from 'react-redux';
import {authStore} from 'slices/userAccess/authSlice';

import moment, { Moment } from 'moment';
import {
  getAllDataAction, data as requestsData, dataStatus
}
from 'slices/leaveRequests';
import { PENDING } from 'constants/Values';
import { LeavesCtx } from 'components/EmployeeDashboard/Management/LeaveManagement';
import { BirthdayIcon, CompensatoryIcon, EmergencyIcon, MaternityIcon, PaternityIcon, ServiceIcon, SickIcon, UnpaidIcon, VacationIcon } from 'components/Dashboards/Common/icons';
import DisapprovedCancelled from './disapprovedCancelled';

type Props = {
    employeeNo: string;
    isHRview?: boolean;
}


export type LeaveDetailsModel = {
    id:string;
    timestamp?:number;
    employeeNo:string;
    leaveType:string;
    offsetOThrs?:number;
    dateFrom: Moment | null;
    dateTo: Moment | null;
    noOfDays:number | null;
    dateOfReturnToWork: Moment | null;
    reasonOfLeave:string;
    status:string;
    approver:string;
    leaveReasonOfDisapproval?:string;
    dateTimeApproved?:Date | null;
    approvedBy?:string;
    employeeDetails?: any;
    approverDetails?: any;
}

export const LeaveDetailsInitialState: LeaveDetailsModel = {
  id: "",
  employeeNo:"",
  leaveType:"",
  offsetOThrs:0,
  dateFrom: null,
  dateTo:null,
  noOfDays:null,
  dateOfReturnToWork:null,
  reasonOfLeave:"",
  status:"",
  approver:""
}

const Leaves = ({employeeNo, isHRview}: Props) => {
    const dispatch = useDispatch();
    const { userGroup } = useSelector(authStore)
    const { access_token } = useContext(AppCtx);
    const { leaveTypes, isRefresh } = useContext(LeavesCtx);
    const [leaveDetails, setLeaveDetails] = useState<LeaveDetailsModel>(LeaveDetailsInitialState)
    const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
    const [leaveHistory, setLeaveHistory] = useState<any[]>([]);
    const data = useSelector(requestsData);
    const getDataStatus = useSelector(dataStatus);
    
    useEffect(() => { 
        getData();
    }, [access_token])

    useEffect(() => { 
        if (getDataStatus !== 'idle') {
            let upcoming: any[] = [], history: any[] = [];
            data.map((o: LeaveDetailsModel) => {
                const d: any = {
                    startDate: moment(o.dateFrom).format("llll"),
                    noOfDays: o.noOfDays,
                    returnDate: moment(o.dateOfReturnToWork).format("llll"),
                    leaveTypeDetails: {
                        type: o.leaveType,
                        icon: getLeaveIcon(o.leaveType),
                        name: leaveTypes.find((l: any) => l.code.toLocaleLowerCase() === o.leaveType.toLocaleLowerCase()).name
                    },
                    employeeDetails: o.employeeDetails,
                    approverDetails: o.approverDetails,
                    offsetOThrs: o.offsetOThrs,
                    reasonOfLeave: o.reasonOfLeave,
                    status: o.status,
                    id: o.id
                }
                if (moment().startOf("day").isSameOrAfter(moment(o.dateFrom).startOf("day")) || moment().startOf("day").isSameOrAfter(moment(o.dateTo).startOf("day"))) {
                    upcoming.push(d)
                } else {
                    history.push(d)
                }
            })
            setLeaveRequests(upcoming);
            setLeaveHistory(history);
        }
    }, [getDataStatus])

    const getLeaveIcon = (type:string) => {
        switch (type.toLocaleUpperCase()) {
            case "BL":
                return <BirthdayIcon />;
            case "EL":
                return <EmergencyIcon className='text-white' />;
            case "SL":
                return <SickIcon className='text-white' />;
            case "UL":
                return <UnpaidIcon className='text-white' />;
            case "SIL":
                return <ServiceIcon className='text-white' />;
            case "CL":
                return <CompensatoryIcon className='text-white' />;
            case "ML":
                return <MaternityIcon className='text-white' />;
            case "PL":
                return <PaternityIcon className='text-white' />;
        }
    }
        
    const getData = async () => {
        await dispatch(getAllDataAction({
            access_token,
            params: {employeeNo}
        }))
    }
    
    return <>
        <UpcomingLeaves data={leaveRequests} isHRview />
        <History data={leaveRequests}/>
        <DisapprovedCancelled data={leaveRequests}/>
    </>
}
export default Leaves;
