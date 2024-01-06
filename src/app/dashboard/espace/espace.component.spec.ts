import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceComponent } from './espace.component';

describe('EspaceComponent', () => {
  let component: EspaceComponent;
  let fixture: ComponentFixture<EspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspaceComponent]
    });
    fixture = TestBed.createComponent(EspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
