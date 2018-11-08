import { TestBed } from '@angular/core/testing';

import { DeviceLocationService } from './device-location.service';

describe('DeviceLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceLocationService = TestBed.get(DeviceLocationService);
    expect(service).toBeTruthy();
  });
});
