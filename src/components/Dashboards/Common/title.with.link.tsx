import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title: any;
  path?: string;
  linkLabel?: any;
  icon?: any;
};

/**
 * TODO: Set the Card title with link
 * @param title card title. Required.
 * @param path link path.
 * @param linkLabel link label/name
 * @param icon link icon
 */

const TitleWithLink = ({ title, path, linkLabel, icon }: Props) => {
  return (
    <div>
      {title}{' '}
      {path && (
        <Link
          to={path || '#'}
          className='float-right pr-0 pl-2 text-slate-500 hover:text-v-red rounded-sm ease-in-out duration-200 hover:translate-x-1'
        >
          {linkLabel} {icon}
        </Link>
      )}
    </div>
  );
};

export default TitleWithLink;
