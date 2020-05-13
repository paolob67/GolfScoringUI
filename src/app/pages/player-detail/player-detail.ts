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
  
  event: EventsResponse;
  
  mobview = false;
  segment = 'Totals';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public userData: UserData,
    public restClient: RestClientService
  ) {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.playerId = this.route.snapshot.paramMap.get('playerId');
  }

  ionViewDidEnter() {
    
    this.restClient.getEvent(this.eventId)
      .subscribe(
        (response: EventsResponse) => {
          this.event = response;
          this.eventId = response.id;
        },
        err => {
          console.error('Error getting events', err.error.error);
        },
        () => {}
      );
  }

}
