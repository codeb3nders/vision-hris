import React from 'react';

type Props = {
  className?: string;
  style?: any;
  id?: string;
};

const CustomCard: React.FC<Props> = (props) => {
  return (
    <section
      {...props}
      className={`w-full p-6 bg-white dark:bg-slate-900 dark:text-white shadow-md rounded-lg lg:rounded-xl overflow-hidden ${props?.className || ''
        }`}
    >
      {props.children}
    </section>
  );
};

export default CustomCard;
