/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SellBicycleService } from './sellbicycle.service';

describe('Service: SellBicycle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellBicycleService]
    });
  });

  it('should ...', inject([SellBicycleService], (service: SellBicycleService) => {
    expect(service).toBeTruthy();
  }));
});
