import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-employees-manage',
  templateUrl: './employees-manage.component.html',
  styleUrls: ['./employees-manage.component.scss']
})
export class EmployeesManageComponent implements OnInit {

  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
