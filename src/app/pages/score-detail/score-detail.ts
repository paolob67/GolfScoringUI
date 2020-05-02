import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { AlertController } from '@ionic/angular';

import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
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
  holeNum: number;
  holeScore: ScoreHoleScoresResponse;
  speaker: any;

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public restClient: RestClientService,
  ) {}

  ionViewWillEnter() {
    this.scoreId = this.route.snapshot.paramMap.get('scoreId');
    this.holeNum = parseInt(this.route.snapshot.paramMap.get('holeNum'));
    // ok first let's look for the holescore record and in case populate UI
    // first let's get the hole score records
    // get hole scores

    this.restClient.getScoreHoleScores(this.scoreId)
    .subscribe(
      (responseshl: ScoreHoleScoresResponse[]) => {
        this.holeScore = this.getHoleScore(responseshl, this.holeNum);
      },
      err => {
        console.error('Error getting hole scores', err.error.error);
      },
      () => {}
    );
    /*
    this.dataProvider.load().subscribe((data: any) => {
      const speakerId = this.route.snapshot.paramMap.get('speakerId');
      if (data && data.speakers) {
        for (const speaker of data.speakers) {
          if (speaker && speaker.id === speakerId) {
            this.speaker = speaker;
            break;
          }
        }
      }
    });
    */
  }

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
        (response: number) => {
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
}
