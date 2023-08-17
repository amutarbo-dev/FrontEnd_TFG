import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  path = '/assets/icon/allergens';
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

  userForm: FormGroup;

  editMode = false;

  constructor(
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private authService: AuthService
  ) {
    const user = this.localStorage.getItem('user');

    this.userForm = this.fb.group({
      name: [user.displayName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
    });

    this.allergens = this.allergens.map((allergen: any) => {
      const allergensUser = user.allergies;
      return {
        ...allergen,
        disabled: !allergensUser.includes(allergen.type),
      };
    });
  }

  ngOnInit() {
    // Recuperar datos usuarios
  }

  saveChanges(e: Event) {
    e.preventDefault();
    if (this.userForm.valid) {
      const allergies = this.allergens
        .map((al: any) => {
          if (al.disabled) {
            return;
          }

          return al.type;
        })
        .filter((type: any) => type !== undefined && type !== null);

      this.authService
        .editProfile({ ...this.userForm.value, allergies })
        .subscribe((res) => {});
    }
  }
}
