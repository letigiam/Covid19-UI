import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Swabs } from '../interface/list-of-swabs';

@Injectable({
  providedIn: 'root'
})
export class SwabsService {
  url: string = 'http://localhost:3000/swabs'
  constructor(private httpClient: HttpClient) { }
  allSwabs=()=>this.httpClient.get<Swabs[]>(this.url).toPromise(); 
}
