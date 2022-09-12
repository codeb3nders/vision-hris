import { Delete, VolunteerActivismTwoTone } from '@mui/icons-material';
import { Dialog, IconButton, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddButton from 'CustomComponents/AddButton';
import { useEffect, useState } from 'react';
import CollapseWrapper from '../PersonalProfileTab/collapse.wrapper';

type Props = {};

const EmployeeBenefits = (props: Props) => {
  const [benefits, setBenefits] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = (params) => {
    setBenefits((prev: any) => {
      const filtered = prev.filter((a: any) => a.benefit !== params.value);
      return filtered;
    });
  };

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
          disableSelectionOnClick
          rows={benefits}
          columns={columns(handleDelete)}
          pageSize={5}
          rowsPerPageOptions={[5]}
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
};

export default EmployeeBenefits;
