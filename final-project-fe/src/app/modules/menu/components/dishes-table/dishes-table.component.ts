import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { Dish } from 'src/app/shared/models/dish.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as MenuActions from '../../store/menu.actions';
import { SearchDishes } from '../../store/menu.actions';
import { State } from '../../store/menu.reducer';
import { DishEditComponent } from '../dish-edit/dish-edit.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';

@Component({
  selector: 'app-dishes-table',
  templateUrl: './dishes-table.component.html',
  styleUrls: ['./dishes-table.component.scss']
})
export class DishesTableComponent implements OnInit {

  public data$: Observable<State>;

  public searchParams: SearchDishes;
  public dishParams: MenuActions.DishParams;
  public currentPage = 1;

  public searchForm = new FormGroup({
    categoryId: new FormControl(''),
    name: new FormControl('')
  });

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.data$ = this.store.select('menu');

    this.store.dispatch(new MenuActions.FetchCategories());

    this.onPageChanged(1);

    this.searchForm.get('name').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });

    this.searchForm.get('categoryId').valueChanges
      .pipe(
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });
  }

  public onPageChanged(page: number): void {
    const name = this.searchForm.get('name').value;
    const categoryId = this.searchForm.get('categoryId').value;

    this.searchParams = {
      pageNumber: page,
      pageSize: 15,
      name,
      categoryId
    };
    this.store.dispatch(new MenuActions.FetchDishes(this.searchParams));
  }

  public openRecipeModal(dish: Dish, params: SearchDishes): void {
    this.bsModalRef = this.modalService.show(RecipeEditComponent, {
      initialState: {
        dish,
        params
      },
      class: 'modal-lg'
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openEditModal(dish: Dish, allCategories: DishCategory[], params: SearchDishes): void {
    this.bsModalRef = this.modalService.show(DishEditComponent, {
      initialState: {
        dish,
        allCategories,
        params
      },
      class: dish ? 'modal-lg' : ''
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openDeleteModal(id: number): void {
    this.dishParams = {
      id,
      params: this.searchParams
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn xóa món ăn này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new MenuActions.DeleteDish(this.dishParams));
          }
        }
      }
    });
  }

}
