import { combineReducers, configureStore, Reducer, AnyAction } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
  persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import userAccessSlice from "slices/userAccess/authSlice";
import employeesSlice from "slices/employees/getEmployeesSlice";
import enumsSlice from "slices/enums/enumsSlice";
import employeeWithLeaveReducer from "slices/employees/getEmployeesWithLeaveSlice";
import userAccessReducer from "slices/userAccess/authSlice";
import NewEmployeeSlice from "slices/employees/createEmployeesSlice";
import FilteredEmployeeSlice from "slices/employees/filteredEmployeesSlice";

const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['employeesWithLeave', 'userAccess', 'newEmployee', 'filteredEmployees']
}

const appReducer = combineReducers({
  auth: userAccessSlice,
  employee: employeesSlice,
  enums: enumsSlice,
  employeesWithLeave: employeeWithLeaveReducer,
  userAccess: userAccessReducer,
  newEmployee: NewEmployeeSlice,
  filteredEmployees: FilteredEmployeeSlice,
})

const persistedReducer = persistReducer(rootPersistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;