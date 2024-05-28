import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteformComponent } from './quoteform.component';

describe('QuoteformComponent', () => {
  let component: QuoteformComponent;
  let fixture: ComponentFixture<QuoteformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
