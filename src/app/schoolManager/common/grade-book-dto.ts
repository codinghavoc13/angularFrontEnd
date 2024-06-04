import { IndividualGradeDTO } from "./individual-grade-dto";
import { WeekStartStopDto } from "./week-start-stop-dto";

export class GradeBookDTO{
    constructor(
        public assignmentTypes: string[],
        public courseNames: string[],
        public weeks: WeekStartStopDto[],
        public gradeDtos: IndividualGradeDTO[],
        public periods: number[]
    ){}
}