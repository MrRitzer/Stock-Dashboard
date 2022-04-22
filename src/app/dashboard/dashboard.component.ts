import { Component, OnInit } from '@angular/core';

import { restClient } from "polygon.io";
import { Aggreates } from '../models/Aggregates';
import { Results } from '../models/Results';
const rest = restClient("AuM7Fby9dyENa7blJvlUsLhaXUYJxih6");

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.test();
  }

  test() {
    let aggregates: Promise<Aggreates>;
    aggregates = rest.stocks.aggregates("AAPL",1,"day","2021-07-22","2021-08-22");
    console.log(aggregates)
  }

}
