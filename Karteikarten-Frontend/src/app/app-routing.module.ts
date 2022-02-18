import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LernenComponent } from './lernen/lernen.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: 'lernen', component: LernenComponent},
  {path: 'einstellungen',component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
