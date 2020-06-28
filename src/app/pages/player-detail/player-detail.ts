import {
  Component
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  Config
} from '@ionic/angular';
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
  RoundScoresResponse
} from '../../interfaces/rest-datamodel';



@Component({
  selector: 'page-player-detail',
  templateUrl: 'player-detail.html',
  styleUrls: ['./player-detail.scss'],
})
export class PlayerDetailPage {

  eventId = '';
  playerId = '';
  scores: RoundScoresResponse[] = [];

  event: EventsResponse;

  mobview = false;
  segment = 'Totals';

  /**
   * are we on ios platform?
   */
  ios: boolean;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public userData: UserData,
    public config: Config,
    public restClient: RestClientService
  ) {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.playerId = this.route.snapshot.paramMap.get('playerId');
    this.ios = this.config.get('mode') === 'ios';
  }

  ionViewDidEnter() {

    // get Detailed Scores
    this.restClient.presentLoader();
    this.restClient.getPlayerScoresDetails(this.eventId, this.playerId)
      .subscribe(
        (responsehl: RoundScoresResponse) => {
          this.scores.push(responsehl);
          console.log('scores', this.scores);
        },
        err => {
          console.log('Error getting score of player', err.error.error);
        },
        () => {
          this.restClient.dismissLoader();
        }
      );
  }

}
