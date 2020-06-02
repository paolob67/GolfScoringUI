/**
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */

/**
 * Imports
 */
import {
  Component
} from '@angular/core';
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
  /**
   * flag to handle form validation
   */
  submitted = false;
  /**
   * flag to show invalid (unhide) credentials message in html
   */
  invalidCredentials = false;
  /**
   * holds the returned jwt token from the server is logged in
   */
  jwtToken = '';

  constructor(
    public userData: UserData,
    public restClient: RestClientService,
    public router: Router,
  ) {}

  /**
   * Called upon from submit
   */
  onLogin(form: NgForm) {
    // set dubmitted flag to handle form validation
    this.submitted = true;
    // if data is validated
    if (form.valid) {
      // then call login API passing unsername and password
      this.restClient.presentLoader();
      this.restClient.login(this.login.username, this.login.password)
        .subscribe(
          response => {
            // if API returns ok save the returned JWT token
            this.jwtToken = response.token;
            console.log('Login returned ', this.jwtToken);
            // and then call the me API to get user profile
            this.restClient.me(this.jwtToken)
              .subscribe(
                responseMe => {
                  // update local store with user data and jwt token
                  this.userData.login(responseMe.id, this.jwtToken);
                  // and navigate to the events page - this is the public page anyhow
                  this.router.navigateByUrl('/app/tabs/leaderboard-list');
                },
                err => {
                  console.error('Me error', err.error.error);
                  this.restClient.dismissLoader();
                  // TODO inform ui by removing hide on invalid cred... or setting another string
                },
                () => {
                  this.restClient.dismissLoader();
                  console.log('Me success');
                }
              );
          },
          err => {
            this.restClient.dismissLoader();
            console.error('Login error', err.error.error);
            this.invalidCredentials = true;
          }, // or error...?
          () => {
            this.restClient.dismissLoader();
            console.log('Login success');
          }
        );
    }
  }

  /**
   * called when user clickes on sign up button instead of logging in
   */
  onSignup() {
    // navigate to signup page
    this.router.navigateByUrl('/signup');
  }
}
