import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPasswordComponent } from './setup-password.component';

describe('SetupPasswordComponent', () => {
  let component: SetupPasswordComponent;
  let fixture: ComponentFixture<SetupPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
