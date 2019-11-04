import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Coord } from 'src/app/models/coord';
import { RumbaService } from 'src/app/services/rumba.service';
@Component({
  selector: 'app-recorrido',
  templateUrl: './recorrido.page.html',
  styleUrls: ['./recorrido.page.scss'],
})
export class RecorridoPage implements OnInit {
  public chart: any;
  public datos: Coord;
  public count: number;
  public cantPas: number;
  public interval: any;

  constructor(public rumbaService: RumbaService) {
  }

  checkUpdate() {
    this.rumbaService.getCoords().subscribe(data => {
      this.datos = data;

    })
    this.count = Object.keys(this.datos).length;
    if (this.cantPas != this.count) {
      this.graficarRecorrido();
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

  graficarRecorrido() {
    let dataD: any = [];
    let pointBackgroundColors: any = [];
    let pointRadius:any = [];
    this.cantPas = this.count;

    for (let i: number = 0; i < this.cantPas; i++) {
      dataD.push({ x: this.datos[i].x, y: this.datos[i].y });
    }

   /* dataD = [
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 0, y: 4 },
      { x: 0, y: 6 },
      { x: 0, y: 8 },
      { x: 2, y: 8 },
      { x: 2, y: 6 },
      { x: 2, y: 4 },
      { x: 2, y: 2 },
      { x: 2, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 2 },
      { x: 4, y: 4 },
      { x: 2, y: 4 },
      { x: 2, y: 2 },
      { x: 2, y: 0 }
    ];*/


    for (let i: number = 0; i < dataD.length; i++) {
      if (i == 0) {
        pointBackgroundColors[i] = 'blue';
        pointRadius[i] = 7;
      } else if (i == (dataD.length - 1)) {
        pointBackgroundColors[i] = 'red';
        pointRadius[i] = 7;
      } else {
        pointBackgroundColors[i] = 'black';
        pointRadius[i] = 3;
      }


    }


    let maxX: number = 0;
    let minX: number = 0;
    let maxY: number = 0;
    let minY: number = 0;
    //dataD[i] = {x,y}
    for (let i: number = 0; i < dataD.length; i++) {

      if (dataD[i].x < minX) {
        minX = dataD[i].x;
      }
      if (dataD[i].x > maxX) {
        maxX = dataD[i].x;
      }
      if (dataD[i].y < minY) {
        minY = dataD[i].y;
      }
      if (dataD[i].y > maxY) {
        maxY = dataD[i].y;
      }
    }
    console.log('LIMITES', minX, maxX, minY, maxY);

    this.chart = new Chart('Recorrido', {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Recorrido (cm)',
          data: dataD,
          borderColor: 'green',
          borderWidth: 3,
          pointRadius: pointRadius,
          pointHoverRadius: 5,
          pointBackgroundColor: pointBackgroundColors,
          fill: false,
          showLine: true
        }]
      },
      options: {

        scales: {
          xAxes: [{
            ticks: {
              min: minX,
              max: maxX
            },
            gridLines: {
              color: '#888',
              drawOnChartArea: true
            }
          }],
          yAxes: [{
            ticks: {
              min: minY,
              max: maxY
            },
            gridLines: {
              color: '#888',
              drawOnChartArea: true
            }
          }]
        }
      }
    });


  }

}
