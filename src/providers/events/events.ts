import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../../app/app.constants';

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {
  private apiURL = 'https://www.eventbriteapi.com/v3/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + AppConstants.API_TOKEN
    })
  };

  constructor(public http: HttpClient) {
  }

  getAll() {
    return this.http.get(`${this.apiURL}events/search/`, {
      headers: this.httpOptions.headers,
      params: {
        'location.latitude': AppConstants.BUENOS_AIRES_LATITUDE,
        'location.longitude': AppConstants.BUENOS_AIRES_LONGITUDE,
        'sort_by': 'date'
      }
    });
  }

}
