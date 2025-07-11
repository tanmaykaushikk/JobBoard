import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './dashboard/dashboard';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';
import { JobList } from './job-list/job-list';





@NgModule({
  declarations: [
    Dashboard,
    JobList,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ]
})
export class DashboardModule { }
