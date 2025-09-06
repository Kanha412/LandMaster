import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewRequirementComponent } from './user-view-requirement.component';

describe('UserViewRequirementComponent', () => {
  let component: UserViewRequirementComponent;
  let fixture: ComponentFixture<UserViewRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewRequirementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
