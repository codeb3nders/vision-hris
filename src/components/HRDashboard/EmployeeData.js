import {
  AccessTimeTwoTone,
  AccountBalanceTwoTone,
  AlternateEmailTwoTone,
  AssignmentTwoTone,
  AssuredWorkloadTwoTone,
  BadgeTwoTone,
  CakeTwoTone,
  CommentTwoTone,
  ContactMailTwoTone,
  CreditCardTwoTone,
  DateRangeTwoTone,
  EventTwoTone,
  GavelTwoTone,
  GroupAddTwoTone,
  HomeTwoTone,
  LabelImportantTwoTone,
  LabelTwoTone,
  MedicalInformationTwoTone,
  MilitaryTechTwoTone,
  NumbersTwoTone,
  PendingActionsTwoTone,
  PersonTwoTone,
  PhoneTwoTone,
  SchoolTwoTone,
  SpeakerNotesTwoTone,
  StarTwoTone,
  SupervisedUserCircleTwoTone,
  TagTwoTone,
  VerifiedUserTwoTone,
  WcTwoTone,
} from '@mui/icons-material';

export const DigitalBulletin = ['Invited', 'Member', 'Rendering', 'Removed'];
export const VaccineStatus = ['Vaccinated', 'LGU Registered'];
export const Departments = [
  'Business Development & Marketing',
  'Commercial and Contracts',
  'Corporate & General Accounting',
  'ESH',
  'Estimating and Tender Planning',
  'HRMD',
  'Information and Technology',
  'Internal Audit',
  'Office of the President',
  'Operations -  Logistics & Transport',
  'Operations - Heavy Equipment',
  'Operations - Project Management',
  'Operations - Tools',
  'Operations Center - Materials Control',
  'Operations Center - Planning & Scheduling',
  'Procurement and Material Management',
  'QA/QC',
  'Quality Management',
  'Treasury, Billing & Collection, Insurances & Bonds',
];

export const EmploymentStatus = ['REGULAR', 'PROJECT EMPLOYEE'];

export const TaxExemption = [
  'SINGLE',
  'SINGLE-1',
  'SINGLE-2',
  'MARRIED',
  'MARRIED-1',
  'MARRIED-2',
  'MARRIED-3',
  'MARRIED-4',
  'MARRIED-5',
];
export const CivilStatus = ['SINGLE', 'MARRIED'];

export const Groups = [
  {
    label: 'Job Description',
    key: 'job',
  },
  {
    label: 'Personal Information',
    key: 'personal',
  },
  {
    label: 'Emergency Information',
    key: 'emergency',
  },
  {
    label: 'Other Information',
    key: 'other',
  },
  {
    label: 'Audit Information',
    key: 'audit',
  },
  {
    label: 'Remarks',
    key: 'remarks',
  },
];

const groups = {
  job: 'job',
  personal: 'personal',
  emergency: 'emergency',
  other: 'other',
  audit: 'audit',
  remarks: 'remarks',
};

export const TITLES = [
  {
    // 0
    key: 'leave_type',
    label: 'Leave Type',
    icon: <AssignmentTwoTone />,
    group: null,
  },
  {
    // 1
    key: 'date_requested',
    label: 'Date Requested',
    icon: <EventTwoTone />,
    group: null,
  },
  {
    // 2
    key: 'employee_no',
    label: 'Employee No.',
    icon: <BadgeTwoTone />,
    group: groups.job,
  },
  {
    // 3
    key: 'employee_name',
    label: 'Employee Name',
    icon: <BadgeTwoTone />,
    group: groups.personal,
  },
  {
    // 4
    key: 'date_from',
    label: 'Date/Time From',
    icon: <DateRangeTwoTone />,
    group: null,
  },
  {
    // 5
    key: 'date_to',
    label: 'Date/Time To',
    icon: <DateRangeTwoTone />,
    group: null,
  },
  {
    // 6
    key: 'reason',
    label: 'Reason',
    icon: <SpeakerNotesTwoTone />,
    group: null,
  },
  {
    // 7
    key: 'status',
    label: 'Status',
    icon: <PendingActionsTwoTone />,
    group: null,
  },
  {
    // 8
    key: 'supervisor',
    label: 'Supervisor',
    icon: <SupervisedUserCircleTwoTone />,
    group: null,
  },
  {
    // 9
    key: 'date',
    label: 'Date',
    icon: <EventTwoTone />,
    group: null,
  },
  {
    // 10
    key: 'time_from',
    label: 'Time From',
    icon: <AccessTimeTwoTone />,
    group: null,
  },
  {
    // 11
    key: 'time_to',
    label: 'Time To',
    icon: <AccessTimeTwoTone />,
    group: null,
  },
  {
    // 12
    key: 'position',
    label: 'Position',
    icon: <MilitaryTechTwoTone />,
    group: groups.job,
  },
  {
    key: 'rank',
    label: 'Rank',
    icon: <StarTwoTone />,
    group: groups.job,
  },
  {
    key: 'division',
    label: 'Division',
    icon: <LabelTwoTone />,
    group: groups.job,
  },
  {
    key: 'department',
    label: 'Department',
    icon: <LabelTwoTone />,
    group: groups.job,
  },
  {
    key: 'designation',
    label: 'Designation',
    icon: <LabelImportantTwoTone />,
    group: groups.job,
  },

  {
    key: 'date_hired',
    label: 'Date Hired',
    icon: <EventTwoTone />,
    group: groups.job,
  },
  {
    key: 'yrs_in_service',
    label: 'YEAR/S IN SERVICE',
    icon: <EventTwoTone />,
    group: groups.job,
  },
  {
    key: 'employment_status',
    label: 'EMPLOYMENT STATUS',
    icon: <PendingActionsTwoTone />,
    group: groups.job,
  },
  {
    key: 'end_of_prob',
    label: 'END OF PROBATIONARY',
    icon: <EventTwoTone />,
    group: groups.job,
  },
  {
    key: 'contract_end_date',
    label: 'Updated Contract End Date',
    icon: <EventTwoTone />,
    group: groups.job,
  },
  {
    key: 'gender',
    label: 'Gender',
    icon: <WcTwoTone />,
    group: groups.personal,
  },
  {
    key: 'birthdate',
    label: 'BIRTHDATE',
    icon: <CakeTwoTone />,
    group: groups.personal,
  },
  {
    key: 'age',
    label: 'Age',
    icon: <NumbersTwoTone />,
    group: groups.personal,
  },
  {
    key: 'tax_exemption',
    label: 'Tax Exemption',
    icon: <AssuredWorkloadTwoTone />,
    group: null,
  },
  {
    key: 'contact_number',
    label: 'Contact Number',
    icon: <PhoneTwoTone />,
    group: groups.personal,
  },
  {
    key: 'email',
    label: 'Email Address',
    icon: <AlternateEmailTwoTone />,
    group: groups.personal,
  },
  {
    key: 'bdo_acc',
    label: 'BDO ACCOUNT NO.',
    icon: <AccountBalanceTwoTone />,
    group: null,
  },
  {
    key: 'civil_status',
    label: 'Civil Status',
    icon: <PersonTwoTone />,
    group: groups.personal,
  },
  {
    key: 'no_of_dependents',
    label: 'NO. OF DEPENDENTS',
    icon: <GroupAddTwoTone />,
    group: groups.other,
  },
  {
    key: 'sss',
    label: 'SSS',
    icon: <AssuredWorkloadTwoTone />,
    group: groups.other,
  },
  {
    key: 'philhealth',
    label: 'PhilHealth',
    icon: <AssuredWorkloadTwoTone />,
    group: groups.other,
  },
  {
    key: 'pagibig',
    label: 'Pag-Ibig',
    icon: <AssuredWorkloadTwoTone />,
    group: groups.other,
  },
  {
    key: 'tin',
    label: 'TIN',
    icon: <AssuredWorkloadTwoTone />,
    group: groups.other,
  },
  {
    key: 'address',
    label: 'Address',
    icon: <HomeTwoTone />,
    group: groups.personal,
  },
  {
    key: 'course',
    label: 'Course',
    icon: <SchoolTwoTone />,
    group: groups.other,
  },
  {
    key: 'educational_attainment',
    label: 'Educational Attainment',
    icon: <SchoolTwoTone />,
    group: groups.other,
  },
  {
    key: 'date_of_school_attended',
    label: 'SCHOOL ATTENDED',
    icon: <EventTwoTone />,
    group: groups.other,
  },
  {
    key: 'licensure',
    label: 'Licensure',
    icon: <CreditCardTwoTone />,
    group: groups.other,
  },
  {
    key: 'prc_no',
    label: 'PRC ID NO.',
    icon: <CreditCardTwoTone />,
    group: groups.other,
  },
  {
    key: 'offense',
    label: 'NOTICE/OFFENSE',
    icon: <GavelTwoTone />,
    group: groups.audit,
  },
  {
    key: 'audit',
    label: '201 Audit',
    icon: <VerifiedUserTwoTone />,
    group: groups.audit,
  },
  {
    key: 'remarks',
    label: 'Remarks',
    icon: <CommentTwoTone />,
    group: groups.remarks,
  },
  {
    key: 'coc_no',
    label: 'COC NO.',
    icon: <NumbersTwoTone />,
    group: groups.other,
  },
  {
    key: 'vacccine_status',
    label: 'Vacccine Status',
    icon: <MedicalInformationTwoTone />,
    group: groups.other,
  },
  {
    key: 'digital_bulletin',
    label: 'Digital Bulletin',
    icon: <TagTwoTone />,
    group: groups.other,
  },
  {
    key: 'viber_no',
    label: 'Viber Number',
    icon: <PhoneTwoTone />,
    group: groups.personal,
  },
  {
    key: 'vpdc_email',
    label: 'VPDC Email',
    icon: <AlternateEmailTwoTone />,
    group: groups.job,
  },
  {
    key: 'emergency_contact',
    label: 'Emergency Contact',
    icon: <ContactMailTwoTone />,
    group: groups.emergency,
  },
  {
    key: 'emergency_no',
    label: 'Emergency No.',
    icon: <PhoneTwoTone />,
    group: groups.emergency,
  },
  {
    key: 'emergency_address',
    label: 'Emergency Address',
    icon: <HomeTwoTone />,
    group: groups.emergency,
  },
];

export const NewEmployeeDetails = [
  ...TITLES.filter((t, i) => {
    if (
      i !== 0 &&
      i !== 1 &&
      i !== 4 &&
      i !== 5 &&
      i !== 6 &&
      i !== 7 &&
      i !== 8 &&
      i !== 9 &&
      i !== 10 &&
      i !== 11
    ) {
      return t;
    }
  }),
];

export const Employees = [
  {
    id: 1121,
    employee_name: 'JOHN DOE',
    employee_no: 1121,
    position: 'PLANNING & SCHEDULING MANAGER',
    rank: 'MANAGERIAL',
    division: 'HEAD OFFICE',
    department: 'Operations Center - Planning & Scheduling ',
    designation: 'HEAD OFFICE',
    date_hired: '1-Jun-21',
    yrs_in_service: '1',
    employment_status: 'REGULAR',
    end_of_prob: '1-Dec-21',
    contract_end_date: null,
    gender: 'Male',
    birthdate: '27-Jun-92',
    age: '29',
    tax_exemption: 'MARRIED',
    contact_number: '9064195953',
    email: 'mjlabne@gmail.com',
    bdo_acc: null,
    civil_status: 'MARRIED',
    no_of_dependents: null,
    sss: '3443240796',
    philhealth: '030255293113',
    pagibig: '121233972057',
    tin: '440996953',
    address: '11 Blk 13 Park Place Ave Park Place Village Cainta Rizal',
    course: 'BS Civil Engineering',
    educational_attainment: 'COLLEGE GRADUATE',
    date_of_school_attended: '2008-2013',
    licensure: 'Civil Engineer',
    prc_no: null,
    offense: null,
    audit: null,
    remarks: null,
    coc_no: null,
    vacccine_status: 'VACCINATED',
    digital_bulletin: 'Member',
    viber_no: '639177080278',
    vpdc_email: 'johndoe@vcdcph.com',
    emergency_contact: 'Aubrey Q. Abne',
    emergency_address:
      '11 Block 13 Parkplace Avenue Parkplace Village, Cainta, Rizal',
    emergency_no: '9954887546',
  },
  {
    id: 2212,
    employee_name: 'JOHN DOE',
    employee_no: 2212,
    position: 'PLANNING & SCHEDULING MANAGER',
    rank: 'MANAGERIAL',
    division: 'HEAD OFFICE',
    department: 'Operations Center - Planning & Scheduling ',
    designation: 'HEAD OFFICE',
    date_hired: '1-Jun-21',
    yrs_in_service: '1',
    employment_status: 'REGULAR',
    end_of_prob: '1-Dec-21',
    contract_end_date: null,
    gender: 'Male',
    birthdate: '27-Jun-92',
    age: '29',
    tax_exemption: 'MARRIED',
    contact_number: '9064195953',
    email: 'mjlabne@gmail.com',
    bdo_acc: null,
    civil_status: 'MARRIED',
    no_of_dependents: null,
    sss: '3443240796',
    philhealth: '030255293113',
    pagibig: '121233972057',
    tin: '440996953',
    address: '11 Blk 13 Park Place Ave Park Place Village Cainta Rizal',
    course: 'BS Civil Engineering',
    educational_attainment: 'COLLEGE GRADUATE',
    date_of_school_attended: '2008-2013',
    licensure: 'Civil Engineer',
    prc_no: null,
    offense: null,
    audit: null,
    remarks: null,
    coc_no: null,
    vacccine_status: 'VACCINATED',
    digital_bulletin: 'Member',
    viber_no: '639177080278',
    vpdc_email: 'johndoe@vcdcph.com',
    emergency_contact: 'Aubrey Q. Abne',
    emergency_address:
      '11 Block 13 Parkplace Avenue Parkplace Village, Cainta, Rizal',
    emergency_no: '9954887546',
  },
];
