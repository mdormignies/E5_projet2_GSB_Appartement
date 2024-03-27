import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/s_admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // Variables pour stocker les données récupérées
  nbClients: number = 0;
  nbLocataires: number = 0;
  nbProprietaires: number = 0;
  nbAppartements: number = 0;
  proprietaires: any[] = [];
  clients: any[] = [];
  revenu: { charg_a_gsb: string } = { charg_a_gsb: '0' }; // Modifiez cette ligne

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // Appel des méthodes du service pour récupérer les données
    this.adminService.getStats().subscribe((data: any) => {
      this.nbClients = data.nbClients;
      this.nbLocataires = data.nbLocataires;
      this.nbProprietaires = data.nbProprietaires;
      this.nbAppartements = data.nbAppartements;
    });

    this.adminService.getProprietaires().subscribe(
      (data) => {
        this.proprietaires = data;
      },
      (error) => {
        console.log(error);
      }
    );
    
    this.adminService.getClients().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.adminService.getRevenu().subscribe((data: any) => {
      console.log(data);
      this.revenu = data;
    });
  }
}