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
}
