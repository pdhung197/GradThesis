import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-receipts-manage',
  templateUrl: './receipts-manage.component.html',
  styleUrls: ['./receipts-manage.component.scss']
})
export class ReceiptsManageComponent implements OnInit {

  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
