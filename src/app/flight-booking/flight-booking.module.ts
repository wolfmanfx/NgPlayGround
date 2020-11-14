import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightBookingComponent } from './flight-booking.component';
import { FormsModule } from '@angular/forms';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { SharedModule } from '../shared/shared.module';
import { FlightService, DefaultFlightService } from './flight-search/flight.service';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { RouterModule } from '@angular/router';
import { FLIGHT_ROUTES } from './flight-book.routes';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(FLIGHT_ROUTES)
  ],
  declarations: [
    FlightBookingComponent,
    FlightSearchComponent,
    FlightCardComponent,
    PassengerSearchComponent
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
    }
 ],
  exports: [
    FlightSearchComponent
  ]
})
export class FlightBookingModule { }