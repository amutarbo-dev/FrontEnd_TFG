import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  path = '/assets/icon/allergens';
  allergens: any = [
    { path: 'lacteos.png', disabled: false },
    { path: 'gluten.png', disabled: false },
    { path: 'soja.png', disabled: false },
    { path: 'huevo.png', disabled: false },
    { path: 'frutosdecascara.png', disabled: false },
    { path: 'mostaza.png', disabled: false },
    { path: 'fish.png', disabled: false },
    { path: 'peanuts.png', disabled: false },
    { path: 'sulfitos.png', disabled: false },
    { path: 'sesamo.png', disabled: false },
    { path: 'moluscos.png', disabled: false },
    { path: 'lupins.png', disabled: false },
    { path: 'apio.png', disabled: false },
  ];

  userForm: FormGroup;

  editMode = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Recuperar datos usuarios
  }

  saveChanges() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      console.log(this.allergens);
    }
  }
}
