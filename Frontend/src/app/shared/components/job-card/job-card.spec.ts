import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCard } from './job-card';

describe('JobCard', () => {
  let component: JobCard;
  let fixture: ComponentFixture<JobCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
