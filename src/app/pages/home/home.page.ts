import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/local-storage.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  allergens: any;
  productName: any;

  currentPage = 0;
  pageSize = 20;
  listOfProducts: any = [];

  showSearchModal = false;

  query: any;
  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService
      .getProducts(this.pageSize, this.currentPage, this.query)
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

  openModal() {}

  onModalClose(event: any) {
    this.query = { name: event.name, allergens_tags: event.allergens };
    this.showSearchModal = false;
    this.listOfProducts = [];
    this.loadProducts();
  }
}
