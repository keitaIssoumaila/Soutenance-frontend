import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerBrigadeComponent } from './enregistrer-brigade.component';

describe('EnregistrerBrigadeComponent', () => {
  let component: EnregistrerBrigadeComponent;
  let fixture: ComponentFixture<EnregistrerBrigadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnregistrerBrigadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnregistrerBrigadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
