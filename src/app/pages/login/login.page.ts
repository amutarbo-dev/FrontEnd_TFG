import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async login() {
    try {
      const res: any = await this.authService.signIn(this.loginForm.value);
      const token = await res.user.getIdToken();

      if (token) {
        this.localStorageService.setItem('token', token);
        this.router.navigate(['/home']);
      }
    } catch (err: any) {
      // Modal Error Programar
    }
  }
}
