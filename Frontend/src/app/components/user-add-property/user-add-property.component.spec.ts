import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddPropertyComponent } from './user-add-property.component';

describe('UserAddPropertyComponent', () => {
  let component: UserAddPropertyComponent;
  let fixture: ComponentFixture<UserAddPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
