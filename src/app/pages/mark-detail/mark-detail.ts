import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserData } from '../../providers/user-data';
import { RestClientService } from '../../providers/rest-client.service';

import { CoursesResponse,
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
  eventId: string;
  roundNum: number;
  score: ScoresResponse;
  holeScores: ScoreHoleScoresResponse[];
  markedPlayerId: string;

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

    this.user.getMarkedPlayer().then((id) => {
        this.markedPlayerId = id;
        this.restClient.getScoreForMarking(id, this.eventId, this.roundNum)
        .subscribe(
          (responsesc: ScoresResponse[]) => {
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

  updateScore() {
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
