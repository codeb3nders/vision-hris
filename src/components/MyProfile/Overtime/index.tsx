import React, { useContext, useEffect, useState } from 'react';
import { AppCtx, moment } from 'App';
import History from 'components/MyProfile/Overtime/history';
import UpcomingOT from './upcoming';
import { useDispatch, useSelector } from 'react-redux';
import {authStore} from 'slices/userAccess/authSlice';
import { Moment } from 'moment';
import {
    getAllDataAction, data as requestsData, dataStatus,
    newDataStatus, newDataError, updateStatus, updateError
}
from 'slices/otRequests';
import DisapprovedCancelled from './disapprovedCancelled';
import PendingOT from './pending';
import { PENDING } from 'constants/Values';

type Props = {
    employeeNo: string;
    isHRview?: boolean;
    isApprover?: boolean;
}

export type OTDetailsModel = {
    id:string;
    timestamp?:number;
    employeeNo:string;
    date: Moment | null;
    timeFrom: Moment | null;
    timeTo: Moment | null;
    status:string;
    approver:string;
    earlyOT: "Y" | "N";
    lessBreak:"Y" | "N";
    plus1day: "Y" | "N";
    totalOThrs: number;
    OTreasonOfDisapproval?:string;
    dateTimeApproved?:Date | null;
    approvedBy?:string;
    employeeDetails?: any;
    approverDetails?: any;
    reason: string;
    approverComments?: string;
    CLid?: string;
    CLapproved?: boolean;
}

export const OTDetailsInitialState: OTDetailsModel = {
    id:"",
    employeeNo:"",
    date: null,
    timeFrom: null,
    timeTo: null,
    status: PENDING,
    approver:"",
    earlyOT: "N",
    lessBreak: "N",
    plus1day: "N",
    totalOThrs: 0,
    reason: ""
}

const OT = ({employeeNo, isHRview, isApprover}: Props) => {
    const dispatch = useDispatch();
    const { userGroup } = useSelector(authStore)
    const { access_token } = useContext(AppCtx);
    const [details, setDetails] = useState<OTDetailsModel>(OTDetailsInitialState)
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
            data.map((o: OTDetailsModel) => {
                const d: any = {
                    ...o,
                    date: moment(o.date).format("ddd, ll"),
                    dateRequested: moment(o.timestamp).format("ll"),
                }
                if (o.status === "APPROVED" && moment().startOf("day").isSameOrAfter(moment(o.date).startOf("day")) ) {
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
        <PendingOT data={pending} isHRview />
        <UpcomingOT data={leaveRequests} />
        <History data={leaveHistory}/>
        <DisapprovedCancelled data={cancelled}/>
    </>
}
export default OT;
