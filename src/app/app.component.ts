import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Productos', url: 'outbox', icon: 'basket' },
    { title: 'Escanear', url: 'favorites', icon: 'scan' },
    { title: 'Contacto', url: 'favorites', icon: 'mail-open' },
    { title: 'Perfil', url: 'archived', icon: 'person' },
  ];

  constructor() {}
}
