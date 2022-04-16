import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { EditComponent } from './edit/edit.component';
import { KartenComponent } from './karten/karten.component';
import { LernenComponent } from './lernen/lernen.component';
import { NeuComponent } from './neu/neu.component';
import { PaketeComponent } from './pakete/pakete.component';
import { SettingsComponent } from './settings/settings.component';
import { StatistikenComponent } from './statistiken/statistiken.component';

const routes: Routes = [
  { path: '', component: LernenComponent },
  { path: 'pakete', component: PaketeComponent },
  { path: 'karten', component: KartenComponent },
  { path: 'neu', component: NeuComponent },
  { path: 'statistiken', component: StatistikenComponent },
  { path: 'account', component: AccountComponent },
  { path: 'einstellungen', component: SettingsComponent },
  { path: 'edit/:id',component:EditComponent},
  {path: 'about',component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
