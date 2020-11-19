import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { FLIGHT_API_URL } from './flight-booking/flight.tokens';
const DEBUG = false;

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      FlightBookingModule,

   ],
   declarations: [
      AppComponent,
      SidebarComponent,
      NavbarComponent,
      HomeComponent
   ],
   providers: [{
      provide: FLIGHT_API_URL, useValue: 'http://www.angular.at/api/flight'
   }],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
