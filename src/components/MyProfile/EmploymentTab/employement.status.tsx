/* eslint-disable react-hooks/exhaustive-deps */
import { WorkHistoryTwoTone } from '@mui/icons-material';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { ProfileCtx } from '../profile.main';

type Props = {};

export const employment_status = [
  'Regular',
  'Probationary',
  'Project Employee',
];

const columns: GridColDef[] = [
  {
    field: 'dateHired',
    headerName: 'Effective Date',
    flex: 1,
    renderCell: (params: GridCellParams) => {
      return <div>{moment(params.value).format('LL')}</div>;
    },
  },
  {
    field: 'employmentStatus',
    headerName: 'Employment Status',
    flex: 1,
    renderCell: (params: GridCellParams) => {
      return <div>{params.value}</div>;
    },
  },
  {
    field: 'comment',
    headerName: 'Comment',
    type: 'string',
    flex: 1,
  },
];

type EmploymentI = {
  id: any;
  dateHired: string;
  employmentStatus: string;
  endOfProbationary: string;
};

const EmployementStatus = (props: Props) => {
  const [employmentDetails, setEmployementDetails] = useState<EmploymentI[]>(
    []
  );
  const { isNew, employeeDetails } = useContext(ProfileCtx);

  useEffect(() => {
    setEmployementDetails([
      ...employmentDetails,
      {
        id: employeeDetails?.dateHired,
        dateHired: employeeDetails?.dateHired,
        employmentStatus: employeeDetails?.employmentStatus,
        endOfProbationary: employeeDetails?.endOfProbationary,
      },
    ]);
  }, [employeeDetails]);

  return (
    <CollapseWrapper
      panelTitle='Employment Status'
      icon={WorkHistoryTwoTone}
      contentClassName='p-0'
    >
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) =>
            `${employeeDetails?.dateHired}~${employeeDetails?.employeeNo}`
          }
          rows={isNew ? [] : employmentDetails}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          autoHeight
          getRowHeight={() => 'auto'}
          className='border-0'
        />
      </div>
    </CollapseWrapper>
  );
};

export default EmployementStatus;
