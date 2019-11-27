import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoItem } from './todo-item';
import { MatButton } from "@angular/material";
import { MatDialog } from "@angular/material";
import { ConfirmDeleteItemModalComponent } from "./confirm-delete-item-modal/confirm-delete-item-modal.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  private todoListItems: TodoItem[];
  private task: FormControl;
  // @ViewChildren('btnOfEdit') btnOfEdit: QueryList<MatButton>;
  // @ViewChild('btnOfError', { static: false }) btnOfError: MatButton;
  // @ViewChild('btnOfDelete', { static: false }) btnOfDelete: MatButton;
  // public importantItem = false;

  private animal: string;
  private name: string;


  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {

  this.task = new FormControl('', [Validators.required]);

    this.todoListItems = [
      {
        id: 0,
        title: 'Feed Dog',
        // description: 'give dog some meat',
        done: false,
        important: false
      },

      {
        id: 1,
        title: 'Buy some foods',
        // description: 'buy oil, meat for dog, some flour, onion, salt and dumpings',
        done: false,
        important: false
      }
    ];
    console.log(this.todoListItems);
  }

  ngAfterViewInit(): void {
    // console.log(this.btnOfEdit)
    // this.btnOfEdit.forEach((item: MatButton) => {
      // item.ripple.radius = 17;
      // item.ripple.centered = false;
      // console.log(item);
    // })
   // this.btnOfEdit.ripple.radius = 17;
   // this.btnOfDelete.ripple.radius = 17;
   // this.btnOfError.ripple.radius = 17;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteItemModalComponent, {
      width: '450px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getErrorMessage() {
    return this.task.hasError('required') ? 'You must enter a value' :
      this.task.hasError('email') ? 'Not a valid email' :
        '';
  }

  onMakeImporantItem(itemOfTodoList) {
    // this.importantindItem = !this.importantItem;
    console.log(itemOfTodoList.important = !itemOfTodoList.important);
  }

}
