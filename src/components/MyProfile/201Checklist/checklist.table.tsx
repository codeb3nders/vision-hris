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
  MuiEvent,
} from '@mui/x-data-grid';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  AddTaskTwoTone,
  Cancel,
  Delete,
  Edit,
  Save,
  SaveTwoTone,
} from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { ProfileCtx } from '../profile.main';
import AddButton from 'CustomComponents/AddButton';
import GridWrapper from 'CustomComponents/GridWrapper';

type Props = {};

type ChecklistModel = {
  documentCode: string;
  documentDescription?: string;
  dateUploaded: string;
  fileType?: string;
  url?: string;
  remarks?: string;
  id: number;
};

const ChecklistTable = (props: Props) => {
  const { isNew, setUpdatedDetails, enums } = useContext(ProfileCtx);
  const [rows, setRows] = useState<ChecklistModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDocuments, setSelectedDocuments] = useState<any[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

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

    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow!.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
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
    const list = enums?.file201.map((document: any, idx: number) => ({
      documentCode: document?.code,
      documentDescription: document?.documentDescription || null,
      dateUploaded: document?.dateUploaded || null,
      fileType: document?.fileType || null,
      url: document?.url || null,
      remarks: document?.remarks || null,
      id: document.code,
    }));
    setRows(list);
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

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log({ newRow, updatedRow });

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  return (
    <div>
      <div style={{ width: '100%' }}>
        <DataGrid
          autoHeight
          experimentalFeatures={{ newEditingApi: true }}
          disableSelectionOnClick
          rows={rows}
          columns={columns(
            rowModesModel,
            handleSaveClick,
            handleCancelClick,
            handleEditClick,
            handleDeleteClick
          )}
          pageSize={5}
          rowsPerPageOptions={[5]}
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
  handleDeleteClick: any
) => [
  {
    field: 'documentCode',
    headerName: 'Document',
    width: 200,
    renderCell: (params: any) => {
      return <span className='text-xs'>{params.value}</span>;
    },
  },
  {
    field: 'documentDescription',
    headerName: 'Description',
    width: 200,
  },
  {
    field: 'fileType',
    headerName: 'File Type',
    width: 150,
  },

  {
    field: 'dateUploaded',
    headerName: 'Date Uploaded',
    type: 'date',
    editable: true,
    width: 200,
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
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<Save />}
            label='Save'
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<Cancel />}
            label='Cancel'
            className='textPrimary'
            onClick={handleCancelClick(id)}
            color='inherit'
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<Edit />}
          label='Edit'
          className='textPrimary'
          onClick={handleEditClick(id)}
          color='inherit'
        />,
      ];
    },
  },
];

export default ChecklistTable;
