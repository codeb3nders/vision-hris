/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppCtx } from '../App';
import AdminMainDashboard from './Dashboards/Admin/admin.main.dashboard';
import EmployeeDashboard from './Dashboards/Employee/main.dashboard';
import HRMainDashboard from './Dashboards/HR/hr.main.dashboard';
import ManagerMainDashboard from './Dashboards/Manager/manager.main.dashboard';
import { MainCtx } from './Main';
import {
  getAllEmployeesAction as _getEmployeesAction,
  getEmployeeStatus as _getEmployeeStatus,
  getEmployeeItems as _getEmployeeItems
} from 'slices';
import { EmployeeI } from 'slices/interfaces/employeeI';
import moment from 'moment';

const Dashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userGroup, access_token } = useContext(AppCtx);
  const { setIsTable } = useContext(MainCtx);
  const [isHR, setIsHR] = useState<boolean>(false);
  const [celebrations, setCelebrations] = useState<any[]>([]);
  const [activeEmployeesCount, setActiveEmployeesCount] = useState<number>(0);
  const [countContract, setCountContract] = useState<number>(0);
  const [countProbation, setCountProbation] = useState<number>(0);
  const [headCount, setHeadCount] = useState<any[]>([]);

  const getEmployeeStatus = useSelector(_getEmployeeStatus);
  const getEmployeeItems = useSelector(_getEmployeeItems);

  useEffect(() => {
    if (location.pathname === '/people/employees') {
      setIsTable(true);
    } else {
      setIsTable(false);
    }
  }, [location]);

  useEffect(() => {
    if (userGroup.toLocaleUpperCase() === 'HR ADMIN') {
      setIsHR(true);
    }
  }, [userGroup]);

  useEffect(() => {
    if (access_token) {
      dispatch(_getEmployeesAction({ access_token, params: {isActive: true} }));
    }
  }, [access_token]);

  useEffect(() => {
    if (isHR) {
      let active = 0,
        contractEnd = 0,
        probationaryEnd = 0,
        countPerDept: any[] = [];
      getEmployeeItems.map((o: any) => {
        const key = o.department?.code;
        active++;
        if (o.employmentType?.code.toLocaleLowerCase() == 'project') {
          if (
            moment(o.contractEndDate)
              .endOf('day')
              .diff(moment().endOf('day'), 'month') < 1
          ) {
            contractEnd++;
          }
        } else if (o.employmentType?.code.toLocaleLowerCase() == 'probationary') {
          if (
            moment(o.endOfProbationary)
              .endOf('day')
              .diff(moment().endOf('day'), 'month') < 1
          ) {
            probationaryEnd++;
          }
        }
        const index = countPerDept.findIndex((c: any) => c.x === key);
        if (index < 0) {
          countPerDept.push({
            x: key,
            y: 1,
            name: o.department?.name,
          });
        } else {
          countPerDept[index].y++;
        }
      });
      
      setActiveEmployeesCount(active);
      setCountContract(contractEnd);
      setCountProbation(probationaryEnd);
      setHeadCount(countPerDept);
    }
    getCelebrations(getEmployeeItems)
  }, [getEmployeeItems]);

  const getCelebrations = async (activeEmployees: any[]) => {
    let celeb: any[] = [];
    activeEmployees.map((o: any) => {
      const bdayToday = moment(o.birthDate)
        .endOf('day')
        .isSame(moment().endOf('day'));
      const dateHired = moment(o.dateHired);
      const annivToday =
        dateHired.date() === moment().date() &&
        dateHired.month() === moment().month();
      if (bdayToday || annivToday) {
        celeb.push({
          ...o,
          isBirthdayToday: bdayToday,
          isAnnivToday: annivToday,
        });
      }
    });
    setCelebrations(celeb);
  }

  const switcher = () => {
    switch (userGroup.toUpperCase()) {
      case 'EMPLOYEE':
        const valuesE: any = {
          celebrations,
        };
        return <EmployeeDashboard {...valuesE} />;
      case 'APPROVER':
        return <ManagerMainDashboard />;
      case 'HR ADMIN':
        const values: any = {
          activeEmployeesCount,
          countContract,
          countProbation,
          headCount,
          celebrations,
        };
        return <HRMainDashboard {...values} />;
      case 'SYSTEM ADMIN':
        return <AdminMainDashboard />;

      default:
        break;
    }
  };

  return <div className='w-full'>{switcher()}</div>;
};

export default Dashboard;
