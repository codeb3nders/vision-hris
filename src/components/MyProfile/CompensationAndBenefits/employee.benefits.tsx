import { Delete, VolunteerActivismTwoTone } from '@mui/icons-material';
import { Dialog, IconButton, TextField } from '@mui/material';
import { DataGrid, GridRowModel,
  GridColumns,
  GridRowId,
  GridRowsProp, } from '@mui/x-data-grid';
import AddButton from 'CustomComponents/AddButton';
import { useEffect, useState, useCallback } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {};

const EmployeeBenefits = (props: Props) => {
  const [benefits, setBenefits] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [promiseArguments, setPromiseArguments] = useState<any>(null);

  const handleDelete = (params) => {
    setBenefits((prev: any) => {
      const filtered = prev.filter((a: any) => a.benefit !== params.value);
      return filtered;
    });
  };

  function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
  if (newRow.benefit !== oldRow.benefit) {
    return `Name from '${oldRow.benefit}' to '${newRow.benefit}'`;
  }
  return null;
}

console.log({promiseArguments})

  const processRowUpdate = useCallback (
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        console.log({mutation})
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );


  return (
    <CollapseWrapper
      panelTitle='Employee Benefits'
      icon={VolunteerActivismTwoTone}
      contentClassName='p-0'
    >
      <BenefitsDialog open={open} setOpen={setOpen} setBenefits={setBenefits} />
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(data: any) => data.id}
          autoHeight
          headerHeight={0}
          processRowUpdate={processRowUpdate}
          disableSelectionOnClick
          rows={benefits}
          localeText={{
            noRowsLabel: 'No data',
          }}
          hideFooter={true}
          columns={columns(handleDelete)}
          experimentalFeatures={{ newEditingApi: true }}
          getRowHeight={() => 'auto'}
        />
      </div>
      <AddButton text='Add Employment Benefit' setOpen={setOpen} />
    </CollapseWrapper>
  );
};

const BenefitsDialog = ({ open, setOpen, setBenefits }) => {
  const [benefit, setBenefit] = useState<string>('');

  const handleSave = () => {
    setBenefits((prev: any) => [...prev, { benefit, id: prev.length + 1 }]);
    setOpen(false);
    setBenefit('');
  };

  useEffect(() => {
    !open && setBenefit('');
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <VolunteerActivismTwoTone fontSize='small' /> New Employment Benefit
        </p>

        <TextField
          id='position-held'
          variant='standard'
          label='Employee Benefit'
          value={benefit}
          onChange={(e: any) => setBenefit(e.target.value)}
        />

        <button
          className='px-2 py-1 w-full bg-green-500 text-white'
          onClick={handleSave}
        >
          Save Benefit
        </button>
      </div>
    </Dialog>
  );
};

const columns: any = (handleDelete: any) => {
  return [
    {
      field: 'benefit',
      headerName: 'Employee Benefits',
      flex: 1, editable: true,
      renderCell: (params) => <div className='flex flex-row items-center w-full gap-1'>
            {params.value}
            </div>
    },
    {
      field: 'action',
      headerName: '',
      flex: 1,
      renderCell: (params: any) => <div className='flex-1 flex justify-end'><IconButton size='small' onClick={() => handleDelete(params)}>
                <Delete />
      </IconButton>
        </div>
    },
  ];
};

export default EmployeeBenefits;
