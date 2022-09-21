import { HomeOutlined, ReportProblemOutlined } from '@mui/icons-material';
import { ERROR } from 'assets';
import env from 'environments/env';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

type Props = {
  type?: 'NotFound' | 'Restricted';
};

const ErrorPage = ({ type = 'Restricted' }: Props) => {
  const history = useHistory();
  const location = useLocation();

  const [error, setError] = useState<{ msg: string; code: number | null }>({
    msg: `Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.`,
    code: 404,
  });

  const handleHome = () => {
    history.push('/');
  };

  const handleReport = () => {};

  useEffect(() => {
    const error = location.pathname.split('/')[1];
    switch (error) {
      case 'noaccess':
        setError({
          msg: `Sorry, you don't have permission to view this page. If you think something is broken, report a problem.`,
          code: null,
        });
        break;

      default:
        break;
    }
  }, [location]);

  return (
    <section className='flex flex-row items-center justify-center h-[80vh] w-[100%]'>
      <article className='flex flex-row relative overflow-hidden text-white desktop:max-w-[70%] laptop:max-w-[80%] tablet:max-w-[100%] phone:max-w-[100%] bg-gradient-to-r from-v-red to-red-800 rounded-xl p-4 drop-shadow-2xl '>
        <div className='flex flex-col items-start justify-start w-[65%] p-4 gap-8'>
          <p className='text-white leading-none desktop:text-[7rem] laptop:text-[7rem] tablet:text-[6rem] phone:text-[5rem] uppercase'>
            {error.code ?? 'Oops!'}{' '}
            {location.pathname.split('/noaccess')[1] && (
              <p className='mt-2 px-2 py-1 bg-white/10 text-sm normal-case rounded'>
                Current Page: {env.BASE_URL}
                {location.pathname.split('/noaccess')[1]}
              </p>
            )}
          </p>
          <p className='desktop:text-xl laptop:text-xl tablet:text-xl phone:text-md'>
            {error.msg}
          </p>

          <div className='flex desktop:flex-row laptop:flex-row tablet:flex-row phone:flex-col gap-4'>
            <button
              onClick={handleHome}
              className='flex flex-row gap-1 items-center bg-white/80 hover:bg-white hover:shadow-xl border-2 rounded-full py-2 px-6 text-v-red text-sm font-bold transition-all duration-200 uppercase'
            >
              <HomeOutlined fontSize='small' /> Return Home
            </button>
            <button
              onClick={handleReport}
              className='flex flex-row gap-1 rounded-full py-2 px-6 text-sm hover:shadow-xl uppercase text-white/80 hover:text-white border-2 border-white/0 hover:border-white transition-all duration-200'
            >
              <ReportProblemOutlined fontSize='small' /> Report Problem
            </button>
          </div>
        </div>

        <div className='flex-1 relative'>
          <div className='absolute desktop:right-[-100px] laptop:right-[-90px] tablet:right-[-90px] phone:right-[-60px] desktop:bottom-[-120px] laptop:bottom-[-100px] tablet:bottom-[-110px] phone:bottom-[-80px] desktop:w-[150%] laptop:w-[150%] tablet:w-[160%] phone:w-[180%]'>
            <img
              className='select-none'
              src={ERROR}
              alt=''
              onMouseDown={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </article>
    </section>
  );
};

export default ErrorPage;
