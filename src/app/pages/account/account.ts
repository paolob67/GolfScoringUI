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

  ngAfterViewInit() {
    this.getProfile();
  }

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

  async changeHandicap() {
    const alert = await this.alertCtrl.create({
      header: 'Change Handicap',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.profileData.handicap = parseInt(data.handicap);
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



  getUsername() {
    this.userData.getId().then((id) => {
      this.username = id;
    });
  }

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
            if (err.error.error.statusCode === 401) {
              this.userData.logout();
              this.router.navigateByUrl('/login');
            };
          },
          () => {
            console.log('Me success');
            this.restClient.dismissLoader();
          }

        );
    });
  }

  updateProfile() {
    this.userData.getJwtToken().then((token) => {
      this.restClient.updateUser(token, this.profileData)
        .subscribe(
          response => {
            console.log('UpdateUser returned ', response);
          },
          err => {
            console.error('UpdateUser error', err.error.error);
            if (err.error.error.statusCode === 401) {
              this.userData.logout();
              this.router.navigateByUrl('/login');
            };
          },
          () => console.log('UpdateUser success')
        );
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }
}
