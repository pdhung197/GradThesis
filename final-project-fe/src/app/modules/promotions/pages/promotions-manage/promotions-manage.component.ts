import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-promotions-manage',
  templateUrl: './promotions-manage.component.html',
  styleUrls: ['./promotions-manage.component.scss']
})
export class PromotionsManageComponent implements OnInit {

  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
