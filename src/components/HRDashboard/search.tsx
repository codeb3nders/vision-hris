/* eslint-disable react-hooks/exhaustive-deps */
import { SearchTwoTone } from "@mui/icons-material";
import { FormControl, OutlinedInput } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

type Props = {
  setSearchText: any;
  handleSearch: any;
};

const Search = ({ setSearchText, handleSearch }: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const searchRef: any = useRef(null);

  useEffect(() => {
    setSearchText && setSearchText(searchValue);
  }, [searchValue]);

  // useEffect(() => {
  //   if (show) {
  //     const searchBox: any = document.querySelector("#employee-search");
  //     searchBox.focus();
  //   }
  // }, [show]);

  return (
    <section className="flex-1 w-full desktop:max-w-[400px] laptop:max-w-[400px] tablet:max-w-full phone:max-w-full relative">
      {/* <SearchTwoTone
        className={`absolute left-[14px] top-[50%] translate-y-[-50%] cursor-pointer z-10 ${
          show ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => setShow(true)}
      /> */}
      <FormControl
        fullWidth
        size="small"
        // className={`transition-all duration-200 ${
        //   show ? 'opacity-100' : 'opacity-0'
        // }`}
        // disabled={!show}
        // onBlur={searchValue ? () => {} : () => setShow(false)}
      >
        <OutlinedInput
          autoFocus
          placeholder="Search by Employee Name"
          ref={searchRef}
          id="employee-search"
          onChange={(e: any) => setSearchValue(e.target.value)}
          endAdornment={<SearchTwoTone />}
          onKeyUp={handleSearch}
        />
      </FormControl>
    </section>
  );
};

export default React.memo(Search);
