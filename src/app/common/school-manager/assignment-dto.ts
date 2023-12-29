import { Assignment } from "./assignment";

export class AssignmentDto {
    teacher_id: number | undefined;
    assignments: Assignment[] = [];
    public constructor(init?: Partial<AssignmentDto>){
        Object.assign(this,init);
    }
}
