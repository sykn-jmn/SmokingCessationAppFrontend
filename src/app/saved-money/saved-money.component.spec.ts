import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedMoneyComponent } from './saved-money.component';

describe('SavedMoneyComponent', () => {
  let component: SavedMoneyComponent;
  let fixture: ComponentFixture<SavedMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
