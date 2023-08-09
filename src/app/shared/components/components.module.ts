import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { IonicModule } from '@ionic/angular';

const components = [ProductCardComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, IonicModule],
  exports: [...components],
})
export class ComponentsModule {}
