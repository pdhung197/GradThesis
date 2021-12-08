import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { INgxSelectOption } from 'ngx-select-ex';
import { tap } from 'rxjs/operators';
import { DishRecipe } from 'src/app/shared/models/dish-recipe.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { Material } from 'src/app/shared/models/material.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as MaterialsActions from '../../../materials/store/materials.actions';
import * as MenuActions from '../../store/menu.actions';
import { DishRecipesParams, SearchDishes } from '../../store/menu.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  public dish: Dish;
  public params: SearchDishes;

  public allMaterials: Material[];
  public recipes: DishRecipe[] = [];
  public selectedMaterialsIds: number[] = [];

  public material: Material;
  public amount: string;

  constructor(public bsModalRef: BsModalRef, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new MenuActions.GetDish(this.dish.id));
    this.store.select('menu').pipe(
      tap((data) => {
        this.recipes = [];
        if (data.dish?.recipes) {
          this.recipes.push(...data.dish?.recipes);
        }
      })
    ).subscribe();

    this.store.dispatch(new MaterialsActions.FetchAllMaterials());
    this.store.select('materials').pipe(
      tap((data) => {
        this.allMaterials = data.allMaterials.filter(m => this.recipes.findIndex(r => r.materialId === m.id) === -1);
      })
    ).subscribe();
  }

  public onSelectMaterial(options: INgxSelectOption[]): void {
    for (const option of options) {
      this.material = this.allMaterials.find(d => d.id === option.value);
    }
  }

  public onAddRecipe(): void {
    const index = this.recipes.findIndex(o => o.materialId === this.material.id);
    if (index === -1) {
      this.recipes.push({
        materialId: this.material.id,
        material: this.material,
        amount: this.amount
      });
    } else {
      this.recipes[index] = {
        materialId: this.material.id,
        material: this.material,
        amount: this.amount
      };
    }
  }

  public onRemoveRecipe(index: number): void {
    this.recipes.splice(index, 1);
  }

  public onSubmit(): void {
    const params: DishRecipesParams = {
      id: this.dish.id,
      recipes: this.recipes
    };

    this.recipes = [];

    this.store.dispatch(new MenuActions.UpdateDishRecipes(params));
    this.bsModalRef.hide();
  }

}
