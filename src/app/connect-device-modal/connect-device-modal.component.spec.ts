import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectDeviceModalComponent } from './connect-device-modal.component';

describe('ConnectDeviceModalComponent', () => {
  let component: ConnectDeviceModalComponent;
  let fixture: ComponentFixture<ConnectDeviceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectDeviceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
