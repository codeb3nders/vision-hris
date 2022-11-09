export interface TimekeepingLogI {
    period: string;
    total_record: number;
    dateUploaded: Date;
    total_verified: number;
}

export interface TimekeepingI {
    id: string;
    timestamp: number;
    periodStartDate: Date;
    periodEndDate: Date;
    verificationDueDate: Date;
    employeeName: string;
    employeeNo?: string;
    date: Date;
    day: string;
    holidayType?: string;
    shift: string;
    in1?: string;
    out1?: string;
    in2?: string;
    out2?: string;
    regHours?: string;
    lateMins?: string;
    utMins?: string;
    absentHrs?: string;
    otHrs?: string;
    ndiffHrs?: string;
    ndiffOTHrs?: string;
    remarks?: string;
    verified?: boolean;
    dateVerified?: Date;
}