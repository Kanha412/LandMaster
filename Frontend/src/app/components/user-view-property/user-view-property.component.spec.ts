import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewPropertyComponent } from './user-view-property.component';

describe('UserViewPropertyComponent', () => {
  let component: UserViewPropertyComponent;
  let fixture: ComponentFixture<UserViewPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
