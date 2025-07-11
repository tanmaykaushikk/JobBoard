import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServices } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: false,
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss'
})

export class AuthForm implements OnInit{

  authForm! : FormGroup;
  isLoginMode = true;
  errorMessage = '';

  constructor(private fb:FormBuilder,private authService : AuthServices,private router:Router){}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      name:["",[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      role:['']
    })
  }


  toggleMode(){
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = "";
  }

  onSubmit():void{
    const {name,email,password} = this.authForm.value;
    if(this.isLoginMode){
      const success = this.authService.login({email,password}).subscribe({
        next:(res)=>{
          console.log(res);
          localStorage.setItem("authToken",res.token);
          if(res.user.role === "recruiter"){
            this.router.navigate(["/createJob"]);
          }
        },
        error:(err)=>{
          console.log("Error",err);
        }
      })
      if(success){
        this.router.navigate(['/dashboard'])
      }else{
        this.errorMessage =  "Invalid Credentials"
      }
    }
    else{
      this.authService.register({name,email,password}).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
          console.log(err,"Error")
        }
      })
      this.errorMessage = "SignUp successful , Please Login";
      this.toggleMode();
    }
  }
}
