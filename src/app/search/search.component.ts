import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PolygonService } from '../polygon.service';
import { STOCKS } from '../stocks';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  symbol: string = ''; 
  searchValue : string = '';
  searchOutput : string[] = [];

  constructor(private polygon: PolygonService) { }

  ngOnInit(): void {
    this.polygon.currentSymbol.subscribe(data => {
      this.symbol = data;
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
    this.polygon.updateSymbol(value);
    this.searchOutput = [];
  }

}
