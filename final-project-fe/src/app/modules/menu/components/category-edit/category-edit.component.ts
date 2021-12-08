import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as MenuActions from '../../store/menu.actions';
import { CategoryParams } from '../../store/menu.actions';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  public categoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    detail: new FormControl('')
  });

  public category: DishCategory;

  constructor(public bsModalRef: BsModalRef, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (this.category) {
      this.categoryForm.patchValue(this.category);
    }
  }

  get f() {
    return this.categoryForm.controls;
  }

  public onSubmit(): void {
    const category: DishCategory = {
      id: this.category ? this.category.id : null,
      name: this.f.name.value,
      detail: this.f.detail.value
    };

    const categoryParams: CategoryParams = {
      id: category.id,
      category
    };

    if (this.category) {
      this.store.dispatch(new MenuActions.UpdateCategory(categoryParams));
    } else {
      this.store.dispatch(new MenuActions.CreateCategory(categoryParams));
    }

    this.bsModalRef.hide();
  }

}
