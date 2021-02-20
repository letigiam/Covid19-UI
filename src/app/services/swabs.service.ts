import { SwabCalendar } from './../interface/list-of-swabs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Swab } from '../interface/list-of-swabs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SwabsService {
  url: string = 'http://localhost:3000/swabs';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  handleHttpErrors = (err: any) => {
    alert(err.message ? err.message : 'Error');
    if (err.status === 401) {
      this.router.navigate(['login']);
    }
  };

  allSwabs = () =>
    this.httpClient
      .get<SwabCalendar>(this.url, {
        headers: {
          'x-auth-token': this.localStorageService.get('token'),
        },
      })
      .toPromise()
      .catch((err) => this.handleHttpErrors(err));
  allSwabsByDate = (dateStart: string, dateEnd: string) =>
    this.httpClient
      .get<SwabCalendar>(
        `${this.url}?startDate=${dateStart}&endDate=${dateEnd}`,
        {
          headers: {
            'x-auth-token': this.localStorageService.get('token'),
          },
        }
      )
      .toPromise()
      .catch(this.handleHttpErrors);

  addSwab = (
    team_id: string,
    date: string,
    type: string,
    patient_id: string,
    done: number,
    positive_res: number
  ) =>
    this.httpClient
      .post(
        this.url,
        {
          team_id,
          date,
          type,
          patient_id,
          done,
          positive_res,
        },
        {
          headers: {
            'x-auth-token': this.localStorageService.get('token'),
          },
        }
      )
      .toPromise()
      .catch(this.handleHttpErrors);
  updateSwab = (
    swab_id: number,
    team_id: number,
    date: string,
    type: string,
    patient_id: string,
    done: number,
    positive_res: number
  ) =>
    this.httpClient
      .put(
        `${this.url}/${swab_id}`,
        {
          team_id,
          date,
          type,
          patient_id,
          done,
          positive_res,
        },
        {
          headers: {
            'x-auth-token': this.localStorageService.get('token'),
          },
        }
      )
      .toPromise()
      .catch(this.handleHttpErrors);
  deleteSwab = (swab_id: number) =>
    this.httpClient
      .delete(`${this.url}/${swab_id}`, {
        headers: {
          'x-auth-token': this.localStorageService.get('token'),
        },
      })
      .toPromise()
      .catch(this.handleHttpErrors);
}
