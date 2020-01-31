/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellBicyclesComponent } from './sellbicycles.component';

describe('SellbicyclesComponent', () => {
  let component: SellBicyclesComponent;
  let fixture: ComponentFixture<SellBicyclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellBicyclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellBicyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
