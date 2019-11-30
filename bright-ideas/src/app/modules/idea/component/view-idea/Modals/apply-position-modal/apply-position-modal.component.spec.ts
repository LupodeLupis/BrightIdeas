import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyPositionModalComponent } from './apply-position-modal.component';

describe('ApplyPositionModalComponent', () => {
  let component: ApplyPositionModalComponent;
  let fixture: ComponentFixture<ApplyPositionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyPositionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyPositionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
