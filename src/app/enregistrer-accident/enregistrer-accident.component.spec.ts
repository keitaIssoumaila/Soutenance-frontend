import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerAccidentComponent } from './enregistrer-accident.component';

describe('EnregistrerAccidentComponent', () => {
  let component: EnregistrerAccidentComponent;
  let fixture: ComponentFixture<EnregistrerAccidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnregistrerAccidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnregistrerAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
