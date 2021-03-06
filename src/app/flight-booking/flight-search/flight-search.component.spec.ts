import { ComponentFixture, fakeAsync, getTestBed, inject, async, TestBed } from '@angular/core/testing';
import { FlightSearchComponent } from './flight-search.component';
import { Observable, of } from 'rxjs';
import { Flight } from '../../entities/flight';
import { DefaultFlightService, FlightService } from './flight.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { FLIGHT_API_URL } from '../flight.tokens';
import { exception } from 'console';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { CityPipe } from '../../shared/pipes/city.pipe';
import { MockComponent, MockPipe } from 'ng-mocks';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockFlightService = {
  find(from: string, to: string): Observable<Flight[]> {
    return of([]);
  }
};

// https://codesandbox.io/s/github/ng-mocks/examples?file=/src/test.spec.ts




// ng-mocks https://www.npmjs.com/package/ng-mocks
// const testModuleMeta = ngMocks.guts(ComponentIWantToTest, [ComponentsIwantToMock]);
// TestBed.configureTestingModule(testModuleMeta);

describe('FlightSearchComponent should find ', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [
        FlightSearchComponent,
        MockComponent(FlightCardComponent),
        MockPipe(CityPipe)
      ],
      providers: [
        {
          provide: FlightService,
          useClass: DefaultFlightService
        },
        {
          provide: FLIGHT_API_URL,
          useValue: "http://fakebackend/flight/api"
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    //.compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('a flight from graz to linz', () => {
    const dummyFlights: Flight[] = [
      {
        id: 100,
        from: 'Graz',
        to: 'Linz',
        date: new Date().toISOString(),
        delayed: false
      },
    ];

    component.from = "Graz";
    component.to = "Linz";
    component.search();

    const req = httpMock.expectOne('http://fakebackend/flight/api?from=Graz&to=Linz');
    expect(req.request.method).toBe("GET");
    req.flush(dummyFlights);

    expect(component.flights).toContain(dummyFlights[0]);
  })

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
