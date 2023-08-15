import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  userForm: FormGroup;

  editMode = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
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
    if (!this.userForm.valid) {
      return;
    }

    try {
      this.authService
        .registerUser(this.userForm.value)
        .subscribe((res: any) => {
          this.presentAlert({
            header: 'Registro completado',
            message: 'Inicie sesion para continuar',
          });
        });
    } catch (err: any) {
      // Modal Error Programar
    }
  }

  async presentAlert(content: { header: string; message: string }) {
    const alert = await this.alertController.create({
      header: content.header,
      message: content.message,
      buttons: [
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => this.router.navigate(['/login']),
        },
      ],
    });

    await alert.present();
  }
}
