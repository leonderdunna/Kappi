import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MatCardModule } from '@angular/material/card';
import {  LernenComponent } from './components/lernen/lernen.component';
import {ZusatzComponent} from "./components/edit/zusatz/zusatz.component";
import { SettingsComponent } from './components/settings/settings.component'
import { PaketeComponent } from './components/pakete/pakete.component';
import { KartenComponent } from './components/karten/karten.component';
import { StatistikenComponent } from './components/statistiken/statistiken.component';
import { AccountComponent } from './components/account/account.component';
import { AnmeldenComponent } from './components/account/anmelden/anmelden.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccountSettingsComponent } from './components/account/account-settings/account-settings.component';
import { MatTableModule } from '@angular/material/table';
import { EditComponent } from './components/edit/edit.component'
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { AboutComponent } from './components/about/about.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TestComponent } from './components/test/test.component';
import { SyncComponent } from './components/sync/sync.component';
import { MatAutocompleteModule} from '@angular/material/autocomplete'
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NeuComponent } from './components/neu/neu.component';



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LernenComponent,
    SettingsComponent,
    PaketeComponent,
    KartenComponent,
    StatistikenComponent,
    AccountComponent,
    AnmeldenComponent,
    AccountSettingsComponent,
    EditComponent,
    AboutComponent,
    ZusatzComponent,
    TestComponent,
    SyncComponent,
    NeuComponent,

  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTabsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatIconModule,
    HighchartsChartModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
