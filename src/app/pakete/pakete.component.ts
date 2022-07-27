import { Component, OnInit } from '@angular/core';
import { Paket } from '../objekte/paket.model';
import { PaketeService } from '../services/pakete.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-pakete',
  templateUrl: './pakete.component.html',
  styleUrls: ['./pakete.component.scss']
})
export class PaketeComponent implements OnInit {

  constructor(
    private paketeService: PaketeService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  pakete: Paket[] = this.paketeService.getPakete()


  zeigeKarten(paket: string) {
    this.router.navigate([`/`], { 'queryParams': { 'paket': paket } })
  }

  neu() {
    this.router.navigate([`neu`])
  }

  aktivePaketeAktualisieren() {
    this.paketeService.setAktivePakete(
      this.pakete.filter((e) => {
        if (e.aktiv)
          return true
        return false
      }).map((e) => { return e.name })
    )
    console.log(this.pakete)
  }

}
