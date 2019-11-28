import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoItem } from './todo-item';
import {MatButton, MatCheckboxChange} from "@angular/material";
import { MatDialog } from "@angular/material";
import { ConfirmDeleteItemModalComponent } from "./confirm-delete-item-modal/confirm-delete-item-modal.component";
import { EditItemComponent } from "./edit-item/edit-item.component";

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


  constructor(public dialog: MatDialog) {}

  ngOnInit() {

  this.task = new FormControl('', [Validators.required]);

    this.todoListItems = [
      {
        title: 'Feed Dog',
        // description: 'give dog some meat',
        done: true,
        important: false
      },

      {
        title: 'Buy some foods',
        // description: 'buy oil, meat for dog, some flour, onion, salt and dumpings',
        done: false,
        important: false
      },

      {
        title: 'Write a todo list',
        // description: 'buy oil, meat for dog, some flour, onion, salt and dumpings',
        done: false,
        important: true
      },

      {
        title: 'Go for a walk',
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

  onOpenDeleteDialog(indexOfItem): void {
    const dialogRef = this.dialog.open(ConfirmDeleteItemModalComponent, {
      width: '450px',
      data: {indexOfItem: indexOfItem}
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      console.log(typeof result);
      if(result) {
        this.onDeleteTodoItem(indexOfItem);
      }
    });
  }

  onOpenEditDialog(indexOfItem: number) {
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '450px',
      data: { indexOfItem: indexOfItem }
    });
    // console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      // console.log(indexOfItem);
      // console.log(dialogRef);
      if(result) {
        console.log(result);
      }
    });
  }

  getErrorMessage() {
    return this.task.hasError('required') ? 'You must enter a value' :
      this.task.hasError('email') ? 'Not a valid email' :
        '';
  }

  onMakeImporantItem(itemOfTodoList) {
    itemOfTodoList.important = !itemOfTodoList.important
  }

  onDeleteTodoItem(indexOfItem) {
    this.todoListItems.splice(indexOfItem, 1);
    // console.log(this.todoListItems);
  }

  toggleCheckbox(index) {
    // console.log(index);
    this.todoListItems[index].done = !this.todoListItems[index].done;
  }

}
