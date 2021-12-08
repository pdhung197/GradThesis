import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MENU_ROUTES } from './menu.routes';
import { MenuManageComponent } from './pages/menu-manage/menu-manage.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { DishesTableComponent } from './components/dishes-table/dishes-table.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { DishEditComponent } from './components/dish-edit/dish-edit.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { INgxSelectOptions, NgxSelectModule } from 'ngx-select-ex';

const CustomSelectOptions: INgxSelectOptions = {
    optionValueField: 'id',
    optionTextField: 'name',
    keepSelectedItems: false
};

@NgModule({
    declarations: [
        MenuManageComponent,
        CategoriesTableComponent,
        DishesTableComponent,
        CategoryEditComponent,
        DishEditComponent,
        RecipeEditComponent
    ],
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        PaginationModule.forRoot(),
        NgxSelectModule.forRoot(CustomSelectOptions),

        SharedModule,
        RouterModule.forChild(MENU_ROUTES)
    ],
    exports: [],
    providers: [
        BsModalRef
    ]
})
export class MenuModule {

}
