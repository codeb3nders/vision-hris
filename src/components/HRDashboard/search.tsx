/* eslint-disable react-hooks/exhaustive-deps */
import { SearchTwoTone } from "@mui/icons-material";
import { FormControl, OutlinedInput } from "@mui/material";
import React, { useState, useEffect, useRef, useContext } from "react";
import { searchEmployeeEndpoint } from 'apis/employees';
import { EmployeeDBI } from "slices/interfaces/employeeI";
import { AppCtx } from "App";

type Props = {
  setSearchText: any;
  searchText: string;
  setEmployees: any;
  setIsLoading: any;
  isLoading?: boolean;
  userCredentials?: any[];
};

const Search = ({ setSearchText, searchText, setEmployees, setIsLoading, isLoading, userCredentials }: Props) => {
  const searchRef: any = useRef(null);
  const { access_token } = useContext(AppCtx);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      setIsLoading(true);
      console.log({ searchText });
      try {
        const res = await searchEmployeeEndpoint({
          name: searchText.toUpperCase(),
          access_token,
        });
        console.log({res})
        if (res.data.length > 0) {
          const employees = res.data.map((r: EmployeeDBI) => {
            const mi = r.middleName ? r.middleName.charAt(0) : '';
            const full_name = `${r.lastName}, ${r.firstName} ${mi}`;
            if (userCredentials) {
              const withUserCredentials = userCredentials.filter((x: any) => x.employeeNo === r.employeeNo).length > 0;
              return { ...r, id: r.employeeNo, full_name, withUserCredentials };
            }
            return { ...r, id: r.employeeNo, full_name };
          });
          setEmployees(employees);
        } else {
          setEmployees([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log('handleSearch error:', error);
      }
    }
  };

  return (
      <FormControl
        fullWidth
        size="small"
      >
      <OutlinedInput
        disabled={isLoading}
        autoFocus
        placeholder="Search by Employee Name"
        ref={searchRef}
        id="employee-search"
        onChange={(e: any) => setSearchText(e.target.value)}
        endAdornment={<SearchTwoTone />}
        onKeyUp={handleSearch}
        />
      </FormControl>
  );
};

export default React.memo(Search);
