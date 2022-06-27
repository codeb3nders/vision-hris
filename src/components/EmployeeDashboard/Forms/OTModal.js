import React from 'react';
import { Button, Card, Divider, Link, Modal, Typography } from '@mui/material';

const OTModal = ({ isOpen, setIsOpen }) => {
  return (
    <Modal
      open={isOpen}
      sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      closeAfterTransition
    >
      <Card
        sx={{
          p: 2,
          width: 500,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant='h5' sx={{ mb: 1 }}>
          Overtime/Working Day Off Request Form
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }} color='error'>
          Document Code: VPDC.1.404.009.23
        </Typography>
        {/* <Divider sx={{ mb: 1 }} /> */}
        <Typography variant='body2' sx={{ mb: 1 }}>
          Employees are requested to submit an Overtime (OT)/Working Day Off
          (WDO) Request Form for approval prior to completing overtime work or a
          working day off. The template includes sections for basic employee
          information, the details of the overtime work you need to complete,
          and the corresponding approver.
        </Typography>
        <Typography variant='body2' sx={{ mb: 1 }}>
          Please take not that upon the approval of your request, your approving
          head will still verify your OT/WDO work rendered, and you may be
          tasked to submit justification/proof of work rendered, as needed.
        </Typography>
        <Typography variant='body2' sx={{ mb: 1 }}>
          For guidance on the standard work schedule and procedure for Overtime
          (OT) and Working Day Off (WDO), please see our{' '}
          <Link
            href='https://drive.google.com/file/d/1ByfFuH2ckq9sPi8R9f-K5FntsWJR4GTe/view'
            sx={{ textDecoration: 'none' }}
          >
            <Typography color='primary' variant='body2' component='span'>
              Employee Work Hours, Overtime, and Working Day Off Policy
            </Typography>
          </Link>
          .
        </Typography>
        <Typography variant='body2' sx={{ mb: 1 }}>
          Need more help? Read the{' '}
          <Link
            sx={{ textDecoration: 'none' }}
            href='https://docs.google.com/presentation/d/1S40UHb5dsYpEUAKvug3-tMpJe9XbHVvi8aWfrrA-6AQ/edit?usp=sharing'
          >
            <Typography color='primary' variant='body2' component='span'>
              User Manual
            </Typography>
          </Link>{' '}
          here to know more details about how to accomplish the form.
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Button onClick={() => setIsOpen(false)} sx={{ alignSelf: 'flex-end' }}>
          Close
        </Button>
      </Card>
    </Modal>
  );
};

export default OTModal;
