import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { StatsService } from '../services/stats.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-statistiken',
  templateUrl: './statistiken.component.html',
  styleUrls: ['./statistiken.component.scss']
})
export class StatistikenComponent implements OnInit {

  constructor(private cardsService: CardsService, private statService: StatsService) {
  }
  karten = this.cardsService.getCards();
  gesamtkartenzahl = this.karten.length;
  neueKartenZahl = this.karten.filter((e) => { if (!this.statService.getStatByCardID(e.id ?? '')) return true; if (this.statService.getStatByCardID(e.id ?? '').rubrik == 0) return true; return false }).length
  kartenJung = this.karten.filter((e) => { if (!this.statService.getStatByCardID(e.id ?? '')) return false; if (this.statService.getStatByCardID(e.id ?? '').rubrik == 2) return true; return false }).length
  kartenAlt = this.karten.filter((e) => { if (!this.statService.getStatByCardID(e.id ?? '')) return false; if (this.statService.getStatByCardID(e.id ?? '').rubrik == 3) return true; return false }).length
  lernenunderneut = this.karten.filter((e) => { if (!this.statService.getStatByCardID(e.id ?? '')) return false; if (this.statService.getStatByCardID(e.id ?? '').rubrik == 1 || this.statService.getStatByCardID(e.id ?? '').rubrik == 4) return true; return false }).length
  ngOnInit(): void {
  }


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
      dataLabels: { style: { color: 'lightgray', textOutline: 'none' }, shadow: false },

      data: [
        { name: 'Neue Karten', y: this.neueKartenZahl },
        { name: 'Junge Karten', y: this.kartenJung },
        { name: 'Alte karten', y: this.kartenAlt },
        { name: 'Lernen und Erneut Lernen', y: this.lernenunderneut }]
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
    colors: ['blue', 'red', 'lightgreen', 'darkgreen'],
    credits: {
      text: ''
    },
    xAxis: {
      categories: [

      ],
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
        name: 'Neu',
        data: [1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4],
        type: 'column'
      }, {
        name: 'Lernen',
        data: [1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        type: 'column'
      }, {
        name: 'Jung',
        data: [1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        type: 'column'
      }, {
        name: 'Alt',
        data: [1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        type: 'column'
      }]
  };
}
