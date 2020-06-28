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
  Config
} from '@ionic/angular';
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

/**
 * This component shows the leaderboard for the event that was selected
 * in the previuos page. The page is divided in several sections.
 * The totals and the rounds. On the totals section we display cumulative
 * scores for all the rounds. In the rounds sections we display detailed
 * leaderboard data for all the players competing. If the user clicks
 * on the player list in the totals section the app displays detailed
 * score info for the selected player.
 */
@Component({
  selector: 'page-leaderboard-mob',
  templateUrl: 'leaderboard-mob.html',
  styleUrls: ['./leaderboard-mob.scss'],
})
export class LeaderboardMobPage {
  /**
   * Holds cumulative scores for the event
   */
  leaderboardTotal: any[] = [];
  /**
   * the selected event id
   */
  eventId = '';
  /**
   * Event info
   */
  event: EventsResponse;
  /**
   * Scores for event
   */
  scores: RoundScoresResponse[] = [];
  /**
   * passed on the route if 0 go to totals tab
   */
  showRound = '0'; // passed on the route if 0 go to totals tab
  /**
   * Select mob vire rendering
   */
  mobview = false;
  /**
   * holds number of rounds for event. init to 1
   */
  numberOfRounds = 1;
  /**
   * segment to show. init to totals
   */
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
    this.ios = this.config.get('mode') === 'ios';
    // load properties from url
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.showRound = this.route.snapshot.paramMap.get('showRound');
    // if the passed round is 0 then show the totals tab
    if (this.showRound !== '0') {
      this.segment = 'Round ' + this.showRound;
    }
  }

  /**
   * When entering the view load leaderboard data from server.
   * This needs to bperfromed every time the user enters the view
   * because data could change in the meantime
   * by calling [getLeaderboardDetails]{@link RestClientService#getLeaderboardDetails}
   * TODO: add timeout to refresh data.
   */
  ionViewDidEnter() {
    this.restClient.presentLoader();
    // first load event data
    this.restClient.getEvent(this.eventId)
      .subscribe(
        (response: EventsResponse) => {
          // save envet info
          this.event = response;
          this.eventId = response.id;
          this.numberOfRounds = response.numberOfRounds;
          // get leaderboard data for totals
          this.restClient.getLeaderboardDetails(this.eventId)
            .subscribe(
              (responsesco: DetailedLeaderboardResponse[]) => {
                this.leaderboardTotal = responsesco;
                // console.log('Scores L: ' + JSON.stringify(this.leaderboardTotal));
                // load data for each round of the event
                for (let rnd = 1; rnd <= this.numberOfRounds; rnd++) {
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

  /**
   * Load leaderboard data fro each round of the event
   * by calling [getRoundScoresDetails]{@link RestClientService#getRoundScoresDetails}
   * @param round the round for the event
   */
  loadLeaderboard(round) {
    // get detailed scores
    this.restClient.presentLoader();
    this.restClient.getRoundScoresDetails(this.eventId, round)
      .subscribe(
        (responsehl: RoundScoresResponse) => {
          this.scores.push(responsehl);
          console.log('scores', responsehl, this.scores);
        },
        err => {
          console.log('Error getting Round of Leaderboard', err.error.error);
          this.restClient.dismissLoader();
        },
        () => {
          this.restClient.dismissLoader();
        }
      );

  }

}
