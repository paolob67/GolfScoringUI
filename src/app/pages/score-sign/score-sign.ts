import {
  Component,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  AlertController,
  IonList,
  IonFab,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
  Config
} from '@ionic/angular';
import {
  RestClientService
} from '../../providers/rest-client.service';

import {
  UserData
} from '../../providers/user-data';

import {
  LoginResponse,
  UsersResponse,
  CoursesResponse,
  CourseAddressResponse,
  EventsResponse,
  ScoresResponse,
  CourseHolesResponse,
  ScoreHoleScoresResponse
} from '../../interfaces/rest-datamodel';

@Component({
  selector: 'page-score-sign',
  templateUrl: 'score-sign.html',
  styleUrls: ['./score-sign.scss'],
})
export class ScoreSignPage implements OnInit {

  ios: boolean;
  scoreId: string;
  scores: any[] = [];
  which: string;
  viewScore: any;
  canSign: boolean = true;
  card: string;
  
  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public restClient: RestClientService,
    public user: UserData,
    public config: Config
  ) {}

  ngOnInit() {
    this.which = this.route.snapshot.paramMap.get('which');
//    this.what = this.route.snapshot.paramMap.get('what');
//    this.scoreId = this.route.snapshot.paramMap.get('scoreId');
    if (this.router.getCurrentNavigation().extras.state) {
      this.viewScore = this.router.getCurrentNavigation().extras.state.viewScore;
    }
//    console.log('Id ' + JSON.stringify(this.viewScore));

    this.ios = this.config.get('mode') === 'ios';
    this.scoreId = this.viewScore.id;
    for (let i = 1; i < this.viewScore.holes.length+1; i++) {
      let score: any = {};
      score.holeNumber = this.viewScore.holes[i-1].number;

      if (this.viewScore.holescores && (this.viewScore.holescores.length > 0)) {
        const thehole = this.viewScore.holescores.find(
          (hs: any) => hs.holeNumber === score.holeNumber
        );
        if (thehole) {
          score.self = thehole.self;
          score.marker = thehole.marker;
        } else {
          score.self = 0;
          score.marker = 0;
          this.canSign = false;
        };
      };
      if (score.self === score.marker) {
        score.ok = true;
      } else {
        score.ok = false;
        this.canSign = false;
      }
      this.scores.push(score);
    }
//    console.log('Id ' + JSON.stringify(this.scoreId));
//    console.log('Scores' + JSON.stringify(this.scores));
  }

  async sign() {
    const alert = await this.alertCtrl.create({
      header: 'Sign the score',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.card = data.Card;
            this.updateScore();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'Card',
          placeholder: 'Golf Card Id'
        }
      ]
    });
    await alert.present();
  }

  updateScore() {
  let signType: string; 

    if (this.which === 'Player') {
      signType = this.which;
    } else {
      signType = 'Marker';
    }
    this.restClient.signScore(this.scoreId, signType, this.card)
    .subscribe(
      response => {
        console.log('UpdateScore returned ', response);
      },
      err => {
        console.error('UpdateScore error', err.error.error);
      },
      () => console.log('UpdateScore success')
    );

  }

}
