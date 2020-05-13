import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserData
} from '../../providers/user-data';
import {
  RestClientService
} from '../../providers/rest-client.service';

import {
  CoursesResponse,
  EventsResponse,
  ScoresResponse,
  CourseHolesResponse,
  ScoreHoleScoresResponse
} from '../../interfaces/rest-datamodel';



@Component({
  selector: 'page-leaderboard-list',
  templateUrl: 'leaderboard-list.html',
  styleUrls: ['./leaderboard-list.scss'],
})
export class LeaderboardListPage {

  events: EventsResponse[] = [];

  constructor(
    public router: Router,
    public userData: UserData,
    public restClient: RestClientService
  ) {

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter LeaderboardListPage', )

    this.restClient.getEvents()
      .subscribe(
        (response: EventsResponse[]) => {
          this.events = response.sort(
            (a, b) => {
              return a.date.getTime() - b.date.getTime();
            }
          );
          console.log('Events', this.events);
        },
        err => {
          console.error('Error getting events', err.error.error);
        },
        () => {}
      );
    
  }


}
