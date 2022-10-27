export const Path = {
  Dashboard: '/',
  AssetManagement: '/asset-management',
  Employee: {
    Dashboard: '/',
    ESS: {
      Leave: '/ess/leave-applications',
      LeaveNew: '/ess/leave-applications/new',
      LeaveType: '/ess/leave-applications/new?type=:type',
      OT: '/ess/ot-applications',
      OTNew: '/ess/ot-applications/new',
      WorkersOT: '/ess/workers-ot-applications',
    },
    Attendance: '/timekeeping',
    People: {
      Directory: '/people/directory',
      Team: '/people/my-team',
    },
    Announcements: '/announcements',
    Profile: '/profile',
  },
  Manager: {
    Dashboard: '/',
    Requests: {
      OT: '/manage/ot-applications',
      Leave: '/manage/leave-applications',
      WorkersOT: '/manage/workers-ot-applications',
    },
    People: {
      Directory: '/people/directory',
      Team: '/people/my-team',
    },
    Reports: '/reports',
    Announcements: '/announcements',
  },
  HR: {
    Dashboard: '/',
    Requests: {
      OT: '/requests/ot-applications',
      Leave: '/requests/leave-applications',
      WorkersOT: '/requests/workers-ot-applications',
    },
    People: {
      Directory: '/people/directory',
      Employees: '/people/employees',
      Workers: '/people/workers',
      Departments: '/people/departments',
      Approvers: '/people/approvers',
      Org: '/people/org-chart',
    },
    Attendance: '/timekeeping',
    Reports: '/reports',
    Announcements: '/announcements',
  },
  Admin: {
    Dashboard: '/',
    Requests: {
      OT: '/requests/ot-applications',
      Leave: '/requests/leave-applications',
      WorkersOT: '/requests/workers-ot-applications',
    },
    People: {
      Directory: '/people/directory',
      Employees: '/people/employees',
      Workers: '/people/workers',
      Departments: '/people/departments',
      UserAccounts: '/people/user-accounts',
      Org: '/people/org-chart',
    },
    Attendance: '/timekeeping',
    Reports: {
      Audit: '/reports/audit',
      Tracker: '/reports/assets-tracker',
    },
    Automations: '/automations',
    Announcements: '/announcements',
    Company: {
      General: '/company/general',
      Positions: '/company/positions',
      Assets: '/company/assets',
    },
  },
};
