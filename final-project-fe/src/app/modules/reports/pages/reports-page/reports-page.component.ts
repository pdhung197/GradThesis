import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {

  public dateFrom = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  public dateTo = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
  }

  public getDateFrom(dateFrom: string): void {
    this.dateFrom = dateFrom;
  }

  public getDateTo(dateTo: string): void {
    this.dateTo = dateTo;
  }

}
