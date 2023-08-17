import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';
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
    {
      name: 'Log out',
      path: '/logout',
      icon: 'exit-outline',
      action: () => {
        this.localStorage.removeAll();
        this.router.navigate(['/login']);
      },
    },
  ];

  allergens: any;

  productName: any;

  currentPage = 0;
  pageSize = 20;
  listOfProducts: any = [];

  showSearchModal = false;

  constructor(
    private productService: ProductsService,
    private localStorage: LocalStorageService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService
      .getProducts(this.pageSize, this.currentPage)
      .subscribe((res) => {
        const modifiedProducts = res.map((item: any) => {
          const idPhoto = item._id.replace(
            /(\d{3})(\d{3})(\d{3})(\d{4})/,
            '$1/$2/$3/$4'
          );
          return {
            ...item,
            idPhoto,
          };
        });
        this.listOfProducts = this.listOfProducts.concat(modifiedProducts);
      });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadProducts();
    event.target.complete();
  }

  openModal() {
    this.showSearchModal = true;
    this.productName = this.fb.group({
      name: [''],
    });
  }

  cancel() {}

  confirm() {
    // Nombre:
    // this.allergens listo
    console.log(this.productName.value.name);
    // console.log(this.allergens);
    //LANZAR LLAMADA CON PARAMETROS FILTRADOS
  }

  onCloseModal(event: any) {
    debugger;
  }

  setNewAllergens(event: any) {
    this.allergens = event;
  }
}
