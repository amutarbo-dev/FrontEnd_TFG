import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { IonicModule } from '@ionic/angular';
import { BackButtonComponent } from './back-button/back-button.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAllergensIconsComponent } from './list-allergens-icons/list-allergens-icons.component';

const components = [
  ProductCardComponent,
  BackButtonComponent,
  ListAllergensIconsComponent,
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
