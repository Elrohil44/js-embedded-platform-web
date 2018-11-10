import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceLocationsListComponent } from './device-locations-list.component';

describe('DeviceLocationsListComponent', () => {
  let component: DeviceLocationsListComponent;
  let fixture: ComponentFixture<DeviceLocationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceLocationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceLocationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
