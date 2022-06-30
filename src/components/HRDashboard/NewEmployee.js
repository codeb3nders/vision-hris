import {Close, Info, SaveTwoTone} from "@mui/icons-material"
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography
} from "@mui/material"
import React, {useState} from "react"
import {
	CivilStatus,
	Departments,
	DigitalBulletin,
	EmploymentStatus,
	NewEmployeeDetails,
	TaxExemption,
	TITLES,
	VaccineStatus
} from "./EmployeeData"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import TimePicker from "@mui/lab/TimePicker"
import DatePicker from "@mui/lab/DatePicker"
import DateRangePicker from "@mui/lab/DateRangePicker"
import AdapterDateFns from "@mui/lab/AdapterDateFns"

const NewEmployee = ({open, setOpen, id}) => {
	const [user, setUser] = useState()

	console.log({open})

	const handleDateChange = () => {}

	const handleList = () => {
		const DateInput = title => (
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				{title.key === "date_of_school_attended" ? (
					<Grid container spacing={1}>
						<Grid item md={7}>
							<DatePicker
								label={<span style={{textTransform: "uppercase"}}>School Attended From:</span>}
								onChange={handleDateChange}
								renderInput={params => <TextField {...params} fullWidth required variant="standard" />}
							/>
						</Grid>
						<Grid item md={5}>
							<DatePicker
								label={<span style={{textTransform: "uppercase"}}>To:</span>}
								onChange={handleDateChange}
								renderInput={params => <TextField {...params} fullWidth required variant="standard" />}
							/>
						</Grid>
					</Grid>
				) : (
					<DatePicker
						label={<span style={{textTransform: "uppercase"}}>{title.label}</span>}
						onChange={handleDateChange}
						renderInput={params => <TextField {...params} fullWidth required variant="standard" />}
					/>
				)}
			</LocalizationProvider>
		)

		const TimeInput = title => (
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<TimePicker
					label={<span style={{textTransform: "uppercase"}}>{title.label}</span>}
					onChange={handleDateChange}
					renderInput={params => <TextField {...params} fullWidth required variant="standard" />}
				/>
			</LocalizationProvider>
		)

		const SelectInput = title => {
			const menu = () => {
				switch (title.key) {
					case "employment_status":
						return EmploymentStatus
					case "tax_exemption":
						return TaxExemption
					case "civil_status":
						return CivilStatus
					case "vaccine_status":
						return VaccineStatus
					case "digital_bulletin":
						return DigitalBulletin
					case "department":
						return Departments

					default:
						break
				}
			}

			return (
				<FormControl fullWidth variant="standard">
					<InputLabel id={title.key}>
						<span style={{textTransform: "uppercase"}}>{title.label}</span>
					</InputLabel>
					<Select fullWidth>
						{menu().map(m => {
							return <MenuItem value={m}>{m}</MenuItem>
						})}
					</Select>
				</FormControl>
			)
		}

		const FieldInput = title => {
			switch (title.key) {
				case "date_requested":
					return DateInput(title)
				case "date_from":
					return DateInput(title)
				case "date_to":
					return DateInput(title)
				case "date":
					return DateInput(title)
				case "end_of_prob":
					return DateInput(title)
				case "contract_end_date":
					return DateInput(title)
				case "birthdate":
					return DateInput(title)
				case "date_hired":
					return DateInput(title)
				case "date_of_school_attended":
					return DateInput(title)
				case "employment_status":
					return SelectInput(title)
				case "tax_exemption":
					return SelectInput(title)
				case "civil_status":
					return SelectInput(title)
				case "vaccine_status":
					return SelectInput(title)
				case "digital_bulletin":
					return SelectInput(title)
				case "department":
					return SelectInput(title)

				default:
					return (
						<TextField
							fullWidth
							variant="standard"
							label={<span style={{textTransform: "uppercase"}}>{title.label}</span>}
						/>
					)
			}
		}

		const fields = NewEmployeeDetails.map(title => {
			return (
				<Grid
					item
					md={6}
					sx={{
						alignSelf: "stretch",
						"& .MuiDivider-root.MuiDivider-inset": {
							border: "none"
						},
						color: "red"
					}}
				>
					<ListItem>
						<ListItemIcon>{title.icon}</ListItemIcon>
						<ListItemText
							primary={FieldInput(title)}
							// secondary={<span >{title.label}</span>}
							primaryTypographyProps={{}}
							secondaryTypographyProps={{
								fontSize: 11,
								color: "primary"
							}}
						/>
					</ListItem>
					<Divider variant="inset" component="li" />
				</Grid>
			)
		})

		return fields
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Modal open={open} onClose={handleClose} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
			<Card sx={{width: 850, minHeight: 500}}>
				<CardHeader
					title={
						<Typography variant="h6" sx={{alignItems: "center", display: "flex"}} color="primary">
							<Info sx={{mr: 1}} /> New Employee
							<IconButton sx={{ml: "auto"}} onClick={handleClose}>
								<Close />
							</IconButton>
						</Typography>
					}
				/>

				<Divider />
				<CardContent sx={{maxHeight: 500, overflow: "auto", py: 0}}>
					<List sx={{display: "flex", alignItems: "stretch", flexDirection: "row", width: "100%", flexWrap: "wrap"}}>
						{handleList()}
					</List>
				</CardContent>

				<Divider />
				<CardActions sx={{justifyContent: "right", p: 2}}>
					<Button startIcon={<SaveTwoTone />} onClick={handleClose}>
						Save Employee
					</Button>
				</CardActions>
			</Card>
		</Modal>
	)
}

export default NewEmployee
