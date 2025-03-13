import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesBrigadeComponent } from './listes-brigade.component';

describe('ListesBrigadeComponent', () => {
  let component: ListesBrigadeComponent;
  let fixture: ComponentFixture<ListesBrigadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListesBrigadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesBrigadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
