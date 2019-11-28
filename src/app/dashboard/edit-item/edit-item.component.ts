import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditItemComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  myFormControl = new FormControl(
    { value: 'My String Value', disabled: true },
    [ Validators.required, Validators.maxLength(30)]
  );

  ngOnInit() {
    console.log(this.myFormControl);

  }



  oncloseModalEditWindow() {
    this.dialogRef.close(this.data);
  }







}
