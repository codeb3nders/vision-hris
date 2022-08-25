/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Button, Link } from '@mui/material';
import { AddCircleOutlineTwoTone, UploadTwoTone } from '@mui/icons-material';
import {
    getAllEmployeesAction as _getEmployeesAction,
    getEmployeeStatus as _getEmployeeStatus,
    getEmployeeItems as _getEmployeeItems,
    getEmployeeError as _getEmployeeError
} from "slices"
import { EmployeeI } from 'slices/interfaces/employeeI';
import { MainCtx } from 'components/Main';
import { AppCtx } from 'App';

type Props = {};

const EmployeeDirectory: React.FC<Props> = () => {
    const dispatch = useDispatch();

    const { access_token } = useContext(AppCtx);

    // Employees
    const getEmployeeStatus = useSelector(_getEmployeeStatus);
    const getEmployeeItems = useSelector(_getEmployeeItems);
    const getEmployeeError = useSelector(_getEmployeeError)

    const [employees, setEmployees] = useState<EmployeeI[]>([]);

    useEffect(() => {
        if (access_token && getEmployeeStatus === "idle") {
            dispatch(_getEmployeesAction(access_token))
        }
    }, [access_token]);

    useEffect(() => {
        setEmployees(
            getEmployeeItems.map((r: any) => {
                const mi = r.middleName ? r.middleName.charAt(0) : "";
                const full_name = `${r.lastName}, ${r.firstName} ${mi}`
                return { ...r, id: r.employeeNo, full_name };
            })
        );
    }, [getEmployeeItems])

    return <>
        <Card sx={{ mt: 5, p: 2 }}>
            <DataGrid
                autoHeight
                density="compact"
                disableSelectionOnClick
                rows={employees || []}
                columns={columns()}
                pageSize={30}
                rowsPerPageOptions={[30]}
                checkboxSelection={false}
                loading={employees?.length <= 0}
                getRowId={(row) => row.employeeNo}
            />
        </Card>
    </>
};

const columns = () => [
    {
        field: 'full_name',
        headerName: 'Employee name', flex: 1, sortable: false,
        renderCell: (cell) => {
            return cell.value;
        },
    },
    { field: 'position', headerName: 'Position', flex: 1, sortable: false },
    {
        field: 'department',
        headerName: 'Department', flex: 1, sortable: false
    },
    {
        field: 'location',
        headerName: 'Location', flex: 1, sortable: false
    },
    {
        field: 'companyEmail',
        headerName: 'Email', flex: 1, sortable: false
    },
    {
        field: 'companyContactNumber',
        headerName: 'Mobile', flex: 1, sortable: false
    },
];

export default EmployeeDirectory;
