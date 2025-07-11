import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateJob } from './create-job/create-job';
import { JobCard } from '../shared/components/job-card/job-card';
import { SharedModule } from '../shared/shared-module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateJob
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  
})
export class RecruiterModule { }
