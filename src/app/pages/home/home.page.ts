import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  paths = [
    { name: 'Profile', path: '/profile', icon: 'person-outline' },
    { name: 'Shop', path: '/shop', icon: 'basket-outline' },
    { name: 'Items', path: '/items', icon: 'pricetag-outline' },
    { name: 'Contact', path: '/contact', icon: 'chatbubble-outline' },
    { name: 'About us', path: '/aboutus', icon: 'mail-outline' },

  ];

  constructor() {}
}
