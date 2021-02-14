import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Patients } from '../interface/list-of-patients';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  url:string = 'http://localhost:3000/patients/';
  active: any;
  constructor(private httpClient: HttpClient) {}
  all=()=>this.httpClient.get<Patients[]>(this.url).toPromise();
  
}
