/* tslint:disable:no-unused-variable */
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlightCardComponent } from './flight-card.component';
import { MockPipe } from 'ng-mocks';
import { CityPipe } from '../../shared/pipes/city.pipe';

describe('FlightCardComponent', () => {
  let component: FlightCardComponent;
  let fixture: ComponentFixture<FlightCardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        FlightCardComponent,
        MockPipe(CityPipe)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCardComponent);
    component = fixture.componentInstance;
    component.item = {
      id: 1,
      from: 'Graz',
      to: 'Hamburg',
      date: new Date().toISOString(),
      delayed: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
