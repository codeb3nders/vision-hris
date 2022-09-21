import { EmployeeI } from 'slices/interfaces/employeeI';

export const personalCols = [
  'firstName', 
  'lastName', 
  'middleName', 
  'suffix', 
  'citizenship', 
  'gender', 
  'birthDate', 
  'personalContactNumber', 
  'personalEmail', 
  'civilStatus', 
  'religion', 
  'presentAddress', 
  'permanentAddress'
]

export const compensationBenefitsCols = [
  'sss', 
  'philHealth', 
  'pagIbig', 
  'tin', 
  'numberOfDependents', 
  'taxExemption'
]

export const payrollInfoCols = [
  'basicPay', 
  'payRateType', 
  'paymentMethod', 
  'payrollGroup', 
  'deductionSSS', 
  'deductPhilhealth',
  'deductHMDF',
  'fixedContributionRate',
  'deductWithholdingTax'
]

export const initialState: EmployeeI = {
  employeeNo: '',
  firstName: '',
  lastName: '',
  middleName: '',
  suffix: '',
  citizenship: null,
  position: null,
  rank: null,
  department: null,
  location: [],
  isActive: true,
  userGroup: null,
  reportsTo: null,
  dateHired: new Date(),
  employmentType: null,
  employmentStatus: null,
  endOfProbationary: null,
  contractEndDate: null,
  gender: null,
  birthDate: null,
  personalContactNumber: '',
  companyContactNumber: '',
  taxExemption: '',
  companyEmail: '',
  personalEmail: '',
  payrollBankAccount: {
    accountName: '',
    accountNumber: '',
    bankName: '',
    bankBranch: ''
  },
  civilStatus: null,
  religion: null,
  numberOfDependents: undefined,
  sss: '',
  philHealth: '',
  pagIbig: '',
  tin: '',
  emergencyContact: [],
  govtProfExamsPassed: [],
  familyBackground: [],
  leave_requests: [],
  basicPay: 0.00,
  dateInactive: null,
  deductHMDF: 0.00,
  deductionSSS: 0.00,
  deductPhilhealth: null,
  deductWithholdingTax: 0.00,
  employeeBenefits: [],
  fixedContributionRate: null,
  paymentMethod: '',
  payRateType: null,
  payrollGroup: null,
  presentAddress: {
    addressLine: "",
    barangay: "",
    municipality: "",
    province: "",
    region: ""
  },
  permanentAddress: {
    addressLine: "",
    barangay: "",
    municipality: "",
    province: "",
    region: ""
  },
  educationalBackground: [],
  employmentRecords: [],
  licensesCertifications: [],
  allowanceDetails: [],
  yearsInService: 0,
  employment_history: [],
  job_history: [],
  employmentLastUpdate: undefined,
  jobLastUpdate: undefined,
  lastModifiedDate: undefined,
  dateCreated: undefined
};
