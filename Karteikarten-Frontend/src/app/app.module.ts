import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CardComponent } from './card/card.component'
import { MatCardModule } from '@angular/material/card';
import { LernenComponent } from './lernen/lernen.component';
import { SettingsComponent } from './settings/settings.component'
import { MatExpansionPanel } from '@angular/material/expansion'
import { MatAccordion } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    CardComponent,
    LernenComponent,
    SettingsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatAccordion,
    MatExpansionPanel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
