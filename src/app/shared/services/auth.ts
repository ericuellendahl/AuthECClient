import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:5000';

  creatUser(formData: any) {
    return this.http.post(`${this.baseUrl}/Auth/register`, formData);
  }

   signin(formData: any) {
    return this.http.post(`${this.baseUrl}/Auth/login`, formData);
  }

}
