import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-providers-manage',
  templateUrl: './providers-manage.component.html',
  styleUrls: ['./providers-manage.component.scss']
})
export class ProvidersManageComponent implements OnInit {

  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
