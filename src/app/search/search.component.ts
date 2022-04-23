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
    symbol: '',
    start_date: '',
    end_date: ''
  };
  searchValue : string = '';
  searchOutput : string[] = [];

  constructor(private polygon: PolygonService) { }

  ngOnInit(): void {
    this.polygon.currentStockSearch.subscribe(data => {
      this.stockSearch = data;
    });
  }

  search() {
    this.searchOutput = [];
    STOCKS.forEach(element => {
      if (element.includes(this.searchValue.toUpperCase()) && this.searchValue !== '') {
        this.searchOutput.push(element);
      }
    });
  }

  getValue(value: any) {
    this.searchValue = value;
    this.stockSearch.symbol = value;
    this.polygon.updateStockSearch(this.stockSearch);
    this.searchOutput = [];
  }

  isDisabled() {
    return !(this.stockSearch.start_date!.toString() != this.stockSearch.end_date!.toString() && this.stockSearch.start_date != '' && this.stockSearch.end_date != '' );
  }

}
