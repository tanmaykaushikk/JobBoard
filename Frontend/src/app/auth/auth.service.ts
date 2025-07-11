import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:5000/auth"

@Injectable({
  providedIn: 'root'
})


export class AuthServices {

  isAuthenticated = false;

  constructor(private router: Router,private http:HttpClient) { }


  register(body:any):Observable<any>{
    return this.http.post<any>(`${apiUrl}/register`,body)
  }

  login(body:any):Observable<any>{
    return this.http.post<any>(`${apiUrl}/login`,body)
  }



  logout() {
    localStorage.removeItem("user");
    this.isAuthenticated = false;
    // this.router.navigate([./])
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem("user");
  }
}