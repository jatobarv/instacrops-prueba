import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = true;
  constructor(private http: HttpClient) {}

  async signin(email: string, password: string) {
    return this.http.post('http://localhost:8080/login/', {
      email: email,
      password: password,
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return this.http.get('http://localhost:8080/logout/');
  }
}
