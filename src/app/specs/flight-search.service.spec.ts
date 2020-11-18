

// This is a test suite for testing a service as an isolated test

import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { async, fakeAsync, TestBed } from "@angular/core/testing";
import { throwError } from "rxjs";
import { DefaultFlightService, FlightService } from "../flight-booking/flight-search/flight.service";


describe('The flight service should', () => {
    let flightApi: FlightService;
    let http: HttpClient;
    let httpMock: HttpTestingController;
    const url = 'http://www.angular.at/api/flight';

    beforeAll(() => {
        // Global setup
    });

    afterAll(() => {
        // Global teardown
    });

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [],
            providers: [{ provide: FlightService, useClass: DefaultFlightService }]
        });

        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
        flightApi = TestBed.inject(FlightService);
    });

    it('call success with an empty result set', async(() => {
        let from = "noop";
        let to = "noop";

        flightApi.find(from, to).subscribe(
            (flights) => {
                expect(flights.length).toBe(0);
            },
            (err) => {
                throwError('Error ' + err);
            }
        );

        const req = httpMock.expectOne(url + `?from=${from}&to=${to}`);
        expect(req.request.method).toBe('GET');
        req.flush([]);
    }));

    it('call', fakeAsync(() => {
        
    }));

    afterEach(() => {
        httpMock.verify();
    });
});