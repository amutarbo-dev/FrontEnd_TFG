import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
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
        // this.localStorage.removeAll();
        // this.router.navigate(['/login']);
      },
    },
  ];

  constructor(private auth: AuthService) {}
  favoriteProducts = [];

  ngOnInit() {
    this.auth.getFavorites().subscribe((res) => {
      this.favoriteProducts = res.map((item: any) => {
        const idPhoto = item._id.replace(
          /(\d{3})(\d{3})(\d{3})(\d{4})/,
          '$1/$2/$3/$4'
        );
        return {
          ...item,
          idPhoto,
        };
      });
    });
  }
}
