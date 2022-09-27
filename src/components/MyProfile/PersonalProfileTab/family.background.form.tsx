import { PersonAddTwoTone, SaveTwoTone } from '@mui/icons-material';
import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { INCOMPLETE_FORM_MESSAGE } from 'constants/errors';
import { RELATION } from 'constants/Values';
import React, { useContext, useEffect, useState } from 'react';
import { ProfileCtx } from '../profile.main';
import { FamilyI } from './family.background';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFamily: React.Dispatch<React.SetStateAction<FamilyI[]>>;
  family: FamilyI[];
  setWithUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialData:FamilyI = {
    company: '',
    name: '',
    occupation: '',
    relation: '',
    residence: '',
  }

const FamilyBackgroundForm = ({ open, setOpen, setFamily, setWithUpdate }: Props) => {
  const { resetNotif, failed } = useContext(ProfileCtx);
  const [newFamily, setNewFamily] = useState<FamilyI>(initialData);

  useEffect(() => {
    if (!open) {
      setNewFamily(initialData)
      resetNotif()
    }
  }, [open]);

  const handleAddFamily = async() => {
    const validateFields = async () => {
        const dialog: any = document.getElementById("family-dialog");
        const required = dialog.querySelectorAll("[required]");
        let invalidCtr = 0;

        invalidCtr = await Array.from(required)
          .filter((e: any) => !e.value)
          .map((e: any) => e.id).length;

        if (invalidCtr > 0) {
          return failed(INCOMPLETE_FORM_MESSAGE);
        }
        return true;
      }
      //check inputs...
    if (await validateFields()) {
      setWithUpdate(true)
      setFamily((family: FamilyI[]) => [...family, newFamily]);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="family-dialog">
      <div className='p-6 flex flex-col gap-4 w-[350px]'>
        <p className='text-md font-bold '>
          <PersonAddTwoTone fontSize='small' /> Add Family Member
        </p>
        <TextField
          id='name'
          required
          fullWidth
          variant='standard'
          size='small'
          label='Fullname'
          onChange={(e: any) =>
            setNewFamily({ ...newFamily, name: e.target.value })
          }
        />

        <FormControl variant='standard' fullWidth size='small' required>
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
          required
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
            onClick={handleAddFamily}
            className='col-span-5 px-2 py-1 text-xs bg-green-500 text-white rounded-sm w-full flex items-center justify-center hover:bg-green-400 transition duration-150 disabled:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed'
          >
            <SaveTwoTone fontSize='small' className='mr-2' />
            Save
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
