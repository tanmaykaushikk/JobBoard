import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:5000/job/';

  constructor(private http: HttpClient) { }

  createJob(jobData: any): Observable<any> {
    const token = localStorage.getItem("authToken");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, jobData, { headers });
  }

  getJobs(): Observable<any[]> {
    const token = localStorage.getItem("authToken");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.apiUrl}allJobs`, { headers });
  }

  getJobById(id:string): Observable<any[]> {
    const token = localStorage.getItem("authToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.apiUrl}job-Details/${id}`, { headers })
  }

  applyJob(id:string):Observable<any[]>{
    const token = localStorage.getItem("authToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any[]>(`${this.apiUrl}apply-Job/${id}` ,{}, {headers})
  }

  
  saveJob(id:string):Observable<any[]>{
    const token = localStorage.getItem("authToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any[]>(`${this.apiUrl}save-Job/${id}` ,{}, {headers})
  }

}
