import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesPersonnesComponent } from './listes-personnes.component';

describe('ListesPersonnesComponent', () => {
  let component: ListesPersonnesComponent;
  let fixture: ComponentFixture<ListesPersonnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListesPersonnesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesPersonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
