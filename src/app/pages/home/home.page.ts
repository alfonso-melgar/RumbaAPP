import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RumbaService } from 'src/app/services/rumba.service';
import {Rumba} from 'src/app/models/rumba'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public datos:Rumba;
  public todos:Rumba;
  public interval:any;
  constructor(public rumbaService: RumbaService) {
    

  }
  checkUpdate() {
    this.rumbaService.getLastRead().subscribe(data => {
      this.datos = data;
      //console.log(this.datos);
    })

    this.rumbaService.getDataRumba().subscribe(data => {
      this.todos = data;
      //console.log(this.todos);
    })

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

 

}

