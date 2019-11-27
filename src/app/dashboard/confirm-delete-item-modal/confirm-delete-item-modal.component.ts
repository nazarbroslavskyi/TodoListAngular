import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-confirm-delete-item-modal',
  templateUrl: './confirm-delete-item-modal.component.html',
  styleUrls: ['./confirm-delete-item-modal.component.scss']
})
export class ConfirmDeleteItemModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteItemModalComponent>) {}

  ngOnInit() {
  }

}
