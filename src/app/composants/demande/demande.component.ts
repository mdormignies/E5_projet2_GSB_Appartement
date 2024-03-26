import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Demande } from "../../models/class_demande/demande";
import { Locataire } from "../../models/class_locataire/locataire";
import { Client } from '../../models/class_client/client';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { DemandeService } from "../../services/s_demande/demande.service";
import { ClientService } from '../../services/s_client/client.service';
import { LocataireService } from "../../services/s_locataire/locataire.service";

import { ClientSessionService } from '../../services/sessionsServices/client-session.service';
import { ProprietaireSessionService } from "../../services/sessionsServices/proprietaire-session.service";

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrl: './demande.component.css'
})
export class DemandeComponent implements OnInit {

  uneDemande: Demande = new Demande();
  lesDemandes: any;

  showModifInput: boolean = false;
  maxDate: string;

  numCli: number | null = null;
  numProp: number | null = null;

  newLocataire: Locataire = new Locataire();
  client: any;

  constructor(
    private router: Router,
    private demandeService: DemandeService,
    private locataireService: LocataireService,
    private clientService: ClientService,
    private clientSessionService: ClientSessionService,
    private proprietaireSessionService: ProprietaireSessionService,
  ) {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
    // Formatage de la date maximale au format ISO requis pour le champ de date HTML
    this.maxDate = maxDate.toISOString().split('T')[0];
  }

  ngOnInit() {

    //------------------------- DEMANDES DU CLIENT ------------------------\\

    // Récupérer le num_cli depuis le service de session client
    const numCli = this.clientSessionService.getNumCli();
    if (numCli !== null) {
      this.uneDemande.d_num_cli = numCli;
      this.numCli = numCli;

      this.demandeService.getDemandesByNumCli(numCli).subscribe(
        (lesDemandes: any) => { // Utiliser any pour accepter tout type de données
          if (lesDemandes) {
            this.lesDemandes = lesDemandes;
            console.log(this.lesDemandes);
          } else {
            console.error('Aucune demande trouvée');
          }
        },
        error => {
          console.error('Erreur lors du chargement de la liste des demandes', error);
        }
      );
    }

    //------------------------- DEMANDES DU PROPRIETAIRE ------------------------\\

    // Récupérer le numProp depuis le service de session Proprietaire
    const numProp = this.proprietaireSessionService.getNumProp();
    if (numProp !== null) {
      this.uneDemande.d_numeroprop = numProp;
      this.numProp = numProp;

      this.demandeService.getDemandesByNumProp(numProp).subscribe(
        (lesDemandes: any) => { // Utiliser any pour accepter tout type de données
          if (lesDemandes) {
            this.lesDemandes = lesDemandes;
            console.log(this.lesDemandes);
          } else {
            console.error('Aucune demande trouvée');
          }
        },
        error => {
          console.error('Erreur lors du chargement de la liste des demandes', error);
        }
      );
    }
  }

  supprimerDemande(num_dem: string) {
    this.uneDemande.action = "supprimer";
    this.uneDemande.num_dem = parseInt(num_dem, 10);

    console.log(this.uneDemande);

    this.demandeService.supprimerDemande(this.uneDemande).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        alert('Un problème est survenue lors de la suppression de la demande');
        console.error('Erreur lors de la suppression', error);
      }
    );
  }

  ChangerStatutDemande(num_dem: string) {
    this.uneDemande.action = "modifier";
    this.uneDemande.num_dem = parseInt(num_dem, 10);

    console.log(this.uneDemande);

    this.demandeService.modifierDemande(this.uneDemande).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        alert('Un problème est survenue lors de la modification de la demande');
        console.error('Erreur lors de la modification', error);
      }
    );
  }

  toggleLocataireInput(uneDemande: any) {
    uneDemande.modificationEnCours = !uneDemande.modificationEnCours;
  }

  ajouterLocataire(uneDemande: any) {

    this.newLocataire.action = 'ajouter' ;
    this.newLocataire.numappart = parseInt(uneDemande.numappart, 10);

    const ribAsString: string = this.newLocataire.rib.toString();

    // Valider le RIB
    if (!/^[0-9]{9}$/.test(ribAsString)) {
      alert("Le RIB doit être composé de 9 chiffres.");
      return;
    }

    // Valider le numéro de téléphone de la banque
    if (!/^0[0-9]{9}$/.test(this.newLocataire.tel_banque)) {
      alert("Le numéro de téléphone de la banque doit commencer par 0 et être composé de 10 chiffres.");
      return;
    }

    this.clientService.getProfil(uneDemande.num_cli).subscribe(
      (leProfil: any) => { // Utiliser any pour accepter tout type de données
        if (leProfil) {
          this.client = leProfil[0];
        } else {
          console.error('Aucun profil trouvé');
        }
      },
      error => {
        console.error('Erreur lors du chargement du profil', error);
      }
    );

    this.newLocataire.email_loc = this.client.email_cli ;
    this.newLocataire.mdp_loc = this.client.mdp_cli ;
    this.newLocataire.nom_loc = this.client.nom_cli ;
    this.newLocataire.prenom_loc = this.client.prenom_cli ;
    this.newLocataire.tel_loc = this.client.tel_cli ;

    console.log(this.newLocataire);

    this.locataireService.ajouterLocataire(this.newLocataire).subscribe(
      (response: any) => {
        alert(response.message);
        console.log(response.message);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        alert('L\'incription a échoué');
        console.error('Erreur lors de la connexion', error);
      }
    );
  }
}