import React, { Fragment, useState } from 'react';
import { Button, Card, Divider, Link, Modal, Typography } from '@mui/material';
import CustomCard from '../../../CustomComponents/CustomCard';
import { Dialog, Transition } from '@headlessui/react';
import DialogModal from 'CustomComponents/DialogModal';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LeaveModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);

  return (
    <DialogModal
      className='max-w-[500px]'
      title='Leave & Official Business Application Form'
      open={isDialogOpen}
      actions={
        <div className='mt-4'>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            onClick={() => setIsDialogOpen(false)}
          >
            Got it, thanks!
          </button>
        </div>
      }
    >
      <Typography variant='body1' sx={{ mb: 1 }} color='error'>
        Document Code: VPDC.1.404.009.22
      </Typography>
      <div className='mt-2'>
        <p className='text-sm text-gray-500'>
          Application for any type of leave or official business shall be made
          on this form with the necessary documentary requirements, if needed or
          available. For this form, please submit the important details such as
          absence/official business dates, reasons for absence/official
          business, and documentary requirements (i.e. doctor’s notes, medical
          certificate, travel requirements, and etc.).
        </p>

        <p className='text-sm text-gray-500 mt-2'>
          For your reference, you may view the Employee Leave Policy{' '}
          <Link
            href='https://drive.google.com/file/d/1szNFa8mvfPqr_YSwci_neIOLoRiAzNqv/view?usp=sharing'
            sx={{ textDecoration: 'none' }}
          >
            <Typography color='primary' variant='body2' component='span'>
              here
            </Typography>
          </Link>
        </p>

        <p className='text-sm text-gray-500 mt-2'>
          Upon submission of this form, please give your approving head at least
          1-2 days to approve or disapprove your leave/official business
          request. Otherwise, kindly follow up on your approving head for the
          status of your leave application to your approving head.
        </p>

        <p className='text-sm text-gray-500 mt-2'>
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
        </p>
      </div>
    </DialogModal>
  );
};

export default LeaveModal;
