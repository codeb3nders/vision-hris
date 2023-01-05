import {
  ClearTwoTone,
  EditTwoTone,
  EventNote,
  Pending,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { AppCtx } from 'App';
import LeaveForm from 'components/EmployeeDashboard/Forms/LeaveForm';
import LeaveDataCard from 'components/EmployeeDashboard/Management/LeaveDataCard';
import ConfirmDelete from 'components/Other/confirm.delete';
import { CANCELLED } from 'constants/Values';
import DialogModal from 'CustomComponents/DialogModal';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAction } from 'slices/leaveRequests';
import { LeaveDetailsInitialState, LeaveDetailsModel } from 'components/EmployeeDashboard/Management/LeaveManagement';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {
  data: any[];
  isHRview?: boolean;
};

const PendingLeaves = ({ data }: Props) => {
  const dispatch = useDispatch();
  const { access_token } = useContext(AppCtx);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [editLeave, setEditLeave] = useState<LeaveDetailsModel>(LeaveDetailsInitialState);

  useEffect(() => { 
    if (!openUpdate) {
      setEditLeave(LeaveDetailsInitialState);
    }
  }, [openUpdate])

  const handleUpdate = async () => {
    // console.log({editLeave})
    // await dispatch(updateAction({
    //   access_token,
    //   params: {
    //     id: row.id,
    //     status: CANCELLED,
    //     leaveReasonOfDisapproval: 
    //   }
    // }))
  };

  return <>
    {/* <UpdateApplicationModal
      open={openUpdate}
      setOpen={setOpenUpdate}
      data={editLeave}
      handleUpdate={handleUpdate}
    /> */}
    <CollapseWrapper
      panelTitle='Leaves For Approval'
      icon={Pending}
      open
      contentClassName='p-0'
    >
      <Grid container justifyContent="center" sx={{paddingLeft: 3, paddingRight: 3, paddingBottom: 3}} spacing={{ xs: 1, md: 2 }} columns={{ xs: 12, sm: 6, md: 12 }}>
        {
          data.map((d: any) => {
            return <Grid item xs sm={3} md={3}>
              <LeaveDataCard
                d={d}
                // handleUpdate={() => {
                //   setOpenUpdate(true);
                //   setEditLeave(d)
                // }}
              />
            </Grid>
          })
        }
      </Grid>
    </CollapseWrapper>
  </>
};

// const UpdateApplicationModal = ({ open, setOpen, data, handleUpdate }) => {
//   const [leaveDetails, setLeaveDetails] = useState<LeaveDetailsModel>(LeaveDetailsInitialState)

//   useEffect(() => { 
//     setLeaveDetails(data);
//   }, [data])

//   return <DialogModal
//       className='laptop:w-[500px] desktop:w-[500px] '
//       titleIcon={<EventNote className='mr-2 text-sky-500' />}
//       title={`${leaveDetails.leaveType} Form`}
//       open={open}
//       onClose={()=>setOpen(false)}
//       actions={
//         <div className='mt-4'>
//           <div className='grid grid-cols-2'>
//             <LoadingButton
//                 className='bg-sky-500 hover:bg-sky-600 text-md ease-in-out'
//                 // loading={loading}
//                 loadingPosition='start'
//                 // startIcon={<Publish />}
//                 variant='contained'
//                 // disabled={!confirmed}
//                 onClick={()=>handleUpdate()}
//                 disableElevation
//               >
//                 Submit
//               </LoadingButton>
//             <button
//               className='col-span-1 px-2 py-1 text-slate-400 hover:text-slate-800'
//               onClick={() => setOpen(false)}
//             >
//             Cancel
//             </button>
//           </div>
//         </div>
//       }
//     >
//       <LeaveForm leaveType={leaveDetails.leaveType} leaveDetails={leaveDetails} setLeaveDetails={setLeaveDetails} />
//     </DialogModal>
// }

export default PendingLeaves;
