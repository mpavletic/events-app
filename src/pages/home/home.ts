import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { AppConstants } from '../../app/app.constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  events: Object = {};
  eventsDate: Array<string> = [];
  categories: Object = {};
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
      // group the events by date. Create a map with day as index and an array of events as values
      this.events = response['events'].reduce(function(result, event) {
        const dateTime = this.getTime(event.start.local);

        if (result[dateTime]) {
          result[dateTime].push(event)
        } else {
          result[dateTime] = [event];
        }

        return result;
      }.bind(this), {});
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

}
