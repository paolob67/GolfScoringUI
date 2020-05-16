import {
  Component,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  AlertController,
  IonList,
  IonFab,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
  Config
} from '@ionic/angular';
import {
  RestClientService
} from '../../providers/rest-client.service';

import {
  UserData
} from '../../providers/user-data';

import {
  LoginResponse,
  UsersResponse,
  CoursesResponse,
  CourseAddressResponse,
  EventsResponse,
  ScoresResponse,
  CourseHolesResponse,
  ScoreHoleScoresResponse
} from '../../interfaces/rest-datamodel';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
  styleUrls: ['./event.scss'],
})
export class EventPage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('playerList', {
    static: true
  }) playerList: IonList;

  ios: boolean;
  eventId: string;
  roundNum: number;
  event: EventsResponse;

  players: {
    id: string;
    firstName: string;
    lastName: string;
    startTime: Date;
    startHole: number;
    scoreId: string;
    //hide: boolean;
  } [];

  markedPlayerId: string;

  //dayIndex = 0;
  queryText = '';
  //segment = 'all';
  //excludeTracks: any = [];
  shownPlayers: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public restClient: RestClientService,
    public user: UserData,
    public config: Config
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.roundNum = parseInt(this.route.snapshot.paramMap.get('roundNum'));

    this.ios = this.config.get('mode') === 'ios';

    this.initData();
    this.user.getMarkedPlayer().then((id) => {
      this.markedPlayerId = id;
    });
    /*
    this.user.getJwtToken().then((token) => {
      this.initData(token);
    });
    */

  }

  // call server to get public profile
  //initData(jwtToken: string) {
  initData() {
    this.players = [];
    this.restClient.presentLoader();
    this.restClient.getEvent(this.eventId)
      .subscribe(
        (responseev: EventsResponse) => {
          this.event = responseev;
          // populate players
          this.restClient.getEventRoundScores(this.eventId, this.roundNum)
            .subscribe(
              (responsesc: ScoresResponse[]) => {
                responsesc.forEach(score => {
                  /*
                  this.players.push(
                    {
                      id: score.userId,
                      firstName: 'John',
                      lastName: 'Doe',
                      startTime: score.startTime,
                      startHole: score.startHole,
                      scoreId: score.id,
                    }
                  );
                  */
                  // should call unprotected api here...

                  //this.restClient.getPublicUser(score.userId, jwtToken)
                  this.restClient.getPublicUser(score.userId)
                    .subscribe(
                      (responsesc: UsersResponse) => {
                        const gotPlayer = {
                          id: responsesc.id,
                          firstName: responsesc.firstName,
                          lastName: responsesc.lastName,
                          startTime: score.startTime,
                          startHole: score.startHole,
                          scoreId: score.id,
                        };
                        this.players.push(gotPlayer);
                        this.groupPlayers(gotPlayer);
                      },
                      err => {
                        console.error('Error getting user for score', score.userId, score.id);
                      },
                      () => {
                        // all good dismiss loader
                        this.restClient.dismissLoader();
                      }
                    );

                });

                // let's group players for diplay
                // this.groupPlayers();
              },
              err => {
                this.restClient.dismissLoader();
                console.error('Error getting scores for event');
              },
              () => {}
            );
        },
        err => {
          this.restClient.dismissLoader();
          console.log('Error getting events', err.error.error);
        },
        () => {}
      );
  }

  groupPlayers(player: any) {
    this.shownPlayers = this.players;

    let didfindgroup = false;
    let thegroup: any;
    if (this.groups) {
      this.groups.forEach(group => {
        if (group.time == player.startTime || group.hole == player.startHole) {
          group.players.push(player);
          didfindgroup = true;
        };
      });
    };
    if (!didfindgroup) {
      this.groups.push({
        time: player.startTime,
        hole: player.startHole,
        hide: false,
        players: [
            player
          ]
      });
    };
  }


  setMarkedPlayer(id) {

    this.user.setMarkedPlayer(id)
      .then(() => {
        this.markedPlayerId = id;
      });

  }

  /*
    groupPlayers() {
      this.shownPlayers = this.players;

      this.players.forEach(player => {
        let didfindgroup = false;
        let thegroup: any;
        if( this.groups ) {
          this.groups.forEach(group => {
            if (group.time == player.startTime || group.hole == player.startHole) {
              group.players.push(player);
              didfindgroup = true;
            };
          });
        };
        if (!didfindgroup) {
          this.groups.push(
            {
              time: player.startTime,
              hole: player.startHole,
              players: [
                player
              ]
            }
          );
        };
      });
    }
  */


}
