import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, TestBed, ComponentFixture, fakeAsync, tick, flush } from "@angular/core/testing"
import { MockPipe, ngMocks } from "ng-mocks";
import { Flight } from "../entities/flight";
import { FlightCardComponent } from "../flight-booking/flight-card/flight-card.component";
import { CityPipe } from "../shared/pipes/city.pipe";

describe('FlightCard', () => {
    let fixture: ComponentFixture<FlightCardComponent>;
    let spyFlight: Flight;

    beforeEach(async(() => {
        // ngMocks
        //const testModuleMeta = ngMocks.guts(FlightCardComponent, [CityPipe]);
        //TestBed.configureTestingModule(testModuleMeta).compileComponents();
        
        TestBed.configureTestingModule({
            declarations: [
                FlightCardComponent,
                MockPipe(CityPipe)
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        

        spyFlight = {
            id: 0,
            from: 'Graz',
            to: 'Wien',
            date: '2020-01-01T17:00Z',
            delayed: false
        };

        fixture = TestBed.createComponent(FlightCardComponent);
        fixture.componentInstance.item = spyFlight;
        fixture.detectChanges();
    }))


    it('should emit true when we trigger select', fakeAsync(() => {
        fixture.componentInstance.selectedChange.subscribe((ev) => {
            expect(ev).toBeTruthy();
        });
        
        fixture.componentInstance.select();
        
        tick();
    }))
})