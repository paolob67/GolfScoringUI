import {
  Component
} from '@angular/core';
import {
  Router,
  ActivatedRoute
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
  CoursesDetailResponse,
  RoundScoresResponse,
  DetailedLeaderboardResponse
} from '../../interfaces/rest-datamodel';



@Component({
  selector: 'page-leaderboard-mob',
  templateUrl: 'leaderboard-mob.html',
  styleUrls: ['./leaderboard-mob.scss'],
})
export class LeaderboardMobPage {
  leaderboardTotal: any[] = [];
  eventId = '';
  event: EventsResponse;
  scores: RoundScoresResponse[] = [];
  showRound = '0'; // passed on the route if 0 go to totals tab

  mobview = false;
  numberOfRounds = 1;

  segment = 'Totals';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public userData: UserData,
    public restClient: RestClientService
  ) {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.showRound = this.route.snapshot.paramMap.get('showRound');
    if (this.showRound !== '0') {
      this.segment = 'Round ' + this.showRound;
    }
  }

  ionViewDidEnter() {
    this.restClient.presentLoader();
    this.restClient.getEvent(this.eventId)
      .subscribe(
        (response: EventsResponse) => {
          this.event = response;
          this.eventId = response.id;
          console.log('Event Id: ' + this.eventId);
          this.numberOfRounds = response.numberOfRounds;
          this.restClient.getLeaderboardDetails(this.eventId)
            .subscribe(
              (responsesco: DetailedLeaderboardResponse[]) => {
                this.leaderboardTotal = responsesco;
                console.log('Scores L: ' + JSON.stringify(this.leaderboardTotal));
                let rnd;
                for (rnd = 1; rnd <= this.numberOfRounds; rnd++) {
                  this.loadLeaderboard(rnd);
                }
              },
              err => {
                console.error('Error getting leaderboard', err.error.error);
              },
              () => {
                // all good hide loader
                this.restClient.dismissLoader();
              }
            );
        },
        err => {
          this.restClient.dismissLoader();
          console.error('Error getting events', err.error.error);
        },
        () => {}
      );
  }

  loadLeaderboard(round) {
    // get Detailed Scores
    this.restClient.presentLoader();
    this.restClient.getRoundScoresDetails(this.eventId, round)
      .subscribe(
        (responsehl: RoundScoresResponse) => {
          this.scores.push(responsehl);
          console.log('scores', responsehl, this.scores);
        },
        err => {
          console.log('Error getting Round of Leaderboard', err.error.error);
        },
        () => {
          this.restClient.dismissLoader();
        }
      );

  }

  getColor(score: number) {
    const colors = [
      'primary',
      'secondary',
      'tertiary',
      'success',
      'warning',
      'danger'
    ];

    return colors[score - 1];
  }

}
