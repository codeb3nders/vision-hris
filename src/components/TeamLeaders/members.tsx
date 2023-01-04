/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import {
  Button,
  IconButton,
} from '@mui/material';
import {
  Close,
  LaptopChromebookTwoTone,
  SaveTwoTone,
} from '@mui/icons-material';
import {
  data as _getCompanyAssetsData, dataStatus as _getCompanyAssetsDataStatus,
  updateAction as updateCompanyAsset,
} from 'slices/companyAssets';
import { getEmployeeItems as _getEmployeeItems } from 'slices';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import { ASSET_CONDITIONS } from 'constants/Values';
import { AssetInitialState, AssetModel } from 'components/MyProfile/Assets/assets.table';
// import { CompanyAssetModel } from '.';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import DialogModal from 'CustomComponents/DialogModal';
import { TeamLeaderModel } from '.';
import GridWrapper from 'CustomComponents/GridWrapper';
import { Link } from 'react-router-dom';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  access_token: string;
  data: EmployeeDBI[];
  failed: any;
  teamLeader: TeamLeaderModel;
};

const TeamMembers = ({ setOpen, open, access_token, data, failed, teamLeader }: Props) => {
  console.log({teamLeader}, {data})
  const headerInfo = <div>
    Team Leader: {teamLeader.fullName} <br />
    Department: { teamLeader.department} ({ teamLeader.location})
    </div>
  
  const columns = [
    {
      field: 'fullName',
      headerName: 'Employee name',
      flex: 1
    },
    {
      field: 'employeeNo',
      headerName: 'Employee No.',
      flex: 1,
      renderCell: (cell:any) => {
        return <Link to={`/profile/${cell.value}`} target="_blank">
          <Button variant="text">{cell.value}</Button>
        </Link>
      }
    },
    {
      field: 'position',
      headerName: 'Position',
      flex: 1,
      renderCell: (cell: any) => cell.row.position?.name
    },
    {
      field: 'rank',
      headerName: 'Rank',
      flex: 1,
      renderCell: (cell: any) => cell.row.rank?.name,
      sortComparator: (v1, v2) => v1.localeCompare(v2),
      valueGetter: (params) => {
        return params.row.rank?.name;
      },
    },
    {
      field: 'employmentType',
      headerName: 'Employment Type',
      flex: 1,
      renderCell: (cell: any) => <div style={{ textAlign: "center" }}>{cell.row.employmentType?.name}</div>,
      sortComparator: (v1, v2) => v1.localeCompare(v2),
      valueGetter: (params) => {
        return params.row.employmentType?.name;
      },
    },
  ]
  return (
    <DialogModal
      className="w-[1000px]"
      // titleIcon={<EventNote className='mr-2 text-sky-500' />}
      title={headerInfo}
      onClose={()=>setOpen(false)}  
        // title={
        //   <div className='flex items-start content-left'>
        //     {headerInfo}
        //     <IconButton
        //       sx={{ ml: 'auto' }}
        //       onClick={() => setOpen(false)}
        //     >
        //       <Close />
        //     </IconButton>
        //   </div>
        // }
        open={open}
        actions={
          <button
            className='col-span-2 px-2 py-1 text-slate-400 hover:text-slate-800'
            onClick={() => setOpen(false)}
          >
          Cancel
          </button>
        }
      >
      <DataGrid
          components={{ Toolbar: GridToolbar }}
          autoHeight
          className='data-grid'
          density="compact"
          disableSelectionOnClick
          rows={data}
          columns={columns}
          pageSize={30}
          rowsPerPageOptions={[30]}
          checkboxSelection={false}
          getRowId={(row: any) => row.employeeNo}
        />
    </DialogModal>
  )
}

export default TeamMembers;
