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
import UpdateEmployeeSlice from "slices/employees/updateEmployeesSlice";
import employeeHistorySlice from "slices/employee_history/getEmployeeHistorySlice";
import learningAndDevelopmentSlice from "slices/learningAndDevelopment";
import disciplinaryCaseSlice from "slices/disciplinaryCases";
import assetsSlice from "slices/assets";
import employeeDocsSlice from "slices/employee201files";

const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['employeesWithLeave', 'userAccess',
    'newEmployee', 'filteredEmployees', 'updatedEmployee', 'employeeHistory',
    // 'newLearningAndDev', 'getLearnAndDev', 'updatedLearnAndDev', 'deleteLearnAndDev',
    // 'newAsset', 'getAssets', 'updatedAsset', 'deleteAsset',
    'disciplinaryCases', 'assets' ,'learningAndDevelopment', 'employeeDocuments'
  ]
}

const appReducer = combineReducers({
  auth: userAccessSlice,
  employee: employeesSlice,
  enums: enumsSlice,
  employeesWithLeave: employeeWithLeaveReducer,
  userAccess: userAccessReducer,
  newEmployee: NewEmployeeSlice,
  filteredEmployees: FilteredEmployeeSlice,
  updatedEmployee: UpdateEmployeeSlice,
  employeeHistory: employeeHistorySlice,
  learningAndDevelopment: learningAndDevelopmentSlice,
  disciplinaryCases: disciplinaryCaseSlice,
  assets: assetsSlice,
  employeeDocuments: employeeDocsSlice
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