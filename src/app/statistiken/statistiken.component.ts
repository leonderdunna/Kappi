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
  neueKartenZahl = this.karten.filter((e) => {if(!this.statService.getStatByCardID(e.id ?? '')) return true; if (this.statService.getStatByCardID(e.id ?? '').rubrik == 0) return true; return false }).length
  kartenJung = this.karten.filter((e) => {if(!this.statService.getStatByCardID(e.id ?? '')) return false; if (this.statService.getStatByCardID(e.id ?? '').rubrik == 2) return true; return false }).length
  kartenAlt = this.karten.filter((e) => {if(!this.statService.getStatByCardID(e.id ?? '')) return false; if (this.statService.getStatByCardID(e.id ?? '').rubrik == 3) return true; return false }).length
  lernenunderneut = this.karten.filter((e) => {if(!this.statService.getStatByCardID(e.id ?? '')) return false; if (this.statService.getStatByCardID(e.id ?? '').rubrik == 1 || this.statService.getStatByCardID(e.id ?? '').rubrik == 4) return true; return false }).length
  ngOnInit(): void {
  }


  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    colors: ['blue','lightgreen','darkgreen','red'],
    chart: {
      plotBackgroundColor: 'transparent',
      plotBorderWidth: 0,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Karten'
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
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Karten',
      type: 'pie',
      colorByPoint: true,
      data: [
        {
          name: 'Neue Karten',
          y: this.neueKartenZahl,

        }, { name: 'Junge Karten', y: this.kartenJung },
        { name: 'Alte karten', y: this.kartenAlt },
        { name: 'Lernen und Erneut Lernen', y: this.lernenunderneut }]
    }]

  }; // required
  // chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null

}
