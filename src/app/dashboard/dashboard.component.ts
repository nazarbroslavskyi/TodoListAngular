import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoItem } from './todo-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private todoListItems: TodoItem[];
  private task: FormControl;

  constructor() { }

  ngOnInit() {
  this.task = new FormControl('', [Validators.required]);

    this.todoListItems = [
      {
        title: 'Feed Dog',
        // description: 'give dog some meat',
        done: false,
      },

      {
        title: 'Buy some foods',
        // description: 'buy oil, meat for dog, some flour, onion, salt and dumpings',
        done: false
      }
    ];
    console.log(this.todoListItems);
  }


  getErrorMessage() {
    return this.task.hasError('required') ? 'You must enter a value' :
      this.task.hasError('email') ? 'Not a valid email' :
        '';
  }

}
