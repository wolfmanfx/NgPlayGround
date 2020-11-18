import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";


export function forbiddenCityValidatorFn(city: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(control.value === city) {
            return {forbiddenCity: {value: control.value}};
        }
        return null;
    }
}

@Directive({
    selector: '[forbiddenCity]',
    providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenCityValidator, multi: true}]
})
export class ForbiddenCityValidator implements Validator {
    @Input('forbiddenCityName') forbiddenName: string;
    validate(control: AbstractControl): ValidationErrors | null {
        return this.forbiddenName ? 
        forbiddenCityValidatorFn(this.forbiddenName)(control)
            : null;
    }
}
