import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.scss']
})
export class PromotionDetailComponent implements OnInit {

  public user: User;
  public promotion$: Observable<Promotion>;
  public promotionId: number;
  public rootImgPath = `${environment.apiUrl}/attachments`;

  constructor(public authService: AuthService, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.promotionId = +this.route.snapshot.params.id;

    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user) {
      this.authService.currentUser = this.user;
    }

    this.promotion$ = this.store.select('home').pipe(
      map((data) => {
        return data.promotions.find(p => p.id === this.promotionId);
      })
    );

    this.store.dispatch(new HomeActions.FetchPromotions());
  }

}
