import { Component, OnInit } from "@angular/core";
import { Proprietaire } from '../../models/class_proprietaire/proprietaire';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { ProprietaireService } from '../../services/s_proprietaire/proprietaire.service';
import { ProprietaireSessionService } from "../../services/sessionsServices/proprietaire-session.service";
import { ProprietaireLiaisonAuthService } from "../../services/s_liaison-auth/proprietaire-liaison-auth.service";

@Component({
  selector: 'app-login-proprietaire',
  templateUrl: './login-proprietaire.component.html',
  styleUrl: './login-proprietaire.component.css'
})
export class LoginProprietaireComponent {

  loginProprio: Proprietaire = new Proprietaire();
  newProprio: Proprietaire = new Proprietaire();

  constructor(
    private router: Router,
    private ProprietaireService: ProprietaireService,
    private proprietaireSessionService: ProprietaireSessionService,
    private authService: ProprietaireLiaisonAuthService) {}

  ngOnInit() { }

  login(): void {

    this.loginProprio.action = 'login';

    // Vérification des conditions avant la connexion
    if (this.loginProprio.email_prop.trim() === '' || this.loginProprio.mdp_prop.trim() === '') {
      alert('Veuillez remplir correctement tous les champs.');
      return;  // Arrêter le processus de connexion si les conditions ne sont pas remplies
    }

    // Vérification de l'email valide
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.loginProprio.email_prop)) {
      alert('Veuillez saisir une adresse email valide.');
      return;
    }

    // Vérification du mot de passe de plus de 8 caractères
    if (this.loginProprio.mdp_prop.trim().length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
  
    // Appel du service pour vérifier la connexion
    this.ProprietaireService.loginProprio(this.loginProprio).subscribe(
      (response: any) => {
        console.log(response.message);
        // Après une connexion réussie, obtenir le numéro
        this.ProprietaireService.getIdByEmail(this.loginProprio.email_prop).subscribe(
          (ids: any[]) => {
            if (ids.length > 0 && ids[0].numeroprop) {
              const id = ids[0].numeroprop;
              console.log('ID du propriétaire :', id);
                this.authService.login(id);  // Activer l'authentification et accéder au site
                this.proprietaireSessionService.setNumPropSubject(id);
                this.router.navigate(['/home']);
            } else {
              console.error('Aucun ID de propriétaire trouvé');
            }
          },
          (error: any) => {
            console.error('Erreur lors de la récupération de l\'ID du propriétaire :', error);
          }
        );
      },
      (error: any) => {
        alert('La connexion a échoué. Veuillez vérifier vos informations.');
        console.error('Erreur lors de la connexion', error);
      }
    );
  }

  register(): void {

    this.newProprio.action = 'register';

    // Vérification des conditions avant l'inscription
    if (
      this.newProprio.nom_prop.trim() === '' ||
      this.newProprio.prenom_prop.trim() === '' ||
      this.newProprio.adresse_prop.trim() === '' ||
      this.newProprio.codeville_prop.length !== 5 ||  // Vérification de la longueur du code postal
      this.newProprio.tel_prop.length !== 10 ||  // Vérification de la longueur du numéro de téléphone
      !this.newProprio.tel_prop.startsWith('0') ||  // Vérification du préfixe du numéro de téléphone
      this.newProprio.mdp_prop.trim() === '' ||
      this.newProprio.confirmMdp.trim() === '' ||
      this.newProprio.mdp_prop !== this.newProprio.confirmMdp
    ) {
      alert('Veuillez remplir correctement tous les champs.');
      return;  // Arrêter le processus d'inscription si les conditions ne sont pas remplies
    }

    // Vérification de l'email valide
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.newProprio.email_prop)) {
      alert('Veuillez saisir une adresse email valide.');
      return;
    }

    // Vérification du mot de passe de plus de 8 caractères
    if (this.newProprio.mdp_prop.trim().length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    // Appel du service pour vérifier l'inscription
    this.ProprietaireService.registerProprio(this.newProprio).subscribe(
      (response: any) => {
        alert(response.message)
        console.log(response.message);
      },
      (error: any) => {
        alert('L\'incription a échoué');
        console.error('Erreur lors de la connexion', error);
      }
    );
  }

}