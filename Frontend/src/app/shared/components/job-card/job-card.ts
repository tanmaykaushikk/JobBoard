import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-card',
  standalone: false,
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss'
})
export class JobCard {
  @Input() job: any = {};

  constructor(private router:Router){}

  ngOnInit(){
    console.log("jobs",this.job)
  }
}
