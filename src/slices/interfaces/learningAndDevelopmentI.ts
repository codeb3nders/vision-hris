export interface LearningAndDevelopmentI {
    employeeNo: string;
    isAttended: boolean;
    courseTitle: string;
    institution: string;
    venue: string;
    startDate: Date;
    endDate: Date;
    status: "Done" | "Ongoing" | "Not Started";
    bondLength: number;
    bondStartDate: Date;
    bondEndDate: Date;
    
}