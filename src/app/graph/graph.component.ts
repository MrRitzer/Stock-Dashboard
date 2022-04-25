import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
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

  chartOptions: ChartOptions[] = [{},{}];

  results1: Array<Results> = [];
  results2: Array<Results> = [];

  stockSearch: StockSearch = { 
    symbol1: '',
    symbol2: '',
    start_date: '',
    end_date: ''
  };

  lowest1: Array<number> = [];
  highest1: Array<number> = [];
  dates1: Array<number> = [];

  lowest2: Array<number> = [];
  highest2: Array<number> = [];
  dates2: Array<number> = [];

  data: ChartData<'line'>[] = [
    {
      labels: [],
      datasets: []
    },
    {
      labels: [],
      datasets: []
    }
  ];

  baseConfig: ChartConfiguration = {
    type: 'line',
    options: {
      responsive: true,
    },
    data: this.data[0]
  };

  constructor(private polygon: PolygonService) { }

  ngOnInit(): void {
    this.polygon.currentStockSearch.subscribe(data => {
      this.stockSearch = data;
      this.getData();
    });
  }

  getData() {
    this.polygon.getManyAggregates(this.stockSearch.symbol1,this.stockSearch.symbol2,this.stockSearch.start_date,this.stockSearch.end_date).subscribe(observer => {
      this.results1 = observer[0].results;
      this.results2 = observer[1].results;
      this.graphData();
    });
  }

  graphData() {
    let start: Date = new Date(this.stockSearch.start_date)
    let end: Date = new Date(this.stockSearch.end_date)
    this.lowest1 = [];
    this.highest1 = [];
    this.dates1 = [];
    this.results1.forEach((d,i) => {
      this.lowest1.push(d.l);
      this.highest1.push(d.h);
      this.dates1.push(i);
    });

    this.data[0] = {
      labels: this.dates1,
      datasets: [
        { label: 'Low', data: this.lowest1, tension: 0.25 },
        { label: 'High', data: this.highest1, tension: 0.25 },
      ],
    };

    this.chartOptions[0] = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: this.stockSearch.symbol1 + ': ' + start.toDateString() + "-" + end.toDateString(),
        },
        legend: {
          position: 'left'
        },
      },
      scales: {
        y: {
            ticks: {
                callback: function(value, index, ticks) {
                    return '$' + value;
                }
            }
        }
      },
    };

    this.lowest2 = [];
    this.highest2 = [];
    this.dates2 = [];
    this.results2.forEach((d,i) => {
      this.lowest2.push(d.l);
      this.highest2.push(d.h);
      this.dates2.push(i);
    });

    this.data[1] = {
      labels: this.dates2,
      datasets: [
        { label: 'Low', data: this.lowest2, tension: 0.25 },
        { label: 'High', data: this.highest2, tension: 0.25 },
      ],
    };

    this.chartOptions[1] = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: this.stockSearch.symbol2 + ': ' + start.toDateString() + "-" + end.toDateString(),
        },
        legend: {
          position: 'left'
        }
      },
      scales: {
        y: {
            ticks: {
                callback: function(value, index, ticks) {
                    return '$' + value;
                }
            }
        }
      },
    };
  }

}
