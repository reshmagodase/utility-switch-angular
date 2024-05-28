import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffsComponent } from './tariffs.component';

describe('TariffsComponent', () => {
  let component: TariffsComponent;
  let fixture: ComponentFixture<TariffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TariffsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
