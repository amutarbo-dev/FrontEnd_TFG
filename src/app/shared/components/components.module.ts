import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { IonicModule } from '@ionic/angular';
import { BackButtonComponent } from './back-button/back-button.component';
import { RouterModule } from '@angular/router';

const components = [ProductCardComponent, BackButtonComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [...components],
})
export class ComponentsModule {}
