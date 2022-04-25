import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PolygonService } from '../polygon.service';
import { StockSearch } from '../models/StockSearch';
import { STOCKS } from '../stocks';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  stockSearch: StockSearch = { 
    symbol1: '',
    symbol2: '',
    start_date: '',
    end_date: ''
  };
  searchValue1 : string = '';
  searchOutput1 : string[] = [];
  searchValue2 : string = '';
  searchOutput2 : string[] = [];

  constructor(private polygon: PolygonService) { }

  ngOnInit(): void {
    this.polygon.currentStockSearch.subscribe(data => {
      this.stockSearch = data;
    });
  }

  search(id: number) {
    if (id == 1) {
      this.searchOutput1 = [];
      STOCKS.forEach(element => {
        if (element.includes(this.searchValue1.toUpperCase()) && this.searchValue1 !== '') {
          this.searchOutput1.push(element);
        }
      });
    }
    if ( id == 2 ) {
      this.searchOutput2 = [];
      STOCKS.forEach(element => {
        if (element.includes(this.searchValue2.toUpperCase()) && this.searchValue2 !== '') {
          this.searchOutput2.push(element);
        }
      });
    }
  }

  getValue(value: string, id: number) {
    if ( id == 1) {
      this.searchValue1 = value;
      this.stockSearch.symbol1 = value;
    }
    if (id == 2) {
      this.searchValue2 = value;
      this.stockSearch.symbol2 = value;
    }
    if ( this.stockSearch.symbol1 != '' && this.stockSearch.symbol2 != '') {
      this.polygon.updateStockSearch(this.stockSearch);
    }
    this.searchOutput1 = [];
    this.searchOutput2 = [];
  }

  isDisabled() {
    return !(this.stockSearch.start_date!.toString() != this.stockSearch.end_date!.toString() && this.stockSearch.start_date != '' && this.stockSearch.end_date != '' );
  }

}
