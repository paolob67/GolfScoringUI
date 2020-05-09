import {
  Component
} from '@angular/core';
//import { Location } from '@angular/common';
import {
  NgForm
} from '@angular/forms';
import {
  Router
} from '@angular/router';

import {
  UserData
} from '../../providers/user-data';
import {
  RestClientService
} from '../../providers/rest-client.service';

import {
  UserOptions
} from '../../interfaces/user-options';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = {
    username: '',
    password: ''
  };
  submitted = false;
  invalidCredentials = false;
  jwtToken = '';


  constructor(
    public userData: UserData,
    public restClient: RestClientService,
    public router: Router,
    // public location: Location
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      this.restClient.login(this.login.username, this.login.password)
        .subscribe(
          response => {
            this.jwtToken = response.token;
            console.log('Login returned ', this.jwtToken);
            this.restClient.me(this.jwtToken)
              .subscribe(
                response => {
                  this.userData.login(response.id, this.jwtToken);
                  //this.router.navigateByUrl('/app/tabs/leaderboard');
                  this.router.navigateByUrl('/app/tabs/scores');
                  //this.location.back();
                },
                err => {
                  console.error('Me error', err.error.error);
                  // TODO inform ui by removing hide on ivalid cred... or setting another string
                },
                () => console.log('Me success')
              );
          },
          err => {
            console.error('Login error', err.error.error);
            this.invalidCredentials = true;
          }, // or error...?
          () => console.log('Login success')
        );

    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
