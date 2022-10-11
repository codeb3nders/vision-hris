/* eslint-disable react-hooks/exhaustive-deps */
import {
  DataGrid,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  MuiEvent,
  gridClasses,
} from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import { Cancel, Delete, Description, Edit, Save } from '@mui/icons-material';
import { ProfileCtx } from '../profile.main';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAction,
  deleteAction,
  getByEmployeeNoAction,
  data as getData,
  dataStatus as getDataStatus,
  deleteStatus as getDeleteStatus,
  updateAction,
  updateStatus,
  updateError,
  newDataStatus,
} from 'slices/employee201files';
import { AppCtx } from 'App';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import moment from 'moment';
import ConfirmDelete from 'components/Other/confirm.delete';
import { Tooltip } from '@mui/material';

type Props = {};

type ChecklistModel = {
  documentCode: string;
  documentDescription: string;
  dateUploaded?: string;
  url?: string;
  remarks?: string;
  id?: any;
};

const ChecklistTable = (props: Props) => {
  const dispatch = useDispatch();
  const { isNew, setUpdatedDetails, enums } = useContext(ProfileCtx);
  const [rows, setRows] = useState<ChecklistModel[]>([]);
  const [documents, setDocuments] = useState<any[]>([])
  const [selectedDocuments, setSelectedDocuments] = useState<any[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const employee201Files = useSelector(getData);
  const employee201FilesStatus = useSelector(getDataStatus);
  const employeeUpdate201FilesStatus = useSelector(updateStatus);
  const employeeNew201FilesStatus = useSelector(newDataStatus);
  const employeeDelete201FilesStatus = useSelector(getDeleteStatus);
  const { access_token } = useContext(AppCtx);
  const { employeeDetails, failed, resetNotif } = useContext(ProfileCtx);
  const [confirmDelete, setConfirmDelete] = useState<{
    row: any;
    status: boolean;
  }>({ row: null, status: false });

  useEffect(() => {
    setRows(documents);
  }, [documents])

  useEffect(() => {
    if (employee201FilesStatus !== 'idle') {
      setRows(() => {
        return documents.map((o: ChecklistModel) => {
          const idx = employee201Files.findIndex((x: any) => x.documentType.code.toLocaleLowerCase() === o.documentCode.toLocaleLowerCase())
          if (idx >= 0) {
            return {
              ...o,
              ...employee201Files[idx]
            }
          }
          return o;
        })
      });
    }
  }, [employee201FilesStatus]);

  useEffect(() => {
    if (employeeDetails.employeeNo) {
      handleData();
    }
  }, [employeeDetails.employeeNo]);

  useEffect(() => {
    if (employeeUpdate201FilesStatus === 'succeeded' || employeeNew201FilesStatus === 'succeeded' || employeeDelete201FilesStatus === "succeeded") {
      handleData();
    }
  }, [employeeNew201FilesStatus, employeeUpdate201FilesStatus, employeeDelete201FilesStatus]);

  const handleData = async () => {
    await dispatch(
      getByEmployeeNoAction({
        access_token,
        employeeNo: employeeDetails.employeeNo,
      })
    );
  };

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    console.log({id}, "xxxxxxxxxxxxxxxxx")
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  useEffect(() => {
    const updated = selectedDocuments.map((selected: any) => {
      const updatedDocuments = rows.filter(
        (row: any) => row.documentCode === selected
      )[0];
      if (updatedDocuments) {
        return updatedDocuments;
      }

      return null;
    });

    console.log({ updated });
  }, [selectedDocuments]);

  useEffect(() => {
    const list = enums.file201.map((document: any) => ({
      documentCode: document?.code,
      documentDescription: document?.documentDescription || null,
      id: document.code
    }));
    setDocuments(list)
  }, [enums]);

  useEffect(() => {
    !isNew &&
      rows.length > 0 &&
      setUpdatedDetails((prev: any) => ({
        ...prev,
        employee201Files: rows.filter((row) => row.dateUploaded),
      }));

    rows.length <= 0 &&
      setUpdatedDetails((prev: any) => {
        delete prev?.employee201Files;
        return prev;
      });
  }, [rows]);

  const handleDelete = async (row: ChecklistModel) => {
    await dispatch(deleteAction({id: row.id, access_token}))
    setConfirmDelete({ row: null, status: false });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow:any = { ...newRow, isNew: false };
    console.log({ newRow, updatedRow });
    const handleSave = async () => {
      console.log(updatedRow.documentType, "updatedRow.documentTypeupdatedRow.documentType")
      try {
        if (updatedRow.documentType) {
          const { documentCode, documentDescription, employeeNo, isNew, ...rest} = updatedRow;
          if (!(updatedRow.dateUploaded && updatedRow.url && updatedRow.remarks)) {
            await dispatch(
              deleteAction({
                id: updatedRow.id,
                access_token,
              })
            );
          } else {
            await dispatch(
              updateAction({
                params: {
                  ...rest, documentType: newRow.documentCode,
                  id: updatedRow.id
                },
                access_token,
              })
            );
          }
        } else {
          const { documentCode, documentDescription, id, ...rest} = newRow;
          await dispatch(
            createAction({
              body: {...rest, documentType: newRow.documentCode, employeeNo: employeeDetails.employeeNo },
              access_token,
            })
          );
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    
    handleSave();

    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div>
      <div style={{ width: '100%' }}>
        <ConfirmDelete
          open={confirmDelete}
          setOpen={setConfirmDelete}
          handleDelete={handleDelete}
        />
        <DataGrid
          components={{ Toolbar: CustomToolbar }}
          autoHeight
          hideFooter={true}
          experimentalFeatures={{ newEditingApi: true }}
          disableSelectionOnClick
          rows={rows}
          columns={columns(
            rowModesModel,
            handleSaveClick,
            handleCancelClick,
            handleEditClick,
            setConfirmDelete
          )}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
            },
          }}
          getRowHeight={() => 'auto'}
          onStateChange={(state: any) => setSelectedDocuments(state.selection)}
          getRowId={(data) => data.documentCode}
          processRowUpdate={processRowUpdate}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
        />
      </div>
    </div>
  );
};

const columns: any = (
  rowModesModel: any,
  handleSaveClick: any,
  handleCancelClick: any,
  handleEditClick: any,
  setConfirmDelete:any
) => [
  {
    field: 'documentCode',
    headerName: 'Document',
    width: 220,
    renderCell: (params: any) => {
      return <span className='text-xs'><Tooltip title={params.row.documentDescription} ><Description fontSize='small' /></Tooltip>{" " }{params.value} </span>
    },
  },
  {
    field: 'dateUploaded',
    headerName: 'Date Uploaded',
    type: 'date',
    editable: true,
    width: 100,
    renderCell: (params: any) => {
      return params.value && moment(params.value).format('MM/DD/YYYY');
    },
  },
  {
    field: 'url',
    headerName: 'URL',
    editable: true,
    width: 200,
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    editable: true,
    width: 200,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: (params) => {
      const isInEditMode = rowModesModel[params.row.id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<Save color='success' />}
            label='Save'
            onClick={handleSaveClick(params.row.id)}
          />,
          <GridActionsCellItem
            icon={<Cancel />}
            label='Cancel'
            className='textPrimary'
            onClick={handleCancelClick(params.row.id)}
            color='inherit'
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<Edit />}
          label='Edit'
          className='textPrimary'
          onClick={handleEditClick(params.row.id)}
          color='inherit'
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label='Delete'
          className='textPrimary'
          onClick={() => setConfirmDelete({ row: params.row, status: true })}
          color='inherit'
        />
      ];
    },
  },
];

export default ChecklistTable;
