import {
    Component
} from '@angular/core';
import {
    Router
} from '@angular/router';
import {
    ConferenceData
} from '../../providers/conference-data';
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
    selector: 'page-leaderboard-mob',
    templateUrl: 'leaderboard-mob.html',
    styleUrls: ['./leaderboard-mob.scss'],
})
export class LeaderboardMobPage {
leaderboard = {
  "event": {
    "name": "Golden Cup Cake",
    "date": "01/01/1967",
    "round": 1
  },
  "course": {
      "name": "Gran Golf Ostia Antica",
      "holespar": [
        { "holenum": 1, "par": 4 },{"holenum": 2, "par": 4 },{"holenum": 3, "par": 4 },
        { "holenum": 4, "par": 4 },{"holenum": 5, "par": 4 },{"holenum": 6, "par": 4 },
        { "holenum": 7, "par": 4 },{"holenum": 8, "par": 4 },{"holenum": 9, "par": 4 },
        { "holenum": 10, "par": 4 },{"holenum": 11, "par": 4 },{"holenum": 12, "par": 4 },
        { "holenum": 13, "par": 4 },{"holenum": 14, "par": 4 },{"holenum": 15, "par": 4 },
        { "holenum": 16, "par": 4 },{"holenum": 17, "par": 4 },{"holenum": 18, "par": 4 },
      ]
  },
  "players": [
    {
      "pos": 1,
      "pos_display": "1°",
      "name": "Lorenzo Golf",
      "hcp": 14,
      "stroke": 110,
      "thru": 59,
      "total": 120,
      "net": 89,
      "stableford": 90,
      "out": 55,
      "in": 5,
      "holes": [
        { "holenum": 1, "marked": 3 },{"holenum": 2, "marked": 2 },{"holenum": 3, "marked": 4 },
        { "holenum": 4, "marked": 4 },{"holenum": 5, "marked": 4 },{"holenum": 6, "marked": 3 },
        { "holenum": 7, "marked": 5 },{"holenum": 8, "marked": 4 },{"holenum": 9, "marked": 4 },
        { "holenum": 10, "marked": 5 },{"holenum": 11, "marked": 0 },{"holenum": 12, "marked": 0 },
        { "holenum": 13, "marked": 0 },{"holenum": 14, "marked": 0 },{"holenum": 15, "marked": 0 },
        { "holenum": 16, "marked": 0 },{"holenum": 17, "marked": 0 },{"holenum": 18, "marked": 0 }
      ]
    },
    {
      "pos": 2,
      "pos_display": "2°",
      "name": "Paolo Golf",
      "hcp": 14,
      "stroke": 110,
      "thru": 59,
      "total": 120,
      "net": 89,
      "stableford": 90,
            "out": 55,
      "in": 5,
      "holes": [
        { "holenum": 1, "marked": 4 },{"holenum": 2, "marked": 4 },{"holenum": 3, "marked": 4 },
        { "holenum": 4, "marked": 4 },{"holenum": 5, "marked": 4 },{"holenum": 6, "marked": 4 },
        { "holenum": 7, "marked": 4 },{"holenum": 8, "marked": 4 },{"holenum": 9, "marked": 4 },
        { "holenum": 10, "marked": 5 },{"holenum": 11, "marked": 0 },{"holenum": 12, "marked": 0 },
        { "holenum": 13, "marked": 0 },{"holenum": 14, "marked": 0 },{"holenum": 15, "marked": 0 },
        { "holenum": 16, "marked": 0 },{"holenum": 17, "marked": 0 },{"holenum": 18, "marked": 0 }
      ]
    },
    {
      "pos": 3,
      "pos_display": "2T°",
      "name": "Tommaso Golf",
      "hcp": 14,
      "stroke": 110,
      "thru": 59,
      "total": 120,
      "net": 89,
      "stableford": 90,
      "out": 55,
      "in": 5,
      "holes": [
        { "holenum": 1, "marked": 4 },{"holenum": 2, "marked": 4 },{"holenum": 3, "marked": 4 },
        { "holenum": 4, "marked": 4 },{"holenum": 5, "marked": 4 },{"holenum": 6, "marked": 4 },
        { "holenum": 7, "marked": 4 },{"holenum": 8, "marked": 4 },{"holenum": 9, "marked": 4 },
        { "holenum": 10, "marked": 5 },{"holenum": 11, "marked": 0 },{"holenum": 12, "marked": 0 },
        { "holenum": 13, "marked": 0 },{"holenum": 14, "marked": 0 },{"holenum": 15, "marked": 0 },
        { "holenum": 16, "marked": 0 },{"holenum": 17, "marked": 0 },{"holenum": 18, "marked": 0 }
      ]
    }    
  ]};
    
  
            
  
  constructor(
            public router: Router,
            public userData: UserData,
            public restClient: RestClientService
        ) {
    console.log('leaderboard', this.leaderboard);
                
            }

  ionViewDidEnter() {
           console.log('ionViewDidEnter LeaderboardMobPage', )
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
    
    return colors[score-1];
  }

}
