import { } from '@mui/icons-material';
import {
  List,
  ListItemIcon,
  ListItemText,
  Avatar,
  ListItemButton,
} from '@mui/material';
import { AppCtx } from 'App';
import { getEmployeeItems as _getEmployeeItems } from 'slices';
import CustomCard from 'CustomComponents/CustomCard';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAvatar } from 'utils/functions';
import { ProfileCtx } from './profile.main';
import CollapseWrapper from './PersonalProfileTab/collapse.wrapper';

type Props = {
  className?: string;
  setViewDetails?: React.Dispatch<
    React.SetStateAction<{
      employeeNo: string;
      status: boolean;
    }>
  >;
};

const ProfileTeam = ({ className, setViewDetails }: Props) => {
  const { employeeDetails } = useContext(ProfileCtx);
  const { isHRLogin } = useContext(AppCtx);
  const [myTeammates, setMyTeammates] = useState<any[]>([]);
  const getEmployeeItems = useSelector(_getEmployeeItems);

  useEffect(() => {
    if (employeeDetails && employeeDetails.reportsTo) {
      console.log({ employeeDetails });
      setMyTeammates(
        getEmployeeItems
          .filter((x: any) => {
            return (
              x.reportsTo &&
              x.reportsTo.employeeNo === employeeDetails.reportsTo.employeeNo &&
              x.employeeNo !== employeeDetails.employeeNo &&
              x.employeeNo !== employeeDetails.reportsTo.employeeNo
            );
          })
          .sort((a: any, b: any) => a.lastName.localeCompare(b.lastName))
      );
    }
  }, [getEmployeeItems, employeeDetails]);

  const getMyTeamMates = () => {
    return myTeammates.map((o: any, i: number) => {
      return (
        <ListItemButton
          key={i}
          className='p-0 px-1'
          onClick={() => {
            isHRLogin &&
              setViewDetails &&
              setViewDetails({
                employeeNo: o.employeeNo,
                status: true,
              });
          }}
        >
          <ListItemIcon>
            <Avatar src={getAvatar(o.gender?.code)} />
          </ListItemIcon>
          <ListItemText
            primary={
              <span className='text-xs font-bold'>
                {o.lastName}, {o.firstName}
              </span>
            }
            secondary={<span className='text-xs '>{o.position.name}</span>}
          />
        </ListItemButton>
      );
    });
  };

  return (
    <CustomCard className={`${className}`}>
      <List className='p-0'>
        <p className='text-xs font-bold text-gray-500 mt-2'>REPORTS TO</p>
        <ListItemButton
          className='p-0 px-1'
          onClick={() => {
            isHRLogin &&
              setViewDetails &&
              setViewDetails({
                employeeNo: employeeDetails.reportsTo.employeeNo,
                status: true,
              });
          }}
        >
          <ListItemIcon>
            <Avatar src={getAvatar(employeeDetails.reportsTo?.gender)} />
          </ListItemIcon>
          <ListItemText
            primary={
              <span className='text-sm font-bold'>
                {employeeDetails.reportsTo?.employeeName}
              </span>
            }
            secondary={
              <span className='text-xs '>
                {employeeDetails.reportsTo?.position}
              </span>
            }
          />
        </ListItemButton>

        <CollapseWrapper
          panelTitle='Teammates'
          titleClassName='text-xs font-bold text-gray-500 mt-2 uppercase'
          titleWrapperClassName='!pl-0'
          open
        >
          {getMyTeamMates()}
        </CollapseWrapper>
      </List>
    </CustomCard>
  );
};

export default ProfileTeam;
