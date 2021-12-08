import { Component, Input, OnInit } from '@angular/core';
import { DishCategory } from 'src/app/shared/models/dish-category.model';

@Component({
  selector: 'app-dish-categories-sidebar',
  templateUrl: './dish-categories-sidebar.component.html',
  styleUrls: ['./dish-categories-sidebar.component.scss']
})
export class DishCategoriesSidebarComponent implements OnInit {

  @Input() categories: DishCategory[];

  constructor() { }

  ngOnInit() {
  }

}
