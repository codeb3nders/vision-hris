import React from 'react';
import { Button, Card, Divider, Link, Modal, Typography } from '@mui/material';

const LeaveModal = ({ isOpen, setIsOpen }) => {
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
          Leave & Official Business Application Form
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }} color='error'>
          Document Code: VPDC.1.404.009.22
        </Typography>
        {/* <Divider sx={{ mb: 1 }} /> */}
        <Typography variant='body2' sx={{ mb: 1 }}>
          Application for any type of leave or official business shall be made
          on this form with the necessary documentary requirements, if needed or
          available. For this form, please submit the important details such as
          absence/official business dates, reasons for absence/official
          business, and documentary requirements (i.e. doctor’s notes, medical
          certificate, travel requirements, and etc.).
        </Typography>
        <Typography variant='body2' sx={{ mb: 1 }}>
          For your reference, you may view the Employee Leave Policy{' '}
          <Link
            href='https://drive.google.com/file/d/1szNFa8mvfPqr_YSwci_neIOLoRiAzNqv/view?usp=sharing'
            sx={{ textDecoration: 'none' }}
          >
            <Typography color='primary' variant='body2' component='span'>
              here
            </Typography>
          </Link>
          .
        </Typography>
        <Typography variant='body2' sx={{ mb: 1 }}>
          Upon submission of this form, please give your approving head at least
          1-2 days to approve or disapprove your leave/official business
          request. Otherwise, kindly follow up on your approving head for the
          status of your leave application to your approving head.
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

export default LeaveModal;
