import { Add } from '@mui/icons-material';
import React from 'react';

type Props = {
  setOpen: any;
  text: string;
};

const AddButton = ({ setOpen, text }: Props) => {
  return (
    <div className='flex justify-end'>
      <button
        className='px-2 py-1 border border-sky-500 text-sky-500 rounded-md hover:bg-sky-200 transition ease-in-out mt-2'
        onClick={() => setOpen(true)}
      >
        <Add fontSize='small' /> {text}
      </button>
    </div>
  );
};

export default AddButton;
