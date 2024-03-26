import { Component, OnInit } from "@angular/core";
import { Demande } from "../../models/class_demande/demande";
import { Locataire } from "../../models/class_locataire/locataire";
import { Client } from "../../models/class_client/client";
import { Appartement } from '../../models/class_appartement/appartement';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { DemandeService } from "../../services/s_demande/demande.service";
import { ClientService } from "../../services/s_client/client.service";
import { LocataireService } from "../../services/s_locataire/locataire.service";
import { AppartementService } from '../../services/s_appartement/appartement.service';

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
  cetAppartement: any ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private demandeService: DemandeService,
    private locataireService: LocataireService,
    private clientService: ClientService,
    private appartementService: AppartementService,
    private clientSessionService: ClientSessionService
  ) { }

  ngOnInit() {
    // Récupérer l'ID de l'appartement à partir de l'URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const appartementId = +idParam;
      // Charger les détails de l'appartement en fonction de son ID
      this.loadAppartement(appartementId);
      this.newDemande.d_numappart = appartementId;
    } else {
      alert('Il y a quelque chose qui cloche...');
      this.router.navigate(['/home']);
    }

    const numCli = this.clientSessionService.getNumCli();
    if (numCli !== null) {
      this.newDemande.d_num_cli = numCli ;
    }


  }

  loadAppartement(appartementId: number): void {
    this.appartementService.getAppartementById(appartementId).subscribe(
      (appartementData: any) => { // Utiliser any pour accepter tout type de données
        if (appartementData) {
          this.cetAppartement = appartementData[0]; // Récupérer le premier élément du tableau
          this.newDemande.d_numeroprop = parseInt(this.cetAppartement.numeroprop, 10);
        } else {
          console.error('Aucun appartement trouvé');
        }
      },
      error => {
        console.error('Erreur lors du chargement de l\'appartement:', error);
      }
    );
  }

  nouvelleDemande() {
    this.newDemande.action = "ajouter";
    this.newDemande.statut_dem = "En cours";

    this.demandeService.nouvelleDemande(this.newDemande).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/demande']);
      },
      (error: any) => {
        alert('Un problème est survenue lors de l\'ajout de la demande');
        console.error('Erreur lors de la connexion', error);
      }
    );
  }

}
