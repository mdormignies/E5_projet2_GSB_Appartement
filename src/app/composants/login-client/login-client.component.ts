import { Component, OnInit } from "@angular/core";
import { Client } from '../../models/class_client/client';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { ClientService } from "../../services/s_client/client.service";
import { ClientSessionService } from '../../services/sessionsServices/client-session.service';
import { ClientLiaisonAuthService } from '../../services/s_liaison-auth/client-liaision-auth.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  loginClient: Client = new Client();
  newClient: Client = new Client();

  constructor(
    private router: Router,
    private clientService: ClientService,
    private authService: ClientLiaisonAuthService,
    private clientSessionService: ClientSessionService) {}

  ngOnInit() { }

  login(): void {

    this.loginClient.action = 'login';

    // Vérification des conditions avant la connexion
    if (this.loginClient.email_cli.trim() === '' || this.loginClient.mdp_cli.trim() === '') {
      alert('Veuillez remplir correctement tous les champs.');
      return;  // Arrêter le processus de connexion si les conditions ne sont pas remplies
    }

    // Vérification de l'email valide
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.loginClient.email_cli)) {
      alert('Veuillez saisir une adresse email valide.');
      return;
    }

    // Vérification du mot de passe de plus de 8 caractères
    if (this.loginClient.mdp_cli.trim().length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
  
    // Appel du service pour vérifier la connexion
    this.clientService.loginClient(this.loginClient).subscribe(
      (response: any) => {
        console.log(response.message);
        // Après une connexion réussie, obtenir le numéro
        this.clientService.getIdByEmail(this.loginClient.email_cli).subscribe(
          (ids: any[]) => {
            if (ids.length > 0 && ids[0].num_cli) {
              const id = ids[0].num_cli;
              console.log('ID du client :', id);
                this.authService.login(id);  // Activer l'authentification et accéder au site
                this.clientSessionService.setNumCliSubject(id);
                this.router.navigate(['/home']);
            } else {
              console.error('Aucun ID de client trouvé');
            }
          },
          (error: any) => {
            console.error('Erreur lors de la récupération de l\'ID du client :', error);
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

    this.newClient.action = 'register';

    // Vérification des conditions avant l'inscription
    if (
      this.newClient.nom_cli.trim() === '' ||
      this.newClient.prenom_cli.trim() === '' ||
      this.newClient.adresse_cli.trim() === '' ||
      this.newClient.codeville_cli.length !== 5 ||  // Vérification de la longueur du code postal
      this.newClient.tel_cli.length !== 10 ||  // Vérification de la longueur du numéro de téléphone
      !this.newClient.tel_cli.startsWith('0') ||  // Vérification du préfixe du numéro de téléphone
      this.newClient.mdp_cli.trim() === '' ||
      this.newClient.confirmMdp.trim() === '' ||
      this.newClient.mdp_cli !== this.newClient.confirmMdp
    ) {
      alert('Veuillez remplir correctement tous les champs.');
      return;  // Arrêter le processus d'inscription si les conditions ne sont pas remplies
    }

    // Vérification de l'email valide
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.newClient.email_cli)) {
      alert('Veuillez saisir une adresse email valide.');
      return;
    }

    // Vérification du mot de passe de plus de 8 caractères
    if (this.newClient.mdp_cli.trim().length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    // Appel du service pour vérifier l'inscription
    this.clientService.registerClient(this.newClient).subscribe(
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