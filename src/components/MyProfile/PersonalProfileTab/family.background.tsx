/* eslint-disable react-hooks/exhaustive-deps */
import {
  Delete,
  FamilyRestroomTwoTone,
  PersonAddTwoTone,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { EmployeeCtx } from 'components/HRDashboard/EmployeeDatabase';
import AddButton from 'CustomComponents/AddButton';
import GridWrapper from 'CustomComponents/GridWrapper';
import { lazy, useContext, useEffect, useState, memo, useMemo } from 'react';
import { EmployeeI } from 'slices/interfaces/employeeI';
import { ProfileCtx } from '../profile.main';
import CollapseWrapper from './collapse.wrapper';
const FamilyBackgroundForm = lazy(() => import('./family.background.form'));

type Props = {};

export type FamilyI = {
  name: string;
  relation: string;
  occupation: string;
  company: string;
  residence: string;
};

const FamilyBackground = (props: Props) => {
  const { employeeDetails, setEmployeeDetails, setUpdatedDetails, getIcon, updatedDetails } =
    useContext(ProfileCtx);
  const { isNew } = useContext(EmployeeCtx);
  const [family, setFamily] = useState<FamilyI[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [withUpdate, setWithUpdate] = useState<boolean>(false);

  const withData = useMemo(() => {
    return family.some((x:any) => x.name || x.relation || x.company || x.occupation || x.residence)
  }, [family])

  useEffect(() => {
    if (withUpdate) {
      if (!isNew) {
        setUpdatedDetails((prev: any) => {
          return {
            ...prev,
            familyBackground: family
          }
        })
      } else {
        setEmployeeDetails((prev:EmployeeI) => {
          return {
            ...prev,
            familyBackground: family
          }
        })
      }
    }
  }, [family])

  useEffect(() => {
    const dbData:any[] = employeeDetails?.familyBackground || [];
    setFamily(dbData);
  }, [employeeDetails.familyBackground]);

  const handleDelete = (params: any) => {
    setFamily((prev: any) => {
      const filtered = prev.filter((a: any) => {
        const paramsKey = params.row.name;
        const aKey = a?.name;
        return paramsKey !== aKey;
      });
      return filtered;
    });
    setWithUpdate(true);
  };

  return (
    <CollapseWrapper
      panelTitle='Family Background'
      icon={() => getIcon(<FamilyRestroomTwoTone />, "familyBackground")}
    >
      <FamilyBackgroundForm
        open={open}
        setOpen={setOpen}
        setFamily={setFamily}
        family={family}
        setWithUpdate={setWithUpdate}
      />

      <GridWrapper colSize='1'>
        <div className='ww-full col-span-1 flex flex-col justify-end'>
          <DataGrid
            getRowId={(data: any) => data?.name}
            rows={family}
            columns={columns(handleDelete)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            getRowHeight={() => 'auto'}
            className='border-0'
            disableSelectionOnClick
          />
        </div>
      </GridWrapper>
      <AddButton text='Add Family Member' cb={() => setOpen(true)} />
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
