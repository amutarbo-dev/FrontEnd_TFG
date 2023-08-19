import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  previousUrl: string;

  constructor(private location: Location) {
    const history: any = this.location.getState();
    this.previousUrl = history.navigationId > 1 ? history.previousUrl : '/';
  }
}
