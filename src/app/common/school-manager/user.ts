export interface User {
    staff_id: number,
    firstname: string,
    lastname: string,
    role: string,
    username: string,
    // passwordHash: string,
    // passwordSalt: string,
    emailString: string,
    phoneString: string,
    schoolStudentId: string,
    gradeLevel: string
}