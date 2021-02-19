import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../interface/list-of-patients';
@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  url: string = `http://localhost:3000/patients/`;
  active: any;
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  getAllPatients = () =>
    this.httpClient
      .get<Patient[]>(this.url, {
        headers: { 'x-auth-token': this.localStorageService.get('token') },
      })
      .toPromise();

  getPatient = (id: string) =>
    this.httpClient
      .get<Patient>(`http://localhost:3000/patients/${id}`, {
        headers: { 'x-auth-token': this.localStorageService.get('token') },
      })
      .toPromise();

  addPatient = (
    name: string,
    email: string,
    dob: string,
    fiscal_code: string,
    address: string,
    phone: string,
    hasCovid: number
  ) =>
    this.httpClient.post(
      this.url,
      {
        name,
        email,
        dob,
        fiscal_code,
        address,
        phone,
        hasCovid,
      },
      { headers: { 'x-auth-token': this.localStorageService.get('token') } }
    );

  updatePatient = (
    id: number,
    name: string,
    address: string,
    email: string,
    phone: number,
    hasCovid: number,
    dob: string,
    fiscal_code: string
  ) =>
    this.httpClient.put(
      `http://localhost:3000/patients/${id}`,
      { name, address, email, phone, hasCovid, dob, fiscal_code },
      { headers: { 'x-auth-token': this.localStorageService.get('token') } }
    );

  deletePatient = (id: number) =>
    this.httpClient.delete<Patient>(`http://localhost:3000/patients/${id}`, {
      headers: { 'x-auth-token': this.localStorageService.get('token') },
    });
}
