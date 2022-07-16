import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { EmployeesWithLeaveSlice } from 'slices/interfaces'
import { getEmployeesEndpoint } from 'apis/employees'


const initialState: any = {
  employeeItems: [],
  status: 'idle',
  error: null

}

export const getEmployees:any = createAsyncThunk("employees/getEmployees", async () => {
  try {
    const response = await getEmployeesEndpoint()
    return [...response.data]
  } catch (err:any) {
    console.error('ERROR in getEmployees', err)
    return err.message
  }  

});


export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(getEmployees.pending, (state) => {
      state.status = "loading";
  })
  .addCase(getEmployees.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.employeeItems = action.payload;
})
.addCase(getEmployees.rejected, (state, action) => {
  state.status = "failed";
  state.error = action.error.message
})
  }
})

export const getEmployeeItems = (state:any)=>state.employee.employeeItems
export const getStatus = (state:any)=>state.employee.status
export const getError = (state:any)=>state.employee.error

export default employeesSlice.reducer