import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AlertController
} from '@ionic/angular';
import {
  ActionSheetController
} from '@ionic/angular';
import {
  UserData
} from '../../providers/user-data';
import {
  RestClientService
} from '../../providers/rest-client.service';

import {
  UsersResponse,
  CoursesResponse,
  EventsResponse,
  ScoresResponse,
  CourseHolesResponse,
  ScoreHoleScoresResponse
} from '../../interfaces/rest-datamodel';



@Component({
  selector: 'page-score-list',
  templateUrl: 'score-list.html',
  styleUrls: ['./score-list.scss'],
})
export class ScoreListPage {
  scores: any[] = [];
  segment = 'Today';
  todayScore: any = {};
  markedScore: any = {};
  markedPlayer: any = {};
  markedPlayerId = '';
  userId = '';
  foundTodayScore = false;
  foundMarkedPlayer = false;
  selfMark = false;

  constructor(
    public router: Router,
    public alertCtrl: AlertController,
    public actionSheetController: ActionSheetController,
    public userData: UserData,
    public restClient: RestClientService
  ) {}

  ionViewDidEnter() {
    this.userData.getId().then((userid) => {
      if (userid) {
        this.userId = userid;
        this.loadScores(userid);

      } else {
        console.log('must log in');
        this.router.navigateByUrl('/login');
      };
    });
  }

  loadScores(userId) {
    this.restClient.presentLoader();
    // if not logged in go to login page
    if (!userId) {
      console.log('must log in');
      return this.router.navigateByUrl('/login');
    };

    // get score master tables for user
    this.restClient.getScoresForUser(userId)
      .subscribe(
        (responsesc: ScoresResponse[]) => {
          this.scores = responsesc;
          // loop thru the scores for that user
          this.scores.forEach(score => {
            // get the event data
            this.restClient.getEvent(score.eventId)
              .subscribe(
                (responseev: EventsResponse) => {
                  score.event = responseev;
                  // get hole data
                  this.restClient.getCourseHoles(score.event.courseId)
                    .subscribe(
                      (responsehl: CourseHolesResponse[]) => {
                        // sort response on hole number
                        // TODO: consider using a filter to sort response on server
                        responsehl.sort(function (a, b) {
                          return a.number - b.number;
                        });
                        score.holes = responsehl;

                        // get hole scores
                        this.restClient.getScoreHoleScores(score.id)
                          .subscribe(
                            (responseshl: ScoreHoleScoresResponse[]) => {
                              score.holescores = responseshl;
                              //////////////////////////
                              // populating for tests...
                              /*
                              if(score.round == 1) {
                                score.holescores.push(
                                  {
                                    id: "theidfor1",
                                    holeNumber: 1,
                                    self: 4,
                                    validated: 4
                                  }
                                );
                              };
                              */
                              // end scaffold
                              /////////////////////////
                              // if we found a score for today save it in a variable
                              if (this.showScore('Today', score.startTime)) {
                                this.todayScore = score;
                                this.foundTodayScore = true;
                                console.log('found todayscore', this.todayScore);
                                // let's figure out the marked player
                                this.userData.getMarkedPlayer().then((markedid) => {
                                  // ok we have a marked id
                                  if (markedid) {
                                    this.loadMarkedScores(markedid);
                                  };
                                });
                              };
                            },
                            err => {
                              console.log('Error getting hole scores', err.error.error);
                            },
                            () => {
                              this.restClient.dismissLoader();
                            }
                          );
                      },
                      err => {
                        this.restClient.dismissLoader();
                        console.log('Error getting course holes', err.error.error);
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

          });
        },
        err => {
          this.restClient.dismissLoader();
          console.log('Error getting scores for user', err.error.error);
        },
        () => {}
      );
  }



  loadMarkedScores(markedid: string) {
    if (this.foundTodayScore) {
      this.userData.getMarkedPlayer().then((markedid) => {
        // ok we have a marked id
        if (markedid) {
          this.foundMarkedPlayer = true;
          this.markedPlayerId = markedid;
          this.selfMark = (markedid == this.userId);
          // let's get the name of the marked player
          this.restClient.presentLoader();
          this.restClient.getPublicUser(markedid)
            .subscribe(
              (responsesc: UsersResponse) => {
                this.markedPlayer = responsesc;
              },
              err => {
                console.error('Error getting user info for', markedid);
                // if we got here it means that markerID is not valid
                // let's erase it from the data store and clean up
                this.userData.removeMarkedPlayer().then(() => {
                  this.foundMarkedPlayer = false;
                  this.markedPlayer = null;
                  this.markedPlayerId = '';
                });
              },
              () => {
                this.restClient.dismissLoader();
              }
            );
          // let's get a reference to the score of the marked player
          this.restClient.presentLoader();
          this.restClient.getScoreForMarking(markedid, this.todayScore.eventId, this.todayScore.roundNum)
            .subscribe(
              (responsesc: ScoresResponse[]) => {
                console.log('responsesc', responsesc);
                this.markedScore = responsesc[0];
                this.restClient.getScoreHoleScores(responsesc[0].id)
                  .subscribe(
                    (responseshs: ScoreHoleScoresResponse[]) => {
                      this.markedScore.holescores = responseshs;
                      console.log('markedScore', this.markedScore);
                    },
                    err => {
                      console.error('Error getting hole scores', err.error.error);
                    },
                    () => {
                      this.restClient.dismissLoader();
                    }
                  );
              },
              err => {
                this.restClient.dismissLoader();
                console.error('Error getting marked score', err.error.error);
              },
              () => {}
            );
        };
      });
    };

  }

  // Find the marked score for the hole passed in the hole score table
  findMarkedScoreForHole(holescores: any[], holenum: number) {
    if (holescores && (holescores.length > 0)) {
      const thehole = holescores.find(
        (hs: any) => hs.holeNumber === holenum
      );
      if (thehole) {
        return thehole.marker;
      } else {
        return 0;
      }
    };
    return 0;
  }

  // Find the self score for the hole passed in the hole score table
  findSelfScoreForHole(holescores: any[], holenum: number) {
    if (holescores && (holescores.length > 0)) {
      const thehole = holescores.find(
        (hs: any) => hs.holeNumber === holenum
      );
      if (thehole) {
        return thehole.self;
      } else {
        return 0;
      }
    };
    return 0;
  }

  // Find the self score for the hole passed in the hole score table
  findHoleScoreIdForHole(holescores: any[], holenum: number) {
    if (holescores && (holescores.length > 0)) {
      const thehole = holescores.find(
        (hs: any) => hs.holeNumber === holenum
      );
      if (thehole) {
        return thehole.id;
      } else {
        return '';
      }
    };
    return '';
  }

  // Get the holescore for the hole passed in the hole score table
  getHoleScoreForHole(holescores: ScoreHoleScoresResponse[], holenum: number): ScoreHoleScoresResponse {
    const newhs = {
      id: '',
      holeNumber: holenum,
      self: 0,
      marker: 0,
      markerId: '',
      validated: 0,
      scoreId: '',
      par: 0,
    };

    if (holescores && (holescores.length > 0)) {
      const thehole = holescores.find(
        (hs: any) => hs.holeNumber === holenum
      );
      if (thehole) {
        return thehole;
      } else {
        return newhs
      }
    };
    return newhs;
  }

  setHoleScoreForHole(holescores: ScoreHoleScoresResponse[], thehs: ScoreHoleScoresResponse) {

    holescores.forEach(holescore => {
      if (holescore.holeNumber === thehs.holeNumber) {
        holescore = thehs;
      }
    });
  }

  showScore(segment: string, startTime: Date): boolean {
    //return true;
    const today = new Date();
    const startDate = new Date(startTime);
    const todayYear = today.getFullYear();
    const startYear = startDate.getFullYear();
    const todayMonth = today.getMonth();
    const startMonth = startDate.getMonth();
    const todayDay = today.getDate();
    const startDay = startDate.getDate();
    // if segment is "upcoming" return false on past startTime
    if (segment === 'Today') {
      // test for future 
      //if ( (startDay >= todayDay) || (startMonth >  todayMonth) || (startYear > todayYear) ) {     if ((startDay === todayDay) && (startMonth === todayMonth) && (startYear === todayYear)) {
      return true;
    } else {
      return false;
    }
  };

  async presentActionSheet(holenum: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Change score at Hole: ' + holenum,
      buttons: [
        {
          text: 'Your score',
          icon: 'golf-outline',
          handler: () => {
            this.changeSelfScore(holenum);
          }
      }, {
          text: 'Opponent score',
          icon: 'people-outline',
          handler: () => {
            this.changeMarkScore(holenum);
          }
      }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
      }]
    });
    await actionSheet.present();
  }


  async changeSelfScore(holenum: number) {
    const hsself: ScoreHoleScoresResponse = this.getHoleScoreForHole(this.todayScore.holescores, holenum);
    //const hsmark: ScoreHoleScoresResponse = this.getHoleScoreForHole(this.markedScore.holescores, holenum);

    const alert = await this.alertCtrl.create({
      header: 'Change scores for hole: ' + holenum,
      message: 'Be sure to set your own score!',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            hsself.self = parseInt(data.self);
            //hsmark.marker = parseInt(data.marker);
            this.updateScore(this.todayScore.holescores, hsself);
            //this.updateScore(this.markedScore.holescores, hsmark);
          }
        }
      ],
      inputs: [
        {
          type: 'number',
          name: 'self',
          value: hsself.self,
          placeholder: '0'
        }
        /* ,
               {
                 type: 'number',
                 name: 'marker',
                 value: hsmark.marker,
                 placeholder: '0'
               }*/
      ]
    });
    await alert.present();
  }

  async changeMarkScore(holenum: number) {
    //const hsself: ScoreHoleScoresResponse = this.getHoleScoreForHole(this.todayScore.holescores, holenum);
    const hsmark: ScoreHoleScoresResponse = this.getHoleScoreForHole(this.markedScore.holescores, holenum);

    const alert = await this.alertCtrl.create({
      header: 'Change scores for hole: ' + holenum,
      message: 'Enter here the score for the player you are marking.',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            // hsself.self = parseInt(data.self);
            hsmark.marker = parseInt(data.marker);
            // this.updateScore(this.todayScore.holescores, hsself);
            this.updateScore(this.markedScore.holescores, hsmark);
          }
        }
      ],
      inputs: [
        /* {
          type: 'number',
          name: 'self',
          value: hsself.self,
          placeholder: '0'
        },*/
        {
          type: 'number',
          name: 'marker',
          value: hsmark.marker,
          placeholder: '0'
        }
      ]
    });
    await alert.present();
  }

  updateScore(holescores: ScoreHoleScoresResponse[], thehs: ScoreHoleScoresResponse) {
    // is this a new hs?
    if (thehs.id) {
      this.restClient.patchHoleScore(thehs)
        .subscribe(
          (response: any) => {
            this.setHoleScoreForHole(holescores, thehs);
          },
          err => {
            console.error('Error setting self score', err.error.error);
          },
          () => {}
        );
    } else {
      this.restClient.postHoleScore(thehs)
        .subscribe(
          (response: ScoreHoleScoresResponse) => {
            this.setHoleScoreForHole(holescores, response);
          },
          err => {
            console.error('Error setting self score', err.error.error);
          },
          () => {}
        );
    }
  }


}
