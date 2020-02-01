/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellBicycleListComponent } from './sellbicycle-list.component';

describe('SellBicycleListComponent', () => {
  let component: SellBicycleListComponent;
  let fixture: ComponentFixture<SellBicycleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellBicycleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellBicycleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
