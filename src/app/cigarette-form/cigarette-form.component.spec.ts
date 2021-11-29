import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CigaretteFormComponent } from './cigarette-form.component';

describe('CigaretteFormComponent', () => {
  let component: CigaretteFormComponent;
  let fixture: ComponentFixture<CigaretteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CigaretteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CigaretteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
