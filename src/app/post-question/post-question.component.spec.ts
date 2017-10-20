import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostQuestionComponent } from './post-question.component';

describe('PostQuestionComponent', () => {
  let component: PostQuestionComponent;
  let fixture: ComponentFixture<PostQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
