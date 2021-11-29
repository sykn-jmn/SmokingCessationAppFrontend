import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailychallengesComponent } from './dailychallenges.component';

describe('DailychallengesComponent', () => {
  let component: DailychallengesComponent;
  let fixture: ComponentFixture<DailychallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailychallengesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailychallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
