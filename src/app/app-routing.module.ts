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
import { TestComponent } from './test/test.component';
import { SyncComponent } from './sync/sync.component';

const routes: Routes = [
  { path: 'lernen', component: LernenComponent },
  { path: 'pakete', component: PaketeComponent },
  { path: '', component: KartenComponent },
  { path: 'neu', component: NeuComponent },
  { path: 'statistiken', component: StatistikenComponent },
  { path: 'account', component: AccountComponent },
  { path: 'einstellungen', component: SettingsComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'about', component: AboutComponent },
  { path: 'test', component: TestComponent },
  {path:'sync',component:SyncComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
