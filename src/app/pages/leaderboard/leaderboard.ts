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
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
  styleUrls: ['./leaderboard.scss'],
})
export class LeaderboardPage {
  event: EventsResponse;
  holes: any[] = [];
  scores: any[] = [];
  segment = 'Today';

  constructor(
    public router: Router,
    public userData: UserData,
    public restClient: RestClientService
  ) {}

  ionViewDidEnter() {
    //this.userData.getId().then((id) => this.loadLeaderboard(1));
    this.loadLeaderboard(1);
  }

  loadLeaderboard(round) {

    // get the event data
    this.restClient.getLastEvent()
      .subscribe(
        (responseev: EventsResponse[]) => {
          this.event = responseev[0];
          // get hole data
          this.restClient.getCourseDetails(this.event.courseId)
            .subscribe(
              (responsehl: any[]) => {
                this.holes = responsehl;
              },
              err => {
                console.log('Error getting course holes', err.error.error);
              },
            );

        },
        err => {
          console.log('Error getting events', err.error.error);
        },
        () => {}
      );
  }
  /*
    // Find the score for the hole passed in the hole score table
    findParForHole(holes: any[], holenum: number) {
      if (holes.holes.length > 0) {
        const thehole = holes.holes.find(
          (hs: any) => hs.number === holenum
        );
        if (thehole) {
          return thehole.par;
        } else {
          return 0;
        }
      };
      return 0;
    }
  */


}
