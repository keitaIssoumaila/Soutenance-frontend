import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesLieuxComponent } from './listes-lieux.component';

describe('ListesLieuxComponent', () => {
  let component: ListesLieuxComponent;
  let fixture: ComponentFixture<ListesLieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListesLieuxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
