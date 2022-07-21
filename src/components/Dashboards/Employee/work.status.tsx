import CardWTitle from 'CustomComponents/CardWTitle';
import { Link } from 'react-router-dom';
import {
  ArrowRightOutlined,
  MoodTwoTone,
  SentimentSatisfiedAltTwoTone,
  SentimentVeryDissatisfiedTwoTone,
} from '@mui/icons-material';

type Props = {};

const WorkStatus = (props: Props) => {
  return (
    <CardWTitle
      title={
        <div>
          How did you find work this week?
          <Link
            to='/'
            className='float-right pr-0 pl-2 text-slate-500 hover:text-v-red rounded-sm ease-in-out duration-200 hover:translate-x-1'
          >
            View All <ArrowRightOutlined fontSize='small' />
          </Link>
        </div>
      }
    >
      <div className='flex flex-row items-center gap-8 justify-center mt-4 '>
        <div className='group text-center hover:scale-110 ease-in-out duration-150'>
          <SentimentVeryDissatisfiedTwoTone
            color='warning'
            className='w-[50px] h-[50px]   cursor-pointer'
          />
          <div className='text-xs text-slate-500 group-hover:text-slate-900'>
            Not Good
          </div>
        </div>
        <div className='group text-center hover:scale-110 ease-in-out duration-150'>
          <SentimentSatisfiedAltTwoTone
            color='info'
            className='w-[50px] h-[50px]  cursor-pointer'
          />
          <div className='text-xs text-slate-500 group-hover:text-slate-900'>
            Good
          </div>
        </div>
        <div className='group text-center hover:scale-110 ease-in-out duration-150'>
          <MoodTwoTone
            color='success'
            className='w-[50px] h-[50px]  cursor-pointer'
          />
          <div className='text-xs text-slate-500 group-hover:text-slate-900'>
            Great
          </div>
        </div>
      </div>
    </CardWTitle>
  );
};

export default WorkStatus;
