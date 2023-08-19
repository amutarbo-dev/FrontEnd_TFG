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
  allergens: any = [];

  userForm: FormGroup;

  editMode = false;
  user: any;

  constructor(
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private authService: AuthService
  ) {
    this.user = this.localStorage.getItem('user');

    this.userForm = this.fb.group({
      name: [this.user.displayName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  saveChanges(e: Event) {
    e.preventDefault();
    if (this.userForm.valid) {
      this.authService
        .editProfile({ ...this.userForm.value, allergies: this.allergens })
        .subscribe((res: any) => {
          this.localStorage.setItem('user', {
            ...this.user,
            allergies: res.user.allergies,
          });
        });
    }
  }

  setNewAllergens(event: any) {
    this.allergens = event;
  }
}
