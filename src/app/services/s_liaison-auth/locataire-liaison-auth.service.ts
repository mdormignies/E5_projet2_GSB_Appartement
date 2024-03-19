import { Injectable } from '@angular/core';
import { LocataireSessionService } from '../sessionsServices/locataire-session.service';

@Injectable({
  providedIn: 'root'
})
export class LocataireLiaisonAuthService {
  private isAuthenticated: boolean = false;

  constructor(private locataireSessionService: LocataireSessionService) {}

  login(numLoc: number) {
    // Logique d'authentification
    this.isAuthenticated = true;
    this.locataireSessionService.setNumLoc(numLoc); // Stocker le num
  }

  logout() {
    // Logique de déconnexion
    this.isAuthenticated = false;
    this.locataireSessionService.clearNumLoc(); // Effacer le num lors de la déconnexion
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
