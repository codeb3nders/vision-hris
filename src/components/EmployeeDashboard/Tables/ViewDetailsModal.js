import React, { useEffect, useState } from 'react';
import {
  Modal,
  Card,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Grid,
  IconButton,
  CardHeader,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  AccessTimeTwoTone,
  AssignmentTwoTone,
  BadgeTwoTone,
  Close,
  DateRangeTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  EventTwoTone,
  Info,
  PendingActionsTwoTone,
  SaveTwoTone,
  SpeakerNotesTwoTone,
  StickyNote2TwoTone,
  SupervisedUserCircleTwoTone,
  ThumbDownAlt,
  ThumbUpAlt,
  ExpandMore,
} from '@mui/icons-material';
import { Groups, ICONS, TITLES } from '../../HRDashboard/EmployeeData';
import EmployeeDetailsCollapse from './EmployeeDetailsCollapse';
import LeaveOtDetails from './LeaveOtDetails';

const ViewDetailsModal = ({
  viewDetails,
  setViewDetails,
  isApprover,
  isOT,
  isEmployeeDetails,
}) => {
  const [details, setDetails] = useState(viewDetails?.details?.row);
  const [status, setStatus] = useState('PENDING');
  const [reason, setReason] = useState(null);
  const [expanded, setExpanded] = useState('panel-job');

  useEffect(() => {
    viewDetails.status && setDetails(viewDetails.details.row);
  }, [viewDetails]);

  console.log({ viewDetails });

  const handleList = () => {
    const details = [];

    const v = viewDetails?.details?.row;

    if (v) {
      for (const key in v) {
        if (Object.hasOwnProperty.call(v, key)) {
          const element = v[key];

          console.log({ v, key });

          if (key === 'id' || (key === 'status' && isApprover)) {
            details.push(null);
          } else {
            details.push(
              <Grid
                item
                md={isEmployeeDetails ? 6 : 12}
                sx={{ alignSelf: 'stretch' }}
              >
                <ListItem>
                  <ListItemIcon>
                    {TITLES(element).filter((t) => t.key === key)[0]?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      element ? (
                        element
                      ) : (
                        <span style={{ color: '#ccc' }}>-</span>
                      )
                    }
                    secondary={
                      <span style={{ textTransform: 'uppercase' }}>
                        {TITLES(element).filter((t) => t.key === key)[0]?.label}{' '}
                      </span>
                    }
                    primaryTypographyProps={{
                      color:
                        element === 'Pending'
                          ? '#ed6c02'
                          : element === 'Approve'
                          ? '#2e7d32'
                          : element === 'Disapprove'
                          ? '#d32f2f'
                          : '#000',
                    }}
                    secondaryTypographyProps={{
                      fontSize: 11,
                      color: 'primary',
                    }}
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
              </Grid>
            );
          }
        }
      }

      console.log({ details });
    }

    return details.filter((d) => d !== null);
  };

  return (
    <Modal
      open={viewDetails.status}
      onClose={() => setViewDetails({ details: {}, status: false })}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Card sx={{ width: isEmployeeDetails ? 850 : 500, minHeight: 300 }}>
        <CardHeader
          title={
            <Typography
              variant='h6'
              sx={{ alignItems: 'center', display: 'flex' }}
              color='primary'
            >
              <Info sx={{ mr: 1 }} />{' '}
              {isOT
                ? 'OT Application'
                : isEmployeeDetails
                ? 'Employee'
                : 'Leave Application'}{' '}
              Details
              <IconButton
                sx={{ ml: 'auto' }}
                onClick={() => setViewDetails({ details: {}, status: false })}
              >
                <Close />
              </IconButton>
            </Typography>
          }
        />

        <Divider />
        <CardContent
          sx={{
            maxHeight: 500,
            overflow: 'auto',
            // py: 0,
            background: isEmployeeDetails ? '#eee' : '#fff',
          }}
        >
          {isEmployeeDetails ? (
            // <div style={{ marginTop: 16 }}>
            <EmployeeDetailsCollapse
              details={details}
              expanded={expanded}
              isEmployeeDetails={isEmployeeDetails}
              setExpanded={setExpanded}
            />
          ) : (
            // </div>
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
        </CardContent>

        {isApprover && details?.status === 'Pending' && (
          <>
            <Divider />
            <CardActions sx={{ justifyContent: 'right' }}>
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
            </CardActions>
          </>
        )}
        {isEmployeeDetails && (
          <CardActions>
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
          </CardActions>
        )}
      </Card>
    </Modal>
  );
};

export default ViewDetailsModal;
