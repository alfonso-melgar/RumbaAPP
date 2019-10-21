import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RumbaService {


  constructor(private http: HttpClient) { }

  getDataRumba(): Observable<any> {
    return this.http.get('https://rumba-255423.appspot.com/api/rumba?filter[order]=logTime%20DESC');
  }

  getDataRumbaASC(): Observable<any> {
    return this.http.get('https://rumba-255423.appspot.com/api/rumba?filter[order]=logTime%20ASC');
  }

  getLastRead():Observable<any>{
    return this.http.get('https://rumba-255423.appspot.com/api/rumba?filter[order]=logTime%20DESC&filter[limit]=1');
  }
}

