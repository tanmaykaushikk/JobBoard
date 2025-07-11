import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-create-job',
  standalone: false,
  templateUrl: './create-job.html',
  styleUrls: ['./create-job.scss']
})
export class CreateJob implements OnInit {

  activeTab: string = 'jobs';
  jobs: any[] = [];
  filteredJobs: any[] = [];
  loading = true;
  error = "";

  jobForm !: FormGroup

  constructor(private fb: FormBuilder, private jobService: JobService) { }



  ngOnInit(): void {
    this.initForm();
    this.loadJobs();
  }

  showTab(tab: string): void {
    this.activeTab = tab;
  }

  initForm() {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      companyName: ['', Validators.required],
      description: ['', Validators.required],
      location: [''],
      employmentType: ['full-time'],
      salary: [''],
      currency: ['INR'],
      requirements: this.fb.array([this.fb.control('')])
    });
  }


  get requirements() {
    return this.jobForm.get('requirements') as FormArray;
  }

  addRequirement() {
    this.requirements.push(this.fb.control(''));
  }

  removeRequirement(index: number) {
    this.requirements.removeAt(index);
  }

  onSubmit(): void {
    if (this.jobForm.invalid) return;

    this.jobService.createJob(this.jobForm.value).subscribe({
      next: (res) => {
        console.log("responseeeeeee", res)
        alert("Job Posted Successfully!");
        this.jobForm.reset();
        this.requirements.clear();
        this.requirements.push(this.fb.control(''));
      },
      error: (err) => {
        console.log("Error", err);
        alert('Failed to post a Job. Please try again.')
      }
    });
  }

  loadJobs() {
    this.loading = false;
    this.error = '';
    this.jobs = [];

    this.jobService.getJobs().subscribe({
      next: (res: any) => {
        this.jobs = res.job;
        this.filteredJobs = res.job;
        this.loading = false;
        console.log("response", res)
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load jobs.';
        this.loading = false;
      }
    })
  }

  trackByJobId(index: number, job: any) {
    return job.id;
  }

}
