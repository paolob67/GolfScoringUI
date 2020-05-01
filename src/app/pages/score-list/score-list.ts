import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { RestClientService } from '../../providers/rest-client.service';

import { CoursesResponse,
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

  constructor(
    public confData: ConferenceData,
    public router: Router,
    public userData: UserData,
    public restClient: RestClientService
  ) { }

  ionViewDidEnter() {
    this.userData.getId().then((id) => this.loadScores(id));
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

  // Find the score for the hole passed in the hole score table
  findScoreForHole(holescores: any[], holenum: number) {
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
}
