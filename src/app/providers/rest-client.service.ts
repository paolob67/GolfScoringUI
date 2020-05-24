import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  environment
} from '../../environments/environment';
import {
  LoadingController
} from '@ionic/angular';
import {
  LoginRequest,
  SignupRequest
} from '../interfaces/rest-datamodel';
import {
  LoginResponse,
  UsersResponse,
  CoursesResponse,
  CourseAddressResponse,
  EventsResponse,
  ScoresResponse,
  CourseHolesResponse,
  ScoreHoleScoresResponse,
  RoundScoresResponse,
  DetailedLeaderboardResponse
} from '../interfaces/rest-datamodel';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  isLoading = false;

  constructor(
    private httpClient: HttpClient,
    private loadingController: LoadingController
  ) {
    if (!environment.production) {
      console.log('Rest api endpoint is', environment.apiEndPoint);
    }
  }


  // provide methods for showing and hiding loader
  async presentLoader() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    return await this.loadingController.create({}).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismissLoader() {
    if (!this.isLoading) {
      return;
    }
    this.isLoading = false;
    return await this.loadingController.dismiss().catch(() => {});
  }

  checkServerConnection() {
    return this.httpClient.get(environment.apiEndPoint + '/ping');
  }

  login(aUserName: string, aPassword: string) {
    const body = {
      email: aUserName,
      password: aPassword,
    };
    return this.httpClient.post < LoginResponse > (environment.apiEndPoint + '/users/login', body);
  }

  me(token: string) {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    };
    return this.httpClient.get < UsersResponse > (environment.apiEndPoint + '/users/me', options);
  }

  signup(aFirstName: string, aLastName: string, aUserName: string, aPassword: string) {
    const body = {
      firstName: aFirstName,
      lastName: aLastName,
      email: aUserName,
      password: aPassword
    };
    return this.httpClient.post < UsersResponse > (environment.apiEndPoint + '/users', body);
  }

  updateUser(token: string, userData: UsersResponse) {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    };
    const body = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      clubName: userData.clubName,
      card: userData.card,
      handicap: userData.handicap,
      gender: userData.gender
    };
    return this.httpClient.put < UsersResponse > (environment.apiEndPoint + '/users/' + userData.id, body, options);
  }

  // getPublicUser(userId: string, token: string) {
  getPublicUser(aUserId: string) {
    /*
    const options = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    };
    */
    // return this.httpClient.get<UsersResponse>(environment.apiEndPoint + '/users/' + userId, options);
    return this.httpClient.get < UsersResponse > (environment.apiEndPoint + '/users/public/' + aUserId);
  }

  getCourses() {
    return this.httpClient.get < CoursesResponse[] > (environment.apiEndPoint + '/courses');
  }

  getCourseAddress(courseid: string) {
    return this.httpClient.get < CourseAddressResponse > (environment.apiEndPoint + '/courses/' + courseid + '/address');
  }

  getEvent(eventId: string) {
    return this.httpClient.get < EventsResponse > (environment.apiEndPoint + '/events/' + eventId);
  }

  getEvents() {
    return this.httpClient.get < EventsResponse[] > (environment.apiEndPoint + '/events');
  }

  getScoresForUser(aUserId: string) {
    const filter = {
      where: {
        userId: aUserId
      }
    };
    const filterStr = JSON.stringify(filter);
    const options = {
      params: {
        filter: filterStr
      }
    };
    return this.httpClient.get < ScoresResponse[] > (environment.apiEndPoint + '/scores', options);
  }

  getScoreForMarking(aUserId: string, anEventId: string, aRoundNum: number) {
    const filter = {
      where: {
        userId: aUserId,
        eventId: anEventId,
        round: aRoundNum
      }
    };
    const filterStr = JSON.stringify(filter);
    const options = {
      params: {
        filter: filterStr
      }
    };
    return this.httpClient.get < ScoresResponse[] > (environment.apiEndPoint + '/scores', options);
  }


  getCourseHoles(courseId: string) {
    return this.httpClient.get < CourseHolesResponse[] > (environment.apiEndPoint + '/courses/' + courseId + '/holes');
  }

  getScoreHoleScores(scoreId: string) {
    return this.httpClient.get < ScoreHoleScoresResponse[] > (environment.apiEndPoint + '/scores/' + scoreId + '/hole-scores');
  }

  postHoleScore(holeScore: ScoreHoleScoresResponse) {
    const body = {
      holeNumber: holeScore.holeNumber,
      self: holeScore.self,
      marker: holeScore.marker,
      scoreId: holeScore.scoreId,
    };
    // this should be protected... must include jwt token in call
    return this.httpClient.post < ScoreHoleScoresResponse > (
      environment.apiEndPoint + '/scores/' + holeScore.scoreId + '/hole-scores',
      body
    );
  }

  patchHoleScore(holeScore: ScoreHoleScoresResponse) {
    const body = {
      id: holeScore.id,
      self: holeScore.self,
      marker: holeScore.marker,
      scoreId: holeScore.scoreId,
    };
    const where = {
      id: holeScore.id
    };
    const whereStr = JSON.stringify(where);
    const options = {
      params: {
        where: whereStr
      }
    };
    return this.httpClient.patch < ScoreHoleScoresResponse > (
      environment.apiEndPoint + '/scores/' + holeScore.scoreId + '/hole-scores',
      body,
      options
    );
  }

  getEventRoundScores(anEventId: string, aRound: number) {
    const filter = {
      where: {
        eventId: anEventId,
        round: aRound
      }
    };
    const filterStr = JSON.stringify(filter);
    const options = {
      params: {
        filter: filterStr
      }
    };
    return this.httpClient.get < ScoresResponse[] > (environment.apiEndPoint + '/scores', options);
  }

  /*
  getLastEvent() {
    const filter = {
      order: 'date DESC',
      limit: 1
    };
    const filterStr = JSON.stringify(filter);
    const options = {
      params: {
        filter: filterStr
      }
    };
    return this.httpClient.get < EventsResponse[] > (environment.apiEndPoint + '/events', options);
  }
  */

  getRoundScoresDetails(eventId: string, round: number) {
    return this.httpClient.get < RoundScoresResponse > (environment.apiEndPoint + '/events/' + eventId + '/roundscores/' + round);
  }

  getPlayerScoresDetails(eventId: string, userId: string) {
    return this.httpClient.get < RoundScoresResponse > (environment.apiEndPoint + '/events/' + eventId + '/playerscores/' + userId);
  }

  getLeaderboardDetails(eventId: string) {
    return this.httpClient.get < DetailedLeaderboardResponse[] > (environment.apiEndPoint + '/events/' + eventId + '/detailedleaderboard');
  }

}
