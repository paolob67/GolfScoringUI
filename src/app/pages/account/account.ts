/**
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */

/**
 * Imports
 */
import {
  AfterViewInit,
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';

import {
  AlertController
} from '@ionic/angular';

import {
  UserData
} from '../../providers/user-data';
import {
  RestClientService
} from '../../providers/rest-client.service';
import {
  UsersResponse
} from '../../interfaces/rest-datamodel';

/**
 * Displays information of the user profile and presents a form for
 * updating it
 */
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {
  profileData: UsersResponse;
  username: string;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public restClient: RestClientService
  ) {}
  
  /**
   * Calls [getProfile]{@link AccountPage#getProfile#getProfile}
   * to load account data from the server
   */
  ngAfterViewInit() {
    this.getProfile();
  }

  /**
   * Presents an alert with an input box for changing the name of the user
   */
  async changeName() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.profileData.firstName = data.firstName;
            this.profileData.lastName = data.lastName;
            this.updateProfile();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'firstName',
          value: this.profileData.firstName,
          placeholder: 'First Name'
        },
        {
          type: 'text',
          name: 'lastName',
          value: this.profileData.lastName,
          placeholder: 'Last Name'
        },
      ]
    });
    await alert.present();
  }
  
  /**
   * Presents an alert with an input box for changing the name of the club
   */
  async changeClub() {
    const alert = await this.alertCtrl.create({
      header: 'Change Club Name',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.profileData.clubName = data.clubName;
            this.updateProfile();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'clubName',
          value: this.profileData.clubName,
          placeholder: 'Club Name'
        }
      ]
    });
    await alert.present();
  }
  
  /**
   * Presents an alert with an input box for changing the number of the card
   */
  async changeCard() {
    const alert = await this.alertCtrl.create({
      header: 'Change Card Number',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.profileData.card = data.card;
            this.updateProfile();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'card',
          value: this.profileData.card,
          placeholder: 'Card Number'
        }
      ]
    });
    await alert.present();
  }

  /**
   * Presents an alert with an input box for changing the handicap of the user
   */
  async changeHandicap() {
    const alert = await this.alertCtrl.create({
      header: 'Change Handicap',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.profileData.handicap = parseInt(data.handicap, 10);
            this.updateProfile();
          }
        }
      ],
      inputs: [
        {
          type: 'number',
          name: 'handicap',
          value: this.profileData.handicap,
          placeholder: '0'
        }
      ]
    });
    await alert.present();
  }
  
  /**
   * Presents an alert with an input box for changing the gender of the user
   */
  async changeGender() {
    const alert = await this.alertCtrl.create({
      header: 'Change Gender',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            console.log('the data', data);
            this.profileData.gender = data;
            this.updateProfile();
          }
        }
      ],
      inputs: [
        {
          name: 'male',
          type: 'radio',
          label: 'Male',
          value: 'male',
          checked: (this.profileData.gender === 'male')
        },
        {
          name: 'female',
          type: 'radio',
          label: 'Female',
          value: 'female',
          checked: (this.profileData.gender === 'female')
        }
      ]
    });
    await alert.present();
  }

  /**
   * Retrieves the username from the local store
   */
  getUsername() {
    this.userData.getId().then((id) => {
      this.username = id;
    });
  }
  
  /**
   * Retrieves the user data by calling [me]{@link RestClientService#me}
   */
  getProfile() {
    this.userData.getJwtToken().then((token) => {
      this.restClient.presentLoader();
      this.restClient.me(token)
        .subscribe(
          response => {
            console.log('Me returned ', response);
            this.profileData = response;
            this.username = response.firstName;
          },
          err => {
            console.error('Me error', err.error.error);
            // since we got here with a 401 it looks like we where not authorized so
            // logoff and try again to login
            if (err.error.error.statusCode === 401) {
              this.logout();
            }
          },
          () => {
            console.log('Me success');
            this.restClient.dismissLoader();
          }

        );
    });
  }

  /**
   * Updates the user data by calling [updateUser]{@link RestClientService#updateUser}
   */
  updateProfile() {
    this.userData.getJwtToken().then((token) => {
      this.restClient.updateUser(token, this.profileData)
        .subscribe(
          response => {
            console.log('UpdateUser returned ', response);
          },
          err => {
            console.error('UpdateUser error', err.error.error);
            // since we got here with a 401 it looks like we where not authorized so
            // logoff and try again to login
            if (err.error.error.statusCode === 401) {
              this.logout();
            }
          },
          () => console.log('UpdateUser success')
        );
    });
  }
  
  /**
   * TODO: Implement change password
   */
  changePassword() {
    console.log('Clicked to change password');
  }

  /**
   * Clears storage and goes to login RestClientService#updateUser}
   */
  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }

  /**
   * Opens support page by navigating the route
   */
  support() {
    this.router.navigateByUrl('/support');
  }
}
