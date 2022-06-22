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
} from '@mui/material';
import {
  Assignment,
  AssignmentOutlined,
  AssignmentTwoTone,
  Badge,
  BadgeOutlined,
  BadgeTwoTone,
  DateRange,
  DateRangeTwoTone,
  DomainVerification,
  Event,
  EventOutlined,
  EventTwoTone,
  Info,
  PendingActions,
  PendingActionsTwoTone,
  SpeakerNotes,
  SpeakerNotesOutlined,
  SpeakerNotesTwoTone,
  SupervisedUserCircleOutlined,
  SupervisedUserCircleTwoTone,
} from '@mui/icons-material';

const ViewDetailsModal = ({ viewDetails, setViewDetails }) => {
  const [details, setDetails] = useState(viewDetails?.details?.row);

  useEffect(() => {
    viewDetails.status && setDetails(viewDetails.details.row);
  }, [viewDetails]);

  console.log({ viewDetails });

  const handleList = () => {
    const details = [];
    const handleIcon = (key, element) => {
      switch (key) {
        case 'date_requested':
          return <EventTwoTone />;
        case 'employee_no':
          return <BadgeTwoTone />;
        case 'employee_name':
          return <BadgeTwoTone />;
        case 'date_from':
          return <DateRangeTwoTone />;
        case 'date_to':
          return <DateRangeTwoTone />;
        case 'reason':
          return <SpeakerNotesTwoTone />;
        case 'leave_type':
          return <AssignmentTwoTone />;
        case 'status':
          return (
            <PendingActionsTwoTone
              color={
                element === 'Pending'
                  ? 'warning'
                  : element === 'Approve'
                  ? 'success'
                  : 'error'
              }
            />
          );

        case 'supervisor':
          return <SupervisedUserCircleTwoTone />;

        default:
          break;
      }
    };

    const handleTitle = (key) => {
      switch (key) {
        case 'date_requested':
          return 'Date Requested';
        case 'employee_no':
          return 'Employee No.';
        case 'employee_name':
          return 'Employee Name';
        case 'date_from':
          return 'Date/Time From';
        case 'date_to':
          return 'Date/Time To';
        case 'reason':
          return 'Reason';
        case 'leave_type':
          return 'Leave Type';
        case 'status':
          return 'Status';
        case 'supervisor':
          return 'Supervisor';

        default:
          break;
      }
    };

    const v = viewDetails?.details?.row;

    if (v) {
      delete v.id;

      for (const key in v) {
        if (Object.hasOwnProperty.call(v, key)) {
          const element = v[key];
          console.log({ element });
          details.push(
            <>
              <ListItem>
                <ListItemIcon>{handleIcon(key, element)}</ListItemIcon>
                <ListItemText
                  primary={element}
                  secondary={handleTitle(key)}
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
            </>
          );
        }
      }

      console.log({ details });
    }

    return details;
  };

  return (
    <Modal
      open={viewDetails.status}
      onClose={() => setViewDetails({ details: {}, status: false })}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Card sx={{ width: 500, minHeight: 500, p: 2 }}>
        <Typography
          variant='h6'
          sx={{ alignItems: 'center', display: 'flex' }}
          color='primary'
        >
          <Info sx={{ mr: 1 }} /> Leave Application Details
        </Typography>
        <Divider sx={{ mt: 1 }} />
        <List>{handleList()}</List>
        <div style={{ textAlign: 'right' }}>
          <Button
            onClick={() => setViewDetails({ details: {}, status: false })}
          >
            Close
          </Button>
        </div>
      </Card>
    </Modal>
  );
};

export default ViewDetailsModal;
