/**
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */

/**
 * Imports
 */
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

/**
 * This component displays a page that lists the players
 * taking part a given event and groups them by start time
 * and by hole of start. It is presented to the user when he did not
 * select a player to mark during the game.
 */
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

  /** are we on ios platform? */
  ios: boolean;
  /** the id for the event read from url parameter */
  eventId: string;
  /** which round of the event are we looking at? read from url parameter */
  roundNum: number;
  /** holds list of events coming from API call */
  event: EventsResponse;
  /** array of players for the given event */
  players: {
    id: string;
    firstName: string;
    lastName: string;
    startTime: Date;
    startHole: number;
    scoreId: string;
    // hide: boolean;
  } [];
  /** id of the player that has been chosen for marking */
  markedPlayerId: string;
  /** arry holding the groups found for start hole and time */
  groups: any = [];

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

  /**
   * Read params from URL, set if ios and populate the marked play property
   * so that the html can check accordingly in the list
   */
  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.roundNum = parseInt(this.route.snapshot.paramMap.get('roundNum'), 10);

    this.ios = this.config.get('mode') === 'ios';

    this.initData();
    this.user.getMarkedPlayer().then((id) => {
      this.markedPlayerId = id;
    });
    // if needed use the JWT token to call some protected API
    /*
    this.user.getJwtToken().then((token) => {
      this.initData(token);
    });
    */

  }
  
  // could need to use the JWT token 
  // call server to get public profile
  // initData(jwtToken: string) {
  /**
   * Load players and group them for displaying in the list.
   * IN order to get players name we call the public API that 
   * returns only the name and the id [getPublicUser]{@link RestClientService#getPublicUser}
   */
  initData() {
    // clear the array
    this.players = [];
    this.restClient.presentLoader();
    // get event data
    this.restClient.getEvent(this.eventId)
      .subscribe(
        (responseev: EventsResponse) => {
          this.event = responseev;
          // populate players by loading all the scores for the event
          this.restClient.getEventRoundScores(this.eventId, this.roundNum)
            .subscribe(
              (responsesc: ScoresResponse[]) => {
                responsesc.forEach(score => {
                  // not this one because we are calling the public one
                  // this.restClient.getPublicUser(score.userId, jwtToken)
                  // get info for that user and populate the players array
                  this.restClient.getPublicUser(score.userId)
                    .subscribe(
                      (userResponse: UsersResponse) => {
                        const gotPlayer = {
                          id: userResponse.id,
                          firstName: userResponse.firstName,
                          lastName: userResponse.lastName,
                          startTime: score.startTime,
                          startHole: score.startHole,
                          scoreId: score.id,
                        };
                        // populate players
                        this.players.push(gotPlayer);
                        // populate groups
                        this.groupPlayers(gotPlayer);
                      },
                      err => {
                        console.error('Error getting user for score', score.userId, score.id);
                        this.restClient.dismissLoader();
                      },
                      () => {
                        // all good dismiss loader
                        this.restClient.dismissLoader();
                      }
                    );
                });
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

  /**
   * This method looks for an existing group of players with the same starting 
   * info as the one passed. If the group is found then the player is added to it
   * otherwise the player forms a new group and waits for other with similar start
   * info.
   * @param player player info holdin name and start hole and time for grouping
   */
  groupPlayers(player: any) {
    let didfindgroup = false;
    // let's look into the groups array if it has already been populated
    if (this.groups) {
      // for each one of the already found groups
      this.groups.forEach(group => {
        // if we have a match add the player to the goup
        if (group.time === player.startTime || group.hole === player.startHole) {
          group.players.push(player);
          didfindgroup = true;
        }
      });
    }
    // if we did not find a suitable group create a new one
    if (!didfindgroup) {
      this.groups.push({
        time: player.startTime,
        hole: player.startHole,
        hide: false,
        players: [
            player
          ]
      });
    }
  }

  /**
   * write marked player id into the local store and update the property
   * @param id the marked player id selected from the player list
   */
  setMarkedPlayer(id) {
    this.user.setMarkedPlayer(id)
      .then(() => {
        this.markedPlayerId = id;
      });
  }
}
