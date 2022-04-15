import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.getSettings();
   }

 settings:any;
  ngOnInit(): void {
  }
  update(){
    this.settingsService.update(this.settings)
  }

}
