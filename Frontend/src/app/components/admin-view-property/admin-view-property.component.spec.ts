import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewPropertyComponent } from './admin-view-property.component';

describe('AdminViewPropertyComponent', () => {
  let component: AdminViewPropertyComponent;
  let fixture: ComponentFixture<AdminViewPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
