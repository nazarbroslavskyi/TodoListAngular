import { Component, OnInit } from '@angular/core';
import { ViewChild } from "@angular/core";
import {MatDrawer} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-list';

  @ViewChild('sidenav', {static: false}) sideNav: MatDrawer;

  ngOnInit() {

  }


  toogle() {
    this.sideNav.toggle().then(result => {
      // console.log(result);
    })
  }
}
