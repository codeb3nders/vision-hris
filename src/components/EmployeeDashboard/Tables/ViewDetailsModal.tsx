import React, { useEffect, useState } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Grid,
  IconButton,
} from '@mui/material';
import {
  Close,
  DeleteTwoTone,
  EditTwoTone,
  Info,
  SaveTwoTone,
} from '@mui/icons-material';
import EmployeeDetailsCollapse from './EmployeeDetailsCollapse';
import LeaveOtDetails from './LeaveOtDetails';
import { TITLES } from '../../HRDashboard/EmployeeData';
import DialogModal from '../../../CustomComponents/DialogModal';

type Props = {
  viewDetails: any;
  setViewDetails: any;
  isApprover?: boolean;
  isOT?: boolean;
  isEmployeeDetails?: any;
};

const ViewDetailsModal: React.FC<Props> = ({
  viewDetails,
  setViewDetails,
  isApprover,
  isOT,
  isEmployeeDetails,
}) => {
  const [details, setDetails] = useState<any>(viewDetails?.details?.row);
  const [status, setStatus] = useState<string>('PENDING');
  const [reason, setReason] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>('panel-job');

  useEffect(() => {
    viewDetails.status && setDetails(viewDetails.details.row);
  }, [viewDetails]);

  // console.log({ viewDetails });

  const handleList = () => {
    const details: any[] = [];

    const v = viewDetails?.details?.row;

    if (v) {
      for (const key in v) {
        if (Object.hasOwnProperty.call(v, key)) {
          const element = v[key];

          // // console.log({ v, key, element });

          const title = TITLES.filter((t) => t.key === key)[0];

          // console.log({ title, key });

          if (key === 'id' || (element === 'Pending' && isApprover)) {
            details.push(null);
          } else {
            details.push(
              <Grid
                item
                md={isEmployeeDetails ? 6 : 12}
                sx={{ alignSelf: 'stretch' }}
              >
                <ListItem>
                  <ListItemIcon
                    sx={{
                      color:
                        element === 'Pending'
                          ? '#ed6c02 !important'
                          : element === 'Approve'
                          ? '#2e7d32'
                          : element === 'Disapprove'
                          ? '#d32f2f'
                          : '#000',
                    }}
                  >
                    {title.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      element ? (
                        <span className='text-sm'>{element}</span>
                      ) : (
                        <span style={{ color: '#ccc' }}>-</span>
                      )
                    }
                    secondary={
                      <span className='text-[11px] text-sky-500'>
                        {title.label}
                      </span>
                    }
                    primaryTypographyProps={{
                      color:
                        element === 'Pending'
                          ? '#ed6c02 !important'
                          : element === 'Approve'
                          ? '#2e7d32'
                          : element === 'Disapprove'
                          ? '#d32f2f'
                          : '#000',
                    }}
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
              </Grid>
            );
          }
        }
      }

      // console.log({ details });
    }

    return details.filter((d) => d !== null);
  };

  // console.log({ viewDetails });

  return (
    <>
      <DialogModal
        className={`${isEmployeeDetails ? 'max-w-[850px]' : 'max-w-[500px]'}`}
        titleIcon={<Info className='mr-2 text-sky-500' />}
        onClose={()=>setViewDetails({ details: {}, status: false })}
        title={`${isOT
              ? 'OT Application'
              : isEmployeeDetails
              ? 'Employee'
            : 'Leave Application'} Details`
        }
        open={viewDetails.status}
        actions={
          <div className='mt-4'>
            {isApprover && details?.status === 'Pending' && (
              <>
                <Divider />
                <div className='flex justify-end'>
                  <Button
                    disabled={
                      status === 'PENDING' ||
                      (status === 'DISAPPROVED' && reason === null)
                    }
                    color='success'
                    variant='text'
                    disableElevation
                    sx={{ mr: 1 }}
                    startIcon={<SaveTwoTone />}
                  >
                    Submit
                  </Button>
                </div>
              </>
            )}
            {isEmployeeDetails && (
              <div>
                <Divider />
                <Grid container justifyContent='center' sx={{ mt: 1 }}>
                  <Button
                    color='warning'
                    variant='contained'
                    disableElevation
                    startIcon={<EditTwoTone />}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    color='error'
                    variant='contained'
                    disableElevation
                    startIcon={<DeleteTwoTone />}
                  >
                    Delete
                  </Button>
                </Grid>
              </div>
            )}
          </div>
        }
      >
        <div className='mt-2 flex w-full flex-col'>
          {isEmployeeDetails ? (
            <EmployeeDetailsCollapse
              details={details}
              expanded={expanded}
              isEmployeeDetails={isEmployeeDetails}
              setExpanded={setExpanded}
            />
          ) : (
            <LeaveOtDetails
              details={details}
              handleList={handleList}
              isApprover={isApprover}
              reason={reason}
              setReason={setReason}
              setStatus={setStatus}
              status={status}
            />
          )}
        </div>
      </DialogModal>
    </>
  );
};

export default ViewDetailsModal;
