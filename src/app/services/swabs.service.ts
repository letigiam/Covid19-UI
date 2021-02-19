import { SwabCalendar } from './../interface/list-of-swabs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Swab } from '../interface/list-of-swabs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SwabsService {
  url: string = 'http://localhost:3000/swabs';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  allSwabs = () =>
    this.httpClient
      .get<SwabCalendar>(this.url, {
        headers: {
          'x-auth-token': this.localStorageService.get('token'),
        },
      })
      .toPromise();
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
      .toPromise();

  addSwab = (
    team_id: string,
    date: string,
    type: string,
    patient_id: string,
    done: number,
    positive_res: number
  ) =>
    this.httpClient.post(
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
    );
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
      .toPromise();
  deleteSwab = (swab_id: number) =>
    this.httpClient
      .delete(`${this.url}/${swab_id}`, {
        headers: {
          'x-auth-token': this.localStorageService.get('token'),
        },
      })
      .toPromise();
}
