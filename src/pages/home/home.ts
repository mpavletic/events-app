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

      loading.dismiss();
    });
  }

}
