import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, throwError, toArray } from 'rxjs';

import { StockSearch } from './models/StockSearch';
import { Aggreates } from './models/Aggregates';

const key: string = "AuM7Fby9dyENa7blJvlUsLhaXUYJxih6";
const base: string = "https://api.polygon.io/v2/aggs/ticker/";

@Injectable({
  providedIn: 'root'
})
export class PolygonService {

  private stockSearch = new BehaviorSubject<StockSearch>( { 
    symbol1: '',
    symbol2: '',
    start_date: '',
    end_date: ''
  });

  currentStockSearch = this.stockSearch.asObservable();

  constructor(private http: HttpClient) { }

  getAggregate(sym: string, from: string, to: string): Observable<Aggreates> {
    if (sym == '') {
      let temp: Observable<Aggreates> = new Observable<Aggreates>();
      return temp;
    }
    else {
      let url: string = base + sym + "/range/1/day/" + from + "/" + to + "?adjusted=true&sort=asc&limit=100&apiKey=" + key;
      return this.http.get<Aggreates>(url);
    }
  }

  getManyAggregates(sym1: string, sym2: string, to: string, from: string): Observable<Aggreates[]> {
    let temp1: Observable<Aggreates> = this.getAggregate(sym1,to,from);
    let temp2: Observable<Aggreates> = this.getAggregate(sym2,to,from);
    return forkJoin([temp1,temp2]);
  }

  updateStockSearch(stockSearch: StockSearch) {
    this.stockSearch.next(stockSearch);
  }
}
