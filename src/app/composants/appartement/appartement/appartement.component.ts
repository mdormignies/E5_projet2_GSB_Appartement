import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appartement } from '../../../models/class_appartement/appartement';
import { AppartementService } from '../../../services/s_appartement/appartement.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-appartement',
  templateUrl: './appartement.component.html',
  styleUrl: './appartement.component.css'
})
export class AppartementComponent implements OnInit {

  appartement: Appartement = new Appartement();
  showAjoutVisiteComponent: boolean = false;
  private _appartementIdSubject = new BehaviorSubject<number | null>(null);
  appartementId$ = this._appartementIdSubject.asObservable();

  constructor(private route: ActivatedRoute, private router: Router, private appartementService: AppartementService) { }

  ngOnInit() {
    // Récupérer l'ID de l'appartement à partir de l'URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const appartementId = +idParam;
      // Charger les détails de l'appartement en fonction de son ID
      this.loadAppartement(appartementId);
    } else {
      alert('Il y a quelque chose qui cloche...');
      this.router.navigate(['/home']);
    }
  }

  loadAppartement(appartementId: number): void {
    this.appartementService.getAppartementById(appartementId).subscribe(
      (appartementData: any) => { // Utiliser any pour accepter tout type de données
        if (appartementData) {
          this.appartement = appartementData[0]; // Récupérer le premier élément du tableau
          console.log(this.appartement);
        } else {
          console.error('Aucun appartement trouvé');
        }
      },
      error => {
        console.error('Erreur lors du chargement de l\'appartement:', error);
      }
    );
  }

  goToNewLocataire(appartement: Appartement) {
    this.router.navigate(['/ajout-demande', appartement.numappart]);
  }

  afficherAjoutVisiteComponent() {
    this.showAjoutVisiteComponent = true;
  }
}