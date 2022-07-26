import React from 'react';

type Props = {
  children?: any;
  className?: string;
  colSize: string;
};

const GridWrapper = ({ className = '', children, colSize }: Props) => {
  return (
    <div
      className={`grid grid-cols-${colSize} gap-4 [&>div>div>div>input]:!text-sm [&>div>div>label]:!text-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default GridWrapper;
