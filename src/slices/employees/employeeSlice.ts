import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios' 
import type { PayloadAction } from '@reduxjs/toolkit'
import { EmployeesSlice } from 'slices/interfaces'

const getEmployeeUrl = `http://localhost:4002/employees/leaves/`

const initialState: EmployeesSlice = {
  employeeItems: [],
  status: 'idle',
  error: null

}

export const getEmployeesWithLeaves:any = createAsyncThunk("employees/getEmployeesWithLeaves", async () => {
  try {
    const response = await axios.get(getEmployeeUrl)
    return [...response.data]
  } catch (err:any) {
    console.log('ERROR', err)
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

console.log({employeesSlice})

export const getEmployeeItems = (state:any)=>state.employee.employeeItems
export const getStatus = (state:any)=>state.employee.status
export const getError = (state:any)=>state.employee.error

export const { } = employeesSlice.actions

export default employeesSlice.reducer