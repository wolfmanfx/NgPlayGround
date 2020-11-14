import { InjectionToken } from "@angular/core";

export const FLIGHT_API_URL = new InjectionToken<string>('FLIGHT_API_URL', {
    providedIn: 'root', factory: () => 'http://www.angular.at/api/flight'});