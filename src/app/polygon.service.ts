import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { Results } from './models/Results';
import { Aggreates } from './models/Aggregates';

const key: string = "AuM7Fby9dyENa7blJvlUsLhaXUYJxih6";
const base: string = "https://api.polygon.io/v2/aggs/ticker/";

@Injectable({
  providedIn: 'root'
})
export class PolygonService {

  private symbol = new BehaviorSubject('');

  currentSymbol = this.symbol.asObservable();

  constructor(private http: HttpClient) { }

  getAggregate(sym: string, from: string, to: string): Observable<Aggreates> {
    let url: string = base + sym + "/range/1/day/" + from + "/" + to + "?adjusted=true&sort=asc&limit=100&apiKey=" + key
    return this.http.get<Aggreates>(url);
  }

  updateSymbol(symbol: string) {
    this.symbol.next(symbol);
  }
}
