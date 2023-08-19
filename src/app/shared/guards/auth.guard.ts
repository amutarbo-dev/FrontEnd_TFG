import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private authService: AuthService
  ) {}

  async getToken() {
    const token = this.localStorage.getItem('token');
    debugger;
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const res: any = await this.authService.getInfo();
      this.localStorage.setItem('user', { ...res });
      return true;
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.getToken();
  }
}
