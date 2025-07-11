import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthForm } from './auth-form/auth-form';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthForm,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    AuthForm
  ]
})
export class AuthModule { }
