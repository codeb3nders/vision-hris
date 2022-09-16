import {
  Add,
  Cancel,
  Delete,
  Edit,
  Save,
  VolunteerActivismTwoTone,
} from '@mui/icons-material';
import { Dialog, IconButton, TextField } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  MuiEvent,
} from '@mui/x-data-grid';
import AddButton from 'CustomComponents/AddButton';
import { useEffect, useState, useCallback } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {};

const EmployeeBenefits = (props: Props) => {
  const [benefits, setBenefits] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [promiseArguments, setPromiseArguments] = useState<any>(null);

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

    const editedRow = benefits.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setBenefits(benefits.filter((row) => row.id !== id));
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setBenefits(benefits.filter((row) => row.id !== id));
  };

  const handleAddBenefit = () => {
    const id = benefits.length + 1;
    setBenefits((prev: any) => [
      ...prev,
      {
        id,
        benefit: '',
        isNew: true,
      },
    ]);

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'benefit' },
    }));
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log({ newRow, updatedRow });

    setBenefits(
      benefits.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const columns: GridColumns = [
    {
      field: 'benefit',
      headerName: '',
      flex: 1,
      editable: true,
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
          <GridActionsCellItem
            icon={<Delete />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  return (
    <CollapseWrapper
      panelTitle='Employee Benefits'
      icon={VolunteerActivismTwoTone}
      contentClassName='p-0'
    >
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) => data.id}
          autoHeight
          headerHeight={0}
          disableSelectionOnClick
          rows={benefits}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowHeight={() => 'auto'}
          processRowUpdate={processRowUpdate}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>

      <div className='flex justify-end'>
        <button
          className='px-2 py-1 border border-sky-500 text-sky-500 rounded-md hover:bg-sky-200 transition ease-in-out mt-2'
          onClick={handleAddBenefit}
        >
          <Add fontSize='small' /> Add Employee Benefit
        </button>
      </div>
    </CollapseWrapper>
  );
};

export default EmployeeBenefits;
