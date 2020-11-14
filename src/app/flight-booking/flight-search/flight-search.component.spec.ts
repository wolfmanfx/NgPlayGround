import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FlightSearchComponent } from './flight-search.component';
import { Observable, of } from 'rxjs';
import { Flight } from '../../entities/flight';
import { FlightService } from './flight.service';

const mockFlightService = {
  find(from: string, to: string): Observable<Flight[]> {
    return of([]);
  }
};

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FlightSearchComponent],
      providers: [
        {
          provide: FlightService,
          useValue: mockFlightService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
