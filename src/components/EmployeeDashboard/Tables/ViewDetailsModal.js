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
	CardActions
} from "@mui/material"
import {
	AccessTimeTwoTone,
	AssignmentTwoTone,
	BadgeTwoTone,
	Close,
	DateRangeTwoTone,
	EventTwoTone,
	Info,
	PendingActionsTwoTone,
	SpeakerNotesTwoTone,
	SupervisedUserCircleTwoTone,
	ThumbDownAlt,
	ThumbUpAlt
} from "@mui/icons-material"
import {ICONS, TITLES} from "../../HRDashboard/EmployeeData"

const ViewDetailsModal = ({viewDetails, setViewDetails, isApprover, isOT, isEmployeeDetails}) => {
	const [details, setDetails] = useState(viewDetails?.details?.row)

	useEffect(() => {
		viewDetails.status && setDetails(viewDetails.details.row)
	}, [viewDetails])

	console.log({viewDetails})

	const handleList = () => {
		const details = []
		const handleIcon = (key, element) => {
			switch (key) {
				case "date_requested":
					return <EventTwoTone />
				case "employee_no":
					return <BadgeTwoTone />
				case "employee_name":
					return <BadgeTwoTone />
				case "date_from":
					return <DateRangeTwoTone />
				case "date_to":
					return <DateRangeTwoTone />
				case "reason":
					return <SpeakerNotesTwoTone />
				case "leave_type":
					return <AssignmentTwoTone />
				case "status":
					return (
						<PendingActionsTwoTone
							color={element === "Pending" ? "warning" : element === "Approve" ? "success" : "error"}
						/>
					)

				case "supervisor":
					return <SupervisedUserCircleTwoTone />
				case "date":
					return <EventTwoTone />
				case "time_from":
					return <AccessTimeTwoTone />
				case "time_to":
					return <AccessTimeTwoTone />

				default:
					break
			}
		}

		const v = viewDetails?.details?.row

		if (v) {
			for (const key in v) {
				if (Object.hasOwnProperty.call(v, key)) {
					const element = v[key]

					console.log({v, key})

					if (key === "id") {
						details.push(null)
					} else {
						details.push(
							<>
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
							</>
						)
					}
				}
			}

			console.log({details})
		}

		return details.filter(d => d !== null)
	}

	const handleEmloyeeDetailsList = () => {}

	return (
		<Modal
			open={viewDetails.status}
			onClose={() => setViewDetails({details: {}, status: false})}
			sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
		>
			<Card sx={{width: 500, minHeight: 500}}>
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
				<CardContent sx={{maxHeight: 650, overflow: "auto", py: 0}}>
					<List>{handleList()}</List>
				</CardContent>

				<CardActions>
					{isApprover && details?.status === "Pending" && (
						<Grid container spacing={1} justifyContent="center" sx={{mt: 1}}>
							<Button color="success" variant="contained" disableElevation sx={{mr: 1}} startIcon={<ThumbUpAlt />}>
								Approve
							</Button>
							<Button color="error" variant="contained" disableElevation startIcon={<ThumbDownAlt />}>
								Disapprove
							</Button>
						</Grid>
					)}
				</CardActions>
			</Card>
		</Modal>
	)
}

export default ViewDetailsModal
