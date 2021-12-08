import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishCategory } from 'src/app/shared/models/dish-category.model';

@Component({
  selector: 'app-categories-select',
  templateUrl: './categories-select.component.html',
  styleUrls: ['./categories-select.component.scss']
})
export class CategoriesSelectComponent implements OnInit {

  @Input() categories: DishCategory[];
  @Output() categorySelected = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public selectCategory(id: number): void {
    this.categorySelected.emit(id);
  }

}
