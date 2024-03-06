import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './composants/init/init.component';
import { HomeComponent } from './composants/home/home.component';
import { LoginProprietaireComponent } from './composants/login-proprietaire/login-proprietaire.component';
import { LoginLocataireComponent } from './composants/login-locataire/login-locataire.component';
import { LoginClientComponent } from './composants/login-client/login-client.component';

import { LiaisonAuthService } from './services/liaision-auth.service';
import { AuthGuard } from './services/auth-guard.service';

import { PersonComponent } from './composants/person/person.component';

const routes: Routes = [
  { path: '', redirectTo: '/init', pathMatch: 'full' },
  { path: 'init', component: InitComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login-proprietaire', component: LoginProprietaireComponent },
  { path: 'login-locataire', component: LoginLocataireComponent },
  { path: 'login-client', component: LoginClientComponent },
  { path: 'people', component: PersonComponent },
  // Ajoutez d'autres routes si nécessaire
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LiaisonAuthService]
})
export class AppRoutingModule {}
