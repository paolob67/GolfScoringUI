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
  ScoreHoleScoresResponse,
  RoundScoresResponse
} from '../../interfaces/rest-datamodel';

@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
  styleUrls: ['./leaderboard.scss'],
})
export class LeaderboardPage {
  event: EventsResponse;
  scores: RoundScoresResponse;
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
        // get Detailed Scores
        console.log("Event Id: " + this.event.id)
        this.restClient.getRoundScoresDetails(this.event.id, round)
        .subscribe(
          (responsehl: RoundScoresResponse)=> {
            this.scores = responsehl;
            console.log("Scores: " + this.scores)
          },
          err => {
            console.log('Error getting Round of Leaderboard', err.error.error);
          },
        );
      },
      err => {
        console.log('Error getting last event', err.error.error);
      },
      () => {}
    );
  }

}
