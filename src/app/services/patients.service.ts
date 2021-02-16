import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patients } from '../interface/list-of-patients';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  url: string = 'http://localhost:3000/patients/';
  active: any;
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  getAllPatients = () =>
    this.httpClient
      .get<Patients[]>(this.url, {
        headers: {
          'x-auth-token': this.localStorageService.get('token'),
        },
      })
      .toPromise();
  getPatient = (id: string) =>
    this.httpClient
      .get<Patients>(`http://localhost:3000/patients/${id}`, {
        headers: {
          'x-auth-token': this.localStorageService.get('token'),
        },
      })
      .toPromise();
}
