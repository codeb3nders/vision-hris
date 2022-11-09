import { Moment } from 'moment';

export interface EmployeesWithLeaveSlice {
  employeeItems: EmployeeI[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

export interface AddressI {
  addressLine: string;
  barangay: string;
  municipality: string;
  province: string;
  region: string;
}

export interface EducationI {
  level: string;
  yrFrom: number | null;
  yrTo: number | null;
  schoolAndAddress: string;
  degree: string;
  honors: string;
}

export interface EmploymentRecordsI {
  yrFrom: number;
  yrTo: number;
  companyName: string;
  positionHeld: string;
}

export interface GovtProfExamsPassedI {
  examTitle: string;
  dateTaken: Date;
  Rating: string;
}

export interface LicensesCertificationsI {
  name: string;
  authorizingEntity: string;
  validUntil: Date;
  licenseCertNo: string;
}

export interface FamilyBackgroundI {
  name: string;
  relation: string;
  occupation: string;
  company: string;
  residence: string;
}

export interface EmergencyContactI {
  name: string;
  relation: string;
  address: string;
  phoneNumber: string;
}

export interface AllowanceDetailsI {
  code: string;
  amount: number;
}

export interface EmployeeDBI extends EmployeeI {
  full_name?: string;
  yearsInService?: number;
  employment_history?: any[];
  job_history?: any[];
}

export interface EmployeeI {
  employeeNo: string;
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  citizenship: any;
  position: any;
  rank: any;
  department: any;
  location: any[];
  isActive: boolean;
  userGroup: any;
  reportsTo: any;
  dateHired: Date | Moment | number;
  employmentStatus: any;
  employmentType: any;
  endOfProbationary: Date | Moment | null | number;
  contractEndDate: Date | Moment | null | number;
  gender: any;
  birthDate: Date | null | number;
  personalContactNumber: string;
  companyContactNumber: string;
  taxExemption: string;
  companyEmail: string;
  personalEmail: string;
  payrollBankAccount: any | null;
  civilStatus: any;
  religion: any;
  numberOfDependents: undefined | number;
  sss: string;
  philHealth: string;
  pagIbig: string;
  tin: string;
  emergencyContact: any[] | null;
  govtProfExamsPassed: GovtProfExamsPassedI[] | null;
  familyBackground: FamilyBackgroundI[] | null;
  basicPay: number;
  dateInactive: Date | Moment | null;
  deductHMDF: number;
  deductionSSS: number;
  deductPhilhealth: any;
  deductWithholdingTax: number;
  employeeBenefits: string[] | null;
  fixedContributionRate: any;
  paymentMethod: any;
  payRateType: any;
  payrollGroup: any;
  presentAddress: AddressI;
  permanentAddress: AddressI;
  educationalBackground: EducationI[];
  employmentRecords: EmploymentRecordsI[] | null;
  licensesCertifications: LicensesCertificationsI[] | null;
  allowanceDetails: AllowanceDetailsI[] | null;
  employmentLastUpdate: Date | Moment | undefined | number;
  jobLastUpdate: Date | Moment | undefined | number;
  lastModifiedDate: Date | Moment | undefined;
  dateCreated: Date | Moment | undefined;
  isRehire: boolean;
  oldEmployeeNo: string | null;
}

export interface LoginI {
  username: string | null;
  password: string | null;
}
