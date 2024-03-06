import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LiaisonAuthService } from './liaision-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LiaisonAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getIsAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);  // Rediriger vers la page d'accueil si non authentifié
      alert('Vous n\'etes pas connecté !');
      console.error('Vous n\'etes pas connecté !');
      return false;
    }
  }
}