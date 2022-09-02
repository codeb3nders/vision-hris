/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

const useRequiredChecker = ({ employeeDetails }) => {
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const validated = requiredChecker();
    setValidated(validated);
  }, [employeeDetails]);

  const requiredChecker = () => {
    const {
      lastName,
      firstName,
      birthDate,
      gender,
      civilStatus,
      personalContactNumber,
      personalEmail,
      position,
      department,
      location,
      reportsTo,
      dateHired,
      endOfProbationary,
      rank,
      employmentStatus,
      companyEmail,
      companyContactNumber,
      deductionSSS,
      deductHMDF,
      deductPhilhealth,
      deductWithholdingTax,
      NumberOfDependents,
      basicPay,
      payRateType,
      paymentMethod,
      payrollGroup,
      payrollBankAccount,
      sss,
      philHealth,
      pagIbig,
      tin,
    } = employeeDetails;

    return (
      lastName &&
      firstName &&
      birthDate &&
      gender &&
      civilStatus &&
      personalContactNumber &&
      personalEmail &&
      position &&
      department &&
      location.length > 0 &&
      reportsTo &&
      dateHired &&
      endOfProbationary &&
      rank &&
      employmentStatus &&
      companyEmail &&
      companyContactNumber &&
      deductionSSS &&
      deductHMDF &&
      deductPhilhealth &&
      deductWithholdingTax &&
      tin &&
      NumberOfDependents &&
      basicPay &&
      payRateType &&
      paymentMethod &&
      payrollGroup &&
      payrollBankAccount.accountName &&
      payrollBankAccount.accountNumber &&
      payrollBankAccount.bankBranch &&
      payrollBankAccount.bankName &&
      sss &&
      philHealth &&
      pagIbig
    );
  };

  return {
    validated,
  };
};

export default useRequiredChecker;
