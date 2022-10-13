import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem, List, ListItemText
} from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';
import { EmployeeI } from 'slices/interfaces/employeeI';

type Props = {
  setLoading: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      action: string;
    }>
  >;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setEmployeeDetails: React.Dispatch<React.SetStateAction<EmployeeI>>;
  setViewDetails?: React.Dispatch<
    React.SetStateAction<{
      employeeNo: string;
      status: boolean;
    }>
  >;
  duplicates: {
    data: any[];
    status: boolean;
  };
  setDuplicates: React.Dispatch<
    React.SetStateAction<{
      data: any[];
      status: boolean;
    }>
  >;
};

const EmployeeExists = ({setLoading, duplicates, setDuplicates, setOpen, setEmployeeDetails, setViewDetails }: Props) => {
  const { data, status } = duplicates;
  return (
    <Dialog
      open={status}
      fullWidth
      maxWidth={'sm'}
      onClose={() => setDuplicates({ data: [], status: false })}
      id='confirm-delete-dialog'
    >
      <DialogTitle id='alert-dialog-title' className='text-[1rem]'>
        Duplicates
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Employee records with the same name and birth date:
        </DialogContentText>
        <List>
          {data.map((o: EmployeeI) => {
            return <ListItem
              secondaryAction={
                !o.isActive ? <Button size="small" onClick={() => {
                  setEmployeeDetails((prev: EmployeeI) => {
                    return {
                      ...prev,
                      lastName: o.lastName,
                      middleName: o.middleName,
                      suffix: o.suffix,
                      citizenship: o.citizenship,
                      gender: o.gender,
                      personalContactNumber: o.personalContactNumber,
                      personalEmail: o.personalEmail,
                      civilStatus: o.civilStatus,
                      religion: o.religion,
                      numberOfDependents: o.numberOfDependents,
                      sss: o.sss,
                      philHealth: o.philHealth,
                      pagIbig: o.pagIbig,
                      tin: o.tin,
                      emergencyContact: o.emergencyContact,
                      govtProfExamsPassed: o.govtProfExamsPassed,
                      familyBackground: o.familyBackground,
                      presentAddress: o.presentAddress,
                      permanentAddress: o.permanentAddress,
                      educationalBackground: o.educationalBackground,
                      employmentRecords: o.employmentRecords,
                      licensesCertifications: o.licensesCertifications,
                      isRehire: true
                    }
                  })
                  setDuplicates({ data: [], status: false });
                  setLoading({ status: true, action: 'Retrieving Data' });
                }}> Select for REHIRE</Button> : <Button size="small" onClick={() => {
                  setViewDetails &&
                    setViewDetails({
                      employeeNo: o.employeeNo,
                      status: true
                    });
                    setDuplicates({ data: [], status: false })
                    setLoading({ status: true, action: 'Retrieving Data' });
                }}>Go to Employee Profile</Button>
              }
            >
              <ListItemText
                primary={`${o.lastName}, ${o.firstName} ${o.middleName || ""} (${o.employmentStatus.name})`}
                secondary={`Last update: ${moment(o.employmentLastUpdate).format("ll")}`}
              />
            </ListItem>
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDuplicates({ data: [], status: false })}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeExists;
