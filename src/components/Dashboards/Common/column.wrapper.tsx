import React from 'react';

type Props = {
  children: any;
  className?: string;
};

const ColumnWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={`col-span-4 tablet:col-span-6 laptop:col-span-5 phone:col-span-12 desktop:col-span-4 grid space-y-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default ColumnWrapper;
