import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Promotion } from 'src/app/shared/models/promotion.model';
import { User } from 'src/app/shared/models/user.model';
import * as fromApp from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import * as HomeActions from '../../store/home.actions';

@Component({
  selector: 'app-promotions-page',
  templateUrl: './promotions-page.component.html',
  styleUrls: ['./promotions-page.component.scss']
})
export class PromotionsPageComponent implements OnInit {

  public promotions$: Observable<Promotion[]>;

  public mainPromo: Promotion;
  public otherPromo: Promotion[][];

  public user: User;

  public rootImgPath = `${environment.apiUrl}/attachments`;

  constructor(public authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user) {
      this.authService.currentUser = this.user;
    }

    this.promotions$ = this.store.select('home').pipe(
      map((data) => {
        this.mainPromo = data.promotions[0];

        const tempArray: Promotion[][] = [];
        for (let index = 1; index < data.promotions.length; index += 4) {
          const myChunk = data.promotions.slice(index, index + 4);
          tempArray.push(myChunk);
        }
        this.otherPromo = tempArray;

        return data.promotions;
      })
    );

    this.store.dispatch(new HomeActions.FetchPromotions());
  }

}
