import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  Router
} from '@angular/router';
//PB67 import { SwUpdate } from '@angular/service-worker';

import {
  MenuController,
  Platform,
  ToastController
} from '@ionic/angular';

import {
  SplashScreen
} from '@ionic-native/splash-screen/ngx';
import {
  StatusBar
} from '@ionic-native/status-bar/ngx';

import {
  Storage
} from '@ionic/storage';

import {
  UserData
} from './providers/user-data';
import {
  RestClientService
} from './providers/rest-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Scores',
      url: '/app/tabs/scores',
      icon: 'golf'
    },
    {
      title: 'Leaderboards',
      url: '/app/tabs/leaderboard',
      icon: 'clipboard'
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map'
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;
  dark = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private restClient: RestClientService,
    // PB67 private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.restClient.checkServerConnection()
      .subscribe(
        async response => {
            console.log('Got server connection');
          },
          async err => {
              const toast = await this.toastCtrl.create({
                message: 'Could not reach server, check your connection!',
                position: 'bottom',
                buttons: [
                  {
                    role: 'cancel',
                    text: 'Retry'
              }
            ]
              });
              await toast.present();
              toast
                .onDidDismiss()
                .then(() => this.logout())
                .then(() => window.location.reload());
            },
            () => {}
      );
    this.checkLoginStatus();
    this.listenForLoginEvents();
    /* PB67
    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });*/
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/leaderboard');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
}
