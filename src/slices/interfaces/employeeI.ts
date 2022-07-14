export interface EmployeesSlice {
  employeeItems: EmployeeI[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined
}

export interface EmployeeI {
  employeeNo: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fsCode: string;
  bioCode: string;
  position: string;
  rank: string;
  division: string;
  department: string;
  designation: string;
  dateHired: Date;
  yearsInService: number;
  employmentStatus: string;
  endOfProbationary: Date;
  contractEndDate: Date;
  gender: string;
  birthDate: Date;
  age: number;
  contactNumber: string;
  taxExemption: string;
  email: string;
  backAccountNo: string;
  civilStatus: string;
  NumberOfDependents: number;
  sss: string;
  philHealth: string;
  pagIbig?: string;
  tin: string;
  address: string;
  course?: string;
  educationalAttainment?: string;
  schoolAttended?: string;
  licensure: string;
  prcIdNo: string;
  noticeOffense: string;
  audit201: string;
  remarks: string;
  cocNo: string;
  vaccineStatus: string;
  digitalBulletin: string;
  viberNumber: string;
  vpdcEmail: string;
  emergencyContactPerson: string;
  emergencyAddress: string;
  emergencyContactNo: string;
}
