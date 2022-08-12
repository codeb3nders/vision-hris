import { configureStore } from "@reduxjs/toolkit";
import employeesSlice from "slices/employees/getEmployeesSlice";
import employeeWithLeaveReducer from "slices/employees/getEmployeesWithLeaveSlice";

export const store = configureStore({
  reducer: {
    employee: employeesSlice,
    employeesWithLeave: employeeWithLeaveReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
