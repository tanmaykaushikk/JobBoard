import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/sidebar/sidebar';
import { JobCard } from './components/job-card/job-card';
import { JobDetails } from './components/job-details/job-details';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    Navbar,
    Sidebar,
    JobCard,
    JobDetails
  ],
  imports: [
    CommonModule,
    NgIf,
    RouterModule,
    HttpClientModule
  ],
  exports:[
    Navbar,
    Sidebar,
    JobCard,
    JobDetails
  ]
})
export class SharedModule { }
