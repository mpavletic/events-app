import { Component, OnInit } from '@angular/core';
import { EventService } from '../api/event.service';
import { IEvent } from '../api/interfaces/ievent';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  events: IEvent[] = [];

  constructor(
    private eventService: EventService
  ) {}

  public ngOnInit() {
    this.eventService.getAll().subscribe( events => this.events = events);
  }

}
