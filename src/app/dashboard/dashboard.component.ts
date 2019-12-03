import {Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TodoItem } from './todo-item';
import {MatButton, MatCheckboxChange} from "@angular/material";
import { MatDialog } from "@angular/material";
import { ConfirmDeleteItemModalComponent } from "./confirm-delete-item-modal/confirm-delete-item-modal.component";
import { EditItemComponent } from "./edit-item/edit-item.component";
import { TodoListItemsService } from "../../../shared/todo-list-items.service";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public todoListItems: TodoItem[] = [];
  public todoListItemsFilter: TodoItem[] = [];
  public task: FormControl;
  public addTaskForm: FormGroup;
  public isLoading = true;
  public allItemsChecked = true;
  public  activeItemsChecked = false;
  public doneItemsChecked = false;
  searchInput: FormControl = new FormControl('');
  public searchInputValue = '';
  public howManyDone = 0;
  public howManyToDo = 0;
  // @ViewChildren('btnOfEdit') btnOfEdit: QueryList<MatButton>;
  // @ViewChild('btnOfError', { static: false }) btnOfError: MatButton;
  // @ViewChild('btnOfDelete', { static: false }) btnOfDelete: MatButton;
  // public importantItem = false;

  private animal: string;
  private name: string;


  constructor(public dialog: MatDialog, private todolist: TodoListItemsService) {}

  ngOnInit() {
    this.todolist.getTodoListItems().subscribe(data => {
      this.todoListItems = data;
      this.todoListItems.forEach(item => {
        if (item.done) {
          this.howManyDone++;
        } else {
          this.howManyToDo++;
        }
      });
      // this.todoListItemsFilter = data.slice();
      // console.log(this.todoListItems);
      this.isLoading = false;
    });

  this.task = new FormControl('', [Validators.required]);

  this.addTaskForm =  new FormGroup({
    title: new FormControl('', [Validators.required]),
    important: new FormControl(false)
  });

    this.searchInput.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(res => {
        console.log(this.todoListItems);
        this.searchInputValue = this.searchInput.value;
      });


    // this.todoListItems = [
    //   {
    //     title: 'Feed Dog',
    //     // description: 'give dog some meat',
    //     done: true,
    //     important: false
    //   },
    //
    //   {
    //     title: 'Buy some foods',
    //     // description: 'buy oil, meat for dog, some flour, onion, salt and dumpings',
    //     done: false,
    //     important: false
    //   },
    //
    //   {
    //     title: 'Write a todo list',
    //     // description: 'buy oil, meat for dog, some flour, onion, salt and dumpings',
    //     done: false,
    //     important: true
    //   },
    //
    //   {
    //     title: 'Go for a walk',
    //     // description: 'buy oil, meat for dog, some flour, onion, salt and dumpings',
    //     done: false,
    //     important: false
    //   }
    // ];
  }


  onSubmit(addTaskForm: FormGroup) {
    // console.log(user);
    // console.log(user.valid);
    this.onAddItem(addTaskForm);
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

  onOpenDeleteDialog(indexOfItem: string): void {
    // console.log(indexOfItem);
    const dialogRef = this.dialog.open(ConfirmDeleteItemModalComponent, {
      width: '450px',
      data: { indexOfItem: indexOfItem }
    });
    // console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(typeof result);
      if(result) {
        this.onDeleteTodoItem(indexOfItem);
      }
    });
  }

  onOpenEditDialog(indexOfItem: number, idOfTodoItem: string) {
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '450px',
      data: {
        indexOfItem: indexOfItem,
        title: this.todoListItems[indexOfItem].title
      }
    });
    // console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      // console.log(indexOfItem);
      // console.log(dialogRef);
      if (result) {
        this.onSaveAfterEdit(indexOfItem, result);
        this.todolist.updateTodoListItemTitle(idOfTodoItem, { title: result });
      }
    });
  }

  getErrorMessage() {
    return this.task.hasError('required') ? 'You must enter a value' :
      this.task.hasError('email') ? 'Not a valid email' :
        '';
  }

  onMakeImporantItem(itemOfTodoList) {
    this.todolist.makeTodoListItemImportant(itemOfTodoList.id, { important: !itemOfTodoList.important }).subscribe(_ => {
      itemOfTodoList.important = !itemOfTodoList.important;
    });


  }

  onDeleteTodoItem(indexOfItem) {
    this.todolist.deleteTodoListItem(indexOfItem);  // on server
    const index = this.todoListItems.findIndex(elem => {  // local
      if(elem.id === indexOfItem) {
        return true;
      }
    });
    this.todoListItems = this.todoListItems.slice();
    this.todoListItems.splice(index, 1);
  }

  toggleCheckbox(itemOfTodoList) {
    // console.log(index);

    this.todolist.makeTodoListItemDone(itemOfTodoList.id, {done: !itemOfTodoList.done }).subscribe(data => {
      itemOfTodoList.done = !itemOfTodoList.done;
      if(itemOfTodoList.done) {
        this.howManyDone++;
        this.howManyToDo--;
      } else {
        this.howManyDone--;
        this.howManyToDo++;
      }
    })

  }

  onSaveAfterEdit(indexOfItem: number, editedTitle: string) {
    this.todoListItems[indexOfItem].title = editedTitle;
  }

  onAddItem(addTaskForm: FormGroup) {
    this.todolist.postTodoListItem({
      title: addTaskForm.value.title.trim(),
      done: false,
      important: addTaskForm.value.important || false
    }).subscribe(data => {
      // console.log(data);
      // console.log(addTaskForm);
      // console.log(this.todoListItems);
      this.todoListItems = [...this.todoListItems, {
        title: addTaskForm.value.title.trim(),
        done: false,
        important: addTaskForm.value.important || false,
        id: data.name
      }];
      // this.todoListItems.push();
      this.addTaskForm.reset();
    });
    // console.log(this.task.value.trim());

  }

  getonepost() {
    this.todolist.getTodoListItems();
  }

  showAllItems() {
    this.allItemsChecked = true;
    this.activeItemsChecked = false;
    this.doneItemsChecked = false;
  }

  showActiveItems() {
    this.allItemsChecked = false;
    this.activeItemsChecked = true;
    this.doneItemsChecked = false;
  }

  showDoneItems() {
    this.allItemsChecked = false;
    this.activeItemsChecked = false;
    this.doneItemsChecked = true;
  }
}
