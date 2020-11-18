import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightBookingComponent } from './flight-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { SharedModule } from '../shared/shared.module';
import { FlightService, DefaultFlightService } from './flight-search/flight.service';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { RouterModule } from '@angular/router';
import { FLIGHT_ROUTES } from './flight-book.routes';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './noop.interceptor';
import { ForbiddenCityValidator } from './flight-search/validation/forbidden-city.validator';
import { CycleFlightValidator } from './flight-search/validation/cycle-flight.validator';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(FLIGHT_ROUTES)
  ],
  declarations: [
    FlightBookingComponent,
    FlightSearchComponent,
    FlightCardComponent,
    PassengerSearchComponent,
    ForbiddenCityValidator,
    CycleFlightValidator
  ],
  providers: [
    {
      provide: FlightService,
      useClass: DefaultFlightService,
      // useFactory: (http: HttpClient) => {
      //    if (DEBUG) {
      //       return new DummyFlightService(null);
      //    } else {
      //       return new DefaultFlightService(http);
      //    }
      // },
      // deps: [HttpClient]
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: NoopInterceptor
    }
  ],
  exports: [
    FlightSearchComponent
  ]
})
export class FlightBookingModule { }
