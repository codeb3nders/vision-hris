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
    <CollapseWrapper
      panelTitle='Family Background'
      icon={FamilyRestroomTwoTone}
    >
      <FamilyBackgroundForm
        open={open}
        setOpen={setOpen}
        setFamily={setFamily}
        family={family}
      />

      <GridWrapper colSize='1'>
        <div className='ww-full col-span-1 flex flex-col justify-end'>
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
      <div className='flex justify-end'>
        <button
          onClick={() => setOpen(true)}
          className='px-2 py-1 border border-sky-500 text-sky-500 rounded-md hover:bg-sky-200 transition ease-in-out mt-2'
        >
          <PersonAddTwoTone fontSize='small' className='mr-1' /> Add Family
          Member
        </button>
      </div>
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
