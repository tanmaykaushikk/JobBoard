import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  standalone: false,
  templateUrl: './job-list.html',
  styleUrl: './job-list.scss'
})

export class JobList implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  loading = true;
  error = "";

  selectedMode: string = '';
  selectedSort: string = '';

  constructor(private jobService:JobService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe({
      next: (data: any) => {
        this.jobs = data?.job;
        this.filteredJobs = [...this.jobs];
        console.log("data", data?.data);
        this.loading = false;

        this.searchService.searchTerm$.subscribe((term) => {
          this.applyAllFilters(term);
        })
      },
      error: (err) => {
        this.error = 'Failed to fetch jobs. Please try again later.';
        this.loading = false;
      }
    });
  }


  applyAllFilters(searchTerm: string = ''): void {
    let tempJobs = [...this.jobs];

    if (searchTerm) {
      tempJobs = tempJobs.filter(job => job.jobTitle.toLowerCase().includes(searchTerm))
    }

    if (this.selectedMode) {
      tempJobs = tempJobs.filter(job => job.modeOfJob === this.selectedMode);
    }

    if (this.selectedSort === "high") {
      tempJobs.sort((a, b) => b.package - a.package);
    } else if (this.selectedSort === "low") {
      tempJobs.sort((a, b) => a.package - b.package);
    }

    this.filteredJobs = tempJobs;
  }


  onModeChange(mode: string): void {
    this.selectedMode = mode;
    this.searchService.searchTerm$.subscribe(term => {
      this.applyAllFilters(term);
    })
  }

  onSortChange(sort: string): void {
    this.selectedSort = sort;
    this.searchService.searchTerm$.subscribe(term => {
      this.applyAllFilters(term);
    }

    )
  }
}
