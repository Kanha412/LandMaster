import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddRequirementComponent } from './admin-add-requirement.component';

describe('AdminAddRequirementComponent', () => {
  let component: AdminAddRequirementComponent;
  let fixture: ComponentFixture<AdminAddRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddRequirementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
