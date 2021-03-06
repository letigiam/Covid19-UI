import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  message = '';
  errors: string[] = [];
  constructor(
    private service: LoginService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  logIn = () => {
    this.service.login(this.username, this.password).subscribe(
      (data: HttpResponse<any>) => {
        this.localStorage.set('token', data.headers.get('x-auth-token'));
        this.router.navigate(['home']);
      },
      (error) => {
        if (error.error.errors) {
          error.error.errors.map((err: any) => {
            this.errors.push(String(Object.values(err)[0]));
          });
        } else if (error.error) {
          this.errors = [error.error];
        }
      }
    );
  };
}
