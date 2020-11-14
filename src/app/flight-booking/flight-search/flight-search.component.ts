import { Component, Inject, OnInit } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { FlightService, DummyFlightService } from './flight.service';
import { Flight } from '../../entities/flight';
import { FLIGHT_API_URL } from '../flight.tokens';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  providers: [
    // { provide: FlightService, useClass: DummyFlightService }
  ]
})
export class FlightSearchComponent implements OnInit {

  from: string;
  to: string;
  flights: Array<Flight> = [];
  selectedFlight: Flight;

  basket: object = {
    "3": true,
    "5": true
  };

  // private http: HttpClient;

  constructor(private flightService: FlightService,
    private http: HttpClient, @Inject(FLIGHT_API_URL) private apiUrl: string) {
  }

  ngOnInit() { // "OnLoad"
  }

  search(): void {
    // this.flights = [
    //   { id: 1, from: 'Graz', to: 'Frankfurt', date: '2019-09-23T18:00+02:00', delayed: true },
    //   { id: 2, from: 'Frankfurt', to: 'Flagranti', date: '2019-09-23T19:00+02:00', delayed: true },
    //   { id: 3, from: 'Frankfurt', to: 'Kognito', date: '2019-09-23T20:00+02:00', delayed: true },
    //   { id: 4, from: 'Frankfurt', to: 'Mallorca', date: '2019-09-23T18:00+02:00', delayed: true }
    // ];

    //Demo 2
    const httpParams = new HttpParams().set('from', this.from).set('to', this.to);
    const headers = new HttpHeaders().set('Accept', 'application/json');

    /*
    this.http.get<Flight[]>(this.apiUrl, { params: httpParams, headers: headers })
      .subscribe(
        flights => {
          this.flights = flights;
        },
        err => {
          console.error(err);
        })

*/

/*
    this.http.get(this.apiUrl, { observe: 'response', responseType: 'text', params: httpParams, headers: headers})
      .subscribe(resp => {
        console.log(resp.body);
        return JSON.parse(resp.body)
      });

      */
  
    /*
      this.flightService.find(this.from, this.to).subscribe(
        flights => { this.flights = flights; },
        err => console.error('err', err)
      );
    */
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

}
