import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { EmployeesWithLeaveSlice } from 'slices/interfaces'
import { getEmployeesWithLeavesEndpoint } from 'apis/employees'


const initialState: EmployeesWithLeaveSlice = {
  employeeItems: [],
  status: 'idle',
  error: null

}

export const getEmployeesWithLeaves:any = createAsyncThunk("employees/getEmployeesWithLeaves", async () => {
  try {
    const response = await getEmployeesWithLeavesEndpoint()
    return [...response.data]
  } catch (err:any) {
    console.error('ERROR in getEmployeesWithLeaves', err)
    return err.message
  }  

});


export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(getEmployeesWithLeaves.pending, (state) => {
      state.status = "loading";
  })
  .addCase(getEmployeesWithLeaves.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.employeeItems = action.payload;
})
.addCase(getEmployeesWithLeaves.rejected, (state, action) => {
  state.status = "failed";
  state.error = action.error.message
})
  }
})

export const getEmployeeItems = (state:any)=>state.employee.employeeItems
export const getStatus = (state:any)=>state.employee.status
export const getError = (state:any)=>state.employee.error

export default employeesSlice.reducer