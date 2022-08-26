import { EmployeeI } from 'slices/interfaces/employeeI';

export const initialState: EmployeeI = {
  employeeNo: '',
  firstName: '',
  lastName: '',
  middleName: '',
  suffix: '',
  citizenship: '',
  position: '',
  rank: '',
  department: '',
  locations: [],
  isActive: true,
  userGroup: 'EMPLOYEE',
  reportsTo: '',
  dateHired: new Date(),
  employmentStatus: '',
  endOfProbationary: new Date(),
  contractEndDate: new Date(),
  gender: '',
  birthDate: null,
  personalContactNumber: '',
  companyContactNumber: '',
  taxExemption: '',
  companyEmail: '',
  personalEmail: '',
  payrollBankAccount: null,
  civilStatus: '',
  religion: '',
  NumberOfDependents: 0,
  sss: '',
  philHealth: '',
  pagIbig: '',
  tin: '',
  presentCity: '',
  permanentCity: '',
  presentZipCode: '',
  permanentZipCode: '',
  presentRegion: '',
  permanentRegion: '',
  permanentResidenceAddress: '',
  presentResidenceAddress: '',
  highestEducationalAttainment: '',
  elementaryYrFrom: 0,
  elementaryYrTo: 0,
  elementarySchoolAndAddress: '',
  elementaryHonors: '',
  secondaryYrFrom: 0,
  secondaryYrTo: 0,
  secondarySchoolAndAddress: '',
  secondaryHonors: '',
  tertiaryYrFrom: 0,
  tertiaryYrTo: 0,
  tertiarySchoolAndAddress: '',
  tertiaryDegree: '',
  tertiaryHonors: '',
  postGradYrFrom: 0,
  postGradYrTo: 0,
  postGradSchoolAndAddress: '',
  postGradDegree: '',
  postGradHonors: '',
  othersYrFrom: 0,
  othersYrTo: 0,
  othersSchoolAndAddress: '',
  othersDegree: '',
  othersHonors: '',
  licensure: '',
  emergencyContact: [],
  employmentRecords: [],
  govtProfExamsPassed: [],
  licensesCertifications: [],
  familyBackground: [],
  leave_requests: [],
  full_name: '',
};
