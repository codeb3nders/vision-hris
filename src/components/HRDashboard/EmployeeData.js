import {
	AccessTimeTwoTone,
	AccountBalanceTwoTone,
	AlternateEmailTwoTone,
	AssignmentTwoTone,
	AssuredWorkloadTwoTone,
	BadgeTwoTone,
	CakeTwoTone,
	CommentTwoTone,
	ContactMailTwoTone,
	CreditCardTwoTone,
	DateRangeTwoTone,
	EventTwoTone,
	GavelTwoTone,
	GroupAddTwoTone,
	HomeTwoTone,
	LabelImportantTwoTone,
	LabelTwoTone,
	MedicalInformationTwoTone,
	MilitaryTechTwoTone,
	NumbersTwoTone,
	PendingActionsTwoTone,
	PersonTwoTone,
	PhoneTwoTone,
	SchoolTwoTone,
	SpeakerNotesTwoTone,
	StarTwoTone,
	SupervisedUserCircleTwoTone,
	TagTwoTone,
	VerifiedUserTwoTone,
	WcTwoTone
} from "@mui/icons-material"

export const DigitalBulletin = ["Invited", "Member", "Rendering", "Removed"]
export const VaccineStatus = ["Vaccinated", "LGU Registered"]
export const Departments = [
	"Business Development & Marketing",
	"Commercial and Contracts",
	"Corporate & General Accounting",
	"ESH",
	"Estimating and Tender Planning",
	"HRMD",
	"Information and Technology",
	"Internal Audit",
	"Office of the President",
	"Operations -  Logistics & Transport",
	"Operations - Heavy Equipment",
	"Operations - Project Management",
	"Operations - Tools",
	"Operations Center - Materials Control",
	"Operations Center - Planning & Scheduling",
	"Procurement and Material Management",
	"QA/QC",
	"Quality Management",
	"Treasury, Billing & Collection, Insurances & Bonds"
]

export const EmploymentStatus = ["REGULAR", "PROJECT EMPLOYEE"]

export const TaxExemption = ["SINGLE", "MARRIED"]
export const CivilStatus = ["SINGLE", "MARRIED"]

export const TITLES = element => [
	{
		key: "leave_type",
		label: "Leave Type",
		icon: <AssignmentTwoTone />
	},
	{
		key: "date_requested",
		label: "Date Requested",
		icon: <EventTwoTone />
	},
	{
		key: "employee_no",
		label: "Employee No.",
		icon: <BadgeTwoTone />
	},
	{
		key: "employee_name",
		label: "Employee Name",
		icon: <BadgeTwoTone />
	},
	{
		key: "date_from",
		label: "Date/Time From",
		icon: <DateRangeTwoTone />
	},
	{
		key: "date_to",
		label: "Date/Time To",
		icon: <DateRangeTwoTone />
	},
	{
		key: "reason",
		label: "Reason",
		icon: <SpeakerNotesTwoTone />
	},
	{
		key: "status",
		label: "Status",
		icon: (
			<PendingActionsTwoTone color={element === "Pending" ? "warning" : element === "Approve" ? "success" : "error"} />
		)
	},
	{
		key: "supervisor",
		label: "Supervisor",
		icon: <SupervisedUserCircleTwoTone />
	},
	{
		key: "date",
		label: "Date",
		icon: <EventTwoTone />
	},
	{
		key: "time_from",
		label: "Time From",
		icon: <AccessTimeTwoTone />
	},
	{
		key: "time_to",
		label: "Time To",
		icon: <AccessTimeTwoTone />
	},
	{
		key: "position",
		label: "Position",
		icon: <MilitaryTechTwoTone />
	},
	{
		key: "rank",
		label: "Rank",
		icon: <StarTwoTone />
	},
	{
		key: "division",
		label: "Division",
		icon: <LabelTwoTone />
	},
	{
		key: "department",
		label: "Department",
		icon: <LabelTwoTone />
	},
	{
		key: "designation",
		label: "Designation",
		icon: <LabelImportantTwoTone />
	},
	{
		key: "date_hired",
		label: "Date Hired",
		icon: <EventTwoTone />
	},
	{
		key: "yrs_in_service",
		label: "YEAR/S IN SERVICE",
		icon: <EventTwoTone />
	},
	{
		key: "employment_status",
		label: "EMPLOYMENT STATUS",
		icon: <PendingActionsTwoTone />
	},
	{
		key: "end_of_prob",
		label: "END OF PROBATIONARY",
		icon: <EventTwoTone />
	},
	{
		key: "contract_end_date",
		label: "Updated Contract End Date",
		icon: <EventTwoTone />
	},
	{
		key: "gender",
		label: "Gender",
		icon: <WcTwoTone />
	},
	{
		key: "birthdate",
		label: "BIRTHDATE",
		icon: <CakeTwoTone />
	},
	{
		key: "age",
		label: "Age",
		icon: <NumbersTwoTone />
	},
	{
		key: "tax_exemption",
		label: "Tax Exemption",
		icon: <AssuredWorkloadTwoTone />
	},
	{
		key: "contact_number",
		label: "Contact Number",
		icon: <PhoneTwoTone />
	},
	{
		key: "email",
		label: "Email Address",
		icon: <AlternateEmailTwoTone />
	},
	{
		key: "bdo_acc",
		label: "BDO ACCOUNT NO.",
		icon: <AccountBalanceTwoTone />
	},
	{
		key: "civil_status",
		label: "Civil Status",
		icon: <PersonTwoTone />
	},
	{
		key: "no_of_dependents",
		label: "NO. OF DEPENDENTS",
		icon: <GroupAddTwoTone />
	},
	{
		key: "sss",
		label: "SSS",
		icon: <AssuredWorkloadTwoTone />
	},
	{
		key: "philhealth",
		label: "PhilHealth",
		icon: <AssuredWorkloadTwoTone />
	},
	{
		key: "pagibig",
		label: "Pag-Ibig",
		icon: <AssuredWorkloadTwoTone />
	},
	{
		key: "tin",
		label: "TIN",
		icon: <AssuredWorkloadTwoTone />
	},
	{
		key: "address",
		label: "Address",
		icon: <HomeTwoTone />
	},
	{
		key: "course",
		label: "Course",
		icon: <SchoolTwoTone />
	},
	{
		key: "educational_attainment",
		label: "Educational Attainment",
		icon: <SchoolTwoTone />
	},
	{
		key: "date_of_school_attended",
		label: "SCHOOL ATTENDED",
		icon: <EventTwoTone />
	},
	{
		key: "licensure",
		label: "Licensure",
		icon: <CreditCardTwoTone />
	},
	{
		key: "prc_no",
		label: "PRC ID NO.",
		icon: <CreditCardTwoTone />
	},
	{
		key: "offense",
		label: "NOTICE/OFFENSE",
		icon: <GavelTwoTone />
	},
	{
		key: "audit",
		label: "201 Audit",
		icon: <VerifiedUserTwoTone />
	},
	{
		key: "remarks",
		label: "Remarks",
		icon: <CommentTwoTone />
	},
	{
		key: "coc_no",
		label: "COC NO.",
		icon: <NumbersTwoTone />
	},
	{
		key: "vacccine_status",
		label: "Vacccine Status",
		icon: <MedicalInformationTwoTone />
	},
	{
		key: "digital_bulletin",
		label: "Digital Bulletin",
		icon: <TagTwoTone />
	},
	{
		key: "viber_no",
		label: "Viber Number",
		icon: <PhoneTwoTone />
	},
	{
		key: "vpdc_email",
		label: "VPDC Email",
		icon: <AlternateEmailTwoTone />
	},
	{
		key: "emergency_contact",
		label: "Emergency Contact",
		icon: <ContactMailTwoTone />
	},
	{
		key: "emergency_address",
		label: "Emergency Address",
		icon: <HomeTwoTone />
	},
	{
		key: "emergency_no",
		label: "Emergency No.",
		icon: <PhoneTwoTone />
	}
]

export const Employees = [
	{
		id: 1121,
		employee_name: "ABNE, MARK JAYVEN LLANERA",
		employee_no: 1121,
		position: "PLANNING & SCHEDULING MANAGER",
		rank: "MANAGERIAL",
		division: "HEAD OFFICE",
		department: "Operations Center - Planning & Scheduling ",
		designation: "HEAD OFFICE",
		date_hired: "1-Jun-21",
		yrs_in_service: "1",
		employment_status: "REGULAR",
		end_of_prob: "1-Dec-21",
		contract_end_date: null,
		gender: "Male",
		birthdate: "27-Jun-92",
		age: "29",
		tax_exemption: "MARRIED",
		contact_number: "9064195953",
		email: "mjlabne@gmail.com",
		bdo_acc: null,
		civil_status: "MARRIED",
		no_of_dependents: null,
		sss: "3443240796",
		philhealth: "030255293113",
		pagibig: "121233972057",
		tin: "440996953",
		address: "11 Blk 13 Park Place Ave Park Place Village Cainta Rizal",
		course: "BS Civil Engineering",
		educational_attainment: "COLLEGE GRADUATE",
		date_of_school_attended: "2008-2013",
		licensure: "Civil Engineer",
		prc_no: null,
		offense: null,
		audit: null,
		remarks: null,
		coc_no: null,
		vacccine_status: "VACCINATED",
		digital_bulletin: "Member",
		viber_no: "639177080278",
		vpdc_email: "jayven.abne@vcdcph.com",
		emergency_contact: "Aubrey Q. Abne",
		emergency_address: "11 Block 13 Parkplace Avenue Parkplace Village, Cainta, Rizal",
		emergency_no: "9954887546"
	},
	{
		id: 2212,
		employee_name: "ABNE, MARK JAYVEN LLANERA",
		employee_no: 2212,
		position: "PLANNING & SCHEDULING MANAGER",
		rank: "MANAGERIAL",
		division: "HEAD OFFICE",
		department: "Operations Center - Planning & Scheduling ",
		designation: "HEAD OFFICE",
		date_hired: "1-Jun-21",
		yrs_in_service: "1",
		employment_status: "REGULAR",
		end_of_prob: "1-Dec-21",
		contract_end_date: null,
		gender: "Male",
		birthdate: "27-Jun-92",
		age: "29",
		tax_exemption: "MARRIED",
		contact_number: "9064195953",
		email: "mjlabne@gmail.com",
		bdo_acc: null,
		civil_status: "MARRIED",
		no_of_dependents: null,
		sss: "3443240796",
		philhealth: "030255293113",
		pagibig: "121233972057",
		tin: "440996953",
		address: "11 Blk 13 Park Place Ave Park Place Village Cainta Rizal",
		course: "BS Civil Engineering",
		educational_attainment: "COLLEGE GRADUATE",
		date_of_school_attended: "2008-2013",
		licensure: "Civil Engineer",
		prc_no: null,
		offense: null,
		audit: null,
		remarks: null,
		coc_no: null,
		vacccine_status: "VACCINATED",
		digital_bulletin: "Member",
		viber_no: "639177080278",
		vpdc_email: "jayven.abne@vcdcph.com",
		emergency_contact: "Aubrey Q. Abne",
		emergency_address: "11 Block 13 Parkplace Avenue Parkplace Village, Cainta, Rizal",
		emergency_no: "9954887546"
	}
]
