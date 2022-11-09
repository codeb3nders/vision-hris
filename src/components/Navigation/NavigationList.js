import { Path } from 'constants/Path';

const { Employee, Admin, HR, Manager } = Path;

export const EmployeeNavigation = [
  { name: 'Dashboard', href: Employee.Dashboard },
  {
    name: 'Employee Self Service',
    menus: [
      {
        label: 'Leave Applications',
        href: Employee.ESS.Leave,
      },
      {
        label: 'OT Applications',
        href: Employee.ESS.OT,
      },
      {
        label: 'Workers OT Applications',
        href: Employee.ESS.WorkersOT,
      },
    ],
  },
  { name: 'Timekeeping', href: Employee.Attendance },
  { name: 'Announcements', href: Employee.Announcements },
];

export const ManagerNavigation = [
  { name: 'Dashboard', href: '/' },
  {
    name: 'Employee Requests',
    menus: [
      {
        label: 'OT Applications',
        href: Manager.Requests.OT,
      },
      {
        label: 'Leave Applications',
        href: Manager.Requests.Leave,
      },
      {
        label: `Workers' OT Applications`,
        href: Manager.Requests.WorkersOT,
      },
    ],
  },
  {
    name: 'People',
    menus: [
      { label: 'Directory', href: Manager.People.Directory },
      { label: 'My Team', href: Manager.People.Team },
    ],
  },
  { name: 'Reports', href: Manager.Reports },
  { name: 'Announcements', href: Manager.Announcements },
];

export const HRNavigation = [
  { name: 'Dashboard', href: '/' },
  {
    name: 'Employee Requests',
    menus: [
      {
        label: 'Leave Applications',
        href: HR.Requests.Leave,
      },
      {
        label: 'OT Applications',
        href: HR.Requests.OT,
      },
      {
        label: `Workers' OT Applications`,
        href: HR.Requests.WorkersOT,
      },
    ],
  },
  {
    name: 'People',
    menus: [
      { label: 'Directory', href: HR.People.Directory },
      { label: 'Employees', href: HR.People.Employees },
      { label: 'Project Workers', href: HR.People.Workers },
      { label: 'Departments', href: HR.People.Departments },
      { label: 'Approvers', href: HR.People.Approvers },
      { label: 'Org. Chart', href: HR.People.Org },
    ],
  },
  { name: 'Timekeeping', href: HR.Attendance },
  { name: 'Reports', href: HR.Reports },
  { name: 'Announcements', href: HR.Announcements },
  { name: 'Company Assets', href: Path.CompanyAssets },
];

export const AdminNavigation = [
  { name: 'Dashboard', href: '/' },
  {
    name: 'Employee Requests',
    menus: [
      {
        label: 'Leave Applications',
        href: Admin.Requests.Leave,
      },
      {
        label: 'OT Applications',
        href: Admin.Requests.OT,
      },
      {
        label: `Workers' OT Applications`,
        href: Admin.Requests.WorkersOT,
      },
    ],
  },
  {
    name: 'People',
    href: '/people',
    menus: [
      { label: 'Directory', href: Admin.People.Directory },
      { label: 'Employees', href: Admin.People.Employees },
      { label: 'Project Workers', href: Admin.People.Workers },
      { label: 'Departments', href: Admin.People.Departments },
      { label: 'User Accounts', href: Admin.People.UserAccounts },
      { label: 'Org. Chart', href: Admin.People.Org },
    ],
  },
  { name: 'Timekeeping', href: Admin.Attendance },
  {
    name: 'Reports',
    menus: [
      {
        label: 'Audit Logs',
        href: Admin.Reports.Audit,
      },
      {
        label: 'Assets Tracker',
        href: Admin.Reports.Tracker,
      },
    ],
  },
  { name: 'Automations', href: Admin.Automations },
  { name: 'Announcements', href: Admin.Announcements },
  {
    name: 'Company',
    menus: [
      {
        label: 'General',
        href: Admin.Company.General,
      },
      {
        label: 'Positions',
        href: Admin.Company.Positions,
      },
      {
        label: 'Assets',
        href: Admin.Company.Assets,
      },
    ],
  },
];

export const USERS = [
  {
    username: 'employee@hris',
    password: 'pass123',
  },
  {
    username: 'manager@hris',
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
