import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewRequirementComponent } from './admin-view-requirement.component';

describe('AdminViewRequirementComponent', () => {
  let component: AdminViewRequirementComponent;
  let fixture: ComponentFixture<AdminViewRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewRequirementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
