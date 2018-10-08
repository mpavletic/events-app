import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { AppConstants } from '../../app/app.constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  events: any = {};
  eventsDate: Array<string> = [];
  categories: any = {};
  pageNumber: number = 1;

  constructor(private eventsProvider: EventsProvider, public navCtrl: NavController, public loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando eventos...'
    });
    this.categories = AppConstants.CATEGORIES;
    loading.present();
    this.eventsProvider.getAll(this.pageNumber).subscribe(response => {
      this.events = this.groupEventsByDay(response['events']);
      // Create an array of strings with the days for iteration
      this.eventsDate = Object.keys(this.events);

      loading.dismiss();
    });
  }

  /**
   * Get time of given date at 00:00:00
   * @param {String} eventStart - Start time of the event
   * @returns {number} time value in milliseconds
   */
  private getTime(eventStart: string): number {
    let dateEvent = new Date(eventStart);
    dateEvent.setHours(0, 0, 0, 0);

    return dateEvent.getTime();
  }

  /**
   * Group the events by date. Create a map with date as index and an array of events as values
   * @param {Array} events - List of events
   * @returns {Object} a map with a list of events for each day
   */
  private groupEventsByDay(events: Array<any>): any {
    return events.reduce(function(result, event) {
      const dateTime = this.getTime(event.start.local);

      if (result[dateTime]) {
        result[dateTime].push(event)
      } else {
        result[dateTime] = [event];
      }

      return result;
    }.bind(this), this.events);
  }

}
