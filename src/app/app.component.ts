import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Productos', url: 'products', icon: 'basket' },
    { title: 'Escanear', url: 'scan', icon: 'scan' },
    { title: 'Contacto', url: 'contact', icon: 'mail-open' },
    { title: 'Perfil', url: 'profile', icon: 'person' },
  ];

  constructor() {}
}
