import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserData } from '../../providers/user-data';
import { RestClientService } from '../../providers/rest-client.service';

import { UsersResponse,
         CoursesResponse,
         EventsResponse,
         ScoresResponse,
         CourseHolesResponse,
         ScoreHoleScoresResponse } from '../../interfaces/rest-datamodel';

@Component({
  selector: 'page-mark-detail',
  templateUrl: 'mark-detail.html',
  styleUrls: ['./mark-detail.scss'],
})
export class MarkDetailPage {
  userId: string;
  eventId: string;
  event: EventsResponse;
  roundNum: number;
  score: ScoresResponse;
  holeScores: ScoreHoleScoresResponse[] = [];
  markedPlayerId: string;
  markedPlayer: any = {};


  constructor(
    private route: ActivatedRoute,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public user: UserData,
    public inAppBrowser: InAppBrowser,
    public restClient: RestClientService,
  ) {}

  ionViewWillEnter() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.roundNum = parseInt(this.route.snapshot.paramMap.get('roundNum'));


    this.user.getId().then((id) => {
      this.userId = id;
      console.log(this.userId);
    });


    this.restClient.getEvent(this.eventId)
    .subscribe(
      (responseev: EventsResponse) => {
        this.event = responseev;
      },
      err => {
        console.error('Error getting event');
      },
      () => {}
    );

    this.user.getMarkedPlayer().then((id) => {
      this.markedPlayerId = id;
      // get the player publi profile
      this.restClient.getPublicUser(id)
      .subscribe(
        (responsesc: UsersResponse) => {
          this.markedPlayer = responsesc;
        },
        err => {
          console.error('Error getting user info for', id);
        },
        () => {}
      );

      // get the score for player
      this.restClient.getScoreForMarking(id, this.eventId, this.roundNum)
      .subscribe(
        (responsesc: ScoresResponse[]) => {
          console.log('responsesc',responsesc);
          this.score = responsesc[0];
          this.restClient.getScoreHoleScores(responsesc[0].id)
          .subscribe(
            (responseshs: ScoreHoleScoresResponse[]) => {
              responseshs.sort(function (a, b) {
                return a.holeNumber - b.holeNumber;
              });
              this.holeScores = responseshs;
            },
            err => {
              console.error('Error getting hole scores', err.error.error);
            },
            () => {}
          );
        },
        err => {
          console.error('Error getting marked score', err.error.error);
        },
        () => {}
      );
    });


  }

  // set marked but don't set validated
  async setMarkedScore(holeScore: ScoreHoleScoresResponse, name: string) {
    let message =
      'Marking score for ' + name + ' on hole: ' +  holeScore.holeNumber + '.';

    if(holeScore.self > 0) {
      message = message  + ' Player declared: ' + holeScore.self;
    };

    const alert = await this.alertCtrl.create({
      header: 'Mark Score',
      message: message,
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            holeScore.marker = parseInt(data.score);
            holeScore.validated = holeScore.marker;
            this.updateScore(holeScore);
          }
        }
      ],
      inputs: [
        {
          type: 'number',
          name: 'score',
          value: holeScore.marker,
          placeholder: holeScore.self.toString(),
        }
      ]
    });
    await alert.present();

  }


  updateScore(holeScore: any) {
    console.log('new score', holeScore);


  }
/*
  getHoleScore(foundhs: ScoreHoleScoresResponse[], holeNum: number): ScoreHoleScoresResponse {
    // did we get any?
    if (foundhs !== [] ) {
      // let's see if it is already there
      const theHoleScore = foundhs.find(
        (hs: any) => hs.holeNumber === holeNum
      );
      if (theHoleScore) {
        return theHoleScore;
      }
    }
    // looks like we did not let's make up an empty one
    const theHoleScore = {
      holeNumber: holeNum,
      self: 0,
      marker: 0,
      markerId: '',
      validated: 0,
      scoreId: this.scoreId,
    };
    return theHoleScore;
  }

  async changeScore() {
    const alert = await this.alertCtrl.create({
      header: 'Change Score',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.holeScore.self = parseInt(data.score);
            this.updateScore();
          }
        }
      ],
      inputs: [
        {
          type: 'number',
          name: 'score',
          value: this.holeScore.self,
          placeholder: '0'
        }
      ]
    });
    await alert.present();
  }
/*
  updateScore(this.holeScore) {
    if(this.holeScore.id) {
      this.restClient.patchSelfScore(this.holeScore)
      .subscribe(
        (response: any) => {
        },
        err => {
          console.error('Error setting self score', err.error.error);
        },
        () => {}
      );
    } else {
      this.restClient.postSelfScore(this.holeScore)
      .subscribe(
        (response: ScoreHoleScoresResponse) => {
          this.holeScore = response;
        },
        err => {
          console.error('Error setting self score', err.error.error);
        },
        () => {}
      );
    }
  }
*/
  openExternalUrl(url: string) {
    this.inAppBrowser.create(
      url,
      '_blank'
    );
  }


}
