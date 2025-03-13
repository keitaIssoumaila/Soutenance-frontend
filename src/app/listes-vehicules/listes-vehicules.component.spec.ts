import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesVehiculesComponent } from './listes-vehicules.component';

describe('ListesVehiculesComponent', () => {
  let component: ListesVehiculesComponent;
  let fixture: ComponentFixture<ListesVehiculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListesVehiculesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesVehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
