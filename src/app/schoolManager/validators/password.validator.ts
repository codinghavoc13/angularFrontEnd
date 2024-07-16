import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
): ValidationErrors | null => {
    return control.value.pw1 === control.value.pw2 
    ? null 
    : {PasswordNoMatch: true};
};