export const GET_IP_URL = 'https://geoip-db.com/json/';

export const ROLE_ACCESS = {
    hr_admin: [
        'hr_dashboard',
        'employees_db'
    ],
    system_admin: [
        'sysad_dashboard'
    ],
    approver: [
        'approver_dashboard'
    ],
    employee: [
        'employee_dashboard']
};
