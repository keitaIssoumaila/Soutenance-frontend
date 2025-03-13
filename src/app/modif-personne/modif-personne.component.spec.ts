import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifPersonneComponent } from './modif-personne.component';

describe('ModifPersonneComponent', () => {
  let component: ModifPersonneComponent;
  let fixture: ComponentFixture<ModifPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifPersonneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
