import { Component, OnInit } from '@angular/core';
import { Settings } from '../../objekte/settings.model';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) {

  }

  settings: Settings = this.settingsService.getSettings();

  startGut = this.settings.startGut / (1000 * 60 * 60 * 24);
  startEinfach = this.settings.startEinfach / (1000 * 60 * 60 * 24);
  minIntervall = this.settings.minIntervall / (1000 * 60 * 60 * 24);
  maxIntervall = this.settings.maxIntervall / (1000 * 60 * 60 * 24 * 365);
  ngOnInit(): void {
  }
  update() {
    this.settings.startGut = this.startGut * (1000 * 60 * 60 * 24);
    this.settings.startEinfach = this.startEinfach * (1000 * 60 * 60 * 24);
    this.settings.minIntervall = this.minIntervall * (1000 * 60 * 60 * 24);
    this.settings.maxIntervall = this.maxIntervall * (1000 * 60 * 60 * 24 * 365);
    this.settingsService.update(this.settings)
  }

}
