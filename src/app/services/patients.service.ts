import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Patients } from '../interface/list-of-patients';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  url:string = 'http://localhost:3000/patients/';
  active: any;
  constructor(private httpClient: HttpClient) {}
  all=(name:string)=>this.httpClient.get<Patients[]>(this.url).toPromise();
}
