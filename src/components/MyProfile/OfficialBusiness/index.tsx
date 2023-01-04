import React, { useContext, useEffect, useState } from 'react';
import { AppCtx, moment } from 'App';
import History from 'components/MyProfile/OfficialBusiness/history';
import UpcomingOB from './upcoming';
import { useDispatch, useSelector } from 'react-redux';
import {authStore} from 'slices/userAccess/authSlice';
import { Moment } from 'moment';
import {
    getAllDataAction, data as requestsData, dataStatus,
    newDataStatus, newDataError, updateStatus, updateError
}
from 'slices/obRequests';
import DisapprovedCancelled from './disapprovedCancelled';
import PendingOB from './pending';
import { PENDING } from 'constants/Values';

type Props = {
    employeeNo: string;
    isHRview?: boolean;
    isApprover?: boolean;
}

export type OBDetailsModel = {
    id:string;
    timestamp?:number;
    employeeNo:string;
    dateFrom: Moment | null;
    dateTo: Moment | null;
    status:string;
    approver:string;
    isWorkFromHome:boolean;
    OBreasonOfDisapproval?:string;
    dateTimeApproved?:Date | null;
    approvedBy?:string;
    employeeDetails?: any;
    approverDetails?: any;
    purpose: string;
    itineraryDetails?: any[] | null;
    noOfDays?: number;
}

export const OBDetailsInitialState: OBDetailsModel = {
    id: "",
    employeeNo:"",
    dateFrom: null,
    dateTo:null,
    status:PENDING,
    approver: "",
    isWorkFromHome: false,
    purpose: "",
    itineraryDetails: []
}

const OB = ({employeeNo, isHRview, isApprover}: Props) => {
    const dispatch = useDispatch();
    const { userGroup } = useSelector(authStore)
    const { access_token } = useContext(AppCtx);
    const [details, setDetails] = useState<OBDetailsModel>(OBDetailsInitialState)
    const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
    const [leaveHistory, setLeaveHistory] = useState<any[]>([]);
    const [cancelled, setCancelled] = useState<any[]>([]);
    const [pending, setPending] = useState<any[]>([]);
    const data = useSelector(requestsData);
    const getDataStatus = useSelector(dataStatus);
    const getNewDataStatus = useSelector(newDataStatus);
    const getUpdateDataStatus = useSelector(updateStatus);
    
    useEffect(() => { 
        getData();
    }, [access_token])

    useEffect(() => { 
        if (getNewDataStatus === "succeeded" || getUpdateDataStatus === "succeeded") {
            getData();
        }
    }, [getNewDataStatus, getUpdateDataStatus])

    useEffect(() => { 
        if (getDataStatus !== 'idle') {
            let pending:any[] = [],upcoming: any[] = [], history: any[] = [], disapprovedCancelled:any[]=[];
            data.map((o: OBDetailsModel) => {
                const d: any = {
                    ...o,
                    startDate: moment(o.dateFrom).format("llll"),
                    lastDate: moment(o.dateTo).format("ll"),
                    dateRequested: moment(o.timestamp).format("ll"),
                }
                if (o.status === "APPROVED" && (moment().startOf("day").isSameOrAfter(moment(o.dateFrom).startOf("day")) || moment().startOf("day").isSameOrAfter(moment(o.dateTo).startOf("day"))) ) {
                    upcoming.push(d);
                } else {
                    if (o.status === "PENDING"){
                        pending.push(d);
                    } else if (o.status === "APPROVED") {
                        history.push(d);
                    } else {
                        disapprovedCancelled.push(d);
                    }
                }
            })
            setPending(pending);
            setLeaveRequests(upcoming);
            setLeaveHistory(history);
            setCancelled(disapprovedCancelled);
        }
    }, [getDataStatus])
       
    const getData = async () => {
        let params:any = {employeeNo}
        if (isApprover) {
            params = {
                approver: employeeNo
            }
        }
        await dispatch(getAllDataAction({
            access_token,
            params
        }))
    }
    
    return <>
        <PendingOB data={pending} isHRview />
        <UpcomingOB data={leaveRequests} />
        <History data={leaveHistory}/>
        <DisapprovedCancelled data={cancelled}/>
    </>
}
export default OB;
