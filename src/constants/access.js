export const GET_IP_URL = 'https://geoip-db.com/json/';

export const ROLE_ACCESS = {
    hr_admin: [
        'dashboard',
        'employees_db',
        'employee_directory'
    ],
    system_admin: [
        'dashboard',
        'employee_directory'
    ],
    approver: [
        'dashboard',
        'employee_directory'
    ],
    employee: [
        'dashboard',
        'employee_directory'
    ]
};
