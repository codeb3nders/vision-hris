import { Moment } from "moment";

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
  yrFrom: number;
  yrTo: number;
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

export interface EmployeeI {
  employeeNo: string;
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  citizenship: string;
  position: string;
  rank: string;
  department: string;
  location: any[];
  isActive: boolean;
  userGroup: string;
  reportsTo: any;
  dateHired: Date | Moment;
  employmentStatus: string;
  endOfProbationary: Date | Moment;
  contractEndDate: Date | Moment;
  gender: string;
  birthDate: Date | null;
  personalContactNumber: string;
  companyContactNumber: string;
  taxExemption: string;
  companyEmail: string;
  personalEmail: string;
  payrollBankAccount: any | null;
  civilStatus: string;
  religion: string;
  NumberOfDependents: number;
  sss: string;
  philHealth: string;
  pagIbig: string;
  tin: string;
  emergencyContact: any[] | null;
  govtProfExamsPassed: GovtProfExamsPassedI[] | null;
  familyBackground: FamilyBackgroundI[] | null;
  leave_requests?: any;
  full_name: string;
  basicPay: number;
  dateInactive: Date | Moment | null;
  deductHMDF: number;
  deductionSSS: number;
  deductPhilhealth: string;
  deductWithholdingTax: number;
  employeeBenefits: string[] | null;
  fixedContributionRate: string;
  paymentMethod: string;
  payRateType: string;
  payrollGroup: string;
  presentAddress: AddressI;
  permanentAddress: AddressI;
  educationalBackground: EducationI[] | null;
  employmentRecords: EmploymentRecordsI[] | null;
  licensesCertifications: LicensesCertificationsI[] | null;
  allowanceDetails: AllowanceDetailsI[] | null
}

export interface LoginI {
  username: string | null;
  password: string | null;
}
