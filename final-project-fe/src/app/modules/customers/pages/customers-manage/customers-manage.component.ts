import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-customers-manage',
  templateUrl: './customers-manage.component.html',
  styleUrls: ['./customers-manage.component.scss']
})
export class CustomersManageComponent implements OnInit {

  constructor(public sidebarService: SidebarService) { }

  ngOnInit(): void {
  }

}
