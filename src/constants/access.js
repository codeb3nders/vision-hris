export const GET_IP_URL = 'https://geoip-db.com/json/';

export const ROLE_ACCESS = {
    hr_admin: [
        'dashboard',
        'employees_db',
        'employee_directory',
        'asset_management',
        'timekeeping',
        'team-leaders',
        'leave-requests',
        'ot-requests',
        'employees-profile'
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
        'employee_directory',
        'ess-leave-requests',
        'ess-new-leave-request',
        'ess-ot-requests',
        'ess-new-ot-request'
    ]
};
