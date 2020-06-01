/**
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */

/**
 * Imports
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  Router
} from '@angular/router';
// PB67 import { SwUpdate } from '@angular/service-worker';
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

/**
 * App Component
 * Application component declares MenuController, Platform,
 * Router, SplashScreen,StatusBar, Storage, UserData,RestClientService,
 * ToastController (might be moved to a service)
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  /** JSON object with the application menu */
  appPages = [
    {
      title: 'Scores',
      url: '/app/tabs/scores',
      icon: 'golf',
      public: false
    },
    {
      title: 'Leaderboards',
      url: '/app/tabs/leaderboard-list',
      icon: 'clipboard',
      public: true
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map',
      public: true
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle',
      public: true
    }
  ];
  /** Holds log in status */
  loggedIn = false;
  /** Holds choice for dark mode theme */
  dark = false;
  /**
   * Calls [initializeApp]{@link AppComponent#initializeApp} for startup settings
   */
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

  /**
   * Called upon component intialization, chesk if we have a server connection
   * prompts for retry, performs a logoff just in case. Registers event listeners
   */
  async ngOnInit() {
    // perform ping request to verify if we have server connection
    // TODO: move this check in a timeout in order to have this check at intervals
    this.restClient.checkServerConnection()
      .subscribe(
        async response => {
            // got response: all good
            // TODO: mdofy Ping response to send info on server version
            console.log('Got server connection');
        },
        async err => {
          // manage no connection with message to user
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
    // verify if we have a JWT stored in the local store
    this.checkLoginStatus();
    // enable event listening
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

  /**
   * If we got handle to the mobile platform set status bar style and hide splash
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * Access local store and verify if we are logged in
   */
  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  /**
   * Update component member with login status, wait for 300 ms
   * @param loggedIn the status to set for logged in
   */
  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  /**
   * Register Event listeners for login, signup, logoff
   */
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

  /**
   * Clear local store from user info and load events page (public)
   */
  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/leaderboard-list');
    });
  }

  /**
   * Disables showing of the menu, resets local store tuorial flag
   * and navigates to tutorial slideshow
   */
  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
}
