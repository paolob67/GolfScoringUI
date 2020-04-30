import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, SignupRequest } from '../interfaces/rest-datamodel';
import { LoginResponse, UsersResponse,
         CoursesResponse, CourseAddressResponse,
         EventsResponse, ScoresResponse,
         CourseHolesResponse, ScoreHoleScoresResponse } from '../interfaces/rest-datamodel';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  constructor(
    private _http: HttpClient
  ) {
    if (!environment.production) console.log("Rest api endpoint is", environment.apiEndPoint);
  }

  login(username: string, password: string) {
    const body = {
      email: username,
      password: password,
    };
    return this._http.post<LoginResponse>(environment.apiEndPoint + '/users/login', <LoginRequest>body);
  }

  me(token: string) {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    };
    return this._http.get<UsersResponse>(environment.apiEndPoint + '/users/me', options);
  }

  signup(firstname: string, lastname: string, username: string, password: string) {
    const body = {
      firstName: firstname,
      lastName: lastname,
      email: username,
      password: password
    };
    return this._http.post<UsersResponse>(environment.apiEndPoint + '/users', <SignupRequest>body);
  }

  updateUser(token: string, userdata: UsersResponse) {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    };
    const body = {
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      email: userdata.email,
      clubName: userdata.clubName,
      card: userdata.card,
      handicap: userdata.handicap,
      gender: userdata.gender
    };
    return this._http.put<UsersResponse>(environment.apiEndPoint + '/users/' + userdata.id, body, options);
  }

  getCourses() {
    return this._http.get<CoursesResponse[]>(environment.apiEndPoint + '/courses');
  }

  getCourseAddress(courseid: string) {
    return this._http.get<CourseAddressResponse>(environment.apiEndPoint + '/courses/' + courseid + '/address');
  }

  getEvents(eventId?: string) {
    if (eventId) {
      return this._http.get<EventsResponse>(environment.apiEndPoint + '/events/' + eventId);
    } else {
      return this._http.get<EventsResponse[]>(environment.apiEndPoint + '/events');
    }
  }

  getScoresForUser(userId: string) {
    const filter = {
      "where": {
        "userId": userId
      }
    };
    const filterStr = JSON.stringify(filter);
    const options = {
      params: {
        filter: filterStr
      }
    };
    return this._http.get<ScoresResponse[]>(environment.apiEndPoint + '/scores', options);
  }

  getCourseHoles(courseId: string) {
    return this._http.get<CourseHolesResponse[]>(environment.apiEndPoint + '/courses/' + courseId + '/holes');
  }

  getScoreHoleScores(scoreId: string) {
    return this._http.get<ScoreHoleScoresResponse[]>(environment.apiEndPoint + '/scores/'+scoreId+'/hole-scores');
  }
}
