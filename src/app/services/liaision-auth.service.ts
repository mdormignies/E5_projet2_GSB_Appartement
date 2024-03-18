import { Injectable } from '@angular/core';
import { ClientSessionService } from '../services/sessionsServices/client-session.service';

@Injectable({
  providedIn: 'root'
})
export class LiaisonAuthService {
  private isAuthenticated: boolean = false;

  constructor(private clientSessionService: ClientSessionService) {}

  login(numCli: number) {
    // Logique d'authentification
    this.isAuthenticated = true;
    this.clientSessionService.setNumCli(numCli); // Stocker le num_cli
  }

  logout() {
    // Logique de déconnexion
    this.isAuthenticated = false;
    this.clientSessionService.clearNumCli(); // Effacer le num_cli lors de la déconnexion
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}