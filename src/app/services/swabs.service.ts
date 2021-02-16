import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Swabs } from '../interface/list-of-swabs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SwabsService {
  url: string = 'http://localhost:3000/swabs';
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    console.log(this.localStorageService.get('token'));
  }
  allSwabs = () =>
    this.httpClient
      .get<Swabs[]>(this.url, {
        headers: {
          'x-auth-token': this.localStorageService.get('token'),
        },
      })
      .toPromise();
}
