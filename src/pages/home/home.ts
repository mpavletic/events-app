import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { AppConstants } from '../../app/app.constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  events: {};
  eventsDate: Array<string>;
  categories: {};

  constructor(private eventsProvider: EventsProvider, public navCtrl: NavController) {
  }

  ngOnInit() {
    this.categories = AppConstants.CATEGORIES;
    this.eventsProvider.getAll().subscribe(response => {
      // group the events by date. Create a map with day as index and an array of events as values
      this.events = response['events'].reduce(function(result, event) {
        let dateEvent = new Date(event.start.local);
        dateEvent.setHours(0, 0, 0, 0);
        const dateTime = dateEvent.getTime();

        if (result[dateTime]) {
          result[dateTime].push(event)
        } else {
          result[dateTime] = [event];
        }

        return result;
      }, {});
      // Create an array of strings with the days for iteration
      this.eventsDate = Object.keys(this.events);
    });
  }

}
