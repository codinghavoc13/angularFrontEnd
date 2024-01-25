import { Assignment } from "./assignment";

export class AssignmentDto {
    teacherId: number | undefined;
    assignments: Assignment[] = [];
    public constructor(init?: Partial<AssignmentDto>){
        Object.assign(this,init);
    }
}
