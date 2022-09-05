/* eslint-disable react-hooks/exhaustive-deps */
import {
  Delete,
  FamilyRestroomTwoTone,
  PersonAddTwoTone,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import GridWrapper from 'CustomComponents/GridWrapper';
import { lazy, useContext, useEffect, useState, memo } from 'react';
import { ProfileCtx } from '../profile.main';
import CollapseWrapper from './collapse.wrapper';
const FamilyBackgroundForm = lazy(() => import('./family.background.form'));

type Props = {};

export type FamilyI = {
  //   id?: number;
  name: string;
  relation: string;
  occupation: string;
  company: string;
  residence: string;
};

const FamilyBackground = (props: Props) => {
  const { employeeDetails, setEmployeeDetails, isNew, setUpdatedDetails } =
    useContext(ProfileCtx);
  const [family, setFamily] = useState<FamilyI[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // employeeDetails?.familyBackground?.length > 0 &&
    //   setFamily(employeeDetails?.familyBackground);
  }, [employeeDetails]);

  useEffect(() => {
    setEmployeeDetails({ ...employeeDetails, familyBackground: family });
    !isNew &&
      family.length > 0 &&
      setUpdatedDetails((prev: any) => ({
        ...prev,
        familyBackground: family,
      }));
  }, [family]);

  const handleDelete = (params: any) => {
    setFamily((prev: any) => {
      const filtered = prev.filter((a: any) => a.id !== params.row.id);
      return filtered;
    });
  };

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
            getRowId={(data: any) => data?.name}
            rows={family}
            columns={columns(handleDelete)}
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

const columns: any = (handleDelete: any) => [
  {
    field: 'name',
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
    renderCell: (params: any) => {
      return (
        <div className='flex flex-row items-center w-full gap-1'>
          <span className='text-xs'>{params.value}</span>
          <div className='flex-1 flex justify-end'>
            <IconButton size='small' onClick={() => handleDelete(params)}>
              <Delete />
            </IconButton>
          </div>
        </div>
      );
    },
  },
];

export default memo(FamilyBackground);
