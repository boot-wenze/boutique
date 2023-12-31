import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalisationComponent } from './finalisation.component';

describe('FinalisationComponent', () => {
  let component: FinalisationComponent;
  let fixture: ComponentFixture<FinalisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalisationComponent]
    });
    fixture = TestBed.createComponent(FinalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
