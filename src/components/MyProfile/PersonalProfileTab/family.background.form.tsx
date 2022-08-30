import { PersonAddTwoTone, SaveTwoTone } from '@mui/icons-material';
import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { RELATION } from 'constants/Values';
import React, { useState } from 'react';
import { FamilyI } from './family.background';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFamily: React.Dispatch<React.SetStateAction<FamilyI[]>>;
  family: FamilyI[];
};

const FamilyBackgroundForm = ({ open, setOpen, setFamily, family }: Props) => {
  const [newFamily, setNewFamily] = useState<FamilyI>({
    // id: family?.length + 1,
    company: '',
    fullname: '',
    occupation: '',
    relation: '',
    residence: '',
  });

  const handleAddFamily = () => {
    setFamily((family: FamilyI[]) => [
      ...family,
      { ...newFamily, id: `${newFamily.fullname}~${newFamily.relation}` },
    ]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <PersonAddTwoTone fontSize='small' /> Add Family Member
        </p>
        <TextField
          id='fullname'
          fullWidth
          variant='standard'
          size='small'
          label='Fullname'
          onChange={(e: any) =>
            setNewFamily({ ...newFamily, fullname: e.target.value })
          }
        />

        <FormControl variant='standard' fullWidth size='small'>
          <InputLabel id='relation'>Relation</InputLabel>
          <Select
            id='relation'
            labelId='relation'
            onChange={(e: any) =>
              setNewFamily({ ...newFamily, relation: e.target.value })
            }
          >
            {RELATION.map((relation) => {
              return <MenuItem value={relation}>{relation}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <TextField
          id='occupation'
          fullWidth
          variant='standard'
          size='small'
          label='Occupation'
          onChange={(e: any) =>
            setNewFamily({ ...newFamily, occupation: e.target.value })
          }
        />

        <TextField
          id='company'
          fullWidth
          variant='standard'
          size='small'
          label='Company'
          onChange={(e: any) =>
            setNewFamily({ ...newFamily, company: e.target.value })
          }
        />

        <TextField
          id='residence'
          fullWidth
          variant='standard'
          size='small'
          label='Residence'
          multiline
          onChange={(e: any) =>
            setNewFamily({ ...newFamily, residence: e.target.value })
          }
        />

        <div className='grid grid-cols-7'>
          <button
            disabled={
              !newFamily.relation || !newFamily.fullname || !newFamily.residence
            }
            onClick={handleAddFamily}
            className='col-span-5 px-2 py-1 text-xs bg-green-500 text-white rounded-sm w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
          >
            <SaveTwoTone fontSize='small' className='mr-2' />
            Save Family Member Details
          </button>
          <button
            className='col-span-2 px-2 py-1 text-slate-400 hover:text-slate-800'
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default React.memo(FamilyBackgroundForm);
