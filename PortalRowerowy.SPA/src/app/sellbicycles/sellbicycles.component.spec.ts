/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellbicyclesComponent } from './sellbicycles.component';

describe('SellbicyclesComponent', () => {
  let component: SellbicyclesComponent;
  let fixture: ComponentFixture<SellbicyclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellbicyclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellbicyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
