import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifVehiculeComponent } from './modif-vehicule.component';

describe('ModifVehiculeComponent', () => {
  let component: ModifVehiculeComponent;
  let fixture: ComponentFixture<ModifVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifVehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
