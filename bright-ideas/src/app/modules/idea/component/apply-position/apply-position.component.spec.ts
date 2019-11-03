import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyPositionComponent } from './apply-position.component';

describe('ApplyPositionComponent', () => {
  let component: ApplyPositionComponent;
  let fixture: ComponentFixture<ApplyPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
