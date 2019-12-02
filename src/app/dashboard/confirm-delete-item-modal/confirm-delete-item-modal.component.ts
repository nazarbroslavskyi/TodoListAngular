import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-item-modal',
  templateUrl: './confirm-delete-item-modal.component.html',
  styleUrls: ['./confirm-delete-item-modal.component.scss']
})
export class ConfirmDeleteItemModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteItemModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    // console.log(this.dialogRef.componentInstance);
  }
  hello() {
    // console.log('hello');
  }
  closeModal() {
    this.dialogRef.close(this.data);
  }
}
