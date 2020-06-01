/**
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */

/**
 * Imports
 */
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

/**
 * This component displays a page holding the list of events where the
 * user can select which leaderboard to display.
 */
@Component({
  selector: 'page-leaderboard-list',
  templateUrl: 'leaderboard-list.html',
  styleUrls: ['./leaderboard-list.scss'],
})
export class LeaderboardListPage {
  /**
   * List of returned events from server
   */
  events: EventsResponse[] = [];

  constructor(
    public router: Router,
    public userData: UserData,
    public restClient: RestClientService
  ) {

  }
  
  /**
   * ionViewDidEnter
   * When entering this view refresh the events list by 
   * calling [getEvents]{@link RestClientService#getEvents}
   * TODO: verify if this should be moved to ionInit
   */
  ionViewDidEnter() {
    // console.log('ionViewDidEnter LeaderboardListPage');
    this.restClient.presentLoader();
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
        () => {
          this.restClient.dismissLoader();
        }
      );
  }

}
