
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthForm } from './auth/auth-form/auth-form';
import { Dashboard } from './dashboard/dashboard/dashboard';
import { JobList } from './dashboard/job-list/job-list';
import { JobDetails } from './shared/components/job-details/job-details';
import { CreateJob } from './recruiter/create-job/create-job';

const routes: Routes = [
  { path: "", component: AuthForm, },
  {
    path:'dashboard',
    component:Dashboard,
    children:[
      {path:'',component:JobList},
      {path:'job-details/:id',component:JobDetails}
    ]
  },
  {path:"createJob",component:CreateJob}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
