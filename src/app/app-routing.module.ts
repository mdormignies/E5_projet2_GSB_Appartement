import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InitComponent } from './composants/init/init.component';
import { HomeComponent } from './composants/home/home.component';
import { LoginProprietaireComponent } from './composants/login-proprietaire/login-proprietaire.component';
import { LoginLocataireComponent } from './composants/login-locataire/login-locataire.component';
import { LoginClientComponent } from './composants/login-client/login-client.component';
import { AppartementComponent } from './composants/appartement/appartement/appartement.component';
import { VisiteComponent } from './composants/visite/visite/visite.component';
import { ProfilComponent } from './composants/profil/profil.component';
import { DemandeComponent } from './composants/demande/demande.component';
import { AdminComponent } from './composants/admin/admin.component';

import { ClientLiaisonAuthService } from './services/s_liaison-auth/client-liaision-auth.service';
import { LocataireLiaisonAuthService } from './services/s_liaison-auth/locataire-liaison-auth.service';
import { ProprietaireLiaisonAuthService } from './services/s_liaison-auth/proprietaire-liaison-auth.service';
import { AuthGuard } from './services/auth-guard.service';

import { PersonComponent } from './composants/person/person.component';
import { AjoutAppartementComponent } from './composants/ajout-appartement/ajout-appartement.component';
import { AjoutDemandeComponent } from './composants/ajout-demande/ajout-demande.component';

const routes: Routes = [
  { path: '', redirectTo: '/init', pathMatch: 'full' },
  { path: 'init', component: InitComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login-proprietaire', component: LoginProprietaireComponent },
  { path: 'login-locataire', component: LoginLocataireComponent },
  { path: 'login-client', component: LoginClientComponent },
  { path: 'appartement/:id', canActivate: [AuthGuard], component: AppartementComponent },
  { path: 'ajout-appartement', canActivate: [AuthGuard], component: AjoutAppartementComponent },
  { path: 'ajout-demande/:id', canActivate: [AuthGuard], component: AjoutDemandeComponent },
  { path: 'visite', canActivate: [AuthGuard], component: VisiteComponent },
  { path: 'profil', canActivate: [AuthGuard], component: ProfilComponent },
  { path: 'demande', canActivate: [AuthGuard], component: DemandeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'people', component: PersonComponent },
  // Ajoutez d'autres routes si nécessaire
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, ClientLiaisonAuthService, LocataireLiaisonAuthService, ProprietaireLiaisonAuthService]
})
export class AppRoutingModule {}
