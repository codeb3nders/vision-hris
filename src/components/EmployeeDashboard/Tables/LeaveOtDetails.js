import {
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import { StickyNote2TwoTone, PendingActionsTwoTone } from '@mui/icons-material';
import React from 'react';

const LeaveOtDetails = ({
  handleList,
  details,
  isApprover,
  status,
  reason,
  setReason,
  setStatus,
}) => {
  return (
    <div>
      <List
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: 'row',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        {handleList()}
        {details?.status === 'Disapprove' && (
          <ListItem>
            <ListItemIcon>
              <StickyNote2TwoTone color='error' />
            </ListItemIcon>
            <ListItemText
              primary="Employee's requested leave poses significant difficulty or expense for the company"
              secondary='Disapproval Reason'
            />
          </ListItem>
        )}

        {isApprover && details?.status === 'Pending' && (
          <>
            {status === 'DISAPPROVED' && (
              <ListItem>
                <ListItemIcon>
                  <StickyNote2TwoTone color='error' />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <FormControl
                      fullWidth
                      variant='standard'
                      sx={{ maxWidth: 500 }}
                      required
                    >
                      <InputLabel id='disapprove_reason'>
                        Disapproval Reason
                      </InputLabel>
                      <Select
                        value={reason}
                        fullWidth
                        sx={{ fontSize: 12 }}
                        labelId='disapprove_reason'
                        onChange={(e) => setReason(e.target.value)}
                      >
                        <MenuItem
                          value='DISAPPROVED-1'
                          data-reason='Leave not covered by policy'
                        >
                          Leave not covered by policy
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-2'
                          data-reason='Staffing needs'
                        >
                          Staffing needs
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-3'
                          data-reason='The employee does not have sufficient annual leave accrued'
                        >
                          The employee does not have sufficient annual leave
                          accrued
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-4'
                          data-reason='Employee cannot indicate if or when she will be able to return to work'
                        >
                          Employee cannot indicate if or when she will be able
                          to return to work
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-5'
                          data-reason="Extremely difficult to find a temporary replacement because of the highly specialized nature of the employee's job"
                        >
                          Extremely difficult to find a temporary replacement
                          because of the highly specialized nature of the
                          employee's job
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-6'
                          data-reason="Employee's requested leave poses significant difficulty or expense for the company"
                        >
                          Employee's requested leave poses significant
                          difficulty or expense for the company
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-7'
                          data-reason='The employee has not provided adequate notice. (At least 3 days before availment of leave for Vacation Leave)'
                        >
                          The employee has not provided adequate notice. (At
                          least 3 days before availment of leave for Vacation
                          Leave)
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-8'
                          data-reason='Employee has inputted wrong details on their form'
                        >
                          Employee has inputted wrong details on their form
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-9'
                          data-reason='Employee has selected the wrong approving head'
                        >
                          Employee has selected the wrong approving head
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-10'
                          data-reason='For Manual Approval'
                        >
                          For Manual Approval
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-11'
                          data-reason='Duplicate Entry'
                        >
                          Duplicate Entry
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-12'
                          data-reason='System Error'
                        >
                          System Error
                        </MenuItem>
                        <MenuItem
                          value='DISAPPROVED-13'
                          data-reason='Divert Iterinary'
                        >
                          Divert Iterinary
                        </MenuItem>
                      </Select>
                    </FormControl>
                  }
                  // secondary="Status"
                />
              </ListItem>
            )}

            <ListItem>
              <ListItemIcon>
                <PendingActionsTwoTone
                  color={
                    status === 'APPROVED'
                      ? 'success'
                      : status === 'PENDING'
                      ? 'warning'
                      : 'error'
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <FormControl
                    fullWidth
                    variant='standard'
                    sx={{ maxWidth: 500 }}
                  >
                    <InputLabel id='status'>Status</InputLabel>
                    <Select
                      fullWidth
                      labelId='status'
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value='PENDING'>PENDING</MenuItem>
                      <MenuItem value='APPROVED'>APPROVED</MenuItem>
                      <MenuItem value='DISAPPROVED'>DISAPPROVED</MenuItem>
                    </Select>
                  </FormControl>
                }
              />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
};

export default LeaveOtDetails;
