import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifBrigadeComponent } from './modif-brigade.component';

describe('ModifBrigadeComponent', () => {
  let component: ModifBrigadeComponent;
  let fixture: ComponentFixture<ModifBrigadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifBrigadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifBrigadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
