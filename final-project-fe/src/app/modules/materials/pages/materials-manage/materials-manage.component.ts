import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-materials-manage',
  templateUrl: './materials-manage.component.html',
  styleUrls: ['./materials-manage.component.scss']
})
export class MaterialsManageComponent implements OnInit {

  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
