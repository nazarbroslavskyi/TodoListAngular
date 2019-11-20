import {Component, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import { ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav', {static: false}) sideNav: MatDrawer;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }

  togle() {
    // this.sideNav.toggle().then();
  }
}
