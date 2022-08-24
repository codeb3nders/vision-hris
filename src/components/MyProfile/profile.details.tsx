/* eslint-disable react-hooks/exhaustive-deps */
import { PhotoCameraOutlined } from '@mui/icons-material';
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import CustomCard from 'CustomComponents/CustomCard';
import { useContext, useEffect, useRef, useState } from 'react';
import ProfileTabs from './profile.tabs';
import { ProfileCtx } from './profile.main';
import useResize from 'hooks/useResize';
import { PHOTO_PLACEHOLDER } from 'assets';
import moment from 'moment';
import { DEPARTMENTS } from 'constants/Values';

type Props = {};

const ProfileDetails = (props: Props) => {
  const inputRef: any = useRef(null);
  const {
    isNew,
    employeeDetails,
    setEmployeeDetails,
    setDisplayPhoto,
    displayPhoto,
  } = useContext(ProfileCtx);
  const [img, setImg] = useState<any>(null);
  const { processfile, resized } = useResize({ quality: 0.9 });

  console.log({ employeeDetails });

  useEffect(() => {
    img && processfile(img);
  }, [img]);

  useEffect(() => {
    resized && setDisplayPhoto({ employeeNo: '', photo: resized });
  }, [resized]);

  console.log({ displayPhoto });

  return (
    <CustomCard
      className={`grid grid-cols-12 pb-0 phone:p-4 phone:pt-0  tablet:pb-0 laptop:pb-0 desktop:pb-0 tablet:pt-0 laptop:pt-0 desktop:pt-0 ${
        isNew ? '!rounded-none' : ''
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
            src={displayPhoto?.photo ? displayPhoto?.photo : PHOTO_PLACEHOLDER}
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
        <section className='laptop:col-span-9 desktop:col-span-9 tablet:col-span-9 phone:col-span-12 phone:text-xs flex flex-col justify-center phone:text-center tablet:text-left laptop:text-left desktop:text-left'>
          <p
            className={`font-bold text-xl phone:text-sm ${
              isNew ? '' : 'desktop:mb-4 laptop:mb-4 tablet:mb-4 phone:mb-0'
            } uppercase min-h-[20px]`}
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

          {isNew ? (
            <FormControl fullWidth variant='standard' size='small' required>
              <InputLabel id='department'>Department</InputLabel>
              <Select
                onChange={(e: any) => {
                  setEmployeeDetails({
                    ...employeeDetails,
                    department: e.target.value,
                  });
                }}
              >
                {DEPARTMENTS.map((dept: string) => {
                  return (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            <p className='text-sm '>{employeeDetails?.department}</p>
          )}

          <p className='text-gray-500 mt-2'>
            Started on{' '}
            {employeeDetails?.dateHired
              ? moment(employeeDetails?.dateHired).format('LL')
              : 'April 17, 2019'}{' '}
            ({moment(employeeDetails?.dateHired).fromNow() || '3.2 years ago'})
          </p>
        </section>
      )}

      {isNew && (
        <section className='laptop:col-span-9 desktop:col-span-9 tablet:col-span-9 phone:col-span-12 phone:text-xs flex flex-col justify-end phone:text-center tablet:text-left laptop:text-left desktop:text-left'>
          <ProfileTabs className='phone:hidden laptop:block desktop:block tablet:hidden ' />
        </section>
      )}
    </CustomCard>
  );
};

export default ProfileDetails;
