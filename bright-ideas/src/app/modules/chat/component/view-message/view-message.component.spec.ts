import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMessageComponent } from './view-message.component';
import { HttpClientModule } from '@angular/common/http';

describe('ViewMessageComponent', () => {
  let component: ViewMessageComponent;
  let fixture: ComponentFixture<ViewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ViewMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
