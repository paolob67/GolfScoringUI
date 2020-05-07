import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { AlertController } from '@ionic/angular';

import { ActionSheetController } from '@ionic/angular';
//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { RestClientService } from '../../providers/rest-client.service';

import { CoursesResponse,
         EventsResponse,
         ScoresResponse,
         CourseHolesResponse,
         ScoreHoleScoresResponse } from '../../interfaces/rest-datamodel';

@Component({
  selector: 'page-score-detail',
  templateUrl: 'score-detail.html',
  styleUrls: ['./score-detail.scss'],
})
export class ScoreDetailPage {
  scoreId: string;
  eventId: string;
  markedScore: ScoresResponse;
  roundNum: number;
  holeNum: number;
  holeValues: string;
  holeScore: ScoreHoleScoresResponse;
  holeScoreMarked : ScoreHoleScoresResponse;
  //speaker: any;

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public userData: UserData,
//    public inAppBrowser: InAppBrowser,
    public restClient: RestClientService,
  ) {}

  ionViewWillEnter() {
    this.scoreId = this.route.snapshot.paramMap.get('scoreId');
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.roundNum = parseInt(this.route.snapshot.paramMap.get('roundNum'));
    this.holeNum = parseInt(this.route.snapshot.paramMap.get('holeNum'));
    this.holeValues =  this.route.snapshot.paramMap.get('holeValues');

    // ok first let's look for the holescore record and in case populate UI
    // first let's get the hole score records
    // get hole scores

    this.restClient.getScoreHoleScores(this.scoreId)
    .subscribe(
      (responseshl: ScoreHoleScoresResponse[]) => {
        this.holeScore = this.getHoleScore(this.scoreId, responseshl, this.holeNum);
      },
      err => {
        console.error('Error getting hole scores', err.error.error);
      },
      () => {}
    );

    this.userData.getMarkedPlayer().then((markedid) => {
      if (markedid) {
        console.log(markedid);
        this.restClient.getScoreForMarking(markedid, this.eventId, this.roundNum)
        .subscribe(
          (responsesc: ScoresResponse[]) => {
            console.log('responsesc',responsesc);
            this.restClient.getScoreHoleScores(responsesc[0].id)
            .subscribe(
              (responseshs: ScoreHoleScoresResponse[]) => {
                this.holeScoreMarked = this.getHoleScore(markedid, responseshs, this.holeNum);;
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
      };
    });


  }

  getHoleScore(scoreid: string, foundhs: ScoreHoleScoresResponse[], holeNum: number): ScoreHoleScoresResponse {
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
      scoreId: scoreid,
      par: 0,
    };

    return theHoleScore;
  }

  async changeScore() {
    const alert = await this.alertCtrl.create({
      header: 'Change Your Score',
      message: 'Be sure to set your own score!',
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

  async changeScoreMarked() {
    const alert = await this.alertCtrl.create({
      header: 'Change Opponent Score',
      message: 'Enter here the score for the player you are marking.',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.holeScoreMarked.marker = parseInt(data.score);
            this.updateScoreMarked();
          }
        }
      ],
      inputs: [
        {
          type: 'number',
          name: 'score',
          value: this.holeScoreMarked.marker,
          placeholder: '0'
        }
      ]
    });
    await alert.present();
  }

  updateScore() {
    if(this.holeScore.id) {
      this.restClient.patchHoleScore(this.holeScore)
      .subscribe(
        (response: any) => {
        },
        err => {
          console.error('Error setting self score', err.error.error);
        },
        () => {}
      );
    } else {
      this.restClient.postHoleScore(this.holeScore)
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

  updateScoreMarked() {
    if(this.holeScoreMarked.id) {
      this.restClient.patchHoleScore(this.holeScoreMarked)
      .subscribe(
        (response: any) => {
        },
        err => {
          console.error('Error setting marker score', err.error.error);
        },
        () => {}
      );
    } else {
      this.restClient.postHoleScore(this.holeScoreMarked)
      .subscribe(
        (response: ScoreHoleScoresResponse) => {
          this.holeScoreMarked = response;
        },
        err => {
          console.error('Error setting marker score', err.error.error);
        },
        () => {}
      );
    }
  }

/*
  openExternalUrl(url: string) {
    this.inAppBrowser.create(
      url,
      '_blank'
    );
  }

  async openSpeakerShare(speaker: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + speaker.twitter
            );
            if (
              (window as any).cordova &&
              (window as any).cordova.plugins.clipboard
            ) {
              (window as any).cordova.plugins.clipboard.copy(
                'https://twitter.com/' + speaker.twitter
              );
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openContact(speaker: any) {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
  */
}
