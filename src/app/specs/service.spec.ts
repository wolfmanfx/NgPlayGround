import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { async, fakeAsync, TestBed } from "@angular/core/testing"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Observable, of, from } from "rxjs"
import { delay } from "rxjs/operators"
import { Flight } from "../entities/flight"
import { FlightCardComponent } from "../flight-booking/flight-card/flight-card.component"
import { FlightSearchComponent } from "../flight-booking/flight-search/flight-search.component"
import { DefaultFlightService, DummyFlightService, FlightService } from "../flight-booking/flight-search/flight.service"
import { FLIGHT_API_URL } from "../flight-booking/flight.tokens"


class MockFlightService {
    find(from: string, to: string): Observable<Flight[]> {
        return of([
            {
                id: 1,
                from: 'Graz',
                to: 'Hamburg',
                date: '2020-01-01T17:00',
                delayed: false
            }
        ]) as Observable<Flight[]>;
    }
}

describe('FlightSearchComponent', () => {
    let flighService: FlightService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule,
                HttpClientTestingModule],
            declarations: [FlightSearchComponent],
            providers: [{ provide: FlightService, useClass: DefaultFlightService },
            { provide: FLIGHT_API_URL, useValue: 'http://fake' }]
        }).compileComponents();

        flighService = TestBed.inject(FlightService);
    }))


    it('should call flight service find', fakeAsync(() => {
        let fixture = TestBed.createComponent(FlightSearchComponent);
        fixture.detectChanges();


        //let spy = spyOn(flighService, 'find').and.callThrough();

        let spy = spyOn(flighService, 'find').and.returnValue(of([]));

        fixture.componentInstance.from = 'Graz';
        fixture.componentInstance.to = 'Hamburg';
        fixture.componentInstance.search();

        /*
        let httpController = TestBed.inject(HttpTestingController);
        let req = httpController.expectOne('http://fake?from=Graz&to=Hamburg');
        req.flush([{ id: 122, from: 'Graz', to: 'Hamburg', delayed: false, date: '' }]);
*/
        //req.error(new ErrorEvent('network error'));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(fixture.componentInstance.flights.length).toBe(0);
    }))
})
