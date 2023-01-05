import { Close, Info, SaveTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import {
  CivilStatus,
  Departments,
  DigitalBulletin,
  EmploymentStatus,
  NewEmployeeDetails,
  VaccineStatus,
} from './EmployeeData';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DatePicker from '@mui/lab/DatePicker';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DialogModal from 'CustomComponents/DialogModal';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: any;
};

const NewEmployee: React.FC<Props> = ({ open, setOpen, id }) => {
  const [user, setUser] = useState();

  // console.log({ open });

  const handleDateChange = () => { };

  const handleList = () => {
    const DateInput = (title) => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {title.key === 'date_of_school_attended' ? (
          <Grid container spacing={1}>
            <Grid item md={7}>
              <DatePicker
                value={new Date()}
                label={
                  <span style={{ textTransform: 'uppercase' }}>
                    School Attended From:
                  </span>
                }
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    variant='standard'
                  />
                )}
              />
            </Grid>
            <Grid item md={5}>
              <DatePicker
                value={new Date()}
                label={<span style={{ textTransform: 'uppercase' }}>To:</span>}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    variant='standard'
                  />
                )}
              />
            </Grid>
          </Grid>
        ) : (
          <DatePicker
            value={new Date()}
            label={
              <span style={{ textTransform: 'uppercase' }}>{title.label}</span>
            }
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} fullWidth required variant='standard' />
            )}
          />
        )}
      </LocalizationProvider>
    );

    const TimeInput = (title) => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          value={new Date()}
          label={
            <span style={{ textTransform: 'uppercase' }}>{title.label}</span>
          }
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField {...params} fullWidth required variant='standard' />
          )}
        />
      </LocalizationProvider>
    );

    const SelectInput = (title) => {
      const menu = (): any[] => {
        switch (title.key) {
          case 'employment_status':
            return EmploymentStatus;
          case 'civil_status':
            return CivilStatus;
          case 'vaccine_status':
            return VaccineStatus;
          case 'digital_bulletin':
            return DigitalBulletin;
          case 'department':
            return Departments;

          default:
            return EmploymentStatus;
        }
      };

      return (
        <FormControl fullWidth variant='standard'>
          <InputLabel id={title.key}>
            <span style={{ textTransform: 'uppercase' }}>{title.label}</span>
          </InputLabel>
          <Select fullWidth>
            {menu().map((m: any, i: number) => {
              return <MenuItem key={i} value={m}>{m}</MenuItem>;
            })}
          </Select>
        </FormControl>
      );
    };

    const FieldInput = (title) => {
      switch (title.key) {
        case 'date_requested':
          return DateInput(title);
        case 'date_from':
          return DateInput(title);
        case 'date_to':
          return DateInput(title);
        case 'date':
          return DateInput(title);
        case 'end_of_prob':
          return DateInput(title);
        case 'contract_end_date':
          return DateInput(title);
        case 'birthdate':
          return DateInput(title);
        case 'date_hired':
          return DateInput(title);
        case 'date_of_school_attended':
          return DateInput(title);
        case 'employment_status':
          return SelectInput(title);
        case 'tax_exemption':
          return SelectInput(title);
        case 'civil_status':
          return SelectInput(title);
        case 'vaccine_status':
          return SelectInput(title);
        case 'digital_bulletin':
          return SelectInput(title);
        case 'department':
          return SelectInput(title);

        default:
          return (
            <TextField
              fullWidth
              variant='standard'
              label={
                <span style={{ textTransform: 'uppercase' }}>
                  {title.label}
                </span>
              }
            />
          );
      }
    };

    const fields = NewEmployeeDetails.map((title) => {
      return (
        <Grid
          item
          md={6}
          sx={{
            alignSelf: 'stretch',
            '& .MuiDivider-root.MuiDivider-inset': {
              border: 'none',
            },
            color: 'red',
          }}
        >
          <ListItem>
            <ListItemIcon>{title.icon}</ListItemIcon>
            <ListItemText
              primary={FieldInput(title)}
              // secondary={<span >{title.label}</span>}
              primaryTypographyProps={{}}
              secondaryTypographyProps={{
                fontSize: 11,
                color: 'primary',
              }}
            />
          </ListItem>
          <Divider variant='inset' component='li' />
        </Grid>
      );
    });

    return fields;
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogModal
      className='max-w-[850px]'
      open={open}
      title='New Employee'
      titleIcon={<Info className='mr-2 text-sky-500' />}
      onClose={handleClose}
      // title={
      //   <Typography variant='h6' className='text-sky-500 flex items-center'>
      //     <Info className='mr-2 text-sky-500' /> New Employee
      //     <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
      //       <Close />
      //     </IconButton>
      //   </Typography>
      // }
      actions={
        <Button startIcon={<SaveTwoTone />} onClick={handleClose}>
          Save Employee
        </Button>
      }
    >
      <List className='grid grid-cols-2'>{handleList()}</List>
    </DialogModal>
  );
};

export default NewEmployee;
