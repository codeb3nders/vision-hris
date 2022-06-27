import React, {useState} from "react"
import {DataGrid} from "@mui/x-data-grid"
import {Card, Button} from "@mui/material"
import {Employees} from "./EmployeeData"
import ViewDetailsModal from "../EmployeeDashboard/Tables/ViewDetailsModal"

const EmployeeList = () => {
	const [viewDetails, setViewDetails] = useState({
		details: {},
		status: false
	})

	const columns = [
		{
			field: "employee_name",
			headerName: "Employee name",
			width: 200,
			renderCell: cell => {
				return (
					<Button
						title={cell.value}
						variant="text"
						onClick={() => setViewDetails({details: cell, status: true})}
						size="small"
					>
						{cell.value}
					</Button>
				)
			}
		},
		{
			field: "employee_no",
			headerName: "Employee No.",
			width: 100,
			renderCell: cell => (
				<span title={cell.value} className="MuiDataGrid-cellContent">
					{cell.value}
				</span>
			)
		},
		{field: "position", headerName: "Position", width: 200},
		{
			field: "rank",
			headerName: "Rank",
			width: 140
		},
		{
			field: "division",
			headerName: "Division",
			width: 140
			//   renderCell: (cell) => cell,
		},
		{
			field: "department",
			headerName: "Department",
			width: 250
			//   renderCell: (cell) => cell,
		}
	]

	return (
		<>
			<ViewDetailsModal
				viewDetails={viewDetails}
				setViewDetails={setViewDetails}
				isApprover={true}
				isOT={false}
				isEmployeeDetails
			/>
			<Card sx={{mt: 5}}>
				<div style={{height: 400, width: "100%"}}>
					<DataGrid
						disableSelectionOnClick
						rows={Employees || []}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						checkboxSelection
						loading={Employees.length <= 0}
					/>
				</div>
			</Card>
		</>
	)
}

export default EmployeeList
