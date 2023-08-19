import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() idmenu: string = '';

  paths = [
    { name: 'Home', path: '/home', icon: 'home-outline' },
    { name: 'Profile', path: '/profile', icon: 'person-outline' },
    { name: 'Favorites', path: '/favorites', icon: 'star-outline' },
    { name: 'Scan', path: '/scan', icon: 'scan-outline' },
    { name: 'Contact', path: '/contact', icon: 'chatbubble-outline' },
    {
      name: 'Log out',
      path: '/logout',
      icon: 'exit-outline',
      action: () => {
        this.localStorage.removeAll();
        this.router.navigate(['/login']);
      },
    },
  ];

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {}
}
