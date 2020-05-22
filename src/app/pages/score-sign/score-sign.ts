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
  which: string;
  what: string;
  
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
    this.what = this.route.snapshot.paramMap.get('what');
    this.scoreId = this.route.snapshot.paramMap.get('scoreId');

    this.ios = this.config.get('mode') === 'ios';


  }

 

}
