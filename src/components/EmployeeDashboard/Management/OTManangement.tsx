import React, { createContext, useContext, useEffect, useState } from 'react';
import { Close, EventNote, KeyboardArrowDown, Publish } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { AppCtx } from 'App';
import DialogModal from 'CustomComponents/DialogModal';
import { useDispatch, useSelector } from 'react-redux';
import {authStore} from 'slices/userAccess/authSlice';

import {
  createAction as createOT, data as OTRequestsData, dataStatus as OTDataStatus, getAllDataAction, newData as OTNewData, newDataStatus
}
  from 'slices/otRequests';
import { PENDING } from 'constants/Values';
import OT from 'components/MyProfile/Overtime';
import AddButton from 'CustomComponents/AddButton';
import OTForm from '../Forms/OTForm';
import { moment } from "App";
import useRequiredChecker from 'hooks/useRequiredChecker';
import { Moment } from 'moment-business-days';
import { EmployeeI } from 'slices/interfaces/employeeI';

const approverModes = ["approver", "hr admin"];

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

const initialTeamCalendarData = {
  teamMembers: [],
  OTPerTeam: [],
};

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

const OTManagement = () => {
  const dispatch = useDispatch();
  const { userGroup } = useSelector(authStore)
  const { access_token } = useContext(AppCtx);
  const [open, setOpen] = useState<boolean>(false);
  const [withError, setWithError] = useState<boolean>(true);
  const [details, setDetails] = useState<OTDetailsModel>(OTDetailsInitialState)

  const data = useSelector(OTRequestsData);
  const getDataStatus = useSelector(OTDataStatus);
  const getNewDataStatus = useSelector(newDataStatus);
  const getNewData = useSelector(OTNewData)
  const { userData } = useContext(AppCtx);
  const { teamMembers } = useSelector(authStore);

  const [OTRequests, setOTRequests] = useState<any[]>([]);
  const [OTHistory, setOTHistory] = useState<any[]>([]);
  const [cancelled, setCancelled] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  
  const [teamCalendarData, setTeamCalendarData] = useState<{
  teamMembers: any[];
  OTPerTeam: any[];
}>(initialTeamCalendarData);
    
  useEffect(() => { 
    if (isApprover) {
      if (teamMembers) {
        getData();
      }
    } else {
      getData();
    }
  }, [access_token])
  
    useEffect(() => { 
      if (getNewDataStatus === "succeeded") {
        getData();
        notifyApprover();
      }
    }, [getNewDataStatus])

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
            setOTRequests(upcoming);
            setOTHistory(history);
            setCancelled(disapprovedCancelled);
        }
    }, [getDataStatus])
       
  const getData = async () => {

    const employeeNo = userData.employeeNo;
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

  useEffect(() => {
    if (!open) {
      setDetails({
        ...OTDetailsInitialState,
        employeeNo: userData.employeeNo,
        status: PENDING
      })
    }
  }, [open])

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
        OTPerTeam: data.map((o: OTDetailsModel, i: number) => {
          return {
            id: i,
            group: parseInt(o.employeeNo),
            title: o.reason,
            start_time: moment(o.timeFrom).valueOf(),
            end_time: moment(o.timeTo).valueOf(),

            itemProps: {
              // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
              "data-custom-attribute": "Random content",
              "aria-hidden": true,
              onDoubleClick: () => {
                console.log("You clicked double!");
              },
              className: "weekend",
            },
          };
        }),
      };
    });
  };

  const notifyApprover = async () => {
    console.log({getNewData})
    // const approver = getNewData.approver
  }

  const handleSubmit = async () => {
    const { id, timeFrom, timeTo, ...otData } = details;
    let timeToTmp = timeTo;
    if (details.plus1day === "Y") {
      timeToTmp = moment(timeTo).add(1, "day")
    }
    if (details.lessBreak === "Y") {
      timeToTmp = moment(timeToTmp).subtract(1, "hour")
    }
    var duration = moment.duration(moment(timeToTmp).diff(moment(timeFrom)));
    // console.log({duration}, moment(timeToTmp), moment(timeFrom))
    const totalOThrs = parseInt(duration.asHours());
    await dispatch(
      createOT({
        body: {
          ...otData,
          timeFrom: moment(timeFrom).format("hh:mm A"),
          timeTo: moment(timeTo).format("hh:mm A"),
          totalOThrs
        },
        access_token,
      })
    );
    setOpen(false);
  }

  const isApprover = approverModes.indexOf(userGroup.toLocaleLowerCase()) >= 0;
  return <div className='mt-5'>
    <div className='flex justify-start'><AddButton text='File an OT' cb={() => setOpen(true)} /></div>
    {open && <NewApplicationModal open={open} setOpen={setOpen} details={details} setDetails={setDetails} handleSubmit={handleSubmit} withError={withError} setWithError={setWithError} />}
    <OT
      OTRequests={OTRequests}
      pendingOT={pending}
      cancelledOT={cancelled}
      OTHistory={OTHistory}
    />
    </div>  
};

const NewApplicationModal = ({ open, setOpen, details, setDetails, handleSubmit, withError, setWithError }) => {
  const { validated } = useRequiredChecker({
    data: details,
    module: "otForm"
  });
// console.log({validated}, {withError})
  return <DialogModal
      className='laptop:w-[500px] desktop:w-[500px] '
      titleIcon={<EventNote className='mr-2 text-sky-500' />}
      title={`Overtime Application Form`}
      onClose={()=>setOpen(false)}
      open={open}
      actions={
        <div className='mt-4'>
          <div className='grid grid-cols-2'>
            <LoadingButton
                className='bg-sky-500 hover:bg-sky-600 text-md ease-in-out'
                // loading={loading}
                loadingPosition='start'
                // startIcon={<Publish />}
                variant='contained'
                disabled={!validated || withError}
                onClick={()=>handleSubmit()}
                disableElevation
              >
                Submit
              </LoadingButton>
            <button
              className='col-span-1 px-2 py-1 text-slate-400 hover:text-slate-800'
              onClick={() => setOpen(false)}
            >
            Cancel
            </button>
          </div>
        </div>
      }
    >
      <OTForm details={details} setDetails={setDetails} setWithError={setWithError} />
    </DialogModal>
}

export default OTManagement;
