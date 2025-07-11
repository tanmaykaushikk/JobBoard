import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'app-job-details',
  standalone: false,
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss'
})
export class JobDetails implements OnInit {
  job:any;
  loading = true;
  error = '';
  isApplied = false;
  isSaved = false;

  constructor(private route:ActivatedRoute,private jobService:JobService){}

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    console.log("Job Id from route",jobId);

    if(jobId){
      this.jobService.getJobById(jobId).subscribe({
        next:(data:any)=>{
          this.job = data.job
          this.isApplied = data.isApplied;
          this.isSaved = data.isSaved;
          console.log("dataa",data)
          this.loading = false;
        },
        error:(error)=>{
          this.error = "Job not found or faied to fetch the details.";
          this.loading = false;
        }
      });
    }
  }

  handleApply():void{
    const jobId = this.route.snapshot.paramMap.get('id');
    console.log("Job Id from route for job apply",jobId);

    if(jobId){
      this.jobService.applyJob(jobId).subscribe({
        next:(res)=>{
          console.log("job applied response", res);
          this.isApplied = true;
        },
        error:(error)=>{
          this.error = "Job not found or faied to fetch the details.";
          this.loading = false;
        }
      })
    } 
  }

    handleSave():void{
    const jobId = this.route.snapshot.paramMap.get('id');
    console.log("Job Id from route for job save",jobId);

    if(jobId){
      this.jobService.saveJob(jobId).subscribe({
        next:(res)=>{
          console.log("job saved response", res);
          this.isSaved = true;
        },
        error:(error)=>{
          this.error = "Job not found or faied to fetch the details.";
          this.loading = false;
        }
      })
    } 
  }

}
