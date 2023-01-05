/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

type Props = {
  data: any;
  module?: string;
};

const useRequiredChecker = ({ data, module }: Props) => {
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const validated = requiredChecker();
    setValidated(validated);
  }, [data]);

  const requiredChecker = () => {
    // console.log({ data })
    let required: any[] = [],
      emptyCtr = 0;
    switch (module) {
      // @ts-ignore
      case "leaveForm":
        required = [
          "employeeNo",
          "leaveType",
          "dateFrom",
          "dateTo",
          "noOfDays",
          "dateOfReturnToWork",
          "reasonOfLeave",
          "status",
          "approver",
        ];
      // @ts-ignore
      case "otForm":
        required = [
          "employeeNo",
          "date",
          "timeFrom",
          "timeTo",
          "reason",
          "status",
          "approver",
        ];
      case "obForm":
        required = [
          "employeeNo",
          "dateFrom",
          "dateTo",
          "purpose",
          "status",
          "approver",
        ];
        Object.keys(data).map((col) => {
          // console.log({col}, data[col])
          if (required.indexOf(col) >= 0 && !data[col]) {
            emptyCtr++;
          }
        });
        // console.log({emptyCtr})
        return emptyCtr === 0;
      default: //new employee
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
          dateHired,
          rank,
          employmentStatus,
          companyEmail,
          companyContactNumber,
        } = data;

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
          dateHired &&
          rank &&
          employmentStatus &&
          companyEmail &&
          companyContactNumber
        );
    }
  };

  return {
    validated,
  };
};

export default useRequiredChecker;
