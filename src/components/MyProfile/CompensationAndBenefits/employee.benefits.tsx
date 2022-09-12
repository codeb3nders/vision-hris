import { PaidTwoTone, VolunteerActivismTwoTone } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import GridWrapper from 'CustomComponents/GridWrapper';
import { useContext } from 'react';
import { EmployeeI } from 'slices/interfaces/employeeI';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { ProfileCtx } from '../profile.main';

type Props = {};

const EmployeeBenefits = (props: Props) => {
  const { setEmployeeDetails, employeeDetails, isNew, setUpdatedDetails } =
    useContext(ProfileCtx);

  return (
    <CollapseWrapper
      panelTitle='Employee Benefits'
      icon={VolunteerActivismTwoTone}
      contentClassName='p-0'
    >
      <GridWrapper colSize='2'>
        
      </GridWrapper>
    </CollapseWrapper>
  );
};

export default EmployeeBenefits;
