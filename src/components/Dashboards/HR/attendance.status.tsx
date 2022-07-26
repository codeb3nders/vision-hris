import { Circle } from '@mui/icons-material';
import CardWTitle from 'CustomComponents/CardWTitle';

type Props = {
  className?: string;
};

const AttendanceStatus = ({ className }: Props) => {
  return (
    <CardWTitle className={`${className}`} title={'Attendance Status'}>
      <div className='text-xs mb-2'>Last Upload: July 10, 2022</div>
      <div className='grid grid-cols-3 text-sm content-center'>
        <span className='col-span-2 flex flex-row items-center gap-2'>
          <Circle color='success' className='text-[10px]' /> Verified
        </span>
        <span className='self-end text-right font-bold'>26</span>
      </div>
      <div className='grid grid-cols-3 text-sm content-center mt-2'>
        <span className='col-span-2 flex flex-row items-center gap-2'>
          <Circle color='warning' className='text-[10px]' /> Pending
        </span>
        <span className='self-end text-right font-bold'>48</span>
      </div>
    </CardWTitle>
  );
};

export default AttendanceStatus;
