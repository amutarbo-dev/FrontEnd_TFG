import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: any;

  isNotCompleted: boolean = false;
  noAllergens: boolean = false;
  userFavorite: boolean = false;

  user: any;

  constructor(
    private localStorage: LocalStorageService,
    private userService: AuthService
  ) {
    this.user = this.localStorage.getItem('user');
  }

  ngOnInit() {
    this.getDangerIcon();
    this.userFavorite = this.user.favorites.includes(this.product.id);
  }

  getDangerIcon() {
    this.noAllergens = this.product.allergens_tags.length === 0 ? true : false;
    if (this.noAllergens) {
      return;
    }
    this.isNotCompleted = this.product.completeness < 0.5 ? true : false;
  }

  getAllergens(typeOfAllergen: string) {
    const path = '/assets/icon/allergens';
    const allergens: any = {
      'en:milk': `${path}/lacteos.png`,
      'en:gluten': `${path}/gluten.png`,
      'en:soybeans': `${path}/soja.png`,
      'en:eggs': `${path}/huevo.png`,
      'en:nuts': `${path}/frutosdecascara.png`,
      'en:mustard': `${path}/mostaza.png`,
      'en:fish': `${path}/fish.png`,
      'en:peanuts': `${path}/peanuts.png`,
      'en:sulphur-dioxide-and-sulphites': `${path}/sulfitos.png`,
      'en:sesame-seeds': `${path}/sesamo.png`,
      'en:molluscs': `${path}/moluscos.png`,
      'en:lupins': `${path}/lupins.png`,
      'en:celery': `${path}/apio.png`,
    };

    return allergens[typeOfAllergen];
  }

  setFavorite() {
    const { favorites } = this.user;
    const added = favorites.concat(this.product.id);
    this.editFavorite(added);
    this.userFavorite = true;
  }

  deleteFavorite() {
    const { favorites } = this.user;
    const removed = favorites.filter((id: string) => id !== this.product.id);
    this.editFavorite(removed);
    this.userFavorite = false;
  }

  private editFavorite(body: any) {
    this.userService.editProfile({ favorites: body }).subscribe((res: any) => {
      this.user = {
        ...this.user,
        favorites: body,
      };

      this.localStorage.setItem('user', this.user);
    });
  }
}
