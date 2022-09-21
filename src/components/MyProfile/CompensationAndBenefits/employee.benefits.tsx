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
import { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';
import { ProfileCtx } from '../profile.main';

type Props = {};

const EmployeeBenefits = (props: Props) => {
  const {setEmployeeDetails, employeeDetails, setUpdatedDetails, updatedDetails, getIcon, isNew} = useContext(ProfileCtx)
  const [benefits, setBenefits] = useState<any[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [withUpdate, setWithUpdate] = useState<boolean>(false);

console.log( {withUpdate}, {benefits})
  useEffect(() => {
    if (isNew) {
      setEmployeeDetails((prev:any) => {
        return {
          ...prev,
          employeeBenefits: benefits.map((o:any) => o.benefit)
        }
      })
    }
  }, [benefits]);

  useEffect(() => {
    if (!isNew && withUpdate) {
      const withData = benefits.some((x:any) => x.benefit)
      if (withData) {
        setUpdatedDetails((prev: any) => {
          return {
            ...prev,
            employeeBenefits: benefits
          }
        })
      } else {
        if (updatedDetails) {
          setUpdatedDetails((prev: any) => {
            const { employeeBenefits, ...rest } = prev;
            return {
              ...rest
            }
          })
        } else {
          setUpdatedDetails((prev: any) => {
            return {
              ...prev,
              employeeBenefits: []
            }
          })
        }
      }
      setWithUpdate(false);
    }
  }, [benefits])

  useEffect(() => {
    if (!isNew) {
      const dbData:any[] = employeeDetails?.employeeBenefits || [];
      setBenefits(dbData);
    }
  }, [employeeDetails.employeeBenefits]);

  const handleDelete = (id:any) => {
    setBenefits((prev: any) => {
      const filtered = prev.filter((a: any) => {
        const paramsKey = id;
        const aKey = a?.id;
        return paramsKey !== aKey;
      });
      return filtered;
    });
    setWithUpdate(true);
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
      setWithUpdate(true);
    }
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
    setWithUpdate(true);
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
    setWithUpdate(true);
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
              icon={<Save color='success' />}
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
            onClick={() => handleDelete(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  return (
    <CollapseWrapper
      panelTitle='Employee Benefits'
      icon={() => getIcon(<VolunteerActivismTwoTone />, "employeeBenefits")}
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
