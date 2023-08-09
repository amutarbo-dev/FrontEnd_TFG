import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  paths = [
    { name: 'Profile', path: '/profile', icon: 'person-outline' },
    { name: 'Shop', path: '/shop', icon: 'basket-outline' },
    { name: 'Items', path: '/items', icon: 'pricetag-outline' },
    { name: 'Contact', path: '/contact', icon: 'chatbubble-outline' },
    { name: 'About us', path: '/aboutus', icon: 'mail-outline' },
    { name: 'Log out', path: '/logout', icon: 'mail-outline' },
  ];

  listOfProducts: any;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    // this.productService.getProducts(20, 0).subscribe((res) => {
    //   this.listOfProducts = res.map((item: any) => {
    //     const idPhoto = item._id.replace(
    //       /(\d{3})(\d{3})(\d{3})(\d{4})/,
    //       '$1/$2/$3/$4'
    //     );
    //     return {
    //       ...item,
    //       idPhoto,
    //     };
    //   });
    // });
  }
}
