import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish } from 'src/app/shared/models/dish.model';
import * as fromApp from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import * as HomeActions from '../../store/home.actions';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})
export class DishesListComponent implements OnInit {

  public categoryId = 0;

  public data$: Observable<Dish[][]>;

  public imageRoot = `${environment.apiUrl}/attachments`;

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = +params.id;

      this.data$ = this.store.select('home').pipe(
        map((data) => {
          const tempArray: Dish[][] = [];
          for (let index = 0; index < data.menu.length; index += 2) {
            const myChunk = data.menu.slice(index, index + 2);
            tempArray.push(myChunk);
        }
          return tempArray;
        })
      );

      this.store.dispatch(new HomeActions.FetchMenu(this.categoryId));
    });

  }

}
