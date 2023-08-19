import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService } from '@services/local-storage.service';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  @Input() isOpen = false;
  @Output() onModalClose = new EventEmitter<any>();

  productName: any;
  allergens: any;
  productList: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private localStorage: LocalStorageService
  ) {
    this.allergens = this.localStorage.getItem('user').allergies.join();
  }

  ngOnInit() {
    this.productName = this.fb.group({
      name: [''],
    });
  }

  cancel() {
    this.isOpen = false;
  }

  confirm() {
    this.onModalClose.emit({
      name: this.productName.value.name,
      allergens: this.allergens,
    });
  }

  onCloseModal(event: any) {
    if (event.type === 'willDismiss') {
      return;
    }
  }

  setNewAllergens(event: any) {
    this.allergens = event;
  }
}
