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
  titleClassName?: string;
  titleWrapperClassName?: string;
};

const CollapseWrapper = ({
  children,
  panelTitle,
  open,
  className,
  icon,
  contentClassName,
  titleClassName,
  titleWrapperClassName,
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(open || false);
  return (
    <Accordion
      className={`!p-0 shadow-none border-0 ${
        className || ''
      } border border-gray-200 transition-all ease-in-out duration-150  !rounded-lg before:!hidden ${
        !expanded ? 'mb-2' : ''
      } `}
      expanded={expanded}
      defaultExpanded={open}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        className={`transition ease-in-out duration-150 ${titleWrapperClassName}`}
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
          <span className={titleClassName}>{panelTitle}</span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={contentClassName}>
        {expanded && children}
      </AccordionDetails>
    </Accordion>
  );
};

export default CollapseWrapper;
