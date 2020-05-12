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
        {
          "holenum": 1,
          "par": 4
        }, {
          "holenum": 2,
          "par": 4
        }, {
          "holenum": 3,
          "par": 4
        },
        {
          "holenum": 4,
          "par": 4
        }, {
          "holenum": 5,
          "par": 4
        }, {
          "holenum": 6,
          "par": 4
        },
        {
          "holenum": 7,
          "par": 4
        }, {
          "holenum": 8,
          "par": 4
        }, {
          "holenum": 9,
          "par": 4
        },
        {
          "holenum": 10,
          "par": 4
        }, {
          "holenum": 11,
          "par": 4
        }, {
          "holenum": 12,
          "par": 4
        },
        {
          "holenum": 13,
          "par": 4
        }, {
          "holenum": 14,
          "par": 4
        }, {
          "holenum": 15,
          "par": 4
        },
        {
          "holenum": 16,
          "par": 4
        }, {
          "holenum": 17,
          "par": 4
        }, {
          "holenum": 18,
          "par": 4
        },
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
          {
            "holenum": 1,
            "marked": 3
          }, {
            "holenum": 2,
            "marked": 2
          }, {
            "holenum": 3,
            "marked": 4
          },
          {
            "holenum": 4,
            "marked": 4
          }, {
            "holenum": 5,
            "marked": 4
          }, {
            "holenum": 6,
            "marked": 3
          },
          {
            "holenum": 7,
            "marked": 5
          }, {
            "holenum": 8,
            "marked": 4
          }, {
            "holenum": 9,
            "marked": 4
          },
          {
            "holenum": 10,
            "marked": 5
          }, {
            "holenum": 11,
            "marked": 0
          }, {
            "holenum": 12,
            "marked": 0
          },
          {
            "holenum": 13,
            "marked": 0
          }, {
            "holenum": 14,
            "marked": 0
          }, {
            "holenum": 15,
            "marked": 0
          },
          {
            "holenum": 16,
            "marked": 0
          }, {
            "holenum": 17,
            "marked": 0
          }, {
            "holenum": 18,
            "marked": 0
          }
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
          {
            "holenum": 1,
            "marked": 4
          }, {
            "holenum": 2,
            "marked": 4
          }, {
            "holenum": 3,
            "marked": 4
          },
          {
            "holenum": 4,
            "marked": 4
          }, {
            "holenum": 5,
            "marked": 4
          }, {
            "holenum": 6,
            "marked": 4
          },
          {
            "holenum": 7,
            "marked": 4
          }, {
            "holenum": 8,
            "marked": 4
          }, {
            "holenum": 9,
            "marked": 4
          },
          {
            "holenum": 10,
            "marked": 5
          }, {
            "holenum": 11,
            "marked": 0
          }, {
            "holenum": 12,
            "marked": 0
          },
          {
            "holenum": 13,
            "marked": 0
          }, {
            "holenum": 14,
            "marked": 0
          }, {
            "holenum": 15,
            "marked": 0
          },
          {
            "holenum": 16,
            "marked": 0
          }, {
            "holenum": 17,
            "marked": 0
          }, {
            "holenum": 18,
            "marked": 0
          }
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
          {
            "holenum": 1,
            "marked": 4
          }, {
            "holenum": 2,
            "marked": 4
          }, {
            "holenum": 3,
            "marked": 4
          },
          {
            "holenum": 4,
            "marked": 4
          }, {
            "holenum": 5,
            "marked": 4
          }, {
            "holenum": 6,
            "marked": 4
          },
          {
            "holenum": 7,
            "marked": 4
          }, {
            "holenum": 8,
            "marked": 4
          }, {
            "holenum": 9,
            "marked": 4
          },
          {
            "holenum": 10,
            "marked": 5
          }, {
            "holenum": 11,
            "marked": 0
          }, {
            "holenum": 12,
            "marked": 0
          },
          {
            "holenum": 13,
            "marked": 0
          }, {
            "holenum": 14,
            "marked": 0
          }, {
            "holenum": 15,
            "marked": 0
          },
          {
            "holenum": 16,
            "marked": 0
          }, {
            "holenum": 17,
            "marked": 0
          }, {
            "holenum": 18,
            "marked": 0
          }
      ]
    }
  ]
  };

  filter = {
    "include": [
      {
        "relation": "user"
    },
      {
        "relation": "course"
    },
      {
        "relation": "event"
    }
  ]
  };

  // http://[::1]:3000/leaderboard?filter=%7B%20%0A%20%20%22include%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22relation%22%3A%20%22user%22%0A%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22relation%22%3A%20%22course%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22relation%22%3A%20%22event%22%0A%20%20%20%20%7D%0A%20%20%20%20%20%0A%20%20%5D%0A%7D

  leaderboard_resp = [
    {
      "id": "5eb9a962a0d1d108e5ac8f80",
      "rounds": 2,
      "playingHandicap": 6,
      "eventId": "5eb9a962a0d1d108e5ac8f7f",
      "courseId": "5eb9a95ba0d1d108e5ac8b1c",
      "userId": "5eb9a962a0d1d108e5ac8f77",
      "course": {
        "id": "5eb9a95ba0d1d108e5ac8b1c",
        "name": "Golf Nazionale",
        "holesCount": 18,
        "out": 36,
        "in": 36,
        "stroke": 72
      },
      "user": {
        "id": "5eb9a962a0d1d108e5ac8f77",
        "email": "paolo@golf.com",
        "firstName": "Paolo",
        "lastName": "Golf",
        "handicap": 1,
        "roles": [
        "player"
      ]
      },
      "event": {
        "id": "5eb9a962a0d1d108e5ac8f7f",
        "name": "Golf Scoring Masters",
        "type": "World Championship",
        "date": "2020-09-15T00:00:00.000Z",
        "numberOfRounds": 2,
        "courseId": "5eb9a95ba0d1d108e5ac8b1c"
      }
  },
    {
      "id": "5eb9a962a0d1d108e5ac8fa7",
      "rounds": 2,
      "playingHandicap": 0,
      "eventId": "5eb9a962a0d1d108e5ac8f7f",
      "courseId": "5eb9a95ba0d1d108e5ac8b1c",
      "userId": "5eb9a962a0d1d108e5ac8f7b",
      "course": {
        "id": "5eb9a95ba0d1d108e5ac8b1c",
        "name": "Golf Nazionale",
        "holesCount": 18,
        "out": 36,
        "in": 36,
        "stroke": 72
      },
      "user": {
        "id": "5eb9a962a0d1d108e5ac8f7b",
        "email": "lorenzo@golf.com",
        "firstName": "Lorenzo",
        "lastName": "Golf",
        "clubName": "Marco Simone",
        "card": "456123",
        "handicap": 3,
        "roles": [
        "player"
      ]
      },
      "event": {
        "id": "5eb9a962a0d1d108e5ac8f7f",
        "name": "Golf Scoring Masters",
        "type": "World Championship",
        "date": "2020-09-15T00:00:00.000Z",
        "numberOfRounds": 2,
        "courseId": "5eb9a95ba0d1d108e5ac8b1c"
      }
  },
    {
      "id": "5eb9a962a0d1d108e5ac8fce",
      "rounds": 2,
      "playingHandicap": 3,
      "eventId": "5eb9a962a0d1d108e5ac8f7f",
      "courseId": "5eb9a95ba0d1d108e5ac8b1c",
      "userId": "5eb9a962a0d1d108e5ac8f7d",
      "course": {
        "id": "5eb9a95ba0d1d108e5ac8b1c",
        "name": "Golf Nazionale",
        "holesCount": 18,
        "out": 36,
        "in": 36,
        "stroke": 72
      },
      "user": {
        "id": "5eb9a962a0d1d108e5ac8f7d",
        "email": "tommaso@golf.com",
        "firstName": "Tommaso",
        "lastName": "Golf",
        "clubName": "Olgiata",
        "card": "654321",
        "handicap": 0,
        "roles": [
        "player"
      ]
      },
      "event": {
        "id": "5eb9a962a0d1d108e5ac8f7f",
        "name": "Golf Scoring Masters",
        "type": "World Championship",
        "date": "2020-09-15T00:00:00.000Z",
        "numberOfRounds": 2,
        "courseId": "5eb9a95ba0d1d108e5ac8b1c"
      }
  }
];
  
  mobview = true;

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

    return colors[score - 1];
  }

}
