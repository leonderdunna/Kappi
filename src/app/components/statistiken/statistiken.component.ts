import {Component, OnInit} from '@angular/core';
import {CardsService} from '../../services/cards.service';

import * as Highcharts from 'highcharts';
import {SettingsService} from '../../services/settings.service';
import {GelerntService} from '../../services/gelernt.service';
import {PaketeService} from "../../services/pakete.service";
import {Rubriken} from "../../resources/rubriken";

@Component({
  selector: 'app-statistiken',
  templateUrl: './statistiken.component.html',
  styleUrls: ['./statistiken.component.scss']
})
export class StatistikenComponent implements OnInit {

  constructor(
    private cardsService: CardsService,
    private paketeService: PaketeService,
    private settingsService: SettingsService,
    private gelerntService: GelerntService) {
  }

  //Kartenzahlen
  karten = this.cardsService.getCards();
  gesamtkartenzahl = this.karten.length;
  neueKartenZahl = this.karten.filter((card) => {
    return card.stat[card.stat.length - 1].rubrik === 0
  }).length
  kartenJung = this.karten.filter((card) => {
    return card.stat[card.stat.length - 1].rubrik === Rubriken.JUNG
  }).length
  kartenAlt = this.karten.filter((card) => {
    return card.stat[card.stat.length - 1].rubrik === Rubriken.ALT
  }).length
  lernenunderneut = this.karten.filter((card) => {
      return (card.stat[card.stat.length - 1].rubrik === Rubriken.LERNEN) ||
        (card.stat[card.stat.length - 1].rubrik === Rubriken.ERNEUT_LERNEN)
    }
  ).length
  ngOnInit(): void {
  }

  //Fällige

  fälligLernen: number[] = [];
  fälligJung: number[] = [];
  fälligAlt: number[] = [];

  aktiveKarten = this.paketeService.getActiveCards();

  settings = this.settingsService.getSettings();

  getFälligNeu(): number[] {
    let gesamt = this.neueKartenZahl;
    let fälligNeu: number[] = [];

    if ((gesamt + this.gelerntService.getNeue(0)) >= this.settings.neueProTag) {
      gesamt -= (this.settings.neueProTag - this.gelerntService.getNeue(0));
      fälligNeu.push(this.settings.neueProTag - this.gelerntService.getNeue(0))
    } else {
      fälligNeu.push(gesamt);
      gesamt = 0;
    }
    for (let i: number = 1; i < 31; i++) {
      if (gesamt >= this.settings.neueProTag) {
        gesamt -= this.settings.neueProTag;
        fälligNeu.push(this.settings.neueProTag - 0)

      } else {
        fälligNeu.push(gesamt);
        gesamt = 0;
      }

    }


    return fälligNeu;

  }

  getFälligLernen(): number[] {
    let fälligLernen: number[] = [];
    let msProTag: number = (1000 * 60 * 60 * 24);
    let lernenKarten = this.aktiveKarten.filter((e) => {
      if (e.stat[e.stat.length - 1].rubrik == 1 ||
        e.stat[e.stat.length - 1].rubrik == 4)
        return true
      return false
    })

    fälligLernen.push(
      lernenKarten.filter((e) => {
        if (
          (e.stat[e.stat.length - 1].due ?? 0) <= Date.now()) {
          return true;
        }
        return false
      }).length
    )

    for (let i: number = 0; i < 30; i++) {
      fälligLernen.push(
        lernenKarten.filter((e) => {
          if ((e.stat[e.stat.length - 1].due ?? 0) > (Date.now() + (i * msProTag)) &&
            (e.stat[e.stat.length - 1].due ?? 0) <= (Date.now() + ((i + 1) * msProTag))) {
            return true;
          }
          return false
        }).length
      )
    }
    return fälligLernen;
  }

  getFälligJung(): number[] {
    let fälligJung: number[] = [];
    let msProTag: number = (1000 * 60 * 60 * 24);
    let lernenKarten = this.aktiveKarten.filter((e) => {
      if (e.stat[e.stat.length - 1].rubrik == 2)
        return true
      return false
    })

    fälligJung.push(
      lernenKarten.filter((e) => {
        if ((e.stat[e.stat.length - 1].due ?? 0) <= Date.now())
          return true;
        return false;
      }).length
    )

    for (let i: number = 0; i < 30; i++) {
      fälligJung.push(
        lernenKarten.filter((e) => {
          if ((e.stat[e.stat.length - 1].due ?? 0) > (Date.now() + (i * msProTag)) &&
            (e.stat[e.stat.length - 1].due ?? 0) <= (Date.now() + ((i + 1) * msProTag))) {
            return true;
          }
          return false
        }).length
      )
    }
    return fälligJung;
  }

  getFälligAlt(): number[] {
    let fälligAlt: number[] = [];
    let msProTag: number = (1000 * 60 * 60 * 24);
    let lernenKarten = this.aktiveKarten.filter((e) => {
      if (e.stat[e.stat.length - 1].rubrik == 3)
        return true
      return false
    })

    fälligAlt.push(
      lernenKarten.filter((e) => {
        if (
          (e.stat[e.stat.length - 1].due ?? 0) <= Date.now()) {
          return true;
        }
        return false
      }).length
    )


    for (let i: number = 0; i < 30; i++) {
      fälligAlt.push(
        lernenKarten.filter((e) => {
          if ((e.stat[e.stat.length - 1].due ?? 0) > (Date.now() + (i * msProTag)) &&
            (e.stat[e.stat.length - 1].due ?? 0) <= (Date.now() + ((i + 1) * msProTag))) {
            return true;
          }
          return false
        }).length
      )
    }
    return fälligAlt;
  }


  //Charts
  Highcharts: typeof Highcharts = Highcharts; // required
  Highcharts2: typeof Highcharts = Highcharts;
  zaehlerOptions: Highcharts.Options = {
    colors: ['blue', 'lightgreen', 'darkgreen', 'red'],
    credits: {
      text: ''
    },
    chart: {
      plotBackgroundColor: 'transparent',
      backgroundColor: 'transparent',
      plotBorderWidth: 0,
      plotShadow: false,
      borderColor: 'blue',
      type: 'pie'
    },
    title: {
      text: 'Karten',
      style: {
        color: 'lightgray',
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      area: {
        color: 'red'

      },

      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        color: 'white',

        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Karten',
      type: 'pie',
      borderColor: 'gray',
      colorKey: 'red',
      colorByPoint: true,
      dataLabels: {style: {color: 'lightgray', textOutline: 'none'}, shadow: false},

      data: [
        {name: 'Neue Karten', y: this.neueKartenZahl},
        {name: 'Junge Karten', y: this.kartenJung},
        {name: 'Alte karten', y: this.kartenAlt},
        {name: 'Lernen und Erneut Lernen', y: this.lernenunderneut}]
    }],

  };

  prognoseOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: 'transparent',
      backgroundColor: 'transparent',
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'column'
    },
    title: {
      text: ''
    },
    colors: ['red', 'lightgreen', 'darkgreen', 'blue'],
    credits: {
      text: ''
    },
    xAxis: {
      categories: [],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        stacking: 'normal'
      }
    },


    series: [
      {
        name: 'Lernen',
        data: this.getFälligLernen(),
        type: 'column'
      }, {
        name: 'Jung',
        data: this.getFälligJung(),
        type: 'column'
      }, {
        name: 'Alt',
        data: this.getFälligAlt(),
        type: 'column'
      }, {
        name: 'Neu',
        data: this.getFälligNeu(),
        type: 'column'
      }]
  };
}
