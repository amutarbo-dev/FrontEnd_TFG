import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-list-allergens-icons',
  templateUrl: './list-allergens-icons.component.html',
  styleUrls: ['./list-allergens-icons.component.scss'],
})
export class ListAllergensIconsComponent {
  @Input() editMode = true;
  @Output() changeAllergens = new EventEmitter<any[]>();

  allergens: any = [
    { path: 'lacteos.png', type: 'en:milk', disabled: false },
    { path: 'gluten.png', type: 'en:gluten', disabled: false },
    { path: 'soja.png', type: 'en:soybeans', disabled: false },
    { path: 'huevo.png', type: 'en:eggs', disabled: false },
    { path: 'frutosdecascara.png', type: 'en:nuts', disabled: false },
    { path: 'mostaza.png', type: 'en:mustard', disabled: false },
    { path: 'fish.png', type: 'en:fish', disabled: false },
    { path: 'peanuts.png', type: 'en:peanuts', disabled: false },
    {
      path: 'sulfitos.png',
      type: 'en:sulphur-dioxide-and-sulphites',
      disabled: false,
    },
    { path: 'sesamo.png', type: 'en:sesame-seeds', disabled: false },
    { path: 'moluscos.png', type: 'en:molluscs', disabled: false },
    { path: 'lupins.png', type: 'en:lupins', disabled: false },
    { path: 'apio.png', type: 'en:celery', disabled: false },
  ];

  constructor(private localStorage: LocalStorageService) {
    const user = this.localStorage.getItem('user');
    this.allergens = this.allergens.map((al: any) => {
      if (user.allergies.includes(al.type)) {
        return { ...al, disabled: false };
      }
      return { ...al, disabled: true };
    });
  }

  selectAllergen(al: any) {
    this.allergens = this.allergens.map((el: any) => {
      if (el.type === al.type) {
        return {
          ...el,
          disabled: !el.disabled,
        };
      }

      return el;
    });

    const allergens_tags = this.allergens
      .map((al: any) => {
        if (al.disabled) {
          return;
        }

        return al.type;
      })
      .filter((type: any) => type !== undefined && type !== null);

    this.changeAllergens.emit(allergens_tags);
  }
}
