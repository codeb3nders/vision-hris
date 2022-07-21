import React from 'react';
import CustomCard from './CustomCard';

type Props = {
  children?: any;
  title: any | string;
  className?: any;
  style?: any;
};

const CardWTitle: React.FC<Props> = ({ title, children, className, style }) => {
  return (
    <CustomCard className={className} style={style}>
      <div className='mb-1 text-xs text-v-red'>{title}</div>
      {children}
    </CustomCard>
  );
};

export default CardWTitle;
