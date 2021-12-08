import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from 'src/app/store/app.reducer';
import * as HomeActions from '../../store/home.actions';
import { State } from '../../store/home.reducer';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit, AfterViewChecked {

  public data$: Observable<State>;

  constructor(public store: Store<fromApp.AppState>, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.data$ = this.store.select('home');

    this.store.dispatch(new HomeActions.FetchCategories());
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

}
