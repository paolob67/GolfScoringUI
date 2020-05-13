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
  PlayerDetailPage
} from './player-detail';


const confDataSub = {};

describe('PlayerDetailPage', () => {
  let fixture, app;
  beforeEach(async (() => {
    const actionSheetSpy = jasmine.createSpyObj('ActionSheetController', [
      'create'
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const iabSpy = jasmine.createSpyObj('InAppBrowser', ['create']);

    TestBed.configureTestingModule({
      declarations: [PlayerDetailPage],
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
        }
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDetailPage);
    app = fixture.debugElement.componentInstance;
  });
  it('should create the PlayerDetailPage page', () => {
    expect(app).toBeTruthy();
  });
});
