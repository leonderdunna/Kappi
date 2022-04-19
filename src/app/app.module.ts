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
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatCardModule } from '@angular/material/card';
import { AddAlternativeDialog, LernenComponent } from './lernen/lernen.component';
import { SettingsComponent } from './settings/settings.component'
import { PaketeComponent } from './pakete/pakete.component';
import { KartenComponent } from './karten/karten.component';
import { StatistikenComponent } from './statistiken/statistiken.component';
import { AccountComponent } from './account/account.component';
import { NeuComponent } from './neu/neu.component';
import { AnmeldenComponent } from './anmelden/anmelden.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { MatTableModule } from '@angular/material/table';
import { EditComponent } from './edit/edit.component'
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { AboutComponent } from './about/about.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    NeuComponent,
    AnmeldenComponent,
    AccountSettingsComponent,
    EditComponent,
    AboutComponent,
    AddAlternativeDialog
  ],
  imports: [
    BrowserModule,
    MatCheckboxModule,
    MatTabsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule,
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
