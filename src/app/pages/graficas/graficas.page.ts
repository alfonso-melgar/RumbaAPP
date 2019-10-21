import { Component, OnInit } from '@angular/core';
import { Rumba } from 'src/app/models/rumba';
import { RumbaService } from 'src/app/services/rumba.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.page.html',
  styleUrls: ['./graficas.page.scss'],
})
export class GraficasPage implements OnInit {

  public cantPas = 0;
  public datos: Rumba;
  public interval: any;
  public chart: any;
  public count: number;
  constructor(public rumbaService: RumbaService) {

  }

  checkUpdate() {
    this.rumbaService.getDataRumbaASC().subscribe(data => {
      this.datos = data;
    })
    this.count = Object.keys(this.datos).length;
    if (this.cantPas != this.count) {
      this.graficarVelocidad();
      this.graficarDistancia();
      this.graficarTomaDecision();
    }
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.checkUpdate();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  graficarVelocidad() {
    let dataL: any = [];
    let dataD: any = [];

    this.cantPas = this.count;
    let i: number = 0;
    let dato: any;
    for (i = 0; i < this.cantPas; i++) {
      dataL.push(i + 1);
      dataD.push(+this.datos[i].velocidad);
    }


    this.chart = new Chart('Velocidad', {

      type: 'line',
      data: {
        labels: dataL,
        datasets: [
          {
            label: 'Velocidad (cm/s)',
            fill: false,
            data: dataD,
            backgroundColor: '#168ede',
            borderColor: '#168ede'
          }
        ]
      },
      options: {

      }
    });
  }

  graficarDistancia() {
    let dataL: any = [];
    let dataD: any = [];

    this.cantPas = this.count;
    let i: number = 0;
    let dato: any;
    for (i = 0; i < this.cantPas; i++) {
      dataL.push(i + 1);
      dataD.push(+this.datos[i].distancia);
    }


    this.chart = new Chart('Distancia', {

      type: 'line',
      data: {
        labels: dataL,
        datasets: [
          {
            label: 'Distancia (cm)',
            fill: false,
            data: dataD,
            backgroundColor: '#168ede',
            borderColor: '#168ede'
          }
        ]
      },
      options: {

      }
    });
  }


  graficarTomaDecision() {
    let dataL: any = [];
    let dataD: any = [];

    this.cantPas = this.count;
    let i: number = 0;
    let dato: any;
    for (i = 0; i < this.cantPas; i++) {
      dataL.push(i + 1);
      dataD.push(+this.datos[i].tDecision);
    }


    this.chart = new Chart('TomaDecision', {

      type: 'line',
      data: {
        labels: dataL,
        datasets: [
          {
            label: 'Tiempo toma de Decision (seg)',
            fill: false,
            data: dataD,
            backgroundColor: '#168ede',
            borderColor: '#168ede'
          }
        ]
      },
      options: {

      }
    });
  }
}
