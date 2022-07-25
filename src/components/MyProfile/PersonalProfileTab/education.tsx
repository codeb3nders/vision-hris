import { TextField } from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import React from 'react';
import CollapseWrapper from './collapse.wrapper';

type Props = {};

const Education = (props: Props) => {
  return (
    <CollapseWrapper panelTitle='Education'>
      <GridWrapper colSize='2'>
        <div className='col-span-2'>
          <TextField fullWidth variant='standard' label='Course' />
        </div>
        <div className='col-span-1'></div>
        <div className='col-span-1'></div>
        <div className='col-span-1'></div>
        <div className='col-span-1'></div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default Education;
