import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as fromApp from 'src/app/store/app.reducer';
import * as ReportsActions from '../../store/reports.actions';
import { SummaryReport, ReportParams } from '../../store/reports.actions';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  public summary$: Observable<SummaryReport>;

  public searchForm = new FormGroup({
    dateFrom: new FormControl(''),
    dateTo: new FormControl('')
  });

  public maxDate = new Date();

  @Output() dateFrom = new EventEmitter<string>();
  @Output() dateTo = new EventEmitter<string>();

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.summary$ = this.store.select('reports').pipe(
      map((data) => {
        return data?.summaryReport;
      })
    );

    this.searchForm.get('dateTo').valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => this.onSearchSummary());
    this.searchForm.get('dateFrom').valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => this.onSearchSummary());
  }

  ngOnDestroy() {
    this.store.dispatch(new ReportsActions.SetSummary({
      materialTotal: 0,
      billTotal: 0
    }));
  }

  public onSearchSummary(): void {
    let dateFrom = this.searchForm.get('dateFrom').value;
    if (dateFrom) {
      dateFrom = formatDate(dateFrom, 'yyyy-MM-dd', 'en');
    } else {
      dateFrom = '';
    }

    let dateTo = this.searchForm.get('dateTo').value;
    if (dateTo) {
      dateTo = formatDate(dateTo, 'yyyy-MM-dd', 'en');
    } else {
      dateTo = '';
    }

    const searchParams: ReportParams = {
      dateFrom,
      dateTo
    };
    if (dateFrom && dateTo) {
      this.store.dispatch(new ReportsActions.FetchSummary(searchParams));

      this.dateFrom.emit(dateFrom);
      this.dateTo.emit(dateTo);
    }
  }

}
