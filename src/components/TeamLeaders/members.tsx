/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, GridRowParams, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  IconButton,
  Snackbar,
} from '@mui/material';
import {
  CheckBox,
  Close,
  LaptopChromebookTwoTone,
  SaveTwoTone,
} from '@mui/icons-material';
import {
  data as _getCompanyAssetsData, dataStatus as _getCompanyAssetsDataStatus,
  updateAction as updateCompanyAsset,
} from 'slices/companyAssets';
import { getAllEmployeesAction, getEmployeeItems as _getEmployeeItems } from 'slices';
import { EmployeeDBI } from 'slices/interfaces/employeeI';
import { ASSET_CONDITIONS } from 'constants/Values';
import { AssetInitialState, AssetModel } from 'components/MyProfile/Assets/assets.table';
// import { CompanyAssetModel } from '.';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import DialogModal from 'CustomComponents/DialogModal';
import { TeamLeaderModel } from '.';
import GridWrapper from 'CustomComponents/GridWrapper';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateEmployeeEndpoint } from 'apis/employees';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  access_token: string;
  data: EmployeeDBI[];
  failed: any;
  teamLeader: TeamLeaderModel;
  getData: any;
};

const TeamMembers = ({ setOpen, open, access_token, data, failed, teamLeader, getData }: Props) => {
  const dispatch = useDispatch();
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [openNotif, setOpenNotif] = useState<{
    message: string;
    status: boolean;
    severity: any;
  }>({ message: '', status: false, severity: '' });

  useEffect(() => {
    setMembers(data.map((o:any) => {
      return {
        ...o,
        isDisabled: o.employeeNo == teamLeader.employeeNo || o.reportsTo?.employeeNo == teamLeader.employeeNo
      }
    }))
  }, [data])
console.log({selectedEmployees}, {data}, {teamLeader})
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
    {
      field: 'reportsTo',
      headerName: 'Team Leader',
      flex: 1,
      renderCell: (cell: any) => <div style={{ textAlign: "center" }}>{cell.row.reportsTo?.employeeName}</div>,
      sortComparator: (v1, v2) => v1.localeCompare(v2),
      valueGetter: (params) => {
        return params.row.reportsTo?.employeeName;
      },
    }
  ]
  console.log({selectedEmployees}, {members})
  function CustomToolbar() {
    const ToggleRowSelection = () => {
      const updateEmployees = async () => {
        if (selectedEmployees.length > 0) {
          const config = {
              headers: { Authorization: `Bearer ${access_token}` },
          };
            // return await updateEmployeeEndpoint(data.params, config, data.where);
          const params = { reportsTo: teamLeader.employeeNo }
          Promise.all(
            selectedEmployees.map(async (o: any) => {
              return await updateEmployeeEndpoint(params, config, { employeeNo: o })
            })
          ).then((values: any) => {
            getData();
            setOpenNotif({
              message: "Employees have been updated.",
              status: true,
              severity: 'success',
            });
            dispatch(getAllEmployeesAction({ access_token }));

            setTimeout(() => {
              setOpenNotif({
                message: '',
                status: false,
                severity: '',
              });
            }, 2000)
            setSelectedEmployees([]);

          })
        }
      // await dispatch(
      //   updateEmployee({
      //     where: { department: TLData.department.code },
      //     params: {reportsTo },
      //     access_token,
      //   })
      // );
    }
      return <Button size='small' startIcon={<CheckBox />} onClick={updateEmployees}>Update Employees</Button>
    }
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
        <ToggleRowSelection />
      </GridToolbarContainer>
    );
    }
    
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
      <Snackbar
        autoHideDuration={2000}
        open={openNotif.status}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert severity={openNotif.severity}>{openNotif.message}</Alert>
      </Snackbar>
      <DataGrid
          components={{ Toolbar: CustomToolbar }}
          autoHeight
          className='data-grid'
          density="compact"
          disableSelectionOnClick
          rows={members}
          columns={columns}
          pageSize={30}
          rowsPerPageOptions={[30]}
          isRowSelectable={(params: GridRowParams) => !params.row.isDisabled}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectedEmployees(newSelectionModel)
          }}
          selectionModel={[...selectedEmployees]}
          getRowId={(row: any) => row.employeeNo}
        />
    </DialogModal>
  )
}

export default TeamMembers;
