import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AccountComponent } from './components/account/account.component';
import { EditComponent } from './components/edit/edit.component';
import { KartenComponent } from './components/karten/karten.component';
import { LernenComponent } from './components/lernen/lernen.component';
import { NeuComponent } from './components/neu/neu.component';
import { PaketeComponent } from './components/pakete/pakete.component';
import { SettingsComponent } from './components/settings/settings.component';
import { StatistikenComponent } from './components/statistiken/statistiken.component';
import { TestComponent } from './components/test/test.component';
import { SyncComponent } from './components/sync/sync.component';

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
