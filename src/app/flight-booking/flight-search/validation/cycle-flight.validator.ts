import { Directive, Input } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator, ValidatorFn, FormGroup, NG_VALIDATORS } from "@angular/forms";

export function cycleFlightValidatorFn(fromName: string, toName: string) : ValidatorFn {
    return (form: FormGroup) : ValidationErrors | null => {
        if(form.controls[fromName].valid && form.controls[toName].valid &&
            form.controls[fromName].value === form.controls[toName].value) {
            return {cycleFlight: {value: form.controls[fromName].value}};
        }
        return null;
    }
}


@Directive({
    selector: '[cycleFlight]',
    providers: [{provide: NG_VALIDATORS, useExisting: CycleFlightValidator, multi: true}]
})
export class CycleFlightValidator implements Validator {
    @Input() srcCtrlName;
    @Input() targetCtrlName;

    validate(form: AbstractControl): ValidationErrors | null {
        if(this.srcCtrlName && this.targetCtrlName) {
            return cycleFlightValidatorFn(this.srcCtrlName, this.targetCtrlName)(form);
        }
        return null;
    }

}