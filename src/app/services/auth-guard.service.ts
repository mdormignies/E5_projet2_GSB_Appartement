import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ClientLiaisonAuthService } from './s_liaison-auth/client-liaision-auth.service';
import { LocataireLiaisonAuthService } from './s_liaison-auth/locataire-liaison-auth.service';
import { ProprietaireLiaisonAuthService } from './s_liaison-auth/proprietaire-liaison-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private clientAuthService: ClientLiaisonAuthService,
    private locataireAuthService: LocataireLiaisonAuthService,
    private proprietaireAuthService: ProprietaireLiaisonAuthService,
    private router: Router) {}

    canActivate(): boolean {
      // Vérification de l'authentification du client
      if (this.clientAuthService.getIsAuthenticated()) {
        return true;
      }
      
      // Vérification de l'authentification du locataire
      if (this.locataireAuthService.getIsAuthenticated()) {
        return true;
      }
  
      // Vérification de l'authentification du propriétaire
      if (this.proprietaireAuthService.getIsAuthenticated()) {
        return true;
      }
  
      // Si aucun utilisateur n'est authentifié, rediriger vers la page d'accueil
      this.router.navigate(['/']);
      alert('Vous n\'êtes pas connecté !');
      console.error('Vous n\'êtes pas connecté !');
      return false;
    }
}