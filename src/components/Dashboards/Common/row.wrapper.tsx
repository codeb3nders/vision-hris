import React from 'react';

type Props = {
  children?: any;
  className?: any;
};

const RowWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={`col-span-12 tablet:col-span-12 laptop:col-span-12 phone:col-span-12 desktop:col-span-12 grid grid-cols-12 gap-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default RowWrapper;
