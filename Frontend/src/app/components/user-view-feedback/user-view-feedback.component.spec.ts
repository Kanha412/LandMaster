import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewFeedbackComponent } from './user-view-feedback.component';

describe('UserViewFeedbackComponent', () => {
  let component: UserViewFeedbackComponent;
  let fixture: ComponentFixture<UserViewFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
