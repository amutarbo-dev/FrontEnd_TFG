import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { IonicModule } from '@ionic/angular';
import { BackButtonComponent } from './back-button/back-button.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAllergensIconsComponent } from './list-allergens-icons/list-allergens-icons.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { MenuComponent } from './menu/menu.component';

const components = [
  ProductCardComponent,
  BackButtonComponent,
  ListAllergensIconsComponent,
  SearchModalComponent,
  MenuComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [...components],
})
export class ComponentsModule {}
