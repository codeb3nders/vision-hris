export const EmployeeNavigation = [
  { name: 'Dashboard', href: '/', current: false },
  {
    name: 'Employee Self Service',
    href: '/ess',
    current: false,
    menus: [
      {
        label: 'Leave Applications',
        href: '/ess/leave-applications',
      },
      {
        label: 'OT Applications',
        href: '/ess/ot-applications',
      },
      {
        label: 'Workers OT Applications',
        href: '/ess/workers-ot-applications',
      },
    ],
  },
  { name: 'Timesheets', href: '/timesheets', current: false },
  { name: 'Announcements', href: '/announcements', current: false },
];

export const ApproverNavigation = [
  { name: 'Dashboard', href: '/', current: false },
  {
    name: 'Employee Requests',
    href: '/manage',
    current: false,
    menus: [
      {
        label: 'OT Applications',
        href: '/manage/ot-applications',
      },
      {
        label: 'Leave Applications',
        href: '/manage/leave-applications',
      },
      {
        label: `Worker' OT Applications`,
        href: '/manage/worker-ot-applications',
      },
    ],
  },
  {
    name: 'People',
    href: '/people',
    current: false,
    menus: [
      { label: 'Employees', href: '/employees' },
      { label: 'Project Workers', href: '/workers' },
      { label: 'Approvers', href: '/approvers' },
      { label: 'Org. Chart', href: '/org' },
    ],
  },

  { name: 'My Team', href: '/my-team', current: false },
  { name: 'Reports', href: '/reports', current: false },
  { name: 'Announcements', href: '/announcements', current: false },
];

export const HRNavigation = [
  { name: 'Dashboard', href: '/', current: false },
  {
    name: 'Employee Requests',
    href: '/requests',
    current: false,
    menus: [
      {
        label: 'Employee Leave Applications',
        href: '/requests/leave-applications',
      },
      {
        label: 'Employee OT Applications',
        href: '/requests/ot-applications',
      },
      {
        label: 'Workers OT Applications',
        href: '/requests/workers-ot-applications',
      },
    ],
  },
  {
    name: 'People',
    href: '/people',
    current: false,
    menus: [
      { label: 'Employees', href: '/employees' },
      { label: 'Project Workers', href: '/workers' },
      { label: 'Approvers', href: '/approvers' },
      { label: 'Org. Chart', href: '/org' },
    ],
  },
  { name: 'Timesheets', href: '/timesheets', current: false },
  { name: 'Reports', href: '/reports', current: false },
  { name: 'Announcements', href: '/announcements', current: false },
];

export const AdminNavigation = [
  { name: 'Dashboard', href: '/', current: false },
  {
    name: 'Employee Requests',
    href: '/requests',
    current: false,
    menus: [
      {
        label: 'Employee Leave Applications',
        href: '/requests/leave-applications',
      },
      {
        label: 'Employee OT Applications',
        href: '/requests/ot-applications',
      },
      {
        label: 'Workers OT Applications',
        href: '/requests/workers-ot-applications',
      },
    ],
  },
  {
    name: 'People',
    href: '/people',
    current: false,
    menus: [
      { label: 'Employees', href: '/employees' },
      { label: 'Project Workers', href: '/workers' },
      { label: 'Approvers', href: '/approvers' },
      { label: 'Admin User Accounts', href: '/admin-accounts' },
      { label: 'Org. Chart', href: '/org' },
    ],
  },
  { name: 'Timesheets', href: '/timesheets', current: false },
  { name: 'Reports', href: '/reports', current: false },
  { name: 'Automations', href: '/automations', current: false },
  { name: 'Announcements', href: '/announcements', current: false },
  { name: 'Audit Logs', href: '/audit-logs', current: false },
];

export const USERS = [
  {
    username: 'employee@hris',
    password: 'pass123',
  },
  {
    username: 'approver@hris',
    password: 'pass123',
  },
  {
    username: 'hr@hris',
    password: 'pass123',
  },
  {
    username: 'admin@hris',
    password: 'pass123',
  },
];
