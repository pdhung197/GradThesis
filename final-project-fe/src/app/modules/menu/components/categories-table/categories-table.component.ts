import { Component, OnInit } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';
import * as MenuActions from '../../store/menu.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../store/menu.reducer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { CategoryParams } from '../../store/menu.actions';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {

  public data$: Observable<State>;
  public categoryParams: CategoryParams;

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.data$ = this.store.select('menu');
    this.store.dispatch(new MenuActions.FetchCategories());
  }

  public openEditModal(category: DishCategory): void {
    this.bsModalRef = this.modalService.show(CategoryEditComponent, {
      initialState: {
        category
      }
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openDeleteModal(id: number): void {
    this.categoryParams = {
      id
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn xóa loại món ăn này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new MenuActions.DeleteCategory(this.categoryParams));
          }
        }
      }
    });
  }

}
