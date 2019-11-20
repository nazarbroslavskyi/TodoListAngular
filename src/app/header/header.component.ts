import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { ViewChild } from "@angular/core";
import {MatDrawer} from "@angular/material";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() { }

  // mode = new FormControl('over');

  @ViewChild('sidenav', {static: false}) sideNav: MatDrawer;

  ngOnInit() {
  }

  toogle() {
    this.sideNav.toggle().then(result => {
      console.log(result);
    })
  }

}
