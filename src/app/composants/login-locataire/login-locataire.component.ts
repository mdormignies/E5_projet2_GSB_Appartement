import { Component, OnInit } from "@angular/core";
import { Locataire } from '../../models/class_locataire/locataire';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { LocataireService } from '../../services/s_locataire/locataire.service';
import { LocataireSessionService } from "../../services/sessionsServices/locataire-session.service";
import { LocataireLiaisonAuthService } from "../../services/s_liaison-auth/locataire-liaison-auth.service";

@Component({
  selector: 'app-login-locataire',
  templateUrl: './login-locataire.component.html',
  styleUrl: './login-locataire.component.css'
})
export class LoginLocataireComponent {

  loginLocataire: Locataire = new Locataire();

  constructor(
    private router: Router,
    private locataireService: LocataireService,
    private locataireSessionService: LocataireSessionService,
    private authService: LocataireLiaisonAuthService) {}

  ngOnInit() { }

  login(): void {

    this.loginLocataire.action = 'login';

    // Vérification des conditions avant la connexion
    if (this.loginLocataire.email_loc.trim() === '' || this.loginLocataire.mdp_loc.trim() === '') {
      alert('Veuillez remplir correctement tous les champs.');
      return;  // Arrêter le processus de connexion si les conditions ne sont pas remplies
    }

    // Vérification de l'email valide
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.loginLocataire.email_loc)) {
      alert('Veuillez saisir une adresse email valide.');
      return;
    }

    // Vérification du mot de passe de plus de 8 caractères
    if (this.loginLocataire.mdp_loc.trim().length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
  
    // Appel du service pour vérifier la connexion
    this.locataireService.loginLocataire(this.loginLocataire).subscribe(
      (response: any) => {
        console.log(response.message);
        // Après une connexion réussie, obtenir le numéro de locataire
        this.locataireService.getIdByEmail(this.loginLocataire.email_loc).subscribe(
          (ids: any[]) => {
            if (ids.length > 0 && ids[0].numeroloc) {
              const id = ids[0].numeroloc;
              console.log('ID du locataire :', id);
                this.authService.login(id);  // Activer l'authentification et accéder au site
                this.locataireSessionService.setNumLocSubject(id);
                this.router.navigate(['/profil']);
            } else {
              console.error('Aucun ID de locataire trouvé');
            }
          },
          (error: any) => {
            console.error('Erreur lors de la récupération de l\'ID du locataire :', error);
          }
        );
      },
      (error: any) => {
        alert('La connexion a échoué. Veuillez vérifier vos informations.');
        console.error('Erreur lors de la connexion', error);
      }
    );
  }
}