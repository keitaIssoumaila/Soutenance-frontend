import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerLieuxComponent } from './enregistrer-lieux.component';

describe('EnregistrerLieuxComponent', () => {
  let component: EnregistrerLieuxComponent;
  let fixture: ComponentFixture<EnregistrerLieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnregistrerLieuxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnregistrerLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
