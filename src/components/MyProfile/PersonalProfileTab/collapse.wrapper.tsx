import { ExpandMoreTwoTone } from '@mui/icons-material';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  SvgIcon,
} from '@mui/material';
import React, { useState } from 'react';

type Props = {
  children?: any;
  panelTitle: string;
  open?: boolean;
  className?: string;
  icon?: any;
  contentClassName?: string;
};

const CollapseWrapper = ({
  children,
  panelTitle,
  open,
  className,
  icon,
  contentClassName,
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(open || false);
  return (
    <Accordion
      className={`!p-0 shadow-none border-0 ${
        className || ''
      } border border-gray-200 hover:border-v-red/50 transition-all ease-in-out duration-150  !rounded-lg before:!hidden ${
        !expanded ? 'mb-2' : ''
      } `}
      expanded={expanded}
      defaultExpanded={open}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        className='hover:text-v-red hover:bg-v-red/5 transition ease-in-out duration-150'
        expandIcon={<ExpandMoreTwoTone />}
        aria-controls={`${panelTitle
          .split(' ')
          .join('-')
          .toLowerCase()}-content`}
        id={`${panelTitle.split(' ').join('-').toLowerCase()}-header`}
      >
        <Typography
          className={`text-sm flex flex-row gap-1 items-center ${
            expanded ? 'text-v-red' : ''
          }`}
        >
          {icon && <SvgIcon component={icon} fontSize='small' />}
          {panelTitle}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={contentClassName}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default CollapseWrapper;
