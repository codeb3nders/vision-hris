export const GET_IP_URL = 'https://geoip-db.com/json/';

export const ROLE_ACCESS = {
    hr_admin: [
        'hr_dashboard',
        'employees_db',
        'employee_directory'
    ],
    system_admin: [
        'sysad_dashboard',
        'employee_directory'
    ],
    approver: [
        'approver_dashboard',
        'employee_directory'
    ],
    employee: [
        'employee_dashboard',
        'employee_directory'
    ]
};
