import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private eventService: EventService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.eventService.getAll().subscribe( events => this.events = events);
  }

  public openEventDetail(event: IEvent) {
    this.router.navigate(['/event-detail'], {
      state: {
        event: event
      }
    });
  }

}
