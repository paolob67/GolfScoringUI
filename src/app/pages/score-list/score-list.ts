import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { RestClientService } from '../../providers/rest-client.service';

import { UsersResponse,
         CoursesResponse,
         EventsResponse,
         ScoresResponse,
         CourseHolesResponse,
         ScoreHoleScoresResponse } from '../../interfaces/rest-datamodel';



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
    public confData: ConferenceData,
    public router: Router,
    public userData: UserData,
    public restClient: RestClientService
  ) { }

  ionViewDidEnter() {
    this.userData.getId().then((userid) => {
      if (userid) {
        this.userId = userid;
        this.loadScores(userid);
        this.userData.getMarkedPlayer().then((markedid) => {
          if (markedid) {
            this.foundMarkedPlayer = true;
            this.markedPlayerId = markedid;
            this.selfMark = (markedid == this.userId);
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
              () => {}
            );
          };
        });
      };
    });



  }

  loadScores(userId) {
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
        // get the event data
        this.scores.forEach(score => {
          this.restClient.getEvent(score.eventId)
          .subscribe(
            (responseev: EventsResponse) => {
              score.event = responseev;
              // get hole data
              this.restClient.getCourseHoles(score.event.courseId)
              .subscribe(
                (responsehl: CourseHolesResponse[])=> {
                  // sort response on hole number
                  responsehl.sort(function (a, b) {
                    return a.number - b.number;
                  });
                  score.holes = responsehl;
                  // if we found a score for today save it in a variable
                  if (this.showScore('Today', score.startTime)) {
                    this.todayScore = score;
                    this.foundTodayScore = true;
                  };
                },
                err => {
                  console.log('Error getting course holes', err.error.error);
                },
              );
            },
            err => {
              console.log('Error getting events', err.error.error);
            },
            () => {}
          );
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
            },
            err => {
              console.log('Error getting hole scores', err.error.error);
            },
            () => {}
          );
        });
      },
      err => {
        console.log('Error getting scores for user', err.error.error);
      }
    );
  }

  // Find the marked score for the hole passed in the hole score table
  findMarkedScoreForHole(holescores: any[], holenum: number) {
    if (holescores.length > 0) {
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
    if (holescores.length > 0) {
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

  showScore(segment: string, startTime: Date): boolean {
    return true;
    const today = new Date();
    const startDate = new Date(startTime);
    const todayYear = today.getFullYear();
    const startYear = startDate.getFullYear();
    const todayMonth = today.getMonth();
    const startMonth = startDate.getMonth();
    const todayDay = today.getDate();
    const startDay = startDate.getDate();
    // if segment is "upcoming" return false on past startTime
    if( segment === 'Today') {
      // test for future
      //if ( (startDay >= todayDay) || (startMonth >  todayMonth) || (startYear > todayYear) ) {
      if ( (startDay === todayDay) && (startMonth ===  todayMonth) && (startYear === todayYear) ) {
        return true;
      } else {
        return false;
      }
    };
    return true;
  }



}
