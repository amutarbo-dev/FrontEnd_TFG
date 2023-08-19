import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
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
