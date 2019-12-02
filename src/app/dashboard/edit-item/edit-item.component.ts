import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditItemComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  myFormControl: FormControl = new FormControl(
    { value: this.data.title, disabled: false },
    [ Validators.required, Validators.required]
  );

  ngOnInit() {
    console.log(this.myFormControl);
    this.myFormControl.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      // console.log(value);
      // console.log(this.myFormControl.valid);
    });
  }

  onSaveChanges() {
    this.dialogRef.close(this.myFormControl.value);
  }
}
