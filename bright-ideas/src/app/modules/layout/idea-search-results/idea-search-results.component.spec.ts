import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaSearchResultsComponent } from './idea-search-results.component';

describe('IdeaSearchResultsComponent', () => {
  let component: IdeaSearchResultsComponent;
  let fixture: ComponentFixture<IdeaSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
