import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasFromMemberComponent } from './ideas-from-member.component';

describe('IdeasFromMemberComponent', () => {
  let component: IdeasFromMemberComponent;
  let fixture: ComponentFixture<IdeasFromMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeasFromMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasFromMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
