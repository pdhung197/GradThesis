import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-confirm-modal",
  templateUrl: "./confirm-modal.component.html",
  styleUrls: ["./confirm-modal.component.scss"],
})
export class ConfirmModalComponent implements OnInit {
  public prompt: string;
  public callback: (result: any) => void;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  public confirm(confirm: boolean): void {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback(confirm);
      this.bsModalRef.hide();
    }
  }
}
