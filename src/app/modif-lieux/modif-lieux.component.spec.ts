import { ComponentFixture, TestBed } from '@angular/core/testing';

import { modifLieuxComponent } from './modif-lieux.component';

describe('ModifLieuxComponent', () => {
  let component: modifLieuxComponent;
  let fixture: ComponentFixture<modifLieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [modifLieuxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(modifLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
