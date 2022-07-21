import React from 'react';

type Props = {
  children?: any;
  className?: any;
};

const RowWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={`col-span-14 tablet:col-span-14 laptop:col-span-15 phone:col-span-14 desktop:col-span-14 grid grid-cols-16 gap-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default RowWrapper;
