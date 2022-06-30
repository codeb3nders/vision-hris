import React, {useEffect, useState} from "react"
import {
	Modal,
	Card,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Button,
	Grid,
	IconButton,
	CardHeader,
	CardContent,
	CardActions,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from "@mui/material"
import {
	AccessTimeTwoTone,
	AssignmentTwoTone,
	BadgeTwoTone,
	Close,
	DateRangeTwoTone,
	DeleteTwoTone,
	EditTwoTone,
	EventTwoTone,
	Info,
	PendingActionsTwoTone,
	SaveTwoTone,
	SpeakerNotesTwoTone,
	StickyNote2TwoTone,
	SupervisedUserCircleTwoTone,
	ThumbDownAlt,
	ThumbUpAlt
} from "@mui/icons-material"
import {ICONS, TITLES} from "../../HRDashboard/EmployeeData"

const ViewDetailsModal = ({viewDetails, setViewDetails, isApprover, isOT, isEmployeeDetails}) => {
	const [details, setDetails] = useState(viewDetails?.details?.row)
	const [status, setStatus] = useState("PENDING")
	const [reason, setReason] = useState(null)

	useEffect(() => {
		viewDetails.status && setDetails(viewDetails.details.row)
	}, [viewDetails])

	console.log({viewDetails})

	const handleList = () => {
		const details = []

		const v = viewDetails?.details?.row

		if (v) {
			for (const key in v) {
				if (Object.hasOwnProperty.call(v, key)) {
					const element = v[key]

					console.log({v, key})

					if (key === "id" || (key === "status" && isApprover)) {
						details.push(null)
					} else {
						details.push(
							<Grid item md={isEmployeeDetails ? 6 : 12} sx={{alignSelf: "stretch"}}>
								<ListItem>
									<ListItemIcon>{TITLES(element).filter(t => t.key === key)[0]?.icon}</ListItemIcon>
									<ListItemText
										primary={element ? element : <span style={{color: "#ccc"}}>-</span>}
										secondary={
											<span style={{textTransform: "uppercase"}}>
												{TITLES(element).filter(t => t.key === key)[0]?.label}
											</span>
										}
										primaryTypographyProps={{
											color:
												element === "Pending"
													? "#ed6c02"
													: element === "Approve"
													? "#2e7d32"
													: element === "Disapprove"
													? "#d32f2f"
													: "#000"
										}}
										secondaryTypographyProps={{
											fontSize: 11,
											color: "primary"
										}}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
							</Grid>
						)
					}
				}
			}

			console.log({details})
		}

		return details.filter(d => d !== null)
	}

	return (
		<Modal
			open={viewDetails.status}
			onClose={() => setViewDetails({details: {}, status: false})}
			sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
		>
			<Card sx={{width: isEmployeeDetails ? 850 : 500, minHeight: 500}}>
				<CardHeader
					title={
						<Typography variant="h6" sx={{alignItems: "center", display: "flex"}} color="primary">
							<Info sx={{mr: 1}} /> {isOT ? "OT Application" : isEmployeeDetails ? "Employee" : "Leave Application"}{" "}
							Details
							<IconButton sx={{ml: "auto"}} onClick={() => setViewDetails({details: {}, status: false})}>
								<Close />
							</IconButton>
						</Typography>
					}
				/>

				<Divider />
				<CardContent sx={{maxHeight: 500, overflow: "auto", py: 0}}>
					<List sx={{display: "flex", alignItems: "stretch", flexDirection: "row", width: "100%", flexWrap: "wrap"}}>
						{handleList()}
						{viewDetails?.details?.row?.status === "Disapprove" && (
							<ListItem>
								<ListItemIcon>
									<StickyNote2TwoTone color="error" />
								</ListItemIcon>
								<ListItemText
									primary="Employee's requested leave poses significant difficulty or expense for the company"
									secondary="Disapproval Reason"
								/>
							</ListItem>
						)}

						{isApprover && details?.status === "Pending" && (
							<>
								{status === "DISAPPROVED" && (
									<ListItem>
										<ListItemIcon>
											<StickyNote2TwoTone color="error" />
										</ListItemIcon>
										<ListItemText
											primary={
												<FormControl fullWidth variant="standard" sx={{maxWidth: 500}} required>
													<InputLabel id="disapprove_reason">Disapproval Reason</InputLabel>
													<Select
														value={reason}
														fullWidth
														sx={{fontSize: 12}}
														labelId="disapprove_reason"
														onChange={e => setReason(e.target.value)}
													>
														<MenuItem value="DISAPPROVED-1" data-reason="Leave not covered by policy">
															Leave not covered by policy
														</MenuItem>
														<MenuItem value="DISAPPROVED-2" data-reason="Staffing needs">
															Staffing needs
														</MenuItem>
														<MenuItem
															value="DISAPPROVED-3"
															data-reason="The employee does not have sufficient annual leave accrued"
														>
															The employee does not have sufficient annual leave accrued
														</MenuItem>
														<MenuItem
															value="DISAPPROVED-4"
															data-reason="Employee cannot indicate if or when she will be able to return to work"
														>
															Employee cannot indicate if or when she will be able to return to work
														</MenuItem>
														<MenuItem
															value="DISAPPROVED-5"
															data-reason="Extremely difficult to find a temporary replacement because of the highly specialized nature of the employee's job"
														>
															Extremely difficult to find a temporary replacement because of the highly specialized
															nature of the employee's job
														</MenuItem>
														<MenuItem
															value="DISAPPROVED-6"
															data-reason="Employee's requested leave poses significant difficulty or expense for the company"
														>
															Employee's requested leave poses significant difficulty or expense for the company
														</MenuItem>
														<MenuItem
															value="DISAPPROVED-7"
															data-reason="The employee has not provided adequate notice. (At least 3 days before availment of leave for Vacation Leave)"
														>
															The employee has not provided adequate notice. (At least 3 days before availment of leave
															for Vacation Leave)
														</MenuItem>
														<MenuItem
															value="DISAPPROVED-8"
															data-reason="Employee has inputted wrong details on their form"
														>
															Employee has inputted wrong details on their form
														</MenuItem>
														<MenuItem
															value="DISAPPROVED-9"
															data-reason="Employee has selected the wrong approving head"
														>
															Employee has selected the wrong approving head
														</MenuItem>
														<MenuItem value="DISAPPROVED-10" data-reason="For Manual Approval">
															For Manual Approval
														</MenuItem>
														<MenuItem value="DISAPPROVED-11" data-reason="Duplicate Entry">
															Duplicate Entry
														</MenuItem>
														<MenuItem value="DISAPPROVED-12" data-reason="System Error">
															System Error
														</MenuItem>
														<MenuItem value="DISAPPROVED-13" data-reason="Divert Iterinary">
															Divert Iterinary
														</MenuItem>
													</Select>
												</FormControl>
											}
											// secondary="Status"
										/>
									</ListItem>
								)}

								<ListItem>
									<ListItemIcon>
										<PendingActionsTwoTone
											color={status === "APPROVED" ? "success" : status === "PENDING" ? "warning" : "error"}
										/>
									</ListItemIcon>
									<ListItemText
										primary={
											<FormControl fullWidth variant="standard" sx={{maxWidth: 500}}>
												<InputLabel id="status">Status</InputLabel>
												<Select fullWidth labelId="status" value={status} onChange={e => setStatus(e.target.value)}>
													<MenuItem value="PENDING">PENDING</MenuItem>
													<MenuItem value="APPROVED">APPROVED</MenuItem>
													<MenuItem value="DISAPPROVED">DISAPPROVED</MenuItem>
												</Select>
											</FormControl>
										}
									/>
								</ListItem>
							</>
						)}
					</List>
				</CardContent>

				{isApprover && details?.status === "Pending" && (
					<>
						<Divider />
						<CardActions sx={{justifyContent: "right"}}>
							<Button
								disabled={status === "PENDING" || (status === "DISAPPROVED" && reason === null)}
								color="success"
								variant="text"
								disableElevation
								sx={{mr: 1}}
								startIcon={<SaveTwoTone />}
							>
								Submit
							</Button>
						</CardActions>
					</>
				)}
				{isEmployeeDetails && (
					<CardActions>
						<Divider />
						<Grid container justifyContent="center" sx={{mt: 1}}>
							<Button color="warning" variant="contained" disableElevation startIcon={<EditTwoTone />} sx={{mr: 1}}>
								Edit
							</Button>
							<Button color="error" variant="contained" disableElevation startIcon={<DeleteTwoTone />}>
								Delete
							</Button>
						</Grid>
					</CardActions>
				)}
			</Card>
		</Modal>
	)
}

export default ViewDetailsModal
