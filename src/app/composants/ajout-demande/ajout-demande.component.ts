import { Component, OnInit } from "@angular/core";
import { Demande } from "../../models/class_demande/demande";
import { Locataire } from "../../models/class_locataire/locataire";
import { Client } from "../../models/class_client/client";
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { DemandeService } from "../../services/s_demande/demande.service";
import { ClientService } from "../../services/s_client/client.service";
import { LocataireService } from "../../services/s_locataire/locataire.service";

import { ClientSessionService } from '../../services/sessionsServices/client-session.service';
import { LocataireSessionService } from "../../services/sessionsServices/locataire-session.service";

@Component({
  selector: 'app-ajout-demande',
  templateUrl: './ajout-demande.component.html',
  styleUrl: './ajout-demande.component.css'
})
export class AjoutDemandeComponent implements OnInit {
  newDemande: Demande = new Demande();
  newLocataire: Locataire = new Locataire();
  ceClient: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private demandeService: DemandeService,
    private locataireService: LocataireService,
    private clientService: ClientService,
    private clientSessionService: ClientSessionService
  ) { }

  ngOnInit() {
    // Récupérer l'ID de l'appartement à partir de l'URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const appartementId = +idParam;
      // Charger les détails de l'appartement en fonction de son ID
      this.newDemande.d_numappart = appartementId;
    } else {
      alert('Il y a quelque chose qui cloche...');
      this.router.navigate(['/home']);
    }

    const numCli = this.clientSessionService.getNumCli();
    if (numCli !== null) {

      // Appeler le service de visite pour récupérer les visites associées à ce client
      this.clientService.getProfil(numCli).subscribe(
        (client: any) => { // Utiliser any pour accepter tout type de données
          if (client) {
            this.ceClient = client[0];
            console.log(this.ceClient);
          } else {
            console.error('Aucune visite trouvé');
          }
        },
        error => {
          console.error('Erreur lors du chargement de la liste de visites', error);
        }
      );
    }
  }

  ajouterLocataire() {
    this.newLocataire.action = 'ajouter';
    this.newLocataire.mdp_loc = this.ceClient.mdp_cli;
    this.newLocataire.nom_loc = this.ceClient.nom_cli;
    this.newLocataire.prenom_loc = this.ceClient.prenom_cli;
    this.newLocataire.tel_loc = this.ceClient.tel_cli;
    this.newLocataire.datenaiss = this.ceClient.datenaiss;
    this.newLocataire.rib = this.ceClient.rib;
    this.newLocataire.tel_banque = this.ceClient.tel_banque;

    console.log(this.newLocataire);

    // Appel du service pour vérifier l'ajout
    this.locataireService.ajouterLocataire(this.newLocataire).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/profil']);
      },
      (error: any) => {
        alert('Un problème est survenue lors de l\'ajout de la visite');
        console.error('Erreur lors de la connexion', error);
      }
    );
  }

}
