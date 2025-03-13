import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerPersonneComponent } from './enregistrer-personne.component';

describe('EnregistrerPersonneComponent', () => {
  let component: EnregistrerPersonneComponent;
  let fixture: ComponentFixture<EnregistrerPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnregistrerPersonneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnregistrerPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
