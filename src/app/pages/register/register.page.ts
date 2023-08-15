import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  userForm: FormGroup;

  editMode = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.userForm = this.fb.group(
      {
        displayName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.matchingPasswords('password', 'confirmPassword'),
      }
    );
  }

  matchingPasswords(password: string, confirmPassword: string) {
    return (group: FormGroup) => {
      const pwd = group.controls[password];
      const confirmPwd = group.controls[confirmPassword];

      if (pwd.value !== confirmPwd.value) {
        confirmPwd.setErrors({ passwordMismatch: true });
        return;
      }

      confirmPwd.setErrors(null);
    };
  }

  register() {
    debugger;
    if (!this.userForm.valid) {
      return;
    }

    try {
      debugger;

      const res = this.authService
        .registerUser(this.userForm.value)
        .subscribe((res: any) => {
          debugger;
        });
    } catch (err: any) {
      // Modal Error Programar
    }
  }
}
