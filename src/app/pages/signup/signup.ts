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
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  };
  submitted = false;
  id = '';

  constructor(
    public router: Router,
    public restClient: RestClientService,
    public userData: UserData
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;


    if (form.valid) {
      this.restClient.presentLoader();
      this.restClient.signup(
        this.signup.firstname,
        this.signup.lastname,
        this.signup.username,
        this.signup.password
      ).subscribe(
        response => {
          this.id = response.id;
          console.log('Signup returned', response);
          this.restClient.login(
            this.signup.username,
            this.signup.password
          ).subscribe(
            responsel => {
              console.log('Login returned');
              // this.userData.signup(this.signup.username, response.token);
              this.userData.signup(this.id, responsel.token);
              this.router.navigateByUrl('/app/tabs/leaderboard-list');
            },
            err => {
              console.error('Login error', err.error.error);
              // this.invalidCredentials = true;
            },
            () => {
              this.restClient.dismissLoader();
              console.log('Login success');
            }
          );
        },
        err => {
          this.restClient.dismissLoader();
          console.error('Login error', err.error.error);
        },
        () => {
          this.restClient.dismissLoader();
          console.log('Signup success');
        }
      );
    }
  }
}
