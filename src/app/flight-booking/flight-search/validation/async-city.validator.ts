import { Directive } from "@angular/core";
import { NG_ASYNC_VALIDATORS, AbstractControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { FlightService } from "../flight.service";

@Directive({
    selector: 'input[async-city]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: AsyncCityValidatorDirective,
            multi: true
        }]
})
export class AsyncCityValidatorDirective {

    constructor(private flightService: FlightService) {

    }
    validate(ctrl: AbstractControl): Observable<any> {
        return this.flightService.find('Graz', 'Hamburg')
            .pipe(
                map((flights) => {
                    return flights.length > 2 ?
                        {} :
                        { 'async-city': false };
                })
            );
    }

}