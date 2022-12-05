import { Add } from '@mui/icons-material';
import { Chip } from '@mui/material';
import React from 'react';

type Props = {
  text: string;
  cb: any;
};

const AddButton = ({ text, cb }: Props) => {
  return (
    <div className='flex justify-end'>
      <button className='group pr-0 pl-2 rounded-sm ease-in-out duration-200'
        onClick={()=>cb()}
      >
          <Chip
            label={text}
            className='hover:bg-v-red hover:text-white cursor-pointer'
          />
    </button>
    </div>
  );
};

export default AddButton;
