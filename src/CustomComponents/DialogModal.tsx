import React, { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

type Props = {
  title: any;
  children?: any;
  className?: string;
  actions?: any;
  open: boolean;
  id?: string;
  titleIcon?: any;
  onClose: any;
};

const DialogModal: React.FC<Props> = ({
  title,
  children,
  className,
  actions,
  open, id = "dialog", titleIcon, onClose
}) => {
  console.log({ open });

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as='form'
        id={id}
        className={`relative z-50 max-w-md mx-auto overflow-hidden md:max-w-2xl`}
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm' />
        </Transition.Child>

        <div className={`fixed inset-0 overflow-y-auto`}>
          <div
            className={`flex min-h-full items-center justify-center p-4 text-center`}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={`transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-900 dark:text-white ${className}`}
              >
                <Dialog.Title className='text-lg font-medium leading-6 text-sky-500'>
                  <div className='flex items-center content-left'>
                    {
                      titleIcon ? <Typography
                      variant='h6'
                      className='flex items-center mb-4 text-sky-500'
                      color='primary'
                      >
                        {titleIcon} {title}
                      </Typography> : title
                    }
                  <IconButton
                    sx={{ ml: 'auto' }}
                    onClick={onClose}
                  >
                    <Close />
                  </IconButton>
                </div>
                </Dialog.Title>

                <Dialog.Description className='max-h-[500px]'>
                  <div className='mt-0 flex w-full flex-col' id={id}>{children}</div>
                </Dialog.Description>

                <Dialog.Description className='pt-2 text-right'>
                  {actions}
                </Dialog.Description>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogModal;
