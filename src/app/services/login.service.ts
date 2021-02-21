import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = `http://localhost:3000/users/login`;
  active: any;
  constructor(private httpClient: HttpClient) {}
  login = (username: string, password: string) =>
    this.httpClient.post<HttpResponse<any>>(
      this.url,
      {
        username,
        password,
      },
      { observe: 'response' }
    );
}
