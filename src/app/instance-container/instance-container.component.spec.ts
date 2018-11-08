import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceContainerComponent } from './instance-container.component';

describe('InstanceContainerComponent', () => {
  let component: InstanceContainerComponent;
  let fixture: ComponentFixture<InstanceContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
