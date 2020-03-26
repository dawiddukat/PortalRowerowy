/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellBicycleLikeComponent } from './sellBicycleLike.component';

describe('SellBicycleLikeComponent', () => {
  let component: SellBicycleLikeComponent;
  let fixture: ComponentFixture<SellBicycleLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellBicycleLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellBicycleLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

