/* eslint-disable react-hooks/exhaustive-deps */
import { FamilyRestroomTwoTone, PersonAddTwoTone } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import GridWrapper from 'CustomComponents/GridWrapper';
import { useContext, useEffect, useState } from 'react';
import { ProfileCtx } from '../profile.main';
import CollapseWrapper from './collapse.wrapper';
import FamilyBackgroundForm from './family.background.form';

type Props = {};

export type FamilyI = {
  //   id?: number;
  fullname: string;
  relation: string;
  occupation: string;
  company: string;
  residence: string;
};

const FamilyBackground = (props: Props) => {
  const { employeeDetails, setEmployeeDetails } = useContext(ProfileCtx);
  const [family, setFamily] = useState<FamilyI[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    employeeDetails?.familyBackground?.length > 0 &&
      setFamily(employeeDetails?.familyBackground);
  }, [employeeDetails]);

  useEffect(() => {
    setEmployeeDetails({ ...employeeDetails, familyBackground: family });
  }, [family]);

  return (
    <CollapseWrapper panelTitle='Family' icon={FamilyRestroomTwoTone}>
      <FamilyBackgroundForm
        open={open}
        setOpen={setOpen}
        setFamily={setFamily}
        family={family}
      />

      <GridWrapper colSize='1'>
        <div className='ww-full col-span-1 flex flex-col justify-end'>
          <button
            onClick={() => setOpen(true)}
            className='px-2 py-1 bg-sky-500 text-white desktop:rounded-sms laptop:rounded-sm tablet:rounded-sm phone:rounded-sm w-auto flex items-center justify-center self-end hover:bg-sky-400 transition duration-150 desktop:mr-0 laptop:mr-0 tablet:mr-0 phone:mr-4 '
          >
            <PersonAddTwoTone fontSize='small' className='mr-1' /> Add Family
            Member
          </button>
          <DataGrid
            getRowId={(data: any) => `${data?.fullname}`}
            rows={family}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            autoHeight
            getRowHeight={() => 'auto'}
            className='border-0'
            disableSelectionOnClick
          />
        </div>
      </GridWrapper>
    </CollapseWrapper>
  );
};

const columns: GridColDef[] = [
  {
    field: 'fullname',
    headerName: 'Fullname',
    flex: 1,
  },
  {
    field: 'relation',
    headerName: 'Relation',
    flex: 1,
  },
  {
    field: 'occupation',
    headerName: 'Occupation',
    type: 'string',
    flex: 1,
  },
  {
    field: 'company',
    headerName: 'Company/Office',
    type: 'string',
    flex: 1,
  },
  {
    field: 'residence',
    headerName: 'Residences',
    type: 'string',
    flex: 1,
  },
];

export default FamilyBackground;
