import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appartement } from '../../models/class_appartement/appartement';

import { AppartementService } from '../../services/s_appartement/appartement.service';
import { ProprioAppartementService } from '../../services/s_appartement/proprio-appartement.service';

import { ClientSessionService } from '../../services/sessionsServices/client-session.service';
import { ProprietaireSessionService } from "../../services/sessionsServices/proprietaire-session.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  unAppartement: Appartement = new Appartement();
  appartementList: Appartement[] = [];
  proprioAppartementList: any;
  showModifAppartementInput: boolean = false;
  filteredAppartementList: Appartement[] = [];
  arrondissements: number[] = [];
  typesAppartement: string[] = [];
  prixMin: number = 0;
  prixMax: number = 1000000;

  numCli: number | null = null;
  numProp: number | null = null;

  constructor(
    private router: Router,
    private appartementService: AppartementService,
    private proprioAppartementService: ProprioAppartementService,
    private clientSessionService: ClientSessionService,
    private proprietaireSessionService: ProprietaireSessionService) { }

  ngOnInit(): void {
    this.numCli = this.clientSessionService.getNumCli();
    if (this.numCli !== null) {
      this.loadAppartement();
    }

    this.numProp = this.proprietaireSessionService.getNumProp();
    if (this.numProp !== null) {
      this.proprioAppartementService.getAppartementById(this.numProp).subscribe((LesAppartements: Appartement[]) => {
        this.proprioAppartementList = LesAppartements;
        console.log(this.proprioAppartementList);
      });
    }
  }

  loadAppartement(): void {
    this.appartementService.getAppartement().subscribe((LesAppartements: Appartement[]) => {
      this.appartementList = LesAppartements;
      // Créer la liste des arrondissements disponibles
      this.arrondissements = Array.from(new Set(this.appartementList.map(app => app.arrondisse)));
      // Créer la liste des types d'appartements disponibles
      this.typesAppartement = Array.from(new Set(this.appartementList.map(app => app.typappart)));
      this.filteredAppartementList = this.appartementList;
    });
  }

  sortByArrondissement(arrondissement: number | string): void {
    if (arrondissement === 'all') {
      this.filteredAppartementList = this.appartementList;
    } else {
      this.filteredAppartementList = this.appartementList.filter(app => app.arrondisse === arrondissement);
    }
    console.log('Liste : ', this.filteredAppartementList);
  }

  sortByTypeAppartement(type: string | string[]): void {
    if (type === 'all') {
      this.filteredAppartementList = this.appartementList;
    } else {
      this.filteredAppartementList = this.appartementList.filter(app => app.typappart === type);
    }
    console.log('Liste : ', this.filteredAppartementList);
  }

  sortByPrixLocation(): void {
    this.filteredAppartementList = this.appartementList.filter(app =>
      (this.prixMin ? app.prix_loc >= this.prixMin : true) &&
      (this.prixMax ? app.prix_loc <= this.prixMax : true)
    );
    console.log('Liste : ', this.filteredAppartementList);
  }

  goToAppartement(appartement: Appartement) {
    this.router.navigate(['/appartement', appartement.numappart]);
  }

  goToNewAppartement() {
    this.router.navigate(['/ajout-appartement']);
  }

  toggleModifDateInput(CetAppartement: Appartement) {
    CetAppartement.modificationEnCours = !CetAppartement.modificationEnCours;
  }

  dateInPast(laDate: Date): boolean {
    const today = new Date();
    return new Date(laDate) < today;
  }

  modifierAppartement(numappart: number, modifDate: Date) {

    this.unAppartement.action = "modifier";
    this.unAppartement.modifDate = modifDate;
    this.unAppartement.numappart = numappart;

    console.log(this.unAppartement);

    if (this.dateInPast(modifDate)) {
      alert('La date de visite doit être future.');
      return; // Arrête l'exécution de la méthode si la date est dans le passé
    }

    // Appel du service pour vérifier la modification
    this.proprioAppartementService.modifierAppartement(this.unAppartement).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/profil']);
      },
      (error: any) => {
        alert('Un problème est survenue lors de la modification de la visite');
        console.error('Erreur lors de la modification', error);
      }
    );
  }

  supprimerAppartement(numappart: number) {
    this.unAppartement.action = "supprimer";
    this.unAppartement.numappart = numappart;

    console.log(this.unAppartement);

    // Appel du service pour vérifier la modification
    this.proprioAppartementService.supprimerAppartement(this.unAppartement).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/profil']);
      },
      (error: any) => {
        alert('Un problème est survenue lors de la suppression de la visite : vous avez peut-être une visite de prévue pour cette appartement');
        console.error('Erreur lors de la suppression', error);
      }
    );
  }
}