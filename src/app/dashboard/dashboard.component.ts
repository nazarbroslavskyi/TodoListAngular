import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  task = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.task.hasError('required') ? 'You must enter a value' :
      this.task.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor() { }

  ngOnInit() {
  }

}
