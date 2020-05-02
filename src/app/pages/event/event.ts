import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { RestClientService } from '../../providers/rest-client.service';

import { EventFilterPage } from '../event-filter/event-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { LoginResponse, UsersResponse,
         CoursesResponse, CourseAddressResponse,
         EventsResponse, ScoresResponse,
         CourseHolesResponse, ScoreHoleScoresResponse } from '../../interfaces/rest-datamodel';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
  styleUrls: ['./event.scss'],
})
export class EventPage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('playerList', { static: true }) playerList: IonList;

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
    hide: boolean;
  }[];

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownPlayers: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public restClient: RestClientService,
    public user: UserData,
    public config: Config
  ) { }

  ngOnInit() {
    console.log('eventlist init');
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.roundNum = parseInt(this.route.snapshot.paramMap.get('roundNum'));

    console.log('eventid, roundnum', this.eventId, this.roundNum);

    this.ios = this.config.get('mode') === 'ios';

    this.user.getJwtToken().then((token) => {
      console.log('thetoken', token);
      this.initData(token);
    });
  }

  initData(jwtToken: string) {
    this.players = [];
    this.restClient.getEvent(this.eventId)
    .subscribe(
      (responseev: EventsResponse) => {
        this.event = responseev;
        // populate players
        this.restClient.getEventRoundScores(this.eventId, this.roundNum)
        .subscribe(
          (responsesc: ScoresResponse[]) => {
            responsesc.forEach(score => {
              this.players.push(
                {
                  id: score.userId,
                  firstName: 'John',
                  lastName: 'Doe',
                  startTime: score.startTime,
                  startHole: score.startHole,
                  scoreId: score.id,
                  hide: false,
                }
              );
              /*
              this.restClient.getUser(score.userId, jwtToken)
              .subscribe(
                (responsesc: UsersResponse) => {
                  this.players.push(
                    {
                      id: responsesc.id,
                      firstName: responsesc.firstName,
                      lastName: responsesc.lastName,
                      startTime: score.startTime,
                      startHole: score.startHole,
                      scoreId: score.id,
                      hide: false,
                    }
                  );
                },
                err => {
                  console.error('Error getting user for score', score.userId, score.id);
                },
                () => {}
              );
              */
            });
          },
          err => {
            console.error('Error getting scores for event');
          },
          () => {}
        );
      },
      err => {
        console.log('Error getting events', err.error.error);
      },
      () => {}
    );
    this.shownPlayers = this.players;
  }

  /*
  updateEvent() {
    // Close any open sliding items when the event updates
    if (this.eventList) {
      this.eventList.closeSlidingItems();
    }

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownPlayers = data.shownPlayers;
      this.groups = data.groups;
    });
  }
  */

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: EventFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
      //this.updateEvent();
    }
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // Prompt to remove favorite
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // Add as a favorite
      this.user.addFavorite(sessionData.name);

      // Close the open item
      slidingItem.close();

      // Create a toast
      const toast = await this.toastCtrl.create({
        header: `${sessionData.name} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }]
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }

  }

  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            //this.updateEvent();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }
}
