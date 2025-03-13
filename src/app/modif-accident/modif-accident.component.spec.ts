import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifAccidentComponent } from './modif-accident.component';

describe('ModifAccidentComponent', () => {
  let component: ModifAccidentComponent;
  let fixture: ComponentFixture<ModifAccidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifAccidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
