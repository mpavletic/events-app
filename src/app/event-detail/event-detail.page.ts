import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IEvent } from '../api/interfaces/ievent';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  event: IEvent;
  eventObs: Observable<IEvent>;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    let currentNav = this.router.getCurrentNavigation();
    this.eventObs = of(currentNav && currentNav.extras.state && currentNav.extras.state.event);
  }

}
