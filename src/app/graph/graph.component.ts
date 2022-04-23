import { Component, OnInit, Input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { StockSearch } from '../models/StockSearch';
import { Aggreates } from '../models/Aggregates';
import { Results } from '../models/Results';
import { PolygonService } from '../polygon.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  chartOptions: ChartOptions = {};

  results: Array<Results> = [];

  stockSearch: StockSearch = { 
    symbol: '',
    start_date: '',
    end_date: ''
  };

  lowest: Array<number> = [];
  highest: Array<number> = [];
  dates: Array<number> = [];

  data: ChartData<'line'> = {
    labels: [],
    datasets: []
  }

  constructor(private polygon: PolygonService) { }

  ngOnInit(): void {
    this.polygon.currentStockSearch.subscribe(data => {
      this.stockSearch = data;
      this.getData(this.stockSearch.symbol,this.stockSearch.start_date,this.stockSearch.end_date);
    });
  }

  getData(sym: string, from: string, to: string) {
    if (sym === '') {
      return;
    }
    else {
      const observer = {
        next: (response: Aggreates) => {
          this.results = response.results;
        },
        error: (e: string) => {
          console.error("Request failed with error: " + e)
        }
      }
      this.polygon.getAggregate(sym,from,to).subscribe(observer => {
        this.results = observer.results;
        this.graphData();
      });
    }
  }

  graphData() {
    this.lowest = [];
    this.highest = [];
    this.dates = [];
    this.results.forEach((d,i) => {
      this.lowest.push(d.l);
      this.highest.push(d.h);
      this.dates.push(i);
    });

    this.data = {
      labels: this.dates,
      datasets: [
        { label: 'Low', data: this.lowest, tension: 0.25 },
        { label: 'High', data: this.highest, tension: 0.25 },
      ],
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: this.stockSearch.symbol + ': ' + this.stockSearch.start_date + "-" + this.stockSearch.end_date,
        },
        legend: {
          position: 'left'
        }
      },
    };
  }

}
