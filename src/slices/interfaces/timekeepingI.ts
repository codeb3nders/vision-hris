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
    details: any[]
}