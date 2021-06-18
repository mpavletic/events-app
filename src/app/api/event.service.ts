import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IEvent } from './interfaces/ievent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(environment.api.url);
  }
}
