import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from '../../models/class_client/client';
import { Locataire } from '../../models/class_locataire/locataire';
import { Proprietaire } from '../../models/class_proprietaire/proprietaire';

import { ClientService } from '../../services/s_client/client.service';
import { LocataireService } from '../../services/s_locataire/locataire.service';
import { ProprietaireService } from '../../services/s_proprietaire/proprietaire.service';

import { ClientSessionService } from '../../services/sessionsServices/client-session.service';
import { ProprietaireSessionService } from "../../services/sessionsServices/proprietaire-session.service";
import { LocataireSessionService } from '../../services/sessionsServices/locataire-session.service';
import { LocataireLiaisonAuthService } from '../../services/s_liaison-auth/locataire-liaison-auth.service';
import { ProprietaireLiaisonAuthService } from '../../services/s_liaison-auth/proprietaire-liaison-auth.service';
import { ClientLiaisonAuthService } from '../../services/s_liaison-auth/client-liaision-auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  numCli: number | null = null;
  numLoc: number | null = null;
  numProp: number | null = null;

  afficheModif: boolean = false;

  client: Client = new Client();
  locataire: any;
  proprietaire: any;
  cotisationsProp: any; // Revenus et charges à payer
  ceLocataire: Locataire = new Locataire();
  ceProprietaire: Proprietaire = new Proprietaire();

  constructor(
    private router: Router,
    private clientService: ClientService,
    private clientSessionService: ClientSessionService,
    private proprietaireService: ProprietaireService,
    private proprietaireSessionService: ProprietaireSessionService,
    private locataireService: LocataireService,
    private locataireSessionService: LocataireSessionService,
    private locataireauthService: LocataireLiaisonAuthService,
    private clientauthService: ClientLiaisonAuthService,
    private proprietaireauthService: ProprietaireLiaisonAuthService
    ) { }

    deconnexion() {
      this.locataireauthService.logout();
      this.clientauthService.logout();
      this.proprietaireauthService.logout();

      this.router.navigate(['/init']);
    }

    ngOnInit(): void {
      this.numCli = this.clientSessionService.getNumCli();
      if (this.numCli !== null) {
        this.clientService.getProfil(this.numCli).subscribe(
          (leProfil: any) => { // Utiliser any pour accepter tout type de données
            if (leProfil) {
              this.client = leProfil[0];
              console.log(this.client);
            } else {
              console.error('Aucun profil trouvé');
            }
          },
          error => {
            console.error('Erreur lors du chargement du profil', error);
          }
        );
      }
  
      this.numProp = this.proprietaireSessionService.getNumProp();
      if (this.numProp !== null) {
        this.ceProprietaire.numeroprop = this.numProp;
        this.proprietaireService.getProfil(this.numProp).subscribe(
          (leProfil: any) => { // Utiliser any pour accepter tout type de données
            if (leProfil) {
              this.proprietaire = leProfil[0];
              console.log(this.proprietaire);
            } else {
              console.error('Aucun profil trouvé');
            }
          },
          error => {
            console.error('Erreur lors du chargement du profil', error);
          }
        ); // GET PROFIL

        this.proprietaireService.getCotis(this.numProp).subscribe(
          (cotis: any) => { // Utiliser any pour accepter tout type de données
            if (cotis) {
              this.cotisationsProp = cotis[0];
              console.log(this.cotisationsProp);
            } else {
              console.error('Aucune cotisations trouvé');
            }
          },
          error => {
            console.error('Erreur lors du chargement du profil', error);
          }
        ); // GET COTISATIONS
      }

      this.numLoc = this.locataireSessionService.getNumLoc();
      if (this.numLoc !== null) {
        this.ceLocataire.numeroloc = this.numLoc;
        this.locataireService.getProfil(this.numLoc).subscribe(
          (leProfil: any) => { // Utiliser any pour accepter tout type de données
            if (leProfil) {
              this.locataire = leProfil[0];
              console.log(this.locataire);
            } else {
              console.error('Aucun profil trouvé');
            }
          },
          error => {
            console.error('Erreur lors du chargement du profil', error);
          }
        );
      }
    }

    toggleModif() {
      this.afficheModif = !this.afficheModif;
    }

    modifierClient(adresse_cli: string, codeville_cli: string) {

      this.client.action = "modifier";
      this.client.adresse_cli = adresse_cli;
      this.client.codeville_cli = codeville_cli;
  
      console.log(this.client);
  
      if (
        this.client.adresse_cli.trim() === '' ||
        this.client.codeville_cli.length !== 5 ||  // Vérification de la longueur du code postal
        !this.client.codeville_cli.startsWith('75')
      ) {
        alert('Veuillez remplir correctement tous les champs.');
        return;  // Arrêter le processus d'inscription si les conditions ne sont pas remplies
      }
  
      // Appel du service pour vérifier la modification
      this.clientService.modifierClient(this.client).subscribe(
        (response: any) => {
          alert(response.message);
          console.log(response.message);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          alert('Un problème est survenue lors de la modification de la visite');
          console.error('Erreur lors de la modification', error);
        }
      );
    }

    modifierProprio(adresse: string, code_ville: string) {

      this.ceProprietaire.action = "modifier";
      this.ceProprietaire.adresse_prop = adresse;
      this.ceProprietaire.codeville_prop = code_ville;
  
      console.log(this.ceProprietaire);
  
      if (
        this.ceProprietaire.adresse_prop.trim() === '' ||
        this.ceProprietaire.codeville_prop.length !== 5 ||  // Vérification de la longueur du code postal
        !this.ceProprietaire.codeville_prop.startsWith('75')
      ) {
        alert('Veuillez remplir correctement tous les champs.');
        return;  // Arrêter le processus d'inscription si les conditions ne sont pas remplies
      }
  
      // Appel du service pour vérifier la modification
      this.proprietaireService.modifierProprio(this.ceProprietaire).subscribe(
        (response: any) => {
          alert(response.message);
          console.log(response.message);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          alert('Un problème est survenue lors de la modification de la visite');
          console.error('Erreur lors de la modification', error);
        }
      );
    }

    modifierLocataire(tel: string) {

      this.ceLocataire.action = "modifier";
      this.ceLocataire.tel_loc = tel;
  
      console.log(this.ceLocataire);
  
      if (
        this.ceLocataire.tel_loc.length !== 10 ||  // Vérification de la longueur du numéro de téléphone
        !this.ceLocataire.tel_loc.startsWith('0')
      ) {
        alert('Numéro de téléphone longueur 10 et commençant par 0');
        return;  // Arrêter le processus d'inscription si les conditions ne sont pas remplies
      }
  
      // Appel du service pour vérifier la modification
      this.locataireService.modifierLocataire(this.ceLocataire).subscribe(
        (response: any) => {
          alert(response.message);
          console.log(response.message);
          this.router.navigate(['/profil']);
        },
        (error: any) => {
          alert('Un problème est survenue lors de la modification de la visite');
          console.error('Erreur lors de la modification', error);
        }
      );
    }

    supprimerClient(Id: number) {
      this.client.action = "supprimer";
      this.client.num_cli = Id;
  
      console.log(this.client);
  
      // Appel du service pour vérifier la modification
      this.clientService.supprimerClient(this.client).subscribe(
        (response: any) => {
          console.log(response.message);
          this.router.navigate(['/init']);
        },
        (error: any) => {
          alert('Un problème est survenue lors de la suppression');
          console.error('Erreur lors de la suppression', error);
        }
      );
    }

    supprimerProprietaire(Id: number) {
      this.ceProprietaire.action = "supprimer";
      this.ceProprietaire.numeroprop = Id;
  
      console.log(this.ceProprietaire);
  
      // Appel du service pour vérifier la modification
      this.proprietaireService.supprimerProprio(this.ceProprietaire).subscribe(
        (response: any) => {
          console.log(response.message);
          this.router.navigate(['/home']);
          this.router.navigate(['/init']);
        },
        (error: any) => {
          alert('Un problème est survenue lors de la suppression');
          console.error('Erreur lors de la suppression', error);
        }
      );
    }

    supprimerLocataire(Id: number) {
      this.ceLocataire.action = "supprimer";
      this.ceLocataire.numeroloc = Id;
  
      console.log(this.ceLocataire);
  
      // Appel du service pour vérifier la modification
      this.locataireService.supprimerLocataire(this.ceLocataire).subscribe(
        (response: any) => {
          console.log(response.message);
          this.router.navigate(['/init']);
        },
        (error: any) => {
          alert('Un problème est survenue lors de la suppression');
          console.error('Erreur lors de la suppression', error);
        }
      );
    }
}
