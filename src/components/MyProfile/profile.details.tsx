/* eslint-disable react-hooks/exhaustive-deps */
import { PhotoCameraOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';
import CustomCard from 'CustomComponents/CustomCard';
import { useContext, useEffect, useRef, useState } from 'react';
import ProfileTabs from './profile.tabs';
import { ProfileCtx } from './profile.main';
import useResize from 'hooks/useResize';
import moment from 'moment';
import { getAvatar } from 'utils/functions';
import { EmployeeDBI, EmployeeI } from 'slices/interfaces/employeeI';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';
import { AppCtx } from 'App';
import { useParams } from 'react-router-dom';
import { initialState } from './employee.initialstate';

type Props = {
  employeeDetails: EmployeeDBI;
};

const ProfileDetails = ({ employeeDetails }: Props) => {
  const inputRef: any = useRef(null);
  // const {
  //   isNew,
  //   employeeDetails,
  //   setEmployeeDetails,
  //   setDisplayPhoto,
  //   displayPhoto,
  //   enums, updatedDetails, handleUpdateEmployee
  // } = useContext(ProfileCtx);
  const { isNew } = useContext(EmployeeCtx);
  const { userData } = useContext(AppCtx);
  const [img, setImg] = useState<any>(null);
  const { processfile, resized } = useResize({ quality: 0.9 });

  useEffect(() => {
    img && processfile(img);
  }, [img]);

  // useEffect(() => {
  //   resized && setDisplayPhoto({ employeeNo: '', photo: resized });
  // }, [resized]);

  return (
    <div
      className={`grid grid-cols-12 pb-0 phone:p-4 phone:pt-0  tablet:pb-0 laptop:pb-0 desktop:pb-0 tablet:pt-0 laptop:pt-0 desktop:pt-0 w-full p-6 bg-white dark:bg-slate-900 dark:text-white overflow-hidden ${isNew ? '!rounded-none' : ''
        }`}
    >
      <section className='laptop:col-span-3 desktop:col-span-3 tablet:col-span-3 phone:col-span-12 flex items-start justify-center'>
        <div className='relative pb-5'>
          <input
            type='file'
            name=''
            id=''
            hidden
            ref={inputRef}
            onChange={(e: any) => setImg(e.target.files[0])}
          />
          <Avatar
            src={
              // displayPhoto?.photo
              //   ? displayPhoto?.photo :
                getAvatar(employeeDetails.gender?.code)
            }
            className='desktop:w-[100px] laptop:w-[100px] tablet:w-[100px] phone:w-[100px] desktop:h-[100px] laptop:h-[100px] tablet:h-[100px] phone:h-[100px] relative'
          />
          <div className='cursor-pointer absolute bottom-[16px] right-[10px] z-10 w-[36px] h-[36px] bg-white/75 rounded-full flex items-center justify-center'>
            <PhotoCameraOutlined
              className='text-gray-500 hover:text-black'
              onClick={() => inputRef?.current.click()}
            />
          </div>
        </div>
      </section>
      {!isNew && (
        <section className='laptop:col-span-9 desktop:col-span-9 tablet:col-span-9 phone:col-span-12 phone:text-xs flex flex-col justify-center phone:text-center tablet:text-left laptop:text-left desktop:text-left relative'>
          {/* <div className='cursor-pointer absolute top-[16px] right-[10px] z-10 w-[36px] h-[36px] bg-white/75 rounded-full flex items-center justify-center'>
            <IconButton onClick={() => !isNew && setViewDetails ? setViewDetails({ employeeNo: '', status: false }) : (setOpen && setOpen(false))}>
              <Close />
            </IconButton>
          </div> */}
          <p
            className={`font-bold text-xl phone:text-sm uppercase min-h-[20px]`}
          >
            <div className='font-bold desktop:text-xl laptop:text-xl tablet:text-xl phone:text-md phone:mb-0 flex flex-row gap-2 items-center phone:justify-center desktop:justify-start laptop:justify-start tablet:justify-start'>
              <span>
                {employeeDetails?.lastName || (
                  <span className='text-sm text-gray-300 italic'>
                    Last Name
                  </span>
                )}
                {employeeDetails?.lastName ? ', ' : ''}
              </span>
              <span>
                {employeeDetails?.firstName || (
                  <span className='text-sm text-gray-300 italic'>
                    First Name
                  </span>
                )}
              </span>{' '}
              <span>{employeeDetails?.middleName}</span>{' '}
              {employeeDetails?.employeeNo && (
                <span className='ml-1 px-2 py-1 bg-v-red text-white rounded-md text-xs phone:hidden desktop:block laptop:block tablet:block'>
                  {employeeDetails?.employeeNo}
                </span>
              )}
            </div>

            {employeeDetails?.employeeNo && (
              <span className='ml-1 px-2 py-1 bg-v-red text-white rounded-md text-xs phone:inline-block desktop:hidden laptop:hidden tablet:hidden'>
                {employeeDetails?.employeeNo}
              </span>
            )}
          </p>

          <p className='text-sm '>{employeeDetails?.department?.name}</p>

          <p className='text-gray-500 mt-2'>
            Started on {moment(employeeDetails.dateHired).format('LL')} (
            {employeeDetails.yearsInService} year/s)
          </p>
        </section>
      )}

      {/* {isNew && ( */}
      {/* <section className='laptop:col-span-12 desktop:col-span-12 tablet:col-span-12 phone:col-span-12 phone:text-xs flex flex-col justify-end phone:text-center tablet:text-left laptop:text-left desktop:text-left'>
        <ProfileTabs className='phone:hidden laptop:block desktop:block tablet:hidden ' />
      </section> */}
      {/* )} */}
    </div>
  );
};

export default ProfileDetails;
