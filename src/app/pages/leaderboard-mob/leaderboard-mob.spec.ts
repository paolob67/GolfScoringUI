import {
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  TestBed,
  async
} from '@angular/core/testing';
import {
  ActionSheetController
} from '@ionic/angular';

import {
  InAppBrowser
} from '@ionic-native/in-app-browser/ngx';
import {
  LeaderboardMobPage
} from './leaderboard';
import {
  ConferenceData
} from '../../providers/conference-data';

const confDataSub = {};

describe('LeaderboardMobPage', () => {
  let fixture, app;
  beforeEach(async (() => {
    const actionSheetSpy = jasmine.createSpyObj('ActionSheetController', [
      'create'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const iabSpy = jasmine.createSpyObj('InAppBrowser', ['create']);

    TestBed.configureTestingModule({
      declarations: [LeaderboardMobPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActionSheetController,
          useValue: actionSheetSpy
        },
        {
          provide: InAppBrowser,
          useValue: iabSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: ConferenceData,
          useValue: confDataSub
        }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardMobPage);
    app = fixture.debugElement.componentInstance;
  });
  it('should create the leaderboard page', () => {
    expect(app).toBeTruthy();
  });
});
