import React from 'react';

type Props = {
  className?: string;
  style?: any;
};

const CustomCard: React.FC<Props> = (props) => {
  return (
    <section
      {...props}
      className={`p-6 bg-white dark:bg-slate-900 dark:text-white drop-shadow-lg rounded-lg lg:rounded-xl overflow-hidden ${props?.className}`}
    >
      {props.children}
    </section>
  );
};

export default CustomCard;
