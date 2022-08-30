import { Moment } from "moment";

export interface EmployeesWithLeaveSlice {
  employeeItems: EmployeeI[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
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
  reportsTo: string;
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
  presentCity: string;
  permanentCity: string;
  presentZipCode: string;
  permanentZipCode: string;
  presentRegion: string;
  permanentRegion: string;
  permanentResidenceAddress: string;
  presentResidenceAddress: string;
  highestEducationalAttainment: string;
  elementaryYrFrom: number;
  elementaryYrTo: number;
  elementarySchoolAndAddress: string;
  elementaryHonors: string;
  secondaryYrFrom: number;
  secondaryYrTo: number;
  secondarySchoolAndAddress: string;
  secondaryHonors: string;
  tertiaryYrFrom: number;
  tertiaryYrTo: number;
  tertiarySchoolAndAddress: string;
  tertiaryDegree: string;
  tertiaryHonors: string;
  postGradYrFrom: number;
  postGradYrTo: number;
  postGradSchoolAndAddress: string;
  postGradDegree: string;
  postGradHonors: string;
  othersYrFrom: number;
  othersYrTo: number;
  othersSchoolAndAddress: string;
  othersDegree: string;
  othersHonors: string;
  licensure: string;
  emergencyContact: any[] | null;
  employmentRecords: any[] | null;
  govtProfExamsPassed: any[] | null;
  licensesCertifications: any[] | null;
  familyBackground: any[] | null;
  leave_requests?: any;
  full_name: string;
}

export interface LoginI {
  username: string | null;
  password: string | null;
}
