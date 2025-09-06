import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddFeedbackComponent } from './user-add-feedback.component';

describe('UserAddFeedbackComponent', () => {
  let component: UserAddFeedbackComponent;
  let fixture: ComponentFixture<UserAddFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
