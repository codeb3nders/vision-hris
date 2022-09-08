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
      rank,
      employmentStatus,
      companyEmail,
      companyContactNumber
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
      rank &&
      employmentStatus &&
      companyEmail &&
      companyContactNumber
    );
  };

  return {
    validated,
  };
};

export default useRequiredChecker;
