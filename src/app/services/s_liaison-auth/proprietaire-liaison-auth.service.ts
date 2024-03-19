import { Injectable } from '@angular/core';
import { ProprietaireSessionService } from '../sessionsServices/proprietaire-session.service';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireLiaisonAuthService {
  private isAuthenticated: boolean = false;

  constructor(private proprietaireSessionService: ProprietaireSessionService) {}

  login(numProp: number) {
    // Logique d'authentification
    this.isAuthenticated = true;
    this.proprietaireSessionService.setNumProp(numProp); // Stocker le num
  }

  logout() {
    // Logique de déconnexion
    this.isAuthenticated = false;
    this.proprietaireSessionService.clearNumProp(); // Effacer le num lors de la déconnexion
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}